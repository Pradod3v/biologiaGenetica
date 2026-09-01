/* Estado global da plataforma — persistido em localStorage.
   Não depende de nenhuma biblioteca externa. */
(function(){
  const STORAGE_KEY = "genetica-platform-state-v1";

  function defaultState(){
    return {
      name: "Estudante",
      xp: 0,
      streak: 0,
      lastStudyDate: null,
      lessonsCompleted: [],       // ids de aulas concluídas
      lessonProgress: {},         // { lessonId: percent }
      answered: 0,
      correct: 0,
      currentStreakAnswers: 0,
      bestStreak: 0,
      categoryStats: {},          // { category: {answered, correct} }
      wrongQuestions: [],         // ids de questões erradas
      favorites: { lessons: [], glossary: [] },
      studyLater: [],             // ids de aulas
      simulados: [],              // histórico { date, size, correct, total, timeSec, byCategory }
      achievementsUnlocked: [],
      moduleScores: {}            // melhor % de acerto por categoria (para "100% em um módulo")
    };
  }

  function load(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return Object.assign(defaultState(), parsed);
    }catch(e){
      console.warn("Não foi possível carregar o progresso salvo, iniciando do zero.", e);
      return defaultState();
    }
  }

  let state = load();
  const listeners = [];

  function save(){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch(e){ console.warn("Não foi possível salvar o progresso.", e); }
    listeners.forEach(fn => fn(state));
  }

  function touchStreak(){
    const today = new Date().toDateString();
    if (state.lastStudyDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (state.lastStudyDate === yesterday) state.streak += 1;
    else state.streak = 1;
    state.lastStudyDate = today;
  }

  function addXp(amount){
    state.xp += amount;
  }

  function checkAchievements(){
    (window.ACHIEVEMENTS || []).forEach(a => {
      if (!state.achievementsUnlocked.includes(a.id) && a.check(state)){
        state.achievementsUnlocked.push(a.id);
        window.dispatchEvent(new CustomEvent("achievement-unlocked", { detail:a }));
      }
    });
  }

  window.AppState = {
    get(){ return state; },

    onChange(fn){ listeners.push(fn); },

    markLessonProgress(lessonId, percent){
      touchStreak();
      state.lessonProgress[lessonId] = Math.max(state.lessonProgress[lessonId]||0, percent);
      if (percent >= 100 && !state.lessonsCompleted.includes(lessonId)){
        state.lessonsCompleted.push(lessonId);
        addXp(30);
      }
      checkAchievements();
      save();
    },

    answerQuestion(question, isCorrect){
      touchStreak();
      state.answered += 1;
      const cat = question.category;
      state.categoryStats[cat] = state.categoryStats[cat] || {answered:0, correct:0};
      state.categoryStats[cat].answered += 1;
      if (isCorrect){
        state.correct += 1;
        state.categoryStats[cat].correct += 1;
        state.currentStreakAnswers += 1;
        state.bestStreak = Math.max(state.bestStreak, state.currentStreakAnswers);
        addXp(10);
        state.wrongQuestions = state.wrongQuestions.filter(id => id !== question.id);
      } else {
        state.currentStreakAnswers = 0;
        if (!state.wrongQuestions.includes(question.id)) state.wrongQuestions.push(question.id);
      }
      const pct = Math.round((state.categoryStats[cat].correct / state.categoryStats[cat].answered)*100);
      state.moduleScores[cat] = Math.max(state.moduleScores[cat]||0, pct);
      checkAchievements();
      save();
    },

    recordSimulado(result){
      touchStreak();
      state.simulados.push(result);
      addXp(Math.round(result.correct * 8));
      checkAchievements();
      save();
    },

    toggleFavorite(kind, id){
      const arr = state.favorites[kind];
      const i = arr.indexOf(id);
      if (i>=0) arr.splice(i,1); else arr.push(id);
      save();
    },
    isFavorite(kind, id){ return state.favorites[kind].includes(id); },

    toggleStudyLater(id){
      const i = state.studyLater.indexOf(id);
      if (i>=0) state.studyLater.splice(i,1); else state.studyLater.push(id);
      save();
    },

    setTheme(theme){
      state.theme = theme;
      save();
    },

    reset(){
      state = defaultState();
      save();
    },

    accuracy(){
      return state.answered ? Math.round((state.correct/state.answered)*100) : 0;
    },

    weakestCategories(limit){
      const rows = Object.entries(state.categoryStats)
        .filter(([,v]) => v.answered >= 1)
        .map(([cat,v]) => ({ cat, pct: Math.round((v.correct/v.answered)*100), answered:v.answered }))
        .sort((a,b) => a.pct - b.pct);
      return limit ? rows.slice(0, limit) : rows;
    },

    strongestCategories(limit){
      const rows = Object.entries(state.categoryStats)
        .filter(([,v]) => v.answered >= 1)
        .map(([cat,v]) => ({ cat, pct: Math.round((v.correct/v.answered)*100), answered:v.answered }))
        .sort((a,b) => b.pct - a.pct);
      return limit ? rows.slice(0, limit) : rows;
    }
  };
})();
