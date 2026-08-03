import React from "react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { FileText } from "lucide-react";
import Link from "next/link";
import { LeiturasClient } from "../components/LeiturasClient";
import { LeiturasInteractiveClient } from "./LeiturasInteractiveClient";

export default async function LeiturasPage() {
  const { prisma } = await getTenantContextForModule("SANEAMENTO");
  const [readings, units] = await Promise.all([
    prisma.sanMeterReading.findMany({
      include: { unit: { select: { code: true } } },
      orderBy: { readingDate: "desc" },
    }),
    prisma.sanConsumerUnit.findMany({
      select: { id: true, code: true, address: true },
      orderBy: { code: "asc" },
    }),
  ]);

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1 text-xs text-gray-400">
          <Link href="/saneamento" className="hover:text-gray-600 transition-colors">Água e Saneamento</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">Leituras e Consumo</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-emerald-500" />
          Leituras e Consumo
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">{readings.length} leitura{readings.length !== 1 ? "s" : ""} registrada{readings.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Interactive Engine Component */}
      <LeiturasInteractiveClient />

      <LeiturasClient readings={readings} units={units} />
    </div>
  );
}
