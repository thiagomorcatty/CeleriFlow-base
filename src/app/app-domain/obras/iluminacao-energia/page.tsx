import { prisma } from "@/lib/prisma";
import { IluminacaoEnergiaClient } from "../components/IluminacaoEnergiaClient";

export default async function IluminacaoEnergiaPage() {
  const servicos = await prisma.obrasServico.findMany({
    where: { tipo: "Iluminação" },
    orderBy: { createdAt: "desc" },
    include: {
      targetAsset: { include: { realEstate: true } },
      department: true,
      budgetAppropriation: true,
      commitment: true,
      employees: { include: { employee: true } },
      teams: { include: { equipe: true } },
      equipment: { include: { asset: true } },
      materials: { include: { material: true, stock: true } },
      documents: { include: { document: true } },
      purchases: { include: { purchaseRequest: true, purchaseProcess: true } },
    },
  });

  return <IluminacaoEnergiaClient servicos={servicos} />;
}
