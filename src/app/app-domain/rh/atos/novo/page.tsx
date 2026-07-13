import { AtoForm } from "../AtoForm";
import { prisma } from "@/lib/prisma";

export default async function NovoAtoPage() {
  const employees = await prisma.employee.findMany({ orderBy: { name: 'asc' } });
  
  return (
    <AtoForm employees={employees} />
  );
}
