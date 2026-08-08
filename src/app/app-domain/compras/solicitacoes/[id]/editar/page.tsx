import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { SolicitacaoForm } from "../../SolicitacaoForm";
import { notFound } from "next/navigation";

export default async function EditarSolicitacaoPage({ params }: { params: Promise<{ id: string }> }) {
  const { prisma } = await getTenantContextForModule("COMPRAS");
  const resolvedParams = await params;
  const [solicitacao, materials, secretarias] = await Promise.all([
    prisma.purchaseRequest.findUnique({
      where: { id: resolvedParams.id },
      include: { items: true }
    }),
    prisma.material.findMany({
      orderBy: { name: 'asc' }
    }),
    prisma.secretariat.findMany({
      orderBy: { name: 'asc' }
    })
  ]);

  if (!solicitacao) {
    notFound();
  }

  // Map materialId to catalogItemId so the form works seamlessly
  const mappedSolicitacao = {
    ...solicitacao,
    items: solicitacao.items.map((item) => ({
      catalogItemId: item.materialId ?? "",
      customName: item.customName ?? "",
      quantity: item.quantity,
      estimatedUnitValue: item.estimatedUnitValue ?? 0,
    }))
  };

  return <SolicitacaoForm data={mappedSolicitacao} catalogItems={materials} secretarias={secretarias} />;
}
