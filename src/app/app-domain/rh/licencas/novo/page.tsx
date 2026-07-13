import { LicencaForm } from "../LicencaForm";
import { prisma } from "@/lib/prisma";

export default async function NovaLicencaPage() {
  const employees = await prisma.employee.findMany({ orderBy: { name: 'asc' } });
  
  return (
    <LicencaForm employees={employees} />
  );
}
