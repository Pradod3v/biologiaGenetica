window.renderBusca = function(mount, params){
  mount.innerHTML = `
    <div class="page-head">
      <div><span class="eyebrow">Busca</span><h1>Pesquisar na plataforma</h1></div>
    </div>
    <div class="search-box">${window.Icon("search")}<input type="text" id="global-search" placeholder="Pesquise um termo, ex: heterozigoto"></div>
    <div id="search-results" class="mt-5"></div>
  `;
  const input = mount.querySelector("#global-search");
  const results = mount.querySelector("#search-results");

  function run(q){
    q = (q||"").trim().toLowerCase();
    if (!q){ results.innerHTML = `<div class="empty">Digite um termo para buscar aulas, exercícios e definições.</div>`; return; }

    const gloss = window.GLOSSARY.filter(t => t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q));
    const lessons = window.LESSONS.filter(l => l.title.toLowerCase().includes(q) || l.short.toLowerCase().includes(q));
    const questions = window.QUESTIONS.filter(qq => qq.prompt.toLowerCase().includes(q));

    if (!gloss.length && !lessons.length && !questions.length){
      results.innerHTML = `<div class="empty">Nada encontrado para "${q}".</div>`;
      return;
    }

    results.innerHTML = `
      ${gloss.length ? `<h3>Definições</h3>${gloss.map(t => `
        <div class="card-flat mb-3"><h4 class="mb-0">${t.term}</h4><p class="mb-0 mt-2">${t.def}</p>
        ${t.lesson ? `<a href="#/aula/${t.lesson}" class="badge badge-outline mt-2" style="text-decoration:none;">Aula relacionada →</a>` : ""}</div>
      `).join("")}` : ""}

      ${lessons.length ? `<h3 class="mt-5">Aulas</h3>${lessons.map(l => `
        <a href="#/aula/${l.id}" class="trail-item"><span class="trail-num">${String(l.order).padStart(2,'0')}</span>
          <div class="trail-body"><h4 class="mb-0">${l.title}</h4><p class="muted mb-0 mt-2">${l.short}</p></div></a>
      `).join("")}` : ""}

      ${questions.length ? `<h3 class="mt-5">Exercícios relacionados</h3>${questions.slice(0,8).map(qq => `
        <div class="card-flat mb-3"><span class="badge badge-outline">${window.CATEGORY_LABELS[qq.category]}</span>
          <p class="mt-2 mb-0">${qq.prompt}</p></div>
      `).join("")}` : ""}
    `;
  }

  input.addEventListener("input", e => run(e.target.value));
  if (params && params.q){ input.value = params.q; run(params.q); }
  else run("");
};
