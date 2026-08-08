"use client";

import { Trash2 } from "lucide-react";
import { deletePage } from "./actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

type PortalPage = {
  id: string;
  title: string;
  slug: string;
  status: string;
};

export default function PaginasTable({ pages }: { pages: PortalPage[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta página?")) {
      startTransition(async () => {
        await deletePage(id);
        router.refresh();
      });
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
          <tr>
            <th className="px-6 py-4">Título da Página</th>
            <th className="px-6 py-4">URL (Slug)</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {pages.map(page => (
            <tr key={page.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-800">{page.title}</td>
              <td className="px-6 py-4 text-slate-500 text-xs font-mono">/portal/{page.slug}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${page.status === 'Publicado' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                  {page.status}
                </span>
              </td>
              <td className="px-6 py-4 flex justify-end gap-2">
                <button 
                  onClick={() => handleDelete(page.id)}
                  disabled={isPending}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
