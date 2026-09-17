"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Building2,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const leadSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo"),
  role: z.string().optional(),
  organization: z.string().min(2, "Informe o nome da Prefeitura ou órgão"),
  city: z.string().min(2, "Informe a cidade"),
  state: z.string().min(2, "Informe o estado"),
  email: z.string().email("Informe um e-mail corporativo ou oficial válido"),
  phone: z.string().min(8, "Informe um telefone ou WhatsApp de contato"),
  moduleInterest: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((value) => value === true, {
    message: "É necessário aceitar a política de privacidade",
  }),
});

type LeadFormValues = z.infer<typeof leadSchema>;

function getErrorMessage(payload: unknown) {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "error" in payload &&
    typeof payload.error === "string"
  ) {
    return payload.error;
  }

  return "Não foi possível registrar sua solicitação. Tente novamente em instantes.";
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      role: "",
      organization: "",
      city: "",
      state: "",
      email: "",
      phone: "",
      moduleInterest: "Visão completa do CeleriFlow (28 módulos)",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(values: LeadFormValues) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(getErrorMessage(payload));
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Não foi possível registrar sua solicitação. Tente novamente em instantes.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contato" className="relative overflow-hidden border-t border-slate-800 bg-slate-950 py-24 text-slate-100">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[160px]" />

      <div className="container relative z-10 mx-auto max-w-4xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4 border-blue-500/40 bg-blue-950/60 px-4 py-1 font-medium text-blue-300">
            <Sparkles className="mr-1.5 h-3.5 w-3.5 text-blue-400" />
            Para prefeituras, câmaras e entidades públicas
          </Badge>
          <h2 className="mb-4 font-heading text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl md:text-5xl">
            Solicite uma apresentação técnica.
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            Conte um pouco sobre o seu órgão e suas prioridades. A solicitação será registrada para avaliação da equipe responsável.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          {isSuccess ? (
            <div className="py-12 text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="mb-2 font-heading text-2xl font-bold text-slate-100">Solicitação registrada.</h3>
              <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-slate-400">
                Obrigado pelo interesse no CeleriFlow. A equipe responsável avaliará as informações enviadas para orientar os próximos passos.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/docs/catalogo-tecnico-celeriflow-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-emerald-300 underline underline-offset-4 hover:text-emerald-200"
                >
                  Consultar catálogo técnico
                </a>
                <Button onClick={() => setIsSuccess(false)} className="bg-slate-800 text-slate-200 hover:bg-slate-700">
                  Enviar outra solicitação
                </Button>
              </div>
            </div>
          ) : (
            <form noValidate aria-busy={isSubmitting} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                    <User className="h-3.5 w-3.5 text-blue-400" /> Nome completo *
                  </Label>
                  <Input id="name" autoComplete="name" placeholder="Ex.: Juliana Silveira" {...register("name")} className="h-11 border-slate-800 bg-slate-950 text-sm text-slate-100 focus:border-blue-500" />
                  {errors.name && <p role="alert" className="text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-xs font-semibold text-slate-300">Cargo ou função no órgão</Label>
                  <Input id="role" autoComplete="organization-title" placeholder="Ex.: Secretário(a) de Finanças" {...register("role")} className="h-11 border-slate-800 bg-slate-950 text-sm text-slate-100 focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="organization" className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                    <Building2 className="h-3.5 w-3.5 text-blue-400" /> Prefeitura, Câmara ou órgão público *
                  </Label>
                  <Input id="organization" autoComplete="organization" placeholder="Ex.: Prefeitura Municipal de ..." {...register("organization")} className="h-11 border-slate-800 bg-slate-950 text-sm text-slate-100 focus:border-blue-500" />
                  {errors.organization && <p role="alert" className="text-xs text-red-400">{errors.organization.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                    <MapPin className="h-3.5 w-3.5 text-blue-400" /> Cidade *
                  </Label>
                  <Input id="city" autoComplete="address-level2" placeholder="Ex.: Município" {...register("city")} className="h-11 border-slate-800 bg-slate-950 text-sm text-slate-100 focus:border-blue-500" />
                  {errors.city && <p role="alert" className="text-xs text-red-400">{errors.city.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-xs font-semibold text-slate-300">Estado (UF) *</Label>
                  <Input id="state" autoComplete="address-level1" placeholder="Ex.: PB" {...register("state")} className="h-11 border-slate-800 bg-slate-950 text-sm text-slate-100 focus:border-blue-500" />
                  {errors.state && <p role="alert" className="text-xs text-red-400">{errors.state.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                    <Mail className="h-3.5 w-3.5 text-blue-400" /> E-mail institucional *
                  </Label>
                  <Input id="email" type="email" autoComplete="email" placeholder="seu.nome@prefeitura.gov.br" {...register("email")} className="h-11 border-slate-800 bg-slate-950 text-sm text-slate-100 focus:border-blue-500" />
                  {errors.email && <p role="alert" className="text-xs text-red-400">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                    <Phone className="h-3.5 w-3.5 text-blue-400" /> Telefone ou WhatsApp *
                  </Label>
                  <Input id="phone" type="tel" autoComplete="tel" placeholder="(83) 99999-0000" {...register("phone")} className="h-11 border-slate-800 bg-slate-950 text-sm text-slate-100 focus:border-blue-500" />
                  {errors.phone && <p role="alert" className="text-xs text-red-400">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="moduleInterest" className="text-xs font-semibold text-slate-300">Principal interesse</Label>
                  <select id="moduleInterest" {...register("moduleInterest")} className="h-11 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 text-sm text-slate-100 outline-none focus:border-blue-500">
                    <option value="Visão completa do CeleriFlow (28 módulos)">Visão completa do CeleriFlow (28 módulos)</option>
                    <option value="Catálogo Técnico e Funcional (PDF)">Catálogo Técnico e Funcional (PDF)</option>
                    <option value="Processos e Relacionamento">Processos e Relacionamento</option>
                    <option value="Gestão Corporativa">Gestão Corporativa</option>
                    <option value="Políticas Públicas Setoriais">Políticas Públicas Setoriais</option>
                    <option value="Integrações e Implantação">Integrações e Implantação</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-semibold text-slate-300">Mensagem ou contexto adicional</Label>
                <textarea id="message" rows={4} placeholder="Descreva as áreas prioritárias ou a necessidade do órgão." {...register("message")} className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-slate-100 outline-none focus:border-blue-500" />
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <input id="consent" type="checkbox" {...register("consent")} className="mt-1 rounded border-slate-800 bg-slate-950 text-blue-500 focus:ring-blue-500" />
                <Label htmlFor="consent" className="text-xs font-normal leading-normal text-slate-400">
                  Autorizo o uso dos dados informados para atendimento desta solicitação, conforme a{" "}
                  <Link href="/privacidade" className="text-blue-300 underline underline-offset-2 hover:text-blue-200">Política de Privacidade</Link>.
                </Label>
              </div>
              {errors.consent && <p role="alert" className="text-xs text-red-400">{errors.consent.message}</p>}

              {submitError && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{submitError}</p>}

              <Button type="submit" disabled={isSubmitting} className="h-13 w-full rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 text-base font-bold text-white shadow-xl shadow-blue-500/20 hover:from-blue-500 hover:to-emerald-400">
                {isSubmitting ? "Registrando solicitação..." : "Solicitar apresentação técnica"}
                <Send className="ml-2 h-4 w-4" />
              </Button>

              <div className="flex items-center justify-center gap-2 pt-2 text-center text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>Os dados serão usados para atender esta solicitação, conforme a política publicada.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
