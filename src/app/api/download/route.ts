import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Faltando o parâmetro url" }, { status: 400 });
  }

  try {
    // Busca o arquivo privado passando access: 'private'
    // A Vercel vai usar automaticamente o BLOB_READ_WRITE_TOKEN do .env
    const response = await get(url, { access: "private" });

    if (!response || !response.stream) {
      return NextResponse.json({ error: "Documento não encontrado" }, { status: 404 });
    }

    const contentType = response.blob?.contentType || "application/pdf";
    const filename = response.blob?.pathname?.split("/").pop() || "documento.pdf";

    return new NextResponse(response.stream, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Erro no download:", error);
    return NextResponse.json({ error: "Erro interno no servidor ao baixar o documento" }, { status: 500 });
  }
}
