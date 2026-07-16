import React from "react";
import { prisma } from "@/lib/prisma";
import { AlertTriangle, Search } from "lucide-react";
import Link from "next/link";
import { NewComplaintSheet } from "../components/NewComplaintSheet";
import { QuickFilters } from "../components/QuickFilters";
import { CheckCircle, XCircle, Calendar } from "lucide-react";

export default async function DenunciasPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> | { [key: string]: string | undefined } }) {
  const searchParams = await Promise.resolve(props.searchParams || {});
  
  const where: any = {};
  if (searchParams.tipo) where.complaintType = { contains: searchParams.tipo, mode: 'insensitive' };
  if (searchParams.status) where.status = searchParams.status;

  const complaints = await prisma.envComplaint.findMany({
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
            <span className="text-gray-900 font-medium">Denúncias</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            Denúncias Ambientais
          </h1>
        </div>
        <NewComplaintSheet />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 flex-wrap gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar denúncia..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <QuickFilters filters={[
            { name: "tipo", label: "Tipo", options: [{ value: "Desmatamento", label: "Desmatamento" }, { value: "Poluição", label: "Poluição" }, { value: "Queimada", label: "Queimada" }, { value: "Fauna Silvestre", label: "Fauna Silvestre" }] },
            { name: "status", label: "Status", options: [{ value: "Recebida", label: "Recebida" }, { value: "Em Verificação", label: "Em Verificação" }, { value: "Encerrada", label: "Encerrada" }] }
          ]} />
        </div>

        {complaints.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma denúncia registrada.</p>
            <p className="text-sm">Clique em "Registrar Denúncia" para adicionar.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Descrição Resumida</th>
                  <th className="px-6 py-3">Endereço</th>
                  <th className="px-6 py-3">Anônima</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Data</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((comp) => (
                  <tr key={comp.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {comp.complaintType}
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={comp.description}>
                      {comp.description}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{comp.address || '-'}</td>
                    <td className="px-6 py-4 text-gray-500">{comp.isAnonymous ? 'Sim' : 'Não'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${comp.status === 'Recebida' ? 'bg-yellow-100 text-yellow-700' : 
                          comp.status === 'Encerrada' ? 'bg-gray-100 text-gray-700' : 
                          'bg-blue-100 text-blue-700'}`}>
                        {comp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(comp.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Em Verificação">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded" title="Encerrar">
                          <XCircle className="w-4 h-4" />
                        </button>
                        <Link href="/meio-ambiente/fiscalizacao" className="p-1.5 text-purple-600 hover:bg-purple-50 rounded" title="Planejar Vistoria">
                          <Calendar className="w-4 h-4" />
                        </Link>
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
