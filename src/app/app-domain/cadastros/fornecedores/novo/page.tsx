import { Truck, Save, ArrowLeft, User, List, Building } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function NovoFornecedorPage() {
  const persons = await prisma.person.findMany({
    select: { id: true, fullName: true, cpf: true }
  });
  
  const companies = await prisma.company.findMany({
    select: { id: true, corporateName: true, cnpj: true }
  });

  async function createSupplier(formData: FormData) {
    "use server";
    
    const supplierType = formData.get("supplierType") as string;
    const personId = formData.get("personId") as string;
    const companyId = formData.get("companyId") as string;
    const category = formData.get("category") as string;
    const businessBranch = formData.get("businessBranch") as string;
    const certificationsValidUntil = formData.get("certificationsValidUntil") as string;
    const bankData = formData.get("bankData") as string;
    const notes = formData.get("notes") as string;

    const data: any = {
      category: category || null,
      businessBranch: businessBranch || null,
      certificationsValidUntil: certificationsValidUntil ? new Date(certificationsValidUntil) : null,
      bankData: bankData || null,
      notes: notes || null,
      status: "Ativo"
    };

    if (supplierType === "PF" && personId) {
      data.personId = personId;
    } else if (supplierType === "PJ" && companyId) {
      data.companyId = companyId;
    }

    await prisma.supplier.create({
      data
    });

    redirect("/cadastros/fornecedores");
  }

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link href="/app-domain/cadastros/fornecedores" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar para listagem
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Truck className="w-6 h-6 text-fuchsia-600" />
          Novo Fornecedor
        </h1>
        <p className="text-slate-500 mt-1">Vincule uma Pessoa Física ou Jurídica como Fornecedor.</p>
      </div>

      <form action={createSupplier} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-fuchsia-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <User className="w-5 h-5" />
            Vínculo do Fornecedor
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="supplierType" className="block text-sm font-medium text-slate-700 mb-1">Tipo de Fornecedor *</label>
              <select id="supplierType" name="supplierType" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600/20 focus:border-fuchsia-600">
                <option value="PJ">Pessoa Jurídica (PJ)</option>
                <option value="PF">Pessoa Física (PF) - Autônomo</option>
              </select>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="companyId" className="block text-sm font-medium text-slate-700 mb-1">Pessoa Jurídica (Selecione se for PJ)</label>
              <select id="companyId" name="companyId" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600/20 focus:border-fuchsia-600">
                <option value="">Selecione a Empresa...</option>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.corporateName} - CNPJ: {c.cnpj}</option>
                ))}
              </select>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label htmlFor="personId" className="block text-sm font-medium text-slate-700 mb-1">Pessoa Física (Selecione se for PF)</label>
              <select id="personId" name="personId" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600/20 focus:border-fuchsia-600">
                <option value="">Selecione a Pessoa Física...</option>
                {persons.map(p => (
                  <option key={p.id} value={p.id}>{p.fullName} - CPF: {p.cpf}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-fuchsia-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <List className="w-5 h-5" />
            Dados do Fornecedor
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Categoria de Fornecimento</label>
              <select id="category" name="category" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600/20 focus:border-fuchsia-600">
                <option value="">Selecione...</option>
                <option value="Materiais">Materiais Diversos</option>
                <option value="Serviços">Prestação de Serviços</option>
                <option value="Obras">Obras e Engenharia</option>
                <option value="Equipamentos">Equipamentos</option>
                <option value="Tecnologia">Tecnologia da Informação</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="businessBranch" className="block text-sm font-medium text-slate-700 mb-1">Ramo de Atividade</label>
              <input type="text" id="businessBranch" name="businessBranch" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600/20 focus:border-fuchsia-600" />
            </div>

            <div>
              <label htmlFor="certificationsValidUntil" className="block text-sm font-medium text-slate-700 mb-1">Validade das Certidões (Habilitação)</label>
              <input type="date" id="certificationsValidUntil" name="certificationsValidUntil" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600/20 focus:border-fuchsia-600" />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label htmlFor="bankData" className="block text-sm font-medium text-slate-700 mb-1">Dados Bancários</label>
              <input type="text" id="bankData" name="bankData" placeholder="Banco, Agência, Conta..." className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600/20 focus:border-fuchsia-600" />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">Observações</label>
              <textarea id="notes" name="notes" rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600/20 focus:border-fuchsia-600"></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/app-domain/cadastros/fornecedores" className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            Cancelar
          </Link>
          <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-fuchsia-600 hover:bg-fuchsia-700 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            Salvar Fornecedor
          </button>
        </div>
      </form>
    </div>
  );
}
