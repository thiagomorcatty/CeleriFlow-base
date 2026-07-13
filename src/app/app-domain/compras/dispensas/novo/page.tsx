import { prisma } from "@/lib/prisma";
import { DispensaForm } from "../DispensaForm";

export default async function NovaDispensaPage() {
  const [processos, fornecedores] = await Promise.all([
    prisma.purchaseProcess.findMany({ orderBy: { number: 'desc' } }),
    prisma.supplier.findMany({ include: { company: true }, orderBy: { company: { corporateName: 'asc' } } })
  ]);

  return <DispensaForm processos={processos} fornecedores={fornecedores} />;
}
