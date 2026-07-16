"use client";

import React from "react";
import { FileText, Download } from "lucide-react";

const leiturasData = [
  { id: "1", rota: "Centro 01", unidade: "UC-1020", mes: "Julho/2026", leituraAnterior: 1540, leituraAtual: 1565, consumo: 25, status: "Lida" },
  { id: "2", rota: "Centro 01", unidade: "UC-1021", mes: "Julho/2026", leituraAnterior: 890, leituraAtual: 902, consumo: 12, status: "Lida" },
  { id: "3", rota: "Bairro Sul", unidade: "UC-1022", mes: "Julho/2026", leituraAnterior: 430, leituraAtual: 445, consumo: 15, status: "Análise" },
  { id: "4", rota: "Bairro Norte", unidade: "UC-1023", mes: "Julho/2026", leituraAnterior: 2110, leituraAtual: 0, consumo: 0, status: "Pendente" },
];

export default function LeiturasPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Leituras e Consumo</h1>
            <p className="text-sm text-slate-500">Gestão de Rotas, Leituras e Histórico de Consumo</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors">
          <Download className="h-4 w-4" />
          Exportar Rotas
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
              <th className="p-4">Rota</th>
              <th className="p-4">Unidade (UC)</th>
              <th className="p-4">Mês Referência</th>
              <th className="p-4 text-right">Leit. Anterior</th>
              <th className="p-4 text-right">Leit. Atual</th>
              <th className="p-4 text-right">Consumo (m³)</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {leiturasData.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-700">{item.rota}</td>
                <td className="p-4 text-slate-600">{item.unidade}</td>
                <td className="p-4 text-slate-600">{item.mes}</td>
                <td className="p-4 text-slate-600 text-right">{item.leituraAnterior}</td>
                <td className="p-4 text-slate-600 text-right font-medium">{item.leituraAtual > 0 ? item.leituraAtual : '-'}</td>
                <td className="p-4 text-slate-800 text-right font-bold">{item.consumo}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === 'Lida' ? 'bg-emerald-100 text-emerald-700' : 
                    item.status === 'Análise' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
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
