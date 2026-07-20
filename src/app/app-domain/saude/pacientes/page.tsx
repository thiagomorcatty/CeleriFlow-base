import React from 'react';
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { Users } from 'lucide-react';
import PacientesClient from './PacientesClient';

export default async function Page() {
  const { prisma } = await getTenantContextForModule("SAUDE");
  const items = await prisma.patient.findMany({
    orderBy: { createdAt: 'desc' },
    include: { person: true }
  });

  const people = await prisma.person.findMany({
    orderBy: { fullName: 'asc' }
  });

  const units = await prisma.healthUnit.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  });

  const teams = await prisma.healthTeam.findMany({
    where: { isActive: true },
    select: { id: true, name: true, unitId: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Users className="h-6 w-6 text-emerald-600" />
        Pacientes
      </h1>

      <PacientesClient patients={items} people={people} units={units} teams={teams} />
    </div>
  );
}