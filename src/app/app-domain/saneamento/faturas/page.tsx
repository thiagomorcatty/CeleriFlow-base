import React from "react";
import { prisma } from "@/lib/prisma";
import { Receipt } from "lucide-react";
import Link from "next/link";
import { FaturasClient } from "../components/FaturasClient";

export default async function FaturasPage() {
  const invoices = await prisma.sanInvoice.findMany({
    select: {
      id: true,
      invoiceNumber: true,
      competence: true,
      totalAmount: true,
      dueDate: true,
      status: true,
      unit: { select: { code: true } },
    },
    orderBy: { dueDate: "desc" },
  });

  const serialized = invoices.map((inv) => ({
    ...inv,
    dueDate: inv.dueDate.toISOString(),
  }));

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs text-gray-400">
            <Link href="/saneamento" className="hover:text-gray-600 transition-colors">Água e Saneamento</Link>
            <span>/</span>
            <span className="text-gray-600 font-medium">Faturamento</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Receipt className="h-5 w-5 text-[#0284C7]" />
            Contas de Água e Esgoto
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">{invoices.length} fatura{invoices.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <FaturasClient invoices={serialized} />
    </div>
  );
}
