# Lagoa Seca/PB - Runbook de Backup e Restauracao

## Status da evidencia

Este e um runbook **preparado**, nao um registro de execucao. Nenhum backup, restore, ponto de recuperacao, RPO ou RTO foi validado para Lagoa Seca por este documento. Somente o registro preenchido na secao final, com evidencia do provedor e validacao no ambiente restaurado, comprova uma restauracao executada.

## Escopo e protecoes

- Executar somente no ambiente de homologacao de Lagoa Seca e em uma base de restauracao isolada, nunca na base de producao.
- O banco principal usa PostgreSQL/Neon; Firebase Authentication e Vercel Blob devem ser verificados separadamente. Este procedimento nao restaura usuarios Firebase nem objetos Blob.
- A restauracao pelo provedor deve ser feita pelo responsavel autorizado no console do provedor, para um branch/base isolado. Nao substituir a base de homologacao existente.
- Nao registrar URLs de conexao, tokens, dados pessoais ou dados contabeis no pacote de evidencia.

## Pre-requisitos

- Responsavel tecnico, aprovador municipal, janela de teste e RPO/RTO definidos e registrados.
- `pg_dump`, `pg_restore`, `psql`, Node.js e dependencias do repositorio disponiveis na maquina operacional.
- Uma base PostgreSQL vazia e isolada, criada pelo provedor, para o restore.
- `SOURCE_DATABASE_URL` aponta para a homologacao e `RESTORE_DATABASE_URL` aponta exclusivamente para a base isolada. Confirmar ambos antes de continuar.

## Procedimento preparado

Executar os comandos abaixo no PowerShell, na raiz do repositorio. Substituir apenas os valores entre `<...>`; nao colocar os valores reais no terminal gravado, capturas ou repositorio.

```powershell
$env:SOURCE_DATABASE_URL = '<URL PostgreSQL direta da homologacao>'
$env:RESTORE_DATABASE_URL = '<URL PostgreSQL direta da base isolada>'
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$evidenceDir = Join-Path $PWD "artifacts\backup-restore-lagoa-seca-$stamp"
New-Item -ItemType Directory -Path $evidenceDir -Force
$backupFile = Join-Path $evidenceDir 'homologacao.backup'
```

1. Confirmar que as duas conexoes nao apontam para o mesmo banco.

```powershell
psql "$env:SOURCE_DATABASE_URL" -X -A -t -c "select current_database() || '|' || coalesce(inet_server_addr()::text, 'local') || '|' || current_user;"
psql "$env:RESTORE_DATABASE_URL" -X -A -t -c "select current_database() || '|' || coalesce(inet_server_addr()::text, 'local') || '|' || current_user;"
```

Evidencia esperada: duas linhas com identificadores de banco distintos; anexar a saida com host e usuario mascarados.

2. Criar e verificar um backup logico da homologacao.

```powershell
pg_dump --format=custom --no-owner --no-privileges --file "$backupFile" "$env:SOURCE_DATABASE_URL"
Get-FileHash -Algorithm SHA256 "$backupFile" | Format-List | Tee-Object -FilePath (Join-Path $evidenceDir 'backup-sha256.txt')
pg_restore --list "$backupFile" | Set-Content -Encoding ascii (Join-Path $evidenceDir 'backup-contents.txt')
```

Evidencia esperada: `homologacao.backup`, hash SHA-256, lista de objetos sem erro e horario de inicio/fim do comando. O hash identifica o artefato testado; nao prova restauracao.

3. Restaurar somente na base isolada e registrar a saida.

```powershell
pg_restore --clean --if-exists --no-owner --no-privileges --exit-on-error --dbname "$env:RESTORE_DATABASE_URL" "$backupFile" 2>&1 | Tee-Object -FilePath (Join-Path $evidenceDir 'pg-restore.log')
```

Evidencia esperada: processo com codigo de saida `0` e `pg-restore.log` sem erro. Se a base isolada nao estiver vazia, interromper e solicitar uma nova base isolada em vez de apontar este comando para outro ambiente.

4. Validar esquema, migrations e dados restaurados.

```powershell
$env:DATABASE_URL = $env:RESTORE_DATABASE_URL
npx prisma migrate status 2>&1 | Tee-Object -FilePath (Join-Path $evidenceDir 'prisma-migrate-status.txt')
npm run verify:poc-base 2>&1 | Tee-Object -FilePath (Join-Path $evidenceDir 'verify-poc-base.txt')
psql "$env:RESTORE_DATABASE_URL" -X -A -t -c "select count(*) from \"Municipio\";" | Tee-Object -FilePath (Join-Path $evidenceDir 'municipios-count.txt')
```

Evidencia esperada: migrations reconhecidas, verificacao da base aprovada e contagem coerente com a homologacao. Capturar tambem a comparacao dos totais definidos para a POC, sem expor valores ou dados pessoais.

5. Executar a demonstracao funcional da POC na base isolada conforme `docs/LAGOA_SECA_CHECKLIST_POC_BACKUP_RESTORE.md`.

## Restore pelo provedor: evidencia distinta e obrigatoria

O `pg_restore` acima e um restore logico de POC. Ele **nao** e evidencia de restore de snapshot/PITR do provedor Neon.

Para testar o restore do provedor, o operador autorizado deve criar no console Neon uma base ou branch isolado a partir de um snapshot/PITR identificado da homologacao, sem promover ou sobrescrever a origem. Registrar no pacote de evidencia:

- nome do projeto, branch/base de origem e branch/base isolado, com identificadores mascarados quando necessario;
- horario UTC selecionado para o ponto de recuperacao, horario de inicio/fim e operador;
- identificador da operacao/snapshot exibido pelo Neon e captura do estado concluido;
- URL de conexao do destino somente em cofre seguro, e a saida mascarada da confirmacao de origem/destino desta runbook;
- resultado das validacoes dos passos 4 e 5 contra esse destino.

Sem esses itens, o estado correto e **runbook preparado; restore pelo provedor nao executado**.

## Registro de execucao

Preencher somente durante uma execucao real.

| Campo | Registro |
|---|---|
| Data/hora UTC e janela aprovada | Pendente |
| Ambiente de origem e destino isolado | Pendente |
| Operador e aprovador | Pendente |
| RPO/RTO acordados e tempos observados | Pendente |
| Hash SHA-256 do backup logico | Pendente |
| Resultado de `pg_restore` | Pendente |
| Resultado do restore Neon (snapshot/PITR) | Pendente |
| Resultado de schema, base POC e reconciliacao | Pendente |
| Resultado da demonstracao funcional | Pendente |
| Excecoes, incidente e decisao de aceite | Pendente |
