import React from "react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { ShieldCheck, Search } from "lucide-react";
import Link from "next/link";
import { NewLicenseSheet } from "../components/NewLicenseSheet";
import { QuickFilters } from "../components/QuickFilters";
import { LicenseRowActions } from "../components/LicenseRowActions";
import { LicenciamentoInteractiveClient } from "./LicenciamentoInteractiveClient";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function LicenciamentoPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> | { [key: string]: string | undefined } }) {
  const { prisma } = await getTenantContextForModule("MEIO_AMBIENTE");
  const searchParams = await Promise.resolve(props.searchParams || {});
  const where: Prisma.EnvLicenseWhereInput = {};
  if (searchParams.status) where.status = searchParams.status;

  const licenses = await prisma.envLicense.findMany({ where, include: { enterprise: true }, orderBy: { createdAt: "desc" } });
  const enterprises = await prisma.envEnterprise.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/meio-ambiente" className="text-gray-500 hover:text-gray-700">Meio Ambiente</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Licenciamento</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            Licenciamento Ambiental
          </h1>
        </div>
        <NewLicenseSheet enterprises={enterprises} />
      </div>

      {/* Interactive Engine Component */}
      <LicenciamentoInteractiveClient />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 flex-wrap gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Buscar licenca..." className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <QuickFilters filters={[
            { name: "status", label: "Status", options: [{ value: "Emitida", label: "Emitida" }, { value: "Em Analise", label: "Em Analise" }, { value: "Vencida", label: "Vencida" }, { value: "Suspensa", label: "Suspensa" }, { value: "Cassada", label: "Cassada" }] }
          ]} />
        </div>
        {licenses.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <ShieldCheck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma licenca emitida.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">No Licenca</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Empreendimento</th>
                  <th className="px-6 py-3">Validade</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {licenses.map((lic) => (
                  <tr key={lic.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{lic.licenseNumber}</td>
                    <td className="px-6 py-4 text-gray-500">{lic.licenseType}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{lic.enterprise.name}</td>
                    <td className="px-6 py-4 text-gray-500">{lic.validUntil ? new Date(lic.validUntil).toLocaleDateString("pt-BR") : "Indeterminado"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${lic.status === "Emitida" ? "bg-green-100 text-green-700" : lic.status === "Vencida" ? "bg-red-100 text-red-700" : lic.status === "Suspensa" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"}`}>
                        {lic.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <LicenseRowActions license={lic} />
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
