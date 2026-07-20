import React from "react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { Building2, Search } from "lucide-react";
import Link from "next/link";
import { NewEnterpriseSheet } from "../components/NewEnterpriseSheet";
import { QuickFilters } from "../components/QuickFilters";
import { EnterpriseRowActions } from "../components/EnterpriseRowActions";

export const dynamic = "force-dynamic";

export default async function EmpreendimentosPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> | { [key: string]: string | undefined } }) {
  const { prisma } = await getTenantContextForModule("MEIO_AMBIENTE");
  const searchParams = await Promise.resolve(props.searchParams || {});
  const where: any = {};
  if (searchParams.atividade) where.activityType = { contains: searchParams.atividade, mode: "insensitive" };
  if (searchParams.risco) where.potentialRisk = searchParams.risco;
  if (searchParams.status) where.status = searchParams.status;

  const enterprises = await prisma.envEnterprise.findMany({ where, orderBy: { createdAt: "desc" } });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/meio-ambiente" className="text-gray-500 hover:text-gray-700">Meio Ambiente</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Empreendimentos</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-green-600" />
            Empreendimentos
          </h1>
        </div>
        <NewEnterpriseSheet />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 flex-wrap gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Buscar empreendimento..." className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <QuickFilters filters={[
            { name: "risco", label: "Risco", options: [{ value: "Alto", label: "Alto" }, { value: "Medio", label: "Medio" }, { value: "Baixo", label: "Baixo" }] },
            { name: "status", label: "Status", options: [{ value: "Ativo", label: "Ativo" }, { value: "Inativo", label: "Inativo" }, { value: "Irregular", label: "Irregular" }, { value: "Embargado", label: "Embargado" }] }
          ]} />
        </div>
        {enterprises.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum empreendimento cadastrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Razao Social / Nome</th>
                  <th className="px-6 py-3">CNPJ/CPF</th>
                  <th className="px-6 py-3">Atividade</th>
                  <th className="px-6 py-3">Risco</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {enterprises.map((ent) => (
                  <tr key={ent.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{ent.name}</td>
                    <td className="px-6 py-4 text-gray-500">{ent.cnpjCpf || "-"}</td>
                    <td className="px-6 py-4 text-gray-500">{ent.activityType || "-"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${ent.potentialRisk === "Alto" ? "bg-red-100 text-red-700" : ent.potentialRisk === "Medio" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                        {ent.potentialRisk || "Baixo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${ent.status === "Ativo" ? "bg-blue-100 text-blue-700" : ent.status === "Embargado" ? "bg-red-100 text-red-700" : ent.status === "Irregular" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600"}`}>
                        {ent.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <EnterpriseRowActions enterprise={ent} />
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
