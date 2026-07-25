import type { Prisma } from "@prisma/client";

type NotificationInput = {
  processId: string;
  type: string;
  title: string;
  message: string;
};

export async function notifyProtocolDepartment(
  tx: Prisma.TransactionClient,
  departmentId: string,
  notification: NotificationInput,
) {
  const recipients = await tx.usuario.findMany({
    where: { ativo: true, employee: { is: { isActive: true, departmentId } } },
    select: { id: true },
  });
  if (!recipients.length) return;

  await tx.protocolNotification.createMany({
    data: recipients.map((recipient) => ({ userId: recipient.id, ...notification })),
  });
}

export async function notifyProtocolUsers(
  tx: Prisma.TransactionClient,
  userIds: string[],
  notification: NotificationInput,
) {
  const recipients = [...new Set(userIds)].filter(Boolean);
  if (!recipients.length) return;

  await tx.protocolNotification.createMany({
    data: recipients.map((userId) => ({ userId, ...notification })),
  });
}
