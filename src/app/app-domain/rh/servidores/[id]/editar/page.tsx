import { ServidorForm } from "../../ServidorForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditarServidorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const employee = await prisma.employee.findUnique({
    where: { id }
  });

  if (!employee) {
    notFound();
  }

  const roles = await prisma.role.findMany({ orderBy: { name: 'asc' } });
  const departments = await prisma.department.findMany({ orderBy: { name: 'asc' } });
  const secretariats = await prisma.secretariat.findMany({ orderBy: { name: 'asc' } });

  return (
    <ServidorForm 
      data={employee} 
      roles={roles} 
      departments={departments} 
      secretariats={secretariats} 
    />
  );
}
