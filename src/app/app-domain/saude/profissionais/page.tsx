import React from 'react';
import { prisma } from '@/lib/prisma';
import { Stethoscope } from 'lucide-react';
import ProfissionaisClient from './ProfissionaisClient';

export default async function Page() {
  const items = await prisma.healthProfessional.findMany({
    orderBy: { createdAt: 'desc' },
    include: { employee: true }
  });

  const employees = await prisma.employee.findMany({
    where: { isActive: true },
    select: { id: true, name: true, cpf: true, registration: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Stethoscope className="h-6 w-6 text-emerald-600" />
        Profissionais de Saúde
      </h1>

      <ProfissionaisClient professionals={items} employees={employees} />
    </div>
  );
}