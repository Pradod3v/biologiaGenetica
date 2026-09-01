window.renderExercises = function(mount, params){
  const s = window.AppState.get();
  const categories = Object.keys(window.CATEGORY_LABELS);

  function categoryCard(cat){
    const label = window.CATEGORY_LABELS[cat];
    const count = cat === "misto" ? window.QUESTIONS.length : window.getQuestionsByCategory(cat).length;
    const stat = s.categoryStats[cat];
    const acc = stat && stat.answered ? Math.round((stat.correct/stat.answered)*100) : null;
    return `
      <button class="card-flat" data-cat="${cat}" style="text-align:left;cursor:pointer;">
        <div class="flex-between">
          <h4 class="mb-0">${label}</h4>
          ${acc!==null ? `<span class="badge ${acc>=70?'':'badge-clay'}">${acc}%</span>` : `<span class="badge badge-outline">novo</span>`}
        </div>
        <p class="muted mt-2 mb-0">${count} questões disponíveis</p>
      </button>
    `;
  }

  function showMenu(){
    mount.innerHTML = `
      <div class="page-head">
        <div><span class="eyebrow">Pratique</span><h1>Exercícios</h1>
        <p class="muted">Escolha uma categoria. A dificuldade aumenta progressivamente dentro de cada uma.</p></div>
      </div>
      <div class="grid grid-3">${categories.map(categoryCard).join("")}</div>
    `;
    mount.querySelectorAll("[data-cat]").forEach(btn => {
      btn.addEventListener("click", () => startExercise(btn.dataset.cat));
    });
  }

  function startExercise(cat){
    let list = cat === "misto" ? window.getRandomMixed(10) : [...window.getQuestionsByCategory(cat)];
    const order = { facil:0, medio:1, dificil:2 };
    if (cat !== "misto") list.sort((a,b) => order[a.difficulty]-order[b.difficulty]);
    mount.innerHTML = `
      <div class="page-head">
        <div><span class="eyebrow">${window.CATEGORY_LABELS[cat]}</span><h1>Exercícios</h1></div>
        <button class="btn btn-ghost btn-sm" id="back-to-cats">← Trocar categoria</button>
      </div>
      <div id="quiz-mount"></div>
    `;
    mount.querySelector("#back-to-cats").addEventListener("click", showMenu);
    window.mountQuiz(mount.querySelector("#quiz-mount"), list, { recordState:true });
  }

  if (params && params.cat && (categories.includes(params.cat))){
    startExercise(params.cat);
  } else {
    showMenu();
  }
};
