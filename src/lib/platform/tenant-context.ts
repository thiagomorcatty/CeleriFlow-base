import { cookies, headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { decryptDatabaseUrl } from "@/lib/platform/encryption";
import { getPlatformPrisma } from "@/lib/platform/prisma";
import { createPrismaClient } from "@/lib/prisma";
import { getSessionPrincipal, SESSION_COOKIE_NAME } from "@/lib/platform/session";

const MAX_CACHED_TENANT_CLIENTS = 20;

type TenantClientEntry = {
  client: PrismaClient;
  lastUsedAt: number;
};

const globalForTenantClients = globalThis as unknown as {
  tenantClients: Map<string, TenantClientEntry> | undefined;
};

export class TenantAccessError extends Error {
  constructor(message: string, readonly status: 401 | 403 | 404 | 423) {
    super(message);
  }
}

export type TenantContext = {
  tenant: {
    id: string;
    slug: string;
    name: string;
    municipality: string;
    state: string;
    status: string;
  };
  user: {
    id: string;
    firebaseUid: string;
    email: string;
    name: string;
    role: string;
  };
  modules: string[];
  prisma: PrismaClient;
};

export function normalizeHost(value: string | null) {
  if (!value) return null;

  const host = value.trim().toLowerCase().replace(/\.$/, "").split(":")[0];
  return host || null;
}

function getTenantClient(databaseUrl: string) {
  const clients = globalForTenantClients.tenantClients ?? new Map<string, TenantClientEntry>();
  globalForTenantClients.tenantClients = clients;

  const cached = clients.get(databaseUrl);
  if (cached) {
    cached.lastUsedAt = Date.now();
    return cached.client;
  }

  if (clients.size >= MAX_CACHED_TENANT_CLIENTS) {
    const oldest = [...clients.entries()].sort(([, left], [, right]) => left.lastUsedAt - right.lastUsedAt)[0];
    if (oldest) {
      clients.delete(oldest[0]);
      void oldest[1].client.$disconnect();
    }
  }

  const client = createPrismaClient(databaseUrl);
  clients.set(databaseUrl, { client, lastUsedAt: Date.now() });
  return client;
}

export async function resolveTenantContext(hostHeader: string | null, sessionCookie: string | undefined): Promise<TenantContext> {
  const host = normalizeHost(hostHeader);
  if (!host) throw new TenantAccessError("Dominio da prefeitura nao informado.", 404);

  const [principal, domain] = await Promise.all([
    getSessionPrincipal(sessionCookie),
    getPlatformPrisma().platformTenantDomain.findUnique({
      where: { host },
      include: {
        tenant: {
          include: {
            enabledModules: {
              where: { enabled: true },
              include: { module: { select: { code: true } } },
            },
          },
        },
      },
    }),
  ]);

  if (!principal) throw new TenantAccessError("Sessao invalida ou expirada.", 401);
  if (!domain || domain.tenant.status !== "ACTIVE") {
    throw new TenantAccessError("Prefeitura indisponivel.", domain ? 423 : 404);
  }

  const user = await getPlatformPrisma().platformUser.findUnique({
    where: { firebaseUid: principal.firebaseUid },
  });

  if (!user || !user.active) throw new TenantAccessError("Usuario sem acesso a plataforma.", 403);
  if (user.role !== "PLATFORM_ADMIN" && user.tenantId !== domain.tenantId) {
    throw new TenantAccessError("Usuario nao pertence a esta prefeitura.", 403);
  }

  return {
    tenant: {
      id: domain.tenant.id,
      slug: domain.tenant.slug,
      name: domain.tenant.name,
      municipality: domain.tenant.municipality,
      state: domain.tenant.state,
      status: domain.tenant.status,
    },
    user: {
      id: user.id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    modules: domain.tenant.enabledModules.map(({ module }) => module.code),
    prisma: getTenantClient(decryptDatabaseUrl(domain.tenant.databaseUrlEncrypted)),
  };
}

export async function getCurrentTenantContext() {
  const [headerStore, cookieStore] = await Promise.all([headers(), cookies()]);
  return resolveTenantContext(headerStore.get("host"), cookieStore.get(SESSION_COOKIE_NAME)?.value);
}
