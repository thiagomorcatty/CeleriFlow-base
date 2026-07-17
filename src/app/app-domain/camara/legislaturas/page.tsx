import { prisma } from "@/lib/prisma";
import LegislaturasClient from "./LegislaturasClient";

export default async function LegislaturasPage() {
  const legislaturas = await prisma.camLegislatura.findMany({
    orderBy: { numero: 'desc' },
    include: {
      _count: {
        select: { vereadores: true }
      }
    }
  });

  return <LegislaturasClient legislaturas={legislaturas} />;
}
