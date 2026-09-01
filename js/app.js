(function(){
  function showToast(html, ms){
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = html;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), ms || 3200);
  }

  window.addEventListener("achievement-unlocked", (e) => {
    showToast(`${e.detail.icon} Conquista desbloqueada: <strong>${e.detail.label}</strong>`);
  });

  function renderRoute(){
    const { route, sub, params } = window.Router.currentRoute();
    const mount = document.getElementById("main-content");
    window.renderShellChrome(route);

    const routes = {
      dashboard: () => window.renderDashboard(mount),
      conteudos: () => window.renderContents(mount),
      aula: () => window.renderLesson(mount, sub),
      exercicios: () => window.renderExercises(mount, params),
      simulados: () => window.renderSimulados(mount),
      revisao: () => window.renderRevisao(mount),
      glossario: () => window.renderGlossario(mount),
      progresso: () => window.renderProgresso(mount),
      conquistas: () => window.renderConquistas(mount),
      laboratorio: () => window.renderLaboratorio(mount),
      busca: () => window.renderBusca(mount, params),
      "minha-revisao": () => window.renderMinhaRevisao(mount)
    };

    (routes[route] || routes.dashboard)();
    window.scrollTo(0,0);
    mount.focus && mount.focus();
  }

  window.initTheme();
  window.addEventListener("hashchange", renderRoute);
  window.addEventListener("DOMContentLoaded", renderRoute);
  if (document.readyState !== "loading") renderRoute();
})();
