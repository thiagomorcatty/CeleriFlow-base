"use server";

import { revalidatePath } from "next/cache";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

async function getTenantPrisma() {
  return (await getTenantContextForModule("CONFIGURACOES")).prisma;
}

export async function upsertUsuario(data: {
  id?: string;
  nome: string;
  email: string;
  perfilId: string;
  ativo: boolean;
  permissoes: { moduloId: string; canView: boolean; canEdit: boolean }[];
}) {
  const prisma = await getTenantPrisma();
  try {
    if (data.id) {
      // Update
      await prisma.usuario.update({
        where: { id: data.id },
        data: {
          nome: data.nome,
          email: data.email,
          perfilId: data.perfilId,
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
  } catch (error: any) {
    console.error(error);
    return { error: error.message || "Erro ao salvar o usuário." };
  }
}

export async function toggleUsuarioStatus(id: string, ativo: boolean) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.usuario.update({
      where: { id },
      data: { ativo }
    });
    revalidatePath("/configuracoes/usuarios");
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao alterar o status do usuário." };
  }
}
