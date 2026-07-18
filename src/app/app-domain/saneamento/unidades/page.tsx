import React from "react";
import { prisma } from "@/lib/prisma";
import { Droplets } from "lucide-react";
import Link from "next/link";
import { UnidadesClient } from "../components/UnidadesClient";

export default async function UnidadesPage() {
  const units = await prisma.sanConsumerUnit.findMany({
    select: {
      id: true,
      code: true,
      address: true,
      category: true,
      status: true,
      ownerName: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs text-gray-400">
            <Link href="/saneamento" className="hover:text-gray-600 transition-colors">Água e Saneamento</Link>
            <span>/</span>
            <span className="text-gray-600 font-medium">Unidades Consumidoras</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Droplets className="h-5 w-5 text-[#0284C7]" />
            Unidades Consumidoras
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">{units.length} unidade{units.length !== 1 ? "s" : ""} cadastrada{units.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <UnidadesClient units={units} />
    </div>
  );
}
