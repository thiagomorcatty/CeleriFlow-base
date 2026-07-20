import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
      // Se não for o subdomínio app, redireciona pra home do marketing
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Se o usuário estiver acessando via subdomínio app
  if (isAppSubdomain) {
    // Redirecionar invisivelmente para a pasta interna /app-domain
    // Ex: app.celeriflow.com.br/ -> reescrito para /app-domain/login
    // app.celeriflow.com.br/dashboard -> reescrito para /app-domain/dashboard
    const internalPath = url.pathname === "/" ? "/login" : url.pathname;
    const newPath = `/app-domain${internalPath}`;
    return NextResponse.rewrite(new URL(newPath, req.url));
  }

  return NextResponse.next();
}
