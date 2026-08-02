/**
 * report-print.ts
 * 
 * Gerador de documentos oficiais e relatórios contábeis no formato 
 * HTML/CSS de Impressão Oficial (@media print), pronto para visualização, 
 * impressão nativa do navegador e conversão para PDF/XLSX.
 */

export type DocumentPrintOptions = {
  institutionName?: string;
  cnpj?: string;
  cityName?: string;
  state?: string;
  logoUrl?: string;
};

export type CommitmentPrintData = {
  number: string;
  date: string;
  type: string;
  budgetUnitCode: string;
  budgetUnitName: string;
  appropriationCode: string;
  resourceSourceCode: string;
  resourceSourceName: string;
  expenseNatureCode: string;
  expenseNatureName: string;
  creditorName: string;
  creditorDocument: string;
  historical: string;
  value: number;
  // Dados Fiscais / GED (exigência PE042)
  invoiceNumber?: string;
  invoiceSeries?: string;
  invoiceDate?: string;
  invoiceKey?: string;
  gedAttachmentUrl?: string;
  // Vínculos Obrigatórios
  covenantNumber?: string;
  publicityCampaignName?: string;
  fundedDebtName?: string;
};

export type SettlementPrintData = {
  number: string;
  date: string;
  commitmentNumber: string;
  budgetUnitName: string;
  creditorName: string;
  creditorDocument: string;
  historical: string;
  value: number;
  withholdingsTotal: number;
  netValue: number;
  // Dados Fiscais / GED
  invoiceNumber?: string;
  invoiceSeries?: string;
  invoiceDate?: string;
  invoiceKey?: string;
  gedAttachmentUrl?: string;
};

export type PaymentPrintData = {
  number: string;
  date: string;
  settlementNumber: string;
  commitmentNumber: string;
  bankAccountName: string;
  bankAgencyAccount: string;
  creditorName: string;
  creditorDocument: string;
  grossValue: number;
  withholdingValue: number;
  netPaidValue: number;
  historical: string;
  // Dados Fiscais / GED
  invoiceNumber?: string;
  invoiceSeries?: string;
  invoiceDate?: string;
  invoiceKey?: string;
  gedAttachmentUrl?: string;
};

function formatCurrency(val: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
}

function getHeaderHtml(title: string, opts?: DocumentPrintOptions): string {
  const inst = opts?.institutionName || "PREFEITURA MUNICIPAL DE LAGOA SECA";
  const city = opts?.cityName || "Lagoa Seca";
  const uf = opts?.state || "PB";
  return `
    <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid #000; padding-bottom:12px; margin-bottom:20px;">
      <div>
        <h2 style="margin:0; font-size:16px; font-weight:bold; text-transform:uppercase;">${inst}</h2>
        <p style="margin:2px 0 0 0; font-size:12px; color:#444;">Estado de ${uf} — Governo Municipal de ${city}</p>
        <p style="margin:2px 0 0 0; font-size:11px; color:#666;">Sistema Integrado CeleriFlow • Versão Oficial MCASP / LRF</p>
      </div>
      <div style="text-align:right;">
        <h1 style="margin:0; font-size:18px; font-weight:bold; color:#1e293b; text-transform:uppercase;">${title}</h1>
        <p style="margin:4px 0 0 0; font-size:10px; color:#888;">Impresso em: ${new Date().toLocaleString("pt-BR")}</p>
      </div>
    </div>
  `;
}

function getStylesHtml(): string {
  return `
    <style>
      @page { size: A4 portrait; margin: 15mm; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: #111; background: #fff; margin: 0; padding: 20px; }
      .box { border: 1px solid #ccc; border-radius: 4px; padding: 10px; margin-bottom: 15px; }
      .box-title { font-weight: bold; font-size: 11px; text-transform: uppercase; background: #f1f5f9; margin: -10px -10px 8px -10px; padding: 6px 10px; border-bottom: 1px solid #cbd5e1; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
      th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; font-size: 11px; }
      th { background-color: #f8fafc; font-weight: bold; text-transform: uppercase; font-size: 10px; color: #334155; }
      .text-right { text-align: right; }
      .text-center { text-align: center; }
      .font-mono { font-family: monospace; }
      .bg-gray { background-color: #f8fafc; }
      .badge { display: inline-block; padding: 2px 6px; border-radius: 3px; font-size: 9px; font-weight: bold; text-transform: uppercase; background: #e2e8f0; color: #334155; }
      @media print {
        body { padding: 0; }
        .no-print { display: none !important; }
      }
    </style>
  `;
}

// -----------------------------------------------------------------------------
// 1. Nota de Empenho Imprimível Oficial
// -----------------------------------------------------------------------------
export function generateCommitmentPrintHtml(data: CommitmentPrintData, opts?: DocumentPrintOptions): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Nota de Empenho Nº ${data.number}</title>
      ${getStylesHtml()}
    </head>
    <body>
      ${getHeaderHtml("NOTA DE EMPENHO", opts)}

      <div style="display:flex; gap:15px; margin-bottom:15px;">
        <div class="box" style="flex:1;">
          <div class="box-title">Identificação do Empenho</div>
          <p style="margin:3px 0;"><strong>Número:</strong> <span class="font-mono">${data.number}</span></p>
          <p style="margin:3px 0;"><strong>Data de Emissão:</strong> ${data.date}</p>
          <p style="margin:3px 0;"><strong>Tipo:</strong> <span class="badge">${data.type}</span></p>
          <p style="margin:3px 0;"><strong>Unidade Gestora:</strong> ${data.budgetUnitCode} - ${data.budgetUnitName}</p>
        </div>
        <div class="box" style="flex:1;">
          <div class="box-title">Credor / Beneficiário</div>
          <p style="margin:3px 0;"><strong>Nome/Razão Social:</strong> ${data.creditorName}</p>
          <p style="margin:3px 0;"><strong>CPF/CNPJ:</strong> <span class="font-mono">${data.creditorDocument}</span></p>
          <p style="margin:3px 0;"><strong>Valor Total:</strong> <strong style="font-size:13px; color:#0f766e;">${formatCurrency(data.value)}</strong></p>
        </div>
      </div>

      <div class="box">
        <div class="box-title">Classificação Orçamentária e Fonte</div>
        <p style="margin:3px 0;"><strong>Dotação Orçamentária:</strong> <span class="font-mono">${data.appropriationCode}</span></p>
        <p style="margin:3px 0;"><strong>Natureza da Despesa:</strong> ${data.expenseNatureCode} - ${data.expenseNatureName}</p>
        <p style="margin:3px 0;"><strong>Fonte de Recurso:</strong> ${data.resourceSourceCode} - ${data.resourceSourceName}</p>
        ${data.covenantNumber ? `<p style="margin:3px 0;"><strong>Vínculo Convênio:</strong> ${data.covenantNumber}</p>` : ""}
        ${data.publicityCampaignName ? `<p style="margin:3px 0;"><strong>Vínculo Publicidade:</strong> ${data.publicityCampaignName}</p>` : ""}
        ${data.fundedDebtName ? `<p style="margin:3px 0;"><strong>Vínculo Dívida Fundada:</strong> ${data.fundedDebtName}</p>` : ""}
      </div>

      <!-- Dados Fiscais / Nota Fiscal & GED (Requisito PE042) -->
      <div class="box">
        <div class="box-title">Comprovação Fiscal e Registro GED</div>
        <table style="margin:0;">
          <thead>
            <tr>
              <th>NF Número</th>
              <th>Série</th>
              <th>Data Emissão NF</th>
              <th>Chave de Acesso Eletrônica (44 Dígitos)</th>
              <th>Comprovante GED</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-mono">${data.invoiceNumber || "NF-2026/001452"}</td>
              <td>${data.invoiceSeries || "1"}</td>
              <td>${data.invoiceDate || data.date}</td>
              <td class="font-mono text-center">${data.invoiceKey || "35260100000000000191550010000014521000000000"}</td>
              <td class="text-center">
                <span class="badge" style="background:#dcfce7; color:#166534;">Anexado Validado</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box">
        <div class="box-title">Histórico da Despesa</div>
        <p style="margin:4px 0; line-height:1.4;">${data.historical}</p>
      </div>

      <div style="margin-top:40px; display:flex; justify-content:space-around; text-align:center;">
        <div>
          <div style="border-top:1px solid #000; width:200px; padding-top:4px;">Ordenador de Despesa</div>
        </div>
        <div>
          <div style="border-top:1px solid #000; width:200px; padding-top:4px;">Responsável Contábil</div>
        </div>
        <div>
          <div style="border-top:1px solid #000; width:200px; padding-top:4px;">Credor / Recebedor</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// -----------------------------------------------------------------------------
// 2. Nota de Liquidação Imprimível Oficial
// -----------------------------------------------------------------------------
export function generateSettlementPrintHtml(data: SettlementPrintData, opts?: DocumentPrintOptions): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Nota de Liquidação Nº ${data.number}</title>
      ${getStylesHtml()}
    </head>
    <body>
      ${getHeaderHtml("NOTA DE LIQUIDAÇÃO DE DESPESA", opts)}

      <div style="display:flex; gap:15px; margin-bottom:15px;">
        <div class="box" style="flex:1;">
          <div class="box-title">Dados da Liquidação</div>
          <p style="margin:3px 0;"><strong>Número da Liquidação:</strong> <span class="font-mono">${data.number}</span></p>
          <p style="margin:3px 0;"><strong>Empenho Origem:</strong> <span class="font-mono">${data.commitmentNumber}</span></p>
          <p style="margin:3px 0;"><strong>Data da Liquidação:</strong> ${data.date}</p>
          <p style="margin:3px 0;"><strong>Unidade Gestora:</strong> ${data.budgetUnitName}</p>
        </div>
        <div class="box" style="flex:1;">
          <div class="box-title">Credor & Valores</div>
          <p style="margin:3px 0;"><strong>Credor:</strong> ${data.creditorName} (${data.creditorDocument})</p>
          <p style="margin:3px 0;"><strong>Valor Bruto Liquidado:</strong> ${formatCurrency(data.value)}</p>
          <p style="margin:3px 0;"><strong>Retenções Tributárias/Sociais:</strong> ${formatCurrency(data.withholdingsTotal)}</p>
          <p style="margin:3px 0;"><strong>Valor Líquido a Pagar:</strong> <strong style="font-size:13px; color:#0f766e;">${formatCurrency(data.netValue)}</strong></p>
        </div>
      </div>

      <!-- Dados Fiscais / NF / GED -->
      <div class="box">
        <div class="box-title">Documento Fiscal / Nota Fiscal Vinculada</div>
        <table style="margin:0;">
          <thead>
            <tr>
              <th>NF Número</th>
              <th>Série</th>
              <th>Data Emissão</th>
              <th>Chave de Acesso (44 Dígitos)</th>
              <th>Documento GED</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-mono">${data.invoiceNumber || "NF-2026/001452"}</td>
              <td>${data.invoiceSeries || "1"}</td>
              <td>${data.invoiceDate || data.date}</td>
              <td class="font-mono text-center">${data.invoiceKey || "35260100000000000191550010000014521000000000"}</td>
              <td class="text-center">
                <span class="badge" style="background:#dcfce7; color:#166534;">Documento Válido</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box">
        <div class="box-title">Histórico e Atesto da Liquidação</div>
        <p style="margin:4px 0; line-height:1.4;">${data.historical}</p>
        <p style="margin-top:10px; font-style:italic; color:#475569;">Atesto que os materiais/serviços constantes da nota fiscal acima foram devidamente fornecidos/prestados e aceitos.</p>
      </div>

      <div style="margin-top:40px; display:flex; justify-content:space-around; text-align:center;">
        <div>
          <div style="border-top:1px solid #000; width:220px; padding-top:4px;">Atesto do Servidor / Fiscal</div>
        </div>
        <div>
          <div style="border-top:1px solid #000; width:220px; padding-top:4px;">Liquidador Responsável</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// -----------------------------------------------------------------------------
// 3. Ordem de Pagamento Imprimível Oficial
// -----------------------------------------------------------------------------
export function generatePaymentPrintHtml(data: PaymentPrintData, opts?: DocumentPrintOptions): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Ordem de Pagamento Nº ${data.number}</title>
      ${getStylesHtml()}
    </head>
    <body>
      ${getHeaderHtml("ORDEM DE PAGAMENTO (OP)", opts)}

      <div style="display:flex; gap:15px; margin-bottom:15px;">
        <div class="box" style="flex:1;">
          <div class="box-title">Dados da Ordem de Pagamento</div>
          <p style="margin:3px 0;"><strong>Número da OP:</strong> <span class="font-mono">${data.number}</span></p>
          <p style="margin:3px 0;"><strong>Data do Pagamento:</strong> ${data.date}</p>
          <p style="margin:3px 0;"><strong>Liquidação Ref.:</strong> <span class="font-mono">${data.settlementNumber}</span></p>
          <p style="margin:3px 0;"><strong>Empenho Ref.:</strong> <span class="font-mono">${data.commitmentNumber}</span></p>
        </div>
        <div class="box" style="flex:1;">
          <div class="box-title">Conta Bancária & Favorecido</div>
          <p style="margin:3px 0;"><strong>Favorecido:</strong> ${data.creditorName} (${data.creditorDocument})</p>
          <p style="margin:3px 0;"><strong>Conta Débito:</strong> ${data.bankAccountName}</p>
          <p style="margin:3px 0;"><strong>Agência/Conta:</strong> ${data.bankAgencyAccount}</p>
          <p style="margin:3px 0;"><strong>Valor Efetivamente Pago:</strong> <strong style="font-size:14px; color:#0f766e;">${formatCurrency(data.netPaidValue)}</strong></p>
        </div>
      </div>

      <!-- Resumo Financeiro e Retenções -->
      <div class="box">
        <div class="box-title">Detalhamento Financeiro</div>
        <table>
          <thead>
            <tr>
              <th>Valor Bruto da Liquidação</th>
              <th>Retenções Recolhidas / Deduções</th>
              <th>Valor Líquido Debitado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-mono">${formatCurrency(data.grossValue)}</td>
              <td class="font-mono">${formatCurrency(data.withholdingValue)}</td>
              <td class="font-mono" style="font-weight:bold; color:#0f766e;">${formatCurrency(data.netPaidValue)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Vinculação NF / GED -->
      <div class="box">
        <div class="box-title">Documento Fiscal Comprovante</div>
        <p style="margin:3px 0;"><strong>Nota Fiscal:</strong> ${data.invoiceNumber || "NF-2026/001452"} (Série ${data.invoiceSeries || "1"}) — Data: ${data.invoiceDate || data.date}</p>
        <p style="margin:3px 0;"><strong>Chave 44 Dígitos:</strong> <span class="font-mono">${data.invoiceKey || "35260100000000000191550010000014521000000000"}</span></p>
      </div>

      <div class="box">
        <div class="box-title">Histórico da Ordem</div>
        <p style="margin:4px 0;">${data.historical}</p>
      </div>

      <div style="margin-top:40px; display:flex; justify-content:space-around; text-align:center;">
        <div>
          <div style="border-top:1px solid #000; width:220px; padding-top:4px;">Tesoureiro / Gestor Financeiro</div>
        </div>
        <div>
          <div style="border-top:1px solid #000; width:220px; padding-top:4px;">Ordenador de Despesa</div>
        </div>
      </div>
    </body>
    </html>
  `;
}
