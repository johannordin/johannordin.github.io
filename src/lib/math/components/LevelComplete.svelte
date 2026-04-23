<script>
  import { game, currentLevel } from '../stores/gameStore.js';
  import { LEVELS } from '../utils/levelConfig.js';

  $: isLastLevel = $game.levelIndex >= LEVELS.length - 1;
  $: nextLevel = LEVELS[$game.levelIndex + 1];
  $: isBossNext = nextLevel?.isBoss;
</script>

<div class="screen level-complete">
  <div class="result-title">AREA CLEARED!</div>

  <div class="stats pixel-box">
    <div class="stat-row">
      <span>SCORE</span>
      <span class="val gold">{String($game.score).padStart(8, '0')}</span>
    </div>
    <div class="stat-row">
      <span>LIVES</span>
      <span class="val">
        {#each Array(3) as _, i}
          <span style="color: {i < $game.lives ? 'var(--red)' : '#333'}">♥</span>
        {/each}
      </span>
    </div>
    <div class="stat-row">
      <span>NEXT</span>
      <span class="val" style="color: {isBossNext ? 'var(--gold)' : 'var(--green)'}">
        {nextLevel?.levelName ?? 'VICTORY!'}
      </span>
    </div>
  </div>

  <button class="btn-pixel" on:click={() => game.nextLevel()}>
    {isLastLevel ? 'FINISH' : isBossNext ? '⚠ FACE BOSS ⚠' : 'NEXT LEVEL'}
  </button>
</div>

<style>
  .level-complete {
    gap: 22px;
    background: var(--bg);
  }

  .result-title {
    font-size: clamp(14px, 5vw, 20px);
    color: var(--green);
    text-shadow: 2px 2px 0 var(--green-dim);
  }

  .stats {
    width: min(320px, 90vw);
    padding: 16px 20px;
    background: var(--bg2);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 8px;
    color: var(--bone-dim);
    gap: 12px;
  }

  .val {
    color: var(--bone);
    font-size: 9px;
    text-align: right;
  }
  .val.gold { color: var(--gold); }
</style>
