import React from "react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { Trash2, Search } from "lucide-react";
import Link from "next/link";
import { NewWasteSheet } from "../components/NewWasteSheet";
import { QuickFilters } from "../components/QuickFilters";
import { WasteRowActions } from "../components/WasteRowActions";

export const dynamic = "force-dynamic";

export default async function ResiduosPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> | { [key: string]: string | undefined } }) {
  const { prisma } = await getTenantContextForModule("MEIO_AMBIENTE");
  const searchParams = await Promise.resolve(props.searchParams || {});
  const where: any = {};
  if (searchParams.tipo) where.wasteType = { contains: searchParams.tipo, mode: "insensitive" };

  const wastes = await prisma.envWaste.findMany({ where, include: { enterprise: true }, orderBy: { date: "desc" } });
  const enterprises = await prisma.envEnterprise.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/meio-ambiente" className="text-gray-500 hover:text-gray-700">Meio Ambiente</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Controle de Residuos</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Trash2 className="h-6 w-6 text-green-600" />
            Controle de Residuos
          </h1>
        </div>
        <NewWasteSheet enterprises={enterprises} />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 flex-wrap gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Buscar registros..." className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <QuickFilters filters={[
            { name: "tipo", label: "Tipo", options: [{ value: "Organico", label: "Organico" }, { value: "Reciclavel", label: "Reciclavel" }, { value: "Perigoso", label: "Perigoso" }, { value: "Eletronico", label: "Eletronico" }] }
          ]} />
        </div>
        {wastes.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Trash2 className="h-12 w-12 mx-auto mb-4 text-gray-300 animate-bounce" />
            <p>Nenhum registro de residuo encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Gerador / Empresa</th>
                  <th className="px-6 py-3">Tipo de Residuo</th>
                  <th className="px-6 py-3">Quantidade (Kg)</th>
                  <th className="px-6 py-3">Destinacao Final</th>
                  <th className="px-6 py-3">Data Registro</th>
                  <th className="px-6 py-3 text-right">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {wastes.map((w) => (
                  <tr key={w.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{w.generatorName}</td>
                    <td className="px-6 py-4 text-gray-500">{w.wasteType}</td>
                    <td className="px-6 py-4 font-semibold text-gray-700">{w.quantityKg.toLocaleString("pt-BR")} Kg</td>
                    <td className="px-6 py-4 text-gray-500">{w.destination}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(w.date).toLocaleDateString("pt-BR")}</td>
                    <td className="px-6 py-4 text-right">
                      <WasteRowActions waste={w} enterprises={enterprises} />
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
