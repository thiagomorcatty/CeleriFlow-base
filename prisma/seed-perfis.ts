/**
 * Seed: Perfis de Acesso Padrão
 * Cria os 3 perfis padrão do sistema: Administrador, Operador e Visualizador.
 * Seguro para re-executar.
 */
import 'dotenv/config';
import { prisma } from "../src/lib/prisma";

async function main() {
  const perfis = [
    {
      nome: "Administrador",
      descricao: "Acesso total ao sistema. Pode configurar usuários, módulos, perfis e realizar qualquer operação.",
      permissoes: JSON.stringify({ acesso: "total" }),
      ativo: true,
    },
    {
      nome: "Operador",
      descricao: "Acesso operacional aos módulos contratados. Pode visualizar e editar registros conforme as permissões definidas.",
      permissoes: JSON.stringify({ acesso: "operacional" }),
      ativo: true,
    },
    {
      nome: "Visualizador",
      descricao: "Acesso somente leitura. Pode consultar informações, mas não pode realizar alterações no sistema.",
      permissoes: JSON.stringify({ acesso: "leitura" }),
      ativo: true,
    },
  ];

  for (const perfil of perfis) {
    const existing = await prisma.configuracaoPerfil.findFirst({
      where: { nome: perfil.nome }
    });

    if (existing) {
      await prisma.configuracaoPerfil.update({
        where: { id: existing.id },
        data: {
          descricao: perfil.descricao,
          ativo: perfil.ativo,
        }
      });
    } else {
      await prisma.configuracaoPerfil.create({
        data: perfil
      });
    }
    console.log(`✅ Perfil "${perfil.nome}" criado/atualizado.`);
  }

  console.log("\n🎉 Perfis de acesso padrão configurados com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
