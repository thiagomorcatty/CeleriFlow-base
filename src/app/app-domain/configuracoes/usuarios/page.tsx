import { getTenantContextForSystemAdministration } from "@/lib/platform/tenant-context";
import UsuariosClient from "./components/UsuariosClient";

export default async function UsuariosPage() {
  const { prisma } = await getTenantContextForSystemAdministration();
  const [usuarios, perfis, modulos, servidores] = await Promise.all([
    prisma.usuario.findMany({
      include: {
        perfil: true,
        permissoesModulo: true,
        employee: true
      },
      orderBy: { nome: 'asc' }
    }),
    prisma.configuracaoPerfil.findMany({
      orderBy: { nome: 'asc' }
    }),
    prisma.configuracaoModulo.findMany({
      where: { ativo: true },
      orderBy: { nome: 'asc' }
    }),
    prisma.employee.findMany({
      where: { isActive: true },
      include: { department: true, secretariat: true },
      orderBy: { name: 'asc' }
    })
  ]);

  return <UsuariosClient usuarios={usuarios} perfis={perfis} modulos={modulos} servidores={servidores} />;
}
