<script lang="ts">
	import { page } from '$app/state';
	import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '$lib/config';

	let { 
		title = '', 
		description = SITE_DESCRIPTION, 
		type = 'website' as 'website' | 'article', 
		image = `${SITE_URL}/favicon.png`, 
		publishedDate = '', 
		author = '' 
	}: { 
		title?: string; 
		description?: string; 
		type?: 'website' | 'article'; 
		image?: string; 
		publishedDate?: string; 
		author?: string; 
	} = $props();

	const formattedTitle = $derived(title ? `${title} | ${SITE_NAME}` : SITE_NAME);
	// During static prerender, page.url.href is a placeholder URL.
	// Reconstruct the canonical from SITE_URL + the pathname so crawlers
	// always see the real production URL in the pre-rendered HTML.
	const canonicalUrl = $derived(`${SITE_URL}${page.url.pathname}`);
</script>

<svelte:head>
	<title>{formattedTitle}</title>
	<meta name="description" content={description} />
	{#if author}<meta name="author" content={author} />{/if}
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={formattedTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	{#if type === 'article' && publishedDate}
		<meta property="article:published_time" content={publishedDate} />
	{/if}
	{#if type === 'article' && author}
		<meta property="article:author" content={author} />
	{/if}

	<!-- Twitter / X Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={formattedTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
