<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let currentInput = '';

  const buttons = [
    '7', '8', '9',
    '4', '5', '6',
    '1', '2', '3',
    '⌫', '0', '✓',
  ];

  function press(key) {
    if (key === '⌫') {
      dispatch('change', currentInput.slice(0, -1));
    } else if (key === '✓') {
      dispatch('submit', currentInput);
    } else {
      if (currentInput.length < 6) {
        dispatch('change', currentInput + key);
      }
    }
  }

  function handleKey(e) {
    if (e.key >= '0' && e.key <= '9') {
      press(e.key);
    } else if (e.key === 'Backspace') {
      press('⌫');
    } else if (e.key === 'Enter') {
      press('✓');
    }
  }
</script>

<svelte:window on:keydown={handleKey} />

<div class="numpad">
  <div class="answer-display" class:has-input={currentInput.length > 0}>
    {currentInput || '?'}
  </div>

  <div class="pad-grid">
    {#each buttons as btn}
      <button
        class="pad-btn"
        class:special={btn === '⌫' || btn === '✓'}
        class:confirm={btn === '✓'}
        class:delete={btn === '⌫'}
        on:pointerdown|preventDefault={() => press(btn)}
        aria-label={btn === '✓' ? 'confirm' : btn === '⌫' ? 'delete' : btn}
      >
        {btn}
      </button>
    {/each}
  </div>
</div>

<style>
  .numpad {
    background: var(--bg2);
    border-top: 3px solid var(--green-dim);
    padding: 10px 12px 12px;
    flex-shrink: 0;
  }

  .answer-display {
    font-size: clamp(16px, 6vw, 24px);
    color: var(--bone-dim);
    text-align: center;
    padding: 8px;
    margin-bottom: 10px;
    border-bottom: 2px solid var(--green-dim);
    min-height: 44px;
    letter-spacing: 4px;
    transition: color 0.1s;
  }

  .answer-display.has-input {
    color: var(--bone);
  }

  .pad-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    max-width: 320px;
    margin: 0 auto;
  }

  .pad-btn {
    font-family: var(--pixel-font);
    font-size: clamp(14px, 5vw, 18px);
    padding: 0;
    height: clamp(52px, 13vw, 66px);
    background: var(--bg);
    color: var(--bone);
    border: 2px solid var(--green-dim);
    cursor: pointer;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    transition: transform 0.05s, background 0.05s;
    box-shadow: 3px 3px 0 #000;
  }

  .pad-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 #000;
    background: var(--green-dim);
  }

  .pad-btn.delete {
    color: var(--red);
    border-color: #7f0000;
  }

  .pad-btn.confirm {
    background: var(--green-dim);
    color: var(--bone);
    border-color: var(--green);
    font-size: clamp(18px, 6vw, 22px);
  }

  .pad-btn.confirm:active {
    background: var(--green);
  }
</style>
