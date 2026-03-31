/**
 * Site-wide configuration — single source of truth.
 * Used by PageHead, RSS feed, sitemap, and any server-side rendering.
 */

export const SITE_URL = 'https://nordin.work';
export const SITE_NAME = 'nordin.work';
export const SITE_DESCRIPTION =
	'A developer blog by Johan Nordin covering .NET, Azure, and web development.';
export const SITE_AUTHOR = 'Johan Nordin';
export const SITE_LANG = 'en';

/** Max posts shown on the homepage before pagination is needed. */
export const POSTS_PER_PAGE = 10;

/** Absolute URL helper — resolves a path against SITE_URL. */
export const siteUrl = (path: string): string =>
	`${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
