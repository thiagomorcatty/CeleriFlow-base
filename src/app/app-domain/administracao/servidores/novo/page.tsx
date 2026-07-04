import { prisma } from "@/lib/prisma";
import NovoServidorForm from "./NovoServidorForm";

export const dynamic = "force-dynamic";

export default async function NovoServidorPage() {
  const roles = await prisma.role.findMany({ orderBy: { name: 'asc' } });
  const secretariats = await prisma.secretariat.findMany({ orderBy: { name: 'asc' } });
  const departments = await prisma.department.findMany({ orderBy: { name: 'asc' } });
  const units = await prisma.administrativeUnit.findMany({ orderBy: { name: 'asc' } });
  
  return <NovoServidorForm roles={roles} secretariats={secretariats} departments={departments} units={units} />;
}
