import { Home, Save, ArrowLeft, MapPin, Maximize, Building } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function NovoImovelPage() {
  const taxpayers = await prisma.taxpayer.findMany({
    include: {
      person: true,
      company: true,
    }
  });

  const neighborhoods = await prisma.neighborhood.findMany({
    orderBy: { name: 'asc' }
  });

  async function createRealEstate(formData: FormData) {
    "use server";
    
    const municipalInsc = formData.get("municipalInsc") as string;
    const propertyType = formData.get("propertyType") as string;
    const propertyUse = formData.get("propertyUse") as string;
    const streetName = formData.get("streetName") as string;
    const number = formData.get("number") as string;
    const complement = formData.get("complement") as string;
    const neighborhoodId = formData.get("neighborhoodId") as string;
    const taxpayerId = formData.get("taxpayerId") as string;
    const landArea = parseFloat(formData.get("landArea") as string) || null;
    const builtArea = parseFloat(formData.get("builtArea") as string) || null;

    const data: any = {
      municipalInsc: municipalInsc || null,
      propertyType: propertyType || null,
      propertyUse: propertyUse || null,
      streetName: streetName || null,
      number: number || null,
      complement: complement || null,
      landArea,
      builtArea,
      status: "Regular"
    };

    if (neighborhoodId) data.neighborhoodId = neighborhoodId;
    if (taxpayerId) data.taxpayerId = taxpayerId;

    await prisma.realEstate.create({
      data
    });

    redirect("/cadastros/imoveis");
  }

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link href="/cadastros/imoveis" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar para listagem
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Home className="w-6 h-6 text-sky-600" />
          Novo Imóvel
        </h1>
        <p className="text-slate-500 mt-1">Cadastre as informações do imóvel e seu proprietário.</p>
      </div>

      <form action={createRealEstate} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-sky-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <Building className="w-5 h-5" />
            Dados Principais
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="municipalInsc" className="block text-sm font-medium text-slate-700 mb-1">Inscrição Imobiliária *</label>
              <input type="text" id="municipalInsc" name="municipalInsc" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600" />
            </div>

            <div>
              <label htmlFor="taxpayerId" className="block text-sm font-medium text-slate-700 mb-1">Contribuinte / Proprietário</label>
              <select id="taxpayerId" name="taxpayerId" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600">
                <option value="">Selecione o Contribuinte...</option>
                {taxpayers.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.person ? t.person.fullName : t.company?.corporateName} ({t.municipalInsc || 'Sem Inscrição'})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-slate-700 mb-1">Tipo do Imóvel</label>
              <select id="propertyType" name="propertyType" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600">
                <option value="">Selecione...</option>
                <option value="Casa">Casa</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Terreno">Terreno</option>
                <option value="Galpão">Galpão / Barracão</option>
                <option value="Sala Comercial">Sala Comercial</option>
                <option value="Gleba Rural">Gleba Rural</option>
              </select>
            </div>

            <div>
              <label htmlFor="propertyUse" className="block text-sm font-medium text-slate-700 mb-1">Uso do Imóvel</label>
              <select id="propertyUse" name="propertyUse" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600">
                <option value="">Selecione...</option>
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Misto">Misto</option>
                <option value="Público">Público</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-sky-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <MapPin className="w-5 h-5" />
            Endereço do Imóvel
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label htmlFor="streetName" className="block text-sm font-medium text-slate-700 mb-1">Logradouro</label>
              <input type="text" id="streetName" name="streetName" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600" />
            </div>
            
            <div className="md:col-span-1">
              <label htmlFor="number" className="block text-sm font-medium text-slate-700 mb-1">Número</label>
              <input type="text" id="number" name="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="complement" className="block text-sm font-medium text-slate-700 mb-1">Complemento</label>
              <input type="text" id="complement" name="complement" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="neighborhoodId" className="block text-sm font-medium text-slate-700 mb-1">Bairro</label>
              <select id="neighborhoodId" name="neighborhoodId" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600">
                <option value="">Selecione o Bairro...</option>
                {neighborhoods.map(n => (
                  <option key={n.id} value={n.id}>{n.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-sky-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <Maximize className="w-5 h-5" />
            Características Físicas
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="landArea" className="block text-sm font-medium text-slate-700 mb-1">Área do Terreno (m²)</label>
              <input type="number" step="0.01" id="landArea" name="landArea" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600" />
            </div>
            
            <div>
              <label htmlFor="builtArea" className="block text-sm font-medium text-slate-700 mb-1">Área Construída (m²)</label>
              <input type="number" step="0.01" id="builtArea" name="builtArea" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/cadastros/imoveis" className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            Cancelar
          </Link>
          <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            Salvar Imóvel
          </button>
        </div>
      </form>
    </div>
  );
}
