"use client";

import React from "react";
import { Receipt, DollarSign, CreditCard } from "lucide-react";

const faturamentoData = [
  { id: "1", unidade: "UC-1020", mes: "Julho/2026", vencimento: "10/08/2026", valor: 125.50, status: "Pendente" },
  { id: "2", unidade: "UC-1021", mes: "Junho/2026", vencimento: "10/07/2026", valor: 85.00, status: "Pago" },
  { id: "3", unidade: "UC-1022", mes: "Maio/2026", vencimento: "10/06/2026", valor: 95.20, status: "Atrasado" },
  { id: "4", unidade: "UC-1023", mes: "Julho/2026", vencimento: "15/08/2026", valor: 45.00, status: "Parcelado" },
];

export default function FaturamentoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <Receipt className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Faturamento e Cobrança</h1>
            <p className="text-sm text-slate-500">Contas, Pagamentos, Débitos e Parcelamentos</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
            <CreditCard className="h-4 w-4" />
            Novo Parcelamento
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
            <DollarSign className="h-4 w-4" />
            Gerar Faturas
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
              <th className="p-4">Fatura ID</th>
              <th className="p-4">Unidade (UC)</th>
              <th className="p-4">Mês Referência</th>
              <th className="p-4 text-right">Vencimento</th>
              <th className="p-4 text-right">Valor (R$)</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {faturamentoData.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono text-sm text-slate-500">FAT-{item.id.padStart(5, '0')}</td>
                <td className="p-4 font-medium text-slate-700">{item.unidade}</td>
                <td className="p-4 text-slate-600">{item.mes}</td>
                <td className="p-4 text-slate-600 text-right">{item.vencimento}</td>
                <td className="p-4 text-slate-800 text-right font-bold">{item.valor.toFixed(2).replace('.',',')}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === 'Pago' ? 'bg-emerald-100 text-emerald-700' : 
                    item.status === 'Atrasado' ? 'bg-red-100 text-red-700' : 
                    item.status === 'Parcelado' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
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
