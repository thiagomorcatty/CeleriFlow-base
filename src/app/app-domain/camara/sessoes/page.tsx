import { prisma } from "@/lib/prisma";
import SessoesClient from "./SessoesClient";

export default async function SessoesPage() {
  const sessoes = await prisma.camSessao.findMany({
    orderBy: { data: 'desc' },
    include: {
      proposicoes: true,
      ata: true
    }
  });

  const sessoesWithAtas = sessoes.map(({ ata, ...sessao }) => ({
    ...sessao,
    atas: ata ? [ata] : []
  }));

  return <SessoesClient sessoes={sessoesWithAtas} />;
}
