import React from 'react';
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { Calendar } from 'lucide-react';

export default async function Page() {
  const { prisma } = await getTenantContextForModule("SAUDE");
  const items = await prisma.healthAppointment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { patient: { include: { person: true } }, professional: { include: { employee: true } } }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Calendar className="h-6 w-6 text-emerald-600" />
        Agenda e Agendamentos
      </h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Data</th><th className="p-4 font-semibold text-gray-600">Paciente</th><th className="p-4 font-semibold text-gray-600">Profissional</th><th className="p-4 font-semibold text-gray-600">Especialidade</th><th className="p-4 font-semibold text-gray-600">Status</th>
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
        <td className="p-4">{new Date(item.date).toLocaleString()}</td>
        <td className="p-4">{item.patient?.person?.fullName}</td>
        <td className="p-4">{item.professional?.employee?.name || '-'}</td>
        <td className="p-4">{item.specialty || '-'}</td>
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