<script lang="ts">
	import { page } from '$app/stores';
	import DarkToggle from '$lib/components/DarkToggle.svelte';
	import './prism-vsc-dark-plus.css';
</script>

<header>
	<a href="/">🏠</a>
	<a class="small" href="/about/">👨‍🦲</a>
	<DarkToggle />
</header>

<main>
	<slot />
</main>

<style>
	:global(:root) {
		--spacing-unit: 4px;
		--color-background: gray;
		--color-text-primary: #212121;
		--color-text-secondary: #5a5a5a;
	}

	:global(:root.dark) {
		--color-background: #000000;
		--color-text-primary: #FFFFFF;
		--color-text-secondary: #5a5a5a;
		transition: background-color 1000ms linear;
	}

	:global(body) {
		margin: 0 auto;
		max-width: 75ch;
		padding: calc(var(--spacing-unit) * 8);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
			'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		background-color: var(--color-background);
		color: var(--color-text-primary);
		line-height: 1.51;
		font-size: 18px;
	}


	:global(a, a:visited, a:active) {
		text-decoration: none;
		color: var(--color-text-primary);
		font-weight: 700;
	}

	:global(a:hover) {
		text-decoration: underline;
	}

	a.small {
		font-size: 1.2rem;
	}

	:global(code:not(pre code)) {
		background-color: var(--color-text-secondary);
		color: var(--color-text-primary);
		padding: var(--spacing-unit);
		border-radius: var(--spacing-unit);
	}

	header {
		font-size: 1.5rem;
		margin-bottom: calc(var(--spacing-unit) * 8);
	}

	footer {
		margin-top: calc(var(--spacing-unit) * 8);
	}

	
</style>
