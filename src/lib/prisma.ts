import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function makePrisma() {
  return new PrismaClient();
}

export function getPrisma() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = makePrisma();
  }
  return globalForPrisma.prisma;
}
