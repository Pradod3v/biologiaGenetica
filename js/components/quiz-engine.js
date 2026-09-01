/* Motor de quiz reutilizável.
   window.mountQuiz(el, questions, { recordState, onFinish, title }) */
window.mountQuiz = function(el, questions, opts){
  opts = opts || {};
  const recordState = opts.recordState !== false;
  let idx = 0;
  let correctCount = 0;
  const startTime = Date.now();
  const answers = []; // {question, correct}

  function diffBadge(d){
    const map = { facil:["🟢 Fácil","diff-facil"], medio:["🟡 Médio","diff-medio"], dificil:["🔴 Difícil","diff-dificil"] };
    const [label, cls] = map[d] || map.facil;
    return `<span class="${cls}">${label}</span>`;
  }

  function renderQuestion(){
    if (idx >= questions.length){
      renderFinish();
      return;
    }
    const q = questions[idx];
    el.innerHTML = `
      <div class="card quiz-card">
        <div class="quiz-progress">
          <span>Questão ${idx+1} de ${questions.length}</span>
          <span>${diffBadge(q.difficulty)} · ${window.CATEGORY_LABELS[q.category]||q.category}</span>
        </div>
        <h3>${q.prompt}</h3>
        <div id="qz-options"></div>
        <div id="qz-feedback"></div>
        <div class="flex-between mt-4">
          <span class="muted" id="qz-tally">Acertos até agora: ${correctCount}/${idx}</span>
          <button class="btn btn-primary" id="qz-next" style="display:none;">${idx===questions.length-1 ? "Ver resultado" : "Próxima"}</button>
        </div>
      </div>
    `;
    const optWrap = el.querySelector("#qz-options");
    q.options.forEach((opt, i) => {
      const b = document.createElement("button");
      b.className = "quiz-option";
      b.textContent = opt;
      b.addEventListener("click", () => selectAnswer(i));
      optWrap.appendChild(b);
    });
  }

  function selectAnswer(i){
    const q = questions[idx];
    const isCorrect = i === q.correct;
    if (isCorrect) correctCount++;
    answers.push({ question:q, correct:isCorrect });
    if (recordState && window.AppState) window.AppState.answerQuestion(q, isCorrect);

    [...el.querySelectorAll(".quiz-option")].forEach((btn, bi) => {
      btn.disabled = true;
      if (bi === q.correct) btn.classList.add("correct");
      else if (bi === i) btn.classList.add("incorrect");
    });

    el.querySelector("#qz-feedback").innerHTML = `
      <div class="feedback-banner ${isCorrect?'ok':'no'}">${isCorrect ? "✅ Acertou!" : "❌ Não foi dessa vez."}</div>
      <p class="muted">${q.explanation}</p>
    `;
    el.querySelector("#qz-tally").textContent = `Acertos até agora: ${correctCount}/${idx+1}`;
    el.querySelector("#qz-next").style.display = "inline-flex";
    el.querySelector("#qz-next").onclick = () => { idx++; renderQuestion(); };
  }

  function renderFinish(){
    const timeSec = Math.round((Date.now()-startTime)/1000);
    const pct = questions.length ? Math.round((correctCount/questions.length)*100) : 0;

    // desempenho por categoria nesta rodada
    const byCat = {};
    answers.forEach(a => {
      const c = a.question.category;
      byCat[c] = byCat[c] || { correct:0, total:0 };
      byCat[c].total++;
      if (a.correct) byCat[c].correct++;
    });
    const catRows = Object.entries(byCat).map(([cat,v]) => ({ cat, pct: Math.round(v.correct/v.total*100) }));
    const weak = catRows.filter(r => r.pct < 70).sort((a,b)=>a.pct-b.pct);
    const strong = catRows.filter(r => r.pct >= 70).sort((a,b)=>b.pct-a.pct);

    el.innerHTML = `
      <div class="card quiz-card center">
        <span class="eyebrow">Resultado</span>
        <div class="stat-value">${pct}%</div>
        <p class="muted">${correctCount} de ${questions.length} corretas · ${timeSec}s</p>
        <div class="progress mt-2 mb-0"><span style="width:${pct}%"></span></div>
      </div>
      ${weak.length ? `
      <div class="card mt-4">
        <h4>Você precisa revisar:</h4>
        <div class="pill-row">${weak.map(w=>`<span class="badge badge-clay">${window.CATEGORY_LABELS[w.cat]||w.cat} — ${w.pct}%</span>`).join("")}</div>
      </div>` : ""}
      ${strong.length ? `
      <div class="card mt-4">
        <h4>Melhor desempenho:</h4>
        <div class="pill-row">${strong.map(w=>`<span class="badge">${window.CATEGORY_LABELS[w.cat]||w.cat} — ${w.pct}%</span>`).join("")}</div>
      </div>` : ""}
      <div class="mt-4"><button class="btn btn-ghost" id="qz-restart">Refazer</button></div>
    `;
    el.querySelector("#qz-restart").addEventListener("click", () => {
      idx = 0; correctCount = 0; answers.length = 0;
      renderQuestion();
    });

    if (opts.onFinish) opts.onFinish({ correctCount, total: questions.length, pct, timeSec, byCat });
  }

  renderQuestion();
};
