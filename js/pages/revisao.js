window.REVIEW_CARDS = [
  { front:"O que é um heterozigoto?", back:"Indivíduo que possui dois alelos diferentes para determinado gene (ex.: Aa)." },
  { front:"O que é um homozigoto?", back:"Indivíduo que possui dois alelos idênticos para determinado gene (ex.: AA ou aa)." },
  { front:"Qual a proporção genotípica de Aa × Aa?", back:"1 AA : 2 Aa : 1 aa" },
  { front:"Qual a proporção fenotípica de Aa × Aa?", back:"3 partes dominante : 1 parte recessiva" },
  { front:"Qual a proporção fenotípica de AaBb × AaBb?", back:"9 : 3 : 3 : 1" },
  { front:"O que diz a Primeira Lei de Mendel?", back:"Cada par de alelos se separa (segrega) na formação dos gametas — cada gameta recebe apenas um alelo." },
  { front:"O que diz a Segunda Lei de Mendel?", back:"Genes de características diferentes segregam de forma independente entre si na formação dos gametas." },
  { front:"Quais são os genótipos possíveis do tipo sanguíneo A?", back:"IAIA ou IAi" },
  { front:"Por que homens manifestam mais características recessivas ligadas ao X?", back:"Porque possuem apenas um cromossomo X — basta um alelo recessivo para a característica aparecer." },
  { front:"O que é codominância?", back:"Quando dois alelos diferentes se expressam ao mesmo tempo no fenótipo, como no tipo sanguíneo AB." },
  { front:"Qual genótipo Rh corresponde a Rh negativo?", back:"rr (homozigoto recessivo)" },
  { front:"O que representa um símbolo preenchido em um heredograma?", back:"Um indivíduo afetado pela característica em estudo." }
];

window.renderRevisao = function(mount){
  let tab = "resumo";

  function render(){
    mount.innerHTML = `
      <div class="page-head">
        <div><span class="eyebrow">Antes da prova</span><h1>Modo Revisão</h1></div>
      </div>
      <div class="tabs">
        <button data-tab="resumo" class="${tab==='resumo'?'active':''}">Revisão para a prova</button>
        <button data-tab="flash" class="${tab==='flash'?'active':''}">Cartões de revisão</button>
        <button data-tab="dificil" class="${tab==='dificil'?'active':''}">Minhas dificuldades</button>
      </div>
      <div id="tab-content"></div>
    `;
    mount.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => { tab = b.dataset.tab; render(); }));
    const content = mount.querySelector("#tab-content");
    if (tab === "resumo") content.innerHTML = resumoHTML();
    else if (tab === "flash") renderFlash(content);
    else content.innerHTML = dificuldadesHTML();
  }

  function resumoHTML(){
    return `
      <div class="card card-tick">
        <h3>Conceitos fundamentais</h3>
        <p>Genótipo = combinação de alelos. Fenótipo = característica observável. Homozigoto = alelos iguais. Heterozigoto = alelos diferentes.</p>
        <hr>
        <h3>Primeira Lei de Mendel</h3>
        <p>Cada par de alelos se separa na formação dos gametas. <span class="geno">Aa × Aa</span> → proporção genotípica <strong>1:2:1</strong> e fenotípica <strong>3:1</strong>.</p>
        <hr>
        <h3>Segunda Lei de Mendel</h3>
        <p>Genes de características diferentes segregam de forma independente. <span class="geno">AaBb × AaBb</span> → proporção fenotípica <strong>9:3:3:1</strong>.</p>
        <hr>
        <h3>Regras do quadro de Punnett</h3>
        <p>Gametas de um progenitor nas linhas, do outro nas colunas. Cada célula é uma combinação genotípica possível da descendência.</p>
        <hr>
        <h3>Sistema ABO</h3>
        <p>3 alelos: <span class="geno">Iᴬ</span>, <span class="geno">Iᴮ</span> (codominantes) e <span class="geno">i</span> (recessivo). AB = <span class="geno">IᴬIᴮ</span>. O = <span class="geno">ii</span>.</p>
        <hr>
        <h3>Sistema Rh</h3>
        <p><span class="geno">R</span> dominante (Rh+), <span class="geno">r</span> recessivo (Rh−). Só é Rh− quem for <span class="geno">rr</span>.</p>
        <hr>
        <h3>Herança ligada ao sexo</h3>
        <p>Mulheres <span class="geno">XX</span>, homens <span class="geno">XY</span>. Um único alelo recessivo no X do homem já manifesta a característica.</p>
        <hr>
        <h3>Heredogramas</h3>
        <p>□ homem, ○ mulher, preenchido = afetado. Pais não afetados com filho afetado → característica recessiva.</p>
      </div>
    `;
  }

  function renderFlash(content){
    let i = 0;
    function paint(){
      const card = window.REVIEW_CARDS[i];
      content.innerHTML = `
        <p class="muted center">Cartão ${i+1} de ${window.REVIEW_CARDS.length} — clique para virar</p>
        <div class="flashcard" id="fc">
          <div class="flashcard-inner">
            <div class="flashcard-face front">${card.front}</div>
            <div class="flashcard-face back">${card.back}</div>
          </div>
        </div>
        <div class="flex-between mt-4">
          <button class="btn btn-ghost" id="fc-prev" ${i===0?'disabled':''}>← Anterior</button>
          <button class="btn btn-ghost" id="fc-next" ${i===window.REVIEW_CARDS.length-1?'disabled':''}>Próximo →</button>
        </div>
      `;
      content.querySelector("#fc").addEventListener("click", (e) => e.currentTarget.classList.toggle("flipped"));
      content.querySelector("#fc-prev").addEventListener("click", () => { i = Math.max(0,i-1); paint(); });
      content.querySelector("#fc-next").addEventListener("click", () => { i = Math.min(window.REVIEW_CARDS.length-1,i+1); paint(); });
    }
    paint();
  }

  function dificuldadesHTML(){
    const weak = window.AppState.weakestCategories();
    if (!weak.length){
      return `<div class="empty"><p>Responda alguns exercícios para vermos onde você mais precisa praticar.</p><a href="#/exercicios" class="btn btn-primary">Ir para exercícios</a></div>`;
    }
    return `
      <div class="card">
        <h3>Minhas dificuldades</h3>
        <ol>
          ${weak.map(w => `<li class="mb-3"><div class="flex-between"><strong>${window.CATEGORY_LABELS[w.cat]}</strong><span class="mono">${w.pct}%</span></div>
            <div class="progress mt-2"><span style="width:${w.pct}%"></span></div></li>`).join("")}
        </ol>
        <a href="#/exercicios?cat=${weak[0].cat}" class="btn btn-primary">Praticar novamente</a>
      </div>
    `;
  }

  render();
};
