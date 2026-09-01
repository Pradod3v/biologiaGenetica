window.renderLesson = function(mount, lessonId){
  const lesson = window.getLesson(lessonId);
  if (!lesson){
    mount.innerHTML = `<div class="empty"><h2>Aula não encontrada</h2><a href="#/conteudos" class="btn btn-primary">Voltar aos conteúdos</a></div>`;
    return;
  }
  const lessons = window.getLessonsOrdered();
  const idx = lessons.findIndex(l => l.id === lessonId);
  const nextLesson = lessons[idx+1];
  const s = window.AppState.get();
  const isFav = window.AppState.isFavorite("lessons", lessonId);
  const inStudyLater = s.studyLater.includes(lessonId);

  const blockLabels = { concept:"Conceito", example:"Exemplo", visual:"Visualização", practice:"Pratique", summary:"Resumo" };
  const blockCounterByKind = {};
  let n = 0;

  mount.innerHTML = `
    <div class="page-head">
      <div>
        <span class="eyebrow">Aula ${String(lesson.order).padStart(2,'0')} de ${lessons.length}</span>
        <h1>${lesson.title}</h1>
        <p class="muted">${lesson.short}</p>
      </div>
      <div class="flex gap-2">
        <button class="icon-btn" id="fav-btn" title="Favoritar">${window.Icon(isFav?"starfill":"star")}</button>
        <button class="btn btn-ghost btn-sm" id="later-btn">${inStudyLater ? "Remover de 'Estudar depois'" : "Estudar depois"}</button>
      </div>
    </div>

    <div class="progress mb-5"><span id="lesson-progress-bar" style="width:${s.lessonProgress[lessonId]||0}%"></span></div>

    <div id="lesson-blocks"></div>
    <div id="lesson-miniquiz"></div>
    <div id="lesson-complete"></div>
  `;

  const blocksWrap = mount.querySelector("#lesson-blocks");
  lesson.blocks.forEach((b) => {
    n++;
    blocksWrap.innerHTML += `
      <section class="lesson-block">
        <div class="block-kicker"><span class="n">${String(n).padStart(2,'0')}</span> ${blockLabels[b.kind] || ""} — ${b.title}</div>
        ${b.kind === 'summary' ? b.html : `<div class="card">${b.html}</div>`}
      </section>
    `;
  });

  // montar ferramentas interativas embutidas
  const mountIfExists = (id, fn) => { const el = mount.querySelector("#"+id); if (el) fn(el); };
  mountIfExists("mendel-timeline", window.mountMendelTimeline);
  mountIfExists("dominancia-visual", window.mountDominanciaVisual);
  mountIfExists("punnett-tool-mount", el => window.mountPunnettWidget(el));
  mountIfExists("segunda-lei-punnett", el => window.mountPunnettWidget(el, { initialMode:"di", initialG1:"AaBb", initialG2:"AaBb" }));
  mountIfExists("abo-tool-mount", window.mountABOTool);
  mountIfExists("rh-tool-mount", window.mountRhTool);
  mountIfExists("heranca-sexo-tool", window.mountSexLinkedTool);
  mountIfExists("heredograma-tool-mount", window.mountHeredogramTool);

  // miniquiz ao final (também alimenta pequenos quizzes "pratique" embutidos, se existirem)
  const catQuestions = window.getQuestionsByCategory(lesson.category);
  const quickIds = ["mendel-quick-quiz","dominancia-quick-quiz","primeira-lei-quick-quiz","punnett-quick-quiz",
    "probabilidade-quick-quiz","segunda-lei-quick-quiz","heredogramas-quick-quiz","heranca-sexo-quick-quiz",
    "abo-quick-quiz","rh-quick-quiz"];
  quickIds.forEach(id => {
    const el = mount.querySelector("#"+id);
    if (el && catQuestions.length){
      window.mountQuiz(el, catQuestions.slice(0,1), { recordState:true });
    }
  });

  const quizWrap = mount.querySelector("#lesson-miniquiz");
  quizWrap.innerHTML = `<h2 class="mt-6">Miniquiz — teste o que você aprendeu</h2>`;
  const quizMount = document.createElement("div");
  quizWrap.appendChild(quizMount);
  // Evita repetir a questão já usada no bloco "Pratique" embutido, quando houver uma.
  const hasQuickBlock = quickIds.some(id => mount.querySelector("#"+id));
  const miniquizPool = (hasQuickBlock && catQuestions.length > 1) ? catQuestions.slice(1) : catQuestions;
  const quizQuestions = miniquizPool.slice(0, Math.min(5, miniquizPool.length));
  if (quizQuestions.length){
    window.mountQuiz(quizMount, quizQuestions, {
      recordState: true,
      onFinish: (result) => {
        window.AppState.markLessonProgress(lessonId, 100);
        showCompletion();
      }
    });
  } else {
    window.AppState.markLessonProgress(lessonId, 100);
  }

  function showCompletion(){
    const completeWrap = mount.querySelector("#lesson-complete");
    completeWrap.innerHTML = `
      <div class="card center mt-5" style="border-color:var(--moss);">
        <h3>🎉 Conteúdo concluído!</h3>
        ${nextLesson ? `
          <p class="muted">Próximo assunto sugerido:</p>
          <a href="#/aula/${nextLesson.id}" class="btn btn-primary">Ir para "${nextLesson.title}" ${window.Icon("chevron")}</a>
        ` : `<p class="muted">Você concluiu toda a trilha de conteúdos! Que tal um simulado completo?</p>
          <a href="#/simulados" class="btn btn-primary">Ir para Simulados</a>`}
      </div>
    `;
    mount.querySelector("#lesson-progress-bar").style.width = "100%";
  }

  if ((s.lessonProgress[lessonId]||0) >= 100) showCompletion();

  mount.querySelector("#fav-btn").addEventListener("click", () => {
    window.AppState.toggleFavorite("lessons", lessonId);
    window.renderLesson(mount, lessonId);
  });
  mount.querySelector("#later-btn").addEventListener("click", () => {
    window.AppState.toggleStudyLater(lessonId);
    window.renderLesson(mount, lessonId);
  });
};
