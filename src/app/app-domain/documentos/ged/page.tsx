import { Folder as FolderIcon, File, MoreVertical, Plus, Search, Upload, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function GEDPage({ searchParams }: { searchParams?: { folderId?: string } }) {
  const currentFolderId = searchParams?.folderId || null;

  let currentFolder = null;
  if (currentFolderId) {
    currentFolder = await prisma.folder.findUnique({
      where: { id: currentFolderId },
      include: { parent: true }
    });
  }

  const folders = await prisma.folder.findMany({
    where: { parentId: currentFolderId },
    include: {
      _count: { select: { documents: true, children: true } }
    }
  });

  const documents = currentFolderId 
    ? await prisma.document.findMany({ where: { folderId: currentFolderId }, orderBy: { createdAt: 'desc' } })
    : await prisma.document.findMany({
        take: 10,
        where: { documentType: { not: 'Modelo' } },
        orderBy: { createdAt: 'desc' }
      });

  return (
    <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FolderIcon className="w-6 h-6 text-indigo-600" />
            {currentFolder ? currentFolder.name : "Gerenciamento Eletrônico de Documentos"}
          </h1>
          <p className="text-slate-500 mt-1">
            {currentFolder ? currentFolder.description || "Navegando na pasta" : "Navegue pelas pastas e arquivos da instituição."}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Nova Pasta
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar GED */}
        <div className="w-full md:w-64 border-r border-slate-200 bg-slate-50/50 p-4">
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar no GED..." 
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
            />
          </div>
          
          <nav className="space-y-1">
            <Link href="/documentos/ged" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm ${!currentFolderId ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-100 text-slate-600'}`}>
              <FolderIcon className="w-4 h-4" />
              Raiz do GED
            </Link>
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-600 font-medium text-sm">
              <User className="w-4 h-4 text-slate-400" />
              Compartilhados
            </a>
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-600 font-medium text-sm">
              <Clock className="w-4 h-4 text-slate-400" />
              Recentes
            </a>
          </nav>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 p-6">
          {currentFolder && (
            <div className="mb-6">
              <Link href={currentFolder.parentId ? `/documentos/ged?folderId=${currentFolder.parentId}` : `/documentos/ged`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Link>
            </div>
          )}

          <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Pastas</h3>
          
          {folders.length === 0 ? (
            <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200 border-dashed mb-8">
              <p className="text-slate-500 text-sm">Nenhuma subpasta.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {folders.map(folder => (
                <Link key={folder.id} href={`/documentos/ged?folderId=${folder.id}`} className="border border-slate-200 rounded-xl p-4 flex items-start justify-between hover:border-indigo-300 hover:shadow-sm cursor-pointer transition-all bg-white group">
                  <div className="flex gap-3">
                    <FolderIcon className="w-8 h-8 text-indigo-400 group-hover:text-indigo-600 transition-colors" fill="currentColor" fillOpacity={0.2} />
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm group-hover:text-indigo-700">{folder.name}</h4>
                      <p className="text-xs text-slate-500">{folder._count.documents} arquivos, {folder._count.children} pastas</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">{currentFolderId ? 'Arquivos na Pasta' : 'Arquivos Recentes'}</h3>
          
          {documents.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 border-dashed">
              <p className="text-slate-500 text-sm">Nenhum arquivo encontrado.</p>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Nome</th>
                    <th className="px-4 py-3">Tipo</th>
                    <th className="px-4 py-3">Modificado em</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {documents.map(doc => (
                    <tr key={doc.id} className="hover:bg-slate-50 cursor-pointer">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <File className="w-5 h-5 text-slate-400" />
                        <span className="font-medium text-slate-800">{doc.title}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{doc.documentType || 'Arquivo'}</td>
                      <td className="px-4 py-3 text-slate-500">{new Date(doc.createdAt).toLocaleDateString('pt-BR')}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
