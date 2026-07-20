import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { Droplet } from "lucide-react";
import Link from "next/link";
import { QualityClient } from "../components/QualityClient";

export default async function QualidadePage() {
  const { prisma } = await getTenantContextForModule("SANEAMENTO");
  const analyses = await prisma.sanWaterQualityAnalysis.findMany({
    select: {
      id: true,
      collectionPoint: true,
      collectedAt: true,
      parameter: true,
      result: true,
      limit: true,
      compliance: true,
      active: true,
    },
    orderBy: { collectedAt: "desc" },
  });

  const serializedAnalyses = analyses.map((analysis) => ({
    ...analysis,
    collectedAt: analysis.collectedAt.toISOString().slice(0, 10),
  }));

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
      <QualityClient analyses={serializedAnalyses} />
    </div>
  );
}
