import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NovoProtocoloPage() {
  // Buscar os tipos de processo e pessoas para o formulário
  const tiposProcesso = await prisma.processType.findMany({
    where: { isActive: true },
    include: { subjects: true }
  });
  
  const pessoas = await prisma.person.findMany({
    where: { status: "Ativo" },
    take: 100 // Simplificação para o MVP
  });

  async function createProtocol(formData: FormData) {
    "use server";
    
    const personId = formData.get("personId") as string;
    const processTypeId = formData.get("processTypeId") as string;
    const subjectId = formData.get("subjectId") as string;
    const priority = formData.get("priority") as string;
    const description = formData.get("description") as string;
    
    // Generate a random protocol number for now
    const protocolNumber = `PROC-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    await prisma.process.create({
      data: {
        protocolNumber,
        personId: personId || null,
        processTypeId,
        subjectId,
        priority,
        description,
        status: "Aberto",
      }
    });

    redirect("/protocolos/processos");
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link href="/protocolos/processos" className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold flex items-center gap-2 mb-4 w-fit transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para a Caixa do Setor
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Novo Protocolo</h1>
        <p className="text-slate-500 mt-1">Abra um novo processo digital e encaminhe para o setor responsável.</p>
      </div>

      <form action={createProtocol} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">1. Identificação</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Interessado (Cidadão)</label>
                <select name="personId" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all">
                  <option value="">Selecione um interessado</option>
                  {pessoas.map(p => (
                    <option key={p.id} value={p.id}>{p.fullName} (CPF: {p.cpf})</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500">Apenas pessoas ativas no Cadastro Geral.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Tipo de Processo *</label>
                <select name="processTypeId" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all">
                  <option value="">Selecione o tipo</option>
                  {tiposProcesso.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Assunto *</label>
                <select name="subjectId" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all">
                  <option value="">Selecione o assunto</option>
                  {tiposProcesso.map(t => 
                    t.subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({t.name})</option>
                    ))
                  )}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Prioridade</label>
                <select name="priority" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all">
                  <option value="Normal">Normal</option>
                  <option value="Alta">Alta</option>
                  <option value="Urgente">Urgente</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">2. Descrição da Solicitação</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Descrição Inicial</label>
              <textarea 
                name="description"
                rows={5}
                placeholder="Descreva detalhadamente o motivo da abertura do processo..."
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all resize-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">3. Anexos</h3>
            
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100/50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-sm">
                <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Clique para anexar documentos</p>
              <p className="text-xs text-slate-500 mt-1">PDF, JPG ou PNG (Máx 10MB por arquivo)</p>
            </div>
          </div>

        </div>

        <div className="bg-slate-50 border-t border-slate-200 p-6 flex items-center justify-end gap-3">
          <Link href="/protocolos/processos" className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-lg transition-colors">
            Cancelar
          </Link>
          <button type="submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Save className="w-4 h-4" />
            Gerar Protocolo
          </button>
        </div>
      </form>
    </div>
  );
}
