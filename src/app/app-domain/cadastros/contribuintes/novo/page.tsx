import { FileText, Save, ArrowLeft, User, Briefcase } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function NovoContribuintePage() {
  const persons = await prisma.person.findMany({
    select: { id: true, fullName: true, cpf: true }
  });
  
  const companies = await prisma.company.findMany({
    select: { id: true, corporateName: true, cnpj: true }
  });

  async function createTaxpayer(formData: FormData) {
    "use server";
    
    const taxpayerType = formData.get("taxpayerType") as string;
    const municipalInsc = formData.get("municipalInsc") as string;
    const economicActivities = formData.get("economicActivities") as string;
    const personId = formData.get("personId") as string;
    const companyId = formData.get("companyId") as string;

    const data: any = {
      taxpayerType,
      municipalInsc: municipalInsc || null,
      economicActivities,
      status: "Ativo"
    };

    if (taxpayerType === "PF" && personId) {
      data.personId = personId;
    } else if (taxpayerType === "PJ" && companyId) {
      data.companyId = companyId;
    }

    await prisma.taxpayer.create({
      data
    });

    redirect("/cadastros/contribuintes");
  }

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link href="/cadastros/contribuintes" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar para listagem
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <FileText className="w-6 h-6 text-amber-600" />
          Novo Contribuinte
        </h1>
        <p className="text-slate-500 mt-1">Vincule uma Pessoa Física ou Jurídica como Contribuinte.</p>
      </div>

      <form action={createTaxpayer} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-amber-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <User className="w-5 h-5" />
            Vínculo do Contribuinte
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="taxpayerType" className="block text-sm font-medium text-slate-700 mb-1">Tipo de Contribuinte *</label>
              <select id="taxpayerType" name="taxpayerType" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600">
                <option value="PF">Pessoa Física (PF)</option>
                <option value="PJ">Pessoa Jurídica (PJ)</option>
              </select>
            </div>
            
            <div className="col-span-1 md:col-span-2" id="pf-select-container">
              <label htmlFor="personId" className="block text-sm font-medium text-slate-700 mb-1">Pessoa Física (Selecione)</label>
              <select id="personId" name="personId" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600">
                <option value="">Selecione a Pessoa Física...</option>
                {persons.map(p => (
                  <option key={p.id} value={p.id}>{p.fullName} - CPF: {p.cpf}</option>
                ))}
              </select>
            </div>

            <div className="col-span-1 md:col-span-2" id="pj-select-container">
              <label htmlFor="companyId" className="block text-sm font-medium text-slate-700 mb-1">Pessoa Jurídica (Selecione)</label>
              <select id="companyId" name="companyId" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600">
                <option value="">Selecione a Empresa...</option>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.corporateName} - CNPJ: {c.cnpj}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-amber-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <Briefcase className="w-5 h-5" />
            Dados Fiscais
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="municipalInsc" className="block text-sm font-medium text-slate-700 mb-1">Inscrição Municipal</label>
              <input type="text" id="municipalInsc" name="municipalInsc" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600" />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="economicActivities" className="block text-sm font-medium text-slate-700 mb-1">Atividades Econômicas Principais</label>
              <textarea id="economicActivities" name="economicActivities" rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600"></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/cadastros/contribuintes" className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            Cancelar
          </Link>
          <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            Salvar Contribuinte
          </button>
        </div>
      </form>
    </div>
  );
}
