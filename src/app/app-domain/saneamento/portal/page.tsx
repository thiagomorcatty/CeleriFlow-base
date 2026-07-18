import { prisma } from "@/lib/prisma";
import { Globe } from "lucide-react";
import Link from "next/link";
import { PortalClient } from "../components/PortalClient";

export default async function PortalPage() {
  const requests = await prisma.sanPortalRequest.findMany({
    select: {
      id: true,
      requestType: true,
      requesterName: true,
      requestedAt: true,
      source: true,
      status: true,
      active: true,
    },
    orderBy: { requestedAt: "desc" },
  });

  const serializedRequests = requests.map((request) => ({
    ...request,
    requestedAt: request.requestedAt.toISOString().slice(0, 10),
  }));

  return (
    <div className="flex-1 p-6">
      <div className="mb-6"><div className="flex items-center gap-2 text-xs text-gray-400"><Link href="/saneamento" className="hover:text-gray-600">Água e Saneamento</Link><span>/</span><span className="text-gray-600 font-medium">Portal do Consumidor</span></div><h1 className="mt-1 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"><Globe className="h-5 w-5 text-indigo-500" />Portal do Consumidor</h1><p className="mt-1 text-xs text-gray-400">{requests.length} {requests.length === 1 ? "solicitação registrada" : "solicitações registradas"}</p></div>
      <PortalClient requests={serializedRequests} />
    </div>
  );
}
