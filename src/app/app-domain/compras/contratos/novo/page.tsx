import { ContratoForm } from "../ContratoForm";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export default async function NovoContratoPage() {
  const { prisma } = await getTenantContextForModule("COMPRAS");
  const [processos, secretarias, fornecedores] = await Promise.all([
    prisma.purchaseProcess.findMany({ orderBy: { number: 'desc' } }),
    prisma.secretariat.findMany({ orderBy: { name: 'asc' } }),
    prisma.supplier.findMany({ include: { company: true }, orderBy: { company: { corporateName: 'asc' } } })
  ]);

  return <ContratoForm processos={processos} secretarias={secretarias} fornecedores={fornecedores} />;
}
