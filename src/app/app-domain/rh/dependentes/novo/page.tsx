import { DependenteForm } from "../DependenteForm";
import { prisma } from "@/lib/prisma";

export default async function NovoDependentePage({ searchParams }: { searchParams: any }) {
  const employees = await prisma.employee.findMany({ orderBy: { name: 'asc' } });
  
  return (
    <DependenteForm employees={employees} defaultEmployeeId={searchParams?.employeeId} />
  );
}
