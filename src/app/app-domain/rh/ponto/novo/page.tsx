import { PontoForm } from "../PontoForm";
import { prisma } from "@/lib/prisma";

export default async function NovoPontoPage() {
  const employees = await prisma.employee.findMany({ orderBy: { name: 'asc' } });
  
  return (
    <PontoForm employees={employees} />
  );
}
