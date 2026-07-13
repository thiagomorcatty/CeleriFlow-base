import { ServidorForm } from "../ServidorForm";
import { prisma } from "@/lib/prisma";

export default async function NovoServidorPage() {
  const roles = await prisma.role.findMany({ orderBy: { name: 'asc' } });
  const departments = await prisma.department.findMany({ orderBy: { name: 'asc' } });
  const secretariats = await prisma.secretariat.findMany({ orderBy: { name: 'asc' } });

  return (
    <ServidorForm 
      roles={roles} 
      departments={departments} 
      secretariats={secretariats} 
    />
  );
}
