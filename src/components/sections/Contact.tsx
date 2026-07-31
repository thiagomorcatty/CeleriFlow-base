"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Send, CheckCircle2, Building2 } from "lucide-react";

const leadSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  role: z.string().optional(),
  organization: z.string().min(2, "Informe o órgão ou prefeitura"),
  city: z.string().min(2, "Informe a cidade"),
  state: z.string().min(2, "Informe o estado"),
  email: z.string().email("Informe um e-mail válido"),
  phone: z.string().optional(),
  moduleInterest: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "É necessário aceitar a política de privacidade e LGPD",
  }),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      moduleInterest: "",
      message: "",
    },
  });

  async function onSubmit(data: LeadFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        reset();
      }
    } catch (error) {
      console.error("Erro ao enviar form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contato" className="py-24 bg-muted/30 border-t relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
        
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary font-medium">
            Atendimento para Prefeituras & Órgãos Públicos
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Agende uma Demonstração Executiva
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Descubra como o CeleriFlow pode transformar a gestão da sua prefeitura. Nossa equipe técnica apresentará a solução focada nas necessidades do seu município.
          </p>
        </div>
        
        <div className="bg-card rounded-2xl p-6 sm:p-10 shadow-xl border backdrop-blur-md">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 mb-6">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-2">Solicitação Recebida com Sucesso!</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm">
                Nossos especialistas em gestão pública entrarão em contato em até 24 horas úteis para agendar a demonstração técnica.
              </p>
              <Button onClick={() => setIsSuccess(false)} variant="outline">
                Enviar nova solicitação
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-semibold">Nome Completo *</Label>
                  <Input id="name" placeholder="Ex: Maria Silva" {...register("name")} />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="font-semibold">Cargo no Órgão Público</Label>
                  <Input id="role" placeholder="Ex: Prefeito(a), Secretário(a), Diretor(a)" {...register("role")} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization" className="font-semibold">Prefeitura ou Órgão Público *</Label>
                <Input id="organization" placeholder="Ex: Prefeitura Municipal de..." {...register("organization")} />
                {errors.organization && <p className="text-xs text-destructive">{errors.organization.message}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold">E-mail Institucional *</Label>
                  <Input id="email" type="email" placeholder="seu.nome@municipio.gov.br" {...register("email")} />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-semibold">Telefone / WhatsApp de Contato</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" {...register("phone")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="font-semibold">Cidade *</Label>
                  <Input id="city" placeholder="Nome do Município" {...register("city")} />
                  {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="font-semibold">Estado (UF) *</Label>
                  <Input id="state" placeholder="UF (ex: SP, MG, RJ)" {...register("state")} />
                  {errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="moduleInterest" className="font-semibold">Área de Maior Interesse</Label>
                <Input id="moduleInterest" placeholder="Ex: Ecossistema Completo, Processo Eletrônico, Tributos ou Financeiro" {...register("moduleInterest")} />
              </div>

              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4 bg-muted/20">
                <input 
                  type="checkbox"
                  id="consent"
                  className="mt-1 accent-primary h-4 w-4 rounded"
                  {...register("consent")} 
                />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="consent" className="text-xs font-semibold cursor-pointer">
                    Concordo com o tratamento de dados segundo a LGPD
                  </Label>
                  <p className="text-[11px] text-muted-foreground">
                    Seus dados serão utilizados exclusivamente para agendamento e contato institucional.
                  </p>
                  {errors.consent && <p className="text-xs text-destructive mt-1">{errors.consent.message}</p>}
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full h-13 text-base shadow-lg shadow-primary/20" disabled={isSubmitting}>
                {isSubmitting ? "Processando Solicitação..." : (
                  <>
                    Solicitar Agendamento de Demonstração
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
