import { prisma } from "@/lib/prisma";
import { Droplet } from "lucide-react";
import Link from "next/link";

const COMPLIANCE_COLORS: Record<string, string> = {
  Conforme: "bg-emerald-100 text-emerald-700",
  "Não Conforme": "bg-red-100 text-red-700",
};

export default async function QualidadePage() {
  const analyses = await prisma.sanWaterQualityAnalysis.findMany({ orderBy: { collectedAt: "desc" } });

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/saneamento" className="hover:text-gray-600">Água e Saneamento</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">Esgoto e Qualidade</span>
        </div>
        <h1 className="mt-1 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"><Droplet className="h-5 w-5 text-cyan-500" />Esgoto e Qualidade</h1>
        <p className="mt-1 text-xs text-gray-400">{analyses.length} análise{analyses.length !== 1 ? "s" : ""} registrada{analyses.length !== 1 ? "s" : ""}</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50 text-xs font-semibold uppercase text-gray-500 dark:bg-gray-800">
            <tr><th className="px-3 py-2">Ponto</th><th className="px-3 py-2">Coleta</th><th className="px-3 py-2">Parâmetro</th><th className="px-3 py-2">Resultado</th><th className="px-3 py-2">Limite</th><th className="px-3 py-2">Conformidade</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {analyses.map((analysis) => <tr key={analysis.id} className="text-xs text-gray-600"><td className="px-3 py-2 font-medium">{analysis.collectionPoint}</td><td className="px-3 py-2">{analysis.collectedAt.toLocaleDateString("pt-BR")}</td><td className="px-3 py-2">{analysis.parameter}</td><td className="px-3 py-2">{analysis.result}</td><td className="px-3 py-2">{analysis.limit}</td><td className="px-3 py-2"><span className={`rounded-full px-1.5 py-0.5 font-medium ${COMPLIANCE_COLORS[analysis.compliance] ?? "bg-gray-100 text-gray-500"}`}>{analysis.compliance}</span></td></tr>)}
            {analyses.length === 0 && <tr><td colSpan={6} className="px-3 py-10 text-center text-sm text-gray-400">Nenhuma análise registrada.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
