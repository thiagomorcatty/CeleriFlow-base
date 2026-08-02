import "dotenv/config";
import crypto from "node:crypto";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { prisma } from "../src/lib/prisma";

const configuredPassword = process.env.CITIZEN_TEST_PASSWORD;
if (!configuredPassword) {
  throw new Error("CITIZEN_TEST_PASSWORD deve ser configurada antes do provisionamento.");
}
const password = configuredPassword;

function hashPassword(value: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.pbkdf2Sync(value, salt, 100000, 64, "sha512").toString("hex");
  return `$pbkdf2-sha512$100000$${salt}$${derivedKey}`;
}

const citizens = [
  { email: "pessoateste1@email.com", name: "Pessoa Teste1" },
  { email: "pessoateste2@email.com", name: "Pessoa Teste2" },
];

async function syncFirebaseUser(citizen: (typeof citizens)[number]) {
  const auth = getAuth(
    getApps()[0] ?? initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    }),
  );

  try {
    const existing = await auth.getUserByEmail(citizen.email);
    await auth.updateUser(existing.uid, { displayName: citizen.name, password, emailVerified: true });
  } catch (error: unknown) {
    if ((error as { code?: string }).code !== "auth/user-not-found") throw error;
    await auth.createUser({ email: citizen.email, displayName: citizen.name, password, emailVerified: true });
  }
}

async function main() {
  const perfil = await prisma.configuracaoPerfil.upsert({
    where: { id: "perfil-cidadao-poc" },
    create: {
      id: "perfil-cidadao-poc",
      nome: "Cidadão",
      descricao: "Acesso à Ouvidoria e ao Portal da Transparência.",
      ativo: true,
      permissoes: JSON.stringify({ acesso: "cidadao", modulosPermitidos: ["OUVIDORIA", "TRANSPARENCIA"] }),
    },
    update: {
      nome: "Cidadão",
      descricao: "Acesso à Ouvidoria e ao Portal da Transparência.",
      ativo: true,
      permissoes: JSON.stringify({ acesso: "cidadao", modulosPermitidos: ["OUVIDORIA", "TRANSPARENCIA"] }),
    },
  });

  for (const citizen of citizens) {
    const usuario = await prisma.usuario.upsert({
      where: { email: citizen.email },
      create: { email: citizen.email, nome: citizen.name, senha: hashPassword(password), perfilId: perfil.id, ativo: true },
      update: { nome: citizen.name, senha: hashPassword(password), perfilId: perfil.id, ativo: true },
    });
    await prisma.usuarioUnidadeGestora.deleteMany({ where: { usuarioId: usuario.id } });
    await syncFirebaseUser(citizen);
  }

  console.log("Dois cidadãos POC foram provisionados com acesso à Ouvidoria e Transparência, sem unidade gestora.");
}

main()
  .catch((error) => {
    console.error("Falha ao provisionar cidadãos POC:", error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
