import { NextRequest, NextResponse } from "next/server";
import { dispatchPendingRpaOperations } from "@/lib/financeiro/rpa-integration";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = process.env.RPA_DISPATCH_CRON_SECRET || process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "RPA dispatch secret is not configured." }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(await dispatchPendingRpaOperations(prisma));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Falha ao enviar operações à Central RPA." }, { status: 500 });
  }
}
