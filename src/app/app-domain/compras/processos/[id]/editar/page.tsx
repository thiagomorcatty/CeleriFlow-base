import { prisma } from "@/lib/prisma";
import { ProcessoForm } from "../../ProcessoForm";
import { notFound } from "next/navigation";

export default async function EditarProcessoPage({ params }: { params: { id: string } }) {
  const [processo, catalogItems] = await Promise.all([
    prisma.purchaseProcess.findUnique({
      where: { id: params.id },
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
