"use client";

import React from "react";
import { Droplet, Activity, FlaskConical } from "lucide-react";

const qualidadeData = [
  { id: "1", ponto: "ETA Principal", dataColeta: "15/07/2026", parametro: "Turbidez", resultado: "0.5 NTU", limite: "5.0 NTU", conformidade: "Conforme" },
  { id: "2", ponto: "ETA Principal", dataColeta: "15/07/2026", parametro: "Cloro Residual", resultado: "1.2 mg/L", limite: "0.2 a 2.0 mg/L", conformidade: "Conforme" },
  { id: "3", ponto: "Rede Bairro Sul", dataColeta: "14/07/2026", parametro: "Coliformes", resultado: "Ausente", limite: "Ausente", conformidade: "Conforme" },
  { id: "4", ponto: "ETE Central (Efluente)", dataColeta: "14/07/2026", parametro: "DBO", resultado: "65 mg/L", limite: "Max 50 mg/L", conformidade: "Não Conforme" },
];

export default function QualidadePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
            <Droplet className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Esgoto e Qualidade</h1>
            <p className="text-sm text-slate-500">Monitoramento da Qualidade da Água e Saneamento</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
          <FlaskConical className="h-4 w-4" />
          Registrar Análise
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
              <th className="p-4">Ponto de Coleta</th>
              <th className="p-4 text-center">Data Coleta</th>
              <th className="p-4">Parâmetro Analisado</th>
              <th className="p-4 text-right">Resultado</th>
              <th className="p-4 text-right">Valor Limite</th>
              <th className="p-4 text-center">Conformidade</th>
            </tr>
          </thead>
          <tbody>
            {qualidadeData.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-slate-400" />
                    {item.ponto}
                  </div>
                </td>
                <td className="p-4 text-center text-slate-600">{item.dataColeta}</td>
                <td className="p-4 text-slate-600">{item.parametro}</td>
                <td className="p-4 text-slate-800 font-medium text-right">{item.resultado}</td>
                <td className="p-4 text-slate-500 text-sm text-right">{item.limite}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.conformidade === 'Conforme' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.conformidade}
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
