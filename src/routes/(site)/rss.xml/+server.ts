import type { RequestHandler } from '@sveltejs/kit';
import { slugFromPath } from '$lib/slugFromPath';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_AUTHOR } from '$lib/config';

export const prerender = true;

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: RequestHandler = async () => {
	const modules = import.meta.glob(`/src/posts/*.{md,svx,svelte.md}`);

	const postPromises = Object.entries(modules).map(([path, resolver]) =>
		(resolver() as Promise<{ metadata: App.BlogPost }>).then((post) => ({
			...post.metadata,
			slug: slugFromPath(path)
		}))
	);

	const posts = await Promise.all(postPromises);
	const publishedPosts = posts
		.filter((post) => post.published)
		.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	const items = publishedPosts
		.map((post) => {
			const link = `${SITE_URL}/posts/${post.slug}`;
			const pubDate = new Date(post.date).toUTCString();
			return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${link}</link>
			<guid isPermaLink="true">${link}</guid>
			<description>${escapeXml(post.description ?? '')}</description>
			<pubDate>${pubDate}</pubDate>
			<author>${escapeXml(post.author ?? SITE_AUTHOR)}</author>
		</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(SITE_NAME)}</title>
		<link>${SITE_URL}</link>
		<description>${escapeXml(SITE_DESCRIPTION)}</description>
		<language>en</language>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
		${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
