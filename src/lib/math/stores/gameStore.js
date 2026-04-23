import { writable, derived } from 'svelte/store';
import { LEVELS } from '../utils/levelConfig.js';

export const SCREENS = {
  START: 'start',
  BOSS_WARNING: 'bossWarning',
  GAME: 'game',
  LEVEL_COMPLETE: 'levelComplete',
  GAME_OVER: 'gameOver',
  VICTORY: 'victory',
};

function loadHiscores() {
  try {
    return JSON.parse(localStorage.getItem('motd_hiscores') || '{}');
  } catch { return {}; }
}

function isBetter(next, prev) {
  if (!prev) return true;
  if (next.score !== prev.score) return next.score > prev.score;
  if (next.levels !== prev.levels) return next.levels > prev.levels;
  return next.time > prev.time;
}

function createGameStore() {
  const initial = {
    screen: SCREENS.START,
    lives: 3,
    score: 0,
    levelIndex: 0,
    levelsCompleted: 0,
    difficulty: 'normal',
    startTime: null,
    runTime: 0,
    isNewHiscore: false,
    hiscores: loadHiscores(),
  };

  const { subscribe, set, update } = writable(initial);

  function finalise(s) {
    const elapsed = s.startTime ? Math.floor((Date.now() - s.startTime) / 1000) : 0;
    const run = { score: s.score, levels: s.levelsCompleted, time: elapsed };
    const prev = s.hiscores[s.difficulty];
    const better = isBetter(run, prev);
    const hiscores = better ? { ...s.hiscores, [s.difficulty]: run } : s.hiscores;
    if (better) localStorage.setItem('motd_hiscores', JSON.stringify(hiscores));
    return { runTime: elapsed, hiscores, isNewHiscore: better };
  }

  return {
    subscribe,

    startGame() {
      update(s => ({
        ...initial,
        screen: SCREENS.GAME,
        difficulty: s.difficulty,
        hiscores: loadHiscores(),
        startTime: Date.now(),
      }));
    },

    goToLevel(index) {
      update(s => {
        const level = LEVELS[index];
        if (!level) return s;
        const nextScreen = level.isBoss ? SCREENS.BOSS_WARNING : SCREENS.GAME;
        return { ...s, levelIndex: index, screen: nextScreen };
      });
    },

    startLevelAfterWarning() {
      update(s => ({ ...s, screen: SCREENS.GAME }));
    },

    loseLife() {
      update(s => {
        const lives = s.lives - 1;
        if (lives <= 0) {
          const fin = finalise(s);
          return { ...s, lives: 0, screen: SCREENS.GAME_OVER, ...fin };
        }
        return { ...s, lives };
      });
    },

    addScore(points) {
      update(s => ({ ...s, score: s.score + points }));
    },

    setDifficulty(d) {
      update(s => ({ ...s, difficulty: d }));
    },

    levelComplete() {
      update(s => ({ ...s, screen: SCREENS.LEVEL_COMPLETE, levelsCompleted: s.levelsCompleted + 1 }));
    },

    nextLevel() {
      update(s => {
        const nextIndex = s.levelIndex + 1;
        if (nextIndex >= LEVELS.length) {
          const fin = finalise(s);
          return { ...s, screen: SCREENS.VICTORY, ...fin };
        }
        const level = LEVELS[nextIndex];
        const nextScreen = level.isBoss ? SCREENS.BOSS_WARNING : SCREENS.GAME;
        return { ...s, levelIndex: nextIndex, screen: nextScreen };
      });
    },

    reset() {
      set({ ...initial, hiscores: loadHiscores() });
    },
  };
}

export const game = createGameStore();
export const currentLevel = derived(game, $g => LEVELS[$g.levelIndex]);

