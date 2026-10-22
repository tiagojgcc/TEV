// Percursos aleatórios: percorre "TEV na Prática" (index.html) com escolhas ao acaso e verifica, no fim de cada percurso,
// regras que nunca podem falhar. Não compara com uma nota esperada (isso é o casos.js); serve para encontrar erros
// e medir a cobertura (ecrãs visitados, botões clicados, tipos de linha da nota).
// Correr depois do build:  NODE_PATH=$(npm root -g) node _fonte/testes/aleatorio.js [percursos] [semente]
// Termina com código 1 se alguma regra falhar.
const { chromium } = require('playwright');
const path = require('path');
const URL = 'file://' + path.resolve(__dirname, '..', '..', 'index.html');
const N = +(process.argv[2] || 3000), SEED = +(process.argv[3] || 1);

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 400, height: 860 } });
  const pageErr = [];
  p.on('pageerror', e => pageErr.push(String(e)));
  p.on('dialog', d => d.accept());
  await p.goto(URL);
  const res = await p.evaluate(({ N, SEED }) => {
    // gerador pseudoaleatório com semente (resultados reproduzíveis)
    let s = SEED >>> 0 || 1;
    const rnd = () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
    const pick = a => a[Math.floor(rnd() * a.length)];
    const vis = el => el.offsetParent !== null && !el.closest('details:not([open])');
    // valores plausíveis por campo; um campo desconhecido recebe 1 a 100
    const FAIXA = { ddage: [18, 95], tdage: [18, 95], cgAge: [18, 100], ddval: [0.1, 6, 2], tdval: [0.1, 6, 2], gdval: [0.1, 6, 2],
      pw: [38, 150], gw: [45, 130], cgCr: [0.4, 5, 2], aidays: [1, 14] };
    const valor = id => { const f = FAIXA[id] || [1, 100]; const v = f[0] + rnd() * (f[1] - f[0]); return f[2] ? v.toFixed(f[2]) : String(Math.round(v)); };
    const NAO = /Novo doente|^⟳|Copiar|^✕/;
    const erros = [], atalhos = [], ecras = {}, botoes = {}, linhas = {}, terminais = {};
    const ENTRADAS = ['porta', 'conf_tipo', 'tep_inst_sim', 'alta_int'];
    let presos = 0;
    window.__erros = [];
    window.addEventListener('error', e => window.__erros.push(String(e.message)));
    for (let k = 0; k < N; k++) {
      try { ST = { trail: [], data: {} }; closeModals(); go('home', 'Início'); } catch (e) { erros.push('reinício: ' + e); continue; }
      let passos = 0, fim = null, ult = null, repet = 0;
      while (passos++ < 70) {
        const id = ST.trail.length ? ST.trail[ST.trail.length - 1].id : 'home';
        ecras[id] = (ecras[id] || 0) + 1;
        repet = id === ult ? repet + 1 : 0; ult = id; // parado no mesmo ecrã: assinala mais critérios no passo seguinte
        const app = document.getElementById('app');
        // preencher campos numéricos visíveis (às vezes deixa um por preencher, como faria alguém distraído)
        app.querySelectorAll('input[type=number], input[inputmode=decimal]').forEach(i => { if (vis(i) && (i.value === '' || rnd() < 0.2) && rnd() < 0.92) { i.value = valor(i.id); i.dispatchEvent(new Event('input', { bubbles: true })); i.dispatchEvent(new Event('change', { bubbles: true })); } });
        // abrir às vezes as caixas opcionais (AHA, Cockcroft-Gault)
        app.querySelectorAll('details.aha, details.paste').forEach(d => { if (!d.open && rnd() < 0.35) { d.open = true; d.dispatchEvent(new Event('toggle')); } });
        // critérios: cada caixa visível fica assinalada com probabilidade baixa
        app.querySelectorAll('.scr input[type=checkbox]').forEach(c => { if (vis(c) && rnd() < Math.min(0.18 + 0.25 * repet, 0.9)) { c.checked = !c.checked; c.dispatchEvent(new Event('change', { bubbles: true })); } });
        // perguntas de escolha: responder a todas as visíveis
        app.querySelectorAll('.radio3').forEach(g => { if (vis(g)) { const ls = [...g.querySelectorAll('label')]; if (ls.length) pick(ls).click(); } });
        // botões de navegação visíveis
        let bs = [...app.querySelectorAll('button')].filter(x => vis(x) && !NAO.test(x.innerText.trim()) && !x.closest('details.info'));
        const ver = bs.filter(x => /Ver a nota/.test(x.innerText));
        const nav = bs.filter(x => !/Ver a nota/.test(x.innerText));
        // sem botões mas com campos por preencher: não é o fim, é um ecrã à espera de dados
        const vazios = [...app.querySelectorAll('input[type=number], input[inputmode=decimal]')].filter(i => vis(i) && i.value === '');
        if (!nav.length && vazios.length && repet < 5) continue;
        if (!nav.length) {
          if (ver.length) ver[0].click();
          fim = id; break;
        }
        // de vez em quando, o botão "Anticoagulação para casa" do cabeçalho a meio do percurso
        if (id !== 'home' && rnd() < 0.02) { altaGo(); continue; }
        const btn = pick(nav);
        const chave = id + ' › ' + btn.innerText.trim().split('\n')[0].slice(0, 60);
        botoes[chave] = (botoes[chave] || 0) + 1;
        const antes = JSON.stringify(ST.trail.map(t => t.id)) + JSON.stringify(ST.data);
        btn.click();
        if (JSON.stringify(ST.trail.map(t => t.id)) + JSON.stringify(ST.data) === antes && rnd() < 0.5) {
          // botão sem efeito (falta preencher algo): tenta outra coisa no passo seguinte
        }
      }
      if (!fim) { presos++; continue; }
      terminais[fim] = (terminais[fim] || 0) + 1;
      const d = ST.data, nota = buildNote(), trilho = ST.trail.map(t => t.id).join(' > ');
      // percursos que começam num atalho de "Ferramentas" contam à parte: a nota nos atalhos é um problema conhecido
      const atalho = ST.trail.length > 1 && !ENTRADAS.includes(ST.trail[1].id);
      const falha = m => (atalho ? atalhos : erros).push(m + '\n   ecrã: ' + fim + '\n   percurso: ' + trilho + '\n   nota: ' + nota.replace(/\n/g, ' ⏎ '));
      nota.split('\n').forEach(l => { const t = l.startsWith('#') ? '# título' : (l.match(/^- ([^:]{1,40}):/) || [, l.slice(0, 30)])[1]; linhas[t] = (linhas[t] || 0) + 1; });
      // regras
      if (window.__erros.length) { falha('erro JavaScript: ' + window.__erros.join(' | ')); window.__erros = []; }
      if (fim !== 'home' && (/^Percorra/.test(nota) || !/^# /m.test(nota))) falha('ecrã terminal sem nota (sem título)');
      if (/undefined|NaN|null|\[object/.test(nota)) falha('valor em falta na nota (undefined/NaN/null)');
      if (/—/.test(nota)) falha('travessão na nota');
      if (/\d\.\d/.test(nota.replace(/\d+\.ª/g, ''))) falha('número com ponto decimal na nota');
      // a ponte de enoxaparina no AVK ainda não pede o peso (pendente, decisão do Tiago): fica fora desta regra
      nota.split('\n').forEach(l => { if (/enoxaparina 1 mg\/kg/.test(l) && !/sobreposição de enoxaparina/.test(l) && !/\(\d+ mg [12]x\/dia\)/.test(l)) falha('enoxaparina sem a dose em mg: ' + l); });
      if (d._crcl != null && d._crcl < 30 && nota.split('\n').some(l => /enoxaparina 1 mg\/kg 2x\/dia/.test(l) && !/sobreposição de enoxaparina/.test(l))) falha('ClCr <30 mas enoxaparina 2x/dia');
      if ((d.gravida || d.gravidaTvp) && /apixabano|rivaroxabano|edoxabano|dabigatrano|varfarina/i.test(nota)) falha('grávida com DOAC ou AVK na nota');
      if ((nota.match(/^# /gm) || []).length > 2) falha('mais de dois títulos na nota');
    }
    return { erros, atalhos, ecras, botoes, linhas, terminais, presos, total: Object.keys(SCREENS).length, todos: Object.keys(SCREENS) };
  }, { N, SEED });
  await b.close();
  const visit = Object.keys(res.ecras);
  console.log(`Percursos: ${N} (semente ${SEED}). Terminaram num ecrã com nota: ${N - res.presos}; presos (70 passos sem chegar ao fim): ${res.presos}.`);
  console.log(`Ecrãs visitados: ${visit.length} de ${res.total}.` + (res.todos.filter(x => !visit.includes(x)).length ? ' Nunca visitados: ' + res.todos.filter(x => !visit.includes(x)).join(', ') : ''));
  console.log(`Botões distintos clicados: ${Object.keys(res.botoes).length}.`);
  console.log('Ecrãs terminais: ' + Object.entries(res.terminais).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ' ' + v).join(', '));
  console.log('Tipos de linha da nota: ' + Object.entries(res.linhas).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ' ' + v).join(' | '));
  const uniq = [...new Set(res.erros.map(e => e.split('\n')[0]))];
  console.log(`\nFalhas: ${res.erros.length} (${uniq.length} tipos)` + (pageErr.length ? `; erros de página: ${pageErr.length}` : ''));
  uniq.forEach(u => { const ex = res.erros.find(e => e.startsWith(u)); console.log('\n✗ ' + ex + `\n   (${res.erros.filter(e => e.startsWith(u)).length} vezes)`); });
  pageErr.slice(0, 5).forEach(e => console.log('✗ página: ' + e));
  const ua = [...new Set(res.atalhos.map(e => e.split('\n')[0]))];
  console.log(`\nAvisos nos percursos iniciados por um atalho (não contam como falha): ${res.atalhos.length} (${ua.length} tipos)`);
  ua.forEach(u => { const ex = res.atalhos.find(e => e.startsWith(u)); console.log('· ' + ex.split('\n').slice(0, 3).join('\n  ') + `\n  (${res.atalhos.filter(e => e.startsWith(u)).length} vezes)`); });
  process.exit(res.erros.length || pageErr.length ? 1 : 0);
})();
