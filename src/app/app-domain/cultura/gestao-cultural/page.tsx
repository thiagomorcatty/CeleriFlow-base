import React from "react";
import { Search, Plus, Palette, Users, MapPin, Landmark, Eye, MoreVertical } from "lucide-react";

export default function GestaoCulturalPage() {
  const itens = [
    { id: 1, type: "Agente", title: "Associação dos Artesãos da Cidade", category: "Artesanato / Associação", status: "Ativo", contact: "artesaos@email.com", responsible: "Maria Souza" },
    { id: 2, type: "Espaço", title: "Biblioteca Municipal Aluísio de Azevedo", category: "Literatura / Espaço Público", status: "Funcionando", contact: "biblioteca@email.com", responsible: "Ana Lima" },
    { id: 3, type: "Patrimônio", title: "Casarão Imperial (Tombado)", category: "Histórico / Arquitetura", status: "Restaurado", contact: "patrimonio@email.com", responsible: "Sec. Obras e Cultura" },
    { id: 4, type: "Agente", title: "Grupo de Teatro 'Luz e Cena'", category: "Teatro / Coletivo", status: "Ativo", contact: "luzecena@email.com", responsible: "Julio Cesar" },
    { id: 5, type: "Espaço", title: "Museu Histórico Municipal", category: "Histórico / Museu", status: "Funcionando", contact: "museu@email.com", responsible: "Renata Abreu" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gestão Cultural</h1>
          <p className="text-slate-500 dark:text-slate-400">Cadastro de agentes culturais, mapeamento de espaços e preservação do patrimônio histórico.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Novo Espaço
          </button>
          <button className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Novo Agente Cultural
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por agente, espaço ou patrimônio..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-600/20 focus:border-pink-600 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none w-full sm:w-auto">
              <option>Todos os Tipos</option>
              <option>Agentes</option>
              <option>Espaços</option>
              <option>Patrimônio</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Nome / Identificação</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Categoria / Segmento</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Responsável & Contato</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
              {itens.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{item.title}</div>
                    <div className="text-slate-500 text-xs mt-1">ID: #GC-{2026000 + item.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border
                      ${item.type === 'Agente' ? 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:border-pink-800' : 
                        item.type === 'Espaço' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-800' : 
                        'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800'}
                    `}>
                      {item.type === 'Agente' && <Users className="w-3.5 h-3.5" />}
                      {item.type === 'Espaço' && <MapPin className="w-3.5 h-3.5" />}
                      {item.type === 'Patrimônio' && <Landmark className="w-3.5 h-3.5" />}
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    {item.category}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${item.status === 'Ativo' || item.status === 'Funcionando' || item.status === 'Restaurado' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}
                    `}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900 dark:text-white">{item.responsible}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{item.contact}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-slate-400 hover:text-pink-600 transition-colors p-2 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20" title="Ver Ficha">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
