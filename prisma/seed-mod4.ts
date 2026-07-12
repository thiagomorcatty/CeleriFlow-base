import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Seeding Mod 4 (Documentação e GED)...');

  // Criar Pastas Principais do GED
  const rhFolder = await prisma.folder.create({
    data: { name: 'Recursos Humanos', description: 'Documentos do setor de RH' }
  });
  const licitacoesFolder = await prisma.folder.create({
    data: { name: 'Licitações e Contratos', description: 'Editais e contratos' }
  });
  const projetosFolder = await prisma.folder.create({
    data: { name: 'Projetos Especiais', description: 'Projetos da prefeitura' }
  });

  // Criar Subpasta
  await prisma.folder.create({
    data: { name: 'Folha de Pagamento 2026', parentId: rhFolder.id }
  });

  console.log('Pastas criadas.');

  // Criar Documentos no GED
  await prisma.document.createMany({
    data: [
      { title: 'Edital de Concurso 01/2026', documentType: 'Edital', fileUrl: '/uploads/edital01.pdf', folderId: licitacoesFolder.id },
      { title: 'Contrato Fornecimento Merenda', documentType: 'Contrato', fileUrl: '/uploads/contrato123.pdf', folderId: licitacoesFolder.id },
      { title: 'Projeto Praça Central', documentType: 'Projeto', fileUrl: '/uploads/praca.pdf', folderId: projetosFolder.id },
      { title: 'Regulamento Interno RH', documentType: 'Norma', fileUrl: '/uploads/regulamento.pdf', folderId: rhFolder.id },
    ]
  });
  console.log('Documentos criados nas pastas.');

  // Criar Modelos (utilizamos documentType = 'Modelo')
  await prisma.document.createMany({
    data: [
      { title: 'Ofício Padrão', documentType: 'Modelo', fileUrl: '/modelos/oficio.docx', status: 'Ativo', notes: 'Modelo oficial para ofícios externos' },
      { title: 'Memorando Interno', documentType: 'Modelo', fileUrl: '/modelos/memorando.docx', status: 'Ativo', notes: 'Comunicação interna' },
      { title: 'Portaria de Nomeação', documentType: 'Modelo', fileUrl: '/modelos/portaria.docx', status: 'Ativo', notes: 'Uso exclusivo do RH' },
      { title: 'Atestado de Capacidade Técnica', documentType: 'Modelo', fileUrl: '/modelos/atestado.docx', status: 'Rascunho', notes: 'Ainda em revisão' },
    ]
  });
  console.log('Modelos criados.');

  // Criar Documentos Pendentes de Assinatura (utilizamos status = 'Pendente Assinatura')
  await prisma.document.createMany({
    data: [
      { title: 'Portaria de Nomeação - João Silva', documentType: 'Portaria', fileUrl: '/docs/portaria_joao.pdf', status: 'Pendente Assinatura' },
      { title: 'Contrato Reforma da Escola', documentType: 'Contrato', fileUrl: '/docs/contrato_reforma.pdf', status: 'Pendente Assinatura' },
      { title: 'Autorização de Viagem Oficial', documentType: 'Ofício', fileUrl: '/docs/autorizacao_viagem.pdf', status: 'Pendente Assinatura' },
    ]
  });
  console.log('Documentos para assinatura criados.');

  console.log('Seed do Mod 4 concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
