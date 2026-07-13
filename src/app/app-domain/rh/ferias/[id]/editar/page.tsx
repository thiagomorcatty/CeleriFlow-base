import { FeriasForm } from "../../FeriasForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditarFeriasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vacation = await prisma.vacation.findUnique({
    where: { id }
  });

  if (!vacation) {
    notFound();
  }

  const employees = await prisma.employee.findMany({ orderBy: { name: 'asc' } });

  return (
    <FeriasForm data={vacation} employees={employees} />
  );
}
