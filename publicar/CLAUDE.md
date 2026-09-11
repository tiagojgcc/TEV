# TEV na Prática: instruções para o Claude neste repositório

Ferramenta de apoio à decisão sobre tromboembolismo venoso (urgência e enfermaria) do Dr. Tiago Guimarães Costa, Medicina Interna. Um único ficheiro HTML, autónomo, sem dependências externas, publicado pelo GitHub Pages em https://tiagojgcc.github.io/tev/ a partir do `index.html` da raiz do branch `main`.

Ler também `_fonte/ESTADO-E-CONVENCOES.md` (histórico, convenções de linguagem, formato da nota clínica, decisões de design). O que está abaixo prevalece quando houver diferença.

## Como trabalhar

- Responder sempre em português europeu (pt-PT). Nunca pt-BR. Termos técnicos em inglês quando é o padrão.
- Editar apenas as partes em `_fonte/` (`g1` a `g5`). Nunca editar `index.html` à mão.
- Depois de qualquer alteração: `bash _fonte/build.sh` (gera `index.html`, verifica travessões e sintaxe), verificar a renderização (Playwright com o Chromium do ambiente, viewport 400 px, sem erros de página nem transbordo horizontal) e fazer commit direto no `main`. O push publica a página em cerca de um minuto. Não abrir pull requests salvo pedido.
- Mensagem de commit curta, em pt-PT, a dizer o que mudou clinicamente (ex.: "TVP distal: duração 3 meses (ESVS 2021)").
- "Sem alterar" ou "discute" significa: analisar e propor, sem tocar nos ficheiros, e esperar a decisão.
- Texto fornecido pelo Tiago aplica-se verbatim (sem "melhorias").
- Ficheiros com dados privados (PDFs de bibliografia, a ferramenta "TEV Consulta") vivem no repositório privado `tiagojgcc/tev-privado`, nunca neste. Não copiar nada desse repositório para aqui.

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
- TVP distal: 3 meses; prolongar decide-se em consulta. TVS ≥5 cm e >3 cm da junção: fondaparinux primeiro (ESVS I B), rivaroxabano como alternativa oral fora da indicação aprovada.

## Feedback dos pares

Quando o Tiago trouxer feedback de colegas: listar cada ponto, dizer onde está no algoritmo (ecrã e bloco), propor a alteração com a fonte, e só aplicar depois do "avança". Depois de aplicar, build, verificação e commit num único passo.
