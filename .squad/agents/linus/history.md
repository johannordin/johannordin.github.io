# Linus — History

## Core Context

- **Project:** Modernize a SvelteKit personal blog/portfolio (Svelte 3 → 5, SvelteKit 1 → 2, styling refresh, and dependency upgrades) hosted on GitHub Pages.
- **Role:** Content & DX
- **Joined:** 2026-03-29T14:27:25.347Z

## Learnings

### About Page Rewrite
Rewrote `src/routes/about/+page.svelte` to be a proper About page for Johan Nordin (developer in Sweden, works on .NET, Azure, SvelteKit). Design integrates with the dark-first design system using CSS variables (--color-text-primary, --color-surface, --color-border). Page includes: intro paragraph, tech stack (6 technologies as styled chip-list), and GitHub contact link. Responsive design maintained for mobile. Styling follows the existing system: uppercase section headings (0.75rem, 0.08em letter-spacing), tech chips with surface background and border, professional & minimal layout. No PageHead needed (handled by layout).
