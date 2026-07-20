import Link from "next/link";
import { Scale } from "lucide-react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

function formatDate(date: Date | null) {
  return date ? new Intl.DateTimeFormat("pt-BR").format(date) : "-";
}

export default async function LeisPage() {
  const { prisma } = await getTenantContextForModule("CAMARA");
  const leis = await prisma.camLei.findMany({
    include: { proposicao: { include: { autor: true } } },
    orderBy: { dataPublicacao: "desc" },
  });

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm">
          <Link href="/camara" className="text-gray-500 hover:text-gray-700">Câmara Municipal</Link>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-900">Leis e Atos</span>
        </div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Scale className="h-6 w-6 text-[#9333EA]" /> Leis e Atos Normativos
        </h1>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-6 py-3">Número</th><th className="px-6 py-3">Tipo</th><th className="px-6 py-3">Ementa</th><th className="px-6 py-3">Publicação</th><th className="px-6 py-3">Situação</th></tr></thead>
          <tbody>{leis.map((lei) => <tr key={lei.id} className="border-t border-gray-100"><td className="px-6 py-4 font-medium text-gray-900">{lei.numero}</td><td className="px-6 py-4 text-gray-600">{lei.tipo}</td><td className="max-w-xl truncate px-6 py-4 text-gray-600">{lei.ementa}</td><td className="px-6 py-4 text-gray-600">{formatDate(lei.dataPublicacao)}</td><td className="px-6 py-4"><span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">{lei.status}</span></td></tr>)}</tbody>
        </table>
        {leis.length === 0 && <p className="p-12 text-center text-gray-500">Nenhuma lei ou ato cadastrado.</p>}
      </div>
    </div>
  );
}
