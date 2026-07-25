# Implementação do Sistema de Assinaturas no CeleriFlow

## 1. Objetivo

O objetivo é disponibilizar no CeleriFlow um sistema de assinaturas eletrônicas que seja:

- funcional desde já;
- independente de fornecedores externos;
- reutilizável por todos os módulos;
- compatível com diferentes exigências de prefeituras;
- preparado para futura integração com GOV.BR, ICP-Brasil ou outros provedores;
- rastreável e auditável.

A estratégia é criar um **Serviço Central de Assinaturas**, evitando que cada módulo implemente sua própria lógica.

---

## 2. Arquitetura Geral

```text
Módulos do CeleriFlow
        |
        v
Serviço Central de Assinaturas
        |
        +-- Assinatura Interna CeleriFlow
        +-- Assinatura Externa
        +-- GOV.BR
        +-- ICP-Brasil
        +-- Provedor Customizado
```

Os módulos apenas solicitam uma assinatura ao serviço central.

Exemplos de módulos que poderão utilizar o serviço:

- Processo e Protocolo;
- GED;
- Compras e Contratos;
- Recursos Humanos;
- Tributário;
- Financeiro;
- Educação;
- Saúde;
- Assistência Social;
- Obras;
- Administração;
- Câmara;
- demais módulos que gerem documentos ou atos administrativos.

---

# 3. Modalidades de assinatura

## 3.1. Assinatura interna do CeleriFlow

Será o mecanismo padrão disponível imediatamente.

Fluxo:

```text
Usuário abre documento
        |
        v
Clica em "Assinar"
        |
        v
Sistema apresenta documento e declaração
        |
        v
Usuário confirma identidade
        |
        v
CeleriFlow calcula hash do documento
        |
        v
Registra assinatura
        |
        v
Documento é bloqueado
        |
        v
PDF final recebe identificação da assinatura
```

### Informações registradas

Cada assinatura deve armazenar, no mínimo:

- ID da assinatura;
- ID do tenant/prefeitura;
- ID do usuário;
- nome do usuário;
- CPF, quando disponível e permitido;
- cargo ou função;
- setor/secretaria;
- documento;
- versão do documento;
- processo relacionado;
- data e hora;
- hash SHA-256 do documento;
- método de autenticação utilizado;
- endereço IP;
- user-agent;
- status da assinatura;
- tipo de manifestação;
- dados de auditoria.

---

# 4. Reautenticação

Antes da assinatura, o usuário deverá confirmar sua identidade.

Exemplos:

```text
[ Assinar documento ]

Para confirmar a assinatura, informe novamente sua senha.
```

Também poderão ser suportados futuramente:

- código enviado por e-mail;
- OTP;
- autenticação em dois fatores;
- GOV.BR;
- certificado digital.

A reautenticação deve ser tratada separadamente da autenticação normal da sessão.

---

# 5. Hash do documento

Antes da assinatura, o sistema deverá gerar um hash SHA-256 da versão exata do documento.

Exemplo:

```text
SHA-256:
a94f37c08144c6f58382d8912b49c813...
```

O hash permite detectar qualquer alteração posterior.

Fluxo:

```text
Documento
   |
   v
Gerar versão definitiva
   |
   v
Calcular SHA-256
   |
   v
Registrar assinatura
```

Se o conteúdo for alterado, o hash será diferente e a assinatura anterior não poderá ser considerada vinculada à nova versão.

---

# 6. Imutabilidade e versionamento

Um documento assinado não deverá ser alterado.

```text
Documento
   |
   +-- Versão 1
          |
          +-- Assinada
          |
          +-- BLOQUEADA
```

Caso seja necessária uma alteração:

```text
Documento
   |
   +-- Versão 1 - Assinada
   |
   +-- Versão 2 - Nova versão
                   |
                   +-- Aguardando assinatura
```

Nunca sobrescrever uma versão assinada.

---

# 7. Identificação visual no PDF

Após a assinatura, o PDF poderá receber um rodapé semelhante a:

```text
DOCUMENTO ASSINADO ELETRONICAMENTE

João da Silva
Secretário Municipal de Administração

Assinado em: 25/07/2026 às 10:42

Código de verificação:
CF-8D3F-29A7-C42E

Verifique a autenticidade através do QR Code.
```

O documento poderá conter também um QR Code apontando para a página pública de verificação.

---

# 8. Página pública de verificação

Criar uma rota pública, por exemplo:

```text
/verificar/{codigo}
```

Exemplo:

```text
https://app.celeriflow.com.br/verificar/CF-8D3F-29A7-C42E
```

A página deverá apresentar:

```text
DOCUMENTO AUTÊNTICO

Documento:
Parecer nº 123/2026

Processo:
2026/000452

Assinado por:
João da Silva

Cargo:
Secretário Municipal de Administração

Data:
25/07/2026 às 10:42

Método:
Assinatura Eletrônica CeleriFlow

Hash SHA-256:
a94f37c08144...

Status:
Íntegro
```

Nunca disponibilizar informações sigilosas do documento na página pública.

A página serve somente para validação da autenticidade e integridade.

---

# 9. Assinatura externa

Também deverá existir a opção:

```text
[ Assinar externamente ]
```

Fluxo:

```text
CeleriFlow gera PDF
        |
        v
Usuário baixa o documento
        |
        v
Documento é assinado externamente
        |
        +-- GOV.BR
        +-- ICP-Brasil
        +-- Assinador da prefeitura
        +-- Outro fornecedor
        |
        v
Usuário envia o PDF assinado
        |
        v
CeleriFlow registra e arquiva
```

Ao receber o documento assinado externamente, registrar:

- documento original;
- documento assinado;
- usuário responsável pelo upload;
- data/hora;
- método informado;
- hash do arquivo recebido;
- observações;
- histórico de auditoria.

Essa funcionalidade permite que o CeleriFlow seja usado imediatamente por prefeituras que já possuem seu próprio assinador.

---

# 10. Serviço Central de Assinaturas

Criar um serviço compartilhado.

Sugestão:

```text
src/
  services/
    signatures/
```

Estrutura conceitual:

```text
signatures/
  index.ts
  types.ts
  signature-service.ts

  providers/
    internal.provider.ts
    external.provider.ts
    govbr.provider.ts
    icpbrasil.provider.ts
    custom.provider.ts
```

---

# 11. Interface de provedores

Os provedores devem implementar uma interface comum.

Exemplo conceitual:

```typescript
interface SignatureProvider {
  prepare(input: PrepareSignatureInput): Promise<PreparedSignature>;

  sign(input: SignDocumentInput): Promise<SignatureResult>;

  validate(input: ValidateSignatureInput): Promise<ValidationResult>;

  getStatus(signatureId: string): Promise<SignatureStatus>;

  cancel?(signatureId: string): Promise<void>;
}
```

Dessa forma, os módulos não precisam conhecer detalhes específicos de GOV.BR, ICP-Brasil ou qualquer outro fornecedor.

---

# 12. Providers previstos

## InternalSignatureProvider

Responsável pela assinatura interna do CeleriFlow.

Status inicial:

```text
ATIVO
```

---

## ExternalSignatureProvider

Responsável pelo processo de download e upload de documentos assinados externamente.

Status inicial:

```text
ATIVO
```

---

## GovBrSignatureProvider

Responsável pela futura integração com assinatura GOV.BR.

Status inicial:

```text
PREPARADO / NÃO CONFIGURADO
```

---

## IcpBrasilSignatureProvider

Responsável pela futura integração com certificado ICP-Brasil ou fornecedor compatível.

Status inicial:

```text
PREPARADO / NÃO CONFIGURADO
```

---

## CustomSignatureProvider

Destinado a integrações específicas solicitadas por determinadas prefeituras.

Status inicial:

```text
PREPARADO / NÃO CONFIGURADO
```

---

# 13. Configuração por prefeitura

Cada tenant poderá definir quais métodos estão disponíveis.

Exemplo:

```json
{
  "signature": {
    "internal": true,
    "external": true,
    "govbr": false,
    "icpBrasil": false,
    "custom": false
  }
}
```

Depois da contratação:

```json
{
  "signature": {
    "internal": true,
    "external": true,
    "govbr": true,
    "icpBrasil": false,
    "custom": false
  }
}
```

---

# 14. Configuração por tipo de documento

Além da configuração geral da prefeitura, deve ser possível definir regras por documento.

Exemplo:

```text
Requerimento interno
Assinatura permitida:
- CeleriFlow

Parecer técnico
Assinatura permitida:
- CeleriFlow
- GOV.BR

Contrato administrativo
Assinatura permitida:
- GOV.BR
- ICP-Brasil

Documento específico
Assinatura permitida:
- Provedor customizado
```

O nível necessário deverá ser configurável, pois cada prefeitura poderá adotar regras próprias.

---

# 15. Tipos de manifestação

O mecanismo não deve se limitar ao botão "Assinar".

Criar manifestações padronizadas:

```text
ASSINAR
DAR CIÊNCIA
APROVAR
REJEITAR
AUTORIZAR
HOMOLOGAR
ATESTAR
ENCAMINHAR
CANCELAR
REVOGAR
```

Cada manifestação gera um registro de auditoria.

Exemplo:

```text
PROCESSO 2026/00457

08:42 - Processo criado por Maria
08:50 - Encaminhado ao RH
09:02 - Recebido por Carlos
09:05 - Carlos registrou ciência
10:31 - Parecer assinado
11:12 - Secretário aprovou
```

---

# 16. Banco de dados

Estrutura conceitual.

## Tabela `document_versions`

```text
id
tenant_id
document_id
version_number
file_url
hash_sha256
status
created_by
created_at
locked_at
```

Status possíveis:

```text
DRAFT
FINAL
SIGNED
SUPERSEDED
CANCELLED
```

---

## Tabela `document_signatures`

```text
id
tenant_id
document_id
document_version_id

user_id
signer_name
signer_document
signer_role

signature_type
provider

document_hash
verification_code

ip_address
user_agent

signed_at
status

metadata
created_at
```

---

## Tabela `process_actions`

Pode ser utilizada para registrar:

```text
ASSINOU
APROVOU
REJEITOU
DEU_CIENCIA
ENCAMINHOU
HOMOLOGOU
ATESTOU
CANCELOU
```

Campos:

```text
id
tenant_id
process_id
document_id
user_id
action
description
ip_address
user_agent
created_at
metadata
```

---

# 17. Código de verificação

Gerar um código único para cada documento ou assinatura.

Exemplo:

```text
CF-8D3F-29A7-C42E
```

O código deverá:

- ser único;
- não ser sequencial;
- não expor IDs internos;
- ser pesquisável;
- permitir consulta pública de autenticidade.

---

# 18. Permissões

O sistema deverá controlar quem pode:

- assinar;
- aprovar;
- homologar;
- dar ciência;
- cancelar;
- baixar documento;
- enviar documento assinado externamente;
- consultar histórico.

Exemplo:

```text
Operador
- gerar documento
- encaminhar

Gestor
- assinar
- aprovar

Secretário
- assinar
- homologar

Controle Interno
- consultar
- auditar

Administrador
- configurar métodos
```

As permissões devem utilizar o RBAC já existente no CeleriFlow.

---

# 19. Auditoria

Todas as ações precisam gerar logs.

Exemplos:

```text
SIGNATURE_REQUESTED
SIGNATURE_COMPLETED
SIGNATURE_FAILED
SIGNATURE_CANCELLED

DOCUMENT_LOCKED
DOCUMENT_VERSION_CREATED

EXTERNAL_DOCUMENT_DOWNLOADED
EXTERNAL_SIGNED_DOCUMENT_UPLOADED

DOCUMENT_VERIFIED
```

O histórico não poderá ser editável pelo usuário.

---

# 20. Fluxo recomendado para implementação inicial

## Etapa 1 — Estrutura central

Criar:

```text
SignatureService
SignatureProvider
InternalSignatureProvider
ExternalSignatureProvider
```

---

## Etapa 2 — Banco

Criar:

```text
document_versions
document_signatures
process_actions
```

---

## Etapa 3 — Versionamento

Implementar:

```text
Documento
  -> versão
  -> finalizar
  -> gerar hash
  -> bloquear
```

---

## Etapa 4 — Assinatura interna

Implementar:

```text
Abrir documento
  -> Assinar
  -> Reautenticar
  -> Confirmar
  -> Hash
  -> Registrar assinatura
  -> Bloquear documento
```

---

## Etapa 5 — PDF

Adicionar:

- identificação do assinante;
- data/hora;
- código de verificação;
- QR Code.

---

## Etapa 6 — Validação pública

Criar:

```text
/verificar/{codigo}
```

---

## Etapa 7 — Assinatura externa

Implementar:

```text
Download PDF
  -> assinatura externa
  -> upload
  -> armazenamento
  -> auditoria
```

---

## Etapa 8 — Configuração por tenant

Criar painel:

```text
Configurações
  > Documentos
     > Assinaturas
```

Configurações:

```text
[x] Assinatura CeleriFlow
[x] Permitir assinatura externa
[ ] GOV.BR
[ ] ICP-Brasil
[ ] Provedor customizado
```

---

# 21. Estado inicial recomendado

Na primeira versão:

```text
Assinatura interna CeleriFlow
STATUS: ATIVO

Assinatura externa
STATUS: ATIVO

GOV.BR
STATUS: PREPARADO

ICP-Brasil
STATUS: PREPARADO

Fornecedor customizado
STATUS: PREPARADO
```

---

# 22. Integração futura com GOV.BR

A arquitetura deverá permitir ativar futuramente:

```text
CeleriFlow
   |
   v
GovBrSignatureProvider
   |
   v
GOV.BR
   |
   v
Documento assinado
   |
   v
CeleriFlow
```

As credenciais e configurações específicas deverão ficar associadas ao tenant.

Nunca armazenar credenciais diretamente no frontend.

Utilizar variáveis de ambiente, secret manager ou estrutura equivalente segura.

---

# 23. Integração futura com ICP-Brasil

Não implementar diretamente certificados A1/A3 no primeiro momento.

Criar somente a abstração:

```text
IcpBrasilSignatureProvider
```

Quando uma prefeitura exigir ICP-Brasil, avaliar a solução utilizada pelo órgão e implementar o adapter correspondente.

Exemplo:

```text
IcpBrasilSignatureProvider
        |
        +-- Provider A
        +-- Provider B
        +-- Assinador da prefeitura
```

---

# 24. O que NÃO fazer agora

Evitar:

- contratar um fornecedor de assinatura antes de existir demanda;
- acoplar módulos diretamente ao GOV.BR;
- implementar uma solução diferente em cada módulo;
- permitir edição de documentos já assinados;
- armazenar somente uma imagem de assinatura;
- considerar uma imagem desenhada com mouse como mecanismo suficiente de integridade;
- sobrescrever PDFs assinados;
- criar IDs públicos sequenciais;
- expor dados sigilosos na página de verificação;
- afirmar que a assinatura interna é ICP-Brasil.

---

# 25. Componente reutilizável

Criar um componente visual comum.

Exemplo:

```tsx
<SignatureAction
  documentId={document.id}
  processId={process.id}
  allowedActions={[
    "SIGN",
    "ACKNOWLEDGE",
    "APPROVE"
  ]}
/>
```

O componente consulta o serviço central para saber:

- quais métodos estão habilitados;
- quais ações o usuário pode executar;
- qual nível de assinatura é exigido;
- se o documento está bloqueado;
- se já existem assinaturas.

---

# 26. Resultado esperado

Ao final desta implementação, o CeleriFlow deverá possuir:

```text
✓ assinatura eletrônica interna;
✓ reautenticação;
✓ hash SHA-256;
✓ versionamento;
✓ imutabilidade de documento assinado;
✓ código de verificação;
✓ QR Code;
✓ página pública de validação;
✓ trilha de auditoria;
✓ assinatura externa;
✓ download/upload de PDF;
✓ múltiplos tipos de manifestação;
✓ configuração por prefeitura;
✓ configuração por documento;
✓ arquitetura multi-provider;
✓ estrutura pronta para GOV.BR;
✓ estrutura pronta para ICP-Brasil;
✓ estrutura pronta para fornecedores customizados.
```

---

# 27. Princípio arquitetural

A regra principal será:

> **Os módulos do CeleriFlow não implementam assinaturas diretamente. Eles solicitam ao Serviço Central de Assinaturas uma manifestação sobre uma versão imutável de um documento.**

Isso permite que o mesmo módulo funcione em diferentes prefeituras, mesmo quando cada cliente utiliza um método de assinatura diferente.

---

# 28. Resumo da solução

```text
                     CELERIFLOW

                         |
                         v

              SERVIÇO DE ASSINATURAS

                         |
       +-----------------+------------------+
       |                 |                  |
       v                 v                  v

   INTERNA            EXTERNA           INTEGRAÇÕES
 CeleriFlow        Download/Upload          |
                                           |
                                +----------+----------+
                                |                     |
                                v                     v
                              GOV.BR              ICP-Brasil
                                                      |
                                                      v
                                               Outros provedores
```

A primeira versão será totalmente funcional utilizando **assinatura interna + assinatura externa**, enquanto GOV.BR, ICP-Brasil e fornecedores específicos serão adicionados por meio de adapters/providers conforme a necessidade de cada prefeitura.
