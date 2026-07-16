"use client";

import React from "react";
import { Globe, Eye, Settings, Share2 } from "lucide-react";

const portalData = [
  { id: "1", solicitacao: "2ª Via de Conta", usuario: "João Silva", data: "16/07/2026", status: "Atendido", origem: "App Mobile" },
  { id: "2", solicitacao: "Aviso de Vazamento", usuario: "Maria Oliveira", data: "15/07/2026", status: "Em Análise", origem: "Site Web" },
  { id: "3", solicitacao: "Alteração de Titularidade", usuario: "Carlos Souza", data: "15/07/2026", status: "Pendente Docs", origem: "WhatsApp" },
  { id: "4", solicitacao: "Histórico de Consumo", usuario: "Ana Pereira", data: "14/07/2026", status: "Atendido", origem: "App Mobile" },
];

export default function PortalPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Portal do Consumidor</h1>
            <p className="text-sm text-slate-500">Gestão de Solicitações do Portal e Aplicativo Cidadão</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
            <Settings className="h-4 w-4" />
            Configurar Portal
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
              <th className="p-4">Tipo de Solicitação</th>
              <th className="p-4">Usuário</th>
              <th className="p-4 text-center">Data</th>
              <th className="p-4 text-center">Origem</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {portalData.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-700">{item.solicitacao}</td>
                <td className="p-4 text-slate-600">{item.usuario}</td>
                <td className="p-4 text-center text-slate-600">{item.data}</td>
                <td className="p-4 text-center">
                  <span className="flex items-center justify-center gap-1 text-sm text-slate-500">
                    <Share2 className="h-3 w-3" /> {item.origem}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === 'Atendido' ? 'bg-emerald-100 text-emerald-700' : 
                    item.status === 'Em Análise' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
