"use client";

import { Trash2 } from "lucide-react";
import { deleteNews } from "./actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function NoticiasTable({ news }: { news: any[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta notícia?")) {
      startTransition(async () => {
        await deleteNews(id);
        router.refresh();
      });
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
          <tr>
            <th className="px-6 py-4">Título</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Autor</th>
            <th className="px-6 py-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {news.map(item => (
            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-800">{item.title}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${item.status === 'Publicado' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-600">{item.author?.name || "-"}</td>
              <td className="px-6 py-4 flex justify-end gap-2">
                <button 
                  onClick={() => handleDelete(item.id)}
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
