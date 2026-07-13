import { prisma } from "@/lib/prisma";
import { ProcessoForm } from "../../ProcessoForm";
import { notFound } from "next/navigation";

export default async function EditarProcessoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const [processo, catalogItems] = await Promise.all([
    prisma.purchaseProcess.findUnique({
      where: { id: resolvedParams.id },
      include: { items: true }
    }),
    prisma.catalogItem.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    })
  ]);

  if (!processo) {
    notFound();
  }

  return <ProcessoForm data={processo} catalogItems={catalogItems} />;
}
