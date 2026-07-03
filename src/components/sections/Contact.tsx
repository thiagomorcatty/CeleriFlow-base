"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    message: "É necessário aceitar a política de privacidade",
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
    <section id="contato" className="py-20 bg-muted/50 border-t">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Solicite uma Demonstração
          </h2>
          <p className="text-muted-foreground text-lg">
            Preencha o formulário abaixo e nossa equipe entrará em contato para agendar uma apresentação focada na sua prefeitura.
          </p>
        </div>
        
        <div className="bg-card rounded-xl p-6 sm:p-8 shadow-sm border">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Solicitação Enviada!</h3>
              <p className="text-muted-foreground mb-6">Nossa equipe entrará em contato em breve.</p>
              <Button onClick={() => setIsSuccess(false)}>Enviar nova solicitação</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input id="name" placeholder="Seu nome" {...register("name")} />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo (Opcional)</Label>
                  <Input id="role" placeholder="Ex: Secretário de Finanças" {...register("role")} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization">Órgão Público / Prefeitura *</Label>
                <Input id="organization" placeholder="Ex: Prefeitura de São Paulo" {...register("organization")} />
                {errors.organization && <p className="text-sm text-destructive">{errors.organization.message}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail Institucional *</Label>
                  <Input id="email" type="email" placeholder="seu@email.gov.br" {...register("email")} />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone (Opcional)</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" {...register("phone")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade *</Label>
                  <Input id="city" placeholder="Sua cidade" {...register("city")} />
                  {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado *</Label>
                  <Input id="state" placeholder="UF" {...register("state")} />
                  {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
                </div>
              </div>

              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <input 
                  type="checkbox"
                  id="consent"
                  className="mt-1"
                  {...register("consent")} 
                />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="consent">
                    Aceito a política de privacidade
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Você concorda com nossos termos e políticas de LGPD.
                  </p>
                  {errors.consent && <p className="text-sm text-destructive mt-2">{errors.consent.message}</p>}
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Solicitar Demonstração"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
