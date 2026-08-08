"use client";

import { useState, useRef } from "react";
import {
  Upload, Plus, Folder as FolderIcon, File, X, Check,
  Trash2, MoreVertical, ExternalLink
} from "lucide-react";
import { createFolder, createDocument, deleteDocument, deleteFolder } from "./actions";

type DocItem = {
  id: string;
  title: string;
  documentType: string;
  fileUrl: string;
  status: string;
  createdAt: Date | string;
};
type FolderItem = {
  id: string;
  name: string;
  description: string | null;
  _count: { documents: number; children: number };
};

export default function GEDClient({
  folders,
  documents,
  currentFolderId,
}: {
  folders: FolderItem[];
  documents: DocItem[];
  currentFolderId: string | null;
}) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadType, setUploadType] = useState("Arquivo");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    setLoading(true);
    try {
      await createFolder(folderName, currentFolderId);
      setFolderName("");
      setShowFolderModal(false);
    } catch {
      alert("Erro ao criar pasta");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile || !uploadTitle.trim()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Falha no upload do arquivo");
      }

      const blobData = await response.json();

      await createDocument(uploadTitle, uploadType, blobData.url, currentFolderId);
      
      setUploadTitle("");
      setUploadFile(null);
      setUploadType("Arquivo");
      setShowUploadModal(false);
    } catch {
      alert("Erro ao fazer upload");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoc = async (id: string, title: string) => {
    if (!confirm(`Excluir o arquivo "${title}"?`)) return;
    setActiveMenu(null);
    try {
      await deleteDocument(id);
    } catch {
      alert("Erro ao excluir");
    }
  };

  const handleDeleteFolder = async (id: string, name: string) => {
    if (!confirm(`Excluir a pasta "${name}" e todos os seus arquivos?`)) return;
    setActiveMenu(null);
    try {
      await deleteFolder(id);
    } catch {
      alert("Erro ao excluir pasta");
    }
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowFolderModal(true)}
          className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova Pasta
        </button>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>

      {/* Folder Grid */}
      {folders.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Pastas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {folders.map((folder) => (
              <div key={folder.id} className="relative group">
                <a
                  href={`/documentos/ged?folderId=${folder.id}`}
                  className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all"
                >
                  <FolderIcon className="w-8 h-8 text-amber-400 shrink-0" fill="currentColor" fillOpacity={0.25} />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{folder.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{folder._count.documents} arq. · {folder._count.children} pastas</p>
                  </div>
                </a>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === folder.id ? null : folder.id); }}
                  className="absolute top-2 right-2 p-1 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded opacity-0 group-hover:opacity-100 transition-all"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {activeMenu === folder.id && (
                  <div className="absolute top-8 right-2 z-20 bg-white border border-slate-200 rounded-xl shadow-xl py-1 min-w-[140px]">
                    <button
                      onClick={() => handleDeleteFolder(folder.id, folder.name)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Excluir pasta
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Files Table */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
          {currentFolderId ? "Arquivos na Pasta" : "Arquivos Recentes"}
        </h3>
        {documents.length === 0 ? (
          <div className="p-10 text-center bg-slate-50 rounded-xl border border-slate-200 border-dashed">
            <File className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 text-sm font-medium">Nenhum arquivo encontrado</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="mt-3 text-xs text-indigo-600 hover:underline font-semibold"
            >
              Fazer upload do primeiro arquivo
            </button>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Tipo</th>
                  <th className="px-4 py-3 hidden md:table-cell">Status</th>
                  <th className="px-4 py-3 hidden md:table-cell">Adicionado em</th>
                  <th className="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <File className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span className="font-medium text-slate-800 truncate max-w-[200px]">{doc.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{doc.documentType}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        doc.status === 'Válido' ? 'bg-emerald-100 text-emerald-700' :
                        doc.status === 'Pendente Assinatura' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs hidden md:table-cell">
                      {new Date(doc.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-right relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === doc.id ? null : doc.id)}
                        className="p-1 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {activeMenu === doc.id && (
                        <div className="absolute top-8 right-2 z-20 bg-white border border-slate-200 rounded-xl shadow-xl py-1 min-w-[160px]">
                          <a
                            href={doc.fileUrl.startsWith("http") ? `/api/download?url=${encodeURIComponent(doc.fileUrl)}` : doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                            onClick={() => setActiveMenu(null)}
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Visualizar
                          </a>
                          <button
                            onClick={() => handleDeleteDoc(doc.id, doc.title)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Excluir
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Backdrop for closing menus */}
      {activeMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
      )}

      {/* Nova Pasta Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowFolderModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FolderIcon className="w-5 h-5 text-indigo-600" /> Nova Pasta
              </h2>
              <button onClick={() => setShowFolderModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nome da Pasta</label>
            <input
              type="text"
              placeholder="Ex: Contratos 2026"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 mb-4"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowFolderModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancelar</button>
              <button
                onClick={handleCreateFolder}
                disabled={!folderName.trim() || loading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? "Criando..." : <><Check className="w-4 h-4" /> Criar</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowUploadModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-600" /> Upload de Arquivo
              </h2>
              <button onClick={() => setShowUploadModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* File Picker */}
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-xl p-6 text-center cursor-pointer transition-colors mb-4"
            >
              <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              {uploadFile ? (
                <p className="text-sm font-semibold text-indigo-600">{uploadFile.name}</p>
              ) : (
                <p className="text-sm text-slate-500">Clique para selecionar um arquivo</p>
              )}
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setUploadFile(f);
                    if (!uploadTitle) setUploadTitle(f.name.replace(/\.[^.]+$/, ""));
                  }
                }}
              />
            </div>

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Título do Documento</label>
                <input
                  type="text"
                  placeholder="Nome do documento"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Tipo de Documento</label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                >
                  <option>Arquivo</option>
                  <option>Ofício</option>
                  <option>Contrato</option>
                  <option>Portaria</option>
                  <option>Decreto</option>
                  <option>Edital</option>
                  <option>Relatório</option>
                  <option>Norma</option>
                  <option>Projeto</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancelar</button>
              <button
                onClick={handleUpload}
                disabled={!uploadFile || !uploadTitle.trim() || loading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? "Enviando..." : <><Check className="w-4 h-4" /> Confirmar Upload</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
