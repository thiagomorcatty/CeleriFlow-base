import { PrismaClient as PlatformPrismaClient } from "@/generated/platform-prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const globalForPlatformPrisma = globalThis as unknown as {
  platformPrisma: PlatformPrismaClient | undefined;
};

function createPlatformPrismaClient() {
  const connectionString = process.env.PLATFORM_DATABASE_URL;
  if (!connectionString) throw new Error("PLATFORM_DATABASE_URL nao configurada.");

  return new PlatformPrismaClient({
    adapter: new PrismaNeon({ connectionString }),
  });
}

export function getPlatformPrisma() {
  if (!globalForPlatformPrisma.platformPrisma) {
    globalForPlatformPrisma.platformPrisma = createPlatformPrismaClient();
  }

  return globalForPlatformPrisma.platformPrisma;
}
