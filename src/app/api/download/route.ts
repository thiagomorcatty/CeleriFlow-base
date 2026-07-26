import { NextRequest, NextResponse } from "next/server";
import { AccessError, getCurrentTenantContext } from "@/lib/platform/tenant-context";
import { downloadFilename, getFile } from "@/lib/platform/blob";
import { getAttendanceContext, ombudsmanScope, ticketScope } from "@/lib/attendance/access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Faltando o parâmetro url" }, { status: 400 });
  }

  try {
    const context = await getCurrentTenantContext();
    const document = await context.prisma.document.findFirst({
      where: { fileUrl: url },
      select: { id: true, ticketLinks: { select: { ticketId: true } }, ombudsmanLinks: { select: { ombudsmanId: true } } },
    });
    if (!document) return NextResponse.json({ error: "Documento nao encontrado" }, { status: 404 });

    // Existing GED consumers retain their authenticated access. Documents linked to
    // Atendimento/Ouvidoria additionally require access to a linked record.
    if (document.ticketLinks.length || document.ombudsmanLinks.length) {
      const attendance = await getAttendanceContext();
      const [ticket, ombudsman] = await Promise.all([
        document.ticketLinks.length
          ? attendance.prisma.ticket.findFirst({ where: { AND: [{ id: { in: document.ticketLinks.map((link) => link.ticketId) } }, ticketScope(attendance)] }, select: { id: true } })
          : null,
        document.ombudsmanLinks.length
          ? attendance.prisma.ombudsman.findFirst({ where: { AND: [{ id: { in: document.ombudsmanLinks.map((link) => link.ombudsmanId) } }, ombudsmanScope(attendance)] }, select: { id: true } })
          : null,
      ]);
      if (!ticket && !ombudsman) throw new AccessError("Sem acesso ao documento vinculado.", 403);
    }
    const response = await getFile(url);

    if (!response || !response.stream) {
      return NextResponse.json({ error: "Documento não encontrado" }, { status: 404 });
    }

    const contentType = response.blob?.contentType || "application/pdf";
    const filename = downloadFilename(response.blob.pathname);

    return new NextResponse(response.stream, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (error) {
    if (error instanceof AccessError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Erro no download:", error);
    return NextResponse.json({ error: "Erro interno no servidor ao baixar o documento" }, { status: 500 });
  }
}
