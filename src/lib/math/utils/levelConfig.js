/**
 * 12 levels — 3 waves × (3 regular + 1 boss).
 * Number ranges climb very gradually so kids can stay comfortable.
 *
 * problemConfig is used for all operations:
 *   add/sub/mul: minA/maxA = left operand, minB/maxB = right operand
 *   div:         minA/maxA = quotient,      minB/maxB = divisor
 *                → dividend = quotient × divisor (handled in generator)
 */
export const LEVELS = [
  // ── Wave 1: Single digits ────────────────────────────────────────────────
  {
    id: 1, waveName: 'Wave 1', levelName: 'First Steps',
    isBoss: false, zombieCount: 6, zombieSpeed: 0.0025,
    problemConfig: { minA: 1, maxA: 5, minB: 1, maxB: 4 },
  },
  {
    id: 2, waveName: 'Wave 1', levelName: 'Keep Going',
    isBoss: false, zombieCount: 7, zombieSpeed: 0.0028,
    problemConfig: { minA: 1, maxA: 7, minB: 1, maxB: 6 },
  },
  {
    id: 3, waveName: 'Wave 1', levelName: 'Single Digits',
    isBoss: false, zombieCount: 8, zombieSpeed: 0.003,
    problemConfig: { minA: 1, maxA: 9, minB: 1, maxB: 9 },
  },
  {
    id: 4, waveName: 'Wave 1', levelName: '☠ BOSS: Digit Lord',
    isBoss: true, zombieCount: 1, zombieSpeed: 0.0018, bossHp: 4,
    problemConfig: { minA: 1, maxA: 9, minB: 1, maxB: 9 },
  },

  // ── Wave 2: Small double digits ──────────────────────────────────────────
  {
    id: 5, waveName: 'Wave 2', levelName: 'Into The Tens',
    isBoss: false, zombieCount: 8, zombieSpeed: 0.0030,
    problemConfig: { minA: 5, maxA: 15, minB: 2, maxB: 9 },
  },
  {
    id: 6, waveName: 'Wave 2', levelName: 'Rising Numbers',
    isBoss: false, zombieCount: 9, zombieSpeed: 0.0033,
    problemConfig: { minA: 10, maxA: 25, minB: 5, maxB: 12 },
  },
  {
    id: 7, waveName: 'Wave 2', levelName: 'Double Trouble',
    isBoss: false, zombieCount: 10, zombieSpeed: 0.0036,
    problemConfig: { minA: 10, maxA: 40, minB: 5, maxB: 20 },
  },
  {
    id: 8, waveName: 'Wave 2', levelName: '☠ BOSS: The Doubler',
    isBoss: true, zombieCount: 1, zombieSpeed: 0.002, bossHp: 5,
    problemConfig: { minA: 10, maxA: 40, minB: 5, maxB: 20 },
  },

  // ── Wave 3: Larger numbers ───────────────────────────────────────────────
  {
    id: 9, waveName: 'Wave 3', levelName: 'Big Brains',
    isBoss: false, zombieCount: 10, zombieSpeed: 0.0038,
    problemConfig: { minA: 20, maxA: 50, minB: 10, maxB: 25 },
  },
  {
    id: 10, waveName: 'Wave 3', levelName: 'Century Rush',
    isBoss: false, zombieCount: 11, zombieSpeed: 0.0042,
    problemConfig: { minA: 20, maxA: 70, minB: 15, maxB: 40 },
  },
  {
    id: 11, waveName: 'Wave 3', levelName: 'Brainiac',
    isBoss: false, zombieCount: 12, zombieSpeed: 0.0046,
    problemConfig: { minA: 30, maxA: 99, minB: 20, maxB: 60 },
  },
  {
    id: 12, waveName: 'Wave 3', levelName: '☠ FINAL BOSS',
    isBoss: true, zombieCount: 1, zombieSpeed: 0.0022, bossHp: 6,
    problemConfig: { minA: 30, maxA: 99, minB: 20, maxB: 60 },
  },
];
