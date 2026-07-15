const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'app', 'app-domain', 'saude');

const pages = {
  'unidades': {
    title: 'Unidades de Saúde',
    icon: 'Building2',
    prismaModel: 'healthUnit',
    columns: ['Nome', 'Tipo', 'CNES', 'Telefone', 'Status'],
    renderRows: `items.map(item => (
      <tr key={item.id} className="border-b">
        <td className="p-4">{item.name}</td>
        <td className="p-4">{item.type}</td>
        <td className="p-4">{item.cnes || '-'}</td>
        <td className="p-4">{item.phone || '-'}</td>
        <td className="p-4">
          <span className={\`px-2 py-1 rounded text-xs \${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}\`}>
            {item.isActive ? 'Ativa' : 'Inativa'}
          </span>
        </td>
      </tr>
    ))`
  },
  'pacientes': {
    title: 'Pacientes',
    icon: 'Users',
    prismaModel: 'patient',
    include: 'include: { person: true }',
    columns: ['Nome', 'CPF/CNS', 'Data Nasc.', 'Status'],
    renderRows: `items.map(item => (
      <tr key={item.id} className="border-b">
        <td className="p-4">{item.person?.fullName}</td>
        <td className="p-4">{item.person?.cpf} / {item.cns || '-'}</td>
        <td className="p-4">{item.person?.birthDate ? new Date(item.person.birthDate).toLocaleDateString() : '-'}</td>
        <td className="p-4">{item.status}</td>
      </tr>
    ))`
  },
  'profissionais': {
    title: 'Profissionais de Saúde',
    icon: 'Stethoscope',
    prismaModel: 'healthProfessional',
    include: 'include: { employee: true }',
    columns: ['Nome', 'Especialidade', 'Conselho', 'Status'],
    renderRows: `items.map(item => (
      <tr key={item.id} className="border-b">
        <td className="p-4">{item.employee?.name}</td>
        <td className="p-4">{item.specialty || '-'}</td>
        <td className="p-4">{item.councilName} {item.councilNumber}</td>
        <td className="p-4">{item.isActive ? 'Ativo' : 'Inativo'}</td>
      </tr>
    ))`
  },
  'equipes': {
    title: 'Equipes ESF',
    icon: 'Users',
    prismaModel: 'healthTeam',
    include: 'include: { unit: true }',
    columns: ['Nome da Equipe', 'Código', 'Microárea', 'Unidade', 'Status'],
    renderRows: `items.map(item => (
      <tr key={item.id} className="border-b">
        <td className="p-4">{item.name}</td>
        <td className="p-4">{item.code || '-'}</td>
        <td className="p-4">{item.microarea || '-'}</td>
        <td className="p-4">{item.unit?.name}</td>
        <td className="p-4">{item.isActive ? 'Ativa' : 'Inativa'}</td>
      </tr>
    ))`
  },
  'agenda': {
    title: 'Agenda e Agendamentos',
    icon: 'Calendar',
    prismaModel: 'healthAppointment',
    include: 'include: { patient: { include: { person: true } }, professional: { include: { employee: true } } }',
    columns: ['Data', 'Paciente', 'Profissional', 'Especialidade', 'Status'],
    renderRows: `items.map(item => (
      <tr key={item.id} className="border-b">
        <td className="p-4">{new Date(item.date).toLocaleString()}</td>
        <td className="p-4">{item.patient?.person?.fullName}</td>
        <td className="p-4">{item.professional?.employee?.name || '-'}</td>
        <td className="p-4">{item.specialty || '-'}</td>
        <td className="p-4">{item.status}</td>
      </tr>
    ))`
  },
  'atendimentos': {
    title: 'Atendimentos e Prontuários',
    icon: 'ClipboardList',
    prismaModel: 'medicalRecord',
    include: 'include: { patient: { include: { person: true } }, professional: { include: { employee: true } } }',
    columns: ['Data', 'Tipo', 'Paciente', 'Profissional', 'Queixa Principal'],
    renderRows: `items.map(item => (
      <tr key={item.id} className="border-b">
        <td className="p-4">{new Date(item.date).toLocaleString()}</td>
        <td className="p-4">{item.type}</td>
        <td className="p-4">{item.patient?.person?.fullName}</td>
        <td className="p-4">{item.professional?.employee?.name}</td>
        <td className="p-4">{item.chiefComplaint || '-'}</td>
      </tr>
    ))`
  },
  'farmacia': {
    title: 'Farmácia Básica',
    icon: 'Pill',
    prismaModel: 'medicineBatch',
    include: 'include: { medicine: true }',
    columns: ['Medicamento', 'Lote', 'Validade', 'Qtd Disponível'],
    renderRows: `items.map(item => (
      <tr key={item.id} className="border-b">
        <td className="p-4">{item.medicine?.name}</td>
        <td className="p-4">{item.batchNumber}</td>
        <td className="p-4">{new Date(item.expirationDate).toLocaleDateString()}</td>
        <td className="p-4">{item.quantity}</td>
      </tr>
    ))`
  },
  'vacinacao': {
    title: 'Vacinação Básica',
    icon: 'Syringe',
    prismaModel: 'vaccinationRecord',
    include: 'include: { patient: { include: { person: true } }, vaccine: true }',
    columns: ['Data', 'Paciente', 'Vacina', 'Dose', 'Lote'],
    renderRows: `items.map(item => (
      <tr key={item.id} className="border-b">
        <td className="p-4">{new Date(item.date).toLocaleDateString()}</td>
        <td className="p-4">{item.patient?.person?.fullName}</td>
        <td className="p-4">{item.vaccine?.name}</td>
        <td className="p-4">{item.doseNumber}</td>
        <td className="p-4">{item.lotNumber || '-'}</td>
      </tr>
    ))`
  },
  'relatorios': {
    title: 'Relatórios Básicos',
    icon: 'FileText',
    customContent: `
      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-500">Módulo de relatórios em desenvolvimento. Em breve você poderá exportar estatísticas de atendimentos, dispensação e vacinação em PDF e Excel.</p>
      </div>
    `
  },
  'esus': {
    title: 'Integração e-SUS',
    icon: 'Activity',
    customContent: `
      <div className="bg-white p-6 rounded shadow flex flex-col gap-4">
        <p className="text-gray-500">Ferramenta para exportação de arquivos no formato Thrift para o e-SUS APS.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-fit">Gerar Lote e-SUS</button>
      </div>
    `
  }
};

Object.entries(pages).forEach(([folder, config]) => {
  const dirPath = path.join(baseDir, folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  let code = '';
  if (config.customContent) {
    code = `
import React from 'react';
import { ${config.icon} } from 'lucide-react';

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <${config.icon} className="h-6 w-6 text-emerald-600" />
        ${config.title}
      </h1>
      ${config.customContent}
    </div>
  );
}
`;
  } else {
    code = `
import React from 'react';
import { prisma } from '@/lib/prisma';
import { ${config.icon} } from 'lucide-react';

export default async function Page() {
  const items = await prisma.${config.prismaModel}.findMany({
    orderBy: { createdAt: 'desc' },
    ${config.include ? config.include : ''}
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <${config.icon} className="h-6 w-6 text-emerald-600" />
        ${config.title}
      </h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              ${config.columns.map(col => `<th className="p-4 font-semibold text-gray-600">${col}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={${config.columns.length}} className="p-4 text-center text-gray-500">Nenhum registro encontrado.</td>
              </tr>
            ) : (
              ${config.renderRows}
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`;
  }

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), code.trim());
});

console.log('Páginas criadas com sucesso!');
