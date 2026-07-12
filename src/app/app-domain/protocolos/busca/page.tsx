import { prisma } from "@/lib/prisma";
import BuscaClient from "./BuscaClient";

export const dynamic = "force-dynamic";

export default async function BuscarProcessoPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const query = searchParams?.q as string | undefined;

  const processos = await prisma.process.findMany({
    where: query ? {
      OR: [
        { protocolNumber: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } }
      ]
    } : undefined,
    include: {
      processType: true,
      subject: true,
      person: true,
      company: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  return <BuscaClient initialProcessos={processos} query={query || ""} />;
}
