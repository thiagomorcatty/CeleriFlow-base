import React from 'react';
import { prisma } from '@/lib/prisma';
import { Building2 } from 'lucide-react';

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

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Nome</th><th className="p-4 font-semibold text-gray-600">Tipo</th><th className="p-4 font-semibold text-gray-600">CNES</th><th className="p-4 font-semibold text-gray-600">Telefone</th><th className="p-4 font-semibold text-gray-600">Status</th>
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
        <td className="p-4">{item.type}</td>
        <td className="p-4">{item.cnes || '-'}</td>
        <td className="p-4">{item.phone || '-'}</td>
        <td className="p-4">
          <span className={`px-2 py-1 rounded text-xs ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {item.isActive ? 'Ativa' : 'Inativa'}
          </span>
        </td>
      </tr>
    ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}