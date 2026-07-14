import React from "react";
import Link from "next/link";
import { ArrowLeft, Save, Building, MapPin, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { createSchool } from "../actions";

export const dynamic = "force-dynamic";

export default async function NovaEscolaPage() {
  const [employees, realEstates] = await Promise.all([
    prisma.employee.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    }),
    prisma.realEstate.findMany({
      orderBy: { streetName: "asc" },
    }),
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-6">
          <Link href="/educacao/escolas" className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-2 w-fit mb-4">
            <ArrowLeft className="w-4 h-4" /> Voltar para Escolas
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building className="h-6 w-6 text-indigo-600" />
            Nova Escola
          </h1>
        </div>

        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-lg flex gap-3 text-amber-800 dark:text-amber-400">
          <Building className="h-5 w-5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold mb-1">Aviso de Integração</p>
            <p>
              Recomendamos que você já tenha cadastrado o <strong>Imóvel</strong> da escola (no módulo de Patrimônio) e o <strong>Servidor Diretor</strong> (no módulo de RH) para vinculá-los aqui. Caso não os tenha, é possível criar a escola agora e realizar a vinculação posteriormente.
            </p>
          </div>
        </div>

        <form action={createSchool} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 border-b pb-2">Informações Básicas</h2>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nome da Escola *</label>
                <input type="text" name="name" required placeholder="Ex: E.M. Machado de Assis" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Código INEP</label>
                  <input type="text" name="inepCode" placeholder="Ex: 33001234" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">CNPJ (se houver)</label>
                  <input type="text" name="cnpj" placeholder="00.000.000/0000-00" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-slate-500" /> Gestão e Capacidade
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Diretor(a) / Gestor(a)</label>
                  <select name="directorId" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white">
                    <option value="">Selecione o servidor...</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Capacidade Total de Alunos</label>
                  <input type="number" name="capacity" defaultValue={0} min={0} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-slate-500" /> Vínculo com Patrimônio
              </h2>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Imóvel da Escola</label>
                <select name="realEstateId" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white">
                  <option value="">Selecione o imóvel correspondente...</option>
                  {realEstates.map(re => (
                    <option key={re.id} value={re.id}>
                      {re.registration ? `Matrícula: ${re.registration} - ` : ""}
                      {re.streetName ? `${re.streetName}, ${re.number || 'S/N'}` : `Imóvel ID: ${re.id}`}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">Isso conectará a escola aos registros de patrimônio e manutenção.</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
            <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
              <Save className="w-4 h-4" /> Salvar Escola
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
