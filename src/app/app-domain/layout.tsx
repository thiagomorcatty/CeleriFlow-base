import { prisma } from "@/lib/prisma";
import ClientLayout from "./ClientLayout";

export const dynamic = "force-dynamic";

export default async function AppDomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const institution = await prisma.institution.findFirst();

  return (
    <ClientLayout institution={institution}>
      {children}
    </ClientLayout>
  );
}
