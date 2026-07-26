"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, User, UserX } from "lucide-react";
import { SubmitButton } from "./SubmitButton";

type Channel = { id: string; name: string };
type Department = { id: string; name: string };
type Subject = { id: string; name: string; defaultDepartmentId: string | null; defaultPriority: string; defaultDueDays: number | null };

export default function NovoChamadoForm({ channels, departments, subjects, createTicketAction }: { channels: Channel[]; departments: Department[]; subjects: Subject[]; createTicketAction: (formData: FormData) => Promise<void> }) {
  const [requesterType, setRequesterType] = useState<"person" | "company" | "anonymous">("anonymous");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const selectedSubject = subjects.find((subject) => subject.id === selectedSubjectId);

  return (
    <form action={createTicketAction} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">1. Solicitante</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              ["anonymous", "Anônimo", "Não vincula dados do solicitante.", UserX],
              ["person", "Pessoa Física", "Localiza ou atualiza o cadastro pela CPF.", User],
              ["company", "Pessoa Jurídica", "Localiza ou atualiza o cadastro pelo CNPJ.", Building2],
            ].map(([value, title, description, Icon]) => (
              <label key={value as string} className={`cursor-pointer border rounded-xl p-4 flex gap-3 ${requesterType === value ? "border-violet-600 bg-violet-50 ring-1 ring-violet-600" : "border-slate-200"}`}>
                <input type="radio" name="requesterType" value={value as string} checked={requesterType === value} onChange={() => setRequesterType(value as "person" | "company" | "anonymous")} className="mt-1" />
                <span><strong className="flex gap-2 items-center text-slate-800"><Icon className="w-4 h-4" />{title as string}</strong><small className="text-slate-500">{description as string}</small></span>
              </label>
            ))}
          </div>
          {requesterType === "person" && <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl"><input name="fullName" required placeholder="Nome completo" className="input" /><input name="cpf" required maxLength={14} placeholder="CPF" className="input" /><input name="phone" placeholder="Telefone" className="input" /></div>}
          {requesterType === "company" && <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl"><input name="corporateName" required placeholder="Razão social" className="input" /><input name="cnpj" required maxLength={18} placeholder="CNPJ" className="input" /><input name="companyPhone" placeholder="Telefone" className="input" /></div>}
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">2. Demanda e encaminhamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="field">Canal *<select name="channelId" required className="input">{channels.map((channel) => <option key={channel.id} value={channel.id}>{channel.name}</option>)}</select></label>
            <label className="field">Assunto parametrizado<select name="serviceSubjectId" value={selectedSubjectId} onChange={(event) => setSelectedSubjectId(event.target.value)} className="input"><option value="">Não classificado</option>{subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}</select></label>
            <label className="field">Setor responsável<select name="departmentId" defaultValue={selectedSubject?.defaultDepartmentId || ""} key={selectedSubject?.defaultDepartmentId || "none"} className="input"><option value="">Triagem posterior</option>{departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}</select></label>
            <label className="field">Prioridade<select name="priority" defaultValue={selectedSubject?.defaultPriority || "Normal"} key={selectedSubject?.defaultPriority || "normal"} className="input"><option>Baixa</option><option>Normal</option><option>Alta</option><option>Urgente</option></select></label>
            <label className="field md:col-span-2">Resumo *<input name="subject" required placeholder="Ex.: Iluminação pública em via" className="input" /></label>
            <label className="field md:col-span-2">Descrição *<textarea name="description" required rows={5} placeholder="Registre os fatos, endereço e referências." className="input resize-none" /></label>
          </div>
          {selectedSubject?.defaultDueDays && <p className="text-sm text-violet-700">O prazo previsto será de {selectedSubject.defaultDueDays} dia(s), conforme o assunto selecionado.</p>}
        </section>
      </div>
      <div className="bg-slate-50 border-t border-slate-200 p-6 flex justify-end gap-3"><Link href="/atendimento/central" className="px-5 py-2.5 text-sm font-semibold text-slate-600">Cancelar</Link><SubmitButton /></div>
    </form>
  );
}
