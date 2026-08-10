import { createHash } from "node:crypto";
import type { Prisma, PrismaClient } from "@prisma/client";
import { uploadGeneratedFinancialFile } from "@/lib/platform/blob";

const financialFolderName = "Financeiro";

async function resolveFinancialFolder(tx: Prisma.TransactionClient) {
  // Serializing this lookup prevents simultaneous reports from creating duplicate root folders.
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`GED:${financialFolderName}`}))`;
  const folder = await tx.folder.findFirst({
    where: { name: financialFolderName, parentId: null },
    select: { id: true },
  });
  return folder?.id ?? (await tx.folder.create({
    data: {
      name: financialFolderName,
      description: "Documentos gerados pelo módulo Financeiro.",
    },
    select: { id: true },
  })).id;
}

async function moveFinancialDocumentsToFolder(tx: Prisma.TransactionClient, folderId: string) {
  await tx.document.updateMany({
    where: {
      folderId: null,
      OR: [
        { documentType: { startsWith: "FINANCEIRO:" } },
        { documentType: { startsWith: "PUBLIC_FINANCIAL_REPORT:" } },
      ],
    },
    data: { folderId },
  });
}

export async function ensureFinancialGedFolder(db: PrismaClient) {
  return db.$transaction(async (tx) => {
    const folderId = await resolveFinancialFolder(tx);
    await moveFinancialDocumentsToFolder(tx, folderId);
    return folderId;
  });
}

export async function saveFinancialFileToGed(
  db: PrismaClient,
  input: {
    title: string;
    documentType: string;
    filename: string;
    content: string | Uint8Array;
    contentType: string;
    fileUrl?: string;
  },
) {
  const file = input.fileUrl
    ? { url: input.fileUrl }
    : await uploadGeneratedFinancialFile(input.filename, input.content, input.contentType);
  const hashSha256 = createHash("sha256").update(input.content).digest("hex");

  return db.$transaction(async (tx) => {
    const folderId = await resolveFinancialFolder(tx);
    await moveFinancialDocumentsToFolder(tx, folderId);
    const document = await tx.document.create({
      data: {
        title: input.title,
        documentType: input.documentType,
        fileUrl: file.url,
        folderId,
        status: "Válido",
      },
      select: { id: true },
    });
    await tx.documentVersion.create({
      data: {
        documentId: document.id,
        versionNumber: 1,
        fileUrl: file.url,
        hashSha256,
        status: "FINAL",
      },
    });
    return { documentId: document.id, folderId };
  });
}
