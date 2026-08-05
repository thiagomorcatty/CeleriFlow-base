import "dotenv/config";

import { prisma } from "../src/lib/prisma";

const evaluatorProfiles = [
  { id: "perfil-poc-avaliador-ti", name: "POC Avaliador Técnico de TI", email: "adminteste@email.com" },
  { id: "perfil-poc-avaliador-financeiro", name: "POC Avaliador Administrativo-Financeiro", email: "gestao1@email.com" },
  { id: "perfil-poc-avaliador-contabil", name: "POC Avaliador Contábil", email: "contadorteste@email.com" },
];

async function main() {
  const [financeModule, pocUnit] = await Promise.all([
    prisma.configuracaoModulo.findUnique({ where: { codigo: "FINANCEIRO" }, select: { id: true } }),
    prisma.budgetUnit.findUnique({ where: { code: "0101" }, select: { id: true } }),
  ]);
  if (!financeModule || !pocUnit) throw new Error("Módulo FINANCEIRO ou Unidade Gestora 0101 não foi encontrado.");

  const blockedModules = (await prisma.configuracaoModulo.findMany({
    where: { codigo: { not: "FINANCEIRO" } },
    select: { codigo: true },
  })).map((module) => module.codigo);

  for (const evaluator of evaluatorProfiles) {
    const user = await prisma.usuario.findUnique({ where: { email: evaluator.email }, select: { id: true } });
    if (!user) throw new Error(`Usuário avaliador ${evaluator.email} não foi encontrado.`);

    const profile = await prisma.configuracaoPerfil.upsert({
      where: { id: evaluator.id },
      create: {
        id: evaluator.id,
        nome: evaluator.name,
        descricao: "Acesso individual da comissão avaliadora da POC de São João do Ivaí.",
        permissoes: JSON.stringify({ acesso: "operacional", modulosBloqueados: blockedModules }),
        ativo: true,
      },
      update: {
        nome: evaluator.name,
        descricao: "Acesso individual da comissão avaliadora da POC de São João do Ivaí.",
        permissoes: JSON.stringify({ acesso: "operacional", modulosBloqueados: blockedModules }),
        ativo: true,
      },
    });

    await prisma.$transaction([
      prisma.usuario.update({ where: { id: user.id }, data: { perfilId: profile.id, ativo: true } }),
      prisma.usuarioModulo.deleteMany({ where: { usuarioId: user.id } }),
      prisma.usuarioModulo.create({ data: { usuarioId: user.id, moduloId: financeModule.id, canView: true, canEdit: true } }),
      prisma.usuarioUnidadeGestora.deleteMany({ where: { usuarioId: user.id } }),
      prisma.usuarioUnidadeGestora.create({ data: { usuarioId: user.id, budgetUnitId: pocUnit.id } }),
    ]);
  }

  console.log("Três avaliadores provisionados com acesso operacional exclusivo ao módulo FINANCEIRO.");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
