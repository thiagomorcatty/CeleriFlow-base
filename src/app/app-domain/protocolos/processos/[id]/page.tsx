import { ArrowLeft, Clock, FileText, Send, User, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProcessoDetalhesPage({ params }: { params: { id: string } }) {
  const processo = await prisma.process.findUnique({
    where: { id: params.id },
    include: {
      processType: true,
      subject: true,
      person: true,
      company: true,
      currentDepartment: true,
      dispatches: {
        include: { employee: true },
        orderBy: { createdAt: 'desc' }
      },
      movements: {
        include: { fromDepartment: true, toDepartment: true, employee: true },
        orderBy: { movedAt: 'desc' }
      },
      documents: {
        include: { employee: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!processo) {
    notFound();
  }

  const interessadoNome = processo.person?.fullName || processo.company?.corporateName || "Não Informado";
  const interessadoDoc = processo.person?.cpf || processo.company?.cnpj || "";

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/app-domain/protocolos/processos" className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold flex items-center gap-2 mb-4 w-fit transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar para a Caixa do Setor
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Processo {processo.protocolNumber}</h1>
            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
              processo.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' : 
              processo.status === 'Aberto' ? 'bg-blue-100 text-blue-700' :
              processo.status === 'Arquivado' ? 'bg-slate-100 text-slate-600' :
              'bg-amber-100 text-amber-700'
            }`}>
              {processo.status}
            </span>
          </div>
          <p className="text-slate-500 mt-1">{processo.processType.name} - {processo.subject.name}</p>
        </div>
        
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <FileText className="w-4 h-4" />
            Adicionar Despacho
          </button>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Send className="w-4 h-4" />
            Tramitar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna Principal - Histórico e Descrição */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Descrição Inicial</h3>
            <p className="text-slate-700 whitespace-pre-wrap">{processo.description || "Nenhuma descrição fornecida na abertura do protocolo."}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="text-sm font-semibold text-slate-800">Despachos e Pareceres</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {processo.dispatches.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-sm">Nenhum despacho adicionado a este processo.</div>
              ) : (
                processo.dispatches.map(dispatch => (
                  <div key={dispatch.id} className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                          {dispatch.employee.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{dispatch.employee.name}</p>
                          <p className="text-xs text-slate-500">{dispatch.dispatchType}</p>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(dispatch.createdAt).toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div className="pl-10 text-slate-700 text-sm mt-2 whitespace-pre-wrap">
                      {dispatch.content}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Coluna Lateral - Informações e Tramitações */}
        <div className="space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Informações Gerais</h3>
            
            <div>
              <p className="text-xs text-slate-400 font-medium">Interessado</p>
              <div className="flex items-center gap-2 mt-1">
                <User className="w-4 h-4 text-slate-400" />
                <p className="text-sm font-semibold text-slate-800">{interessadoNome}</p>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{interessadoDoc}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 font-medium">Setor Atual</p>
              <p className="text-sm font-semibold text-slate-800 mt-1">{processo.currentDepartment?.name || "Não atribuído"}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 font-medium">Data de Abertura</p>
              <p className="text-sm font-semibold text-slate-800 mt-1">{new Date(processo.createdAt).toLocaleDateString('pt-BR')} às {new Date(processo.createdAt).toLocaleTimeString('pt-BR')}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 font-medium">Prioridade</p>
              <div className="flex items-center gap-1.5 mt-1">
                {processo.priority === 'Urgente' ? <AlertCircle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                <p className="text-sm font-semibold text-slate-800">{processo.priority}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-800">Documentos</h3>
              <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">{processo.documents.length}</span>
            </div>
            <div className="divide-y divide-slate-100">
              {processo.documents.length === 0 ? (
                <div className="p-4 text-center text-slate-500 text-sm">Nenhum anexo.</div>
              ) : (
                processo.documents.map(doc => (
                  <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-indigo-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">{doc.title}</p>
                        <p className="text-xs text-slate-400">{new Date(doc.createdAt).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="text-sm font-semibold text-slate-800">Histórico de Tramitação</h3>
            </div>
            <div className="p-4 space-y-4">
              {processo.movements.length === 0 ? (
                <p className="text-sm text-slate-500 text-center">Processo ainda não foi tramitado.</p>
              ) : (
                <div className="relative border-l-2 border-slate-200 ml-3 space-y-6">
                  {processo.movements.map((mov, idx) => (
                    <div key={mov.id} className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-300"></div>
                      <p className="text-xs font-semibold text-slate-500">{new Date(mov.movedAt).toLocaleDateString('pt-BR')} {new Date(mov.movedAt).toLocaleTimeString('pt-BR')}</p>
                      <p className="text-sm font-bold text-slate-800 mt-1">
                        Encaminhado para {mov.toDepartment.name}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Por: {mov.employee?.name || "Sistema"}
                      </p>
                      {mov.reason && <p className="text-sm text-slate-500 mt-2 italic">"{mov.reason}"</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
