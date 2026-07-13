import { BeneficioForm } from "../../BeneficioForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditarBeneficioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const benefit = await prisma.payrollBenefit.findUnique({
    where: { id }
  });

  if (!benefit) {
    notFound();
  }

  const employees = await prisma.employee.findMany({ orderBy: { name: 'asc' } });

  return (
    <BeneficioForm data={benefit} employees={employees} />
  );
}
