"use server";

import { revalidatePath } from "next/cache";
import { AccessError, getTenantContextForSystemAdministration } from "@/lib/platform/tenant-context";

async function getTenantPrisma() {
  return (await getTenantContextForSystemAdministration()).prisma;
}

export async function upsertUsuario(data: {
  id?: string;
  nome: string;
  email: string;
  perfilId: string;
  employeeId?: string;
  ativo: boolean;
  permissoes: { moduloId: string; canView: boolean; canEdit: boolean }[];
}) {
  try {
    const prisma = await getTenantPrisma();
    const perfil = await prisma.configuracaoPerfil.findFirst({
      where: { id: data.perfilId, ativo: true },
      select: { id: true },
    });
    if (!perfil) return { error: "Selecione um perfil de acesso ativo." };

    if (data.id) {
      // Update
      await prisma.usuario.update({
        where: { id: data.id },
        data: {
          nome: data.nome,
          email: data.email,
          perfilId: data.perfilId,
          employeeId: data.employeeId || null,
          ativo: data.ativo,
          permissoesModulo: {
            deleteMany: {}, // Clear old permissions
            create: data.permissoes.map(p => ({
              moduloId: p.moduloId,
              canView: p.canView,
              canEdit: p.canEdit
            }))
          }
        }
      });
    } else {
      // Create
      // Nota: Senha seria gerada aqui ou integrada com Firebase Admin
      await prisma.usuario.create({
        data: {
          nome: data.nome,
          email: data.email,
          senha: "auth-firebase-placeholder", 
          perfilId: data.perfilId,
          employeeId: data.employeeId || null,
          ativo: data.ativo,
          permissoesModulo: {
            create: data.permissoes.map(p => ({
              moduloId: p.moduloId,
              canView: p.canView,
              canEdit: p.canEdit
            }))
          }
        }
      });
    }

    revalidatePath("/configuracoes/usuarios");
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : "Erro ao salvar o usuário." };
  }
}

export async function toggleUsuarioStatus(id: string, ativo: boolean) {
  try {
    const prisma = await getTenantPrisma();
    await prisma.usuario.update({
      where: { id },
      data: { ativo }
    });
    revalidatePath("/configuracoes/usuarios");
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: error instanceof AccessError ? error.message : "Erro ao alterar o status do usuário." };
  }
}
