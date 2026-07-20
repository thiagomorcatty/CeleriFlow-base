import React from "react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { Building2, Save } from "lucide-react";

export default async function InstanciaPage() {
  const { prisma } = await getTenantContextForModule("CONFIGURACOES");
  const instancia = await prisma.configuracaoInstancia.findFirst();

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Instância da Prefeitura</h1>
            <p className="text-gray-500 dark:text-gray-400">Dados oficiais e configuração principal do sistema</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
          <Save className="h-4 w-4" />
          Salvar Alterações
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
          Informações Gerais
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome da Prefeitura</label>
            <input 
              type="text" 
              defaultValue={instancia?.nomePrefeitura || "Prefeitura Municipal"}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CNPJ</label>
            <input 
              type="text" 
              defaultValue={instancia?.cnpj || ""}
              placeholder="00.000.000/0001-00"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Município</label>
            <input 
              type="text" 
              defaultValue={instancia?.municipio || ""}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Estado (UF)</label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/20">
              <option value="">Selecione...</option>
              <option value="SP" selected={instancia?.uf === "SP"}>São Paulo (SP)</option>
              <option value="RJ" selected={instancia?.uf === "RJ"}>Rio de Janeiro (RJ)</option>
              <option value="MG" selected={instancia?.uf === "MG"}>Minas Gerais (MG)</option>
              {/* more options... */}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Domínio/URL</label>
            <input 
              type="text" 
              defaultValue={instancia?.dominio || ""}
              placeholder="ex: cidade.sp.gov.br"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status da Instância</label>
            <input 
              type="text" 
              defaultValue={instancia?.status || "Ativa"}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
