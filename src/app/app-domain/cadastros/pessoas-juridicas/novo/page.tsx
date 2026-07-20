import { Building2, Save, ArrowLeft, Building, Briefcase, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { MaskedInput } from "@/components/ui/MaskedInput";

export default function NovaPessoaJuridicaPage() {
  async function createCompany(formData: FormData) {
    "use server";
    const { prisma } = await getTenantContextForModule("CADASTROS");
    
    const corporateName = formData.get("corporateName") as string;
    const tradeName = formData.get("tradeName") as string;
    const cnpj = formData.get("cnpj") as string;
    const emailPrimary = formData.get("emailPrimary") as string;
    const phone = formData.get("phone") as string;
    const municipalInsc = formData.get("municipalInsc") as string;
    const companyType = formData.get("companyType") as string;

    await prisma.company.create({
      data: {
        corporateName,
        tradeName,
        cnpj: cnpj.replace(/[^a-zA-Z0-9]/g, ""), // clean before save
        emailPrimary,
        phone,
        municipalInsc,
        companyType,
        status: "Ativo"
      }
    });

    redirect("/cadastros/pessoas-juridicas");
  }

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link href="/cadastros/pessoas-juridicas" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar para listagem
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Building2 className="w-6 h-6 text-emerald-600" />
          Nova Pessoa Jurídica
        </h1>
        <p className="text-slate-500 mt-1">Cadastre uma nova empresa, entidade ou instituição.</p>
      </div>

      <form action={createCompany} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <Building className="w-5 h-5" />
            Dados Básicos
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="corporateName" className="block text-sm font-medium text-slate-700 mb-1">Razão Social *</label>
              <input type="text" id="corporateName" name="corporateName" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600" />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="tradeName" className="block text-sm font-medium text-slate-700 mb-1">Nome Fantasia</label>
              <input type="text" id="tradeName" name="tradeName" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600" />
            </div>

            <div>
              <label htmlFor="cnpj" className="block text-sm font-medium text-slate-700 mb-1">CNPJ *</label>
              <MaskedInput maskType="cnpj" type="text" id="cnpj" name="cnpj" required placeholder="00.000.000/0000-00" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600" />
            </div>

            <div>
              <label htmlFor="municipalInsc" className="block text-sm font-medium text-slate-700 mb-1">Inscrição Municipal</label>
              <input type="text" id="municipalInsc" name="municipalInsc" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600" />
            </div>
            
            <div>
              <label htmlFor="companyType" className="block text-sm font-medium text-slate-700 mb-1">Tipo de Empresa</label>
              <select id="companyType" name="companyType" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600">
                <option value="">Selecione...</option>
                <option value="MEI">MEI (Microempreendedor Individual)</option>
                <option value="ME">ME (Microempresa)</option>
                <option value="EPP">EPP (Empresa de Pequeno Porte)</option>
                <option value="LTDA">LTDA (Sociedade Limitada)</option>
                <option value="SA">SA (Sociedade Anônima)</option>
                <option value="ASSOCIACAO">Associação / ONG</option>
                <option value="OUTROS">Outros</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <Briefcase className="w-5 h-5" />
            Contatos
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="emailPrimary" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /> E-mail Principal</label>
              <input type="email" id="emailPrimary" name="emailPrimary" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600" />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /> Telefone / WhatsApp</label>
              <MaskedInput maskType="phone" type="text" id="phone" name="phone" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/cadastros/pessoas-juridicas" className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            Cancelar
          </Link>
          <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            Salvar Empresa
          </button>
        </div>
      </form>
    </div>
  );
}
