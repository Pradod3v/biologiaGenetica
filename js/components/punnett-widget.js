/* Widget interativo de Punnett — monta selects + tabela + resultados
   dentro de um elemento alvo. Usado na aula "Quadro de Punnett" e no
   Laboratório Genético. */
window.mountPunnettWidget = function(el, opts){
  opts = opts || {};
  const monoOptions = ["AA","Aa","aa"];
  const diOptions = ["AABB","AABb","AAbb","AaBB","AaBb","Aabb","aaBB","aaBb","aabb"];

  let mode = opts.initialMode || "mono"; // ou 'di'
  let g1 = opts.initialG1 || (mode === "di" ? "AaBb" : "Aa");
  let g2 = opts.initialG2 || (mode === "di" ? "AaBb" : "Aa");

  function render(){
    const options = mode === "mono" ? monoOptions : diOptions;
    if (!options.includes(g1)) g1 = options[Math.floor(options.length/2)];
    if (!options.includes(g2)) g2 = options[Math.floor(options.length/2)];

    const result = window.PunnettEngine.build(g1, g2);

    el.innerHTML = `
      <div class="card card-tick">
        <div class="grid grid-3" style="align-items:end;">
          <div class="field">
            <label for="pw-mode">Tipo de característica</label>
            <select id="pw-mode">
              <option value="mono" ${mode==="mono"?"selected":""}>Uma característica (mono-híbrido)</option>
              <option value="di" ${mode==="di"?"selected":""}>Duas características (dihíbrido)</option>
            </select>
          </div>
          <div class="field">
            <label for="pw-g1">Genótipo — indivíduo 1</label>
            <select id="pw-g1">${options.map(o=>`<option value="${o}" ${o===g1?"selected":""}>${o}</option>`).join("")}</select>
          </div>
          <div class="field">
            <label for="pw-g2">Genótipo — indivíduo 2</label>
            <select id="pw-g2">${options.map(o=>`<option value="${o}" ${o===g2?"selected":""}>${o}</option>`).join("")}</select>
          </div>
        </div>

        <h4 class="mt-4">Cruzamento: <span class="geno">${g1} × ${g2}</span></h4>
        <div class="punnett-wrap">
          <table class="punnett">
            <tr><td class="corner"></td>${result.gametesA.map(g=>`<th>${g}</th>`).join("")}</tr>
            ${result.grid.map((row,ri) => `<tr><th>${result.gametesB[ri]}</th>${row.map(cell => {
              const isDom = window.PunnettEngine.phenotypeKey(cell).indexOf("R") === -1;
              return `<td class="${isDom?'dom':'rec'}">${cell}</td>`;
            }).join("")}</tr>`).join("")}
          </table>
        </div>

        <div class="grid grid-2 mt-4">
          <div>
            <h4>Resultado genotípico</h4>
            <div class="result-block">
              ${Object.entries(result.genoCounts).map(([g,c]) => {
                const pct = Math.round(c/result.total*100);
                return `<div class="bar-row"><span class="label geno">${g}</span><div class="progress" style="flex:1"><span style="width:${pct}%"></span></div><span class="value">${pct}%</span></div>`;
              }).join("")}
            </div>
          </div>
          <div>
            <h4>Resultado fenotípico</h4>
            <div class="result-block">
              ${Object.entries(result.phenoCounts).map(([k,c]) => {
                const pct = Math.round(c/result.total*100);
                return `<div class="bar-row"><span class="label">${window.PunnettEngine.phenoLabel(k)}</span><div class="progress amber" style="flex:1"><span style="width:${pct}%"></span></div><span class="value">${pct}%</span></div>`;
              }).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    el.querySelector("#pw-mode").addEventListener("change", e => { mode = e.target.value; render(); });
    el.querySelector("#pw-g1").addEventListener("change", e => { g1 = e.target.value; render(); });
    el.querySelector("#pw-g2").addEventListener("change", e => { g2 = e.target.value; render(); });
  }

  render();
};
