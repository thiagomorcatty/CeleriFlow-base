import { ArrowLeft, Headphones } from "lucide-react";
import Link from "next/link";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { redirect } from "next/navigation";
import NovoChamadoForm from "./NovoChamadoForm";

export const dynamic = "force-dynamic";

export default async function NovoChamadoPage() {
  const { prisma } = await getTenantContextForModule("ATENDIMENTO");
  const channels = await prisma.supportChannel.findMany({ where: { isActive: true } });
  
  if (channels.length === 0) {
    await prisma.supportChannel.create({
      data: { name: "Balcão Presencial", description: "Atendimento direto na prefeitura" }
    });
    return redirect("/atendimento/novo");
  }

  async function createTicket(formData: FormData) {
    "use server";
    
    const isAnonymous = formData.get("isAnonymousType") === "true";
    let personId: string | null = null;

    if (!isAnonymous) {
      const cpf = formData.get("cpf") as string;
      const fullName = formData.get("fullName") as string;
      const phone = formData.get("phone") as string;

      if (cpf && fullName) {
        let person = await prisma.person.findUnique({ where: { cpf } });
        if (!person) {
          person = await prisma.person.create({
            data: {
              cpf,
              fullName,
              phonePrimary: phone,
              status: "Ativo",
            }
          });
        }
        personId = person.id;
      }
    }

    const channelId = formData.get("channelId") as string;
    const subject = formData.get("subject") as string;
    const priority = formData.get("priority") as string;
    const description = formData.get("description") as string;
    
    const ticketNumber = `TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    await prisma.ticket.create({
      data: {
        ticketNumber,
        personId,
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

      <NovoChamadoForm channels={channels} createTicketAction={createTicket} />
    </div>
  );
}
