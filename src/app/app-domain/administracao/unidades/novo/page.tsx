import { prisma } from "@/lib/prisma";
import NovaUnidadeForm from "./NovaUnidadeForm";

export const dynamic = "force-dynamic";

export default async function NovaUnidadePage() {
  const secretariats = await prisma.secretariat.findMany({ orderBy: { name: 'asc' } });
  
  return <NovaUnidadeForm secretariats={secretariats} />;
}
