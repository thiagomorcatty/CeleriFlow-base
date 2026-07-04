"use client";

import { useState } from "react";
import { saveInstitution } from "./actions";
import { Save, Building2 } from "lucide-react";

const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", 
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export function InstitutionForm({ institution }: { institution: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const [cnpj, setCnpj] = useState(institution?.cnpj || "");
  const [phone, setPhone] = useState(institution?.phone || "");

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (v.length > 14) v = v.substring(0, 14);
    
    let formatted = v;
    if (v.length > 12) {
      formatted = `${v.substring(0, 2)}.${v.substring(2, 5)}.${v.substring(5, 8)}/${v.substring(8, 12)}-${v.substring(12, 14)}`;
    } else if (v.length > 8) {
      formatted = `${v.substring(0, 2)}.${v.substring(2, 5)}.${v.substring(5, 8)}/${v.substring(8, 12)}`;
    } else if (v.length > 5) {
      formatted = `${v.substring(0, 2)}.${v.substring(2, 5)}.${v.substring(5, 8)}`;
    } else if (v.length > 2) {
      formatted = `${v.substring(0, 2)}.${v.substring(2, 5)}`;
    }
    setCnpj(formatted);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.substring(0, 11);
    
    let formatted = v;
    if (v.length > 10) {
      formatted = `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7, 11)}`;
    } else if (v.length > 6) {
      formatted = `(${v.substring(0, 2)}) ${v.substring(2, 6)}-${v.substring(6, 10)}`;
    } else if (v.length > 2) {
      formatted = `(${v.substring(0, 2)}) ${v.substring(2, 7)}`;
    } else if (v.length > 0) {
      formatted = `(${v.substring(0, 2)}`;
    }
    setPhone(formatted);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(e.currentTarget);
    const result = await saveInstitution(formData);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Dados salvos com sucesso!" });
      // Reload page to update global header layout if needed
      window.location.reload();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Dados da Instituição</h3>
            <p className="text-sm text-slate-500">Informações principais da prefeitura ou órgão</p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {message.text && (
          <div className={`col-span-full p-4 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
            {message.text}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Nome Oficial / Nome Fantasia *</label>
          <input 
            type="text" 
            name="name" 
            required
            defaultValue={institution?.name || ""}
            placeholder="Ex: Prefeitura Municipal de Tangará"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Razão Social</label>
          <input 
            type="text" 
            name="legalName" 
            defaultValue={institution?.legalName || ""}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">CNPJ</label>
          <input 
            type="text" 
            name="cnpj" 
            value={cnpj}
            onChange={handleCnpjChange}
            placeholder="00.000.000/0001-00 (Aceita Alfanumérico)"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Prefeito(a) Atual</label>
          <input 
            type="text" 
            name="mayorName" 
            defaultValue={institution?.mayorName || ""}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Responsável Administrativo</label>
          <input 
            type="text" 
            name="managerName" 
            defaultValue={institution?.managerName || ""}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 text-sm"
          />
        </div>

        <div className="space-y-4 col-span-full bg-slate-50 p-4 rounded-xl border border-slate-200">
          <label className="text-sm font-bold text-slate-700 block">Brasão / Logo da Prefeitura</label>
          
          {institution?.logoUrl && (
            <div className="mb-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg border border-slate-200 bg-white overflow-hidden flex items-center justify-center shadow-sm">
                <img src={institution.logoUrl} alt="Logo Atual" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-slate-500 font-medium">Logo atual em uso</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 block">Selecione o arquivo no seu computador</label>
            <input 
              type="file" 
              name="logoFile" 
              accept="image/*"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all text-slate-700 text-sm cursor-pointer"
            />
            <p className="text-xs text-slate-500 mt-1">Formatos aceitos: PNG, JPG, JPEG.</p>
          </div>
        </div>

        <div className="col-span-full h-px bg-slate-200 my-2" />

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Telefone</label>
          <input 
            type="text" 
            name="phone" 
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(00) 00000-0000"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">E-mail Institucional</label>
          <input 
            type="email" 
            name="email" 
            defaultValue={institution?.email || ""}
            placeholder="contato@prefeitura.gov.br"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 text-sm"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-slate-700">Endereço Completo</label>
          <input 
            type="text" 
            name="address" 
            defaultValue={institution?.address || ""}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Cidade</label>
          <input 
            type="text" 
            name="city" 
            defaultValue={institution?.city || ""}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Estado (UF)</label>
          <select 
            name="state" 
            defaultValue={institution?.state || ""}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 text-sm bg-white"
          >
            <option value="">Selecione...</option>
            {UFS.map(uf => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
        <button 
          type="submit" 
          disabled={loading}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
}
