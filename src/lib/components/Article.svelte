<script lang="ts">
	let { children } = $props();
</script>

<article>
	{@render children()}
</article>

<style>
	article {
		padding: calc(var(--spacing-unit) * 5) calc(var(--spacing-unit) * 6);
		margin-bottom: calc(var(--spacing-unit) * 3);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 10px;
		transition:
			border-color 150ms ease,
			background-color 150ms ease,
			transform 150ms ease;
		cursor: default;
	}

	article:hover {
		border-color: var(--color-border-strong);
		background: var(--color-surface-hover);
		transform: translateY(-1px);
		box-shadow: var(--shadow-sm);
	}
</style>
