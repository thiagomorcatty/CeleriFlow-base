import { Receipt, Search, Plus, DollarSign, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function GuiasPage() {
  const guias = await prisma.taxGuide.findMany({
    include: {
      assessment: {
        include: {
          taxpayer: { include: { person: true, company: true } },
          tax: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 30
  });

  // Server Action to simulate manual payment
  async function payGuide(formData: FormData) {
    "use server";
    const guideId = formData.get("guideId") as string;
    const amount = parseFloat(formData.get("amount") as string);
    
    // Atualiza o status da guia e lança o pagamento
    await prisma.taxGuide.update({
      where: { id: guideId },
      data: { status: "Paga" }
    });

    await prisma.taxPayment.create({
      data: {
        guideId,
        amountPaid: amount,
        paymentDate: new Date(),
        paymentMethod: "Manual"
      }
    });

    revalidatePath("/tributacao/guias");
  }

  // Server Action to generate a mock guide for demonstration purposes
  async function createMockGuide() {
    "use server";
    
    // Ensure we have a Tax
    let tax = await prisma.tax.findFirst({ where: { name: "IPTU" } });
    if (!tax) {
      tax = await prisma.tax.create({
        data: { name: "IPTU", taxType: "Imposto" }
      });
    }

    // Ensure we have a Taxpayer
    let taxpayer = await prisma.taxpayer.findFirst();
    if (!taxpayer) {
      // Create a dummy person and taxpayer if none exists
      const person = await prisma.person.create({
        data: { fullName: "Contribuinte Teste", cpf: "000.000.000-00", status: "Ativo" }
      });
      taxpayer = await prisma.taxpayer.create({
        data: { taxpayerType: "PF", personId: person.id }
      });
    }

    const assessment = await prisma.taxAssessment.create({
      data: {
        year: 2026,
        originalValue: 1500.50,
        taxId: tax.id,
        taxpayerId: taxpayer.id,
      }
    });

    await prisma.taxGuide.create({
      data: {
        assessmentId: assessment.id,
        totalValue: 1500.50,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        barcode: `81600000015-${Math.floor(1000 + Math.random() * 9000)}`,
        status: "Emitida"
      }
    });

    revalidatePath("/tributacao/guias");
  }

  return (
    <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Receipt className="w-6 h-6 text-emerald-600" />
            Guias de Arrecadação (DAM)
          </h1>
          <p className="text-slate-500 mt-1">Emissão e controle de pagamentos de tributos municipais.</p>
        </div>
        <form action={createMockGuide}>
          <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Gerar Guia Fictícia
          </button>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por código de barras ou contribuinte..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            />
          </div>
        </div>

        {guias.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Receipt className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhuma guia emitida</h3>
            <p className="text-slate-500 mt-1">As guias (DAM) geradas pelo sistema aparecerão aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Código de Barras</th>
                  <th className="px-6 py-3">Tributo</th>
                  <th className="px-6 py-3">Contribuinte</th>
                  <th className="px-6 py-3">Vencimento</th>
                  <th className="px-6 py-3">Valor (R$)</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {guias.map((guia) => (
                  <tr key={guia.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-slate-600 text-xs">
                      {guia.barcode || "-"}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {guia.assessment.tax.name} ({guia.assessment.year})
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {guia.assessment.taxpayer.company?.corporateName || guia.assessment.taxpayer.person?.fullName || "Não Identificado"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(guia.dueDate).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(guia.totalValue)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        guia.status === 'Paga' ? 'bg-emerald-100 text-emerald-700' : 
                        guia.status === 'Vencida' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {guia.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {guia.status === 'Emitida' ? (
                        <form action={payGuide}>
                          <input type="hidden" name="guideId" value={guia.id} />
                          <input type="hidden" name="amount" value={guia.totalValue} />
                          <button type="submit" className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg flex items-center gap-1 transition-colors ml-auto">
                            <DollarSign className="w-4 h-4" />
                            Baixa Manual
                          </button>
                        </form>
                      ) : (
                        <span className="text-emerald-600 font-semibold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Quitado
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
