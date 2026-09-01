window.renderGlossario = function(mount){
  mount.innerHTML = `
    <div class="page-head">
      <div><span class="eyebrow">Consulta rápida</span><h1>Glossário</h1></div>
    </div>
    <div class="search-box">${window.Icon("search")}<input type="text" id="gloss-search" placeholder="Buscar um termo, ex: heterozigoto"></div>
    <div id="gloss-list" class="mt-5"></div>
  `;
  const list = mount.querySelector("#gloss-list");
  function paint(filter){
    const f = (filter||"").toLowerCase();
    const terms = window.GLOSSARY
      .filter(t => t.term.toLowerCase().includes(f) || t.def.toLowerCase().includes(f))
      .sort((a,b) => a.term.localeCompare(b.term));
    list.innerHTML = terms.length ? terms.map(t => `
      <div class="card-flat mb-3">
        <div class="flex-between">
          <h4 class="mb-0">${t.term}</h4>
          ${window.AppState.isFavorite("glossary", t.term) ? `<button class="icon-btn fav" data-term="${t.term}">${window.Icon("starfill")}</button>` : `<button class="icon-btn fav" data-term="${t.term}">${window.Icon("star")}</button>`}
        </div>
        <p class="mb-0 mt-2">${t.def}</p>
        ${t.lesson ? `<a href="#/aula/${t.lesson}" class="badge badge-outline mt-2" style="text-decoration:none;">Ver aula relacionada →</a>` : ""}
      </div>
    `).join("") : `<div class="empty">Nenhum termo encontrado para "${filter}".</div>`;

    list.querySelectorAll(".fav").forEach(btn => btn.addEventListener("click", () => {
      window.AppState.toggleFavorite("glossary", btn.dataset.term);
      paint(mount.querySelector("#gloss-search").value);
    }));
  }
  mount.querySelector("#gloss-search").addEventListener("input", e => paint(e.target.value));
  paint("");
};
