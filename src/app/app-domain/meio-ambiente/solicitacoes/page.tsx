import React from "react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { FileText, Search } from "lucide-react";
import Link from "next/link";

import { QuickFilters } from "../components/QuickFilters";
import { Pencil, CheckCircle, XCircle } from "lucide-react";

export default async function SolicitacoesPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> | { [key: string]: string | undefined } }) {
  const { prisma } = await getTenantContextForModule("MEIO_AMBIENTE");
  const searchParams = await Promise.resolve(props.searchParams || {});
  
  const where: any = {};
  if (searchParams.tipo) where.requestType = { contains: searchParams.tipo, mode: 'insensitive' };
  if (searchParams.status) where.status = searchParams.status;

  const requests = await prisma.envRequest.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/meio-ambiente" className="text-gray-500 hover:text-gray-700">Meio Ambiente</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Solicitações</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-emerald-600" />
            Solicitações e Podas
          </h1>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Nova Solicitação
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 flex-wrap gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar solicitação..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <QuickFilters filters={[
            { name: "tipo", label: "Tipo", options: [{ value: "Poda", label: "Poda" }, { value: "Supressão", label: "Supressão" }, { value: "Análise de Projeto", label: "Análise de Projeto" }] },
            { name: "status", label: "Status", options: [{ value: "Pendente", label: "Pendente" }, { value: "Em Análise", label: "Em Análise" }, { value: "Autorizado", label: "Autorizado" }, { value: "Negado", label: "Negado" }] }
          ]} />
        </div>

        {requests.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma solicitação registrada.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Solicitante</th>
                  <th className="px-6 py-3">Endereço / Local</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Data</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {req.requestType}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{req.requesterName || '-'}</td>
                    <td className="px-6 py-4 text-gray-500">{req.address || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${req.status === 'Autorizado' ? 'bg-green-100 text-green-700' : 
                          req.status === 'Negado' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(req.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Editar">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Autorizar">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Negar">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
