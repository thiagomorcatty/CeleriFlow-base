import { ArrowLeft, Save, Headphones, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NovoChamadoPage() {
  const channels = await prisma.supportChannel.findMany({ where: { isActive: true } });
  
  // Se não houver canais, criamos um padrão para não quebrar a tela
  if (channels.length === 0) {
    await prisma.supportChannel.create({
      data: { name: "Balcão Presencial", description: "Atendimento direto na prefeitura" }
    });
    return redirect("/atendimento/novo");
  }

  const pessoas = await prisma.person.findMany({
    where: { status: "Ativo" },
    take: 50 // Simplificação para MVP
  });

  async function createTicket(formData: FormData) {
    "use server";
    
    const personId = formData.get("personId") as string;
    const channelId = formData.get("channelId") as string;
    const subject = formData.get("subject") as string;
    const priority = formData.get("priority") as string;
    const description = formData.get("description") as string;
    
    const ticketNumber = `TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    await prisma.ticket.create({
      data: {
        ticketNumber,
        personId: personId || null,
        channelId,
        subject,
        priority,
        description,
        status: "Aberto",
      }
    });

    redirect("/atendimento");
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link href="/atendimento" className="text-violet-600 hover:text-violet-700 text-sm font-semibold flex items-center gap-2 mb-4 w-fit transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Painel
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Headphones className="w-6 h-6 text-violet-600" />
          Novo Chamado Rápido
        </h1>
        <p className="text-slate-500 mt-1">Registre uma solicitação de serviço (ex: Troca de lâmpada, tapa-buraco, dúvidas).</p>
      </div>

      <form action={createTicket} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">1. Dados do Solicitante</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700 block">Cidadão (Opcional para serviços públicos)</label>
                <select name="personId" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-600/20 focus:border-violet-600 transition-all">
                  <option value="">Anônimo / Não informado</option>
                  {pessoas.map(p => (
                    <option key={p.id} value={p.id}>{p.fullName} (CPF: {p.cpf})</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500">Para chamados gerais (ex: buraco na rua), o solicitante pode ser anônimo.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Canal de Entrada *</label>
                <select name="channelId" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-600/20 focus:border-violet-600 transition-all">
                  {channels.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">2. Detalhes da Solicitação</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Prioridade</label>
                <select name="priority" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-600/20 focus:border-violet-600 transition-all">
                  <option value="Baixa">Baixa</option>
                  <option value="Normal">Normal</option>
                  <option value="Alta">Alta</option>
                  <option value="Urgente">Urgente</option>
                </select>
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
          <button type="submit" className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <CheckCircle2 className="w-4 h-4" />
            Abrir Chamado
          </button>
        </div>
      </form>
    </div>
  );
}
