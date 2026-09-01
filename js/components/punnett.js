/* Lógica genérica para gerar quadros de Punnett a partir de genótipos
   como "Aa", "AA", "AaBb", etc. Funciona para 1 ou 2 genes (loci). */
window.PunnettEngine = (function(){

  // Divide "AaBb" em loci: [{letter:'a', alleles:['A','a']}, {letter:'b', alleles:['B','b']}]
  function parseLoci(genotype){
    const loci = [];
    for (let i=0; i<genotype.length; i+=2){
      const pair = [genotype[i], genotype[i+1]];
      loci.push({ letter: pair[0].toLowerCase(), alleles: pair });
    }
    return loci;
  }

  // Produto cartesiano de um alelo por loco -> lista de gametas (strings)
  function gametes(genotype){
    const loci = parseLoci(genotype);
    let combos = [""];
    loci.forEach(locus => {
      const next = [];
      combos.forEach(c => locus.alleles.forEach(a => next.push(c + a)));
      combos = next;
    });
    return combos;
  }

  // Combina dois gametas em um genótipo de descendente, ordenando
  // maiúscula antes de minúscula em cada loco.
  function combineGametes(g1, g2){
    let result = "";
    for (let i=0; i<g1.length; i++){
      const a = g1[i], b = g2[i];
      const upperFirst = (a === a.toUpperCase()) ? [a,b] : (b===b.toUpperCase() ? [b,a] : [a,b]);
      result += upperFirst[0] + upperFirst[1];
    }
    return result;
  }

  // Fenótipo textual simplificado: para cada loco, "Dominante" se tiver maiúscula, senão "Recessivo"
  function phenotypeKey(genotype){
    const loci = parseLoci(genotype);
    return loci.map(l => (l.alleles[0]===l.alleles[0].toUpperCase() || l.alleles[1]===l.alleles[1].toUpperCase()) ? "D" : "R").join("");
  }

  function build(genoA, genoB){
    const gA = gametes(genoA);
    const gB = gametes(genoB);
    const grid = gB.map(rowGamete => gA.map(colGamete => combineGametes(rowGamete, colGamete)));
    // contagens
    const genoCounts = {};
    const phenoCounts = {};
    grid.flat().forEach(g => {
      genoCounts[g] = (genoCounts[g]||0)+1;
      const pk = phenotypeKey(g);
      phenoCounts[pk] = (phenoCounts[pk]||0)+1;
    });
    const total = gA.length * gB.length;
    return { gametesA:gA, gametesB:gB, grid, genoCounts, phenoCounts, total };
  }

  function phenoLabel(key){
    // "D" -> Dominante ; "DR" -> Dominante/Recessivo (loco1 dominante, loco2 recessivo)
    if (key.length === 1) return key === "D" ? "Fenótipo dominante" : "Fenótipo recessivo";
    return key.split("").map(k => k==="D" ? "dom." : "rec.").join(" / ");
  }

  return { parseLoci, gametes, combineGametes, phenotypeKey, build, phenoLabel };
})();
