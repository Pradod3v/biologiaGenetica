window.renderLaboratorio = function(mount){
  const tools = [
    { id:"punnett", label:"Simulador de Punnett", desc:"Gera cruzamentos automaticamente para uma ou duas características.", icon:"dna", mount: el => window.mountPunnettWidget(el) },
    { id:"abo", label:"Simulador ABO", desc:"Calcula os possíveis tipos sanguíneos dos descendentes.", icon:"droplet", mount: window.mountABOTool },
    { id:"rh", label:"Simulador Rh", desc:"Calcula as possibilidades do fator Rh na descendência.", icon:"droplet", mount: window.mountRhTool },
    { id:"sexo", label:"Herança ligada ao sexo", desc:"Simula cruzamentos envolvendo genes no cromossomo X.", icon:"dna", mount: window.mountSexLinkedTool },
    { id:"prob", label:"Gerador de probabilidade", desc:"Calcule probabilidades combinadas com as regras da adição e multiplicação.", icon:"target", mount: window.mountProbabilityTool },
    { id:"heredo", label:"Construtor de heredograma", desc:"Analise heredogramas prontos e pratique a dedução de genótipos.", icon:"tree", mount: window.mountHeredogramTool }
  ];
  let active = tools[0].id;

  function render(){
    mount.innerHTML = `
      <div class="page-head">
        <div><span class="eyebrow">Ferramentas interativas</span><h1>Laboratório Genético</h1>
        <p class="muted">Explore simuladores para visualizar cruzamentos e cálculos genéticos na prática.</p></div>
      </div>
      <div class="tabs">
        ${tools.map(t => `<button data-tool="${t.id}" class="${active===t.id?'active':''}">${t.label}</button>`).join("")}
      </div>
      <p class="muted">${tools.find(t=>t.id===active).desc}</p>
      <div id="tool-mount"></div>
    `;
    mount.querySelectorAll("[data-tool]").forEach(b => b.addEventListener("click", () => { active = b.dataset.tool; render(); }));
    tools.find(t => t.id===active).mount(mount.querySelector("#tool-mount"));
  }
  render();
};
