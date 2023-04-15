import adapter from "@sveltejs/adapter-static";
import { defineMDSveXConfig, mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/kit/vite';

const mdconfig = defineMDSveXConfig({
	extensions: ['.svelte.md', '.md', '.svx']
});


/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdconfig.extensions],

	preprocess: [vitePreprocess(), mdsvex(mdconfig)],

  kit: {
    adapter: adapter()
  }
};

export default config;
