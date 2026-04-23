<script>
  import { game } from '../stores/gameStore.js';

  function fmtTime(s) {
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, '0')}`;
  }

  const diffs = ['easy', 'normal', 'hard'];
</script>

<div class="start-screen">
  <div class="title-block">
    <div class="title-line1">MATH</div>
    <div class="title-line2">OF THE</div>
    <div class="title-line3">DEAD</div>
  </div>

  <div class="zombie-art">
    <div class="zombie-pixel"></div>
    <div class="zombie-pixel z2"></div>
    <div class="zombie-pixel z3"></div>
  </div>

  <div class="subtitle">SURVIVE BY SOLVING MATH</div>

  <div class="difficulty-block">
    <div class="diff-label">DIFFICULTY</div>
    <div class="diff-btns">
      {#each ['easy', 'normal', 'hard'] as d}
        <button
          class="btn-pixel diff-btn"
          class:active={$game.difficulty === d}
          on:click={() => game.setDifficulty(d)}
        >
          {d.toUpperCase()}
        </button>
      {/each}
    </div>
  </div>

  <button class="btn-pixel blink start-btn" on:click={() => game.startGame()}>
    PRESS START
  </button>

  <div class="records">
    <div class="rec-title">── BEST SCORES ──</div>
    <div class="rec-table">
      {#each diffs as d}
        {@const hi = $game.hiscores[d]}
        <div class="rec-row" class:active-diff={$game.difficulty === d}>
          <span class="rec-diff">{d.toUpperCase()}</span>
          {#if hi}
            <span class="rec-score">{String(hi.score).padStart(8, '0')}</span>
            <span class="rec-stat">{hi.levels}LVL</span>
            <span class="rec-stat">{fmtTime(hi.time)}</span>
          {:else}
            <span class="rec-empty">---</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <div class="controls-hint">
    <div>TAP ZOMBIE TO TARGET</div>
    <div>TYPE ANSWER → ✓</div>
  </div>
</div>

<style>
  .start-screen {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background: var(--bg);
    padding: 20px;
  }

  .title-block {
    line-height: 1.6;
    text-shadow: 3px 3px 0 var(--green-dim), 6px 6px 0 rgba(76,175,80,0.3);
  }

  .title-line1 {
    font-size: clamp(32px, 12vw, 64px);
    color: var(--green);
  }

  .title-line2 {
    font-size: clamp(16px, 6vw, 32px);
    color: var(--bone-dim);
  }

  .title-line3 {
    font-size: clamp(32px, 12vw, 64px);
    color: var(--red);
    text-shadow: 3px 3px 0 #7f0000, 6px 6px 0 rgba(211,47,47,0.3);
  }

  .zombie-art {
    display: flex;
    gap: 16px;
    align-items: flex-end;
  }

  .zombie-pixel {
    width: 24px;
    height: 36px;
    background: var(--green-dim);
    position: relative;
    image-rendering: pixelated;
  }
  .zombie-pixel::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 4px;
    width: 16px;
    height: 12px;
    background: var(--green-dim);
  }
  .zombie-pixel::after {
    content: '';
    position: absolute;
    top: 8px;
    left: -8px;
    width: 8px;
    height: 16px;
    background: var(--green-dim);
  }
  .z2 { transform: scaleX(-1); opacity: 0.7; }
  .z3 { opacity: 0.5; transform: scale(0.8); }

  .subtitle {
    font-size: clamp(6px, 2.5vw, 10px);
    color: var(--bone-dim);
    letter-spacing: 2px;
  }

  /* ── Difficulty selector ── */
  .difficulty-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .diff-label {
    font-size: 7px;
    color: var(--bone-dim);
    letter-spacing: 3px;
  }

  .diff-btns {
    display: flex;
    gap: 8px;
  }

  .diff-btn {
    font-size: clamp(7px, 3vw, 10px);
    padding: 10px 14px;
    color: var(--bone-dim);
    background: var(--bg2);
    border-color: #444;
    min-width: 60px;
  }

  .diff-btn.active[class*="easy"],
  .diff-btn.active:first-child {
    border-color: var(--green);
    color: var(--green);
    box-shadow: 0 0 6px var(--green);
  }

  .diff-btn.active {
    border-color: var(--yellow);
    color: var(--yellow);
    box-shadow: 0 0 6px var(--yellow);
  }

  /* Per-difficulty active colours */
  .diff-btns button:nth-child(1).active { border-color: var(--green);  color: var(--green);  box-shadow: 0 0 6px var(--green); }
  .diff-btns button:nth-child(2).active { border-color: var(--yellow); color: var(--yellow); box-shadow: 0 0 6px var(--yellow); }
  .diff-btns button:nth-child(3).active { border-color: var(--red);    color: var(--red);    box-shadow: 0 0 6px var(--red); }

  .start-btn {
    font-size: clamp(10px, 4vw, 14px);
    padding: 16px 32px;
    margin-top: 4px;
  }

  .records {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
  }

  .rec-title {
    font-size: 5px;
    color: var(--bone-dim);
    letter-spacing: 2px;
  }

  .rec-table {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: min(280px, 85vw);
  }

  .rec-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 6px;
    color: var(--bone-dim);
    padding: 4px 8px;
    border: 1px solid transparent;
    border-radius: 0;
  }

  .rec-row.active-diff {
    border-color: var(--green-dim);
    color: var(--bone);
  }

  .rec-diff {
    width: 44px;
    flex-shrink: 0;
    color: var(--bone-dim);
  }

  .rec-row.active-diff .rec-diff {
    color: var(--green);
  }

  .rec-score {
    flex: 1;
    color: var(--gold);
  }

  .rec-stat {
    color: var(--bone-dim);
    white-space: nowrap;
  }

  .rec-empty {
    flex: 1;
    color: #444;
    font-size: 6px;
  }

  .controls-hint {
    font-size: 6px;
    color: var(--bone-dim);
    line-height: 2.2;
    opacity: 0.7;
    margin-top: 8px;
  }
</style>
