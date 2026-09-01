window.renderDashboard = function(mount){
  const s = window.AppState.get();
  const lessons = window.getLessonsOrdered();
  const completedCount = s.lessonsCompleted.length;
  const totalLessons = lessons.length;
  const overallPct = totalLessons ? Math.round((completedCount/totalLessons)*100) : 0;
  const { current, next } = window.getLevelForXp(s.xp);
  const nextLessonObj = lessons.find(l => !s.lessonsCompleted.includes(l.id)) || lessons[0];
  const lastLessonId = Object.keys(s.lessonProgress).sort((a,b) => 0)[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  const weak = window.AppState.weakestCategories(1);
  const strong = window.AppState.strongestCategories(1);

  mount.innerHTML = `
    <div class="page-head">
      <div>
        <span class="eyebrow">${greeting}</span>
        <h1>${s.name}, vamos estudar genética?</h1>
        <p class="muted">Sua trilha está ${overallPct}% concluída. Continue de onde parou.</p>
      </div>
      <a href="#/aula/${nextLessonObj.id}" class="btn btn-primary">Continuar estudando ${window.Icon("chevron")}</a>
    </div>

    <div class="bento">
      <div class="card card-tick span-2">
        <span class="eyebrow">Progresso geral</span>
        <div class="stat-value">${overallPct}%</div>
        <div class="progress mt-3"><span style="width:${overallPct}%"></span></div>
        <p class="muted mt-3 mb-0">${completedCount} de ${totalLessons} aulas concluídas</p>
      </div>
      <div class="card">
        <span class="eyebrow">Sequência de estudos</span>
        <div class="stat-value">${s.streak} ${window.Icon("flame")}</div>
        <div class="stat-label">dias seguidos</div>
      </div>
      <div class="card">
        <span class="eyebrow">Nível atual</span>
        <div class="stat-value" style="font-size:22px;">${current.name}</div>
        <div class="stat-label">${s.xp} XP ${next ? `· faltam ${next.min - s.xp} para ${next.name}` : "· nível máximo!"}</div>
      </div>

      <div class="card">
        <span class="eyebrow">Exercícios respondidos</span>
        <div class="stat-value">${s.answered}</div>
      </div>
      <div class="card">
        <span class="eyebrow">Taxa média de acertos</span>
        <div class="stat-value">${window.AppState.accuracy()}%</div>
      </div>
      <div class="card">
        <span class="eyebrow">Simulados feitos</span>
        <div class="stat-value">${s.simulados.length}</div>
      </div>
    </div>

    ${weak.length ? `
    <div class="callout warn mt-5">
      <div>${window.Icon("target")}</div>
      <div>
        <strong>⚠️ Parece que você está tendo dificuldade em ${window.CATEGORY_LABELS[weak[0].cat]}.</strong>
        <p class="mb-0 mt-1">Você acertou ${weak[0].pct}% das questões desse tema. Recomendamos revisar antes de seguir em frente.</p>
        <a href="#/exercicios?cat=${weak[0].cat}" class="btn btn-sm btn-ghost mt-2">Revisar agora</a>
      </div>
    </div>` : ""}
    ${(!weak.length && strong.length && strong[0].pct >= 85) ? `
    <div class="callout good mt-5">
      <div>${window.Icon("flame")}</div>
      <div><strong>🔥 Excelente desempenho em ${window.CATEGORY_LABELS[strong[0].cat]}!</strong>
      <p class="mb-0 mt-1">Você está pronto para questões mais difíceis desse tema.</p></div>
    </div>` : ""}

    <h2 class="mt-6">Atalhos rápidos</h2>
    <div class="grid grid-4">
      <a href="#/conteudos" class="card-flat" style="text-decoration:none;color:inherit;">${window.Icon("book")}<h4 class="mt-2 mb-0">Teoria</h4></a>
      <a href="#/exercicios" class="card-flat" style="text-decoration:none;color:inherit;">${window.Icon("pencil")}<h4 class="mt-2 mb-0">Exercícios</h4></a>
      <a href="#/simulados" class="card-flat" style="text-decoration:none;color:inherit;">${window.Icon("target")}<h4 class="mt-2 mb-0">Simulados</h4></a>
      <a href="#/revisao" class="card-flat" style="text-decoration:none;color:inherit;">${window.Icon("refresh")}<h4 class="mt-2 mb-0">Revisão</h4></a>
    </div>

    <h2 class="mt-6">Recomendado para você</h2>
    <div class="grid grid-3">
      ${lessons.filter(l => !s.lessonsCompleted.includes(l.id)).slice(0,3).map(l => `
        <a href="#/aula/${l.id}" class="card-flat" style="text-decoration:none;color:inherit;">
          <span class="badge badge-outline">Aula ${String(l.order).padStart(2,'0')}</span>
          <h4 class="mt-2">${l.title}</h4>
          <p class="muted mb-0">${l.short}</p>
        </a>
      `).join("") || `<p class="muted">Você concluiu toda a trilha! Que tal um simulado completo?</p>`}
    </div>
  `;
};
