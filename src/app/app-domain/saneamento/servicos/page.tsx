import React from "react";
import { prisma } from "@/lib/prisma";
import { Wrench, Search } from "lucide-react";
import Link from "next/link";
import { NewServiceOrderSheet } from "../components/NewServiceOrderSheet";

export default async function ServicosPage() {
  const [orders, units] = await Promise.all([
    prisma.sanServiceOrder.findMany({
      include: { unit: true },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.sanConsumerUnit.findMany({
      where: { status: "Ativa" },
      select: { id: true, code: true, address: true }
    })
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/app-domain/saneamento" className="text-gray-500 hover:text-gray-700">Água e Saneamento</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Ordens de Serviço</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Wrench className="h-6 w-6 text-[#0284C7]" />
            Ordens de Serviço
          </h1>
        </div>
        <NewServiceOrderSheet units={units} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar O.S..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
            />
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Wrench className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma ordem de serviço registrada.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Número OS</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Prioridade</th>
                  <th className="px-6 py-3">Unidade / Local</th>
                  <th className="px-6 py-3">Técnico</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.orderType}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium
                        ${order.priority === 'Urgente' ? 'bg-red-100 text-red-700' : 
                          order.priority === 'Alta' ? 'bg-orange-100 text-orange-700' : 
                          'bg-blue-100 text-blue-700'}`}>
                        {order.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {order.unit ? `${order.unit.code} - ${order.unit.address}` : 'Rede Pública'}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.technician || 'Não atribuído'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${order.status === 'Concluída' ? 'bg-green-100 text-green-700' : 
                          order.status === 'Cancelada' ? 'bg-gray-100 text-gray-700' : 
                          'bg-yellow-100 text-yellow-700'}`}>
                        {order.status}
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
