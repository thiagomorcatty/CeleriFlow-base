import "dotenv/config";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { PrismaClient } from "../src/generated/platform-prisma/client.js";

function requiredEnvironment(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} nao configurada.`);
  return value;
}

function initializeFirebaseAdmin() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: requiredEnvironment("FIREBASE_PROJECT_ID"),
        clientEmail: requiredEnvironment("FIREBASE_CLIENT_EMAIL"),
        privateKey: requiredEnvironment("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
      }),
    });
  }

  return getAuth();
}

async function main() {
  const email = requiredEnvironment("PLATFORM_USER_EMAIL").trim().toLowerCase();
  const name = requiredEnvironment("PLATFORM_USER_NAME").trim();
  const role = process.env.PLATFORM_USER_ROLE || "TENANT_ADMIN";
  const tenantSlug = process.env.PLATFORM_USER_TENANT_SLUG?.trim().toLowerCase();

  if (!["PLATFORM_ADMIN", "TENANT_ADMIN"].includes(role)) {
    throw new Error("PLATFORM_USER_ROLE deve ser PLATFORM_ADMIN ou TENANT_ADMIN.");
  }
  if (role !== "PLATFORM_ADMIN" && !tenantSlug) {
    throw new Error("PLATFORM_USER_TENANT_SLUG e obrigatoria para usuarios municipais.");
  }
  if (role === "PLATFORM_ADMIN" && tenantSlug) {
    throw new Error("Administrador da plataforma nao deve ser vinculado a uma prefeitura.");
  }

  neonConfig.webSocketConstructor = ws;
  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: requiredEnvironment("PLATFORM_DATABASE_URL") }),
  });

  try {
    const [firebaseUser, tenant] = await Promise.all([
      initializeFirebaseAdmin().getUserByEmail(email),
      tenantSlug ? prisma.platformTenant.findUnique({ where: { slug: tenantSlug } }) : null,
    ]);

    if (tenantSlug && !tenant) throw new Error("Tenant nao encontrado.");

    const user = await prisma.platformUser.upsert({
      where: { firebaseUid: firebaseUser.uid },
      create: {
        firebaseUid: firebaseUser.uid,
        email,
        name,
        role,
        tenantId: tenant?.id,
      },
      update: {
        email,
        name,
        role,
        active: true,
        tenantId: tenant?.id ?? null,
      },
    });

    await prisma.platformAuditLog.create({
      data: {
        tenantId: tenant?.id,
        actorUserId: user.id,
        action: "USER_REGISTERED",
        resource: "PlatformUser",
        resourceId: user.id,
      },
    });

    console.log(`Usuario ${email} registrado com o papel ${role}.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
