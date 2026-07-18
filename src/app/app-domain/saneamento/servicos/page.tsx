import React from "react";
import { prisma } from "@/lib/prisma";
import { Wrench } from "lucide-react";
import Link from "next/link";
import { ServicosClient } from "../components/ServicosClient";

export default async function ServicosPage() {
  const [orders, units] = await Promise.all([
    prisma.sanServiceOrder.findMany({
      include: { unit: { select: { code: true } } },
      orderBy: { createdAt: "desc" },
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
          <span className="text-gray-600 font-medium">Ordens de Serviço</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Wrench className="h-5 w-5 text-[#0284C7]" />
          Serviços e Manutenção
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">{orders.length} ordem{orders.length !== 1 ? "s" : ""} de serviço</p>
      </div>

      <ServicosClient orders={orders} units={units} />
    </div>
  );
}
