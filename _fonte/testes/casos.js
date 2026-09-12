// Casos de regressão: percorre "TEV na Prática" (index.html) com casos clínicos e imprime o ecrã final e a nota.
// Correr depois do build:  NODE_PATH=$(npm root -g) node _fonte/testes/casos.js   (opcional: CASE_IDS=C5,C12)
// Cada caso tem o percurso esperado e a nota esperada registados em casos-esperado.md; comparar à mão ou com diff.
const { chromium } = require('playwright');
const path = require('path'), os = require('os');
const URL = 'file://' + path.resolve(__dirname, '..', '..', 'index.html');

// passos: ["click", texto] | ["card", texto] | ["check", id] | ["fill", id, valor] | ["radio", grupo, valor] | ["open", id] | ["btnin", containerId]
const CASOS = [
  { id: 'C1', titulo: 'Suspeita TEP, probabilidade baixa, PERC 0',
    caso: 'Homem, 38 anos, dor torácica pleurítica há 1 dia. FC 88, SpO2 97% aa, sem estrogénios, sem TEV prévio, sem cirurgia, sem hemoptises, sem edema. Sem fatores de risco.',
    passos: [["card","Suspeita de TEV"],["click","TEP"],["click","Não, estável"],["click","Não"],
             ["radio","gfc","3"],["click","Continuar"],["click","Avaliar"]] },
  { id: 'C2', titulo: 'Suspeita TEP, prob. intermédia, YEARS 1 + limiar ajustado à idade',
    caso: 'Mulher, 72 anos, dispneia súbita. FC 98. Sem TEV prévio, sem neoplasia, sem cirurgia. TEP é a hipótese mais provável. D-dímeros 0,68 mg/L.',
    passos: [["card","Suspeita de TEV"],["click","TEP"],["click","Não, estável"],["click","Não"],
             ["check","g0"],["radio","gfc","5"],["click","Continuar"],
             ["fill","ddage","72"],["fill","ddval","0.68"],["check","y2"],["btnin","ddbtns"]] },
  { id: 'C3', titulo: 'Prob. alta, angio-TC+, sPESI 0 mas VD+ e troponina+ (AHA ligada)',
    caso: 'Mulher, 68 anos, TVP prévia, dor unilateral MI e edema, FC 98, SpO2 93%. Angio-TC: TEP segmentar bilateral, VD/VE 1,1. Troponina positiva. Sem neoplasia nem doença cardiopulmonar. TA 125/80. Sem O2. Peso 70 kg.',
    passos: [["card","Suspeita de TEV"],["click","TEP"],["click","Não, estável"],["click","Não"],
             ["check","g0"],["check","g1"],["check","g4"],["check","g6"],["radio","gfc","5"],["click","Continuar"],
             ["click","Continuar para a angio-TC"],["click","Sim"],["click","Positiva: TEP confirmado"],
             ["click","Segmentar, lobar"],
             ["radio","q_inst","nao"],["radio","q_vd","sim"],["radio","q_tp","pos"],["open","ahaBox"],["radio","q_resp","o2"],
             ["btnin","stratbtn"],["fill","pw","70"],["click","Concluir: nota do episódio"]] },
  { id: 'C4', titulo: 'TEP confirmado, baixo risco, Hestia 0, apixabano',
    caso: 'Homem, 45 anos, TEP segmentar direito após viagem longa. FC 92, TA 130/80, SpO2 96% aa. VD/VE 0,8 na angio-TC. Troponina negativa. Sem comorbilidades, apoio social.',
    passos: [["card","TEV confirmado"],["click","TEP"],["click","Segmentar, lobar"],
             ["radio","q_inst","nao"],["radio","q_vd","nao"],["radio","q_tp","neg"],["btnin","stratbtn"],
             ["btnin","hbtn"],["click","Apixabano"]] },
  { id: 'C5', titulo: 'TEP baixo risco mas ClCr <30 (Hestia+): dose de enoxaparina na nota',
    caso: 'Mulher, 84 anos, 55 kg, creatinina 1,6 mg/dL (Cockcroft-Gault ≈ 23 mL/min). TEP segmentar, FC 90, TA 140/85, SpO2 95%. VD normal, troponina negativa. sPESI 1 (idade).',
    passos: [["card","TEV confirmado"],["click","TEP"],["click","Segmentar, lobar"],
             ["radio","q_inst","nao"],["check","sp0"],["radio","q_vd","nao"],["radio","q_tp","neg"],["btnin","stratbtn"],
             ["fill","pw","55"],["open","crclBox"],["fill","cgAge","84"],["fill","cgCr","1.6"],["radio","cgSex","F"],
             ["click","Concluir: nota do episódio"]] },
  { id: 'C6', titulo: 'TEP subsegmentar isolado confirmado na releitura, Hestia 0, rivaroxabano',
    caso: 'Homem, 58 anos, TEP subsegmentar único confirmado pelo radiologista de tórax. Sem neoplasia, estável, SpO2 97%. Sem contraindicações.',
    passos: [["card","TEV confirmado"],["click","TEP"],["click","Subsegmentar isolado"],
             ["click","Confirmado: anticoagular"],["btnin","hbtn"],["click","Rivaroxabano"]] },
  { id: 'C7', titulo: 'Doente instável (via rápida)',
    caso: 'Homem, 61 anos, síncope, TA 78/40 persistente, lactato 4, ecocardiograma com VD dilatado. Suspeita de TEP.',
    passos: [["hr","Doente instável"]] },
  { id: 'C8', titulo: 'Grávida, suspeita de TEP, YEARS 0, D-dímeros 0,85',
    caso: 'Mulher, 30 anos, 28 semanas de gestação, dispneia ligeira. Sem sintomas de TVP, sem hemoptises, TEP não é a hipótese mais provável. D-dímeros 0,85 mg/L.',
    passos: [["card","Suspeita de TEV"],["click","TEP"],["click","Não, estável"],["click","Sim"],["click","Não"],
             ["check","gynone"],["fill","gdval","0.85"],["btnin","gdbtns"]] },
  { id: 'C9', titulo: 'Suspeita TVP, Wells 1, D-dímeros acima do limiar ajustado, eco: distal',
    caso: 'Homem, 68 anos, dor gemelar, perímetro +2 cm, sem outros critérios; Wells 1 (dor no trajeto). D-dímeros 0,70 mg/L. Eco de todo o membro: trombose da veia peronial.',
    passos: [["card","Suspeita de TEV"],["click","TVP"],["check","wt3"],["click","Continuar"],
             ["fill","tdage","68"],["fill","tdval","0.70"],["btnin","tdbtns"],
             ["click","TVP distal isolada"],["click","Anticoagular em dose de tratamento"],["click","Apixabano"]] },
  { id: 'C10', titulo: 'TVS da grande safena, 8 cm, a 6 cm da junção',
    caso: 'Mulher, 52 anos, cordão doloroso na coxa. Eco bilateral: TVS da grande safena com 8 cm, a 6 cm da junção safeno-femoral, sem TVP.',
    passos: [["card","TEV confirmado"],["click","TVP"],["click","Trombose venosa superficial"],["click","≥5 cm de extensão"]] },
  { id: 'C12', titulo: 'TEP baixo risco diagnosticado sob anticoagulação (Hestia+): chega à falência?',
    caso: 'Homem, 60 anos, TVP há 4 meses sob rivaroxabano 20 mg (adesão referida boa). TEP segmentar, FC 88, VD normal, troponina negativa, sPESI 0.',
    passos: [["card","TEV confirmado"],["click","TEP"],["click","Segmentar, lobar"],
             ["radio","q_inst","nao"],["radio","q_vd","nao"],["radio","q_tp","neg"],["btnin","stratbtn"],
             ["check","h4"],["btnin","hbtn"],["fill","pw","80"],["click","Concluir: nota do episódio"]] },
  { id: 'C13', titulo: 'sPESI 0, troponina negativa, VD não avaliado',
    caso: 'Mulher, 40 anos, TEP lobar, estável, SpO2 96%. Troponina negativa. Radiologista não mediu VD/VE; sem eco disponível.',
    passos: [["card","TEV confirmado"],["click","TEP"],["click","Segmentar, lobar"],
             ["radio","q_inst","nao"],["radio","q_vd","nd"],["radio","q_tp","neg"],["btnin","stratbtn"],
             ["fill","pw","62"],["click","Concluir: nota do episódio"]] },
  { id: 'C14', titulo: 'AHA ligada: hipotensão transitória (respondeu a fluidos), sPESI 0, VD e troponina negativos',
    caso: 'Homem, 55 anos, TEP bilateral central. TA 85/50 à entrada, 118/70 após 500 mL de soro em 10 min. Lactato 1,4. VD/VE 0,9. Troponina negativa. SpO2 95%.',
    passos: [["card","TEV confirmado"],["click","TEP"],["click","Segmentar, lobar"],
             ["radio","q_inst","nao"],["radio","q_vd","nao"],["radio","q_tp","neg"],["open","ahaBox"],["radio","q_ht","sim"],["radio","q_hp","nao"],
             ["btnin","stratbtn"],["fill","pw","85"],["click","Concluir: nota do episódio"]] },
  { id: 'C15', titulo: 'TVP distal isolada com risco hemorrágico elevado: vigilância',
    caso: 'Homem, 79 anos, hemorragia digestiva alta há 10 dias. Eco: trombose da veia solear. Wells 2.',
    passos: [["card","TEV confirmado"],["click","TVP"],["click","TVP distal isolada"],["click","Risco hemorrágico elevado"]] },
  { id: 'C16', titulo: 'TVP proximal em doente já anticoagulado (falência)',
    caso: 'Mulher, 47 anos, LES, TVP femoral sob apixabano 5 mg 2x/dia há 2 meses. Eco: TVP femoral nova contralateral.',
    passos: [["card","TEV confirmado"],["click","TVP"],["click","TVP proximal"],["click","Escolher anticoagulação"],["click","Já estava anticoagulado"]] },
  { id: 'C11', titulo: 'Grávida com suspeita de TVP: eco direta, sem Wells',
    caso: 'Mulher, 29 anos, 24 semanas de gestação, edema e dor da perna esquerda. Eco de todo o membro: TVP femoral.',
    passos: [["card","Suspeita de TEV"],["click","TVP"],["click","Grávida: ir diretamente"],["click","TVP proximal"],["click","Escolher anticoagulação"],["click","Enoxaparina"]] },
  { id: 'C12b', titulo: 'TEP sob anticoagulação, Hestia+: ver falência e voltar para concluir',
    caso: 'Igual ao C12, mas abre o ecrã de falência a partir da abordagem e volta para concluir a nota.',
    passos: [["card","TEV confirmado"],["click","TEP"],["click","Segmentar, lobar"],
             ["radio","q_inst","nao"],["radio","q_vd","nao"],["radio","q_tp","neg"],["btnin","stratbtn"],
             ["check","h4"],["btnin","hbtn"],["fill","pw","80"],["click","Ver a abordagem completa da falência"],["click","Voltar à abordagem"],["click","Concluir: nota do episódio"]] },
  { id: 'C17', titulo: 'Gravidez, TEP confirmado, 68 kg: arredondamento da dose',
    caso: 'Mulher, 32 anos, 30 semanas, eco MI negativa, YEARS 1 (TEP mais provável), D-dímeros 1,4; cintigrafia positiva. Peso 68 kg.',
    passos: [["card","Suspeita de TEV"],["click","TEP"],["click","Não, estável"],["click","Sim"],["click","Sim"],["click","Negativa"],
             ["check","gy2"],["fill","gdval","1.4"],["btnin","gdbtns"],["click","Normal"],["click","Positiva: TEP confirmado"],["fill","gw","68"],["click","Concluir: nota do episódio"]] },
];

(async () => {
  const b = await chromium.launch();
  const out = [];
  const SEL=(process.env.CASE_IDS||'').split(',').filter(Boolean);
  for (const c of CASOS) {
    if (SEL.length && !SEL.includes(c.id)) continue;
    const p = await b.newPage({ viewport: { width: 400, height: 860 } });
    const errs = [];
    p.on('pageerror', e => errs.push(String(e)));
    p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    p.on('dialog', d => d.accept());
    await p.goto(URL);
    let toques = 0, falha = null;
    try {
      for (const s of c.passos) {
        const [op, a, v] = s;
        if (op === 'card') await p.locator('button.card', { hasText: a }).first().click();
        else if (op === 'hr') await p.locator('div.hr', { hasText: a }).first().click();
        else if (op === 'click') await p.locator('.scr button', { hasText: a }).first().click();
        else if (op === 'check') await p.locator('#' + a).check({ force: true });
        else if (op === 'fill') await p.locator('#' + a).fill(v);
        else if (op === 'radio') await p.locator('#' + a + ' label[data-v="' + v + '"]').click();
        else if (op === 'open') { const d = p.locator('#' + a); if (!(await d.evaluate(e => e.open))) await d.locator('> summary').click(); }
        else if (op === 'btnin') await p.locator('#' + a + ' button').first().click();
        toques++;
        await p.waitForTimeout(60);
      }
    } catch (e) { falha = String(e).split('\n')[0]; }
    const r = await p.evaluate(() => {
      const scr = document.querySelector('.scr') || document.body;
      const txt = el => el ? el.innerText.replace(/\s+\n/g, '\n').trim() : '';
      return {
        crumbs: ST.trail.map(t => t.crumb),
        ecra: ST.trail.length ? ST.trail[ST.trail.length - 1].id : null,
        h2: txt(scr.querySelector('h2')),
        verdicts: [...scr.querySelectorAll('.verdict')].filter(v => v.style.display !== 'none').map(txt),
        warn: [...scr.querySelectorAll('.warnband')].filter(v => v.style.display !== 'none').map(txt),
        infos: [...scr.querySelectorAll('details.info > summary')].map(txt),
        nota: buildNote(),
        sw: document.documentElement.scrollWidth,
      };
    });
    out.push({ id: c.id, titulo: c.titulo, caso: c.caso, toques, falha, erros: errs, ...r });
    await p.close();
  }
  await b.close();
  require('fs').writeFileSync(path.join(os.tmpdir(), 'tev-casos-out.json'), JSON.stringify(out, null, 2));
  for (const o of out) {
    console.log('\n########## ' + o.id + ' · ' + o.titulo);
    console.log('toques: ' + o.toques + (o.falha ? '   FALHA: ' + o.falha : '') + (o.erros.length ? '   ERROS JS: ' + o.erros.join(' | ') : '') + (o.sw > 400 ? '   TRANSBORDO ' + o.sw : ''));
    console.log('percurso: ' + o.crumbs.join(' > ') + '   [' + o.ecra + ']');
    console.log('h2: ' + o.h2);
    o.verdicts.forEach(v => console.log('  ▌' + v.replace(/\n/g, '\n  ▌')));
    o.warn.forEach(v => console.log('  ⚠ ' + v.replace(/\n/g, ' ')));
    console.log('ⓘ: ' + o.infos.join(' | '));
    console.log('NOTA:\n' + o.nota.replace(/^/gm, '    '));
  }
})();
