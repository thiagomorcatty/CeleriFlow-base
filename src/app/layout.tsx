import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://celeriflow.com.br"),
  title: {
    default: "CeleriFlow | Gestão pública integrada em nuvem",
    template: "%s | CeleriFlow",
  },
  description: "Processos ágeis, decisões seguras e dados confiáveis para a administração pública.",
  applicationName: "CeleriFlow",
  keywords: ["gestão pública", "ERP governamental", "administração municipal", "processos digitais", "CeleriFlow"],
  authors: [{ name: "Robonuvem Soluções Digitais" }],
  creator: "Robonuvem Soluções Digitais",
  publisher: "Robonuvem Soluções Digitais",
  alternates: { canonical: "/" },
  openGraph: {
    title: "CeleriFlow | Gestão pública integrada em nuvem",
    description: "Processos ágeis, decisões seguras e dados confiáveis para a administração pública.",
    url: "/",
    siteName: "CeleriFlow",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CeleriFlow | Gestão pública integrada em nuvem",
    description: "Processos ágeis, decisões seguras e dados confiáveis para a administração pública.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
