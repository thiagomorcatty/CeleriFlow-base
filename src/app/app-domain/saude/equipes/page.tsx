import React from 'react';
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { Users } from 'lucide-react';
import EquipesClient from './EquipesClient';

export default async function Page() {
  const { prisma } = await getTenantContextForModule("SAUDE");
  const items = await prisma.healthTeam.findMany({
    orderBy: { createdAt: 'desc' },
    include: { unit: true }
  });

  const units = await prisma.healthUnit.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Users className="h-6 w-6 text-emerald-600" />
        Equipes ESF
      </h1>

      <EquipesClient teams={items} units={units} />
    </div>
  );
}