import React from 'react';
import { prisma } from '@/lib/prisma';
import { Users } from 'lucide-react';

export default async function Page() {
  const items = await prisma.healthTeam.findMany({
    orderBy: { createdAt: 'desc' },
    include: { unit: true }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Users className="h-6 w-6 text-emerald-600" />
        Equipes ESF
      </h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Nome da Equipe</th><th className="p-4 font-semibold text-gray-600">Código</th><th className="p-4 font-semibold text-gray-600">Microárea</th><th className="p-4 font-semibold text-gray-600">Unidade</th><th className="p-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">Nenhum registro encontrado.</td>
              </tr>
            ) : (
              items.map(item => (
      <tr key={item.id} className="border-b">
        <td className="p-4">{item.name}</td>
        <td className="p-4">{item.code || '-'}</td>
        <td className="p-4">{item.microarea || '-'}</td>
        <td className="p-4">{item.unit?.name}</td>
        <td className="p-4">{item.isActive ? 'Ativa' : 'Inativa'}</td>
      </tr>
    ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}