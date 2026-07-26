"use server";

import { getProtocolContext } from "@/lib/protocols/access";
import { notifyProtocolDepartment, notifyProtocolUsers } from "@/lib/protocols/notifications";
import { createValidatedProcess } from "@/lib/protocols/service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const AWAITING_RECEIPT = "Aguardando Recebimento";

async function getOperationalContext() {
  const context = await getProtocolContext("edit");
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
    "/protocolos/notificacoes",
    "/protocolos/relatorios",
    "/app-domain/protocolos/processos",
    "/app-domain/protocolos/arquivados",
    "/app-domain/protocolos/busca",
    "/app-domain/protocolos/notificacoes",
    "/app-domain/protocolos/relatorios",
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

  const process = await prisma.$transaction((tx) => createValidatedProcess(tx, employee, {
    processTypeId, subjectId, personId, companyId, initialDepartmentId: selectedDepartmentId, priority: requestedPriority, description,
  }));

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
        select: { id: true, employeeId: true, process: { select: { protocolNumber: true } } },
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
      const sender = movement.employeeId
        ? await tx.usuario.findUnique({ where: { employeeId: movement.employeeId }, select: { id: true } })
        : null;
      if (sender) {
        await notifyProtocolUsers(tx, [sender.id], {
          processId,
          type: "RECEIVED",
          title: `Processo recebido: ${movement.process.protocolNumber}`,
          message: "O setor de destino confirmou o recebimento do processo.",
        });
      }
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
        select: {
          id: true,
          protocolNumber: true,
          status: true,
          currentDepartmentId: true,
          processTypeId: true,
          subjectId: true,
          currentWorkflowStageId: true,
          expectedCompletionAt: true,
        },
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

      const subjectStages = await tx.processWorkflowStage.findMany({
        where: { processTypeId: process.processTypeId, subjectId: process.subjectId, isActive: true },
        orderBy: { position: "asc" },
      });
      const workflowStages = subjectStages.length
        ? subjectStages
        : await tx.processWorkflowStage.findMany({
            where: { processTypeId: process.processTypeId, subjectId: null, isActive: true },
            orderBy: { position: "asc" },
          });
      const currentStage = workflowStages.find((stage) => stage.id === process.currentWorkflowStageId)
        || workflowStages.find((stage) => stage.departmentId === departmentId)
        || null;
      const nextStage = currentStage
        ? workflowStages.find((stage) => stage.position > currentStage.position) || null
        : null;
      if (currentStage && !nextStage) throw new Error("O fluxo configurado terminou nesta etapa. Conclua o processo ou ajuste o fluxo.");
      if (nextStage && nextStage.departmentId !== destinationDepartment.id) {
        throw new Error("O setor selecionado nao corresponde a proxima etapa configurada do fluxo.");
      }
      const effectiveDueAt = dueAt || (nextStage?.slaDays ? new Date(Date.now() + nextStage.slaDays * 24 * 60 * 60 * 1000) : null);

      await tx.processMovement.create({
        data: {
          processId: process.id,
          fromDepartmentId: departmentId,
          toDepartmentId: destinationDepartment.id,
          employeeId: employee.id,
          destinationEmployeeId,
          reason,
          status: "AWAITING_RECEIPT",
          dueAt: effectiveDueAt,
        },
      });
      await tx.process.update({
        where: { id: process.id },
        data: {
          status: AWAITING_RECEIPT,
          currentDepartmentId: destinationDepartment.id,
          currentResponsibleEmployeeId: destinationEmployeeId,
          currentWorkflowStageId: nextStage?.id || process.currentWorkflowStageId,
          expectedCompletionAt: effectiveDueAt || process.expectedCompletionAt,
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
      await notifyProtocolDepartment(tx, destinationDepartment.id, {
        processId: process.id,
        type: "FORWARDED",
        title: `Processo encaminhado: ${process.protocolNumber}`,
        message: `O processo foi encaminhado pelo seu setor de origem${reason ? `: ${reason}` : "."}`,
      });
      if (effectiveDueAt) {
        await notifyProtocolDepartment(tx, destinationDepartment.id, {
          processId: process.id,
          type: "DEADLINE",
          title: `Prazo definido: ${process.protocolNumber}`,
          message: `Prazo da etapa: ${effectiveDueAt.toLocaleDateString("pt-BR")}.`,
        });
      }
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

export async function markProtocolNotificationRead(notificationId: string): Promise<{ error: string | null }> {
  try {
    const { prisma, user } = await getProtocolContext();
    const updated = await prisma.protocolNotification.updateMany({
      where: { id: notificationId, userId: user.id, readAt: null },
      data: { readAt: new Date() },
    });
    if (!updated.count) throw new Error("Notificacao nao encontrada ou ja lida.");
    revalidatePath("/protocolos/notificacoes");
    return { error: null };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao atualizar notificacao." };
  }
}
