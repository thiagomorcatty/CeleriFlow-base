import { prisma } from "@/lib/prisma";
import NovoDepartamentoForm from "./NovoDepartamentoForm";

export const dynamic = "force-dynamic";

export default async function NovaDepartamentoPage() {
  const secretariats = await prisma.secretariat.findMany({ orderBy: { name: 'asc' } });
  
  return <NovoDepartamentoForm secretariats={secretariats} />;
}
