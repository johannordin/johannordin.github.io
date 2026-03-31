// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}

	interface MdsvexFile {
		default: import('svelte').Component;
		metadata: Record<string, string>;
	}

	type MdsvexResolver = () => Promise<MdsvexFile>;

	interface BlogPost {
		slug: string;
		title: string;
		description: string;
		date: string;
		published: boolean;
		/** Optional — not all posts include an author in frontmatter. Falls back to SITE_AUTHOR. */
		author?: string;
		/** Optional — comma-separated or array of topic tags. */
		tags?: string[];
	}
}
