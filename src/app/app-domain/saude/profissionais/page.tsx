import React from 'react';
import { prisma } from '@/lib/prisma';
import { Stethoscope } from 'lucide-react';

export default async function Page() {
  const items = await prisma.healthProfessional.findMany({
    orderBy: { createdAt: 'desc' },
    include: { employee: true }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Stethoscope className="h-6 w-6 text-emerald-600" />
        Profissionais de Saúde
      </h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Nome</th><th className="p-4 font-semibold text-gray-600">Especialidade</th><th className="p-4 font-semibold text-gray-600">Conselho</th><th className="p-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">Nenhum registro encontrado.</td>
              </tr>
            ) : (
              items.map(item => (
      <tr key={item.id} className="border-b">
        <td className="p-4">{item.employee?.name}</td>
        <td className="p-4">{item.specialty || '-'}</td>
        <td className="p-4">{item.councilName} {item.councilNumber}</td>
        <td className="p-4">{item.isActive ? 'Ativo' : 'Inativo'}</td>
      </tr>
    ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}