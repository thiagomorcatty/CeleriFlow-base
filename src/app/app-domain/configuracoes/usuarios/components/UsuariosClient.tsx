"use client";

import { useState } from "react";
import { UserCog, Plus, Search, Shield, X } from "lucide-react";
import { upsertUsuario, toggleUsuarioStatus } from "../actions";
import { Card, CardContent } from "@/components/ui/card";

type Perfil = { id: string; nome: string };
type Modulo = { id: string; nome: string; codigo: string };
type UsuarioModulo = { moduloId: string; canView: boolean; canEdit: boolean };
type Usuario = {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
  perfilId: string;
  perfil: { nome: string };
  employeeId: string | null;
  permissoesModulo: UsuarioModulo[];
};
type Servidor = {
  id: string;
  name: string;
  department: { name: string } | null;
};

export default function UsuariosClient({
  usuarios,
  perfis,
  modulos,
  servidores
}: {
  usuarios: Usuario[];
  perfis: Perfil[];
  modulos: Modulo[];
  servidores: Servidor[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<{
    id?: string;
    nome: string;
    email: string;
    perfilId: string;
    employeeId: string;
    ativo: boolean;
    permissoes: Record<string, { canView: boolean; canEdit: boolean }>;
  }>({
    nome: "",
    email: "",
    perfilId: perfis[0]?.id || "",
    employeeId: "",
    ativo: true,
    permissoes: {}
  });

  const filteredUsuarios = usuarios.filter(u => 
    u.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPerfil = perfis.find(p => p.id === formData.perfilId);
  const isAdmin = selectedPerfil?.nome === "Administrador";

  function openNewModal() {
    setFormData({
      nome: "",
      email: "",
      perfilId: perfis[0]?.id || "",
      employeeId: "",
      ativo: true,
      permissoes: {}
    });
    setIsModalOpen(true);
  }

  function openEditModal(usuario: Usuario) {
    const permMap: Record<string, { canView: boolean; canEdit: boolean }> = {};
    usuario.permissoesModulo.forEach(p => {
      permMap[p.moduloId] = { canView: p.canView, canEdit: p.canEdit };
    });

    setFormData({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfilId: usuario.perfilId,
      employeeId: usuario.employeeId || "",
      ativo: usuario.ativo,
      permissoes: permMap
    });
    setIsModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const permissoesArray = Object.entries(formData.permissoes).map(([moduloId, perms]) => ({
      moduloId,
      canView: perms.canView,
      canEdit: perms.canEdit
    }));

    const result = await upsertUsuario({
      id: formData.id,
      nome: formData.nome,
      email: formData.email,
      perfilId: formData.perfilId,
      employeeId: formData.employeeId || undefined,
      ativo: formData.ativo,
      permissoes: permissoesArray
    });

    if (result.error) {
      alert(result.error);
    } else {
      setIsModalOpen(false);
    }
    setIsSubmitting(false);
  }

  async function handleToggleStatus(id: string, ativo: boolean) {
    await toggleUsuarioStatus(id, ativo);
  }

  return (
    <div className="flex-1 p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UserCog className="h-6 w-6 text-gray-700" />
            Gestão de Usuários
          </h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie acessos, perfis e permissões dos servidores.</p>
        </div>
        <button 
          onClick={openNewModal}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="h-5 w-5" />
          Novo Usuário
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou e-mail..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Nome / E-mail</th>
                <th className="px-6 py-3">Perfil</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{u.nome}</div>
                    <div className="text-gray-500">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      <Shield className="h-3 w-3" />
                      {u.perfil.nome}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(u.id, !u.ativo)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                        u.ativo ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {u.ativo ? "Ativo" : "Inativo"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => openEditModal(u)}
                      className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsuarios.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {formData.id ? "Editar Usuário" : "Novo Usuário"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.nome}
                    onChange={e => setFormData({...formData, nome: e.target.value})}
                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail Institucional</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Perfil de Acesso</label>
                  <select
                    value={formData.perfilId}
                    onChange={e => setFormData({...formData, perfilId: e.target.value, permissoes: {}})}
                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 outline-none"
                  >
                    {perfis.map(p => (
                      <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Servidor vinculado</label>
                  <select
                    value={formData.employeeId}
                    onChange={e => setFormData({...formData, employeeId: e.target.value})}
                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 outline-none"
                  >
                    <option value="">Sem vinculo operacional</option>
                    {servidores.map(servidor => (
                      <option key={servidor.id} value={servidor.id}>
                        {servidor.name}{servidor.department ? ` - ${servidor.department.name}` : ""}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Obrigatorio para operar Protocolos e Processos.</p>
                </div>
                <div className="flex items-center mt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.ativo}
                      onChange={e => setFormData({...formData, ativo: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm font-medium text-gray-700">Usuário Ativo</span>
                  </label>
                </div>
              </div>

              {!isAdmin && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Permissões por Módulo</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modulos.map(modulo => {
                      const perm = formData.permissoes[modulo.id] || { canView: false, canEdit: false };
                      return (
                        <Card key={modulo.id} className="shadow-sm">
                          <CardContent className="p-4">
                            <h4 className="font-bold text-sm text-gray-900 mb-3 truncate" title={modulo.nome}>
                              {modulo.nome}
                            </h4>
                            <div className="space-y-2">
                              <label className="flex items-center justify-between text-sm text-gray-600 cursor-pointer">
                                <span>Pode Ver</span>
                                <input 
                                  type="checkbox"
                                  checked={perm.canView || perm.canEdit}
                                  onChange={e => {
                                    const checked = e.target.checked;
                                    setFormData(prev => ({
                                      ...prev,
                                      permissoes: {
                                        ...prev.permissoes,
                                        [modulo.id]: { 
                                          canView: checked, 
                                          canEdit: checked ? perm.canEdit : false 
                                        }
                                      }
                                    }));
                                  }}
                                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                />
                              </label>
                              <label className="flex items-center justify-between text-sm text-gray-600 cursor-pointer">
                                <span>Pode Editar</span>
                                <input 
                                  type="checkbox"
                                  checked={perm.canEdit}
                                  onChange={e => {
                                    const checked = e.target.checked;
                                    setFormData(prev => ({
                                      ...prev,
                                      permissoes: {
                                        ...prev.permissoes,
                                        [modulo.id]: { 
                                          canView: checked ? true : perm.canView, 
                                          canEdit: checked 
                                        }
                                      }
                                    }));
                                  }}
                                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                />
                              </label>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {isAdmin && (
                <div className="bg-blue-50 text-blue-800 p-4 rounded-lg flex items-start gap-3">
                  <Shield className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Acesso Total</h4>
                    <p className="text-sm mt-1">Este perfil de Administrador possui acesso irrestrito de visualização e edição em todos os módulos do sistema. Não é necessário configurar permissões individuais.</p>
                  </div>
                </div>
              )}
            </form>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70 flex items-center gap-2"
              >
                {isSubmitting && <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                Salvar Usuário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
