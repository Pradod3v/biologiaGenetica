window.renderSimulados = function(mount){
  const s = window.AppState.get();

  function showMenu(){
    mount.innerHTML = `
      <div class="page-head">
        <div><span class="eyebrow">Teste seus conhecimentos</span><h1>Simulados</h1>
        <p class="muted">As questões misturam todos os conteúdos da trilha.</p></div>
      </div>
      <div class="grid grid-3">
        <div class="card">
          <h3>Simulado rápido</h3>
          <p class="muted">10 questões, ideal para uma revisão rápida.</p>
          <button class="btn btn-primary btn-block" data-size="10">Começar</button>
        </div>
        <div class="card">
          <h3>Simulado completo</h3>
          <p class="muted">20 questões cobrindo toda a trilha.</p>
          <button class="btn btn-primary btn-block" data-size="20">Começar</button>
        </div>
        <div class="card">
          <h3>Simulado desafio</h3>
          <p class="muted">30 questões — para quem quer se testar de verdade.</p>
          <button class="btn btn-primary btn-block" data-size="30">Começar</button>
        </div>
      </div>

      ${s.simulados.length ? `
        <h2 class="mt-6">Histórico</h2>
        <div class="table-scroll"><table>
          <thead><tr><th>Data</th><th>Questões</th><th>Acertos</th><th>%</th><th>Tempo</th></tr></thead>
          <tbody>
            ${[...s.simulados].reverse().slice(0,10).map(r => `
              <tr><td>${new Date(r.date).toLocaleDateString('pt-BR')}</td><td>${r.total}</td><td>${r.correct}</td><td>${r.pct}%</td><td>${r.timeSec}s</td></tr>
            `).join("")}
          </tbody>
        </table></div>
      ` : ""}
    `;
    mount.querySelectorAll("[data-size]").forEach(btn => {
      btn.addEventListener("click", () => startSimulado(Number(btn.dataset.size)));
    });
  }

  function startSimulado(size){
    const questions = window.getRandomMixed(Math.min(size, window.QUESTIONS.length));
    mount.innerHTML = `
      <div class="page-head">
        <div><span class="eyebrow">Simulado</span><h1>${size} questões</h1></div>
        <button class="btn btn-ghost btn-sm" id="back-btn">← Cancelar</button>
      </div>
      <div id="quiz-mount"></div>
    `;
    mount.querySelector("#back-btn").addEventListener("click", showMenu);
    window.mountQuiz(mount.querySelector("#quiz-mount"), questions, {
      recordState: true,
      onFinish: (result) => {
        window.AppState.recordSimulado({
          date: Date.now(), size, total: result.total, correct: result.correctCount,
          pct: result.pct, timeSec: result.timeSec, byCategory: result.byCat
        });
      }
    });
  }

  showMenu();
};
