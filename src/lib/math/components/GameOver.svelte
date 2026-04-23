<script>
  import { game } from '../stores/gameStore.js';

  function fmtTime(s) {
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, '0')}`;
  }

  $: hi = $game.hiscores[$game.difficulty];
</script>

<div class="screen game-over">
  <div class="over-title">GAME OVER</div>

  <div class="skull-row">💀 💀 💀</div>

  <div class="run-stats pixel-box">
    <div class="stat-row">
      <span>SCORE</span>
      <span class="val gold">{String($game.score).padStart(8, '0')}</span>
    </div>
    <div class="stat-row">
      <span>LEVELS</span>
      <span class="val">{$game.levelsCompleted}</span>
    </div>
    <div class="stat-row">
      <span>TIME</span>
      <span class="val">{fmtTime($game.runTime)}</span>
    </div>
    <div class="stat-row">
      <span>DIFF</span>
      <span class="val">{$game.difficulty.toUpperCase()}</span>
    </div>
  </div>

  {#if $game.isNewHiscore}
    <div class="new-record blink">★ NEW RECORD! ★</div>
  {:else if hi}
    <div class="best-block">
      <div class="best-label">YOUR BEST ({$game.difficulty.toUpperCase()})</div>
      <div class="best-row">
        <span>{String(hi.score).padStart(8, '0')}</span>
        <span>{hi.levels} LVL</span>
        <span>{fmtTime(hi.time)}</span>
      </div>
    </div>
  {/if}

  <div class="btn-group">
    <button class="btn-pixel" on:click={() => game.startGame()}>TRY AGAIN</button>
    <button class="btn-pixel danger" on:click={() => game.reset()}>TITLE</button>
  </div>
</div>

<style>
  .game-over {
    gap: 16px;
    background: var(--bg);
  }

  .over-title {
    font-size: clamp(20px, 8vw, 36px);
    color: var(--red);
    text-shadow: 3px 3px 0 #7f0000, 6px 6px 0 rgba(211,47,47,0.3);
  }

  .skull-row {
    font-size: 32px;
    letter-spacing: 8px;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.08); }
  }

  .run-stats {
    width: min(300px, 90vw);
    padding: 14px 18px;
    background: var(--bg2);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7px;
    color: var(--bone-dim);
  }

  .val { color: var(--bone); font-size: 8px; }
  .val.gold { color: var(--gold); }

  .new-record {
    font-size: 9px;
    color: var(--green);
    text-shadow: 0 0 10px var(--green);
  }

  .best-block {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .best-label {
    font-size: 5px;
    color: var(--bone-dim);
    letter-spacing: 2px;
  }

  .best-row {
    font-size: 7px;
    color: var(--bone-dim);
    display: flex;
    gap: 14px;
    justify-content: center;
  }

  .btn-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>

