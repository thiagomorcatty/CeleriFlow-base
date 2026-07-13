import { BeneficioForm } from "../BeneficioForm";
import { prisma } from "@/lib/prisma";

export default async function NovoBeneficioPage() {
  const employees = await prisma.employee.findMany({ orderBy: { name: 'asc' } });
  
  return (
    <BeneficioForm employees={employees} />
  );
}
