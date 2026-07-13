import { ProcessoForm } from "../ProcessoForm";
import { prisma } from "@/lib/prisma";

export default async function NovoProcessoPage() {
  const catalogItems = await prisma.catalogItem.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' }
  }).catch(() => []);

  return <ProcessoForm catalogItems={catalogItems} />;
}
