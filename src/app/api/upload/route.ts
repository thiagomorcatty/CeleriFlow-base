import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
  }

  const blob = await put(`documentos/${Date.now()}_${file.name}`, file, {
    access: "public",
  });

  return NextResponse.json({ url: blob.url, pathname: blob.pathname });
}
