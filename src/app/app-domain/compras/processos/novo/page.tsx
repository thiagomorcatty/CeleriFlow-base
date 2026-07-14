import { ProcessoForm } from "../ProcessoForm";
import { prisma } from "@/lib/prisma";

export default async function NovoProcessoPage() {
  const materials = await prisma.material.findMany({
    orderBy: { name: 'asc' }
  }).catch(() => []);

  return <ProcessoForm catalogItems={materials} />;
}
