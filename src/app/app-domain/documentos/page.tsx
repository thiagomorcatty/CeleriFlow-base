import { Folder, FileText, FileSignature, UploadCloud } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DocumentosDashboardPage() {
  const totalDocuments = await prisma.document.count();
  const totalFolders = await prisma.folder.count();

  const stats = [
    { title: "Total de Documentos", value: totalDocuments.toString(), icon: FileText, href: "/app-domain/documentos/ged", color: "text-indigo-600", bg: "bg-indigo-100" },
    { title: "Pastas Criadas", value: totalFolders.toString(), icon: Folder, href: "/app-domain/documentos/ged", color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Assinaturas Pendentes", value: "0", icon: FileSignature, href: "/app-domain/documentos/assinaturas", color: "text-amber-600", bg: "bg-amber-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Documentos e GED</h1>
        <p className="text-slate-500 mt-2">Gestão eletrônica de documentos, pastas e modelos (Módulo 4).</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href} className="block group">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className="w-6 h-6" strokeWidth={2.5} />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-8 text-center mt-8">
        <div className="w-16 h-16 bg-white border border-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <UploadCloud className="w-8 h-8 text-indigo-500" />
        </div>
        <h2 className="text-xl font-bold text-indigo-900">Armazenamento em Nuvem</h2>
        <p className="text-indigo-700 mt-2 max-w-lg mx-auto">
          O CeleriFlow armazena os arquivos de forma segura, mantendo rastreabilidade e versionamento para auditorias e acessos rápidos.
        </p>
        <Link href="/documentos/ged" className="inline-block mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors">
          Acessar o GED
        </Link>
      </div>
    </div>
  );
}
