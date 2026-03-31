<script lang="ts">
	let { description, slug = '' }: { description: string; slug?: string } = $props();

	const href = $derived(slug && `/posts/${slug}`);
</script>

<p class="description">
	{description}
	{#if href}
		<a class="read-more" {href}>Read <span class="arrow">→</span></a>
	{/if}
</p>

<style>
	.description {
		margin: 0;
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		line-height: 1.65;
	}

	.read-more {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		margin-left: 6px;
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-accent);
		text-decoration: none;
		white-space: nowrap;
		transition: color 150ms ease, gap 150ms ease;
	}

	.read-more:hover {
		color: var(--color-accent-hover);
		gap: 6px;
	}
</style>
