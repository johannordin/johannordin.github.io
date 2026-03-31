<script lang="ts">
	let { slug = '', title }: { slug?: string; title: string } = $props();

	const id = $derived(title
		.toLowerCase()
		.replace(/[^a-zA-Z ]/g, '')
		.replace(/\s/g, '-'));

	const href = $derived(slug ? `/posts/${slug}` : '#' + id);
</script>

{#if slug}
	<!-- Article listing: h2 with link to post -->
	<h2 class="article-title" {id}>
		<a {href}>{title}</a>
	</h2>
{:else}
	<!-- Post page: h1, no link (we're already on the page) -->
	<h1 class="post-title" {id}>{title}</h1>
{/if}

<style>
	.article-title {
		margin: 0 0 calc(var(--spacing-unit) * 2) 0;
		font-size: 1.05rem;
		font-weight: 600;
		line-height: 1.35;
		letter-spacing: -0.01em;
	}

	.article-title a {
		color: var(--color-text-primary);
		text-decoration: none;
		transition: color 150ms ease;
	}

	.article-title a:hover {
		color: var(--color-accent);
	}

	.post-title {
		margin: 0 0 calc(var(--spacing-unit) * 3) 0;
		font-size: 2.1rem;
		font-weight: 800;
		line-height: 1.2;
		letter-spacing: -0.04em;
	}

	@media (max-width: 600px) {
		.post-title {
			font-size: 1.65rem;
		}
	}
</style>
