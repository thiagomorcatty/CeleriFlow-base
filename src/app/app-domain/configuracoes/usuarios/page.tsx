import { prisma } from "@/lib/prisma";
import UsuariosClient from "./components/UsuariosClient";

export default async function UsuariosPage() {
  const [usuarios, perfis, modulos] = await Promise.all([
    prisma.usuario.findMany({
      include: {
        perfil: true,
        permissoesModulo: true
      },
      orderBy: { nome: 'asc' }
    }),
    prisma.configuracaoPerfil.findMany({
      orderBy: { nome: 'asc' }
    }),
    prisma.configuracaoModulo.findMany({
      where: { ativo: true },
      orderBy: { nome: 'asc' }
    })
  ]);

  return <UsuariosClient usuarios={usuarios} perfis={perfis} modulos={modulos} />;
}
