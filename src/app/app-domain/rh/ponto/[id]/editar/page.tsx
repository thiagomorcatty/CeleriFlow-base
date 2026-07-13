import { PontoForm } from "../../PontoForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditarPontoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await prisma.attendanceRecord.findUnique({
    where: { id }
  });

  if (!record) {
    notFound();
  }

  const employees = await prisma.employee.findMany({ orderBy: { name: 'asc' } });

  return (
    <PontoForm data={record} employees={employees} />
  );
}
