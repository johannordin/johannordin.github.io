<script lang="ts">
	import type { PageData } from './$types';

	import PageHead from '$lib/components/PageHead.svelte';
	import Article from '$lib/components/Article.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';
	import ArticleDescription from '$lib/components/ArticleDescription.svelte';

	let { data }: { data: PageData } = $props();
</script>

<PageHead title="Blog" description="Thoughts on .NET, Azure, and web development by Johan Nordin." />

<section class="intro">
	<h1>Hi, I'm <span class="name">Johan</span></h1>
	<p>A developer based in Sweden. I write about .NET, Azure, and building things for the web.</p>
</section>

<section class="posts" aria-label="Blog posts">
	<p class="section-label">Writing</p>
	{#each data.posts as { slug, title, author, description, date }, i}
		<div class="post-item" style="--i: {i}">
			<Article>
				<ArticleTitle {slug} {title} />
				<ArticleMeta {date} />
				<ArticleDescription {description} {slug} />
			</Article>
		</div>
	{/each}

	{#if data.posts.length === 0}
		<p class="empty">No posts yet — check back soon.</p>
	{/if}
</section>

<style>
	.intro {
		margin-bottom: calc(var(--spacing-unit) * 14);
		padding-bottom: calc(var(--spacing-unit) * 12);
		border-bottom: 1px solid var(--color-border);
	}

	.intro h1 {
		margin: 0 0 calc(var(--spacing-unit) * 4) 0;
		font-size: 1.65rem;
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.3;
		color: var(--color-text-primary);
	}

	.intro h1 .name {
		background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 60%, #818cf8 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	:global(:root.light) .intro h1 .name {
		background: linear-gradient(135deg, #1e1b4b 0%, #4f46e5 60%, #7c3aed 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.intro p {
		margin: 0;
		font-size: 1rem;
		color: var(--color-text-secondary);
		line-height: 1.7;
		max-width: 52ch;
	}

	.section-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-text-tertiary);
		margin: 0 0 calc(var(--spacing-unit) * 6) 0;
	}

	.empty {
		color: var(--color-text-secondary);
		font-style: italic;
	}

	.post-item {
		animation: cardEntrance 300ms ease both;
		animation-delay: calc(var(--i) * 60ms + 100ms);
	}

	@keyframes cardEntrance {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
