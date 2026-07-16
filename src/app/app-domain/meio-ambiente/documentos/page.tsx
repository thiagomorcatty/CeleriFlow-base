import React from "react";
import { prisma } from "@/lib/prisma";
import { FolderOpen, Search, Download } from "lucide-react";
import Link from "next/link";
import { NewDocumentSheet } from "../components/NewDocumentSheet";
import { QuickFilters } from "../components/QuickFilters";
import { ActionButtons } from "../components/ActionButtons";
import { deleteEnvDocument } from "../actions";

export const dynamic = "force-dynamic";

export default async function DocumentosAmbientaisPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> | { [key: string]: string | undefined } }) {
  const searchParams = await Promise.resolve(props.searchParams || {});
  
  const where: any = {};
  if (searchParams.tipo) where.docType = searchParams.tipo;

  const documents = await prisma.envDocument.findMany({ where, include: { enterprise: true }, orderBy: { createdAt: "desc" } });
  const enterprises = await prisma.envEnterprise.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/meio-ambiente" className="text-gray-500 hover:text-gray-700">Meio Ambiente</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Documentos</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FolderOpen className="h-6 w-6 text-green-600" />
            Central de Documentos
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/app-domain/documentos/ged" className="text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg transition-colors border border-green-200">
            Acessar GED Central
          </Link>
          <NewDocumentSheet enterprises={enterprises} />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 flex-wrap gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Buscar documentos..." className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <QuickFilters filters={[
            { name: "tipo", label: "Tipo", options: [{ value: "Laudo/Relatorio Tecnico", label: "Laudo/Relatorio Tecnico" }, { value: "Termo de Compromisso", label: "Termo de Compromisso" }, { value: "Parecer Tecnico", label: "Parecer Tecnico" }, { value: "Alvara/Autorizacao Especial", label: "Alvara/Autorizacao Especial" }, { value: "Outros", label: "Outros" }] }
          ]} />
        </div>
        {documents.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-300 animate-bounce" />
            <p>Nenhum documento anexado.</p>
            <p className="text-sm">Clique em "Anexar Documento" para adicionar.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Titulo do Documento</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Empreendimento Vinculado</th>
                  <th className="px-6 py-3">Data de Cadastro</th>
                  <th className="px-6 py-3 text-center">Download</th>
                  <th className="px-6 py-3 text-right">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{doc.title}</td>
                    <td className="px-6 py-4 text-gray-500">{doc.docType}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {doc.enterprise ? doc.enterprise.name : <span className="text-gray-400 italic">Documento Geral</span>}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{new Date(doc.createdAt).toLocaleDateString("pt-BR")}</td>
                    <td className="px-6 py-4 text-center">
                      <a
                        href={doc.fileUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-950 dark:text-slate-300 rounded-lg transition-colors"
                        title="Baixar arquivo"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ActionButtons id={doc.id} onDelete={deleteEnvDocument} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
