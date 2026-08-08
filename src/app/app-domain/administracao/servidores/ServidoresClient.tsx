"use client";

import { useState, useMemo } from "react";
import { Users, Pencil, Trash2, RefreshCw } from "lucide-react";
import { updateEmployee, deactivateEmployee, activateEmployee } from "../actions";

type Employee = {
  id: string;
  name: string;
  cpf: string | null;
  email: string | null;
  isActive: boolean;
  role: { name: string } | null;
  secretariat: { name: string, acronym: string | null } | null;
  department: { name: string } | null;
};

type Role = { id: string, name: string };
type Secretariat = { id: string, name: string };
type Department = { id: string, name: string, secretariatId: string | null };

export default function ServidoresClient({ 
  employees,
  roles,
  secretariats,
  departments
}: { 
  employees: Employee[],
  roles: Role[],
  secretariats: Secretariat[],
  departments: Department[]
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ 
    name: "", 
    email: "", 
    cpf: "",
    roleId: "",
    secretariatId: "",
    departmentId: ""
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (emp.cpf && emp.cpf.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (emp.email && emp.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const availableDepartments = useMemo(() => {
    if (!editForm.secretariatId) return departments;
    return departments.filter(d => d.secretariatId === editForm.secretariatId);
  }, [editForm.secretariatId, departments]);

  const handleEditClick = (emp: Employee) => {
    setEditingId(emp.id);
    
    // Find IDs by matching the names from the current relation
    const currentRoleId = roles.find(r => r.name === emp.role?.name)?.id || "";
    const currentSecId = secretariats.find(s => s.name === emp.secretariat?.name)?.id || "";
    const currentDepId = departments.find(d => d.name === emp.department?.name)?.id || "";

    setEditForm({ 
      name: emp.name, 
      email: emp.email || "", 
      cpf: emp.cpf || "",
      roleId: currentRoleId,
      secretariatId: currentSecId,
      departmentId: currentDepId
    });
  };

  const handleSave = async (id: string) => {
    if (window.confirm("Tem certeza que deseja salvar estas alterações?")) {
      await updateEmployee(id, {
        name: editForm.name,
        email: editForm.email,
        cpf: editForm.cpf,
        roleId: editForm.roleId || null,
        secretariatId: editForm.secretariatId || null,
        departmentId: editForm.departmentId || null
      });
      setEditingId(null);
    }
  };

  const handleDeactivate = async (id: string) => {
    if (window.confirm("Tem certeza que deseja INATIVAR este servidor? Ele não será excluído do sistema, apenas desativado.")) {
      await deactivateEmployee(id);
    }
  };

  const handleActivate = async (id: string) => {
    if (window.confirm("Deseja REATIVAR este servidor?")) {
      await activateEmployee(id);
    }
  };

  if (employees.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Users className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
        <p className="text-slate-500 mt-1">Comece adicionando o primeiro servidor.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <input 
          type="text" 
          placeholder="Buscar servidor por nome, cpf ou e-mail..." 
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm w-full md:w-96 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
          <tr>
            <th className="px-6 py-4">Nome / CPF / Email</th>
            <th className="px-6 py-4">Cargo</th>
            <th className="px-6 py-4">Alocação</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filteredEmployees.map(emp => (
            <tr key={emp.id} className="hover:bg-slate-50">
              <td className="px-6 py-4">
                <div className="font-medium text-slate-800">
                  {editingId === emp.id ? (
                    <input className="border rounded px-2 py-1 w-full" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                  ) : emp.name}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {editingId === emp.id ? (
                    <input className="border rounded px-2 py-1 w-full" placeholder="CPF" value={editForm.cpf} onChange={e => setEditForm({...editForm, cpf: e.target.value})} />
                  ) : (emp.cpf || "Sem CPF")}
                </div>
              </td>
              <td className="px-6 py-4 text-slate-600">
                {editingId === emp.id ? (
                  <select 
                    className="border rounded px-2 py-1 w-full" 
                    value={editForm.roleId} 
                    onChange={e => setEditForm({...editForm, roleId: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                ) : (emp.role?.name || "-")}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {editingId === emp.id ? (
                  <div className="flex flex-col gap-2">
                    <select 
                      className="border rounded px-2 py-1 w-full" 
                      value={editForm.secretariatId} 
                      onChange={e => setEditForm({...editForm, secretariatId: e.target.value, departmentId: ""})}
                    >
                      <option value="">Selecione...</option>
                      {secretariats.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    <select 
                      className="border rounded px-2 py-1 w-full" 
                      value={editForm.departmentId} 
                      onChange={e => setEditForm({...editForm, departmentId: e.target.value})}
                    >
                      <option value="">Departamento (Opcional)</option>
                      {availableDepartments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </div>
                ) : (
                  <>
                    <div className="font-medium text-slate-800">{emp.secretariat?.name || "Sem Secretaria"}</div>
                    <div className="text-xs text-slate-500">{emp.department?.name || ""}</div>
                  </>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {emp.isActive ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">Ativo</span>
                ) : (
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium">Inativo</span>
                )}
              </td>
              <td className="px-6 py-4 text-right flex justify-end gap-2 items-center h-full pt-6">
                {editingId === emp.id ? (
                  <>
                    <button onClick={() => handleSave(emp.id)} className="text-emerald-600 hover:text-emerald-700 font-medium text-xs bg-emerald-50 px-2 py-1 rounded">Salvar</button>
                    <button onClick={() => setEditingId(null)} className="text-slate-500 hover:text-slate-700 font-medium text-xs bg-slate-100 px-2 py-1 rounded">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(emp)} className="text-emerald-600 hover:text-emerald-700 p-1" title="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                    {emp.isActive ? (
                      <button onClick={() => handleDeactivate(emp.id)} className="text-red-500 hover:text-red-700 p-1" title="Inativar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <button onClick={() => handleActivate(emp.id)} className="text-emerald-500 hover:text-emerald-700 p-1" title="Reativar">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
          {filteredEmployees.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                Nenhum servidor encontrado para &quot;{searchTerm}&quot;.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
}
