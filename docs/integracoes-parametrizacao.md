# Configurações e Integrações

O painel `Configurações e Integrações > Conexões e Integrações` centraliza os conectores externos por instalação municipal.

## Ambientes

- `MOCK`: não realiza chamadas de rede. O teste grava uma execução simulada, com identificador `MOCK-*`.
- `HOMOLOGACAO`: reserva os parâmetros para o ambiente de testes do fornecedor. Enquanto não houver adaptador homologado, o teste fica pendente e não envia dados.
- `PRODUCAO`: reserva os parâmetros para o ambiente oficial. Não deve ser ativado sem homologação do fornecedor e validação do responsável municipal.

## Segredos

O sistema não armazena token, senha, chave privada ou certificado no banco de configurações. Informe somente uma referência gerenciada fora da aplicação:

```text
env:CLIENTE_TCE_PB_TOKEN
vault:municipios/lagoa-seca/siconfi
secret://lagoa-seca/whatsapp
```

Os parâmetros públicos e cenários de mock aceitam JSON, mas chaves que possam conter segredo são rejeitadas pela ação do servidor.

## Conectores cadastrados

- TCE-PB/SAGRES, SICONFI, eSocial, EFD-Reinf, DIRF/SEFIP e PNCP.
- NF-e/CT-e, NFS-e, CNAB, OFX, API bancária e PIX/Boleto.
- SMTP, WhatsApp, ICP-Brasil e Diário Oficial.

Cada conector precisa de um adaptador específico e de homologação externa antes do uso real. O catálogo e os testes mock preparam o fluxo de parametrização, mas não substituem layout oficial, credenciais, certificado ou aceite do órgão/instituição.
