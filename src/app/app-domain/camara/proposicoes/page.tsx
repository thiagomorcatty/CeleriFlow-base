import React from "react";
import { prisma } from "@/lib/prisma";
import { FileText, Search } from "lucide-react";
import Link from "next/link";
import { NewProposicaoSheet } from "../components/NewProposicaoSheet";

export default async function ProposicoesPage() {
  const [proposicoes, vereadores] = await Promise.all([
    prisma.camProposicao.findMany({
      include: { autor: true, sessao: true },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.camVereador.findMany({
      where: { status: "Em Exercício" },
      orderBy: { nomeParlamentar: 'asc' }
    })
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/app-domain/camara" className="text-gray-500 hover:text-gray-700">Câmara Municipal</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Proposições Legislativas</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#9333EA]" />
            Proposições Legislativas
          </h1>
        </div>
        <NewProposicaoSheet vereadores={vereadores} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar proposição..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            />
          </div>
        </div>

        {proposicoes.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma proposição cadastrada.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Número/Ano</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Ementa</th>
                  <th className="px-6 py-3">Autor</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {proposicoes.map((prop) => (
                  <tr key={prop.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {prop.numero}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{prop.tipo}</td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={prop.ementa}>
                      {prop.ementa}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{prop.autor.nomeParlamentar}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${prop.status === 'Aprovada' ? 'bg-green-100 text-green-700' : 
                          prop.status === 'Rejeitada' ? 'bg-red-100 text-red-700' : 
                          'bg-blue-100 text-blue-700'}`}>
                        {prop.status}
                      </span>
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
