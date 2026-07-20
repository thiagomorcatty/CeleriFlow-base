import SegMobCrudClient from "../components/SegMobCrudClient";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { mapInfracao } from "../data";
import type { SegMobPageConfig } from "../types";

const config: SegMobPageConfig = {
  title: "Autos de Infracao",
  description: "Controle administrativo de infracoes de transito registradas pela fiscalizacao municipal.",
  newLabel: "Novo auto",
  kind: "infracao",
  typeOptions: ["Estacionamento irregular", "Avanco de sinal", "Carga e descarga", "Bloqueio de via", "Transporte irregular"],
  statusOptions: ["Registrado", "Notificado", "Em Recurso", "Pago", "Cancelado"],
  codeLabel: "Numero do auto",
  titleLabel: "Placa",
  typeLabel: "Tipo da infracao",
  locationLabel: "Local",
  showDate: true,
  showPlate: true,
  showValue: true,
  accentClass: "bg-cyan-700 hover:bg-cyan-800",
};

export default async function InfracoesPage() {
  const { prisma } = await getTenantContextForModule("SEGURANCA");
  const infracoes = await prisma.segurancaInfracao.findMany({ orderBy: { createdAt: "desc" } });
  return <SegMobCrudClient items={infracoes.map(mapInfracao)} config={config} />;
}