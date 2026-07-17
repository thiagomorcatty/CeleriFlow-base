import { prisma } from "@/lib/prisma";
import ComissoesClient from "./ComissoesClient";

export default async function ComissoesPage() {
  const comissoes = await prisma.camComissao.findMany({
    orderBy: { nome: 'asc' },
    include: {
      membros: {
        include: {
          vereador: true
        }
      }
    }
  });

  return <ComissoesClient comissoes={comissoes} />;
}
