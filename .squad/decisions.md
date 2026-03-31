# Squad Decisions

## Active Decisions

### 2025-01-01: ADR-001 — Centralized site config in `src/lib/config.ts` (Danny)

**Status:** Accepted

The site name (`nordin.work`), base URL, and description must be centralized in `src/lib/config.ts` as the single source of truth for site-wide constants: `SITE_URL`, `SITE_NAME`, `SITE_DESCRIPTION`, `SITE_AUTHOR`, `SITE_LANG`, `POSTS_PER_PAGE`. All server routes, components, and layout files must import from here — never hardcode these values.

**Consequences:** One-file domain/name changes; consistent Open Graph tags, RSS metadata, and sitemap URLs.

---

### 2025-01-01: ADR-002 — RSS feed and sitemap as pre-rendered server routes (Danny)

**Status:** Accepted

Implement RSS and sitemap files as SvelteKit server routes (`+server.ts`) that export `const prerender = true`. Both routes use `import.meta.glob` to load post metadata at prerender time. RSS includes ALL published posts (no cap), sorted newest-first. Sitemap includes `/`, `/about`, and one entry per published post with `lastmod` from frontmatter date.

**Consequences:** Zero runtime cost; feed readers and search engines discover posts automatically; a new post requires redeploy to appear in feed (acceptable for personal blog).

---

### 2025-01-01: ADR-003 — Enhanced PageHead contract (Danny)

**Status:** Accepted

The `PageHead` component emits canonical URL, Open Graph tags (type, url, image, title, description), Twitter cards, and article metadata (published_time, author). Props: `title`, `description`, `type` ('website' | 'article'), `image`, `publishedDate` (ISO 8601), `author`. `canonicalUrl` is derived from `$page.url.href`.

**Consequences:** Social sharing previews render correctly; search engines receive canonical URL; per-post metadata propagates automatically; callers must pass `type="article"` on post pages.

---

### 2025-07-10: Tooling audit and vitest setup (Basher)

**Status:** Accepted

- Added vitest as test runner with `"test": "vitest run"` script
- Removed unused `@sveltejs/adapter-auto` devDependency
- Removed redundant `touch build/.nojekyll` from deploy script (`.nojekyll` already in `static/`)
- Updated minor/patch dependencies within semver range (SvelteKit 1.15.5 → 1.30.4, Svelte 3.58.0 → 3.59.2, tslib 2.5.0 → 2.8.1)
- Deferred major upgrades (SvelteKit 2, Svelte 5, Vite 8) to dedicated migration task

**Consequences:** Existing test file now runs (3/3 passing); build pipeline cleaner; major upgrades tracked for future work.

---

### 2025-07-10: Modernization direction established (Danny)

**Status:** Accepted

Svelte 3→5 direct upgrade (skip Svelte 4). Phase 1 gated on mdsvex Svelte 5 compat check. Dependencies owned by Basher, Svelte 5 migration by Rusty, content enhancements by Linus.

---

### 2026-03-31: mdsvex Svelte 5 Compatibility (Basher)

**Status:** Confirmed Compatible

mdsvex 0.12.7 (latest) explicitly supports Svelte 5 with peer dependency `^3.56.0 || ^4.0.0 || ^5.0.0-next.120`. Upgraded from 0.10.6 → 0.12.7 alongside Svelte upgrade. Build succeeded with no errors. No config changes required.

**Recommendation:** mdsvex 0.12.7 is the standard for Svelte 5 projects.

---

### 2026-03-31: Svelte 5 Runes Migration Patterns (Rusty)

**Status:** Complete

Migrated all 14 source files from Svelte 3 to Svelte 5. Key patterns:
- Props: `let { title, slug = '' } = $props()`
- Derived: `const href = $derived(...)`
- Effects: `$effect(() => { ... })`
- Slots → Snippets: `let { children } = $props(); {@render children()}`
- Page state: `import { page } from '$app/state'` with `$derived` access

Bug fixes: DarkToggle now persists to localStorage; RSS/sitemap slug spread order corrected.

**Validation:** All checks pass (TypeScript 0 errors, tests 3/3, build clean).

---

### 2026-03-31: Dark-First Visual Redesign (Rusty)

**Status:** Implemented

Dark becomes the default theme (no class needed). Color palette: `#0a0a0b` (bg), `#5e6ad2` (accent, Linear's exact purple), `rgba(255,255,255,0.07)` (borders). Light theme uses `.light` class with appropriate inversions.

Typography: Inter variable font with OpenType features (cv02, cv03, cv04, cv08). Hero name uses linear gradient. Cards elevated with border + hover animations (lift, shadow). Sticky glass-morphism nav with backdrop blur. Micro-interactions: arrow gap animation (150ms), card lift (6-10px max).

FOUC prevention: Inline script in `app.html` applies `.light` before first paint if localStorage has `color-scheme: 'light'`.

**Validation:** `npm run check` and `npm run build` pass cleanly.

---

### 2026-03-31: Author Prop Removal & Animation Standards (Rusty)

**Status:** Implemented

Removed author name from ArticleMeta display on homepage and post pages (redundant on personal blog). Author prop remains optional in component for future multi-author support.

Animation design standards: 220ms page transitions, 300ms card entrances with 60ms stagger, 6-10px max transforms. ALL animations respect `prefers-reduced-motion: reduce` media query with `!important` override. Configuration centralized: `POSTS_PER_PAGE = 10` added to `config.ts`.

**Validation:** All checks and tests pass; `prefers-reduced-motion` support verified.

---

### 2023-05-01: Post metadata conventions (Linus)

All blog posts must include these frontmatter fields: `title`, `description`, `date`, `author`, `published`, `tags`.

- `tags` is an array of lowercase kebab-case strings
- `published: false` = draft; never surfaced in index or by slug
- Post filename = canonical URL slug — do not rename files without a redirect strategy
- `smartypants: true` enabled in MDSvex config — curly quotes and em-dashes are generated automatically

**Rationale:** Establishes consistent metadata for future posts and enables tag-based filtering if added later.

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
