"use client";

import React from "react";
import { Wrench, Plus, PenTool } from "lucide-react";

const servicosData = [
  { id: "OS-2026-001", tipo: "Vazamento na Rede", unidade: "UC-1020", dataSolicitacao: "14/07/2026", prioridade: "Alta", status: "Em Andamento" },
  { id: "OS-2026-002", tipo: "Corte por Inadimplência", unidade: "UC-1022", dataSolicitacao: "12/07/2026", prioridade: "Média", status: "Concluído" },
  { id: "OS-2026-003", tipo: "Religação", unidade: "UC-1090", dataSolicitacao: "15/07/2026", prioridade: "Média", status: "Pendente" },
  { id: "OS-2026-004", tipo: "Troca de Hidrômetro", unidade: "UC-1045", dataSolicitacao: "10/07/2026", prioridade: "Baixa", status: "Concluído" },
];

export default function ServicosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
            <Wrench className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Serviços e Manutenção</h1>
            <p className="text-sm text-slate-500">Corte/Religação, Ordens de Serviço e Vazamentos</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="h-4 w-4" />
          Nova OS
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
              <th className="p-4">Nº da OS</th>
              <th className="p-4">Tipo de Serviço</th>
              <th className="p-4">Unidade (UC)</th>
              <th className="p-4 text-center">Data Solicitação</th>
              <th className="p-4 text-center">Prioridade</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {servicosData.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono text-sm font-medium text-slate-700">{item.id}</td>
                <td className="p-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <PenTool className="h-4 w-4 text-slate-400" />
                    {item.tipo}
                  </div>
                </td>
                <td className="p-4 text-slate-600">{item.unidade}</td>
                <td className="p-4 text-center text-slate-600">{item.dataSolicitacao}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.prioridade === 'Alta' ? 'bg-red-100 text-red-700' : 
                    item.prioridade === 'Média' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {item.prioridade}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                    item.status === 'Concluído' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 
                    item.status === 'Em Andamento' ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
