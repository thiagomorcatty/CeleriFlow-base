"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, ArrowRight, ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Estado para controlar a visualização (Login vs Esqueci a Senha)
  const [view, setView] = useState<"login" | "reset" | "reset-success">("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redireciona para o dashboard pós-login
      router.push("/app-domain");
    } catch (error: any) {
      console.error(error);
      setErrorMsg("E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    
    try {
      await sendPasswordResetEmail(auth, email);
      setView("reset-success");
    } catch (error: any) {
      console.error(error);
      setErrorMsg("Ocorreu um erro. Verifique se o e-mail está correto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background overflow-hidden relative">
      {/* Elementos decorativos */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] mix-blend-screen" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl p-8 transition-all duration-300">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <span className="text-2xl font-bold text-white tracking-tighter">CF</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              CeleriFlow App
            </h1>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {view === "login" && "Acesse a plataforma de gestão integrada"}
              {view === "reset" && "Redefina sua senha de acesso"}
              {view === "reset-success" && "Pronto!"}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive text-sm text-center font-medium">
              {errorMsg}
            </div>
          )}

          {view === "login" && (
            <form onSubmit={handleLogin} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    E-mail Institucional
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="voce@prefeitura.gov.br"
                      className="pl-10 h-12 bg-muted/50 border-transparent transition-all focus:bg-background focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Senha
                    </Label>
                    <Button 
                      type="button"
                      variant="link" 
                      onClick={() => { setView("reset"); setErrorMsg(""); }}
                      className="px-0 font-normal h-auto text-xs text-primary/70 hover:text-primary"
                    >
                      Esqueceu a senha?
                    </Button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-12 bg-muted/50 border-transparent transition-all focus:bg-background focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Entrar no Sistema
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          )}

          {view === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Seu E-mail
                  </Label>
                  <p className="text-xs text-muted-foreground pb-2">
                    Enviaremos um link para você cadastrar uma nova senha.
                  </p>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="voce@prefeitura.gov.br"
                      className="pl-10 h-12 bg-muted/50 border-transparent transition-all focus:bg-background focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Enviar Link de Recuperação"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => { setView("login"); setErrorMsg(""); }}
                  className="w-full h-12 text-sm text-muted-foreground"
                  disabled={isLoading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar para o Login
                </Button>
              </div>
            </form>
          )}

          {view === "reset-success" && (
            <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 duration-500 py-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">E-mail Enviado!</h3>
                <p className="text-sm text-muted-foreground">
                  Verifique a caixa de entrada de <strong className="text-foreground">{email}</strong>.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setView("login")}
                className="w-full h-12"
              >
                Voltar para o Login
              </Button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border/50 flex flex-col items-center justify-center gap-2">
            <p className="text-xs text-muted-foreground text-center uppercase tracking-widest font-medium">
              Developed by
            </p>
            <Image 
              src="/logo_robonuvem.png" 
              alt="Robonuvem" 
              width={70} 
              height={20}
              className="object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
