---
title: 'How this site is built, part 1: SvelteKit + GitHub Pages'
description: "A quick walkthrough of the stack — SvelteKit, adapter-static, and gh-pages deployment."
date: '2023-04-16'
author: 'Johan Nordin'
published: true
tags: ['sveltekit', 'github-pages', 'deployment']
---

I'm trying to keep it `simple stupid`, so here are the steps I took to get from zero to a deployed SvelteKit site on GitHub Pages.

## 1. Scaffold the project

```bash
npm create svelte@latest myapp
cd myapp
npm install
npm run dev
```

That gets you a working dev server. But the default `adapter-auto` won't work for static hosting — you need `adapter-static`.

## 2. Switch to adapter-static

```bash
npm i -D @sveltejs/adapter-static
```

Then update `svelte.config.js`:

```js
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter()
  }
};

export default config;
```

This tells SvelteKit to emit plain HTML/CSS/JS — no server required.

## 3. Add the deploy script

```bash
npm i -D gh-pages
```

In `package.json`:

```json
"deploy": "vite build && touch build/.nojekyll && gh-pages -d build -t true"
```

The `.nojekyll` file tells GitHub not to run Jekyll on your output. The `-t true` flag makes gh-pages include dotfiles — important if you use a custom domain CNAME file.

## 4. Configure GitHub Pages

In your repo's **Settings → Pages**, set the source to the `gh-pages` branch. Run `npm run deploy`, and your site shows up at `https://{username}.github.io`.

That's the whole thing. In part 2 I'll cover adding a blog with MDSvex.