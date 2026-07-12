"use client";

import { useState } from "react";
import Link from "next/link";
import { User, UserX } from "lucide-react";
import { SubmitButton } from "./SubmitButton";

interface Channel {
  id: string;
  name: string;
}

interface NovoChamadoFormProps {
  channels: Channel[];
  createTicketAction: (formData: FormData) => Promise<void>;
}

export default function NovoChamadoForm({ channels, createTicketAction }: NovoChamadoFormProps) {
  const [isAnonymous, setIsAnonymous] = useState(true);

  return (
    <form action={createTicketAction} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 space-y-8">
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">1. Identificação do Solicitante</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className={`cursor-pointer border rounded-xl p-4 flex items-start gap-3 transition-all ${isAnonymous ? 'border-violet-600 bg-violet-50/50 ring-1 ring-violet-600' : 'border-slate-200 hover:border-violet-300'}`}>
              <input 
                type="radio" 
                name="isAnonymousType" 
                value="true" 
                checked={isAnonymous} 
                onChange={() => setIsAnonymous(true)} 
                className="mt-1 w-4 h-4 text-violet-600 focus:ring-violet-600" 
              />
              <div>
                <strong className="block text-slate-800 font-semibold flex items-center gap-2">
                  <UserX className="w-4 h-4 text-slate-500" /> Anônimo
                </strong>
                <span className="text-sm text-slate-500 mt-1 block">Não informar dados. Ideal para zeladoria (ex: buraco na rua). Não haverá retorno de contato.</span>
              </div>
            </label>

            <label className={`cursor-pointer border rounded-xl p-4 flex items-start gap-3 transition-all ${!isAnonymous ? 'border-violet-600 bg-violet-50/50 ring-1 ring-violet-600' : 'border-slate-200 hover:border-violet-300'}`}>
              <input 
                type="radio" 
                name="isAnonymousType" 
                value="false" 
                checked={!isAnonymous} 
                onChange={() => setIsAnonymous(false)} 
                className="mt-1 w-4 h-4 text-violet-600 focus:ring-violet-600" 
              />
              <div>
                <strong className="block text-slate-800 font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-violet-600" /> Identificado
                </strong>
                <span className="text-sm text-slate-500 mt-1 block">Preencher dados para receber atualizações e retorno de contato sobre o chamado.</span>
              </div>
            </label>
          </div>

          {!isAnonymous && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700 block">Nome Completo *</label>
                <input 
                  type="text" 
                  name="fullName" 
                  required={!isAnonymous} 
                  placeholder="Nome do cidadão"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-600/20 focus:border-violet-600 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">CPF *</label>
                <input 
                  type="text" 
                  name="cpf" 
                  required={!isAnonymous} 
                  placeholder="Apenas números"
                  maxLength={11}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-600/20 focus:border-violet-600 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Telefone / WhatsApp *</label>
                <input 
                  type="text" 
                  name="phone" 
                  required={!isAnonymous} 
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-600/20 focus:border-violet-600 transition-all"
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">2. Detalhes da Solicitação</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Canal de Entrada *</label>
              <select name="channelId" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-600/20 focus:border-violet-600 transition-all">
                {channels.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Prioridade</label>
              <select name="priority" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-600/20 focus:border-violet-600 transition-all">
                <option value="Normal">Normal</option>
                <option value="Baixa">Baixa</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 block">Assunto / Resumo *</label>
              <input 
                type="text"
                name="subject"
                required
                placeholder="Ex: Troca de Lâmpada Queimada"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-600/20 focus:border-violet-600 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <label className="text-sm font-semibold text-slate-700 block">Descrição Detalhada *</label>
            <textarea 
              name="description"
              required
              rows={4}
              placeholder="Informe endereço, ponto de referência e detalhes do problema..."
              className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-600/20 focus:border-violet-600 transition-all resize-none"
            />
          </div>
        </div>

      </div>

      <div className="bg-slate-50 border-t border-slate-200 p-6 flex items-center justify-end gap-3">
        <Link href="/atendimento" className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-lg transition-colors">
          Cancelar
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}
