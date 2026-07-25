import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET || process.env.PROTOCOLS_CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "Cron secret is not configured." }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const horizon = new Date(now.getTime() + 3 * 86_400_000);
  const processes = await prisma.process.findMany({
    where: {
      expectedCompletionAt: { gte: now, lte: horizon },
      status: { notIn: ["Concluido", "Arquivado", "Cancelado"] },
      currentDepartmentId: { not: null },
    },
    select: { id: true, protocolNumber: true, currentDepartmentId: true, expectedCompletionAt: true },
    take: 500,
  });

  let created = 0;
  for (const process of processes) {
    const recipients = await prisma.usuario.findMany({
      where: { ativo: true, employee: { is: { isActive: true, departmentId: process.currentDepartmentId! } } },
      select: { id: true },
    });
    if (!recipients.length) continue;
    const deadline = process.expectedCompletionAt!;
    const dedupeKey = `deadline:${process.id}:${deadline.toISOString()}`;
    for (const recipient of recipients) {
      const existing = await prisma.protocolNotification.findFirst({ where: { userId: recipient.id, dedupeKey }, select: { id: true } });
      if (existing) continue;
      await prisma.protocolNotification.create({
        data: {
          userId: recipient.id,
          processId: process.id,
          type: "DEADLINE_REMINDER",
          title: `Prazo proximo: ${process.protocolNumber}`,
          message: `O prazo previsto e ${deadline.toLocaleDateString("pt-BR")}.`,
          dedupeKey,
        },
      });
      created += 1;
    }
  }

  return NextResponse.json({ checked: processes.length, created });
}
