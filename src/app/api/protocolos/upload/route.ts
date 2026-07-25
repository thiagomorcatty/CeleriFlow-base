import { NextRequest, NextResponse } from "next/server";
import { AccessError, getCurrentTenantContext } from "@/lib/platform/tenant-context";
import { uploadProcessFile } from "@/lib/platform/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const context = await getCurrentTenantContext();
    if (!context.user.employeeId) {
      throw new Error("Seu usuario precisa estar vinculado a um servidor para anexar documentos.");
    }

    const employee = await context.prisma.employee.findUnique({
      where: { id: context.user.employeeId },
      include: { department: true },
    });
    if (!employee?.isActive || !employee.departmentId || !employee.department?.isActive) {
      throw new Error("Seu vinculo operacional nao esta ativo ou nao possui departamento.");
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const processId = String(formData.get("processId") || "");
    const title = String(formData.get("title") || "").trim();
    const documentType = String(formData.get("documentType") || "Anexo").trim() || "Anexo";
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
    }
    if (!processId || !title) {
      return NextResponse.json({ error: "Informe o processo e o titulo do documento." }, { status: 400 });
    }

    const blob = await uploadProcessFile(file);
    const document = await context.prisma.$transaction(async (tx) => {
      const process = await tx.process.findUnique({
        where: { id: processId },
        select: { id: true, protocolNumber: true, status: true, currentDepartmentId: true },
      });
      if (!process) throw new Error("Processo nao encontrado.");
      if (process.currentDepartmentId !== employee.departmentId) throw new Error("Este processo nao pertence ao seu setor.");
      if (["Aguardando Recebimento", "Arquivado", "Cancelado"].includes(process.status)) {
        throw new Error("Este processo nao aceita anexos neste momento.");
      }

      const document = await tx.document.create({
        data: {
          title,
          documentType,
          fileUrl: blob.url,
          status: "Válido",
          notes: `Anexo do processo ${process.protocolNumber}.`,
        },
      });
      await tx.processDocument.create({
        data: {
          processId: process.id,
          documentId: document.id,
          purpose: documentType,
          employeeId: employee.id,
          // Mantidos durante a migracao dos anexos existentes.
          title,
          fileUrl: blob.url,
          documentType,
        },
      });
      await tx.processEvent.create({
        data: {
          processId: process.id,
          eventType: "DOCUMENT_ADDED",
          description: `Documento ${title} anexado ao processo e registrado no GED.`,
          departmentId: employee.departmentId,
          employeeId: employee.id,
        },
      });
      return document;
    });

    return NextResponse.json({ id: document.id }, { status: 201 });
  } catch (error) {
    if (error instanceof AccessError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro interno ao enviar o arquivo." },
      { status: 400 },
    );
  }
}
