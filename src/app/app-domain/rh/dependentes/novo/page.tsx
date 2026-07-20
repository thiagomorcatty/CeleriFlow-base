import { DependenteForm } from "../DependenteForm";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export default async function NovoDependentePage({ searchParams }: { searchParams: any }) {
  const { prisma } = await getTenantContextForModule("RH");
  const employees = await prisma.employee.findMany({ orderBy: { name: 'asc' } });
  
  return (
    <DependenteForm employees={employees} defaultEmployeeId={searchParams?.employeeId} />
  );
}
