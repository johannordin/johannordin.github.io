<script>
  import { game } from '../stores/gameStore.js';
</script>

<div class="screen game-over">
  <div class="over-title">GAME OVER</div>

  <div class="skull-row">💀 💀 💀</div>

  <div class="score-block">
    <div class="score-label">SCORE</div>
    <div class="score-val">{String($game.score).padStart(8, '0')}</div>

    {#if $game.score >= $game.highScore && $game.score > 0}
      <div class="new-high blink">NEW HIGH SCORE!</div>
    {:else}
      <div class="hi-label">HI {String($game.highScore).padStart(8, '0')}</div>
    {/if}
  </div>

  <div class="btn-group">
    <button class="btn-pixel" on:click={() => game.startGame()}>
      TRY AGAIN
    </button>
    <button class="btn-pixel danger" on:click={() => game.reset()}>
      TITLE
    </button>
  </div>
</div>

<style>
  .game-over {
    gap: 20px;
    background: var(--bg);
  }

  .over-title {
    font-size: clamp(20px, 8vw, 36px);
    color: var(--red);
    text-shadow: 3px 3px 0 #7f0000, 6px 6px 0 rgba(211,47,47,0.3);
  }

  .skull-row {
    font-size: 36px;
    letter-spacing: 8px;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.08); }
  }

  .score-block {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .score-label {
    font-size: 7px;
    color: var(--bone-dim);
  }

  .score-val {
    font-size: clamp(14px, 5vw, 20px);
    color: var(--gold);
  }

  .new-high {
    font-size: 8px;
    color: var(--green);
    text-shadow: 0 0 8px var(--green);
  }

  .hi-label {
    font-size: 7px;
    color: var(--bone-dim);
  }

  .btn-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
