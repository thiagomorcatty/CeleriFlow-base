import { prisma } from "@/lib/prisma";
import VereadoresClient from "./VereadoresClient";

export default async function VereadoresPage() {
  const vereadores = await prisma.camVereador.findMany({
    orderBy: { nomeParlamentar: 'asc' },
    include: {
      gabinete: true,
      cargosMesa: true,
      legislatura: true
    }
  });

  return <VereadoresClient vereadores={vereadores} />;
}
