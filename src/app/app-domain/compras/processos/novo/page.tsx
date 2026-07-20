import { ProcessoForm } from "../ProcessoForm";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export default async function NovoProcessoPage() {
  const { prisma } = await getTenantContextForModule("COMPRAS");
  const materials = await prisma.material.findMany({
    orderBy: { name: 'asc' }
  }).catch(() => []);

  return <ProcessoForm catalogItems={materials} />;
}
