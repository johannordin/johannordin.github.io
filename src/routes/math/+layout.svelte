<script lang="ts">
	import '$lib/math/game.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
	<meta name="theme-color" content="#0d0d0d" />
</svelte:head>

<div id="game-root">
	{@render children()}
</div>

<style>
	:global(body):has(#game-root) {
		max-width: 100% !important;
		padding: 0 !important;
		background: #0d0d0d !important;
		overflow: hidden;
		font-family: 'Press Start 2P', monospace;
		color: #f5f5dc;
		-webkit-font-smoothing: none;
		image-rendering: pixelated;
	}

	#game-root {
		position: fixed;
		inset: 0;
		/* Game-specific CSS variables scoped to this container */
		--bg:         #0d0d0d;
		--bg2:        #141414;
		--green:      #4caf50;
		--green-dim:  #2e7d32;
		--red:        #d32f2f;
		--red-bright: #ff5252;
		--bone:       #f5f5dc;
		--bone-dim:   #bdbdad;
		--sky:        #1a1a2e;
		--yellow:     #fdd835;
		--gold:       #ffc107;
		--purple:     #7c4dff;
		--pixel-font: 'Press Start 2P', monospace;
		width: 100%;
		height: 100%;
		background: #0d0d0d;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	/* Scanline overlay */
	#game-root::after {
		content: '';
		position: fixed;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 2px,
			rgba(0, 0, 0, 0.08) 2px,
			rgba(0, 0, 0, 0.08) 4px
		);
		pointer-events: none;
		z-index: 9999;
	}
</style>
