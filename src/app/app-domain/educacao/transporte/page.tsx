import React from "react";
import { Bus, AlertCircle, Plus, Search, Filter, Edit2, Trash2 } from "lucide-react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export const dynamic = "force-dynamic";

export default async function TransporteEscolarPage() {
  const { prisma } = await getTenantContextForModule("EDUCACAO");
  const [buses, studentsWithTransport] = await Promise.all([
    prisma.schoolBus.findMany({
      include: {
        schools: true,
      },
      orderBy: { code: "asc" },
    }),
    prisma.student.count({ where: { usesSchoolTransport: true, status: "Ativo" } }),
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Bus className="h-8 w-8 text-amber-600" />
            Transporte Escolar
          </h1>
          <p className="text-gray-500 mt-2">
            Gestão da frota escolar, manutenção, custos e alunos atendidos.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus className="h-5 w-5" />
            Novo Veículo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total da Frota Cadastrada</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{buses.length}</p>
          </div>
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
            <Bus className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alunos com Transporte</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{studentsWithTransport}</p>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
            <AlertCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por código ou escola..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none">
            <option value="">Status (Todos)</option>
            <option value="Ativo">Ativo</option>
            <option value="Manutenção">Em Manutenção</option>
            <option value="Inativo">Inativo</option>
          </select>
          <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors">
            <Filter className="h-5 w-5" />
            Filtrar
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Código do Veículo</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Escolas Atendidas</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-center">Capacidade</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Próx. Manutenção</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">Valor</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-center">Status</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-4 font-medium text-gray-900 dark:text-white">
                    {bus.code}
                  </td>
                  <td className="p-4 text-sm text-gray-900 dark:text-white">
                    {bus.schools.length > 0 
                      ? bus.schools.map(s => s.name).join(", ") 
                      : <span className="text-gray-400 italic">Nenhuma</span>}
                  </td>
                  <td className="p-4 text-sm text-gray-900 dark:text-white text-center">
                    {bus.capacity || "-"}
                  </td>
                  <td className="p-4 text-sm text-gray-900 dark:text-white">
                    {bus.maintenanceDate ? new Intl.DateTimeFormat('pt-BR').format(new Date(bus.maintenanceDate)) : "-"}
                  </td>
                  <td className="p-4 text-sm font-medium text-emerald-600 dark:text-emerald-400 text-right">
                    {bus.value ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(bus.value) : "-"}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        bus.status === "Ativo"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : bus.status === "Manutenção"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {bus.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Editar">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Inativar">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {buses.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    Nenhum veículo cadastrado na frota.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
