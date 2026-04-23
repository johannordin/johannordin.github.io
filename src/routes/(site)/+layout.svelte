<script lang="ts">
	import '@fontsource/inter';
	import { page } from '$app/state';
	import DarkToggle from '$lib/components/DarkToggle.svelte';
	import './prism-vsc-dark-plus.css';

	let { children } = $props();

	const isAbout = $derived(page.url.pathname.startsWith('/about'));
	const isBlog = $derived(!isAbout && !page.url.pathname.startsWith('/math'));
</script>

<header>
	<nav>
		<a class="site-name" href="/">nordin.work</a>
		<div class="nav-links">
			<a href="/" class:active={isBlog}>Blog</a>
			<a href="/about" class:active={isAbout}>About</a>
			<a href="/math" class="nav-game">🧟 Math</a>
			<DarkToggle />
		</div>
	</nav>
</header>

<main>
	{#key page.url.pathname}
		<div class="page-transition">
			{@render children()}
		</div>
	{/key}
</main>

<footer>
	<p>
		© {new Date().getFullYear()} Johan Nordin · Built with SvelteKit ·
		<a href="https://github.com/johannordin" target="_blank" rel="noopener">GitHub</a>
	</p>
</footer>

<style>
	/* ── Design tokens ───────────────────────────────────── */
	/* Dark theme is the DEFAULT (applied directly to :root) */
	:global(:root) {
		--spacing-unit: 4px;

		/* Backgrounds */
		--color-background:      #0a0a0b;
		--color-surface:         #111113;
		--color-surface-hover:   #18181b;
		--color-surface-elevated:#1c1c1f;

		/* Text */
		--color-text-primary:    #f0eff2;
		--color-text-secondary:  #737278;
		--color-text-tertiary:   #4a494f;

		/* Accent — Linear's exact purple */
		--color-accent:          #5e6ad2;
		--color-accent-hover:    #7880e0;
		--color-accent-subtle:   rgba(94, 106, 210, 0.12);

		/* Borders */
		--color-border:          rgba(255, 255, 255, 0.07);
		--color-border-strong:   rgba(255, 255, 255, 0.13);

		/* Code */
		--color-code-bg:         #151517;
		--color-code-text:       #e2e0e8;

		/* Shadows */
		--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4);
		--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5);
	}

	/* Light mode — toggled with .light class on html (dark is default) */
	:global(:root.light) {
		--color-background:      #fafafa;
		--color-surface:         #ffffff;
		--color-surface-hover:   #f4f4f5;
		--color-surface-elevated:#f0f0f1;

		--color-text-primary:    #111111;
		--color-text-secondary:  #71717a;
		--color-text-tertiary:   #a1a1aa;

		--color-accent:          #4f46e5;
		--color-accent-hover:    #4338ca;
		--color-accent-subtle:   rgba(79, 70, 229, 0.08);

		--color-border:          rgba(0, 0, 0, 0.07);
		--color-border-strong:   rgba(0, 0, 0, 0.13);

		--color-code-bg:         #f4f4f5;
		--color-code-text:       #1a1a2e;

		--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
		--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.1);
	}

	/* ── Base ────────────────────────────────────────────── */
	:global(html) {
		transition:
			background-color 250ms ease,
			color 250ms ease;
	}

	:global(body) {
		margin: 0 auto;
		max-width: 76ch;
		padding: calc(var(--spacing-unit) * 8) calc(var(--spacing-unit) * 5);
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv08';
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background-color: var(--color-background);
		color: var(--color-text-primary);
		line-height: 1.75;
		font-size: 16px;
		transition:
			background-color 250ms ease,
			color 250ms ease;
	}

	/* ── Custom scrollbar ────────────────────────────────── */
	:global(::-webkit-scrollbar) {
		width: 5px;
	}
	:global(::-webkit-scrollbar-track) {
		background: transparent;
	}
	:global(::-webkit-scrollbar-thumb) {
		background: var(--color-border-strong);
		border-radius: 3px;
	}
	:global(::-webkit-scrollbar-thumb:hover) {
		background: var(--color-text-tertiary);
	}

	/* ── Links ───────────────────────────────────────────── */
	:global(a) {
		color: var(--color-text-primary);
		text-decoration: none;
		font-weight: 600;
	}

	:global(a:hover) {
		color: var(--color-accent);
		text-decoration: underline;
	}

	:global(a:focus-visible) {
		outline: 2px solid var(--color-accent);
		outline-offset: 3px;
		border-radius: 2px;
	}

	/* ── Inline code ─────────────────────────────────────── */
	:global(code:not(pre code)) {
		background-color: var(--color-code-bg);
		color: var(--color-code-text);
		padding: 2px 6px;
		border-radius: 4px;
		font-size: 0.85em;
		font-family: 'Fira Code', 'Cascadia Code', Menlo, Monaco, Consolas, monospace;
		border: 1px solid var(--color-border);
	}

	/* ── Prose styles (post content) ─────────────────────── */
	:global(.prose p) {
		margin: 1.4em 0;
	}

	:global(.prose h2) {
		font-size: 1.35rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.3;
		margin-top: 2.4em;
		margin-bottom: 0.6em;
		padding-bottom: 0.4em;
		border-bottom: 1px solid var(--color-border);
	}

	:global(.prose h3) {
		font-size: 1.1rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		line-height: 1.35;
		margin-top: 2em;
		margin-bottom: 0.4em;
	}

	:global(.prose h4) {
		font-size: 1rem;
		font-weight: 700;
		margin-top: 1.5em;
		margin-bottom: 0.3em;
	}

	:global(.prose ul, .prose ol) {
		padding-left: 1.6em;
		margin: 1em 0;
	}

	:global(.prose li) {
		margin: 0.35em 0;
		line-height: 1.65;
	}

	:global(.prose blockquote) {
		border-left: 2px solid var(--color-accent);
		padding: 0.8em 1.2em;
		margin: 1.8em 0;
		background: var(--color-accent-subtle);
		border-radius: 0 8px 8px 0;
		font-style: normal;
		color: var(--color-text-secondary);
	}

	:global(.prose pre) {
		border-radius: 8px;
		margin: 1.5em 0;
		overflow-x: auto;
	}

	:global(.prose a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	:global(.prose a:hover) {
		color: var(--color-accent-hover);
	}

	:global(.prose img) {
		max-width: 100%;
		border-radius: 8px;
		margin: 1.5em 0;
	}

	:global(.prose hr) {
		border: none;
		border-top: 1px solid var(--color-border);
		margin: 2.5em 0;
	}

	/* ── Header / Nav ────────────────────────────────────── */
	header {
		position: sticky;
		top: 0;
		z-index: 50;
		margin-bottom: calc(var(--spacing-unit) * 12);
		padding: calc(var(--spacing-unit) * 4) 0;
		border-bottom: 1px solid var(--color-border);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		background: rgba(10, 10, 11, 0.85);
	}

	:global(:root.light) header {
		background: rgba(250, 250, 250, 0.85);
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: calc(var(--spacing-unit) * 4);
	}

	.site-name {
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--color-text-primary);
		text-decoration: none;
		transition: color 150ms ease;
	}

	.site-name:hover {
		color: var(--color-accent);
		text-decoration: none;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: calc(var(--spacing-unit) * 6);
	}

	.nav-links a {
		font-size: 0.875rem;
		font-weight: 450;
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: color 150ms ease;
		position: relative;
		letter-spacing: -0.01em;
	}

	.nav-game {
		font-size: 0.8rem !important;
	}

	.nav-links a:hover,
	.nav-links a.active {
		color: var(--color-text-primary);
		text-decoration: none;
	}

	.nav-links a.active::after {
		content: '';
		position: absolute;
		bottom: -20px;
		left: 0;
		right: 0;
		height: 1px;
		background: var(--color-accent);
	}

	/* ── Footer ──────────────────────────────────────────── */
	footer {
		margin-top: calc(var(--spacing-unit) * 20);
		padding-top: calc(var(--spacing-unit) * 8);
		border-top: 1px solid var(--color-border);
		font-size: 0.8rem;
		color: var(--color-text-tertiary);
		text-align: center;
		letter-spacing: 0.01em;
	}

	footer p {
		margin: 0;
	}

	/* ── Page transitions ────────────────────────────────── */
	.page-transition {
		animation: fadeSlideIn 220ms ease forwards;
	}

	@keyframes fadeSlideIn {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* ── Accessibility: Reduced motion ───────────────────── */
	@media (prefers-reduced-motion: reduce) {
		:global(*) {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}

	/* ── Responsive ──────────────────────────────────────── */
	@media (max-width: 600px) {
		:global(body) {
			padding: calc(var(--spacing-unit) * 5) calc(var(--spacing-unit) * 4);
			font-size: 15px;
		}

		header {
			margin-bottom: calc(var(--spacing-unit) * 8);
		}

		.nav-links {
			gap: calc(var(--spacing-unit) * 4);
		}
	}
</style>
