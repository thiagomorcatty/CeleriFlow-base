# Lagoa Seca/PB - Checklist de Demonstracao POC: Backup e Restauracao

## Regra de evidencia

Este checklist prepara a demonstracao; itens desmarcados nao podem ser apresentados como executados. Uma copia de tela de configuracao, um runbook ou um arquivo de backup sem restore validado nao comprovam recuperacao. O resultado inicial deste checklist e **PENDENTE**.

## Antes da demonstracao

- [ ] Confirmar que origem e destino sao homologacao e base isolada, respectivamente.
- [ ] Registrar operador, aprovador, horario UTC, RPO e RTO acordados.
- [ ] Criar o diretorio de evidencia e executar os passos 1 e 2 de `docs/LAGOA_SECA_RUNBOOK_BACKUP_RESTORE.md`.
- [ ] Anexar `backup-sha256.txt` e `backup-contents.txt` sem credenciais ou dados pessoais.
- [ ] Registrar o identificador do snapshot/PITR e do destino isolado criado no Neon, se o teste de provedor estiver autorizado.

## Demonstracao restauracao logica

- [ ] Executar o passo 3 da runbook contra a base isolada.
- [ ] Mostrar `pg-restore.log` com codigo de saida `0`.
- [ ] Executar o passo 4 da runbook com `DATABASE_URL` apontando para a base isolada.
- [ ] Mostrar `prisma-migrate-status.txt` e `verify-poc-base.txt` aprovados.
- [ ] Comparar totais de controle de POC entre origem e destino, com valores sensiveis mascarados.
- [ ] Registrar horario de inicio/fim e tempo observado; comparar com RPO/RTO sem declarar conformidade se nao houver metas acordadas.

## Demonstracao funcional apos o restore

Na base isolada, demonstrar e registrar captura ou exportacao de cada resultado:

- [ ] Login com usuario de POC provisionado e acesso ao municipio/base restaurada.
- [ ] Consulta de PPA/LDO/LOA e de uma dotacao da base modelo.
- [ ] Consulta de um ciclo existente de solicitacao, empenho, liquidacao, retencao e pagamento.
- [ ] Consulta de conta bancaria, saldo/fonte e conciliacao da base modelo.
- [ ] Consulta de bem ou estoque e seu historico.
- [ ] Geracao de um relatorio interno existente e consulta de um item do Portal da Transparencia, quando configurado no ambiente isolado.
- [ ] Registro de qualquer falha, dado ausente ou componente que dependa de Firebase, Blob ou configuracao externa.

Evidencia esperada: identificacao mascarada do ambiente restaurado, horario UTC, usuario demonstrador, telas/arquivos gerados e uma ata curta com resultado de cada item. A demonstracao confirma apenas o que foi efetivamente mostrado no destino restaurado.

## Restore pelo provedor Neon

- [ ] Criar, por operador autorizado no console Neon, um destino isolado a partir do snapshot/PITR registrado.
- [ ] Capturar o identificador da operacao e o estado concluido exibido pelo Neon.
- [ ] Executar as validacoes da secao anterior usando a URL segura do destino criado pelo provedor.
- [ ] Anexar a evidencia do provedor, a reconciliacao e a ata de aceite/rejeicao.

Nao marcar este bloco como concluido com `pg_dump`/`pg_restore`: eles demonstram backup e restore logico, nao um restore executado pelo provedor.

## Resultado

| Bloco | Estado inicial | Evidencia necessaria para concluir |
|---|---|---|
| Runbook preparado | Concluido | Documento versionado; nao equivale a teste. |
| Backup logico | Pendente | Arquivo, hash, lista de objetos e horario de execucao. |
| Restore logico | Pendente | `pg-restore.log` com sucesso e validacoes no destino isolado. |
| Restore pelo provedor Neon | Pendente | Operacao/snapshot/PITR concluido, destino isolado e validacoes registradas. |
| Aceite operacional | Pendente | Reconciliacao, tempos observados e assinatura dos responsaveis. |
