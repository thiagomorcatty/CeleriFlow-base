import { prisma } from "@/lib/prisma";
import { Globe } from "lucide-react";
import Link from "next/link";

export default async function PortalPage() {
  const requests = await prisma.sanPortalRequest.findMany({ orderBy: { requestedAt: "desc" } });

  return (
    <div className="flex-1 p-6">
      <div className="mb-6"><div className="flex items-center gap-2 text-xs text-gray-400"><Link href="/saneamento" className="hover:text-gray-600">Água e Saneamento</Link><span>/</span><span className="text-gray-600 font-medium">Portal do Consumidor</span></div><h1 className="mt-1 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"><Globe className="h-5 w-5 text-indigo-500" />Portal do Consumidor</h1><p className="mt-1 text-xs text-gray-400">{requests.length} {requests.length === 1 ? "solicitação registrada" : "solicitações registradas"}</p></div>
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"><table className="w-full text-left"><thead className="border-b bg-gray-50 text-xs font-semibold uppercase text-gray-500 dark:bg-gray-800"><tr><th className="px-3 py-2">Solicitação</th><th className="px-3 py-2">Solicitante</th><th className="px-3 py-2">Data</th><th className="px-3 py-2">Origem</th><th className="px-3 py-2">Status</th></tr></thead><tbody className="divide-y divide-gray-50">{requests.map((request) => <tr key={request.id} className="text-xs text-gray-600"><td className="px-3 py-2 font-medium">{request.requestType}</td><td className="px-3 py-2">{request.requesterName}</td><td className="px-3 py-2">{request.requestedAt.toLocaleDateString("pt-BR")}</td><td className="px-3 py-2">{request.source}</td><td className="px-3 py-2">{request.status}</td></tr>)}{requests.length === 0 && <tr><td colSpan={5} className="px-3 py-10 text-center text-sm text-gray-400">Nenhuma solicitação registrada.</td></tr>}</tbody></table></div>
    </div>
  );
}
