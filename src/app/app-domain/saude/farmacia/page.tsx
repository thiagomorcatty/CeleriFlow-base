import React from 'react';
import { prisma } from '@/lib/prisma';
import { Pill } from 'lucide-react';

export default async function Page() {
  const items = await prisma.medicineBatch.findMany({
    orderBy: { createdAt: 'desc' },
    include: { medicine: true }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Pill className="h-6 w-6 text-emerald-600" />
        Farmácia Básica
      </h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Medicamento</th><th className="p-4 font-semibold text-gray-600">Lote</th><th className="p-4 font-semibold text-gray-600">Validade</th><th className="p-4 font-semibold text-gray-600">Qtd Disponível</th>
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
        <td className="p-4">{item.medicine?.name}</td>
        <td className="p-4">{item.batchNumber}</td>
        <td className="p-4">{new Date(item.expirationDate).toLocaleDateString()}</td>
        <td className="p-4">{item.quantity}</td>
      </tr>
    ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}