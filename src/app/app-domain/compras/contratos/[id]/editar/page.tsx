import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { ContratoForm } from "../../ContratoForm";
import { notFound } from "next/navigation";

export default async function EditarContratoPage({ params }: { params: Promise<{ id: string }> }) {
  const { prisma } = await getTenantContextForModule("COMPRAS");
  const resolvedParams = await params;
  const [contrato, processos, secretarias, fornecedores] = await Promise.all([
    prisma.contract.findUnique({
      where: { id: resolvedParams.id }
    }),
    prisma.purchaseProcess.findMany({ orderBy: { number: 'desc' } }),
    prisma.secretariat.findMany({ orderBy: { name: 'asc' } }),
    prisma.supplier.findMany({ include: { company: true }, orderBy: { company: { corporateName: 'asc' } } })
  ]);

  if (!contrato) {
    notFound();
  }

  return <ContratoForm data={contrato} processos={processos} secretarias={secretarias} fornecedores={fornecedores} />;
}
