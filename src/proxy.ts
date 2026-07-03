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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export function proxy(req: NextRequest) {
  const url = req.nextUrl;

  // Obter o host da requisição (ex: app.celeriflow.com.br ou app.localhost:3000)
  const hostname = req.headers.get("host") || "";

  // Definimos quais são os domínios da aplicação (sistema)
  const isAppSubdomain =
    hostname.startsWith("app.") ||
    hostname === "app.celeriflow.com.br";

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
    let internalPath = url.pathname === "/" ? "/login" : url.pathname;
    const newPath = `/app-domain${internalPath}`;
    return NextResponse.rewrite(new URL(newPath, req.url));
  }

  return NextResponse.next();
}
