<script>
  import { game } from '../stores/gameStore.js';
</script>

<div class="screen victory">
  <div class="v-title">YOU WIN!</div>

  <div class="trophy">🏆</div>

  <div class="congrats">ALL CHAPTERS CLEARED!</div>

  <div class="final-score">
    <div class="fl">FINAL SCORE</div>
    <div class="fs">{String($game.score).padStart(8, '0')}</div>
    {#if $game.score >= $game.highScore}
      <div class="new-high blink">NEW HIGH SCORE!</div>
    {:else}
      <div class="hi">HI {String($game.highScore).padStart(8, '0')}</div>
    {/if}
  </div>

  <div class="btn-group">
    <button class="btn-pixel" on:click={() => game.startGame()}>
      PLAY AGAIN
    </button>
    <button class="btn-pixel danger" on:click={() => game.reset()}>
      TITLE
    </button>
  </div>
</div>

<style>
  .victory {
    gap: 18px;
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
    font-size: 64px;
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

  .final-score {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .fl {
    font-size: 7px;
    color: var(--bone-dim);
  }

  .fs {
    font-size: clamp(16px, 6vw, 22px);
    color: var(--gold);
    text-shadow: 2px 2px 0 #e65100;
  }

  .new-high {
    font-size: 8px;
    color: var(--green);
    text-shadow: 0 0 8px var(--green);
  }

  .hi {
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
