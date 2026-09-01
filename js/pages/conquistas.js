window.renderConquistas = function(mount){
  const s = window.AppState.get();
  const { current, next } = window.getLevelForXp(s.xp);
  const progressToNext = next ? Math.round(((s.xp-current.min)/(next.min-current.min))*100) : 100;

  mount.innerHTML = `
    <div class="page-head">
      <div><span class="eyebrow">Gamificação</span><h1>Conquistas</h1></div>
    </div>

    <div class="card card-tick">
      <div class="flex-between">
        <div>
          <span class="eyebrow">Nível atual</span>
          <h2 class="mb-0">${current.name}</h2>
        </div>
        <div class="stat-value">${s.xp} XP</div>
      </div>
      <div class="progress mt-3"><span style="width:${progressToNext}%"></span></div>
      <p class="muted mt-2 mb-0">${next ? `Faltam ${next.min - s.xp} XP para o nível "${next.name}"` : "Você atingiu o nível máximo: Geneticista!"}</p>
    </div>

    <h2 class="mt-6">Trilha de níveis</h2>
    <div class="grid grid-3">
      ${window.LEVELS.map((lvl,i) => `
        <div class="card-flat ${s.xp>=lvl.min?'':''}" style="opacity:${s.xp>=lvl.min?1:0.5}">
          <span class="badge ${s.xp>=lvl.min?'':'badge-outline'}">Nível ${i+1}</span>
          <h4 class="mt-2 mb-0">${lvl.name}</h4>
          <p class="muted mb-0">a partir de ${lvl.min} XP</p>
        </div>
      `).join("")}
    </div>

    <h2 class="mt-6">Insígnias</h2>
    <div class="grid grid-4">
      ${window.ACHIEVEMENTS.map(a => {
        const unlocked = s.achievementsUnlocked.includes(a.id);
        return `<div class="card-flat center" style="opacity:${unlocked?1:0.45}">
          <div style="font-size:28px;">${a.icon}</div>
          <p class="mb-0 mt-2" style="font-size:13.5px;">${a.label}</p>
          ${unlocked ? `<span class="badge mt-2">Desbloqueada</span>` : `<span class="badge badge-outline mt-2">Bloqueada</span>`}
        </div>`;
      }).join("")}
    </div>
  `;
};
