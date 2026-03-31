<script lang="ts">
	import { browser } from '$app/environment';

	const storageKey = 'color-scheme';

	function getInitialLightMode(): boolean {
		if (!browser) return false; // dark by default
		const stored = localStorage.getItem(storageKey);
		if (stored !== null) return stored === 'light';
		return window.matchMedia('(prefers-color-scheme: light)').matches;
	}

	let isLight = $state(getInitialLightMode());

	$effect(() => {
		if (browser) {
			document.documentElement.classList.toggle('light', isLight);
		}
	});

	function toggle() {
		isLight = !isLight;
		if (browser) {
			localStorage.setItem(storageKey, isLight ? 'light' : 'dark');
		}
	}
</script>

<button
	onclick={toggle}
	aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
	title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
>
	{#if isLight}
		<!-- Moon icon -->
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
		</svg>
	{:else}
		<!-- Sun icon -->
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="12" cy="12" r="5"/>
			<line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
			<line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
		</svg>
	{/if}
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: transparent;
		border: 1px solid var(--color-border-strong);
		border-radius: 6px;
		color: var(--color-text-secondary);
		cursor: pointer;
		transition:
			border-color 150ms ease,
			background-color 150ms ease,
			color 150ms ease;
		flex-shrink: 0;
	}

	button:hover {
		border-color: var(--color-accent);
		color: var(--color-text-primary);
		background-color: var(--color-accent-subtle);
	}

	button:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-radius: 6px;
	}
</style>
