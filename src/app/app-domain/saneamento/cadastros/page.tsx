"use client";

import React from "react";
import { Users, Plus, Edit, Trash2 } from "lucide-react";

const cadastrosData = [
  { id: "1", consumidor: "João Silva", unidade: "UC-1020", ligacao: "Ativa", hidrometro: "HD-98312", endereco: "Rua das Flores, 123" },
  { id: "2", consumidor: "Maria Oliveira", unidade: "UC-1021", ligacao: "Ativa", hidrometro: "HD-77421", endereco: "Av. Brasil, 45" },
  { id: "3", consumidor: "Carlos Souza", unidade: "UC-1022", ligacao: "Cortada", hidrometro: "HD-11234", endereco: "Rua do Sol, 88" },
  { id: "4", consumidor: "Ana Pereira", unidade: "UC-1023", ligacao: "Ativa", hidrometro: "HD-55432", endereco: "Travessa da Paz, 12" },
];

export default function CadastrosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Cadastros</h1>
            <p className="text-sm text-slate-500">Gestão de Consumidores, Unidades, Ligações e Hidrômetros</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          Novo Cadastro
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
              <th className="p-4">Unidade (UC)</th>
              <th className="p-4">Consumidor</th>
              <th className="p-4">Endereço</th>
              <th className="p-4">Ligação</th>
              <th className="p-4">Hidrômetro</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {cadastrosData.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-800">{item.unidade}</td>
                <td className="p-4 text-slate-600">{item.consumidor}</td>
                <td className="p-4 text-slate-600 text-sm">{item.endereco}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.ligacao === 'Ativa' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {item.ligacao}
                  </span>
                </td>
                <td className="p-4 text-slate-600 font-mono text-sm">{item.hidrometro}</td>
                <td className="p-4 flex items-center justify-end gap-2">
                  <button className="p-1 text-slate-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button>
                  <button className="p-1 text-slate-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
