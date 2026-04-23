<script>
  import { onMount, onDestroy } from 'svelte';
  import { game, currentLevel } from '../stores/gameStore.js';
  import { generateProblem, scoreForAnswer } from '../utils/mathProblems.js';
  import HUD from './HUD.svelte';
  import Zombie from './Zombie.svelte';
  import NumPad from './NumPad.svelte';

  let zombies = [];
  let nextId = 0;
  let currentInput = '';
  let targetedId = null;
  let flashClass = '';
  let spawnedCount = 0;
  let levelDone = false;
  let activeLevelId = -1;

  let moveInterval = null;
  let spawnTimeout = null;

  const DIFF_MULT = { easy: 0.6, normal: 1.0, hard: 1.5 };
  $: diffMult = DIFF_MULT[$game.difficulty] ?? 1.0;

  const LANES = [-0.75, -0.35, 0, 0.35, 0.75];
  function randomLane() {
    return LANES[Math.floor(Math.random() * LANES.length)];
  }

  $: level = $currentLevel;
  $: targeted = zombies.find(z => z.id === targetedId) ?? zombies[0] ?? null;

  $: if (level && level.id !== activeLevelId) {
    activeLevelId = level.id;
    resetLevel();
  }

  function resetLevel() {
    clearInterval(moveInterval);
    clearTimeout(spawnTimeout);
    zombies = [];
    nextId = 0;
    currentInput = '';
    targetedId = null;
    spawnedCount = 0;
    levelDone = false;
    scheduleSpawn(0);
    startMovement();
  }

  function scheduleSpawn(index) {
    if (!level) return;
    if (index >= level.zombieCount) return;
    // Wider spacing so zombies are well-separated in 3D perspective
    const delay = index === 0 ? 800 : 3500 + Math.random() * 2500;
    spawnTimeout = setTimeout(() => {
      spawnZombie();
      spawnedCount++;
      scheduleSpawn(index + 1);
    }, delay);
  }

  function spawnZombie() {
    if (!level) return;
    const { display, answer } = generateProblem(level.operation, level.problemConfig);
    const isBoss = level.isBoss;
    const hp = isBoss ? (level.bossHp ?? 3) : 1;
    zombies = [...zombies, {
      id: nextId++,
      depth: 1.0,    // 1.0 = far horizon, 0.0 = at player
      lane: randomLane(),
      problem: display,
      answer,
      hp,
      maxHp: hp,
      isDying: false,
      isWrong: false,
    }];
    if (targetedId === null) {
      targetedId = zombies[zombies.length - 1].id;
    }
  }

  function startMovement() {
    moveInterval = setInterval(moveZombies, 50);
  }

  function moveZombies() {
    if (!level) return;
    let lifeWasLost = false;

    zombies = zombies.map(z => {
      if (z.isDying) return z;
      const newDepth = z.depth - level.zombieSpeed * diffMult;
      if (newDepth <= 0) {
        lifeWasLost = true;
        triggerScreenFlash('red');
        return null;
      }
      return { ...z, depth: newDepth };
    }).filter(Boolean);

    if (lifeWasLost) {
      game.loseLife();
      if (targetedId === null || !zombies.find(z => z.id === targetedId)) {
        const alive = zombies.filter(z => !z.isDying);
        targetedId = alive.sort((a, b) => a.depth - b.depth)[0]?.id ?? null;
      }
    }

    if (!levelDone && spawnedCount >= level.zombieCount && zombies.length === 0) {
      levelDone = true;
      clearInterval(moveInterval);
      clearTimeout(spawnTimeout);
      setTimeout(() => game.levelComplete(), 600);
    }
  }

  function handleTarget(e) {
    targetedId = e.detail;
  }

  function handleChange(e) {
    currentInput = e.detail;
  }

  function handleSubmit(e) {
    if (!targeted || !currentInput) return;
    const typed = parseInt(currentInput, 10);
    if (isNaN(typed)) { currentInput = ''; return; }

    if (typed === targeted.answer) {
      game.addScore(scoreForAnswer(targeted.answer, $game.levelIndex));
      triggerScreenFlash('green');

      const z = zombies.find(z => z.id === targeted.id);
      if (!z) return;

      const newHp = z.hp - 1;
      if (newHp <= 0) {
        const killedId = targeted.id;
        zombies = zombies.map(z2 =>
          z2.id === killedId ? { ...z2, isDying: true, hp: 0 } : z2
        );
        setTimeout(() => {
          zombies = zombies.filter(z2 => z2.id !== killedId);
          // Auto-target nearest (lowest depth = closest to player)
          const alive = zombies.filter(z2 => !z2.isDying);
          targetedId = alive.sort((a, b) => a.depth - b.depth)[0]?.id ?? null;
        }, 400);
      } else {
        const { display, answer } = generateProblem(level.operation, level.problemConfig);
        zombies = zombies.map(z2 =>
          z2.id === targeted.id ? { ...z2, hp: newHp, problem: display, answer } : z2
        );
      }
      currentInput = '';
    } else {
      zombies = zombies.map(z2 =>
        z2.id === targeted.id ? { ...z2, isWrong: true } : z2
      );
      setTimeout(() => {
        zombies = zombies.map(z2 =>
          z2.id === targeted.id ? { ...z2, isWrong: false } : z2
        );
      }, 350);
      currentInput = '';
    }
  }

  function triggerScreenFlash(color) {
    flashClass = color === 'red' ? 'flash-red' : 'flash-green';
    setTimeout(() => (flashClass = ''), 300);
  }

  onDestroy(() => {
    clearInterval(moveInterval);
    clearTimeout(spawnTimeout);
  });
</script>

<div class="game" class:flash-red={flashClass === 'flash-red'} class:flash-green={flashClass === 'flash-green'}>
  <HUD
    lives={$game.lives}
    score={$game.score}
    levelName={level?.levelName ?? ''}
    chapterName={level?.chapterName ?? ''}
  />

  <div class="field">
    <!-- Perspective road -->
    <div class="road"></div>
    <!-- Horizon -->
    <div class="horizon"></div>

    {#each zombies as z (z.id)}
      <Zombie
        id={z.id}
        depth={z.depth}
        lane={z.lane}
        problem={z.problem}
        hp={z.hp}
        maxHp={z.maxHp}
        isTargeted={z.id === targetedId}
        isDying={z.isDying}
        isWrong={z.isWrong}
        on:target={handleTarget}
      />
    {/each}

    {#if zombies.length === 0 && spawnedCount < (level?.zombieCount ?? 0)}
      <div class="incoming-hint blink">INCOMING...</div>
    {/if}
  </div>

  <div class="answer-area">
    {#if targeted}
      <div class="active-problem">{targeted.problem} = ?</div>
    {:else}
      <div class="active-problem dim">AWAITING TARGET...</div>
    {/if}
  </div>

  <NumPad
    {currentInput}
    on:change={handleChange}
    on:submit={handleSubmit}
  />
</div>

<style>
  .game {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: background 0.1s;
  }

  .game.flash-red  { animation: flash-red  0.3s; }
  .game.flash-green { animation: flash-green 0.3s; }

  /* ── Field ── */
  .field {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: linear-gradient(180deg, #03090a 0%, #071a0b 35%, #0d1b0a 65%, #1a2810 100%);
    min-height: 240px;
  }

  /* Perspective road trapezoid */
  .road {
    position: absolute;
    inset: 0;
    clip-path: polygon(40% 28%, 60% 28%, 100% 100%, 0% 100%);
    background: linear-gradient(180deg, #0a1a0a 0%, #0f2510 40%, #162d12 100%);
  }

  /* Dashed center line on road */
  .road::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 28%;
    bottom: 0;
    width: 2px;
    transform: translateX(-50%);
    background: repeating-linear-gradient(
      to bottom,
      rgba(76, 175, 80, 0.25) 0px,
      rgba(76, 175, 80, 0.25) 12px,
      transparent 12px,
      transparent 24px
    );
  }

  /* Horizon line */
  .horizon {
    position: absolute;
    top: 28%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(76, 175, 80, 0.18);
  }

  /* ── Answer area ── */
  .answer-area {
    padding: 6px 12px 4px;
    background: var(--bg2);
    flex-shrink: 0;
  }

  .active-problem {
    font-size: clamp(12px, 5vw, 18px);
    color: var(--yellow);
    text-align: center;
    letter-spacing: 3px;
  }

  .active-problem.dim {
    color: var(--bone-dim);
    font-size: 8px;
  }

  .incoming-hint {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px;
    color: var(--green);
    text-shadow: 0 0 8px var(--green);
  }
</style>
