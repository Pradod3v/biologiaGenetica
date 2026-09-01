window.renderMinhaRevisao = function(mount){
  const s = window.AppState.get();
  const favLessons = s.favorites.lessons.map(id => window.getLesson(id)).filter(Boolean);
  const favGlossary = s.favorites.glossary;
  const studyLater = s.studyLater.map(id => window.getLesson(id)).filter(Boolean);
  const wrongQuestions = s.wrongQuestions.map(id => window.QUESTIONS.find(q=>q.id===id)).filter(Boolean);

  mount.innerHTML = `
    <div class="page-head">
      <div><span class="eyebrow">Meus marcadores</span><h1>Minha revisão</h1></div>
    </div>

    <h2>⭐ Aulas favoritas</h2>
    ${favLessons.length ? `<div class="grid grid-3">${favLessons.map(l => `
      <a href="#/aula/${l.id}" class="card-flat" style="text-decoration:none;color:inherit;"><h4 class="mb-0">${l.title}</h4><p class="muted mb-0 mt-2">${l.short}</p></a>
    `).join("")}</div>` : `<p class="muted">Nenhuma aula favoritada ainda.</p>`}

    <h2 class="mt-6">📖 Termos favoritos</h2>
    ${favGlossary.length ? `<div class="pill-row">${favGlossary.map(t => `<span class="badge">${t}</span>`).join("")}</div>` : `<p class="muted">Nenhum termo do glossário favoritado ainda.</p>`}

    <h2 class="mt-6">🕓 Estudar depois</h2>
    ${studyLater.length ? `<div class="grid grid-3">${studyLater.map(l => `
      <a href="#/aula/${l.id}" class="card-flat" style="text-decoration:none;color:inherit;"><h4 class="mb-0">${l.title}</h4><p class="muted mb-0 mt-2">${l.short}</p></a>
    `).join("")}</div>` : `<p class="muted">Sua lista "estudar depois" está vazia.</p>`}

    <h2 class="mt-6">❌ Questões erradas</h2>
    ${wrongQuestions.length ? `
      <div id="wrong-quiz-mount"></div>
      <button class="btn btn-primary mt-4" id="practice-wrong">Praticar essas questões</button>
      <div id="wrong-quiz-area" class="mt-4"></div>
    ` : `<p class="muted">Nenhuma questão pendente de revisão — bom trabalho!</p>`}
  `;

  if (wrongQuestions.length){
    mount.querySelector("#wrong-quiz-mount").innerHTML = wrongQuestions.map(q => `
      <div class="card-flat mb-3"><span class="badge badge-clay">${window.CATEGORY_LABELS[q.category]}</span><p class="mt-2 mb-0">${q.prompt}</p></div>
    `).join("");
    mount.querySelector("#practice-wrong").addEventListener("click", () => {
      window.mountQuiz(mount.querySelector("#wrong-quiz-area"), wrongQuestions, { recordState:true });
    });
  }
};
