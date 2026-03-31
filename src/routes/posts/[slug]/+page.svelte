<script lang="ts">
	import type { Component } from 'svelte';
	import type { PageData } from './$types';

	import PageHead from '$lib/components/PageHead.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';

	let { data }: { data: PageData } = $props();

	const component = $derived(data.component as Component);
</script>

<PageHead
	title={data.frontmatter.title}
	description={data.frontmatter.description}
	type="article"
	publishedDate={data.frontmatter.date}
	author={data.frontmatter.author ?? ''}
/>

<a class="back-link" href="/">← All posts</a>

<article>
	<header class="post-header">
		<ArticleTitle title={data.frontmatter.title} />
		<ArticleMeta date={data.frontmatter.date} />
	</header>

	<div class="prose">
		<svelte:component this={component} />
	</div>
</article>

<style>
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-text-tertiary);
		text-decoration: none;
		margin-bottom: calc(var(--spacing-unit) * 10);
		transition: color 150ms ease, gap 150ms ease;
		letter-spacing: 0.01em;
	}

	.back-link:hover {
		color: var(--color-text-secondary);
		gap: 8px;
		text-decoration: none;
	}

	.post-header {
		margin-bottom: calc(var(--spacing-unit) * 10);
		padding-bottom: calc(var(--spacing-unit) * 8);
		border-bottom: 1px solid var(--color-border);
	}
</style>
