import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

function requiredEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} nao configurada.`);
  return value;
}

async function main() {
  const email = requiredEnvironment("SYSTEM_ADMIN_EMAIL").toLowerCase();
  const name = process.env.SYSTEM_ADMIN_NAME?.trim() || email;

  neonConfig.webSocketConstructor = ws;
  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: requiredEnvironment("DATABASE_URL") }),
  });

  try {
    const profile = await prisma.configuracaoPerfil.upsert({
      where: { id: "system-administrator" },
      create: {
        id: "system-administrator",
        nome: "Administrador",
        descricao: "Acesso administrativo inicial do sistema.",
        permissoes: JSON.stringify({ acesso: "total" }),
        ativo: true,
      },
      update: { ativo: true },
    });

    await prisma.usuario.upsert({
      where: { email },
      create: {
        nome: name,
        email,
        senha: "firebase",
        ativo: true,
        perfilId: profile.id,
      },
      update: {
        nome: name,
        ativo: true,
        perfilId: profile.id,
      },
    });

    console.log(`Administrador ${email} configurado.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
