# Gemini 2.5 Pro Audit Prompt — Purview Marketing Site

> Paste everything below (including the role line) into Gemini 2.5 Pro along with the repo.
> Target: full codebase + all uncommitted additions since commit `a14fb95`.

---

## Role

You are a senior full-stack engineer and security auditor reviewing a production-bound codebase. Your job is to find bugs, security vulnerabilities, performance issues, SEO/AI-discoverability defects, and architectural problems that the dev team may have missed. Be thorough and adversarial — assume every file could contain a bug. Do not be polite; be direct and specific. Cite file paths and approximate line numbers for every finding.

## Project context

**Name:** Purview marketing site (`getpurview.com`)
**Purpose:** Lead-gen marketing site for a multi-state US privacy compliance SaaS aimed at SMBs. The hero scan form is a **client-side redirect only** — it sends `url` to `app.getpurview.com/scan?url=...`. The marketing site itself has **no backend, no database, no auth, no payments**. All business logic lives in a separate app repo.

**Stack:**
- Next.js **16.2.2** (App Router, **Turbopack** production build)
- React **19.2.4**
- TypeScript 5, strict mode
- Tailwind CSS **v4** (`@tailwindcss/postcss`)
- MDX content via `next-mdx-remote` + `rehype-pretty-code` + `shiki` + `remark-gfm` + `rehype-slug` + `rehype-autolink-headings`
- `gray-matter` for frontmatter, `reading-time` for read-time estimates
- `lucide-react` for icons
- No database, no ORM, no auth, no Stripe. No tests.
- Deployed on Vercel (Fluid Compute / Node runtime).

**What currently ships (routes):**
- Static: `/`, `/blog`, `/guides`, `/privacy`, `/terms`, `/sitemap.xml`, `/_not-found`
- SSG (generateStaticParams): `/blog/[slug]`, `/guides/[slug]`
- Dynamic API routes: `/api/md/[slug]`, `/api/md/blog/[slug]`, `/api/md/guides/[slug]` — return the raw markdown "mirror" of a page with `Content-Type: text/markdown` for LLM crawlers.

**The AI-discoverability layer (critical — must stay internally consistent):**
Four moving parts must stay in sync when a public page is added/renamed:
1. `src/lib/markdown-mirrors.ts` — slug → full markdown body for the marketing pages (`index`, `privacy`, `terms`). Homepage pulls FAQ data dynamically from `src/lib/faq-data.ts`.
2. `src/app/api/md/[slug]/route.ts` — returns 200 with `Content-Type: text/markdown; charset=utf-8` and `Cache-Control: public, max-age=3600, s-maxage=86400`. 404 for unknown slugs.
3. `next.config.ts` `rewrites()` — transparent rewrites mapping `/index.md`, `/privacy.md`, `/terms.md` → `/api/md/{slug}` (and similar patterns for `/blog/*.md`, `/guides/*.md`).
4. `public/llms.txt` — AI-readable directory listing every mirror URL.

Supporting:
- `public/robots.txt` — explicit `Allow: /` for ~20 AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, etc.).
- `src/app/layout.tsx` — `<link rel="alternate" type="text/plain" href="/llms.txt">` and root metadata `alternates.types["text/markdown"] = "/index.md"`.
- Per-page metadata overrides `alternates.types["text/markdown"]` per page.
- `src/components/json-ld.tsx` and `src/components/faq-schema.tsx` inject structured data via inline `<script type="application/ld+json">` tags.

## What's new since the last push (commit `a14fb95`)

All of the following is **uncommitted** and has never been reviewed. Pay extra attention here — this is the primary audit target. The rest of the repo is also in scope but has had one prior sanity pass.

**Modified files:**
- `next.config.ts` (added `rewrites()` for markdown mirrors)
- `package.json` / `package-lock.json` (added MDX + shiki + rehype toolchain)
- `public/robots.txt` (added AI-crawler allowlist, ~76 lines)
- `src/app/layout.tsx` (added llms.txt `<link rel="alternate">`, root markdown alternate)
- `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` (per-page markdown alternates)
- `src/app/sitemap.ts` (added blog + guides entries)
- `src/components/nav-bar.tsx` (added Blog / Guides links, restructured)

**New files (content pipeline):**
- `content/blog/which-state-privacy-laws-apply.mdx` (108 lines — seed post)
- `content/guides/sample-test-guide.mdx` (22 lines — seed guide)
- `src/lib/blog.ts` (57 lines — frontmatter loader, list/get helpers)
- `src/lib/guides.ts` (57 lines — ditto for guides)
- `src/lib/content.ts` (207 lines — shared MDX compilation / rendering helpers)
- `src/lib/markdown-mirrors.ts` (255 lines — hand-written markdown for homepage/privacy/terms)

**New files (routes):**
- `src/app/blog/page.tsx` (253 lines — index page)
- `src/app/blog/[slug]/page.tsx` (273 lines — post page + generateStaticParams + generateMetadata)
- `src/app/guides/page.tsx` (191 lines — index page)
- `src/app/guides/[slug]/page.tsx` (273 lines — guide page + generateStaticParams + generateMetadata)
- `src/app/api/md/[slug]/route.ts` (34 lines — marketing page mirror)
- `src/app/api/md/blog/[slug]/route.ts` (33 lines — blog post mirror)
- `src/app/api/md/guides/[slug]/route.ts` (33 lines — guide mirror)

**New files (components):**
- `src/components/mdx-components.tsx` (162 lines — custom MDX element mapping)
- `src/components/json-ld.tsx` (28 lines — generic JSON-LD injector)
- `src/components/faq-schema.tsx` (64 lines — FAQPage schema builder)

**New static assets:**
- `public/llms.txt` (53 lines)

The rest of the repo (hero, features, pricing, faq, comparison, problem, how-it-works, trust, security-badges, footer, animated-grid, dashboard-mockup, scroll-reveal, jump-nav, section-divider, mid/final CTA) is pre-existing marketing UI and should also be reviewed, but at lower priority.

## Known-fixed bugs — DO NOT re-report

1. **CVE-2025-66478** — fixed by upgrading Next.js 15.3.1 → 16.2.2 in commit `6c1d4e9`.
2. **Dev console errors + stale `trial` wording** — fixed in commit `a14fb95`. If you find any residual `trial` / `free trial` copy it IS a regression and in scope.
3. **Missing `.gitignore` for `.next/`** — fixed in commit `8504456`.
4. **Production build `.next/static` ENOENT** — turned out to be stale Turbopack state, resolved by `rm -rf .next && next build`. Not a code bug.

## Known stubs / deferred — DO NOT report as missing

1. **Only one seed blog post and one seed guide.** Thin content is intentional for launch; don't flag "needs more posts."
2. **No tests of any kind.** The project has no test framework installed. Flagging "missing test coverage" broadly is not useful; instead, list the **top 10 specific test cases** that SHOULD exist (see output format below).
3. **`npm run lint` is broken** due to a circular FlatCompat / `eslint-config-next@16` reference. Pre-existing, tracked. Do not report as a finding unless you have a specific fix.
4. **No analytics, no A/B testing, no CMS.** Intentional for v1.
5. **Hero scan form has no validation beyond a URL check** — by design, real validation happens on `app.getpurview.com`. (Client-side open-redirect risk IS still in scope — see security section.)
6. **No backend / API routes besides `/api/md/**`.** Anything suggesting "add an API for X" is out of scope unless X is the markdown mirror itself.
7. **No i18n.** US-only product; English-only is intentional.
8. **`markdown-mirrors.ts` is hand-written, not generated from React.** Intentional trade-off (authoring clarity) but drift between the React tree and the markdown IS a valid finding — call out any mismatches you spot.

## Audit categories

Evaluate the codebase across all of these. Weight 1, 2, 3, 4, 7, 10, and 11 most heavily given what this project actually is.

1. **Architecture & code organization** — duplication between `src/lib/blog.ts` and `src/lib/guides.ts`, duplication between the three `/api/md/*` route handlers, separation of concerns between `content.ts` and the two loaders, single-responsibility violations, dead code.
2. **Bugs & correctness** — logic errors, null/undefined handling, off-by-one in slug/date parsing, frontmatter schema drift, race conditions in MDX compilation, error swallowing, unhandled promise rejections, wrong cache keys.
3. **Security** —
   - Open redirects (especially the hero scan form → `app.getpurview.com/scan?url=`: is the URL validated? could it be a `javascript:` or data URL?)
   - **Path traversal** in dynamic route handlers that take a `slug` and read from `content/blog` or `content/guides` — look for `path.join` with unvalidated input that could escape the content directory. Does the code reject slugs containing `..`, `/`, null bytes, or absolute paths?
   - **XSS via MDX** — is content sanitized? Can `<script>` inside `.mdx` execute? Is `rehype-raw` enabled? Even if content is authored by us, drift + typos matter.
   - **Header injection / response splitting** in the markdown API routes — any user input flowing into `Content-Type`, `Cache-Control`, or `Location` headers.
   - `next.config.ts` rewrite rules — any wildcard that could leak internal routes.
   - Robots / llms.txt — any accidental exposure of staging/admin paths.
   - CSP, `X-Frame-Options`, `Referrer-Policy`, `Strict-Transport-Security` — present? absent? wrong?
   - **Inline JSON-LD injection safety** in `json-ld.tsx` and `faq-schema.tsx` — the JSON is embedded inside a `<script>` tag via React's inline-HTML escape hatch. Verify the serializer escapes `<`, `>`, `&`, and especially the closing `</script>` sequence (the classic attack pattern). If the code uses `JSON.stringify` without post-processing it is unsafe. **Recommended fix: apply the standard replacement `.replace(/</g, '\\u003c')` — or use a library like `serialize-javascript` / `DOMPurify` — before embedding.**
4. **Performance & bundle size** —
   - `shiki` pulled into client bundles accidentally (it's heavy)
   - `next-mdx-remote` server vs client import boundary
   - Unnecessary `"use client"` directives
   - Fonts loaded via `next/font`?
   - Images using `next/image`?
   - Any render-blocking work in `layout.tsx`
   - MDX re-compilation on every request vs build-time
   - Over-eager `revalidate` or missing `revalidate` on ISR pages
5. **Data integrity / content pipeline** —
   - Frontmatter validation — what happens if a `.mdx` file is missing `title` or `date`? Is there a Zod schema or runtime check?
   - Drafts / `published: false` — honored consistently across sitemap, list page, detail page, and markdown mirror?
   - Slug collisions between `/blog/<slug>` and `/guides/<slug>`
   - `readingTime` computation on raw MDX (including JSX noise) vs rendered text
6. **Testing gaps** — see output format; produce top 10 specific cases.
7. **Next.js 16 App Router correctness** —
   - `generateStaticParams` returning the right shape
   - `generateMetadata` with proper `Promise<Metadata>` typing
   - **`params` is async in Next 16** — every `page.tsx` / `route.ts` must `await params`. Flag any sync usage.
   - `metadata.alternates.canonical` set correctly per page
   - Client vs server component boundaries
   - `notFound()` usage in dynamic routes
   - Streaming / Suspense boundaries
   - Proper use of `proxy.ts` vs `middleware.ts` (Next 16 prefers `proxy.ts`)
   - Cache Components / `use cache` directive opportunities
   - `next.config.ts` using the modern shape, no deprecated options
8. **TypeScript hygiene** — `any`, non-null assertions, unsafe casts, unchecked `as`, missing return types on exported functions, `@ts-ignore` / `@ts-expect-error` comments.
9. **Accessibility** — landmark usage, heading hierarchy inside MDX renders, alt text, focus states on nav-bar + jump-nav, skip link, color contrast against Tailwind v4 custom palette, keyboard navigability of pricing cards and comparison table, `aria-current` on active nav item, `prefers-reduced-motion` on scroll-reveal + animated-grid.
10. **SEO & AI-discoverability consistency** —
    - Does every public page in `sitemap.ts` have a matching markdown mirror (either hand-written in `markdown-mirrors.ts` or generated from MDX)?
    - Does `public/llms.txt` list every mirror? Any stale entries?
    - Does `public/robots.txt` contradict anything in `sitemap.ts`?
    - Does the `<link rel="alternate" type="text/markdown">` per page point at a URL that actually resolves 200?
    - JSON-LD: `Organization`, `WebSite`, `BreadcrumbList`, `Article` (on blog posts), `FAQPage` — present, valid, and matching visible content?
    - Open Graph / Twitter card completeness per route
    - Canonical URLs consistent (`https://getpurview.com` vs `https://www.getpurview.com` vs trailing slash)
    - `/sitemap.xml` includes blog posts and guides at build time
11. **MDX rendering pipeline** —
    - `rehype-pretty-code` + `shiki` configured so code blocks actually get syntax highlighted in production (not just dev)?
    - Theme configured? Dual-theme (light/dark)?
    - `rehype-slug` + `rehype-autolink-headings` producing deterministic IDs that match the `jump-nav` TOC
    - Custom MDX components in `mdx-components.tsx` — are they applied on both the page render AND the markdown-mirror path? If mirrors bypass MDX entirely, note the drift.
    - `remark-gfm` enabled so tables and task lists work in the seed blog post

## Output format

For **each finding**, provide:

```
Severity: CRITICAL | HIGH | MEDIUM | LOW
Category: <one of the 11 categories above>
File: <exact path>
Line: <approximate>
Description: <what's wrong, concretely>
Fix: <specific code change — include a diff or replacement snippet if non-trivial>
Why it matters: <blast radius — security risk, data loss, SEO penalty, a11y failure, broken build, etc.>
```

Severity rubric:
- **CRITICAL** — exploitable security issue, data loss, production build broken, page 500s in prod, or canonical/robots mistake that nukes SEO.
- **HIGH** — visible user-facing bug, a11y failure that fails WCAG AA, significant perf regression (>200ms TBT or >100KB wasted JS), broken AI-discoverability (crawler gets wrong content).
- **MEDIUM** — correctness bug without user-visible impact yet, code smell causing drift risk, missing metadata field, minor a11y.
- **LOW** — nit, style, opportunity.

At the **end of the audit**, produce these four sections:

### A. Architecture score
`X / 10` with a 3-sentence justification.

### B. Top 10 priorities
Ordered list. Each entry: `[SEVERITY] <one-line summary> — <file>:<line>`. Ranked by **severity × blast radius**, not by count of occurrences.

### C. Top 10 tests that should exist but don't
Concrete test cases (name + one-line assertion), not categories. Example: `"markdown mirror returns 404 for unknown slug without leaking filesystem path" — assert status 404, assert body contains no 'ENOENT' or absolute path`.

### D. AI-discoverability consistency report
A small table with one row per public page showing: `route | in sitemap? | has markdown mirror? | listed in llms.txt? | canonical matches? | JSON-LD type`. Flag any row with a missing column.

---

**Begin the audit.** Start with CRITICAL findings first, then HIGH, then MEDIUM, then LOW. Do not omit categories just because you found nothing — explicitly say "no findings in category X" so we know it was reviewed.
