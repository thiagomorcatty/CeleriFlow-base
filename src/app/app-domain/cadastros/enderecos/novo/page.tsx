import { MapPin, Save, ArrowLeft, Building, User, Info } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MaskedInput } from "@/components/ui/MaskedInput";

export default async function NovoEnderecoPage() {
  const persons = await prisma.person.findMany({
    select: { id: true, fullName: true, cpf: true }
  });
  
  const companies = await prisma.company.findMany({
    select: { id: true, corporateName: true, cnpj: true }
  });

  const neighborhoods = await prisma.neighborhood.findMany({
    orderBy: { name: 'asc' }
  });

  async function createAddress(formData: FormData) {
    "use server";
    
    const zipCode = formData.get("zipCode") as string;
    const streetName = formData.get("streetName") as string;
    const number = formData.get("number") as string;
    const complement = formData.get("complement") as string;
    const addressType = formData.get("addressType") as string;
    const referencePoint = formData.get("referencePoint") as string;
    const neighborhoodId = formData.get("neighborhoodId") as string;
    
    const personId = formData.get("personId") as string;
    const companyId = formData.get("companyId") as string;

    const data: any = {
      zipCode: zipCode.replace(/\D/g, "") || null,
      streetName: streetName || null,
      number: number || null,
      complement: complement || null,
      addressType: addressType || null,
      referencePoint: referencePoint || null,
    };

    if (neighborhoodId) data.neighborhoodId = neighborhoodId;
    if (personId) data.personId = personId;
    else if (companyId) data.companyId = companyId;

    await prisma.address.create({
      data
    });

    redirect("/cadastros/enderecos");
  }

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link href="/cadastros/enderecos" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar para listagem
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <MapPin className="w-6 h-6 text-orange-600" />
          Novo Endereço
        </h1>
        <p className="text-slate-500 mt-1">Cadastre um novo endereço e vincule a uma Pessoa Física ou Empresa.</p>
      </div>

      <form action={createAddress} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-orange-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <User className="w-5 h-5" />
            Vínculo (Opcional)
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="personId" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><User className="w-4 h-4 text-slate-400" /> Pessoa Física</label>
              <select id="personId" name="personId" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600">
                <option value="">Selecione a Pessoa Física...</option>
                {persons.map(p => (
                  <option key={p.id} value={p.id}>{p.fullName} - CPF: {p.cpf}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="companyId" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><Building className="w-4 h-4 text-slate-400" /> Pessoa Jurídica</label>
              <select id="companyId" name="companyId" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600">
                <option value="">Selecione a Empresa...</option>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.corporateName} - CNPJ: {c.cnpj}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-orange-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <MapPin className="w-5 h-5" />
            Dados do Endereço
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label htmlFor="zipCode" className="block text-sm font-medium text-slate-700 mb-1">CEP *</label>
              <MaskedInput maskType="cep" type="text" id="zipCode" name="zipCode" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600" />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="streetName" className="block text-sm font-medium text-slate-700 mb-1">Logradouro *</label>
              <input type="text" id="streetName" name="streetName" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600" />
            </div>
            
            <div className="md:col-span-1">
              <label htmlFor="number" className="block text-sm font-medium text-slate-700 mb-1">Número</label>
              <input type="text" id="number" name="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600" />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="complement" className="block text-sm font-medium text-slate-700 mb-1">Complemento</label>
              <input type="text" id="complement" name="complement" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="neighborhoodId" className="block text-sm font-medium text-slate-700 mb-1">Bairro *</label>
              <select id="neighborhoodId" name="neighborhoodId" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600">
                <option value="">Selecione o Bairro...</option>
                {neighborhoods.map(n => (
                  <option key={n.id} value={n.id}>{n.name}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="addressType" className="block text-sm font-medium text-slate-700 mb-1">Tipo de Endereço</label>
              <select id="addressType" name="addressType" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600">
                <option value="">Selecione...</option>
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
                <option value="Correspondência">Correspondência</option>
                <option value="Fiscal">Fiscal</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="referencePoint" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><Info className="w-4 h-4 text-slate-400" /> Ponto de Referência</label>
              <input type="text" id="referencePoint" name="referencePoint" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/cadastros/enderecos" className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            Cancelar
          </Link>
          <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            Salvar Endereço
          </button>
        </div>
      </form>
    </div>
  );
}
