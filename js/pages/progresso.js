window.renderProgresso = function(mount){
  const s = window.AppState.get();
  const lessons = window.getLessonsOrdered();
  const bestSimulado = s.simulados.reduce((max, r) => Math.max(max, r.pct), 0);

  const catRows = Object.entries(s.categoryStats)
    .filter(([,v]) => v.answered > 0)
    .map(([cat,v]) => ({ cat, pct: Math.round((v.correct/v.answered)*100), answered:v.answered }))
    .sort((a,b) => b.pct - a.pct);

  mount.innerHTML = `
    <div class="page-head">
      <div><span class="eyebrow">Acompanhamento</span><h1>Meu progresso</h1></div>
    </div>

    <div class="grid grid-4">
      <div class="card"><span class="eyebrow">Aulas concluídas</span><div class="stat-value">${s.lessonsCompleted.length}/${lessons.length}</div></div>
      <div class="card"><span class="eyebrow">Exercícios respondidos</span><div class="stat-value">${s.answered}</div></div>
      <div class="card"><span class="eyebrow">Acertos</span><div class="stat-value">${s.correct}</div></div>
      <div class="card"><span class="eyebrow">Simulados realizados</span><div class="stat-value">${s.simulados.length}</div></div>
      <div class="card"><span class="eyebrow">Média geral</span><div class="stat-value">${window.AppState.accuracy()}%</div></div>
      <div class="card"><span class="eyebrow">Melhor nota em simulado</span><div class="stat-value">${bestSimulado}%</div></div>
      <div class="card"><span class="eyebrow">Sequência de estudos</span><div class="stat-value">${s.streak}</div></div>
      <div class="card"><span class="eyebrow">Erros salvos p/ revisão</span><div class="stat-value">${s.wrongQuestions.length}</div></div>
    </div>

    <h2 class="mt-6">Desempenho por conteúdo</h2>
    ${catRows.length ? `
    <div class="card">
      ${catRows.map(r => `
        <div class="bar-row">
          <span class="label">${window.CATEGORY_LABELS[r.cat]}</span>
          <div class="progress ${r.pct<70?'amber':''}" style="flex:1"><span style="width:${r.pct}%"></span></div>
          <span class="value">${r.pct}%</span>
        </div>
      `).join("")}
    </div>` : `<div class="empty">Responda exercícios para ver seu desempenho por conteúdo.</div>`}

    <h2 class="mt-6">Trilha de conteúdos</h2>
    <div class="card">
      ${lessons.map(l => {
        const pct = s.lessonProgress[l.id] || 0;
        return `<div class="bar-row"><span class="label">${l.title}</span><div class="progress" style="flex:1"><span style="width:${pct}%"></span></div><span class="value">${pct}%</span></div>`;
      }).join("")}
    </div>
  `;
};
