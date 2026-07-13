import { LicencaForm } from "../../LicencaForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditarLicencaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const leave = await prisma.leave.findUnique({
    where: { id }
  });

  if (!leave) {
    notFound();
  }

  const employees = await prisma.employee.findMany({ orderBy: { name: 'asc' } });

  return (
    <LicencaForm data={leave} employees={employees} />
  );
}
