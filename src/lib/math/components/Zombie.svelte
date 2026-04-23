<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let id;
  export let depth = 1.0;   // 1.0 = far/tiny, 0.0 = at player/huge
  export let lane = 0;      // -1..1 horizontal spread
  export let problem = '';
  export let hp = 1;
  export let maxHp = 1;
  export let isTargeted = false;
  export let isDying = false;
  export let isWrong = false;

  // Perspective math — positioner only, no animation transforms
  // depth=1.0 → far/small, depth=0.0 → close/huge
  $: scale = 0.65 + (1 - depth) * 1.65;      // 0.65 at horizon (text readable), 2.30 up close
  $: xPercent = 50 + lane * (4 + (1 - depth) * 32);  // converges to center at horizon
  $: bottomPercent = 5 + depth * 55;          // 60% at far (near horizon), 5% up close
  $: zIdx = Math.round((1 - depth) * 100) + 1;

  function tap() {
    dispatch('target', id);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- Outer div handles perspective positioning only — no animation transforms here -->
<div
  class="zombie-positioner"
  style="left: {xPercent}%; bottom: {bottomPercent}%; z-index: {zIdx}; transform: translateX(-50%) scale({scale}); transform-origin: bottom center;"
  on:pointerdown|stopPropagation={() => tap()}
>
  <!-- Inner div handles visual states (dying/wrong) — isolated from positioning -->
  <div
    class="zombie-wrap"
    class:targeted={isTargeted}
    class:dying={isDying}
    class:wrong={isWrong}
  >
    {#if maxHp > 1}
      <div class="boss-hp">
        <div class="boss-hp-bar" style="width: {(hp / maxHp) * 100}%"></div>
      </div>
    {/if}

    <div class="problem-bubble" class:boss-bubble={maxHp > 1}>
      {problem}
    </div>

    <div class="zombie-body">
      <div class="z-head">
        <div class="z-eye left"></div>
        <div class="z-eye right"></div>
      </div>
      <div class="z-torso"></div>
      <div class="z-arm left-arm"></div>
      <div class="z-arm right-arm"></div>
      <div class="z-legs">
        <div class="z-leg"></div>
        <div class="z-leg"></div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Perspective positioner — sets position and scale, no animation transforms */
  .zombie-positioner {
    position: absolute;
    cursor: pointer;
  }

  /* Inner wrap — handles all animation states */
  .zombie-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform-origin: bottom center;
  }

  /* ── Boss HP bar ── */
  .boss-hp {
    width: 60px;
    height: 6px;
    background: #333;
    border: 1px solid var(--red);
    margin-bottom: 4px;
  }
  .boss-hp-bar {
    height: 100%;
    background: var(--red);
    transition: width 0.3s;
  }

  /* ── Problem bubble ── */
  .problem-bubble {
    font-size: clamp(8px, 3vw, 11px);
    color: var(--bone);
    background: var(--bg2);
    border: 2px solid var(--green-dim);
    padding: 4px 6px;
    white-space: nowrap;
    margin-bottom: 4px;
    box-shadow: 2px 2px 0 #000;
  }

  .boss-bubble {
    border-color: var(--gold);
    color: var(--gold);
    font-size: clamp(10px, 3.5vw, 13px);
  }

  .targeted .problem-bubble {
    border-color: var(--yellow);
    color: var(--yellow);
    box-shadow: 0 0 8px var(--yellow);
  }

  /* ── Zombie body (CSS pixel art) ── */
  .zombie-body {
    position: relative;
    width: 32px;
  }

  .z-head {
    width: 22px;
    height: 18px;
    background: var(--green-dim);
    margin: 0 auto;
    position: relative;
    border: 2px solid #1b5e20;
  }

  .z-eye {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--red);
    top: 5px;
  }
  .z-eye.left  { left: 3px; }
  .z-eye.right { right: 3px; }

  .z-torso {
    width: 26px;
    height: 20px;
    background: #2e4a22;
    margin: 0 auto;
    border: 2px solid #1b3018;
  }

  .z-arm {
    position: absolute;
    width: 10px;
    height: 8px;
    background: var(--green-dim);
    top: 20px;
  }
  .z-arm.left-arm {
    left: -10px;
    transform: rotate(-20deg);
  }
  .z-arm.right-arm {
    right: -10px;
    transform: rotate(20deg);
  }

  .z-legs {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-top: 2px;
  }

  .z-leg {
    width: 10px;
    height: 14px;
    background: #3e2723;
    border: 1px solid #1a0f0d;
    animation: walk 0.4s steps(2) infinite;
  }
  .z-leg:last-child {
    animation-delay: 0.2s;
  }

  @keyframes walk {
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-3px); }
    100% { transform: translateY(0); }
  }

  /* ── States (no translateX — positioner handles centering) ── */
  .dying {
    animation: splat 0.4s forwards;
  }

  @keyframes splat {
    0%   { transform: scale(1);          opacity: 1; filter: saturate(3); }
    40%  { transform: scale(1.3);        opacity: 0.9; }
    100% { transform: scale(0.1) rotate(90deg); opacity: 0; filter: hue-rotate(90deg); }
  }

  .wrong {
    animation: shake 0.3s;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(6px); }
    40%       { transform: translateX(-6px); }
    60%       { transform: translateX(4px); }
    80%       { transform: translateX(-4px); }
  }

  .targeted .zombie-body {
    filter: drop-shadow(0 0 6px var(--yellow));
  }
</style>
