"use client";

import React from "react";
import { BarChart3, PieChart, TrendingUp, DownloadCloud } from "lucide-react";

const relatoriosData = [
  { id: "1", nome: "Relatório de Inadimplência", periodo: "Junho 2026", tipo: "Financeiro", formato: "PDF/Excel" },
  { id: "2", nome: "Consumo Médio por Bairro", periodo: "Últimos 6 Meses", tipo: "Operacional", formato: "PDF" },
  { id: "3", nome: "Ordens de Serviço por Tipo", periodo: "Julho 2026", tipo: "Serviços", formato: "Excel" },
  { id: "4", nome: "Estatísticas de Perda de Água", periodo: "Ano 2026", tipo: "Operacional", formato: "PDF/Web" },
];

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Relatórios Gerenciais</h1>
            <p className="text-sm text-slate-500">Dashboards, Estatísticas e Exportações</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:shadow-md transition-all">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full">
            <TrendingUp className="h-8 w-8" />
          </div>
          <h3 className="font-semibold text-slate-800">Financeiro & Faturamento</h3>
          <p className="text-sm text-slate-500">Arrecadação, dívida ativa, parcelamentos</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:shadow-md transition-all">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
            <PieChart className="h-8 w-8" />
          </div>
          <h3 className="font-semibold text-slate-800">Operacional & Consumo</h3>
          <p className="text-sm text-slate-500">Leituras, perdas de água, novas ligações</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:shadow-md transition-all">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-full">
            <BarChart3 className="h-8 w-8" />
          </div>
          <h3 className="font-semibold text-slate-800">Serviços & Atendimento</h3>
          <p className="text-sm text-slate-500">Tempo de resposta, OS pendentes, cortes</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-800">Relatórios Salvos Recentes</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-200 text-sm font-semibold text-slate-600">
              <th className="p-4">Nome do Relatório</th>
              <th className="p-4">Tipo</th>
              <th className="p-4 text-center">Período Referência</th>
              <th className="p-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {relatoriosData.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-700">{item.nome}</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600">
                    {item.tipo}
                  </span>
                </td>
                <td className="p-4 text-center text-slate-600">{item.periodo}</td>
                <td className="p-4 text-right">
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                    <DownloadCloud className="h-4 w-4 text-slate-400" />
                    Baixar {item.formato}
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
