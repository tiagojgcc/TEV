# TEV na Prática: instruções para o Claude neste repositório

Ferramenta de apoio à decisão sobre tromboembolismo venoso (urgência e enfermaria) do Dr. Tiago Guimarães Costa, Medicina Interna. Um único ficheiro HTML, autónomo, sem dependências externas, publicado pelo GitHub Pages em https://tiagojgcc.github.io/TEV/ a partir do `index.html` da raiz do branch `main`.

Ler também `_fonte/ESTADO-E-CONVENCOES.md` (histórico, convenções de linguagem, formato da nota clínica, decisões de design). O que está abaixo prevalece quando houver diferença.

## Como trabalhar

- Responder sempre em português europeu (pt-PT). Nunca pt-BR. Termos técnicos em inglês quando é o padrão.
- Editar apenas as partes em `_fonte/` (`g1` a `g5`). Nunca editar `index.html` à mão.
- Depois de qualquer alteração: `bash _fonte/build.sh` (gera `index.html`, verifica travessões e sintaxe), verificar a renderização (Playwright com o Chromium do ambiente, viewport 400 px, sem erros de página nem transbordo horizontal) e fazer commit direto no `main`. O push publica a página em cerca de um minuto. Não abrir pull requests salvo pedido.
- Depois do build, correr também os casos de regressão: `NODE_PATH=$(npm root -g) node _fonte/testes/casos.js` percorre a ferramenta com os casos clínicos de `_fonte/testes/casos.js` e imprime o percurso e a nota de cada um; comparar com `_fonte/testes/casos-esperado.md`. Uma diferença só é aceitável se for intencional, e nesse caso atualiza-se o esperado no mesmo commit. Casos novos (bugs encontrados, feedback de colegas) acrescentam-se aos dois ficheiros.
- Mensagem de commit curta, em pt-PT, a dizer o que mudou clinicamente (ex.: "TVP distal: duração 3 meses (ESVS 2021)").
- "Sem alterar" ou "discute" significa: analisar e propor, sem tocar nos ficheiros, e esperar a decisão.
- Texto fornecido pelo Tiago aplica-se verbatim (sem "melhorias").
- Ficheiros com dados privados (PDFs de bibliografia, a ferramenta "TEV Consulta") vivem no repositório privado `tiagojgcc/tev-bibliografia`, nunca neste. Não copiar nada desse repositório para aqui, com a única exceção descrita em "Os dois repositórios" (o `consulta.html` construído, e só quando o Tiago o pedir).

## Os dois repositórios e as duas ferramentas

Nas sessões trabalha-se com os dois repositórios selecionados: `tiagojgcc/TEV` (público) e `tiagojgcc/tev-bibliografia` (privado).

1. **TEV na Prática** (este repositório). Fontes em `TEV/_fonte` (`g1` a `g5`); `bash _fonte/build.sh` gera `TEV/index.html`. Cada alteração aprovada pelo Tiago é construída, verificada (build sem erros, renderização em Playwright) e enviada com commit direto para o `main`, ficando online em https://tiagojgcc.github.io/TEV/ cerca de um minuto depois.
2. **TEV Consulta** (ferramenta privada). Fontes em `tev-bibliografia/consulta` (`c1`, `c2`, `c3` e as imagens); `bash consulta/build-consulta.sh` gera `TEV Consulta.html` na raiz do repositório privado. As alterações à Consulta fazem-se e ficam apenas no `tev-bibliografia`. Nunca vai para o `TEV` até o Tiago dizer "põe a Consulta online". Nessa altura, e só nessa altura, copia-se o ficheiro construído para `TEV/consulta.html`, faz-se commit no `main` do `TEV` e a ferramenta fica em https://tiagojgcc.github.io/TEV/consulta.html. Enquanto essa ordem não for dada, o `TEV` não contém nenhum ficheiro da Consulta.
3. **Bibliografia**. Os PDFs (guidelines, ensaios, UpToDate, etc.) estão em `tev-bibliografia/bibliografia`. É por eles que se verifica cada afirmação clínica, dose, classe e nível de recomendação, antes de a escrever em qualquer uma das ferramentas. Quando a fonte não estiver na bibliografia nem for verificável de outra forma, dizê-lo ("❕Unsure about answer❕") em vez de afirmar.

## Regras de texto (não regredir)

- Nunca usar travessão (—) em lado nenhum. O build falha se encontrar um.
- Registo de divulgação clínica: frases completas, sem listas "·" telegráficas, sem setas no texto corrido, sem siglas soltas sem contexto, sem tom coloquial ou pessoal ("não sabemos", "é onde se perdem").
- Títulos dos ⓘ têm de dizer o que está dentro (ex.: "Tratar ou vigiar: o que dizem os estudos"), nunca formulações do tipo "porque isto parece controverso".
- Detalhe não essencial vai para um ⓘ (`info(titulo, corpo, referencias)`), escrito para ser lido.
- Uma decisão por ecrã. A ação principal é um botão cheio (`.go.blk`); a exceção é um botão secundário (`.go.sec.blk`); nunca um cartão verde que pareça clicável.
- Frequência das doses: `1x/dia`, `2x/dia`. "D-dímeros" no plural. "Abordagem", nunca "Conduta".

## Blocos partilhados (em `g2`)

- `bleedInfo(ctx)`: ⓘ "Como avaliar o risco hemorrágico". Mesma janela em todos os ecrãs; só a frase de abertura e a de fecho mudam com o contexto (`sspe`, `distal`, `hestia`, `emp`). Não criar janelas de risco hemorrágico próprias noutros ecrãs.
- `ciTromb()`: contraindicações à trombólise (absolutas e relativas). `ciAC()`: contraindicações à anticoagulação (absolutas, e "situações de elevado risco hemorrágico, decisão individual"). Listas definidas pelo Tiago; não acrescentar itens (idade, retinopatia, quedas, neoplasia, etc.).
- `situInfo()` e `SITU_TABLE`: tabela "Situações que mudam a escolha do anticoagulante" (seis linhas, duas colunas). Aparece como ⓘ em todos os ecrãs onde se decide iniciar ou manter anticoagulação, e como botão âmbar nos ecrãs de escolha do fármaco.
- Regra: em todos os ecrãs com decisão de trombolisar ou anticoagular têm de aparecer o ⓘ das contraindicações respetivas e, quando se escolhe fármaco, o ⓘ das situações que mudam a escolha.

## Referencial e rigor

- Espinha dorsal do TEP: ESC 2019. Pontos concretos da AHA/ACC 2026 (Circulation 2026;153:e977). TVP: CHEST 2016/2021, ASH 2020, ESVS 2021 (Kakkos, Eur J Vasc Endovasc Surg 2021;61:9).
- Cada afirmação clínica nova tem de ter fonte verificável (guideline com classe e nível, ou ensaio com referência). Quando não for possível verificar, dizê-lo explicitamente ("❕Unsure about answer❕") em vez de afirmar.
- Alteplase no TEP: "100 mg EV em 2 h. Na paragem cardíaca (PCR) por TEP: 50 mg em bólus em 2 min, seguido de 50 mg em perfusão nas 2 h seguintes." (texto fixado pelo Tiago).
- Meia elástica na TVP proximal: texto fixado pelo Tiago (apenas se sintomática; SOX). Não substituir pela recomendação da ESVS.
- TVP distal: 3 meses; prolongar decide-se em consulta. TVS ≥5 cm e ≥3 cm da junção: fondaparinux primeiro (ESVS I B), rivaroxabano como alternativa oral fora da indicação aprovada; a <3 cm da junção trata-se como TVP.
- Enoxaparina em dose de tratamento: 1 mg/kg 2x/dia; 1x/dia se ClCr <30 mL/min (Cockcroft-Gault). A nota tem de refletir a dose renal sempre que a ClCr calculada for <30. Dose em mg arredondada aos 5 mg (`enoxDose`).
- Edoxabano: reduzir a 30 mg 1x/dia se peso ≤60 kg, ClCr 15 a 50 mL/min, ou ciclosporina/dronedarona/eritromicina/cetoconazol (rótulo e suplemento da ESC 2019).
- Ventrículo direito não avaliado: o TEP classifica-se como **"NÃO-ALTO RISCO"**, nunca como intermédio. A abordagem é ecocardiograma ou ecoscopia à cabeceira e, se não houver, pedir ao radiologista a avaliação da sobrecarga do VD na angio-TC já feita (rácio VD/VE >1,0 no corte de 4 câmaras). O ecrã da angio-TC lembra que o pedido deve referir a suspeita de TEP e solicitar essa avaliação.
- Hipotensão transitória não altera a classe da ESC: com sPESI 0, VD normal e troponina negativa o doente é de **baixo risco pela ESC**. Quem manda internar com monitorização é a categoria D da AHA/ACC, e `stratGo` encaminha por ela.
- Reperfusão dirigida por cateter: são **duas** modalidades, trombólise dirigida por cateter e trombectomia mecânica, e a indicação é por categoria (`cdtCat` em g5): A a C1 não recomendadas; C2 e C3 benefício incerto (2b, C-LD); D1 e D2 podem ser consideradas (2b, B-NR); E1 razoáveis (2a). Nunca escrever "candidato a trombólise dirigida por cateter" sozinho.
- Gravidez, imagem torácica: a **angio-TC com protocolo de dose reduzida é a primeira linha** (AHA/ACC 2026, secção 3.1.2, recomendação 4, Classe 2a B-NR). A cintigrafia de perfusão é a alternativa quando a angio-TC está indisponível ou contraindicada. A radiografia de tórax faz-se para procurar diagnóstico alternativo, já não para escolher o exame.
- A via da grávida está acessível nos dois lados: a partir do ecrã da probabilidade (suspeita) e a partir do painel "TEV confirmado" (`conf_grav`).
- Enoxaparina: a nota leva sempre a **dose decidida em mg**, nunca a regra condicional. Quem a escolhe passa pelo ecrã `ac_hbpm` (peso obrigatório, Cockcroft-Gault opcional). Formato fixado pelo Tiago: `enoxaparina 1 mg/kg 2x/dia (80 mg 2x/dia)`, com a frequência repetida dentro dos parênteses (`enoxFrase`).
- Consulta na nota: na via da TVP é "Pedido de consulta de Medicina Interna e cirurgia vascular."; na via do TEP é "Pedido de consulta de Medicina Interna - TEV."; na grávida com TVP é "Plano discutido com Obstetrícia." e não há linha de consulta.
- Grávida com TVP: o título leva "(Grávida)", não há linha a explicar a via, e a **abordagem é a própria dose** de enoxaparina (`_hbpmDose`), sem linha "Anticoagulação:" separada.
- Falência: uma só linha, com a abordagem e a dose (`falenciaTxt`). O estudo (adesão, INR, anticorpos antifosfolipídicos, rastreio de neoplasia) fica no ecrã, não na nota.
- Contraindicação à anticoagulação: uma só linha de abordagem, "com contraindicação à anticoagulação - internamento (ponderar filtro da veia cava inferior - a discutir com cirurgia vascular)".
- TVS ≥5 cm e ≥3 cm da junção: o ecrã `tvp_tvs45` obriga a escolher entre fondaparinux e rivaroxabano, e a nota leva o que foi escolhido.
- Nota do doente instável, texto fixado pelo Tiago: título "# Suspeita de TEP" e a linha "- Instabilidade hemodinâmica - contacto imediato com Medicina Interna/UCI".
- Escrita da nota: usar sempre `fim()` (ponto final), `plural()` (1 ponto / 2 pontos) e `maiusc()` (inicial maiúscula). Não repetir na "Abordagem" o que já vai numa linha própria. "Alta com ...", nunca "Alta medicado com". "Marcada consulta de Medicina Interna (TEV) em 3 meses." Instruções ao utilizador (por exemplo "classificar pela AHA") ficam no ecrã e nunca entram na nota.
- Subsegmentar: a marcha regista sempre a releitura ("TEP subsegmentar isolado, confirmado na releitura com o radiologista"); se o achado não se confirma mas há TVP proximal, o diagnóstico da nota é a TVP (`sspeTvp`); a abordagem do subsegmentar é "alta precoce (Hestia 0)", sem "baixo risco", porque não se estratificou.
- Hestia positivo: a abordagem leva os critérios assinalados, "internamento em enfermaria (Hestia: ...)", e apaga a linha da consulta.
- Grávida, nas duas vias: título com "(Grávida)", abordagem igual à dose seguida de "; DOAC e AVK contraindicados", e a linha "Plano discutido com Obstetrícia.".
- AHA D2 (choque normotensivo): o título lidera pela AHA, "# TEP, AHA/ACC D2 (choque normotensivo); ESC: baixo risco". D1 mantém o título ESC.
- Angio-TC não exequível: o ecrã `tep_ctpaci` recolhe o resultado da imagem alternativa (V/Q de alta probabilidade ou eco com TVP proximal seguem para a estratificação; negativa exclui; inconclusiva termina em `tep_alt_fim`), e a marcha regista-o (`altImg`).
- Wells provável com eco de todo o membro negativa: título "eco negativa", não "excluída", e abordagem com a repetição da eco em 5 a 7 dias se a suspeita persistir.
- Alta do internado tem cinco opções: edoxabano, apixabano, rivaroxabano, dabigatrano, AVK, e manter enoxaparina (com dose).

## Regras de percurso (não regredir)

- Nenhum ecrã pode terminar com trabalho perdido. Um botão que conclui leva a um ecrã terminal com a nota; nunca chama `restart()` diretamente.
- O botão "Anticoagulação para casa" do cabeçalho só reinicia o estado quando não há percurso em curso (`altaGo`). A meio de um doente mantém a nota e acrescenta as linhas da alta.
- Toda a decisão que muda a abordagem tem de deixar linha na nota: falência, contraindicação, vigilância, internamento vs ambulatório.
- Gravidez: não é um ecrã próprio. É um desvio a partir do ecrã da probabilidade (TEP) e do Wells (TVP), com `ST.data.gravida`/`gravidaTvp`.
- A angio-TC tem um único ecrã, `tep_ctpa`, com três saídas: positiva, negativa, não exequível.
- Cuidado com a altura dos ecrãs: a barra fixa da nota tapa os últimos ~60 px da janela. Não pôr checkboxes nem botões de decisão no fim de um ecrã longo.

## Feedback dos pares

Quando o Tiago trouxer feedback de colegas: listar cada ponto, dizer onde está no algoritmo (ecrã e bloco), propor a alteração com a fonte, e só aplicar depois do "avança". Depois de aplicar, build, verificação e commit num único passo.
