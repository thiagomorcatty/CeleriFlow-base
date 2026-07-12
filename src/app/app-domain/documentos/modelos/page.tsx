import { prisma } from "@/lib/prisma";
import ModelosClient from "./ModelosClient";

export const dynamic = "force-dynamic";

export default async function DocumentosModelosPage() {
  const modelos = await prisma.document.findMany({
    where: { documentType: "Modelo" },
    orderBy: { updatedAt: "desc" },
  });

  return <ModelosClient initialModelos={modelos} />;
}
