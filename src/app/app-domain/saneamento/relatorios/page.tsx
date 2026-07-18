import { prisma } from "@/lib/prisma";
import { BarChart3 } from "lucide-react";
import Link from "next/link";

export default async function RelatoriosPage() {
  const reports = await prisma.sanSavedReport.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex-1 p-6">
      <div className="mb-6"><div className="flex items-center gap-2 text-xs text-gray-400"><Link href="/saneamento" className="hover:text-gray-600">Água e Saneamento</Link><span>/</span><span className="text-gray-600 font-medium">Relatórios</span></div><h1 className="mt-1 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"><BarChart3 className="h-5 w-5 text-pink-500" />Relatórios Gerenciais</h1><p className="mt-1 text-xs text-gray-400">{reports.length} {reports.length === 1 ? "relatório disponível" : "relatórios disponíveis"}</p></div>
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"><table className="w-full text-left"><thead className="border-b bg-gray-50 text-xs font-semibold uppercase text-gray-500 dark:bg-gray-800"><tr><th className="px-3 py-2">Relatório</th><th className="px-3 py-2">Tipo</th><th className="px-3 py-2">Período</th><th className="px-3 py-2">Formato</th></tr></thead><tbody className="divide-y divide-gray-50">{reports.map((report) => <tr key={report.id} className="text-xs text-gray-600"><td className="px-3 py-2 font-medium">{report.name}</td><td className="px-3 py-2">{report.type}</td><td className="px-3 py-2">{report.period}</td><td className="px-3 py-2">{report.format}</td></tr>)}{reports.length === 0 && <tr><td colSpan={4} className="px-3 py-10 text-center text-sm text-gray-400">Nenhum relatório registrado.</td></tr>}</tbody></table></div>
    </div>
  );
}
