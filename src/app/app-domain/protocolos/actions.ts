"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const AWAITING_RECEIPT = "Aguardando Recebimento";

async function getOperationalContext() {
  const context = await getTenantContextForModule("PROTOCOLOS");
  if (!context.user.employeeId) {
    throw new Error("Seu usuario precisa estar vinculado a um servidor para realizar esta operacao.");
  }

  const employee = await context.prisma.employee.findUnique({
    where: { id: context.user.employeeId },
    include: { department: true },
  });

  if (!employee?.isActive || !employee.departmentId || !employee.department?.isActive) {
    throw new Error("Seu vinculo operacional nao esta ativo ou nao possui departamento.");
  }

  return { ...context, employee, departmentId: employee.departmentId };
}

function revalidateProtocolPages() {
  for (const path of [
    "/protocolos/processos",
    "/protocolos/arquivados",
    "/protocolos/busca",
    "/app-domain/protocolos/processos",
    "/app-domain/protocolos/arquivados",
    "/app-domain/protocolos/busca",
  ]) {
    revalidatePath(path);
  }
}

export async function createProtocol(formData: FormData): Promise<void> {
  const { prisma, employee } = await getOperationalContext();
  const processTypeId = String(formData.get("processTypeId") || "");
  const subjectId = String(formData.get("subjectId") || "");
  const personId = String(formData.get("personId") || "") || null;
  const companyId = String(formData.get("companyId") || "") || null;
  const selectedDepartmentId = String(formData.get("initialDepartmentId") || "") || null;
  const requestedPriority = String(formData.get("priority") || "");
  const description = String(formData.get("description") || "").trim() || null;

  if (!processTypeId || !subjectId) throw new Error("Selecione o Tipo e o Assunto do processo.");
  if (personId && companyId) throw new Error("Selecione apenas um interessado: pessoa ou empresa.");

  const process = await prisma.$transaction(async (tx) => {
    const subject = await tx.subject.findFirst({
      where: { id: subjectId, processTypeId, isActive: true },
      include: { processType: true },
    });

    if (!subject || !subject.processType.isActive) {
      throw new Error("O Assunto selecionado nao pertence a um Tipo de Processo ativo.");
    }
    if (!subject.allowsInternalOpening || !subject.processType.allowsInternalOpening) {
      throw new Error("Este processo nao permite abertura interna.");
    }
    if ((subject.requiresInterested || subject.processType.requiresInterested) && !personId && !companyId) {
      throw new Error("Este processo exige a selecao de um interessado.");
    }

    const initialDepartmentId = subject.initialDepartmentId || subject.processType.initialDepartmentId || selectedDepartmentId;
    if (!initialDepartmentId) throw new Error("Selecione o setor inicial responsavel pelo processo.");

    const department = await tx.department.findFirst({
      where: { id: initialDepartmentId, isActive: true },
      select: { id: true },
    });
    if (!department) throw new Error("O setor inicial selecionado nao esta ativo.");

    const year = new Date().getFullYear();
    const sequence = await tx.processSequence.upsert({
      where: { year },
      create: { year, nextNumber: 2 },
      update: { nextNumber: { increment: 1 } },
      select: { nextNumber: true },
    });
    const protocolNumber = `PROC-${year}-${String(sequence.nextNumber - 1).padStart(6, "0")}`;
    const slaDays = subject.slaDays ?? subject.processType.defaultSlaDays;
    const expectedCompletionAt = slaDays ? new Date(Date.now() + slaDays * 24 * 60 * 60 * 1000) : null;
    const priority = requestedPriority || subject.defaultPriority || subject.processType.defaultPriority || "Normal";

    return tx.process.create({
      data: {
        protocolNumber,
        personId,
        companyId,
        processTypeId,
        subjectId,
        priority,
        description,
        status: AWAITING_RECEIPT,
        currentDepartmentId: department.id,
        expectedCompletionAt,
        movements: {
          create: {
            toDepartmentId: department.id,
            employeeId: employee.id,
            reason: "Distribuicao inicial",
            status: "AWAITING_RECEIPT",
            dueAt: expectedCompletionAt,
          },
        },
        events: {
          create: {
            eventType: "OPENED",
            description: "Processo protocolado e encaminhado ao setor inicial.",
            newStatus: AWAITING_RECEIPT,
            departmentId: department.id,
            employeeId: employee.id,
          },
        },
      },
      select: { id: true },
    });
  });

  revalidateProtocolPages();
  redirect(`/protocolos/processos/${process.id}`);
}

export async function receiveProcess(processId: string): Promise<{ error: string | null }> {
  try {
    const { prisma, employee, departmentId } = await getOperationalContext();

    await prisma.$transaction(async (tx) => {
      const process = await tx.process.findUnique({
        where: { id: processId },
        select: { id: true, status: true, currentDepartmentId: true },
      });
      if (!process) throw new Error("Processo nao encontrado.");
      if (process.currentDepartmentId !== departmentId) {
        throw new Error("Este processo nao pertence ao seu setor.");
      }
      if (process.status !== AWAITING_RECEIPT) {
        throw new Error("Somente processos aguardando recebimento podem ser recebidos.");
      }

      const movement = await tx.processMovement.findFirst({
        where: {
          processId,
          toDepartmentId: departmentId,
          receivedAt: null,
          status: "AWAITING_RECEIPT",
        },
        orderBy: { movedAt: "desc" },
        select: { id: true },
      });
      if (!movement) throw new Error("Nao foi encontrada uma tramitacao pendente para este processo.");

      const receivedAt = new Date();
      const updatedMovement = await tx.processMovement.updateMany({
        where: { id: movement.id, receivedAt: null, status: "AWAITING_RECEIPT" },
        data: { status: "RECEIVED", receivedAt, receivedByEmployeeId: employee.id },
      });
      if (updatedMovement.count !== 1) throw new Error("O processo ja foi recebido por outro servidor.");

      await tx.process.update({
        where: { id: processId },
        data: { status: "Recebido", receivedAt, currentResponsibleEmployeeId: employee.id },
      });
      await tx.processEvent.create({
        data: {
          processId,
          eventType: "RECEIVED",
          description: "Processo recebido pelo setor responsavel.",
          previousStatus: AWAITING_RECEIPT,
          newStatus: "Recebido",
          departmentId,
          employeeId: employee.id,
        },
      });
    });

    revalidateProtocolPages();
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : "Erro ao receber o processo." };
  }
}

export async function forwardProcess(data: {
  processId: string;
  destinationDepartmentId: string;
  destinationEmployeeId?: string;
  reason?: string;
  dueAt?: string;
}): Promise<{ error: string | null }> {
  try {
    const { prisma, employee, departmentId } = await getOperationalContext();
    const destinationEmployeeId = data.destinationEmployeeId || null;
    const reason = data.reason?.trim() || null;
    const dueAt = data.dueAt ? new Date(data.dueAt) : null;

    if (!data.destinationDepartmentId) throw new Error("Selecione o setor de destino.");
    if (data.destinationDepartmentId === departmentId) throw new Error("Selecione um setor diferente do atual.");
    if (dueAt && Number.isNaN(dueAt.valueOf())) throw new Error("Informe um prazo valido.");

    await prisma.$transaction(async (tx) => {
      const process = await tx.process.findUnique({
        where: { id: data.processId },
        select: { id: true, status: true, currentDepartmentId: true },
      });
      if (!process) throw new Error("Processo nao encontrado.");
      if (process.currentDepartmentId !== departmentId) throw new Error("Este processo nao pertence ao seu setor.");
      if (["Arquivado", "Cancelado"].includes(process.status)) throw new Error("Este processo nao aceita novas operacoes.");
      if (process.status === AWAITING_RECEIPT) throw new Error("Receba o processo antes de tramita-lo.");

      const destinationDepartment = await tx.department.findFirst({
        where: { id: data.destinationDepartmentId, isActive: true },
        select: { id: true },
      });
      if (!destinationDepartment) throw new Error("O setor de destino nao esta ativo.");

      if (destinationEmployeeId) {
        const destinationEmployee = await tx.employee.findFirst({
          where: { id: destinationEmployeeId, departmentId: destinationDepartment.id, isActive: true },
          select: { id: true },
        });
        if (!destinationEmployee) throw new Error("O servidor de destino nao pertence ao setor selecionado.");
      }

      await tx.processMovement.create({
        data: {
          processId: process.id,
          fromDepartmentId: departmentId,
          toDepartmentId: destinationDepartment.id,
          employeeId: employee.id,
          destinationEmployeeId,
          reason,
          status: "AWAITING_RECEIPT",
          dueAt,
        },
      });
      await tx.process.update({
        where: { id: process.id },
        data: {
          status: AWAITING_RECEIPT,
          currentDepartmentId: destinationDepartment.id,
          currentResponsibleEmployeeId: destinationEmployeeId,
        },
      });
      await tx.processEvent.create({
        data: {
          processId: process.id,
          eventType: "FORWARDED",
          description: reason || "Processo encaminhado para outro setor.",
          previousStatus: process.status,
          newStatus: AWAITING_RECEIPT,
          departmentId,
          employeeId: employee.id,
        },
      });
    });

    revalidateProtocolPages();
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : "Erro ao tramitar o processo." };
  }
}

export async function addProcessDispatch(data: {
  processId: string;
  content: string;
  dispatchType: string;
}): Promise<{ error: string | null }> {
  try {
    const { prisma, employee, departmentId } = await getOperationalContext();
    const content = data.content.trim();
    const dispatchType = ["Despacho", "Parecer", "Decisao"].includes(data.dispatchType) ? data.dispatchType : "Despacho";
    if (!content) throw new Error("Informe o conteudo do despacho.");

    await prisma.$transaction(async (tx) => {
      const process = await tx.process.findUnique({
        where: { id: data.processId },
        select: { id: true, status: true, currentDepartmentId: true },
      });
      if (!process) throw new Error("Processo nao encontrado.");
      if (process.currentDepartmentId !== departmentId) throw new Error("Este processo nao pertence ao seu setor.");
      if (["Arquivado", "Cancelado"].includes(process.status)) throw new Error("Este processo nao aceita novas operacoes.");
      if (process.status === AWAITING_RECEIPT) throw new Error("Receba o processo antes de adicionar um despacho.");

      await tx.processDispatch.create({
        data: { processId: process.id, content, dispatchType, employeeId: employee.id, departmentId },
      });
      await tx.processEvent.create({
        data: {
          processId: process.id,
          eventType: "DISPATCH_ADDED",
          description: `${dispatchType} adicionado ao processo.`,
          departmentId,
          employeeId: employee.id,
        },
      });
    });

    revalidateProtocolPages();
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : "Erro ao adicionar o despacho." };
  }
}

export async function addProcessDocument(data: {
  processId: string;
  title: string;
  fileUrl: string;
  documentType: string;
}): Promise<{ error: string | null }> {
  try {
    const { prisma, employee, departmentId } = await getOperationalContext();
    const title = data.title.trim();
    if (!title || !data.fileUrl) throw new Error("Informe o titulo e envie o arquivo.");
    const url = new URL(data.fileUrl);
    const isVercelBlobHost = url.hostname === "blob.vercel-storage.com" || url.hostname.endsWith(".blob.vercel-storage.com");
    if (url.protocol !== "https:" || !isVercelBlobHost || !url.pathname.startsWith("/process-documents/")) {
      throw new Error("O arquivo enviado nao e valido para Protocolos.");
    }

    await prisma.$transaction(async (tx) => {
      const process = await tx.process.findUnique({
        where: { id: data.processId },
        select: { id: true, status: true, currentDepartmentId: true },
      });
      if (!process) throw new Error("Processo nao encontrado.");
      if (process.currentDepartmentId !== departmentId) throw new Error("Este processo nao pertence ao seu setor.");
      if (["Arquivado", "Cancelado"].includes(process.status)) throw new Error("Este processo nao aceita novas operacoes.");
      if (process.status === AWAITING_RECEIPT) throw new Error("Receba o processo antes de anexar documentos.");

      await tx.processDocument.create({
        data: {
          processId: process.id,
          title,
          fileUrl: data.fileUrl,
          documentType: data.documentType || "Anexo",
          employeeId: employee.id,
        },
      });
      await tx.processEvent.create({
        data: {
          processId: process.id,
          eventType: "DOCUMENT_ADDED",
          description: `Documento ${title} anexado ao processo.`,
          departmentId,
          employeeId: employee.id,
        },
      });
    });

    revalidateProtocolPages();
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : "Erro ao anexar o documento." };
  }
}

export async function concludeProcess(processId: string, reason: string): Promise<{ error: string | null }> {
  try {
    const { prisma, employee, departmentId } = await getOperationalContext();
    const description = reason.trim();
    if (!description) throw new Error("Informe a justificativa da conclusao.");

    await prisma.$transaction(async (tx) => {
      const process = await tx.process.findUnique({ where: { id: processId }, select: { status: true, currentDepartmentId: true } });
      if (!process) throw new Error("Processo nao encontrado.");
      if (process.currentDepartmentId !== departmentId) throw new Error("Este processo nao pertence ao seu setor.");
      if (process.status === AWAITING_RECEIPT) throw new Error("Receba o processo antes de conclui-lo.");
      if (["Concluido", "Arquivado", "Cancelado"].includes(process.status)) throw new Error("Este processo nao pode ser concluido novamente.");

      const completedAt = new Date();
      await tx.process.update({ where: { id: processId }, data: { status: "Concluido", completedAt } });
      await tx.processEvent.create({
        data: { processId, eventType: "CONCLUDED", description, previousStatus: process.status, newStatus: "Concluido", departmentId, employeeId: employee.id },
      });
    });
    revalidateProtocolPages();
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : "Erro ao concluir o processo." };
  }
}

export async function archiveProcess(processId: string, reason: string): Promise<{ error: string | null }> {
  try {
    const { prisma, employee, departmentId } = await getOperationalContext();
    const archiveReason = reason.trim();
    if (!archiveReason) throw new Error("Informe a justificativa do arquivamento.");

    await prisma.$transaction(async (tx) => {
      const process = await tx.process.findUnique({ where: { id: processId }, select: { status: true, currentDepartmentId: true } });
      if (!process) throw new Error("Processo nao encontrado.");
      if (process.currentDepartmentId !== departmentId) throw new Error("Este processo nao pertence ao seu setor.");
      if (process.status !== "Concluido") throw new Error("Somente processos concluidos podem ser arquivados.");

      const archivedAt = new Date();
      await tx.process.update({
        where: { id: processId },
        data: { status: "Arquivado", archivedAt, archiveReason, archivedByEmployeeId: employee.id },
      });
      await tx.processEvent.create({
        data: { processId, eventType: "ARCHIVED", description: archiveReason, previousStatus: "Concluido", newStatus: "Arquivado", departmentId, employeeId: employee.id },
      });
    });
    revalidateProtocolPages();
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : "Erro ao arquivar o processo." };
  }
}

export async function reopenProcess(processId: string, reason: string): Promise<{ error: string | null }> {
  try {
    const { prisma, employee, departmentId } = await getOperationalContext();
    const description = reason.trim();
    if (!description) throw new Error("Informe a justificativa da reabertura.");

    await prisma.$transaction(async (tx) => {
      const process = await tx.process.findUnique({ where: { id: processId }, select: { status: true, currentDepartmentId: true } });
      if (!process) throw new Error("Processo nao encontrado.");
      if (process.currentDepartmentId !== departmentId) throw new Error("Este processo nao pertence ao seu setor.");
      if (process.status !== "Arquivado") throw new Error("Somente processos arquivados podem ser reabertos.");

      await tx.process.update({
        where: { id: processId },
        data: { status: "Reaberto", archivedAt: null, archiveReason: null, archivedByEmployeeId: null, currentResponsibleEmployeeId: employee.id },
      });
      await tx.processEvent.create({
        data: { processId, eventType: "REOPENED", description, previousStatus: "Arquivado", newStatus: "Reaberto", departmentId, employeeId: employee.id },
      });
    });
    revalidateProtocolPages();
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : "Erro ao reabrir o processo." };
  }
}
