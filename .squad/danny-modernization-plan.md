# Modernization Plan — johannordin.github.io
**Author:** Danny (Lead / Architect)  
**Date:** 2025-07-10  
**Status:** Draft — awaiting team review

---

## Executive Summary

The blog is a clean, small SvelteKit static site with a well-defined structure and no external dependencies beyond the framework stack. The upgrade path to Svelte 5 + SvelteKit 2 is tractable (~12–16 focused hours of work), but requires care in two places: (1) the Svelte 3→5 component API changes are pervasive across every `.svelte` file, and (2) `mdsvex` Svelte 5 compatibility must be confirmed before committing to the upgrade. Everything else is mechanical.

**Recommendation:** Execute in 4 phases, gate on Phase 1 before touching code. Use `npx sv migrate svelte-5` as the starting point for Phase 2, then apply manual fixes for the edge cases the tool misses.

---

## Full Audit of Identified Issues

### A. Dependencies (package.json)

| Package | Current | Target | Risk | Notes |
|---------|---------|--------|------|-------|
| `svelte` | `^3.54.0` | `^5.x` | 🔴 High | Pervasive API changes — runes, new event syntax, slots |
| `@sveltejs/kit` | `^1.5.0` | `^2.x` | 🟡 Medium | Mostly compat; `vitePreprocess` import path changes |
| `vite` | `^4.2.0` | `^6.x` | 🟡 Medium | Plugin API changes; SvelteKit 2 requires Vite 5+ |
| `@sveltejs/adapter-static` | `^2.0.2` | `^3.x` | 🟢 Low | Drop-in replacement |
| `@sveltejs/adapter-auto` | `^2.0.0` | remove | 🟢 Low | Listed in devDeps but **not used** — svelte.config.js uses adapter-static |
| `svelte-check` | `^3.0.1` | `^4.x` | 🟡 Medium | Svelte 5 requires svelte-check v4+ |
| `mdsvex` | `^0.10.6` | `^0.12+` | 🟡 Medium | Svelte 5 compat added in 0.12.x — **must verify** before Phase 1 |
| `vitest` | **MISSING** | `^3.x` | 🟡 Medium | Used in `slugFromPath.test.ts` but not in devDependencies; no test script in `package.json` |
| `@sveltejs/vite-plugin-svelte` | **MISSING** | `^5.x` | 🟢 Low | Needed as explicit dep when importing `vitePreprocess` in SvelteKit 2 |

---

### B. Configuration Issues

#### `svelte.config.js`
- `import { vitePreprocess } from '@sveltejs/kit/vite'` — this import path is deprecated in SvelteKit 2. Should be `import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'`
- Otherwise config is clean; `adapter-static()` with no options is correct for GitHub Pages

#### `tsconfig.json`
- Extends `.svelte-kit/tsconfig.json` — correct pattern. No changes needed.
- `strict: true` is set — good. Type errors from the deprecated Svelte internals will surface here.

---

### C. Source Code Issues (Prioritized by Severity)

#### C1. `src/app.d.ts` — Internal module import 🔴
```typescript
// CURRENT (broken in Svelte 5):
interface MdsvexFile {
  default: import('svelte/internal').SvelteComponent;  // private API
  ...
}
```
`svelte/internal` is a private package namespace. It has never been safe to import from. In Svelte 5 the shape of `SvelteComponent` also changed.

**Fix:**
```typescript
interface MdsvexFile {
  default: import('svelte').Component;  // public API, Svelte 5
  ...
}
```

---

#### C2. `src/routes/posts/[slug]/+page.svelte` — Deprecated Svelte internals 🔴
```typescript
// CURRENT:
import type { SvelteComponentTyped } from 'svelte/internal';  // ❌ private + removed in Svelte 5
type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;  // ❌ Svelte 3 generics syntax
export let data: PageData;  // Svelte 3/4 prop syntax
$: component = data.component as unknown as C;
```

`SvelteComponentTyped` was deprecated in Svelte 4 and **removed** in Svelte 5. `$$Generic` is Svelte 3-specific. The entire typing approach needs to be replaced.

**Fix (Svelte 5):**
```typescript
import type { Component } from 'svelte';
import type { PageData } from './$types';

let { data }: { data: PageData } = $props();
const component = $derived(data.component as Component);
```
And in the template: `<svelte:component this={component} />` still works in Svelte 5 (compatibility mode), or migrate to the new snippet/render pattern.

---

#### C3. `src/lib/components/DarkToggle.svelte` — Multiple issues 🔴🟡

**Issue 1: Missing `lang="ts"`** (🟡)
```svelte
<script>  <!-- ❌ Should be <script lang="ts"> -->
```

**Issue 2: `storageKey` defined but never used** (🔴 functional bug)
```javascript
const storageKey = 'dark-mode';  // defined...
// ...but NEVER read from or written to localStorage
```
Dark mode preference is lost on every page reload. The component reads `prefers-color-scheme` at load time but never checks/writes localStorage. This is the reported "doesn't persist" bug.

**Issue 3: Wrong CSS variable names** (🔴 visual bug — button is invisible)
```css
/* DarkToggle.svelte uses: */
border: 2px solid var(--text-color);      /* ❌ not defined */
color: var(--text-color);                  /* ❌ not defined */
background: var(--bg-color);              /* ❌ not defined */

/* +layout.svelte defines: */
--color-text-primary: #212121;            /* ✅ */
--color-background: gray;                 /* ✅ */
```
The button border and text will render as transparent/missing in browsers that don't cascade unknown CSS variables.

**Issue 4: Svelte 3 event handler syntax** (🟡 — works in Svelte 5 compat mode, but should migrate)
```svelte
<button on:click={toggle}>  <!-- Svelte 3/4 syntax -->
```
Svelte 5 canonical form: `<button onclick={toggle}>`

**Fix (complete rewrite):**
```svelte
<script lang="ts">
  import { browser } from '$app/environment';

  const storageKey = 'dark-mode';

  function getInitialDarkMode(): boolean {
    if (!browser) return false;
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  let darkMode = $state(getInitialDarkMode());

  if (browser) {
    document.documentElement.classList.toggle('dark', darkMode);
  }

  function toggle() {
    darkMode = !darkMode;
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem(storageKey, darkMode ? 'dark' : 'light');
  }
</script>

<button onclick={toggle}>
  {darkMode ? '☀️' : '🌙'}
</button>
```

---

#### C4. `src/routes/+layout.svelte` — Unused import 🟡
```typescript
import { page } from '$app/stores';  // imported but never referenced in template or script
```
Remove it. Also `<slot />` should be migrated to `{@render children()}` in Svelte 5 (though `<slot>` still works in compatibility mode).

---

#### C5. All `.svelte` component files — Svelte 3 prop syntax 🟡
Every component uses `export let propName: Type` — the Svelte 3/4 prop declaration pattern. Svelte 5 runes equivalent:
```typescript
// Old (Svelte 3/4):
export let title: string;
export let description: string;

// New (Svelte 5 runes):
let { title, description }: { title: string; description: string } = $props();
```

Affected files:
- `ArticleTitle.svelte` — `slug`, `title`
- `ArticleMeta.svelte` — `date` (note: `author` prop is received but not displayed — potential cleanup)
- `ArticleDescription.svelte` — `description`, `slug`
- `PageHead.svelte` — `title`, `description`
- `+page.svelte` (index) — `data`
- `posts/[slug]/+page.svelte` — `data`
- `about/+page.svelte` — (no props, but empty script block can be removed)

The `npx sv migrate svelte-5` tool will handle most of these automatically.

---

#### C6. `src/routes/+page.server.ts` — Hard-coded pagination limit 🟡
```typescript
const MAX_POSTS = 10;
// ...
const publishedPosts = posts.filter((post) => post.published).slice(0, MAX_POSTS);
```
With only 4 posts this is invisible, but it's a landmine for growth. No pagination support, no URL param for page number.

---

#### C7. Tests — Missing vitest dependency and configuration 🟡
- `vitest` is used in `slugFromPath.test.ts` but not in `package.json`
- No test script in `package.json`
- No `vitest.config.ts`
- Tests will silently fail to run (no runner configured)

---

#### C8. `ArticleMeta.svelte` — `author` prop received but not displayed 🟢 (low)
The component accepts `author` as a prop (inferred from the parent passing it) but the template only renders `date`. Either the `author` should be displayed, or the prop should be dropped and the callers cleaned up.

---

## Phased Modernization Plan

### Phase 1: Dependency Upgrades
**Owner: Basher** | Complexity: 🟡 Medium | Est: 3–4 hours

**Goal:** Get the package graph to a modern, supported baseline. Gate all other phases on Phase 1 completing successfully.

**Trade-off:** Doing all dependency upgrades in one pass means a single large breaking change surface, but it avoids the confusion of "which version of Svelte are we targeting?" during code migration. The alternative — upgrade incrementally (1→4→5) — doubles the migration work. Going straight 3→5 is correct here.

**Steps:**
1. Verify `mdsvex` Svelte 5 compat status (`npm info mdsvex` — look for `^0.12.0` or later with Svelte 5 peer dep)
2. Remove `@sveltejs/adapter-auto` (unused)
3. Upgrade all deps to target versions:
   ```bash
   npm install -D svelte@^5 @sveltejs/kit@^2 vite@^6 \
     @sveltejs/adapter-static@^3 @sveltejs/vite-plugin-svelte@^5 \
     svelte-check@^4 mdsvex@latest vitest@^3
   ```
4. Add test script to `package.json`:
   ```json
   "test": "vitest run",
   "test:watch": "vitest"
   ```
5. Fix `svelte.config.js` vitePreprocess import:
   ```javascript
   import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
   ```
6. Create `vitest.config.ts`:
   ```typescript
   import { defineConfig } from 'vitest/config';
   export default defineConfig({ test: { environment: 'node' } });
   ```
7. Run `npm run check` — expect type errors. These are inputs to Phase 2, not blockers for Phase 1.
8. Run `npm run build` — if the build passes, Phase 1 is done. Type errors are Phase 2's problem.

**Exit criterion:** `npm run build` produces a valid static output in `build/`.

---

### Phase 2: Code Migration (Svelte 3 → 5)
**Owner: Rusty** | Complexity: 🔴 High | Est: 4–6 hours

**Goal:** Migrate all `.svelte` files to Svelte 5 runes API. Eliminate all deprecated imports and internal module references.

**Trade-off:** The `npx sv migrate svelte-5` tool is a starting point, not a complete solution. It handles `export let` → `$props()` and `$:` → `$derived()/$effect()` well, but misses: `$$Generic`, `SvelteComponentTyped`, and the `svelte/internal` imports. Plan for a manual pass after running the migration tool.

**Steps:**
1. Run the official migration tool (from repo root):
   ```bash
   npx sv migrate svelte-5
   ```
   Review the diff carefully — accept changes file by file, not as a bulk commit.

2. Manual fixes the tool will NOT handle:

   **`app.d.ts`:**
   ```typescript
   // Replace:
   default: import('svelte/internal').SvelteComponent;
   // With:
   default: import('svelte').Component;
   ```

   **`posts/[slug]/+page.svelte`:**
   ```typescript
   // Replace entire SvelteComponentTyped / $$Generic block:
   import type { Component } from 'svelte';
   import type { PageData } from './$types';
   let { data }: { data: PageData } = $props();
   const component = $derived(data.component as Component);
   ```

   **`DarkToggle.svelte`:** Full rewrite (see C3 fix above) — adds localStorage persistence, fixes CSS variables, adds TypeScript.

   **`+layout.svelte`:** Remove unused `page` import. Migrate `<slot />` to `{@render children()}`.

3. Run `npm run check` — must be clean (zero type errors) before merging.
4. Run `npm test` — `slugFromPath` tests must pass.
5. Run `npm run build` — build must succeed.
6. Manual smoke test: `npm run preview` and check: home page, a post, dark mode toggle, 404 page.

**Exit criterion:** `npm run check` clean, `npm test` passes, `npm run build` succeeds, smoke test passes.

---

### Phase 3: Code Quality & Feature Fixes
**Owner: Rusty (code) + Basher (tooling)** | Complexity: 🟢 Low | Est: 2–3 hours

**Goal:** Fix the remaining bugs and technical debt that don't require dependency changes.

**Rusty's items (code):**
1. **Dark mode localStorage persistence** — implement the fix from C3 above (if not already done in Phase 2)
2. **Remove `author` dead prop from `ArticleMeta.svelte`** — either display it or remove the prop and clean up all callers (`+page.svelte`, `posts/[slug]/+page.svelte`)
3. **Fix `ArticleDescription.svelte`** — `href` is computed but never used in the template (dead variable)
4. **`+layout.svelte` background color** — `--color-background: gray` is likely unintentional; consider `white` or a neutral light value, with the dark mode variant `#000000` as-is

**Basher's items (tooling):**
1. **Add `"test"` and `"test:watch"` scripts** to `package.json` (if not done in Phase 1)
2. **Add `vitest.config.ts`** with environment config
3. **Expand test coverage** — add tests for dark mode localStorage logic (pure function unit test), `slugFromPath` edge cases are already covered
4. **`+page.server.ts` pagination groundwork** — replace hard-coded `MAX_POSTS` with a configurable constant exported from a `$lib/config.ts` file (even if pagination UI comes in Phase 4):
   ```typescript
   // src/lib/config.ts
   export const POSTS_PER_PAGE = 10;
   ```

**Exit criterion:** `npm test` covers dark mode init logic, no dead variables in source, `npm run check` still clean.

---

### Phase 4: Optional Enhancements
**Owner: Linus** | Complexity: 🟡 Medium | Est: 4–6 hours (per item)

**Goal:** Platform improvements that grow the site's utility. These are additive — none are blockers and each can ship independently.

**Prioritized backlog:**

| Item | Value | Effort | Notes |
|------|-------|--------|-------|
| **RSS feed** (`/rss.xml`) | 🔴 High | 🟢 Low | A `+server.ts` that returns XML; feeds readers and aggregators. Essential for a blog. |
| **Pagination** | 🟡 Medium | 🟡 Medium | URL params `?page=N`; requires layout changes to index page |
| **Tags / categories** | 🟢 Low | 🟡 Medium | Add `tags` to frontmatter, generate `/tags/[tag]` routes; nice but not essential early on |
| **Sitemap** (`/sitemap.xml`) | 🟡 Medium | 🟢 Low | Helps indexing; another `+server.ts` |
| **OG image** | 🟢 Low | 🔴 High | Generated images per-post; significant complexity for current content volume |

**Recommended execution order:** RSS → Sitemap → Pagination → Tags

**For RSS specifically:**
- SvelteKit `+server.ts` at `src/routes/rss.xml/+server.ts`
- Reuse the `load` logic from `+page.server.ts` to enumerate posts
- Return `text/xml` with Atom or RSS 2.0 format
- No new dependencies needed
- Add `<link rel="alternate" type="application/rss+xml">` to `PageHead.svelte`

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| `mdsvex` not yet Svelte 5 compatible | 🟡 Medium | 🔴 High | Check before starting Phase 1. If blocked, stay on SvelteKit 2 + Svelte 4 as intermediate step |
| `npx sv migrate` produces incorrect output | 🟡 Medium | 🟡 Medium | Review diff file-by-file; have a clean `git stash` to revert |
| `svelte:component this={component}` broken in Svelte 5 | 🟢 Low | 🟡 Medium | Test in isolation first; fallback is using `{@render}` with snippet pattern |
| CSS variable regressions after variable name fix in DarkToggle | 🟢 Low | 🟢 Low | Visual test both light and dark mode after fix |
| `gh-pages` deploy script broken by build output path change | 🟢 Low | 🟢 Low | Verify `build/` is still the output dir after adapter-static v3 upgrade |

---

## Team Ownership Summary

| Phase | Owner | What They're Responsible For |
|-------|-------|------------------------------|
| **Phase 1** | **Basher** | All dependency upgrades, `svelte.config.js` fix, `vitest.config.ts` creation, `package.json` scripts |
| **Phase 2** | **Rusty** | Svelte 5 component migration (all `.svelte` files), `app.d.ts` fix, deprecated import cleanup, smoke testing |
| **Phase 3 (code)** | **Rusty** | Dead variable cleanup, dark mode localStorage fix, `ArticleMeta` author prop decision |
| **Phase 3 (tooling)** | **Basher** | Test coverage expansion, `config.ts` extraction, `MAX_POSTS` refactor |
| **Phase 4** | **Linus** | RSS feed, sitemap, pagination, tags (any/all in priority order) |
| **Review gates** | **Danny** | Architecture decisions at phase boundaries; review and approve each phase before next begins |

---

## ADR-001: Skip Svelte 4 as an Intermediate Stop

**Decision:** Migrate directly from Svelte 3 → Svelte 5, skipping Svelte 4.

**Context:** The official Svelte migration guide supports going 3→5 directly with the `npx sv migrate svelte-5` tooling. Svelte 4 was largely a compatibility bridge with minor API changes.

**Alternatives considered:**
- 3→4→5 (incremental): Doubles the migration surface. Svelte 4 compat mode is not a useful intermediate state for a small codebase.
- Stay on Svelte 4: No. Svelte 3 is EOL and this project should aim for the maintained current release.

**Consequences:** The migration diff will be larger in one shot. Mitigated by the migration tool and the small component count (8 `.svelte` files total).

---

## ADR-002: Keep `adapter-static`, No Server-Side Rendering

**Decision:** Continue using `@sveltejs/adapter-static` for GitHub Pages deployment.

**Context:** The site has no need for SSR — it's a static blog with no dynamic backend. GitHub Pages only serves static files. The current deploy script (`gh-pages -d build`) is correct.

**Consequences:** `+page.server.ts` (for the index page load) runs at **build time**, not request time. This is correct behavior for a static site. Any future feature that requires request-time server logic would require a different hosting target.

---

*Last updated: 2025-07-10 by Danny*
