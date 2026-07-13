import { prisma } from "@/lib/prisma";
import { ProcessoForm } from "../../ProcessoForm";
import { notFound } from "next/navigation";

export default async function EditarProcessoPage({ params }: { params: { id: string } }) {
  const processo = await prisma.purchaseProcess.findUnique({
    where: { id: params.id }
  });

  if (!processo) {
    notFound();
  }

  return <ProcessoForm data={processo} />;
}
