/**
 * seed-firebase-users.ts
 *
 * Cria/sincroniza os usuários de teste no Firebase Authentication
 * com emailVerified = true, prontos para usar no login do CeleriFlow.
 *
 * Uso:
 *   npx tsx scripts/seed-firebase-users.ts
 *
 * Os e-mails e senhas devem corresponder aos usuários criados pela seed do banco.
 * A senha pode ser sobrescrita via variável de ambiente SEED_USER_PASSWORD.
 */

import "dotenv/config";
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// ---------------------------------------------------------------------------
// Inicializa Firebase Admin
// ---------------------------------------------------------------------------
let app: App;
if (!getApps().length) {
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID as string,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY as string)?.replace(/\\n/g, "\n"),
    }),
  });
} else {
  app = getApps()[0];
}

const adminAuth = getAuth(app);

// ---------------------------------------------------------------------------
// Usuários de teste — alinhados com seed-poc-completo.ts
// ---------------------------------------------------------------------------
const DEFAULT_PASSWORD = process.env.SEED_USER_PASSWORD || "SenhaSegura123!";

const TEST_USERS = [
  {
    email: "adminteste@email.com",
    displayName: "Admin Teste",
    password: DEFAULT_PASSWORD,
    role: "Administrador Geral",
  },
  {
    email: "gestao1@email.com",
    displayName: "Gestão 1",
    password: DEFAULT_PASSWORD,
    role: "Gestor Municipal",
  },
  {
    email: "servidor1@email.com",
    displayName: "Servidor 1",
    password: DEFAULT_PASSWORD,
    role: "Servidor Operador",
  },
  {
    email: "contadorteste@email.com",
    displayName: "Contador Teste",
    password: DEFAULT_PASSWORD,
    role: "Contador Responsável",
  },
  {
    email: "pessoateste1@email.com",
    displayName: "Pessoa Teste1",
    password: DEFAULT_PASSWORD,
    role: "Cidadão",
  },
  {
    email: "pessoateste2@email.com",
    displayName: "Pessoa Teste2",
    password: DEFAULT_PASSWORD,
    role: "Cidadão",
  },
];

// ---------------------------------------------------------------------------
// Lógica principal
// ---------------------------------------------------------------------------
async function upsertFirebaseUser(user: (typeof TEST_USERS)[0]) {
  let uid: string;
  let action: "criado" | "atualizado";

  try {
    // Tenta buscar usuário existente pelo e-mail
    const existing = await adminAuth.getUserByEmail(user.email);
    uid = existing.uid;
    action = "atualizado";

    // Atualiza senha, displayName e força emailVerified
    await adminAuth.updateUser(uid, {
      displayName: user.displayName,
      password: user.password,
      emailVerified: true,
    });
  } catch (err: any) {
    if (err?.code !== "auth/user-not-found") throw err;

    // Usuário não existe — cria do zero
    const created = await adminAuth.createUser({
      email: user.email,
      displayName: user.displayName,
      password: user.password,
      emailVerified: true,
    });
    uid = created.uid;
    action = "criado";
  }

  return { uid, action };
}

async function main() {
  console.log("🔥 Sincronizando usuários de teste no Firebase Authentication...");
  console.log(`📌 Projeto: ${process.env.FIREBASE_PROJECT_ID}`);
  console.log("─".repeat(60));

  const results: { email: string; role: string; uid: string; action: string }[] = [];

  for (const user of TEST_USERS) {
    try {
      const { uid, action } = await upsertFirebaseUser(user);
      results.push({ email: user.email, role: user.role, uid, action });
      console.log(`  ✅ [${action.toUpperCase()}] ${user.email} (${user.role})`);
      console.log(`        UID: ${uid}`);
    } catch (err) {
      console.error(`  ❌ Erro ao processar ${user.email}:`, err);
    }
  }

  console.log("─".repeat(60));
  console.log(`\n✅ ${results.length}/${TEST_USERS.length} usuários sincronizados com sucesso!`);
  console.log("\n🔑 Credenciais de acesso:");
  console.log(`   Senha padrão: ${DEFAULT_PASSWORD}`);
  console.log("\n📋 Usuários prontos para login:");

  const maxEmail = Math.max(...results.map((r) => r.email.length));
  for (const r of results) {
    console.log(`   ${r.email.padEnd(maxEmail + 2)} → ${r.role}`);
  }

  console.log("\n⚠️  Lembre-se: os e-mails acima devem existir também na tabela");
  console.log("    'Usuario' do banco (seed-poc-completo.ts já faz isso).");
  console.log("\n🎯 Pronto! Faça login em /login com qualquer conta acima.\n");
}

main()
  .catch((e) => {
    console.error("❌ Erro fatal na sincronização do Firebase:", e);
    process.exit(1);
  });
