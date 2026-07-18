import { prisma } from "@/lib/prisma";
import PerfisClient from "./PerfisClient";

export default async function PerfisPage() {
  const perfis = await prisma.configuracaoPerfil.findMany({
    orderBy: { nome: "asc" },
  });

  return <PerfisClient perfis={perfis} />;
}
