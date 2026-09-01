window.LEVELS = [
  { name:"Célula", min:0 },
  { name:"Gene", min:150 },
  { name:"Alelo", min:400 },
  { name:"Genótipo", min:800 },
  { name:"Geneticista", min:1400 }
];

window.getLevelForXp = function(xp){
  let current = window.LEVELS[0], next = window.LEVELS[1] || null;
  for (let i=0;i<window.LEVELS.length;i++){
    if (xp >= window.LEVELS[i].min){ current = window.LEVELS[i]; next = window.LEVELS[i+1] || null; }
  }
  return { current, next };
};

window.ACHIEVEMENTS = [
  { id:"primeira-aula", label:"Primeira aula concluída", icon:"🏅", check: s => s.lessonsCompleted.length >= 1 },
  { id:"dez-questoes", label:"10 questões respondidas", icon:"🏅", check: s => s.answered >= 10 },
  { id:"dez-acertos-seguidos", label:"10 acertos seguidos", icon:"🏅", check: s => s.bestStreak >= 10 },
  { id:"primeiro-simulado", label:"Primeiro simulado concluído", icon:"🏅", check: s => s.simulados.length >= 1 },
  { id:"modulo-100", label:"100% em um módulo", icon:"🏅", check: s => Object.values(s.moduleScores||{}).some(v => v >= 100) },
  { id:"cinco-aulas", label:"5 aulas concluídas", icon:"🎓", check: s => s.lessonsCompleted.length >= 5 },
  { id:"todas-aulas", label:"Trilha completa", icon:"🧬", check: s => s.lessonsCompleted.length >= window.LESSONS.length },
  { id:"streak-7", label:"7 dias seguidos de estudo", icon:"🔥", check: s => s.streak >= 7 }
];
