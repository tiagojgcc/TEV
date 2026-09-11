# TEV — estado, convenções e como reconstruir

Projeto de apoio à decisão sobre tromboembolismo venoso (TEV), do Dr. Tiago Guimarães Costa (Medicina Interna). Duas ferramentas HTML autónomas, offline (`file://`), sem dependências externas.

## As duas ferramentas
- **TEV na Pratica.html** — urgência/enfermaria. Suspeita → diagnóstico → estratificação → internar/alta → anticoagulação; nó do subsegmentar isolado; alta do internado. NÃO decide duração da anticoagulação (isso é da consulta).
- **TEV Consulta.html** — a consulta pessoal do Tiago, visita dos ~3 meses. Tabela 11 (recorrência) → risco hemorrágico ACCP → parar/continuar/reduzir → estudo etiológico → rastreio de complicações. Tem imagens das tabelas ESC embebidas e um modal "Armadilhas".

## Como está construído (sistema de montagem)
Cada ferramenta é **montada a partir de ficheiros-parte** nesta pasta (`_fonte/`). NÃO editar o HTML montado diretamente — editar as partes e voltar a montar com `build.sh`.

- **Geral** = `g1 + g2 + g3 + g4 + g5` (concatenação simples).
  - `g1` — `<head>`, CSS, cabeçalho, rodapé, cartão da nota, modais (atalhos, bibliografia, `m_situ`).
  - `g2` — motor (estado, snapshots, navegação) + `buildNote()` + helpers (`info`, `chk`).
  - `g3` — landing, suspeita TEP (instável, grávida/YEARS, probabilidade, PERC, D-dímeros, angio-TC gate + resultado, confirmado, **nó do subsegmentar isolado**), suspeita TVP fica em g4.
  - `g4` — TVP (Wells, D-dímeros, eco, proximal/distal/TVS, sem-eco) + escolha de anticoagulação partilhada (`AC`, `ac_pick`, `ac_fim`).
  - `g5` — confirmado: `conf_strat` (estratificação ESC + AHA opcional), alto risco, destino/abordagem, Hestia/alta precoce, alta do internado.
- **Consulta** = `c1 + c2(com imagens) + c3`.
  - `c1` — `<head>`, CSS, cabeçalho, rodapé, cartão da nota.
  - `c2` — modais: Tabelas ESC (placeholders `%%T3%% %%T11%%` substituídos por base64 no build), Armadilhas, Bibliografia.
  - `c3` — motor + todos os ecrãs da consulta.
- Imagens (recortes das tabelas ESC dos PDFs): `tab3.jpg` (fatores predisponentes por odds ratio) e `tab11.jpg` (recorrência), embebidas como data-URI na Consulta. `tab4.jpg`/`tab8.jpg` ficaram obsoletos (já não usados; o Tiago retirou-os por não terem interesse na consulta).

Reconstruir: correr `bash build.sh` nesta pasta → produz os dois HTML.

## Referencial clínico
- **ESC 2019** é a espinha dorsal do TEP (Eur Heart J 2020;41:543). Próxima ESC prevista para 2027.
- **AHA/ACC 2026** (Circulation 2026;153:e977) entra em pontos concretos: classificação A–E (+R), HBPM>HNF (Classe 1 B-R), anticoagular antes da imagem se alta suspeita.
- A AHA é **opcional** na estratificação (painel que se abre); só ela identifica candidatos a trombólise dirigida por cateter (HI-PEITHO).
- Fontes-chave usadas: YEARS (Lancet 2017), ADJUST-PE (idade×10), PERC, Genebra revisto (default) / Wells (secundário), sPESI, Hestia/HOME-PE, PEITHO (lise sistémica, só resgate) vs HI-PEITHO (cateter, NEJM 2026), Artemis (gravidez), CALISTO/SURPRISE (TVS), CACTUS (TVP distal), ESC Tab. suplementar 9 + Le Gal 2022 + Nicoletto 2026 (subsegmentar), Tabela 11 + HERDOO2 + ACCP (consulta).

## Convenções de estilo/linguagem (NÃO regredir)
- Português europeu (pt-PT). Termos técnicos em inglês quando é o padrão.
- **"D-dímeros"** (plural). **"Abordagem"**, nunca "Conduta". µg/L nunca em maiúsculas.
- Frequência das doses: **`1x/dia`, `2x/dia`** (NÃO "id", "qd", "12/12h").
- Portais/encaminhamento por **situação clínica**, nunca por categoria profissional.
- **Anticardiolipina** por extenso (com `(aCL)` só como clarificador): "aCL" isolado lê-se como anticoagulante lúpico (AL) e cria ambiguidade — evitar.
- Uma pergunta/decisão por ecrã. Detalhe extra vai para um `ⓘ` (`info()`), opcional.
- Rodapé: disclaimer numa linha, e **"Tiago Guimarães Costa · Medicina Interna · 2026"** na linha de baixo.

## Formato da nota clínica (buildNote)
Exemplos canónicos (o Tiago validou estes):
```
# TEP de baixo risco (AHA/ACC: B2)
- Probabilidade clínica (Genebra revisto): 0 pontos - baixa.
- PERC 1/8 > D-dímeros 5555 µg/L (YEARS 0, limiar 1000 µg/L) > angio-TC: TEP confirmado.
- Estratificação: sem instabilidade HD, sem disfunção do VD, troponina negativa, sPESI 0.
- Abordagem: alta precoce (baixo risco, Hestia 0).
- Pedido de consulta de Medicina Interna - TEV.
- Anticoagulação: edoxabano 60 mg 1x/dia, após 5 dias de enoxaparina (manter até à consulta).
```
Regras: título "TEP de baixo/alto risco" ou "de risco intermédio-…"; marcha diagnóstica com ` > `; estratificação por ordem hemodinâmica → respiratório → VD → troponina → sPESI (vírgulas); "Abordagem" curta; linha "Candidato a trombólise dirigida por cateter (…)" só quando a AHA está classificada e é candidato; "Pedido de consulta de Medicina Interna - TEV" nas altas ambulatórias; anticoagulação termina com "(manter até à consulta)". Enoxaparina mostra só a dose calculada, ex.: "(90 mg 2x/dia)".

## Subsegmentar isolado (decisão de design)
Ramifica **antes** da estratificação → nunca é classificado pela AHA. Nó "anticoagular vs vigiar" (à imagem da TVP distal). Critérios validados (ESC Tab. supl. 9): neoplasia, TEV prévio, não provocado, sintomático, internado/imóvel, reserva cardiopulmonar reduzida, múltiplos defeitos, TVP concomitante. Ramo vigilância termina sem anticoagulação e sem AHA.

## Correções clínicas já feitas (não repetir os erros)
- Risco hemorrágico ACCP (consulta): idade é **um seletor único** (<65 / 65–74 / ≥75), conta no máximo 1 fator — não somar ">65" e ">75".
- Estratificação: sem VD avaliado nunca é baixo risco; troponina obrigatória; hipotensão transitória + hipoperfusão nunca é baixo risco.
- Limiar D-dímeros: <500 exclui sempre (o ajuste à idade só começa aos 50); acima de 1000 é sempre imagem.
- Alto risco é terminal (duração decide-se depois). HBPM>HNF (AHA).

## Coordenação (importante)
**Um único escritor.** Só esta linha de trabalho grava na pasta TEV. Antes de gravar, fazer sempre stage do ficheiro da pasta + comparar + incorporar alterações externas; gravar com guard de mtime (sem `force`), para uma edição manual não ser apagada.

## Pendentes
- Email para o rodapé (recomendado: alias dedicado, não o pessoal) — acrescentar "Erros/sugestões: <email>" quando o Tiago o der.
- Folheto de educação do doente para a alta (skill `educacao-doente-alta`).
- Rever os outros contadores da Consulta (HERDOO2, Villalta) à procura de armadilhas como a da idade.
- Apresentação (sessão clínica ~15–20 min, ~18 slides, 6 blocos A–F) a refinar bloco a bloco usando "Notas para apresentacao TEV.md"; no fim, triar as notas em slide/nota/descartar.
- Fio condutor da família PEITHO guardado nas notas para a apresentação.

## Ficheiro de memória
`Notas para apresentacao TEV.md` — ideias que o Tiago vai dando ao longo dos dias; guardar só o conteúdo, SEM sugerir destino/colocação (a triagem faz-se no fim, em conjunto).

## PENDENTE (prioritário) — doente instável / peri-trombólise
Definir melhor a anticoagulação no doente instável de alto risco na ferramenta: peri-trombólise é HNF, NÃO enoxaparina (semivida curta, reversível). Explicitar no ecrã tep_inst_sim: bólus HNF + perfusão se ainda não anticoagulado; com alteplase suspender HNF na infusão e retomar sem bólus quando aPTT <2x controlo (nota: alguns protocolos mantêm HNF a correr). Se já foi dada HBPM, esperar a janela da próxima dose antes de lisar. Rever a redação e o fluxo com o Tiago.
