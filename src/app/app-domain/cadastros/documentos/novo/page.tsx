import { File, Save, ArrowLeft, Building, User, Info, Upload } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function NovoDocumentoPage() {
  const persons = await prisma.person.findMany({
    select: { id: true, fullName: true, cpf: true }
  });
  
  const companies = await prisma.company.findMany({
    select: { id: true, corporateName: true, cnpj: true }
  });

  async function createDocument(formData: FormData) {
    "use server";
    
    const title = formData.get("title") as string;
    const documentType = formData.get("documentType") as string;
    const validUntilStr = formData.get("validUntil") as string;
    const notes = formData.get("notes") as string;
    
    const personId = formData.get("personId") as string;
    const companyId = formData.get("companyId") as string;

    // Simulate file upload URL if a file was provided (normally would upload to S3/Blob)
    const file = formData.get("file") as File;
    let fileUrl = "/uploads/simulated-document.pdf";
    if (file && file.size > 0) {
      fileUrl = "/uploads/simulated-" + file.name;
    }

    const data: any = {
      title,
      documentType,
      notes: notes || null,
      fileUrl,
    };

    if (validUntilStr) data.validUntil = new Date(validUntilStr);

    if (personId) data.personId = personId;
    else if (companyId) data.companyId = companyId;

    await prisma.document.create({
      data
    });

    redirect("/cadastros/documentos");
  }

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link href="/app-domain/cadastros/documentos" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar para listagem
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <File className="w-6 h-6 text-rose-600" />
          Novo Documento / Anexo
        </h1>
        <p className="text-slate-500 mt-1">Registre um documento e faça o upload do anexo.</p>
      </div>

      <form action={createDocument} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-rose-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <User className="w-5 h-5" />
            Vínculo (Obrigatório escolher um)
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="personId" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><User className="w-4 h-4 text-slate-400" /> Pessoa Física</label>
              <select id="personId" name="personId" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600">
                <option value="">Selecione a Pessoa Física...</option>
                {persons.map(p => (
                  <option key={p.id} value={p.id}>{p.fullName} - CPF: {p.cpf}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="companyId" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><Building className="w-4 h-4 text-slate-400" /> Pessoa Jurídica</label>
              <select id="companyId" name="companyId" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600">
                <option value="">Selecione a Empresa...</option>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.corporateName} - CNPJ: {c.cnpj}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-rose-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <File className="w-5 h-5" />
            Dados do Documento
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Título / Identificação *</label>
              <input type="text" id="title" name="title" required placeholder="Ex: CNH do Representante" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600" />
            </div>

            <div>
              <label htmlFor="documentType" className="block text-sm font-medium text-slate-700 mb-1">Tipo de Documento *</label>
              <select id="documentType" name="documentType" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600">
                <option value="">Selecione...</option>
                <option value="RG">RG</option>
                <option value="CNH">CNH</option>
                <option value="Comprovante de Residência">Comprovante de Residência</option>
                <option value="Contrato Social">Contrato Social</option>
                <option value="Alvará">Alvará</option>
                <option value="Certidão Negativa">Certidão Negativa</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div>
              <label htmlFor="validUntil" className="block text-sm font-medium text-slate-700 mb-1">Data de Validade</label>
              <input type="date" id="validUntil" name="validUntil" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600" />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><Info className="w-4 h-4 text-slate-400" /> Observações (Notes)</label>
              <textarea id="notes" name="notes" rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600"></textarea>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 text-rose-700 font-semibold mb-4 border-b border-slate-100 pb-2">
            <Upload className="w-5 h-5" />
            Upload de Arquivo
          </div>
          
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
            <input type="file" id="file" name="file" className="hidden" />
            <label htmlFor="file" className="cursor-pointer flex flex-col items-center">
              <Upload className="w-10 h-10 text-slate-400 mb-3" />
              <span className="text-sm font-medium text-slate-700">Clique para selecionar ou arraste o arquivo aqui</span>
              <span className="text-xs text-slate-500 mt-1">PDF, JPG, PNG (Max 5MB)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/app-domain/cadastros/documentos" className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            Cancelar
          </Link>
          <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            Salvar Documento
          </button>
        </div>
      </form>
    </div>
  );
}
