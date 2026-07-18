import { prisma } from "@/lib/prisma";
import { ServicosUrbanosClient } from "../components/ServicosUrbanosClient";

export default async function ServicosUrbanosPage() {
  const servicos = await prisma.obrasServico.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ServicosUrbanosClient servicos={servicos} />;
}
