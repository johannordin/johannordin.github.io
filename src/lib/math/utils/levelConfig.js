/** All 16 levels: 4 chapters × 3 regular + 1 boss
 *  zombieSpeed is in depth-units per frame (depth goes 1.0 → 0.0)
 *  ~0.003 = slow (level 1), ~0.006 = fast (later levels), ~0.002 = boss crawl
 */
export const LEVELS = [
  // ── Chapter 1: Addition ──────────────────────────────────────────────────
  {
    id: 1, chapter: 1, chapterName: 'Chapter 1', levelName: 'Dead Simple',
    operation: 'add', isBoss: false,
    zombieCount: 6, zombieSpeed: 0.003,
    problemConfig: { minA: 1, maxA: 9, minB: 1, maxB: 9 },
  },
  {
    id: 2, chapter: 1, chapterName: 'Chapter 1', levelName: 'Rising Dead',
    operation: 'add', isBoss: false,
    zombieCount: 8, zombieSpeed: 0.0035,
    problemConfig: { minA: 10, maxA: 50, minB: 1, maxB: 9 },
  },
  {
    id: 3, chapter: 1, chapterName: 'Chapter 1', levelName: 'Undead Surge',
    operation: 'add', isBoss: false,
    zombieCount: 10, zombieSpeed: 0.004,
    problemConfig: { minA: 10, maxA: 99, minB: 10, maxB: 99 },
  },
  {
    id: 4, chapter: 1, chapterName: 'Chapter 1', levelName: '☠ BOSS: Adder',
    operation: 'add', isBoss: true,
    zombieCount: 1, zombieSpeed: 0.002, bossHp: 5,
    problemConfig: { minA: 100, maxA: 999, minB: 100, maxB: 999 },
  },

  // ── Chapter 2: Subtraction ───────────────────────────────────────────────
  {
    id: 5, chapter: 2, chapterName: 'Chapter 2', levelName: 'Minus Menace',
    operation: 'sub', isBoss: false,
    zombieCount: 8, zombieSpeed: 0.004,
    problemConfig: { minA: 2, maxA: 9, minB: 1, maxB: 9 },
  },
  {
    id: 6, chapter: 2, chapterName: 'Chapter 2', levelName: 'Grave Digger',
    operation: 'sub', isBoss: false,
    zombieCount: 10, zombieSpeed: 0.0045,
    problemConfig: { minA: 10, maxA: 50, minB: 1, maxB: 9 },
  },
  {
    id: 7, chapter: 2, chapterName: 'Chapter 2', levelName: 'Brain Drain',
    operation: 'sub', isBoss: false,
    zombieCount: 12, zombieSpeed: 0.005,
    problemConfig: { minA: 20, maxA: 99, minB: 10, maxB: 50 },
  },
  {
    id: 8, chapter: 2, chapterName: 'Chapter 2', levelName: '☠ BOSS: Subtractor',
    operation: 'sub', isBoss: true,
    zombieCount: 1, zombieSpeed: 0.002, bossHp: 5,
    problemConfig: { minA: 200, maxA: 999, minB: 100, maxB: 499 },
  },

  // ── Chapter 3: Multiplication ────────────────────────────────────────────
  {
    id: 9, chapter: 3, chapterName: 'Chapter 3', levelName: 'Times Terror',
    operation: 'mul', isBoss: false,
    zombieCount: 8, zombieSpeed: 0.004,
    problemConfig: { minA: 2, maxA: 9, minB: 2, maxB: 9 },
  },
  {
    id: 10, chapter: 3, chapterName: 'Chapter 3', levelName: 'Multiply or Die',
    operation: 'mul', isBoss: false,
    zombieCount: 10, zombieSpeed: 0.005,
    problemConfig: { minA: 2, maxA: 12, minB: 6, maxB: 12 },
  },
  {
    id: 11, chapter: 3, chapterName: 'Chapter 3', levelName: 'Product of Evil',
    operation: 'mul', isBoss: false,
    zombieCount: 12, zombieSpeed: 0.0055,
    problemConfig: { minA: 10, maxA: 25, minB: 10, maxB: 25 },
  },
  {
    id: 12, chapter: 3, chapterName: 'Chapter 3', levelName: '☠ BOSS: Multiplier',
    operation: 'mul', isBoss: true,
    zombieCount: 1, zombieSpeed: 0.0025, bossHp: 5,
    problemConfig: { minA: 20, maxA: 50, minB: 20, maxB: 50 },
  },

  // ── Chapter 4: Division ──────────────────────────────────────────────────
  {
    id: 13, chapter: 4, chapterName: 'Chapter 4', levelName: 'Divided We Fall',
    operation: 'div', isBoss: false,
    zombieCount: 8, zombieSpeed: 0.005,
    problemConfig: { minA: 1, maxA: 9, minB: 1, maxB: 9 },
  },
  {
    id: 14, chapter: 4, chapterName: 'Chapter 4', levelName: 'Long Division',
    operation: 'div', isBoss: false,
    zombieCount: 10, zombieSpeed: 0.0055,
    problemConfig: { minA: 2, maxA: 12, minB: 2, maxB: 12 },
  },
  {
    id: 15, chapter: 4, chapterName: 'Chapter 4', levelName: 'Remainder of Life',
    operation: 'div', isBoss: false,
    zombieCount: 12, zombieSpeed: 0.006,
    problemConfig: { minA: 2, maxA: 20, minB: 2, maxB: 20 },
  },
  {
    id: 16, chapter: 4, chapterName: 'Chapter 4', levelName: '☠ BOSS: The Divider',
    operation: 'div', isBoss: true,
    zombieCount: 1, zombieSpeed: 0.0025, bossHp: 6,
    problemConfig: { minA: 2, maxA: 25, minB: 2, maxB: 25 },
  },
];
