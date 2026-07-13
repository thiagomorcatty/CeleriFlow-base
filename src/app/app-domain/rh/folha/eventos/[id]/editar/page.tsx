import { EventForm } from "../../EventForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditarEventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.payrollEvent.findUnique({
    where: { id }
  });

  if (!event) {
    notFound();
  }

  return (
    <EventForm data={event} />
  );
}
