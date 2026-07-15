import React from 'react';
import { prisma } from '@/lib/prisma';
import { Building2 } from 'lucide-react';
import UnidadesClient from './UnidadesClient';

export default async function Page() {
  const items = await prisma.healthUnit.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Building2 className="h-6 w-6 text-emerald-600" />
        Unidades de Saúde
      </h1>

      <UnidadesClient units={items} />
    </div>
  );
}