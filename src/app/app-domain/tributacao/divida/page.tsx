import { Banknote, Search, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DividaPage() {
  const activeDebts = await prisma.activeDebt.findMany({
    include: {
      taxpayer: { include: { person: true, company: true } }
    },
    take: 20,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Banknote className="w-6 h-6 text-red-600" />
            Dívida Ativa e Parcelamentos
          </h1>
          <p className="text-slate-500 mt-1">Gestão de débitos inscritos em dívida ativa municipal.</p>
        </div>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Inscrever em Dívida
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {activeDebts.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Banknote className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhuma dívida ativa</h3>
            <p className="text-slate-500 mt-1">Os débitos enviados para dívida ativa aparecerão aqui.</p>
          </div>
        ) : (
          <div className="p-4 text-slate-500">Listagem de Dívida (Em construção)</div>
        )}
      </div>
    </div>
  );
}
