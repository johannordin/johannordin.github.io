# Rusty — History

## Core Context

- **Project:** Modernize a SvelteKit personal blog/portfolio (Svelte 3 → 5, SvelteKit 1 → 2, styling refresh, and dependency upgrades) hosted on GitHub Pages.
- **Role:** Frontend Dev
- **Joined:** 2026-03-29T14:27:25.342Z

## Learnings

<!-- Append learnings below -->

### 2026-03-29: Svelte 5 Migration (Phase 2)

Successfully migrated all 12 source files from Svelte 3 syntax to Svelte 5 runes API. The migration was clean and all checks pass with zero errors or warnings.

**Key patterns learned:**
- `export let` props → `let { prop } = $props()` with explicit TypeScript types
- `<slot />` → `{@render children()}` with `let { children } = $props()`
- Reactive statements `$:` → `$derived()` for computed values, `$state()` for reactive state
- `$app/stores` → `$app/state` for SvelteKit 2 page state (use `page.url` not `$page.url`)
- `svelte/internal` imports → `svelte` package (e.g., `Component` type)
- `<svelte:component this={X} />` can be replaced with `<X></X>` when X is a dynamic component in Svelte 5
- `$effect()` is the proper way to run side effects that depend on reactive state (better than top-level code that captures initial values)

**DarkToggle localStorage bug fix:**
The old implementation never persisted dark mode preference. New version properly:
1. Reads from localStorage on mount
2. Writes to localStorage on toggle
3. Uses `$effect()` to apply the dark class reactively

**Fixed pre-existing TypeScript bugs:**
- rss.xml and sitemap.xml had object spread order issues (`slug` was defined then overwritten)
- Moved `slug: slugFromPath(path)` after the spread to ensure it takes precedence

**Build results:**
- `npm run check`: 0 errors, 0 warnings
- `npm test`: 3/3 tests passed
- `npm run build`: ✅ succeeded in 2.15s

Phase 3 (visual redesign) is now unblocked.

### 2026-03-31: Dark-First Visual Redesign (Phase 3)

Implemented Linear.app-inspired dark-first aesthetic across the entire site. Dark mode is now the default state, with light mode as the toggle.

**Design system implemented:**
- Dark theme as base (:root) with Linear's exact purple (#5e6ad2)
- Light mode toggled via `.light` class on html
- Deep blacks (#0a0a0b background) with subtle borders (rgba whites)
- Inter font with OpenType features (cv02, cv03, cv04, cv08)
- Custom scrollbar with accent color on hover
- Sticky header with backdrop blur and translucent background
- Gradient text effects on hero name and error page title

**Files redesigned:**
- `src/app.html`: Added inline script to prevent FOUC
- `src/routes/+layout.svelte`: Complete design token overhaul, sticky header, Inter font, prose styles
- `src/routes/+page.svelte`: Hero section with h1 + gradient name, "Writing" section label
- `src/routes/+error.svelte`: Full redesign with status label, gradient title, CTA button
- `src/routes/posts/[slug]/+page.svelte`: Refined back link and header spacing
- `src/lib/components/DarkToggle.svelte`: Sun/moon SVG icons, color-scheme localStorage key, $effect for reactivity
- `src/lib/components/Article.svelte`: Card design with hover lift, surface background, border radius
- `src/lib/components/ArticleTitle.svelte`: Tighter spacing, reduced font weight for cards
- `src/lib/components/ArticleMeta.svelte`: Tertiary color, 0.8rem font, simplified layout
- `src/lib/components/ArticleDescription.svelte`: Animated arrow gap on hover (3px → 6px)

**Key visual improvements:**
- Article cards with surface background, border, shadow on hover, transform translateY(-1px)
- Nav active state with bottom accent line at -20px offset
- Footer now includes GitHub link
- Back link on post pages with animated gap
- Blockquotes use accent-subtle background with left accent border
- Custom scrollbar matches theme colors

**Build results:**
- `npm run check`: 0 errors, 0 warnings
- `npm run build`: ✅ succeeded in 2.53s

The site now has a polished, modern aesthetic matching Linear's design language. All micro-interactions are smooth and purposeful.

### 2026-03-31: Phase 4 — Polish, Animations & Bug Fixes

Added animations, cleaned up redundant props, and centralized config. All validation passes cleanly.

**Task 1: Fixed ArticleMeta author prop**
- **Decision:** Removed author prop from display. This is a personal blog by Johan Nordin — showing "Johan Nordin" on every post is redundant noise.
- Updated both callers (`+page.svelte` and `posts/[slug]/+page.svelte`) to only pass `{date}`
- ArticleMeta still accepts optional `author` prop for future flexibility

**Task 2: Centralized POSTS_PER_PAGE constant**
- Added `POSTS_PER_PAGE = 10` to `src/lib/config.ts` with JSDoc
- Updated `src/routes/+page.server.ts` to import and use it instead of hardcoded `MAX_POSTS`
- Config file is now the single source of truth for pagination

**Task 3: Page transition animation**
- Added subtle fade-in animation on route change in `+layout.svelte`
- Uses `{#key page.url.pathname}` to trigger animation on navigation
- 220ms fade + 6px upward slide for smooth, modern feel
- Wrapped in `.page-transition` div inside existing `<main>` tag

**Task 4: Staggered card entrance on homepage**
- Added staggered animation to article cards on homepage
- Uses CSS custom property `--i` for index-based delay
- Each card animates in 60ms after the previous one
- 10px upward slide + fade for visual hierarchy

**Task 5: Accessibility — prefers-reduced-motion**
- Added media query to respect user motion preferences
- Reduces all animations/transitions to 0.01ms when user prefers reduced motion
- Applied globally with !important to ensure it overrides all animations

**Task 6: Final validation results:**
- `npm run check`: ✅ 0 errors, 0 warnings
- `npm test`: ✅ 3/3 tests passed
- `npm run build`: ✅ succeeded in 2.32s

**Animation design rationale:**
- Page transitions: 220ms is fast enough to feel instant but smooth enough to be perceived
- Card stagger: 60ms intervals create rhythm without feeling slow (10 cards = 600ms max)
- Translate values kept minimal (6px, 10px) for subtle, refined motion
- All animations use `ease` or `ease forwards` for natural acceleration curves

**What makes these animations "Linear-like":**
- Short durations (220-300ms, not 500ms+)
- Subtle transforms (6-10px, not 20-30px)
- Purposeful — guide user attention without being showy
- Respect accessibility preferences

Phase 4 complete. The site is production-ready with polished animations and clean code.

