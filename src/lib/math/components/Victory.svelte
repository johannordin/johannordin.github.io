<script>
  import { game } from '../stores/gameStore.js';

  function fmtTime(s) {
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, '0')}`;
  }

  $: hi = $game.hiscores[$game.difficulty];
</script>

<div class="screen victory">
  <div class="v-title">YOU WIN!</div>

  <div class="trophy">🏆</div>

  <div class="congrats">ALL CHAPTERS CLEARED!</div>

  <div class="run-stats pixel-box-gold">
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
    <button class="btn-pixel" on:click={() => game.startGame()}>PLAY AGAIN</button>
    <button class="btn-pixel danger" on:click={() => game.reset()}>TITLE</button>
  </div>
</div>

<style>
  .victory {
    gap: 14px;
    background: radial-gradient(circle at center, #0a2a0a 0%, var(--bg) 70%);
  }

  .v-title {
    font-size: clamp(24px, 9vw, 44px);
    color: var(--green);
    text-shadow: 3px 3px 0 var(--green-dim), 0 0 20px var(--green);
    animation: glow 2s ease-in-out infinite;
  }

  @keyframes glow {
    0%, 100% { text-shadow: 3px 3px 0 var(--green-dim), 0 0 20px var(--green); }
    50%       { text-shadow: 3px 3px 0 var(--green-dim), 0 0 40px var(--green), 0 0 60px rgba(76,175,80,0.5); }
  }

  .trophy {
    font-size: 52px;
    animation: bounce 1s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-10px); }
  }

  .congrats {
    font-size: clamp(7px, 2.5vw, 10px);
    color: var(--gold);
    letter-spacing: 2px;
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
    color: var(--gold);
    text-shadow: 0 0 10px var(--gold);
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

