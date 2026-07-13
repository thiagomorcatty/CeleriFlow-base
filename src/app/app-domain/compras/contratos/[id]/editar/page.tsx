import { prisma } from "@/lib/prisma";
import { ContratoForm } from "../../ContratoForm";
import { notFound } from "next/navigation";

export default async function EditarContratoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const contrato = await prisma.contract.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!contrato) {
    notFound();
  }

  return <ContratoForm data={contrato} />;
}
