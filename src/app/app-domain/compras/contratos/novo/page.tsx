import { ContratoForm } from "../ContratoForm";
import { prisma } from "@/lib/prisma"

export default async function NovoContratoPage() {
  const [processos, secretarias, fornecedores] = await Promise.all([
    prisma.purchaseProcess.findMany({ orderBy: { number: 'desc' } }),
    prisma.secretariat.findMany({ orderBy: { name: 'asc' } }),
    prisma.supplier.findMany({ include: { company: true }, orderBy: { company: { corporateName: 'asc' } } })
  ]);

  return <ContratoForm processos={processos} secretarias={secretarias} fornecedores={fornecedores} />;
}
