window.renderContents = function(mount){
  const s = window.AppState.get();
  const lessons = window.getLessonsOrdered();

  mount.innerHTML = `
    <div class="page-head">
      <div><span class="eyebrow">Trilha de aprendizagem</span><h1>Conteúdos</h1>
      <p class="muted">Siga a trilha na ordem sugerida — cada aula constrói sobre a anterior.</p></div>
    </div>
    <div id="trail"></div>
  `;

  const trail = mount.querySelector("#trail");
  trail.innerHTML = lessons.map(l => {
    const pct = s.lessonProgress[l.id] || 0;
    const done = s.lessonsCompleted.includes(l.id);
    const status = done ? "done" : pct > 0 ? "andamento" : "";
    const statusLabel = done ? "Concluído" : pct > 0 ? "Em andamento" : "Não iniciado";
    const diffClass = l.difficulty === "Fácil" ? "diff-facil" : l.difficulty === "Médio" ? "diff-medio" : "diff-dificil";
    return `
      <a href="#/aula/${l.id}" class="trail-item ${status}">
        <span class="trail-num">${done ? window.Icon("check") : String(l.order).padStart(2,'0')}</span>
        <div class="trail-body">
          <div class="flex-between">
            <h4 class="mb-0">${l.title}</h4>
            <span class="badge ${done?'':'badge-outline'}">${statusLabel}</span>
          </div>
          <p class="muted mt-2 mb-0">${l.short}</p>
          <div class="trail-meta">
            <span class="${diffClass}">● ${l.difficulty}</span>
            <span>${window.Icon("clock","icon")} ${l.minutes} min</span>
            <span>${pct}% concluído</span>
          </div>
          <div class="progress mt-2"><span style="width:${pct}%"></span></div>
        </div>
      </a>
    `;
  }).join("");
};
