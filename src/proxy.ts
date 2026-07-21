import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ATENÇÃO: O proxy roda no Edge Runtime — NÃO importar módulos Node.js aqui.
// O nome do cookie precisa ser mantido em sincronia com session.ts manualmente.
const SESSION_COOKIE_NAME = "celeriflow_session";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)).*)",
  ],
};

export function proxy(req: NextRequest) {
  const url = req.nextUrl;

  // A aplicacao atende o painel principal e um subdominio por prefeitura.
  const hostname = (req.headers.get("host") || "").toLowerCase().split(":")[0];
  const appDomain = "app.celeriflow.com.br";

  const isAppSubdomain =
    hostname === appDomain ||
    hostname.endsWith(`.${appDomain}`) ||
    hostname === "app.localhost" ||
    hostname.endsWith(".localhost");

  // Evitar acesso direto à pasta interna /app-domain pelas URLs do marketing
  if (url.pathname.startsWith("/app-domain")) {
    if (!isAppSubdomain) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Se o usuário estiver acessando via subdomínio app
  if (isAppSubdomain) {
    const internalPath = url.pathname === "/" ? "/login" : url.pathname;
    const newPath = `/app-domain${internalPath}`;

    // Redireciona para /login se não há sessão e não está já na página de login
    const hasSession = req.cookies.has(SESSION_COOKIE_NAME);
    if (!hasSession && internalPath !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Reescrita invisível: app.celeriflow.com.br/dashboard → /app-domain/dashboard
    return NextResponse.rewrite(new URL(newPath, req.url));
  }

  return NextResponse.next();
}
