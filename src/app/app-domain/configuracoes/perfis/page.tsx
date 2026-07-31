import { getTenantContextForSystemAdministration } from "@/lib/platform/tenant-context";
import PerfisClient from "./PerfisClient";

export default async function PerfisPage() {
  const { prisma } = await getTenantContextForSystemAdministration();
  const perfis = await prisma.configuracaoPerfil.findMany({
    orderBy: { nome: "asc" },
  });

  return <PerfisClient perfis={perfis} />;
}
