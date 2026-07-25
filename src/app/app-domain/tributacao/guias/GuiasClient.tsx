"use client";

import { Search, Receipt, DollarSign, CheckCircle2, Trash2 } from "lucide-react";
import { payGuide, cancelGuide } from "./actions";

type Guide = {
  id: string;
  barcode: string;
  guideNumber?: string | null;
  totalValue: number;
  outstandingValue: number;
  dueDate: Date;
  status: string;
  assessment: {
    year: number;
    tax: { name: string };
    taxpayer: {
      person: { fullName: string; cpf: string } | null;
      company: { corporateName: string; cnpj: string } | null;
    };
  };
};

export default function GuiasClient({ guias }: { guias: Guide[] }) {

  const handlePay = async (id: string, amount: number) => {
    if (confirm("Confirmar baixa manual desta guia?")) {
      try {
        await payGuide(id, amount);
      } catch (err) {
        console.error(err);
        alert("Erro ao realizar baixa manual.");
      }
    }
  };

  const handleCancel = async (id: string) => {
    if (confirm("Confirmar o cancelamento desta guia?")) {
      try {
        await cancelGuide(id);
      } catch (err) {
        console.error(err);
        alert("Erro ao cancelar guia.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Receipt className="w-6 h-6 text-emerald-600" />
            Guias de Arrecadação (DAM)
          </h1>
          <p className="text-slate-500 mt-1">Emissão e controle de pagamentos de tributos municipais.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por código de barras ou contribuinte..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            />
          </div>
        </div>

        {guias.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Receipt className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhuma guia emitida</h3>
            <p className="text-slate-500 mt-1">As guias (DAM) geradas pelo sistema aparecerão aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Código de Barras</th>
                  <th className="px-6 py-3">Tributo</th>
                  <th className="px-6 py-3">Contribuinte</th>
                  <th className="px-6 py-3">Vencimento</th>
                  <th className="px-6 py-3 text-right">Valor (R$)</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {guias.map((guia) => (
                  <tr key={guia.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-slate-600 text-xs">
                        {guia.guideNumber || guia.barcode || "-"}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {guia.assessment.tax.name} ({guia.assessment.year})
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {guia.assessment.taxpayer.company?.corporateName || guia.assessment.taxpayer.person?.fullName || "Não Identificado"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(guia.dueDate).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(guia.totalValue)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        guia.status === 'Paga' ? 'bg-emerald-100 text-emerald-700' : 
                        guia.status === 'Vencida' ? 'bg-red-100 text-red-700' : 
                        guia.status === 'Cancelada' ? 'bg-slate-100 text-slate-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {guia.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {['Emitida', 'Parcial'].includes(guia.status) ? (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handlePay(guia.id, guia.outstandingValue)} className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg flex items-center gap-1 transition-colors">
                            <DollarSign className="w-4 h-4" />
                            Baixa Manual
                          </button>
                          <button onClick={() => handleCancel(guia.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Cancelar Guia">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : guia.status === 'Paga' ? (
                        <span className="text-emerald-600 font-semibold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Quitado
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">{guia.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
