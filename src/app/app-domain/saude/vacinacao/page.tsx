import React from 'react';
import { prisma } from '@/lib/prisma';
import { Syringe } from 'lucide-react';

export default async function Page() {
  const items = await prisma.vaccinationRecord.findMany({
    orderBy: { createdAt: 'desc' },
    include: { patient: { include: { person: true } }, vaccine: true }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Syringe className="h-6 w-6 text-emerald-600" />
        Vacinação Básica
      </h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Data</th><th className="p-4 font-semibold text-gray-600">Paciente</th><th className="p-4 font-semibold text-gray-600">Vacina</th><th className="p-4 font-semibold text-gray-600">Dose</th><th className="p-4 font-semibold text-gray-600">Lote</th>
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
        <td className="p-4">{new Date(item.date).toLocaleDateString()}</td>
        <td className="p-4">{item.patient?.person?.fullName}</td>
        <td className="p-4">{item.vaccine?.name}</td>
        <td className="p-4">{item.doseNumber}</td>
        <td className="p-4">{item.lotNumber || '-'}</td>
      </tr>
    ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}