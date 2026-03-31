import type { RequestHandler } from '@sveltejs/kit';
import { slugFromPath } from '$lib/slugFromPath';
import { SITE_URL } from '$lib/config';

export const prerender = true;

interface SitemapEntry {
	loc: string;
	lastmod?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
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
	const publishedPosts = posts.filter((post) => post.published);

	const staticRoutes: SitemapEntry[] = [
		{
			loc: SITE_URL,
			changefreq: 'weekly',
			priority: 1.0
		},
		{
			loc: `${SITE_URL}/about`,
			changefreq: 'monthly',
			priority: 0.5
		}
	];

	const postRoutes: SitemapEntry[] = publishedPosts.map((post) => ({
		loc: `${SITE_URL}/posts/${post.slug}`,
		lastmod: new Date(post.date).toISOString().split('T')[0],
		changefreq: 'monthly',
		priority: 0.8
	}));

	const allRoutes = [...staticRoutes, ...postRoutes];

	const urlElements = allRoutes
		.map((entry) => {
			const lastmod = entry.lastmod ? `\n\t\t<lastmod>${entry.lastmod}</lastmod>` : '';
			const changefreq = entry.changefreq
				? `\n\t\t<changefreq>${entry.changefreq}</changefreq>`
				: '';
			const priority =
				entry.priority !== undefined ? `\n\t\t<priority>${entry.priority}</priority>` : '';
			return `\t<url>\n\t\t<loc>${entry.loc}</loc>${lastmod}${changefreq}${priority}\n\t</url>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
