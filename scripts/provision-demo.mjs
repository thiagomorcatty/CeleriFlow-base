import "dotenv/config";
import { createCipheriv, randomBytes } from "node:crypto";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { PrismaClient } from "../src/generated/platform-prisma/client.js";

const modules = [
  ["ADMINISTRACAO", "Administracao"],
  ["CADASTROS", "Cadastros Gerais"],
  ["PROTOCOLOS", "Processos e Protocolo"],
  ["GED", "Documentos e GED"],
  ["ATENDIMENTO", "Atendimento ao Cidadao"],
  ["TRANSPARENCIA", "Portal e Transparencia"],
  ["TRIBUTACAO", "Tributacao"],
  ["FINANCEIRO", "Financeiro e Contabil"],
  ["COMPRAS", "Compras e Contratos"],
  ["RH", "RH e Folha"],
  ["PATRIMONIO", "Patrimonio e Almoxarifado"],
  ["EDUCACAO", "Educacao"],
  ["SAUDE", "Saude"],
  ["SOCIAL", "Assistencia Social"],
  ["MEIO_AMBIENTE", "Meio Ambiente"],
  ["SANEAMENTO", "Agua e Saneamento"],
  ["OBRAS", "Obras e Servicos"],
  ["CULTURA", "Cultura e Lazer"],
  ["CAMARA", "Camara Municipal"],
  ["SEGURANCA", "Seguranca e Mobilidade"],
  ["CONFIGURACOES", "Configuracoes e Integracoes"],
];

function requiredEnvironment(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} nao configurada.`);
  return value;
}

function demoDatabaseUrl() {
  return process.env.DEMO_TENANT_DATABASE_URL || requiredEnvironment("DATABASE_URL");
}

function encryptDatabaseUrl(databaseUrl) {
  const key = Buffer.from(requiredEnvironment("PLATFORM_ENCRYPTION_KEY"), "base64");
  if (key.length !== 32) throw new Error("PLATFORM_ENCRYPTION_KEY deve conter 32 bytes em Base64.");

  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(databaseUrl, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return [iv, authTag, encrypted].map((part) => part.toString("base64url")).join(".");
}

async function upsertDomain(prisma, host, tenantId, isPrimary) {
  const existing = await prisma.platformTenantDomain.findUnique({ where: { host } });
  if (existing && existing.tenantId !== tenantId) {
    throw new Error(`O dominio ${host} ja pertence a outro tenant.`);
  }

  return prisma.platformTenantDomain.upsert({
    where: { host },
    create: { host, tenantId, isPrimary },
    update: { isPrimary },
  });
}

async function main() {
  neonConfig.webSocketConstructor = ws;
  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: requiredEnvironment("PLATFORM_DATABASE_URL") }),
  });

  try {
    const tenant = await prisma.platformTenant.upsert({
      where: { slug: "demo" },
      create: {
        slug: "demo",
        name: "CeleriFlow DEMO",
        municipality: "Demonstracao",
        state: "DF",
        status: "ACTIVE",
        databaseUrlEncrypted: encryptDatabaseUrl(demoDatabaseUrl()),
      },
      update: {
        status: "ACTIVE",
        databaseUrlEncrypted: encryptDatabaseUrl(demoDatabaseUrl()),
      },
    });

    await upsertDomain(prisma, "demo.app.celeriflow.com.br", tenant.id, true);
    await prisma.platformTenantDomain.deleteMany({
      where: { host: "demo.localhost", tenantId: tenant.id },
    });

    for (const [code, name] of modules) {
      const module = await prisma.platformModule.upsert({
        where: { code },
        create: { code, name },
        update: { name },
      });

      await prisma.platformTenantModule.upsert({
        where: { tenantId_moduleId: { tenantId: tenant.id, moduleId: module.id } },
        create: { tenantId: tenant.id, moduleId: module.id, enabled: true, enabledAt: new Date() },
        update: { enabled: true, enabledAt: new Date() },
      });
    }

    console.log("Tenant DEMO provisionado com os 21 modulos habilitados.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
