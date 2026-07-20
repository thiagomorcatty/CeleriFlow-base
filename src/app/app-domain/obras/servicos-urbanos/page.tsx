import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { ServicosUrbanosClient } from "../components/ServicosUrbanosClient";

export default async function ServicosUrbanosPage() {
  const { prisma } = await getTenantContextForModule("OBRAS");
  const servicos = await prisma.obrasServico.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ServicosUrbanosClient servicos={servicos} />;
}
