# Casos de regressão: resultado esperado

Gerado a partir de `_fonte/testes/casos.js`. Cada bloco tem o caso clínico, o percurso na ferramenta e a nota que deve sair.
Se uma alteração mudar algum destes resultados, a mudança tem de ser intencional e este ficheiro atualiza-se no mesmo commit.

Última atualização: 2026-09-12. Casos: 22.

## C1 · Suspeita TEP, probabilidade baixa, PERC 0

Homem, 38 anos, dor torácica pleurítica há 1 dia. FC 88, SpO2 97% aa, sem estrogénios, sem TEV prévio, sem cirurgia, sem hemoptises, sem edema. Sem fatores de risco.

Percurso: Início > Suspeita > TEP > Probabilidade > PERC > PERC 0  [tep_perc0]  ·  6 toques

```
# Suspeita de TEP: excluída
- Probabilidade clínica (Genebra revisto): 3 pontos - baixa.
- PERC 0/8 > TEP excluído sem D-dímeros. Alta com sinais de alarme explicados.
```

## C2 · Suspeita TEP, prob. intermédia, YEARS 1 + limiar ajustado à idade

Mulher, 72 anos, dispneia súbita. FC 98. Sem TEV prévio, sem neoplasia, sem cirurgia. TEP é a hipótese mais provável. D-dímeros 0,68 mg/L.

Percurso: Início > Suspeita > TEP > Probabilidade > D-dímeros > Excluído  [tep_excl]  ·  10 toques

```
# Suspeita de TEP: excluída
- Probabilidade clínica (Genebra revisto): 6 pontos - intermédia.
- D-dímeros 0,68 mg/L (YEARS ≥1, limiar ajustado à idade 0,72 mg/L) > TEP excluído sem imagem.
```

## C3 · Prob. alta, angio-TC+, sPESI 0 mas VD+ e troponina+ (AHA ligada)

Mulher, 68 anos, TVP prévia, dor unilateral MI e edema, FC 98, SpO2 93%. Angio-TC: TEP segmentar bilateral, VD/VE 1,1. Troponina positiva. Sem neoplasia nem doença cardiopulmonar. TA 125/80. Sem O2. Peso 70 kg.

Percurso: Início > Suspeita > TEP > Probabilidade > Prob. alta > Angio-TC > TEP+ > Estratificar > Abordagem > Plano  [conf_fim]  ·  20 toques

```
# TEP de risco intermédio-alto (AHA/ACC: C3R)
- Probabilidade clínica (Genebra revisto): 16 pontos - alta.
- Angio-TC direta: TEP confirmado.
- Estratificação: sem instabilidade HD, sob O₂ suplementar, disfunção do VD, troponina positiva, sPESI 0.
- Abordagem: internamento com monitorização.
- Candidato a trombólise dirigida por cateter (AHA/ACC C3R) a discutir precocemente com centro de referência se deterioração incipiente.
- Anticoagulação: enoxaparina 1 mg/kg 2x/dia (70 mg 2x/dia).
```

## C4 · TEP confirmado, baixo risco, Hestia 0, apixabano

Homem, 45 anos, TEP segmentar direito após viagem longa. FC 92, TA 130/80, SpO2 96% aa. VD/VE 0,8 na angio-TC. Troponina negativa. Sem comorbilidades, apoio social.

Percurso: Início > Confirmado > TEP > Estratificar > Alta precoce? > Anticoagulação > Plano  [ac_fim]  ·  9 toques

```
# TEP de baixo risco
- Angio-TC: TEP confirmado.
- Estratificação: sem instabilidade HD, sem disfunção do VD, troponina negativa, sPESI 0.
- Abordagem: alta precoce (baixo risco, Hestia 0).
- Pedido de consulta de Medicina Interna - TEV.
- Anticoagulação: apixabano 10 mg 2x/dia × 7 dias, depois 5 mg 2x/dia (manter até à consulta).
```

## C5 · TEP baixo risco mas ClCr <30 (Hestia+): dose de enoxaparina na nota

Mulher, 84 anos, 55 kg, creatinina 1,6 mg/dL (Cockcroft-Gault ≈ 23 mL/min). TEP segmentar, FC 90, TA 140/85, SpO2 95%. VD normal, troponina negativa. sPESI 1 (idade).

Percurso: Início > Confirmado > TEP > Estratificar > Abordagem > Plano  [conf_fim]  ·  14 toques

```
# TEP de risco intermédio-baixo
- Angio-TC: TEP confirmado.
- Estratificação: sem instabilidade HD, sem disfunção do VD, troponina negativa, sPESI 1.
- Abordagem: internamento em enfermaria.
- Anticoagulação: enoxaparina 1 mg/kg 1x/dia (55 mg 1x/dia); dose renal por ClCr ≈ 23 mL/min (Cockcroft-Gault).
```

## C6 · TEP subsegmentar isolado confirmado na releitura, Hestia 0, rivaroxabano

Homem, 58 anos, TEP subsegmentar único confirmado pelo radiologista de tórax. Sem neoplasia, estável, SpO2 97%. Sem contraindicações.

Percurso: Início > Confirmado > TEP > Subsegmentar > Alta precoce? > Anticoagulação > Plano  [ac_fim]  ·  6 toques

```
# TEP subsegmentar isolado
- Angio-TC: TEP confirmado (subsegmentar isolado).
- Abordagem: alta precoce (baixo risco, Hestia 0).
- Pedido de consulta de Medicina Interna - TEV.
- Anticoagulação: rivaroxabano 15 mg 2x/dia × 21 dias, depois 20 mg 1x/dia, com alimentos (manter até à consulta).
```

## C7 · Doente instável (via rápida)

Homem, 61 anos, síncope, TA 78/40 persistente, lactato 4, ecocardiograma com VD dilatado. Suspeita de TEP.

Percurso: Início > Alto risco  [tep_inst_sim]  ·  1 toques

```
# Suspeita de TEP: instável
- Instabilidade hemodinâmica > ETT à cabeceira; contacto imediato com Medicina Interna/UCI; anticoagulação parentérica se sem contraindicação.
```

## C8 · Grávida, suspeita de TEP, YEARS 0, D-dímeros 0,85

Mulher, 30 anos, 28 semanas de gestação, dispneia ligeira. Sem sintomas de TVP, sem hemoptises, TEP não é a hipótese mais provável. D-dímeros 0,85 mg/L.

Percurso: Início > Suspeita > TEP > Probabilidade > Gravidez > YEARS > Excluído  [grav_excl]  ·  8 toques

```
# Suspeita de TEP na gravidez: excluída
- YEARS adaptado à gravidez 0 critérios, D-dímeros 0,85 mg/L (limiar 1,00 mg/L) > TEP excluído sem imagem.
```

## C9 · Suspeita TVP, Wells 1, D-dímeros acima do limiar ajustado, eco: distal

Homem, 68 anos, dor gemelar, perímetro +2 cm, sem outros critérios; Wells 1 (dor no trajeto). D-dímeros 0,70 mg/L. Eco de todo o membro: trombose da veia peronial.

Percurso: Início > Suspeita > TVP > D-dímeros > Eco-doppler > Distal > Anticoagulação > Plano  [ac_fim]  ·  10 toques

```
# TVP distal isolada
- Wells de TVP 1 pontos (improvável) > D-dímeros 0,70 mg/L (limiar ajustado à idade 0,68 mg/L) > eco-doppler: TVP distal isolada.
- Abordagem: TVP distal isolada > anticoagulação em dose de tratamento, 3 meses (prolongamento a decidir em consulta)
- Pedido de consulta de Medicina Interna - TEV.
- Anticoagulação: apixabano 10 mg 2x/dia × 7 dias, depois 5 mg 2x/dia (manter até à consulta).
```

## C10 · TVS da grande safena, 8 cm, a 6 cm da junção

Mulher, 52 anos, cordão doloroso na coxa. Eco bilateral: TVS da grande safena com 8 cm, a 6 cm da junção safeno-femoral, sem TVP.

Percurso: Início > Confirmado > TVP > TVS > 45 dias  [tvp_fim]  ·  4 toques

```
# Trombose venosa superficial
- Eco-doppler de todo o membro: trombose venosa superficial.
- Abordagem: TVS ≥5 cm e ≥3 cm da junção > fondaparinux 2,5 mg sc 1x/dia × 45 dias (alternativa oral: rivaroxabano 10 mg 1x/dia × 45 dias).
```

## C12 · TEP baixo risco diagnosticado sob anticoagulação (Hestia+): chega à falência?

Homem, 60 anos, TVP há 4 meses sob rivaroxabano 20 mg (adesão referida boa). TEP segmentar, FC 88, VD normal, troponina negativa, sPESI 0.

Percurso: Início > Confirmado > TEP > Estratificar > Alta precoce? > Abordagem > Plano  [conf_fim]  ·  11 toques

```
# TEP de baixo risco sob anticoagulação
- Angio-TC: TEP confirmado.
- Estratificação: sem instabilidade HD, sem disfunção do VD, troponina negativa, sPESI 0.
- Abordagem: internamento em enfermaria.
- TEV diagnosticado sob anticoagulação (falência) > HBPM em dose terapêutica (enoxaparina 1 mg/kg 2x/dia), sem reiniciar o fármaco que falhou; internamento; confirmar adesão e dose (INR no evento, se AVK); colhidos anti-cardiolipina e anti-β2-glicoproteína I (anticoagulante lúpico adiado, não fiável sob anticoagulação), a repetir às 12 semanas; rastreio de neoplasia adequado à idade e sexo; se SAF confirmado, AVK.
- Anticoagulação: enoxaparina 1 mg/kg 2x/dia (80 mg 2x/dia).
```

## C13 · sPESI 0, troponina negativa, VD não avaliado

Mulher, 40 anos, TEP lobar, estável, SpO2 96%. Troponina negativa. Radiologista não mediu VD/VE; sem eco disponível.

Percurso: Início > Confirmado > TEP > Estratificar > Abordagem > Plano  [conf_fim]  ·  9 toques

```
# TEP de risco intermédio
- Angio-TC: TEP confirmado.
- Estratificação: sem instabilidade HD, VD não avaliado, troponina negativa, sPESI 0.
- Abordagem: internamento até completar estratificação (VD/troponina).
- Anticoagulação: enoxaparina 1 mg/kg 2x/dia (60 mg 2x/dia).
```

## C14 · AHA ligada: hipotensão transitória (respondeu a fluidos), sPESI 0, VD e troponina negativos

Homem, 55 anos, TEP bilateral central. TA 85/50 à entrada, 118/70 após 500 mL de soro em 10 min. Lactato 1,4. VD/VE 0,9. Troponina negativa. SpO2 95%.

Percurso: Início > Confirmado > TEP > Estratificar > Abordagem > Plano  [conf_fim]  ·  12 toques

```
# TEP de risco intermédio-baixo (AHA/ACC: D1)
- Angio-TC: TEP confirmado.
- Estratificação: hipotensão transitória sem hipoperfusão, sem disfunção do VD, troponina negativa, sPESI 0.
- Abordagem: internamento com monitorização.
- Candidato a trombólise dirigida por cateter (AHA/ACC D1) a discutir precocemente com centro de referência se deterioração incipiente.
- Anticoagulação: enoxaparina 1 mg/kg 2x/dia (85 mg 2x/dia).
```

## C15 · TVP distal isolada com risco hemorrágico elevado: vigilância

Homem, 79 anos, hemorragia digestiva alta há 10 dias. Eco: trombose da veia solear. Wells 2.

Percurso: Início > Confirmado > TVP > Distal > Plano  [tvp_fim]  ·  4 toques

```
# TVP distal isolada
- Eco-doppler de todo o membro: TVP distal isolada.
- Abordagem: TVP distal isolada com risco hemorrágico elevado > vigilância ecográfica (repetir eco de todo o membro ao dia 7 e, se negativa, ao dia 14; anticoagular se extensão); decisão documentada e reavaliação marcada
```

## C16 · TVP proximal em doente já anticoagulado (falência)

Mulher, 47 anos, LES, TVP femoral sob apixabano 5 mg 2x/dia há 2 meses. Eco: TVP femoral nova contralateral.

Percurso: Início > Confirmado > TVP > Proximal > Anticoagulação > Falência  [ac_falencia]  ·  5 toques

```
# TVP proximal sob anticoagulação
- Eco-doppler de todo o membro: TVP proximal.
- Abordagem: TVP proximal sob anticoagulação (falência) > internamento; HBPM em dose terapêutica.
- TEV diagnosticado sob anticoagulação (falência) > HBPM em dose terapêutica (enoxaparina 1 mg/kg 2x/dia), sem reiniciar o fármaco que falhou; internamento; confirmar adesão e dose (INR no evento, se AVK); colhidos anti-cardiolipina e anti-β2-glicoproteína I (anticoagulante lúpico adiado, não fiável sob anticoagulação), a repetir às 12 semanas; rastreio de neoplasia adequado à idade e sexo; se SAF confirmado, AVK.
- Pedido de consulta de Medicina Interna - TEV.
- Anticoagulação: enoxaparina 1 mg/kg 2x/dia (1x/dia se ClCr <30 mL/min); não reiniciar o fármaco que falhou.
```

## C11 · Grávida com suspeita de TVP: eco direta, sem Wells

Mulher, 29 anos, 24 semanas de gestação, edema e dor da perna esquerda. Eco de todo o membro: TVP femoral.

Percurso: Início > Suspeita > TVP > Eco-doppler > Proximal > Anticoagulação > Plano  [ac_fim]  ·  6 toques

```
# TVP proximal
- Grávida > eco-doppler de todo o membro diretamente, sem Wells nem D-dímeros.
- Eco-doppler de todo o membro: TVP proximal.
- Abordagem: anticoagulação em dose de tratamento, em ambulatório.
- Pedido de consulta de Medicina Interna - TEV.
- Anticoagulação: enoxaparina 1 mg/kg 2x/dia (1x/dia se ClCr <30 mL/min; manter até à consulta).
```

## C12b · TEP sob anticoagulação, Hestia+: ver falência e voltar para concluir

Igual ao C12, mas abre o ecrã de falência a partir da abordagem e volta para concluir a nota.

Percurso: Início > Confirmado > TEP > Estratificar > Alta precoce? > Abordagem > Plano  [conf_fim]  ·  13 toques

```
# TEP de baixo risco sob anticoagulação
- Angio-TC: TEP confirmado.
- Estratificação: sem instabilidade HD, sem disfunção do VD, troponina negativa, sPESI 0.
- Abordagem: internamento em enfermaria.
- TEV diagnosticado sob anticoagulação (falência) > HBPM em dose terapêutica (enoxaparina 1 mg/kg 2x/dia), sem reiniciar o fármaco que falhou; internamento; confirmar adesão e dose (INR no evento, se AVK); colhidos anti-cardiolipina e anti-β2-glicoproteína I (anticoagulante lúpico adiado, não fiável sob anticoagulação), a repetir às 12 semanas; rastreio de neoplasia adequado à idade e sexo; se SAF confirmado, AVK.
- Anticoagulação: enoxaparina 1 mg/kg 2x/dia (80 mg 2x/dia).
```

## C17 · Gravidez, TEP confirmado, 68 kg: arredondamento da dose

Mulher, 32 anos, 30 semanas, eco MI negativa, YEARS 1 (TEP mais provável), D-dímeros 1,4; cintigrafia positiva. Peso 68 kg.

Percurso: Início > Suspeita > TEP > Probabilidade > Gravidez > Eco MI > YEARS > Imagem > Resultado > Tratar > Concluído  [grav_fim]  ·  13 toques

```
# TEP na gravidez
- sintomas de TVP > eco-doppler dos MI negativa > YEARS adaptado à gravidez 2 critério(s), D-dímeros 1,40 mg/L (limiar 0,50 mg/L) > cintigrafia de perfusão (Rx tórax normal): positiva.
- HBPM em dose de tratamento ajustada ao peso: enoxaparina 1 mg/kg 2x/dia (70 mg 2x/dia); DOAC e AVK contraindicados > discutido com Medicina Interna/Obstetrícia (seguimento conjunto).
```

## C18 · TVP proximal com contraindicação à anticoagulação

Homem, 71 anos, hemorragia digestiva ativa. Eco: TVP femoral. Anticoagulação contraindicada.

Percurso: Início > Confirmado > TVP > Proximal > Anticoagulação > Contraindicação  [ac_contra]  ·  5 toques

```
# TVP proximal
- Eco-doppler de todo o membro: TVP proximal.
- Abordagem: TVP proximal com contraindicação à anticoagulação > filtro da veia cava inferior removível, se não houver contraindicação; internamento e reavaliação da contraindicação.
- Anticoagulação contraindicada: registar qual é a contraindicação, se é absoluta ou uma situação de elevado risco hemorrágico, se é reversível e quando será reavaliada. Ponderado filtro da veia cava inferior removível; anticoagulação a retomar e filtro a remover logo que a contraindicação se resolva.
```

## C19 · TVP provável sem eco disponível: concluir com plano até à eco

Mulher, 63 anos, madrugada de sábado, sem ecografista. Wells 3. Sem risco hemorrágico.

Percurso: Início > Suspeita > TVP > Eco-doppler > Sem eco > Plano  [tvp_fim]  ·  7 toques

```
# Suspeita de TVP
- Wells de TVP 2 pontos (provável).
- Eco indisponível de imediato > TVP provável > anticoagulação empírica iniciada; eco-doppler nas primeiras 24 h.
- Abordagem: a abordagem definitiva decide-se com o resultado da eco-doppler das primeiras 24 h
```

## C20 · TVP proximal iliofemoral que justifica internamento

Homem, 55 anos, TVP iliofemoral sintomática com 5 dias de evolução, membro muito edemaciado.

Percurso: Início > Confirmado > TVP > Proximal > Anticoagulação > Plano  [ac_fim]  ·  5 toques

```
# TVP proximal
- Eco-doppler de todo o membro: TVP proximal.
- Abordagem: anticoagulação em dose de tratamento, com internamento (ver os motivos de orientação especializada precoce).
- Anticoagulação: enoxaparina 1 mg/kg 2x/dia (1x/dia se ClCr <30 mL/min; manter até à consulta).
```

## C21 · TEP internado: passar a oral pelo botão do cabeçalho mantém a nota

Homem, 58 anos, TEP intermédio-baixo internado, 6 dias de enoxaparina, passa a edoxabano.

Percurso: Início > Confirmado > TEP > Estratificar > Abordagem > Plano > Para casa > Concluído  [alta_fim]  ·  12 toques

```
# TEP de risco intermédio-baixo
- Angio-TC: TEP confirmado.
- Estratificação: sem instabilidade HD, disfunção do VD, troponina negativa, sPESI 0.
- Abordagem: internamento em enfermaria.
- Anticoagulação: enoxaparina 1 mg/kg 2x/dia (80 mg 2x/dia).
- Alta medicado com edoxabano 60 mg 1x/dia até à consulta (parentérico ≥5 dias cumprido no internamento)
- Marcada consulta Medicina Interna - TEV em 3 meses
```
