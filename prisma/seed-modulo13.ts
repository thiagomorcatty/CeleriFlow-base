import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Iniciando seed do Módulo 13 - Saúde...');

  // 1. Unidades de Saúde
  const ubs1 = await prisma.healthUnit.create({
    data: {
      name: 'UBS Centro',
      type: 'UBS',
      cnes: '1234567',
      phone: '(11) 9999-0001',
      isActive: true,
    }
  });

  const caps1 = await prisma.healthUnit.create({
    data: {
      name: 'CAPS II - Mente Saudável',
      type: 'CAPS',
      cnes: '7654321',
      phone: '(11) 9999-0002',
      isActive: true,
    }
  });

  const farmacia = await prisma.healthUnit.create({
    data: {
      name: 'Farmácia Municipal Central',
      type: 'Farmácia',
      cnes: '1112223',
      phone: '(11) 9999-0003',
      isActive: true,
    }
  });

  // 2. Profissionais de Saúde (com Employee base)
  const profs = [];
  const especialidades = ['Clínico Geral', 'Enfermeiro', 'Pediatra', 'Ginecologista', 'Farmacêutico'];
  const conselhos = ['CRM', 'COREN', 'CRM', 'CRM', 'CRF'];

  for (let i = 0; i < 5; i++) {
    const emp = await prisma.employee.create({
      data: {
        name: `Profissional Saúde ${i + 1}`,
        cpf: `0000000001${i}`,
        email: `prof${i}@saude.gov.br`,
        isActive: true,
      }
    });

    const prof = await prisma.healthProfessional.create({
      data: {
        employeeId: emp.id,
        specialty: especialidades[i],
        councilName: conselhos[i],
        councilNumber: `1000${i}`,
        unitId: i < 2 ? ubs1.id : caps1.id,
        isActive: true,
      }
    });
    profs.push(prof);
  }

  // 3. Equipes ESF
  const team1 = await prisma.healthTeam.create({
    data: {
      name: 'Equipe ESF Centro - Azul',
      code: 'ESF-01',
      microarea: 'Centro e Jardins',
      unitId: ubs1.id,
      isActive: true,
    }
  });

  const team2 = await prisma.healthTeam.create({
    data: {
      name: 'Equipe ESF Norte - Verde',
      code: 'ESF-02',
      microarea: 'Zona Norte',
      unitId: caps1.id,
      isActive: true,
    }
  });

  // 4. Pacientes (com Person base)
  const pacientes = [];
  for (let i = 0; i < 5; i++) {
    const person = await prisma.person.create({
      data: {
        fullName: `Paciente Teste ${i + 1}`,
        cpf: `1112223334${i}`,
        birthDate: new Date(1980 + i, i, 10),
      }
    });

    const patient = await prisma.patient.create({
      data: {
        personId: person.id,
        cns: `70000000000000${i}`,
        bloodType: i % 2 === 0 ? 'O+' : 'A-',
        referenceUnitId: ubs1.id,
        teamId: i % 2 === 0 ? team1.id : team2.id,
      }
    });
    pacientes.push(patient);
  }

  // 5. Agendamentos
  const agendamentos = [];
  for (let i = 0; i < 10; i++) {
    const ag = await prisma.healthAppointment.create({
      data: {
        date: new Date(Date.now() + (i * 86400000)), // Agendamentos futuros
        specialty: i % 2 === 0 ? 'Clínica Médica' : 'Enfermagem',
        status: i < 3 ? 'Atendido' : 'Agendado',
        patientId: pacientes[i % 5].id,
        unitId: ubs1.id,
        professionalId: profs[i % 2].id,
      }
    });
    agendamentos.push(ag);
  }

  // 6. Atendimentos / Prontuários (MedicalRecord)
  for (let i = 0; i < 3; i++) {
    await prisma.medicalRecord.create({
      data: {
        date: new Date(),
        type: i === 0 ? 'Triagem' : 'Consulta',
        bloodPressure: '120/80',
        temperature: 36.5,
        chiefComplaint: i === 0 ? undefined : 'Dor de cabeça e febre há 3 dias',
        conduct: i === 0 ? undefined : 'Prescrito paracetamol e repouso',
        patientId: pacientes[i].id,
        professionalId: profs[0].id,
        unitId: ubs1.id,
        appointmentId: agendamentos[i].id,
      }
    });
  }

  // 7. Farmácia (Medicamentos e Lotes)
  const meds = [
    { name: 'Paracetamol', active: 'Paracetamol', pres: 'Comprimido', conc: '500mg' },
    { name: 'Amoxicilina', active: 'Amoxicilina', pres: 'Cápsula', conc: '500mg' },
    { name: 'Losartana', active: 'Losartana Potássica', pres: 'Comprimido', conc: '50mg' },
  ];

  for (const m of meds) {
    const med = await prisma.medicine.create({
      data: {
        name: m.name,
        activePrinciple: m.active,
        presentation: m.pres,
        concentration: m.conc,
        currentStock: 1000,
        minStock: 200,
      }
    });

    await prisma.medicineBatch.create({
      data: {
        batchNumber: `LOTE-${Math.floor(Math.random() * 10000)}`,
        expirationDate: new Date(Date.now() + 31536000000), // 1 ano
        quantity: 1000,
        medicineId: med.id,
      }
    });
  }

  // 8. Vacinas
  const vaxList = ['Hepatite B', 'BCG', 'Poliomielite', 'Febre Amarela'];
  for (const v of vaxList) {
    const vaccine = await prisma.vaccine.create({
      data: {
        name: v,
        dosesRequired: 2,
      }
    });

    await prisma.vaccinationRecord.create({
      data: {
        date: new Date(),
        doseNumber: 1,
        lotNumber: 'VAX-2026',
        patientId: pacientes[0].id,
        professionalId: profs[1].id, // Enfermeiro
        unitId: ubs1.id,
        vaccineId: vaccine.id,
      }
    });
  }

  console.log('Seed do Módulo 13 - Saúde concluído com sucesso!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
