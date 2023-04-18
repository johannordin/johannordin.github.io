---
title: 'About this, #1'
description: "How is it built?"
date: '2023-04-16'
published: true
---
I'm trying to `keep it simple stupid`, so here are some steps to get started and deploying to gh-pages.

1. install [svelte](https://svelte.dev/)
```bash
npm create svelte@latest myapp
cd myapp
npm install
npm run dev
```
2. add a static preprocessor and use it in `svelte.config.js`.
```bash
npm i -D @sveltejs/adapter-static
```

3. add gh-pages and a deploy step
```bash
npm i -D gh-pages
```
```json
"deploy": "vite build && touch build/.nojekyll && gh-pages -d build -t true",
```
4. wohoo, check your `[username].github.io`, if you have configured your repo/Settings/Pages to be deployed from gh-pages branch everything should be deployed 🎉