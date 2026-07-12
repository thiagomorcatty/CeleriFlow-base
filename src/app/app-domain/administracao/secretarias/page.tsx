import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SecretariasClient from "./SecretariasClient";

export const dynamic = "force-dynamic";

export default async function SecretariasPage() {
  const secretariats = await prisma.secretariat.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { departments: true } } }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Secretarias</h1>
          <p className="text-slate-500 mt-1">Gerencie os registros de secretarias e autarquias.</p>
        </div>
        <Link href="/administracao/secretarias/novo" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
          Adicionar Nova
        </Link>
      </div>
      <SecretariasClient secretariats={secretariats} />
    </div>
  );
}
