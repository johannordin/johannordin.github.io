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

function createGameStore() {
  const initial = {
    screen: SCREENS.START,
    lives: 3,
    score: 0,
    levelIndex: 0,
    difficulty: 'normal',
    highScore: parseInt(localStorage.getItem('motd_highscore') || '0'),
  };

  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,

    startGame() {
      update(s => ({
        ...initial,
        screen: SCREENS.GAME,
        difficulty: s.difficulty,
        highScore: parseInt(localStorage.getItem('motd_highscore') || '0'),
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
          const newHigh = Math.max(s.score, s.highScore);
          localStorage.setItem('motd_highscore', String(newHigh));
          return { ...s, lives: 0, screen: SCREENS.GAME_OVER, highScore: newHigh };
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
      update(s => ({ ...s, screen: SCREENS.LEVEL_COMPLETE }));
    },

    nextLevel() {
      update(s => {
        const nextIndex = s.levelIndex + 1;
        if (nextIndex >= LEVELS.length) {
          const newHigh = Math.max(s.score, s.highScore);
          localStorage.setItem('motd_highscore', String(newHigh));
          return { ...s, screen: SCREENS.VICTORY, highScore: newHigh };
        }
        const level = LEVELS[nextIndex];
        const nextScreen = level.isBoss ? SCREENS.BOSS_WARNING : SCREENS.GAME;
        return { ...s, levelIndex: nextIndex, screen: nextScreen };
      });
    },

    reset() {
      set({ ...initial, highScore: parseInt(localStorage.getItem('motd_highscore') || '0') });
    },
  };
}

export const game = createGameStore();

export const currentLevel = derived(game, $g => LEVELS[$g.levelIndex]);
