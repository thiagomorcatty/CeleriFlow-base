import { FeriasForm } from "../FeriasForm";
import { prisma } from "@/lib/prisma";

export default async function NovaFeriasPage() {
  const employees = await prisma.employee.findMany({ orderBy: { name: 'asc' } });
  
  return (
    <FeriasForm employees={employees} />
  );
}
