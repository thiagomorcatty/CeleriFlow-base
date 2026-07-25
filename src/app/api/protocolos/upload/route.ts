import { NextRequest, NextResponse } from "next/server";
import { AccessError, getCurrentTenantContext } from "@/lib/platform/tenant-context";
import { uploadProcessFile } from "@/lib/platform/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    await getCurrentTenantContext();
    const file = (await request.formData()).get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
    }

    const blob = await uploadProcessFile(file);
    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (error) {
    if (error instanceof AccessError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro interno ao enviar o arquivo." },
      { status: 400 },
    );
  }
}
