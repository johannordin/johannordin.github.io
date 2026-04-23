<script>
  export let lives = 3;
  export let score = 0;
  export let levelName = '';
  export let chapterName = '';

  $: displayScore = String(score).padStart(8, '0');
</script>

<div class="hud">
  <div class="hud-left">
    <div class="lives">
      {#each Array(3) as _, i}
        <span class="heart" class:lost={i >= lives}>♥</span>
      {/each}
    </div>
  </div>

  <div class="hud-center">
    <div class="level-name">{levelName}</div>
    <div class="chapter-name">{chapterName}</div>
  </div>

  <div class="hud-right">
    <div class="score-label">SCORE</div>
    <div class="score">{displayScore}</div>
  </div>
</div>

<style>
  .hud {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: var(--bg2);
    border-bottom: 3px solid var(--green-dim);
    flex-shrink: 0;
    gap: 8px;
  }

  .hud-left, .hud-right {
    flex: 1;
  }

  .hud-right {
    text-align: right;
  }

  .hud-center {
    flex: 2;
    text-align: center;
  }

  .lives {
    display: flex;
    gap: 4px;
  }

  .heart {
    font-size: 16px;
    color: var(--red);
    text-shadow: 1px 1px 0 #7f0000;
    transition: opacity 0.3s;
  }

  .heart.lost {
    color: #333;
    text-shadow: none;
  }

  .level-name {
    font-size: 6px;
    color: var(--bone);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chapter-name {
    font-size: 5px;
    color: var(--green);
    margin-top: 2px;
  }

  .score-label {
    font-size: 5px;
    color: var(--bone-dim);
  }

  .score {
    font-size: 8px;
    color: var(--gold);
  }
</style>
