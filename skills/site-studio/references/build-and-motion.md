# Build stack and motion

## Contents
- [Choosing the stack](#choosing-the-stack)
- [File layout for a static site](#file-layout-for-a-static-site)
- [Performance budget](#performance-budget)
- [The motion toolkit](#the-motion-toolkit)
- [Writing a motion spec](#writing-a-motion-spec)
- [Reduced motion](#reduced-motion)
- [Live numbers and build scripts](#live-numbers-and-build-scripts)

## Choosing the stack

Default to **plain static HTML, CSS and a little JS**, plus a small Node build script if you need templating or baked data. That's the fastest to load, the easiest to host anywhere, and has no dependencies to maintain.

Choose something else only for a stated reason:
- **Many content pages from Markdown** (docs, a blog, a changelog): a static site generator the project already uses, or a light one such as Astro or Eleventy. The output stays static.
- **The project is already a React, Vue or Svelte app** and the site must share its components: use its framework's static export.
- **Interactive demos** that need real app code: put them on one page, not everywhere.

Whatever the stack, the shipped site is static files, hosted on a CDN. That way it never needs a server.

## File layout for a static site

```
site/
  index.html
  <page>/index.html          one folder per page: clean URLs (/install/)
  404.html
  assets/
    css/site.css             tokens + layout + components (inline the critical part)
    js/*.js                  small modules, loaded with type="module" (deferred by default)
    fonts/*.woff2            self-hosted, subset
    img/                     AVIF/WebP + fallbacks, OG images
  robots.txt  sitemap.xml  llms.txt  site.webmanifest  favicon.svg
  CNAME                      (GitHub Pages custom domain)
  .nojekyll                  (GitHub Pages: serve files as-is)
scripts/build-site.mjs       optional: templating, baked numbers, sitemap, OG images
```

## Performance budget

Aim for Lighthouse mobile 95+. Budgets that usually get there:
- **JS:** ≤ 30 KB gzipped per page, no render-blocking scripts, and no third-party scripts unless approved.
- **CSS:** inline about 10 KB of critical CSS; load the rest without blocking.
- **Fonts:** at most 3 files on the critical path. Preload only the display font, and use `font-display: swap`.
- **Images:** AVIF or WebP with explicit `width` and `height`, `loading="lazy"` below the fold, and `fetchpriority="high"` on the hero image if there is one.
- **Layout shift:** no shifts after load (CLS < 0.05). Reserve space for anything that animates in or loads late.
- **Video:** only if it's the product's own demo. Use a poster image, `preload="none"` or `metadata`, muted autoplay only when it's decorative, and always a way to pause.

## The motion toolkit

Prefer the platform, and add libraries only for a moment the platform can't do.

| Need | Native first | Library if justified |
|---|---|---|
| Animate as an element scrolls into view, or with scroll progress | CSS scroll-driven animations: `animation-timeline: view()` / `scroll()` with `animation-range` | GSAP ScrollTrigger |
| Choreographed timeline (A, then B, then C) | Web Animations API (`element.animate()`, `.finished` promises), CSS `@keyframes` with delays | GSAP timeline, Motion One |
| Drawing lines and pen strokes | SVG `stroke-dasharray` / `stroke-dashoffset` | — |
| Page-to-page transitions | Cross-document View Transitions (`@view-transition { navigation: auto; }` plus `view-transition-name`) | — |
| Reveal and wipe | `clip-path` animations | — |
| Number tick-up | Web Animations API on a CSS custom property registered with `@property`, or a tiny rAF loop | — |
| 3D, WebGL, shaders | Only if it *is* the concept, lazy-loaded with a static poster fallback | three.js / OGL |

Rules that keep motion fast and kind:
- **Animate only `transform`, `opacity`, `clip-path`, `filter` (sparingly) and SVG stroke properties.** Never layout properties (`top`, `width`, `height`, `margin`).
- **No scroll-jacking** (hijacking the scroll position or speed) and no smooth-scroll libraries. The reader controls the page.
- **Feature-detect** with `@supports (animation-timeline: view())` and design the unsupported state to look finished, not broken. Browser support for scroll-driven animations and cross-document View Transitions differs, so check current support (caniuse or MDN) when you build.
- **Run signature moments once,** with a visible replay control, rather than looping forever.
- **A few meaningful moments beat motion on everything.** If every section fades up, nothing stands out.
- **Respect `prefers-reduced-motion`** (see below), and pause anything offscreen.

## Writing a motion spec

For each animated moment, write the spec into the brief before you build it:

```md
### Moment: <name>
- Purpose: what it explains about the product
- Trigger: on load (after fonts) / enters viewport (range: entry 10%–cover 40%) / click "Replay"
- Layer stack (back → front): grid paper · code block · SVG pen layer · stamp
- Choreography:
  1. 0–600ms: pen stroke draws under `getData2` (stroke-dashoffset 100%→0, ease-out)
  2. 600–900ms: margin note fades in, translateY 6px→0
  3. 900–1500ms: line swaps to clean version (clip-path wipe left→right)
  4. 1500ms: stamp lands: scale 1.15→1, rotate -8°, opacity 0→1, 180ms, cubic-bezier(.2,.9,.3,1.3)
- Reduced motion: final state shown statically; replay button hidden
- Budget: no JS library; ≤ 4 KB JS; transform/opacity/clip-path/stroke only
```

## Reduced motion

Under `@media (prefers-reduced-motion: reduce)`:
- Show every animated moment in its *final, meaningful* state, for example the clean code with the stamp already placed.
- Remove parallax, traveling elements and autoplaying video (show the poster).
- Keep instant state changes such as hover color. Remove movement.
- Test it: in Chrome DevTools, open Rendering and set "Emulate CSS media feature prefers-reduced-motion"; in Playwright, use `emulateMedia({ reducedMotion: 'reduce' })`.

## Live numbers and build scripts

Bake live data, such as GitHub stars, npm downloads or the latest version, into the HTML at build time rather than fetching it in the browser:
- It's in the markup for SEO and AI crawlers, with no layout shift and no client requests.
- If a fetch fails, keep the last committed value and don't fail the build.
- Refresh on a schedule (for example a workflow cron every 12 hours) as well as on every content push.
- Only show a number if it's flattering *and* true. A star count of 3 does more harm than leaving it out.
