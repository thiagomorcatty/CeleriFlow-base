import { prisma } from "@/lib/prisma";
import { ContratoForm } from "../../ContratoForm";
import { notFound } from "next/navigation";

export default async function EditarContratoPage({ params }: { params: { id: string } }) {
  const contrato = await prisma.contract.findUnique({
    where: { id: params.id }
  });

  if (!contrato) {
    notFound();
  }

  return <ContratoForm data={contrato} />;
}
