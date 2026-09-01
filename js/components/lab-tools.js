/* =========================================================
   Ferramentas do Laboratório Genético
   ========================================================= */

/* ---------- ABO ---------- */
window.mountABOTool = function(el){
  const genoOptions = [
    { v:"IAIA", label:"IᴬIᴬ (tipo A)" }, { v:"IAi", label:"IᴬI (tipo A)" },
    { v:"IBIB", label:"IᴮIᴮ (tipo B)" }, { v:"IBi", label:"IᴮI (tipo B)" },
    { v:"IAIB", label:"IᴬIᴮ (tipo AB)" }, { v:"ii", label:"ii (tipo O)" }
  ];
  function alleles(g){
    if (g==="IAIA") return ["IA","IA"];
    if (g==="IAi") return ["IA","i"];
    if (g==="IBIB") return ["IB","IB"];
    if (g==="IBi") return ["IB","i"];
    if (g==="IAIB") return ["IA","IB"];
    return ["i","i"];
  }
  function phenoOf(pair){
    const has = a => pair.includes(a);
    if (has("IA") && has("IB")) return "AB";
    if (has("IA")) return "A";
    if (has("IB")) return "B";
    return "O";
  }
  function fmt(a){ return a==="IA" ? "Iᴬ" : a==="IB" ? "Iᴮ" : "i"; }
  function orderPair(x,y){ return x==="i" && y!=="i" ? [y,x] : [x,y]; }

  let g1 = "IAi", g2 = "IBi";

  function render(){
    const a1 = alleles(g1), a2 = alleles(g2);
    const counts = {};
    const cells = [];
    a1.forEach(x => a2.forEach(y => {
      const pheno = phenoOf([x,y]);
      counts[pheno] = (counts[pheno]||0)+1;
      cells.push({x,y,pheno});
    }));
    const total = a1.length*a2.length;

    el.innerHTML = `
      <div class="card card-tick">
        <div class="grid grid-2">
          <div class="field"><label>Pai / progenitor 1</label>
            <select id="abo-g1">${genoOptions.map(o=>`<option value="${o.v}" ${o.v===g1?"selected":""}>${o.label}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Mãe / progenitor 2</label>
            <select id="abo-g2">${genoOptions.map(o=>`<option value="${o.v}" ${o.v===g2?"selected":""}>${o.label}</option>`).join("")}</select>
          </div>
        </div>
        <div class="punnett-wrap">
          <table class="punnett">
            <tr><td class="corner"></td>${a1.map(a=>`<th>${fmt(a)}</th>`).join("")}</tr>
            ${a2.map(y => `<tr><th>${fmt(y)}</th>${a1.map(x=>{ const [p,q]=orderPair(x,y); return `<td>${fmt(p)}${fmt(q)}</td>`; }).join("")}</tr>`).join("")}
          </table>
        </div>
        <h4>Tipos sanguíneos possíveis nos filhos</h4>
        <div class="result-block">
          ${Object.entries(counts).map(([pheno,c]) => {
            const pct = Math.round(c/total*100);
            return `<div class="bar-row"><span class="label">Tipo ${pheno}</span><div class="progress" style="flex:1"><span style="width:${pct}%"></span></div><span class="value">${pct}%</span></div>`;
          }).join("")}
        </div>
      </div>
    `;
    el.querySelector("#abo-g1").addEventListener("change", e => { g1 = e.target.value; render(); });
    el.querySelector("#abo-g2").addEventListener("change", e => { g2 = e.target.value; render(); });
  }
  render();
};

/* ---------- RH ---------- */
window.mountRhTool = function(el){
  const options = ["RR","Rr","rr"];
  let g1 = "Rr", g2 = "Rr";
  function render(){
    const result = window.PunnettEngine.build(g1, g2);
    el.innerHTML = `
      <div class="card card-tick">
        <div class="grid grid-2">
          <div class="field"><label>Progenitor 1</label>
            <select id="rh-g1">${options.map(o=>`<option ${o===g1?"selected":""}>${o}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Progenitor 2</label>
            <select id="rh-g2">${options.map(o=>`<option ${o===g2?"selected":""}>${o}</option>`).join("")}</select>
          </div>
        </div>
        <div class="punnett-wrap">
          <table class="punnett">
            <tr><td class="corner"></td>${result.gametesA.map(g=>`<th>${g}</th>`).join("")}</tr>
            ${result.grid.map((row,ri)=>`<tr><th>${result.gametesB[ri]}</th>${row.map(c=>`<td class="${c.includes('R')?'dom':'rec'}">${c}</td>`).join("")}</tr>`).join("")}
          </table>
        </div>
        <h4>Resultado (fator Rh)</h4>
        <div class="result-block">
          ${Object.entries(result.genoCounts).map(([g,c])=>{
            const pct = Math.round(c/result.total*100);
            const label = g.includes("R") ? `${g} → Rh+` : `${g} → Rh−`;
            return `<div class="bar-row"><span class="label geno">${label}</span><div class="progress" style="flex:1"><span style="width:${pct}%"></span></div><span class="value">${pct}%</span></div>`;
          }).join("")}
        </div>
      </div>
    `;
    el.querySelector("#rh-g1").addEventListener("change", e=>{g1=e.target.value; render();});
    el.querySelector("#rh-g2").addEventListener("change", e=>{g2=e.target.value; render();});
  }
  render();
};

/* ---------- Herança ligada ao sexo ---------- */
window.mountSexLinkedTool = function(el){
  const motherOptions = ["XAXA","XAXa","XaXa"];
  const fatherOptions = ["XAY","XaY"];
  let mg = "XAXa", fg = "XaY";
  function fmt(a){ return a==="XA" ? "Xᴬ" : a==="Xa" ? "Xᵃ" : "Y"; }
  function motherGametes(g){ return g==="XAXA" ? ["XA","XA"] : g==="XaXa" ? ["Xa","Xa"] : ["XA","Xa"]; }
  function fatherGametes(g){ return g==="XAY" ? ["XA","Y"] : ["Xa","Y"]; }

  function render(){
    const mGam = motherGametes(mg), fGam = fatherGametes(fg);
    const daughters = [], sons = [];
    mGam.forEach(m => fGam.forEach(f => {
      if (f === "Y"){ sons.push(m+"Y"); }
      else {
        const pair = [m,f].sort((a,b)=> a==="XA"&&b==="Xa" ? -1 : (a==="Xa"&&b==="XA"?1:0));
        daughters.push(pair.join(""));
      }
    }));
    function tally(list){
      const c = {}; list.forEach(x=>c[x]=(c[x]||0)+1); return c;
    }
    const dCounts = tally(daughters), sCounts = tally(sons);
    const dTotal = daughters.length, sTotal = sons.length;

    function fmtGeno(g){
      if (g.endsWith("Y")) return fmt(g.slice(0,2)) + "Y";
      return fmt(g.slice(0,2)) + fmt(g.slice(2));
    }
    function affected(g){ return !g.includes("XA"); }

    el.innerHTML = `
      <div class="card card-tick">
        <div class="grid grid-2">
          <div class="field"><label>Genótipo da mãe</label>
            <select id="sl-mg">${motherOptions.map(o=>`<option ${o===mg?"selected":""}>${o}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Genótipo do pai</label>
            <select id="sl-fg">${fatherOptions.map(o=>`<option ${o===fg?"selected":""}>${o}</option>`).join("")}</select>
          </div>
        </div>
        <div class="grid grid-2">
          <div>
            <h4>Filhas</h4>
            <div class="result-block">
              ${Object.entries(dCounts).map(([g,c])=>{
                const pct = Math.round(c/dTotal*100);
                return `<div class="bar-row"><span class="label geno">${fmtGeno(g)}</span><div class="progress ${affected(g)?'amber':''}" style="flex:1"><span style="width:${pct}%"></span></div><span class="value">${pct}%</span></div>`;
              }).join("") || '<p class="muted">Sem filhas possíveis neste cruzamento.</p>'}
            </div>
          </div>
          <div>
            <h4>Filhos</h4>
            <div class="result-block">
              ${Object.entries(sCounts).map(([g,c])=>{
                const pct = Math.round(c/sTotal*100);
                return `<div class="bar-row"><span class="label geno">${fmtGeno(g)}</span><div class="progress ${affected(g)?'amber':''}" style="flex:1"><span style="width:${pct}%"></span></div><span class="value">${pct}%</span></div>`;
              }).join("") || '<p class="muted">Sem filhos possíveis neste cruzamento.</p>'}
            </div>
          </div>
        </div>
        <p class="muted mt-2 mb-0">Barra em âmbar indica genótipo afetado pela condição recessiva.</p>
      </div>
    `;
    el.querySelector("#sl-mg").addEventListener("change", e=>{mg=e.target.value; render();});
    el.querySelector("#sl-fg").addEventListener("change", e=>{fg=e.target.value; render();});
  }
  render();
};

/* ---------- Probabilidade — calculadora ---------- */
window.mountProbabilityTool = function(el){
  el.innerHTML = `
    <div class="card card-tick">
      <p class="muted">Informe duas probabilidades (em fração, ex.: 1/4) e escolha a regra a aplicar.</p>
      <div class="grid grid-3">
        <div class="field"><label>Probabilidade A</label><input type="text" id="pb-a" value="1/2" placeholder="ex: 1/2"></div>
        <div class="field"><label>Regra</label>
          <select id="pb-op"><option value="mult">E (multiplicação)</option><option value="add">OU (adição)</option></select>
        </div>
        <div class="field"><label>Probabilidade B</label><input type="text" id="pb-b" value="1/2" placeholder="ex: 1/2"></div>
      </div>
      <button class="btn btn-primary" id="pb-calc">Calcular</button>
      <div id="pb-result" class="mt-4"></div>
    </div>
  `;
  function parseFrac(s){
    s = s.trim();
    if (s.includes("/")){ const [n,d] = s.split("/").map(Number); return n/d; }
    return Number(s);
  }
  el.querySelector("#pb-calc").addEventListener("click", () => {
    const a = parseFrac(el.querySelector("#pb-a").value);
    const b = parseFrac(el.querySelector("#pb-b").value);
    const op = el.querySelector("#pb-op").value;
    if (isNaN(a) || isNaN(b)){
      el.querySelector("#pb-result").innerHTML = `<p class="muted">Digite valores válidos, como 1/4 ou 0.25.</p>`;
      return;
    }
    const result = op === "mult" ? a*b : a+b;
    const label = op === "mult" ? "Regra da multiplicação (E)" : "Regra da adição (OU)";
    el.querySelector("#pb-result").innerHTML = `
      <div class="callout good">
        <div>
          <strong>${label}</strong>
          <p class="mb-0 mt-2">Resultado: <span class="mono">${(result*100).toFixed(1)}%</span> (${a} ${op==='mult'?'×':'+'} ${b} = ${result.toFixed(4)})</p>
        </div>
      </div>`;
  });
};

/* ---------- Linha do tempo de Mendel (P -> F1 -> F2) ---------- */
window.mountMendelTimeline = function(el){
  const steps = [
    { id:"P", title:"Geração P (parental)", text:"Mendel cruzou linhagens puras — por exemplo, ervilhas de semente lisa (puras) com ervilhas de semente rugosa (puras)." },
    { id:"F1", title:"Geração F1", text:"Todos os descendentes de F1 apresentaram sementes lisas — o fenótipo dominante encobriu o recessivo, que não desapareceu, apenas ficou 'escondido'." },
    { id:"F2", title:"Geração F2", text:"Cruzando os indivíduos de F1 entre si, o fenótipo rugoso reapareceu em cerca de 1/4 dos descendentes — proporção 3:1 entre liso e rugoso." }
  ];
  el.innerHTML = steps.map((s,i) => `
    <button class="card-flat" data-step="${i}" style="text-align:left;cursor:pointer;">
      <span class="badge">${s.id}</span>
      <h4 class="mt-2">${s.title}</h4>
      <p class="muted mb-0">Clique para ver a explicação</p>
    </button>
  `).join("") + `<div id="mendel-detail" class="mt-4"></div>`;

  const detail = () => document.getElementById("mendel-detail");
  el.querySelectorAll("[data-step]").forEach(btn => {
    btn.addEventListener("click", () => {
      const s = steps[Number(btn.dataset.step)];
      detail().innerHTML = `<div class="callout good"><div><strong>${s.title}</strong><p class="mb-0 mt-2">${s.text}</p></div></div>`;
    });
  });
  detail().innerHTML = `<div class="callout good"><div><strong>${steps[0].title}</strong><p class="mb-0 mt-2">${steps[0].text}</p></div></div>`;
};

/* ---------- Visual de dominância ---------- */
window.mountDominanciaVisual = function(el){
  const options = ["AA","Aa","aa"];
  let geno = "Aa";
  function render(){
    const dominant = geno.includes("A");
    el.innerHTML = `
      <div class="card-flat">
        <div class="field"><label>Escolha um genótipo</label>
          <select id="dv-geno">${options.map(o=>`<option ${o===geno?"selected":""}>${o}</option>`).join("")}</select>
        </div>
        <div class="flex gap-4" style="align-items:center;">
          <div style="width:64px;height:64px;border-radius:50%;background:${dominant?'var(--moss)':'var(--clay)'};flex-shrink:0;"></div>
          <div>
            <div class="geno" style="font-size:22px;">${geno}</div>
            <p class="mb-0 muted">Fenótipo: <strong style="color:${dominant?'var(--moss-dark)':'var(--clay)'}">${dominant ? "Dominante" : "Recessivo"}</strong></p>
          </div>
        </div>
      </div>
    `;
    el.querySelector("#dv-geno").addEventListener("change", e => { geno = e.target.value; render(); });
  }
  render();
};

/* ---------- Construtor / analisador de heredograma ---------- */
window.mountHeredogramTool = function(el){
  const presets = {
    recessiva: {
      label: "Herança autossômica recessiva",
      svg: heredogramSVG([
        {id:"I-1", sex:"M", affected:false, x:80, y:40}, {id:"I-2", sex:"F", affected:false, x:200, y:40},
        {id:"II-1", sex:"F", affected:false, x:60, y:140}, {id:"II-2", sex:"M", affected:true, x:140, y:140}, {id:"II-3", sex:"F", affected:false, x:220, y:140},
      ], [["I-1","I-2"]], [["I-1I-2","II-1"],["I-1I-2","II-2"],["I-1I-2","II-3"]]),
      questions: [
        { q:"Os pais (I-1 e I-2) são afetados?", options:["Sim","Não"], correct:1 },
        { q:"O filho II-2 é afetado. O que isso indica sobre a característica?", options:["É dominante","É recessiva"], correct:1 },
        { q:"Qual o genótipo mais provável dos pais I-1 e I-2?", options:["Homozigotos dominantes","Heterozigotos (portadores)"], correct:1 }
      ]
    },
    dominante: {
      label: "Herança autossômica dominante",
      svg: heredogramSVG([
        {id:"I-1", sex:"M", affected:true, x:80, y:40}, {id:"I-2", sex:"F", affected:false, x:200, y:40},
        {id:"II-1", sex:"F", affected:true, x:60, y:140}, {id:"II-2", sex:"M", affected:false, x:140, y:140}, {id:"II-3", sex:"F", affected:true, x:220, y:140},
      ], [["I-1","I-2"]], [["I-1I-2","II-1"],["I-1I-2","II-2"],["I-1I-2","II-3"]]),
      questions: [
        { q:"O pai I-1 é afetado e alguns filhos também são. Isso é mais compatível com característica:", options:["Recessiva","Dominante"], correct:1 },
        { q:"É possível um casal totalmente afetado por dominante ter filho não afetado?", options:["Sim, se ambos forem heterozigotos","Não, nunca"], correct:0 }
      ]
    },
    ligadaX: {
      label: "Herança ligada ao X recessiva",
      svg: heredogramSVG([
        {id:"I-1", sex:"M", affected:false, x:80, y:40}, {id:"I-2", sex:"F", affected:false, x:200, y:40},
        {id:"II-1", sex:"M", affected:true, x:60, y:140}, {id:"II-2", sex:"F", affected:false, x:140, y:140}, {id:"II-3", sex:"M", affected:false, x:220, y:140},
      ], [["I-1","I-2"]], [["I-1I-2","II-1"],["I-1I-2","II-2"],["I-1I-2","II-3"]]),
      questions: [
        { q:"Apenas o filho homem (II-1) é afetado, os pais não. Isso sugere:", options:["Herança autossômica dominante","Herança ligada ao X recessiva"], correct:1 },
        { q:"Qual é o genótipo mais provável da mãe I-2?", options:["Homozigota dominante","Portadora heterozigota"], correct:1 }
      ]
    }
  };

  function heredogramSVG(people, couples, parentChild){
    const shape = p => p.sex === "M"
      ? `<rect x="${p.x-16}" y="${p.y-16}" width="32" height="32" fill="${p.affected ? 'var(--ink)' : 'var(--paper-raised)'}" stroke="var(--ink)" stroke-width="2"/>`
      : `<circle cx="${p.x}" cy="${p.y}" r="17" fill="${p.affected ? 'var(--ink)' : 'var(--paper-raised)'}" stroke="var(--ink)" stroke-width="2"/>`;
    const lines = couples.map(([a,b]) => {
      const pa = people.find(p=>p.id===a), pb = people.find(p=>p.id===b);
      return `<line x1="${pa.x}" y1="${pa.y}" x2="${pb.x}" y2="${pb.y}" stroke="var(--ink)" stroke-width="1.5"/>`;
    }).join("");
    const drops = parentChild.map(([coupleKey, childId]) => {
      const ids = coupleKey.match(/[IVX]+-\d/g);
      const pa = people.find(p=>p.id===ids[0]), pb = people.find(p=>p.id===ids[1]);
      const child = people.find(p=>p.id===childId);
      const midX = (pa.x+pb.x)/2;
      return `<line x1="${midX}" y1="${pa.y}" x2="${midX}" y2="${child.y}" stroke="var(--ink)" stroke-width="1.5"/><line x1="${midX}" y1="${child.y}" x2="${child.x}" y2="${child.y}" stroke="var(--ink)" stroke-width="1.5"/>`;
    }).join("");
    const labels = people.map(p => `<text x="${p.x}" y="${p.y+34}" font-size="11" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-mono)">${p.id}</text>`).join("");
    return `<svg viewBox="0 0 280 180" style="width:100%;max-width:360px;">${lines}${drops}${people.map(shape).join("")}${labels}</svg>`;
  }

  let current = "recessiva";
  const answers = {};

  function render(){
    const preset = presets[current];
    el.innerHTML = `
      <div class="card card-tick">
        <div class="field">
          <label>Escolha um padrão de herança para analisar</label>
          <select id="hg-select">
            ${Object.entries(presets).map(([k,v]) => `<option value="${k}" ${k===current?"selected":""}>${v.label}</option>`).join("")}
          </select>
        </div>
        <div class="flex" style="justify-content:center;">${preset.svg}</div>
        <p class="muted center">□ homem · ○ mulher · símbolo preenchido = afetado(a)</p>
        <hr>
        <h4>Analise o heredograma</h4>
        <div id="hg-questions"></div>
      </div>
    `;
    const qWrap = el.querySelector("#hg-questions");
    preset.questions.forEach((q, i) => {
      const wrap = document.createElement("div");
      wrap.className = "card-flat mt-3";
      wrap.innerHTML = `
        <p><strong>${i+1}.</strong> ${q.q}</p>
        <div class="pill-row">
          ${q.options.map((o,oi) => `<button class="btn btn-ghost btn-sm" data-q="${i}" data-o="${oi}">${o}</button>`).join("")}
        </div>
        <div class="mt-2" data-feedback="${i}"></div>
      `;
      qWrap.appendChild(wrap);
    });
    qWrap.querySelectorAll("button[data-q]").forEach(btn => {
      btn.addEventListener("click", () => {
        const qi = Number(btn.dataset.q), oi = Number(btn.dataset.o);
        const q = preset.questions[qi];
        const fb = qWrap.querySelector(`[data-feedback="${qi}"]`);
        fb.innerHTML = oi === q.correct
          ? `<span class="badge">✅ Correto!</span>`
          : `<span class="badge badge-clay">❌ Tente novamente — resposta certa: "${q.options[q.correct]}"</span>`;
      });
    });

    el.querySelector("#hg-select").addEventListener("change", e => { current = e.target.value; render(); });
  }
  render();
};
