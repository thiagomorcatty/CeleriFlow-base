import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InventoryCountClient } from "../InventoryCountClient";

export default async function InventarioDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { prisma } = await getTenantContextForModule("PATRIMONIO");
  const session = await prisma.inventorySession.findUnique({
    where: { id },
    include: {
      warehouse: { select: { name: true } },
      createdByUsuario: { select: { nome: true } },
      approvedByUsuario: { select: { nome: true } },
      items: { orderBy: { stock: { material: { name: "asc" } } }, include: { stock: { include: { material: { select: { code: true, name: true, unitOfMeasure: true } } } } } },
    },
  });
  if (!session) notFound();

  const divergenceCount = session.items.filter((item) => item.countedQuantity !== null && item.countedQuantity !== item.expectedQuantity).length;
  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between gap-4"><div><h2 className="text-3xl font-bold tracking-tight">Relatório de Inventário</h2><p className="mt-1 text-muted-foreground">{session.warehouse.name} · iniciado em {session.startedAt.toLocaleString("pt-BR")}</p></div><Link href="/patrimonio/inventarios" className="text-sm font-medium underline">Voltar à listagem</Link></div>
      <Card><CardHeader><CardTitle>Rastreabilidade</CardTitle><CardDescription>Situação: {session.status}. Responsável pela abertura: {session.createdByUsuario.nome}. Itens com ajuste: {divergenceCount}.</CardDescription></CardHeader><CardContent className="grid gap-2 text-sm md:grid-cols-2"><p>Bloqueio de movimentos: {session.lockMovements ? "ativo" : "liberado"}</p><p>Enviado para aprovação: {session.submittedAt?.toLocaleString("pt-BR") ?? "não enviado"}</p><p>Aprovado por: {session.approvedByUsuario?.nome ?? "pendente"}</p><p>Evidência da aprovação: {session.approvalEvidence ?? "pendente"}</p></CardContent></Card>
      <Card><CardHeader><CardTitle>Contagem e divergências</CardTitle><CardDescription>O relatório preserva o saldo esperado, a contagem informada, justificativas e a evidência da aprovação.</CardDescription></CardHeader><CardContent><InventoryCountClient sessionId={session.id} status={session.status} items={session.items} /></CardContent></Card>
    </div>
  );
}
