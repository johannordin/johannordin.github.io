<script>
  import { game, currentLevel } from '../stores/gameStore.js';
  import { onMount } from 'svelte';

  let visible = false;
  onMount(() => {
    setTimeout(() => (visible = true), 50);
  });
</script>

<div class="boss-screen" class:visible>
  <div class="warning-text blink">⚠ WARNING ⚠</div>
  <div class="boss-label">BOSS APPROACHING</div>
  <div class="boss-name">{$currentLevel?.levelName ?? ''}</div>

  <div class="boss-skull">💀</div>

  <button class="btn-pixel danger" on:click={() => game.startLevelAfterWarning()}>
    FACE YOUR FATE
  </button>
</div>

<style>
  .boss-screen {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    background: var(--bg);
    padding: 20px;
    opacity: 0;
    transition: opacity 0.4s;
  }
  .boss-screen.visible { opacity: 1; }

  .warning-text {
    font-size: clamp(10px, 4vw, 14px);
    color: var(--red);
    text-shadow: 0 0 10px var(--red);
    letter-spacing: 4px;
  }

  .boss-label {
    font-size: clamp(8px, 3vw, 12px);
    color: var(--bone-dim);
  }

  .boss-name {
    font-size: clamp(7px, 2.5vw, 10px);
    color: var(--gold);
  }

  .boss-skull {
    font-size: 64px;
    animation: pulse 1s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.15); }
  }
</style>
