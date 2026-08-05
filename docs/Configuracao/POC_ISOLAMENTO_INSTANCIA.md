# Isolamento de Instancia da POC

Cada contrato/POC deve usar uma instalacao dedicada: banco, projeto Firebase, token Blob e variaveis de ambiente proprios.

Configure um identificador imutavel e exclusivo para a instalacao:

```text
CELERIFLOW_INSTANCE_ID=poc-nova-cidade
```

O valor aceita apenas letras minusculas, numeros e hifens. Todos os novos documentos e relatorios sao gravados em `instances/<id>/documents/`; arquivos de outra instancia sao recusados no download.

O reset administrativo permanece bloqueado por padrao. Para habilita-lo temporariamente em uma POC isolada, configure tambem:

```text
CELERIFLOW_POC_RESET_ENABLED=true
NEXT_PUBLIC_POC_MODE=true
```

O administrador deve digitar `RESETAR POC` para executar a operacao. Nunca habilite essa variavel em producao ou em uma base compartilhada.
