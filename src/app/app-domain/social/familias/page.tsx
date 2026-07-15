import { prisma } from "@/lib/prisma";
import FamiliasClient from "./FamiliasClient";

export default async function FamiliasSociaisPage() {
  const familias = await prisma.socialFamily.findMany({
    include: {
      representative: true,
      members: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const persons = await prisma.person.findMany({
    orderBy: { fullName: 'asc' }
  });

  return <FamiliasClient familiasInicial={familias} persons={persons} />;
}
