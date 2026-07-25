import { createHash, randomUUID } from "node:crypto";
import { getFile } from "@/lib/platform/blob";
import type { AppContext } from "@/lib/platform/tenant-context";

type SignatureAudit = {
  ipAddress: string | null;
  userAgent: string | null;
};

function createVerificationCode() {
  return `CF-${randomUUID().replace(/-/g, "").slice(0, 16).toUpperCase()}`;
}

async function hashDocumentFile(fileUrl: string) {
  const file = await getFile(fileUrl);
  if (!file?.stream) {
    throw new Error("O arquivo original nao esta disponivel para gerar o hash da assinatura.");
  }

  const bytes = Buffer.from(await new Response(file.stream).arrayBuffer());
  return createHash("sha256").update(bytes).digest("hex");
}

export async function registerInternalDocumentSignature(
  context: AppContext,
  documentId: string,
  audit: SignatureAudit,
  reauthenticatedAt: Date,
) {
  const document = await context.prisma.document.findUnique({
    where: { id: documentId },
    select: { id: true, title: true, fileUrl: true },
  });
  if (!document) throw new Error("Documento nao encontrado.");

  const documentHash = await hashDocumentFile(document.fileUrl);
  const signedAt = reauthenticatedAt;

  return context.prisma.$transaction(async (tx) => {
    const priorSignature = await tx.documentSignature.findFirst({
      where: {
        documentId,
        signerUsuarioId: context.user.id,
        documentHash,
        status: "SIGNED",
      },
      select: { id: true },
    });
    if (priorSignature) {
      throw new Error("Sua assinatura interna ja foi registrada para esta versao do documento.");
    }

    let version = await tx.documentVersion.findFirst({
      where: {
        documentId,
        fileUrl: document.fileUrl,
        hashSha256: documentHash,
        status: { in: ["FINAL", "SIGNED"] },
      },
      orderBy: { versionNumber: "desc" },
    });

    if (!version) {
      const latestVersion = await tx.documentVersion.aggregate({
        where: { documentId },
        _max: { versionNumber: true },
      });
      version = await tx.documentVersion.create({
        data: {
          documentId,
          versionNumber: (latestVersion._max.versionNumber ?? 0) + 1,
          fileUrl: document.fileUrl,
          hashSha256: documentHash,
          status: "SIGNED",
          lockedAt: signedAt,
          finalizedAt: signedAt,
        },
      });
    } else if (version.status !== "SIGNED" || !version.lockedAt) {
      version = await tx.documentVersion.update({
        where: { id: version.id },
        data: { status: "SIGNED", lockedAt: version.lockedAt ?? signedAt },
      });
    }

    const signature = await tx.documentSignature.create({
      data: {
        documentId,
        documentVersionId: version.id,
        signerUsuarioId: context.user.id,
        signerEmployeeId: context.user.employeeId,
        signerName: context.user.name,
        signerEmail: context.user.email,
        signatureType: "SIGN",
        provider: "INTERNAL",
        authenticationMethod: "FIREBASE_PASSWORD_REAUTH",
        reauthenticatedAt: signedAt,
        documentHash,
        verificationCode: createVerificationCode(),
        status: "SIGNED",
        signedAt,
        ipAddress: audit.ipAddress,
        userAgent: audit.userAgent,
        metadata: JSON.stringify({ reauthentication: "firebase-password" }),
      },
      select: { id: true, verificationCode: true },
    });

    const processDocuments = await tx.processDocument.findMany({
      where: { documentId },
      select: { processId: true, process: { select: { currentDepartmentId: true } } },
    });
    const processDepartments = new Map(processDocuments.map(({ processId, process }) => [processId, process.currentDepartmentId]));

    for (const [processId, departmentId] of processDepartments) {
      await tx.processEvent.create({
        data: {
          processId,
          eventType: "DOCUMENT_SIGNED_INTERNAL",
          description: `Assinatura interna registrada para o documento ${document.title}.`,
          departmentId,
          employeeId: context.user.employeeId,
          metadata: JSON.stringify({
            documentId,
            documentVersionId: version.id,
            signatureId: signature.id,
            verificationCode: signature.verificationCode,
          }),
        },
      });
    }

    return signature;
  });
}
