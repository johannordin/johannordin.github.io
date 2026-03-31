---
title: 'How this site is built, part 2: adding a blog with MDSvex'
description: "MDSvex turns Markdown files into Svelte components. Here's how I wired it up for this blog."
date: '2023-05-01'
author: 'Johan Nordin'
published: true
tags: ['sveltekit', 'mdsvex', 'markdown', 'blogging']
---

In [part 1](/posts/something-about-this-site) I covered the basic SvelteKit + GitHub Pages setup. This time: how to add a Markdown-powered blog using [MDSvex](https://mdsvex.pngwn.io/).

MDSvex is a preprocessor that compiles `.md` (and `.svelte.md`) files into Svelte components. That means you can use Svelte components _inside_ your Markdown — handy for interactive demos, callout boxes, whatever you need.

## Install MDSvex

```bash
npm i -D mdsvex
```

## Configure it

In `svelte.config.js`, import and apply the preprocessor. You also need to tell SvelteKit that `.md` files are valid Svelte modules:

```js
import adapter from '@sveltejs/adapter-static';
import { defineMDSveXConfig, mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/kit/vite';

const mdconfig = defineMDSveXConfig({
  extensions: ['.svelte.md', '.md', '.svx'],
  smartypants: true  // curly quotes, em-dashes, etc.
});

const config = {
  extensions: ['.svelte', ...mdconfig.extensions],
  preprocess: [vitePreprocess(), mdsvex(mdconfig)],
  kit: {
    adapter: adapter()
  }
};

export default config;
```

`smartypants: true` is a small but nice addition — it converts straight quotes to curly quotes and `--` to em-dashes automatically.

## Write posts as Markdown

Drop `.md` files in `src/posts/`. Each file gets a frontmatter block:

```markdown
---
title: 'My post title'
description: 'A short summary for the index page'
date: '2023-05-01'
author: 'Your name'
published: true
tags: ['sveltekit', 'webdev']
---

Your content here.
```

`published: false` acts as a draft flag — unpublished posts are filtered out before they're shown.

## Load posts dynamically

SvelteKit's `import.meta.glob` can discover all post files at build time:

```typescript
// src/routes/+page.server.ts
const modules = import.meta.glob('/src/posts/*.{md,svx,svelte.md}');
```

Each resolved module exposes `default` (the compiled Svelte component) and `metadata` (the frontmatter). From there, you filter by `published`, sort by date, and pass posts to the page.

## Render a single post

For the `posts/[slug]` route, the same glob is used to find the matching file:

```typescript
// src/routes/posts/[slug]/+page.ts
for (const [path, resolver] of Object.entries(modules)) {
  if (slugFromPath(path) === params.slug) {
    match = { path, resolver };
    break;
  }
}
```

The `slugFromPath` helper strips the path prefix and file extension to give you a clean slug:

```typescript
export const slugFromPath = (path: string) =>
  path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;
```

Once you have the resolved module, render it with `<svelte:component this={post.default} />`.

## Syntax highlighting

MDSvex bundles Prism for code blocks. To apply a theme, import a Prism CSS file in your layout:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import './prism-vsc-dark-plus.css';
</script>
```

You can grab any theme from [prism-themes](https://github.com/PrismJS/prism-themes) or write your own.

That's the whole setup. The result is a zero-server, statically-generated blog where posts are just Markdown files in a folder — no CMS, no database.
