import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { File, Search, Plus, Upload, Download, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DocumentosPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      person: true,
      company: true,
    },
    take: 20
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <File className="w-6 h-6 text-rose-600" />
            Documentos e Anexos
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os documentos anexados de pessoas e empresas.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Upload className="w-4 h-4" />
            Importar
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <Link href="/app-domain/cadastros/documentos/novo" className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Adicionar Documento
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por Tipo, Número ou Vínculo..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600"
            />
          </div>
        </div>

        {documents.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <File className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum documento encontrado</h3>
            <p className="text-slate-500 mt-1">Comece anexando o primeiro documento à base de dados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Título do Documento</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Vínculo</th>
                  <th className="px-6 py-3">Validade</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => {
                  let link = '-';
                  if (doc.person) link = doc.person.fullName;
                  else if (doc.company) link = doc.company.corporateName;

                  return (
                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        {doc.title}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{doc.documentType}</td>
                      <td className="px-6 py-4 text-slate-600">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                          {link}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {doc.validUntil ? new Date(doc.validUntil).toLocaleDateString('pt-BR') : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {doc.fileUrl && (
                          <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="text-rose-600 hover:text-rose-800 text-sm font-semibold mr-3">Ver Anexo</a>
                        )}
                        <button className="text-slate-600 hover:text-slate-800 text-sm font-semibold">Editar</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
