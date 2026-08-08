"use client";

import Link from "next/link";
import { useState } from "react";
import { EyeOff, Search } from "lucide-react";

type Ombudsman = {
  id: string;
  protocolNumber: string;
  type: string;
  subject: string;
  isAnonymous: boolean;
  isConfidential: boolean;
  status: string;
  createdAt: Date;
  person: { fullName: string } | null;
};

export default function OuvidoriaClient({ initialManifestacoes }: { initialManifestacoes: Ombudsman[]; canManage: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const manifestacoes = initialManifestacoes.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (!search || item.protocolNumber.toLowerCase().includes(search) || item.subject.toLowerCase().includes(search)) && (!filterType || item.type === filterType);
  });
  return <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
    <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 bg-slate-50/50">
      <label className="relative flex-1 max-w-md"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar por protocolo ou assunto" className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm" /></label>
      <select value={filterType} onChange={(event) => setFilterType(event.target.value)} className="p-2 border rounded-lg text-sm"><option value="">Todos os tipos</option><option>Denúncia</option><option>Reclamação</option><option>Sugestão</option><option>Elogio</option></select>
    </div>
    {!manifestacoes.length ? <div className="p-12 text-center text-slate-500">Nenhuma manifestação encontrada.</div> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-600"><tr><th className="px-5 py-3">Protocolo</th><th className="px-5 py-3">Tipo</th><th className="px-5 py-3">Assunto</th><th className="px-5 py-3">Manifestante</th><th className="px-5 py-3">Status</th><th className="px-5 py-3" /></tr></thead><tbody className="divide-y">{manifestacoes.map((item) => <tr key={item.id}><td className="px-5 py-4 font-semibold">{item.protocolNumber}</td><td className="px-5 py-4">{item.type}</td><td className="px-5 py-4">{item.subject}</td><td className="px-5 py-4">{item.isAnonymous ? <span className="inline-flex gap-1 italic text-slate-500"><EyeOff className="w-4" />Anônimo</span> : item.person?.fullName || "Identidade restrita"}</td><td className="px-5 py-4">{item.status}</td><td className="px-5 py-4 text-right"><Link href={`/atendimento/ouvidoria/${item.id}`} className="text-amber-700 font-semibold">Abrir</Link></td></tr>)}</tbody></table></div>}
  </div>;
}
