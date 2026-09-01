window.NAV_ITEMS = [
  { route:"dashboard", label:"Dashboard", icon:"home" },
  { route:"conteudos", label:"Conteúdos", icon:"book" },
  { route:"laboratorio", label:"Genética", icon:"dna" },
  { route:"exercicios", label:"Exercícios", icon:"pencil" },
  { route:"simulados", label:"Simulados", icon:"target" },
  { route:"revisao", label:"Revisão", icon:"refresh" },
  { route:"glossario", label:"Glossário", icon:"bookopen" },
  { route:"progresso", label:"Meu progresso", icon:"chart" },
  { route:"conquistas", label:"Conquistas", icon:"trophy" }
];

function navLinksHTML(activeRoute, cls){
  return window.NAV_ITEMS.map(item => `
    <a href="#/${item.route}" class="${cls} ${activeRoute===item.route?'active':''}">
      ${window.Icon(item.icon, "icon")}<span>${item.label}</span>
    </a>
  `).join("");
}

window.renderShellChrome = function(activeRoute){
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <div class="brand">
      ${window.Icon("dna","brand-mark")}
      <div class="brand-text">Genética<span>Plataforma de estudos</span></div>
    </div>
    <nav class="nav">${navLinksHTML(activeRoute, "")}</nav>
    <div class="sidebar-foot">
      <div class="theme-toggle">
        <button data-theme-btn="light">${window.Icon("sun")} Claro</button>
        <button data-theme-btn="dark">${window.Icon("moon")} Escuro</button>
      </div>
      <a href="#/minha-revisao" class="btn btn-ghost btn-block btn-sm">${window.Icon("bookmark")} Minha revisão</a>
    </div>
  `;

  const mobileTop = document.getElementById("mobile-topbar");
  mobileTop.innerHTML = `
    <button id="mobile-menu-btn" aria-label="Abrir menu">${window.Icon("menu")}</button>
    <div class="brand">${window.Icon("dna","brand-mark")}<div class="brand-text" style="font-size:15px;">Genética</div></div>
    <a href="#/busca" class="icon-btn" aria-label="Buscar">${window.Icon("search")}</a>
  `;

  const mobileNav = document.getElementById("mobile-nav");
  const mobileNavItems = ["dashboard","conteudos","exercicios","simulados","progresso"];
  mobileNav.innerHTML = mobileNavItems.map(r => {
    const item = window.NAV_ITEMS.find(i=>i.route===r);
    return `<a href="#/${r}" class="${activeRoute===r?'active':''}">${window.Icon(item.icon,"icon")}<span>${item.label.split(" ")[0]}</span></a>`;
  }).join("");

  const drawer = document.getElementById("mobile-drawer");
  drawer.innerHTML = `
    <div class="backdrop"></div>
    <div class="panel">
      <div class="brand">${window.Icon("dna","brand-mark")}<div class="brand-text">Genética<span>Plataforma de estudos</span></div></div>
      <nav class="nav">${navLinksHTML(activeRoute, "")}</nav>
      <div class="theme-toggle">
        <button data-theme-btn="light">${window.Icon("sun")} Claro</button>
        <button data-theme-btn="dark">${window.Icon("moon")} Escuro</button>
      </div>
    </div>
  `;
  drawer.querySelector(".backdrop").addEventListener("click", () => drawer.classList.remove("open"));
  drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", () => drawer.classList.remove("open")));
  document.getElementById("mobile-menu-btn").addEventListener("click", () => drawer.classList.add("open"));

  document.querySelectorAll("[data-theme-btn]").forEach(btn => {
    btn.addEventListener("click", () => window.setTheme(btn.dataset.themeBtn));
  });
  updateThemeButtons();
};

function updateThemeButtons(){
  const theme = document.documentElement.dataset.theme || "light";
  document.querySelectorAll("[data-theme-btn]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.themeBtn === theme);
  });
}

window.setTheme = function(theme){
  document.documentElement.dataset.theme = theme;
  try{ localStorage.setItem("genetica-theme", theme); }catch(e){}
  updateThemeButtons();
};

window.initTheme = function(){
  let theme = "light";
  try{ theme = localStorage.getItem("genetica-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); }catch(e){}
  document.documentElement.dataset.theme = theme;
};
