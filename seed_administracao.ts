import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as dotenv from 'dotenv';
dotenv.config();

neonConfig.webSocketConstructor = ws;

function createPrismaClient() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  return new PrismaClient({ adapter });
}

const prisma = createPrismaClient();

async function main() {
  console.log('Seeding Administração data...');

  // 1. Institution
  let institution = await prisma.institution.findFirst();
  if (!institution) {
    institution = await prisma.institution.create({
      data: {
        name: 'Prefeitura Municipal Exemplo',
        cnpj: '11.222.333/0001-44',
        legalName: 'Município Exemplo',
        address: 'Praça Central, 1',
        city: 'Exemplo do Sul',
        state: 'SP',
        mayorName: 'Prefeito João Carlos',
        managerName: 'Administrador Maria'
      }
    });
  }

  // 2. Secretariats
  const secretariatsData = [
    { name: 'Secretaria de Educação', acronym: 'SME', managerName: 'Ana Clara' },
    { name: 'Secretaria de Saúde', acronym: 'SMS', managerName: 'Dr. Roberto' },
    { name: 'Secretaria de Finanças', acronym: 'SEFIN', managerName: 'Marcos Paulo' },
    { name: 'Secretaria de Obras', acronym: 'SMO', managerName: 'Eng. Fernando' }
  ];

  const createdSecretariats = [];
  for (const s of secretariatsData) {
    let sec = await prisma.secretariat.findFirst({ where: { acronym: s.acronym } });
    if (!sec) {
      sec = await prisma.secretariat.create({ data: s });
    }
    createdSecretariats.push(sec);
  }

  // 3. Departments
  const departmentsData = [
    { name: 'Departamento de TI', description: 'Tecnologia da Informação', secretariatId: createdSecretariats[0].id },
    { name: 'Departamento de Recursos Humanos', description: 'Gestão de Pessoas', secretariatId: createdSecretariats[0].id },
    { name: 'Departamento de Contabilidade', description: 'Setor Contábil', secretariatId: createdSecretariats[2].id },
    { name: 'Departamento de Engenharia', description: 'Projetos e Obras', secretariatId: createdSecretariats[3].id }
  ];

  const createdDepartments = [];
  for (const d of departmentsData) {
    let dep = await prisma.department.findFirst({ where: { name: d.name } });
    if (!dep) {
      dep = await prisma.department.create({ data: d });
    }
    createdDepartments.push(dep);
  }

  // 4. AdministrativeUnits
  const unitsData = [
    { name: 'Paço Municipal', type: 'Prédio Público', managerName: 'Joaquim Silva', secretariatId: createdSecretariats[0].id },
    { name: 'Escola Municipal Esperança', type: 'Escola', managerName: 'Diretora Silvia', secretariatId: createdSecretariats[0].id },
    { name: 'UBS Centro', type: 'Unidade de Saúde', managerName: 'Enf. Carla', secretariatId: createdSecretariats[1].id },
    { name: 'Almoxarifado Central', type: 'Almoxarifado', managerName: 'Pedro Nunes', secretariatId: createdSecretariats[2].id }
  ];

  const createdUnits = [];
  for (const u of unitsData) {
    let unit = await prisma.administrativeUnit.findFirst({ where: { name: u.name } });
    if (!unit) {
      unit = await prisma.administrativeUnit.create({ data: u });
    }
    createdUnits.push(unit);
  }

  // 5. Roles
  const rolesData = [
    { name: 'Secretário Municipal', level: 'Secretário', canSign: true },
    { name: 'Diretor de Departamento', level: 'Diretor', canSign: true },
    { name: 'Agente Administrativo', level: 'Servidor', canSign: false },
    { name: 'Analista de Sistemas', level: 'Servidor', canSign: false }
  ];

  const createdRoles = [];
  for (const r of rolesData) {
    let role = await prisma.role.findFirst({ where: { name: r.name } });
    if (!role) {
      role = await prisma.role.create({ data: r });
    }
    createdRoles.push(role);
  }

  // 6. Employees
  const employeesData = [
    { name: 'Ana Clara', cpf: '001.002.003-04', email: 'ana.clara@exemplo.gov', roleId: createdRoles[0].id, secretariatId: createdSecretariats[0].id },
    { name: 'Carlos Santos', cpf: '011.012.013-14', email: 'carlos@exemplo.gov', roleId: createdRoles[1].id, departmentId: createdDepartments[0].id },
    { name: 'Beatriz Costa', cpf: '021.022.023-24', email: 'beatriz@exemplo.gov', roleId: createdRoles[2].id, unitId: createdUnits[0].id },
    { name: 'Marcos Paulo', cpf: '031.032.033-34', email: 'marcos@exemplo.gov', roleId: createdRoles[0].id, secretariatId: createdSecretariats[2].id }
  ];

  const createdEmployees = [];
  for (const emp of employeesData) {
    let employee = await prisma.employee.findUnique({ where: { cpf: emp.cpf } });
    if (!employee) {
      employee = await prisma.employee.create({ data: emp });
    }
    createdEmployees.push(employee);
  }

  // 7. InternalDemands
  const demandsData = [
    { title: 'Compra de Computadores', description: 'Aquisição de 10 desktops para a Saúde', status: 'Em andamento', priority: 'Alta', secretariatId: createdSecretariats[1].id, creatorId: createdEmployees[0].id },
    { title: 'Manutenção do Ar Condicionado', description: 'Conserto no setor RH', status: 'Aberta', priority: 'Normal', departmentId: createdDepartments[1].id, assigneeId: createdEmployees[1].id },
    { title: 'Relatório Financeiro Q3', description: 'Fechamento de contas do trimestre', status: 'Concluída', priority: 'Alta', secretariatId: createdSecretariats[2].id, creatorId: createdEmployees[3].id },
    { title: 'Organização de Arquivos', description: 'Digitalizar documentos de 2020', status: 'Aberta', priority: 'Baixa', departmentId: createdDepartments[2].id, assigneeId: createdEmployees[2].id }
  ];

  for (const d of demandsData) {
    const exists = await prisma.internalDemand.findFirst({ where: { title: d.title } });
    if (!exists) {
      await prisma.internalDemand.create({ data: d });
    }
  }

  // 8. CalendarEvents
  const eventsData = [
    { title: 'Dia da Independência', date: new Date('2026-09-07'), isHoliday: true, type: 'Feriado Nacional' },
    { title: 'Natal', date: new Date('2026-12-25'), isHoliday: true, type: 'Feriado Nacional' },
    { title: 'Ponto Facultativo Carnaval', date: new Date('2026-02-16'), isHoliday: false, type: 'Ponto Facultativo' },
    { title: 'Reunião de Secretariado', date: new Date('2026-07-20'), isHoliday: false, type: 'Expediente Especial' }
  ];

  for (const ev of eventsData) {
    const exists = await prisma.calendarEvent.findFirst({ where: { title: ev.title } });
    if (!exists) {
      await prisma.calendarEvent.create({ data: ev });
    }
  }

  console.log('Seed de Administração completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
