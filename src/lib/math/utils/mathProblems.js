function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateProblem(operation, config) {
  switch (operation) {
    case 'add': return generateAddition(config);
    case 'sub': return generateSubtraction(config);
    case 'mul': return generateMultiplication(config);
    case 'div': return generateDivision(config);
    default: return generateAddition(config);
  }
}

function generateAddition({ minA, maxA, minB, maxB }) {
  const a = rand(minA, maxA);
  const b = rand(minB, maxB);
  return { display: `${a} + ${b}`, answer: a + b };
}

function generateSubtraction({ minA, maxA, minB, maxB }) {
  let a = rand(minA, maxA);
  let b = rand(minB, maxB);
  // Ensure non-negative result
  if (b > a) [a, b] = [b, a];
  if (a === b) a = b + rand(1, 5);
  return { display: `${a} - ${b}`, answer: a - b };
}

function generateMultiplication({ minA, maxA, minB, maxB }) {
  const a = rand(minA, maxA);
  const b = rand(minB, maxB);
  return { display: `${a} × ${b}`, answer: a * b };
}

function generateDivision({ minA, maxA, minB, maxB }) {
  // Generate a divisor b first, then a multiple of b as the dividend
  const b = rand(Math.max(2, minB), maxB);
  const quotient = rand(Math.max(1, minA), maxA);
  const a = b * quotient;
  return { display: `${a} ÷ ${b}`, answer: quotient };
}

/** Score points awarded for a correct answer */
export function scoreForAnswer(answer, levelIndex) {
  const base = Math.abs(answer);
  const levelBonus = (levelIndex + 1) * 5;
  return Math.max(10, Math.floor(base * 0.5) + levelBonus);
}

/** Pick a random operation from the player's selected set and generate a problem */
export function generateProblemFromOps(selectedOps, config) {
  const op = selectedOps[Math.floor(Math.random() * selectedOps.length)];
  return generateProblem(op, config);
}
