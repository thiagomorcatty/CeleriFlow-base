import React from "react";
import { prisma } from "@/lib/prisma";
import { Users, Search } from "lucide-react";
import Link from "next/link";
import { NewVereadorSheet } from "../components/NewVereadorSheet";

export default async function VereadoresPage() {
  const [vereadores, legislaturas] = await Promise.all([
    prisma.camVereador.findMany({
      include: { legislatura: true },
      orderBy: { nomeParlamentar: 'asc' }
    }),
    prisma.camLegislatura.findMany({
      where: { status: "Ativa" },
      orderBy: { numero: 'desc' }
    })
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/app-domain/camara" className="text-gray-500 hover:text-gray-700">Câmara Municipal</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Vereadores</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-[#9333EA]" />
            Parlamentares
          </h1>
        </div>
        <NewVereadorSheet legislaturas={legislaturas} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar parlamentar..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            />
          </div>
        </div>

        {vereadores.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum parlamentar cadastrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Nome Parlamentar</th>
                  <th className="px-6 py-3">Nome Completo</th>
                  <th className="px-6 py-3">Partido</th>
                  <th className="px-6 py-3">Legislatura</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {vereadores.map((ver) => (
                  <tr key={ver.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {ver.nomeParlamentar}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{ver.nomeCompleto}</td>
                    <td className="px-6 py-4 text-gray-500 font-semibold">{ver.partido || '-'}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {ver.legislatura.numero}ª Leg.
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${ver.status === 'Em Exercício' ? 'bg-green-100 text-green-700' : 
                          ver.status === 'Afastado' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'}`}>
                        {ver.status}
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
