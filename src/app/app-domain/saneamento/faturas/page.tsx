import React from "react";
import { prisma } from "@/lib/prisma";
import { Receipt, Search } from "lucide-react";
import Link from "next/link";

export default async function FaturasPage() {
  const invoices = await prisma.sanInvoice.findMany({
    include: { unit: true },
    orderBy: { dueDate: 'desc' }
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/app-domain/saneamento" className="text-gray-500 hover:text-gray-700">Água e Saneamento</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Faturamento</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Receipt className="h-6 w-6 text-[#0284C7]" />
            Contas de Água e Esgoto
          </h1>
        </div>
        <button className="flex items-center gap-2 bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Gerar Faturas em Lote
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar fatura..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
            />
          </div>
        </div>

        {invoices.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Receipt className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma fatura emitida.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Número</th>
                  <th className="px-6 py-3">Unidade</th>
                  <th className="px-6 py-3">Competência</th>
                  <th className="px-6 py-3">Valor (R$)</th>
                  <th className="px-6 py-3">Vencimento</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{invoice.unit.code}</td>
                    <td className="px-6 py-4 text-gray-500">{invoice.competence}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      R$ {invoice.totalAmount.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(invoice.dueDate).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${invoice.status === 'Paga' ? 'bg-green-100 text-green-700' : 
                          invoice.status === 'Vencida' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'}`}>
                        {invoice.status}
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
