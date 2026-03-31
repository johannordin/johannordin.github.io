<script lang="ts">
	let { author = '', date }: { author?: string; date: string } = $props();

	const formattedDate = $derived(new Intl.DateTimeFormat('en-SE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date(date)));
</script>

<p class="meta">
	{#if author}
		<span>{author}</span>
		<span aria-hidden="true">·</span>
	{/if}
	<time datetime={date}>{formattedDate}</time>
</p>

<style>
	.meta {
		display: flex;
		align-items: center;
		gap: calc(var(--spacing-unit) * 2);
		font-size: 0.8rem;
		color: var(--color-text-tertiary);
		margin: 0 0 calc(var(--spacing-unit) * 2) 0;
		letter-spacing: 0.01em;
	}
</style>
