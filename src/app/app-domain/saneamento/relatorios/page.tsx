import { prisma } from "@/lib/prisma";
import { BarChart3 } from "lucide-react";
import Link from "next/link";
import { ReportsClient } from "../components/ReportsClient";

export default async function RelatoriosPage() {
  const reports = await prisma.sanSavedReport.findMany({
    select: { id: true, name: true, type: true, period: true, format: true, active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 p-6">
      <div className="mb-6"><div className="flex items-center gap-2 text-xs text-gray-400"><Link href="/saneamento" className="hover:text-gray-600">Água e Saneamento</Link><span>/</span><span className="text-gray-600 font-medium">Relatórios</span></div><h1 className="mt-1 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"><BarChart3 className="h-5 w-5 text-pink-500" />Relatórios Gerenciais</h1><p className="mt-1 text-xs text-gray-400">{reports.length} {reports.length === 1 ? "relatório disponível" : "relatórios disponíveis"}</p></div>
      <ReportsClient reports={reports} />
    </div>
  );
}
