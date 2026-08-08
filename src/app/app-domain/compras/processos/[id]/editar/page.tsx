import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { ProcessoForm } from "../../ProcessoForm";
import { notFound } from "next/navigation";

export default async function EditarProcessoPage({ params }: { params: Promise<{ id: string }> }) {
  const { prisma } = await getTenantContextForModule("COMPRAS");
  const resolvedParams = await params;
  const processoPromise = prisma.purchaseProcess.findUnique({
    where: { id: resolvedParams.id },
    include: { items: true }
  });
  
  const materialsPromise = prisma.material.findMany({
    orderBy: { name: 'asc' }
  });

  const [processo, materials] = await Promise.all([processoPromise, materialsPromise]);

  if (!processo) {
    notFound();
  }

  const mappedProcesso = {
    ...processo,
    items: processo.items.map((item) => ({
      catalogItemId: item.materialId ?? "",
      customName: item.customName ?? "",
      quantity: item.quantity,
      estimatedUnitValue: item.estimatedUnitValue ?? 0,
    }))
  };

  return <ProcessoForm data={mappedProcesso} catalogItems={materials} />;
}
