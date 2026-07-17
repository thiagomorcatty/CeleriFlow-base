import React from "react";
import { Search, Plus, Tractor, Users, Truck, Wrench, CheckCircle2, MapPin } from "lucide-react";

export default function MaquinasEquipesPage() {
  const frota = [
    { id: 1, type: "Máquina", title: "Retroescavadeira JCB 3CX", plate: "ABC-1234", status: "Em Operação", location: "Bairro Alvorada", maintenance: "Em dia" },
    { id: 2, type: "Veículo", title: "Caminhão Caçamba Ford Cargo", plate: "XYZ-9876", status: "Em Operação", location: "Av. Principal", maintenance: "Em dia" },
    { id: 3, type: "Máquina", title: "Rolo Compactador Dynapac", plate: "DEF-5678", status: "Manutenção", location: "Oficina Pátio", maintenance: "Corretiva" }
  ];

  const equipes = [
    { id: 1, name: "Equipe Alfa (Pavimentação)", members: 5, leader: "Carlos Silva", status: "Em Campo", location: "Av. Principal", vehicle: "Kombi GHI-3456" },
    { id: 2, name: "Equipe Beta (Iluminação)", members: 3, leader: "João Mendes", status: "Em Campo", location: "Bairro Novo", vehicle: "Caminhão Cesto LMN-1234" },
    { id: 3, name: "Equipe Gama (Drenagem)", members: 4, leader: "Roberto Alves", status: "Disponível", location: "Pátio Central", vehicle: "Caminhonete OPQ-9012" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Máquinas e Equipes</h1>
          <p className="text-slate-500 dark:text-slate-400">Gestão de frotas, equipamentos pesados e distribuição de equipes de campo.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Nova Equipe
          </button>
          <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Novo Veículo/Máquina
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Frota Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              <Tractor className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Frota e Máquinas</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {frota.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:border-orange-200 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${item.type === 'Máquina' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                      {item.type === 'Máquina' ? <Tractor className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-500">
                        <span>Placa/Ref: {item.plate}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
                      ${item.status === 'Em Operação' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}
                    `}>
                      {item.status === 'Em Operação' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Wrench className="w-3.5 h-3.5" />}
                      {item.status}
                    </span>
                    <span className="text-xs text-slate-500">Manutenção: {item.maintenance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Equipes Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Equipes de Campo</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {equipes.map((equipe) => (
                <div key={equipe.id} className="flex flex-col sm:flex-row justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:border-indigo-200 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{equipe.name}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-500">
                        <span>Líder: {equipe.leader}</span>
                        <span>Membros: {equipe.members}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                        <Truck className="w-3 h-3" /> Veículo: {equipe.vehicle}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
                      ${equipe.status === 'Em Campo' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}
                    `}>
                      <span className={`w-2 h-2 rounded-full ${equipe.status === 'Em Campo' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                      {equipe.status}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {equipe.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
