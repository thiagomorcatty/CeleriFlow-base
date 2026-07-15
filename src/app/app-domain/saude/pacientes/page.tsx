import React from 'react';
import { prisma } from '@/lib/prisma';
import { Users } from 'lucide-react';

function formatCPF(cpf: string | null | undefined) {
  if (!cpf) return '-';
  let clean = cpf.replace(/\D/g, '');
  if (clean.length > 0 && clean.length <= 11) {
    clean = clean.padStart(11, '0');
    return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  return cpf;
}

function formatCNS(cns: string | null | undefined) {
  if (!cns) return '-';
  let clean = cns.replace(/\D/g, '');
  if (clean.length > 0 && clean.length <= 15) {
    clean = clean.padStart(15, '0');
    return clean.replace(/(\d{3})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
  }
  return cns;
}

export default async function Page() {
  const items = await prisma.patient.findMany({
    orderBy: { createdAt: 'desc' },
    include: { person: true }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Users className="h-6 w-6 text-emerald-600" />
        Pacientes
      </h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Nome</th>
              <th className="p-4 font-semibold text-gray-600">CPF</th>
              <th className="p-4 font-semibold text-gray-600">CNS</th>
              <th className="p-4 font-semibold text-gray-600">Data Nasc.</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
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
                  <td className="p-4">{item.person?.fullName}</td>
                  <td className="p-4">{formatCPF(item.person?.cpf)}</td>
                  <td className="p-4">{formatCNS(item.cns)}</td>
                  <td className="p-4">{item.person?.birthDate ? new Date(item.person.birthDate).toLocaleDateString() : '-'}</td>
                  <td className="p-4">{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}