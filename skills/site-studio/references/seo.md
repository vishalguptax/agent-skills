# SEO and AI search

## Contents
- [Plan: one page, one intent](#plan-one-page-one-intent)
- [Every page's head](#every-pages-head)
- [Structured data (JSON-LD)](#structured-data-json-ld)
- [Crawl files](#crawl-files)
- [AI search (answer engines)](#ai-search-answer-engines)
- [Open Graph images](#open-graph-images)
- [Content that ranks](#content-that-ranks)
- [After launch](#after-launch)

## Plan: one page, one intent

List the searches a real person would type to find this product, then give each important cluster its own page with a clean URL (`/install/`, `/pricing/`, `/vs-<competitor>/` only if it's honest). One page shouldn't try to rank for everything. Put this table in the brief:

| URL | Primary intent (query) | Secondary | Title (≤ 60 chars) | Description (≤ 155 chars) |
|---|---|---|---|---|

## Every page's head

```html
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Specific benefit — Product name</title>
<meta name="description" content="One concrete sentence about this page, ≤155 chars.">
<link rel="canonical" href="https://example.com/page/">
<meta name="theme-color" content="#…" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#…" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<!-- Open Graph / social -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Product">
<meta property="og:url" content="https://example.com/page/">
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:image" content="https://example.com/assets/og/page.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="…">
<meta name="twitter:card" content="summary_large_image">
```

Rules:
- **Titles and descriptions:** unique on every page, written for people, with the page's main term early and the product name at the end.
- **Canonical:** absolute and self-referencing, using one consistent URL form (trailing slash or not, `https`, apex or `www`).
- **Headings:** exactly one `h1` per page, then `h2` and `h3` in order.
- **Links:** descriptive text ("Install guide", not "click here"); internal links between related pages.
- **Images:** meaningful `alt` text (or `alt=""` for decorative images), plus `width` and `height`.
- **Indexing:** no `noindex` on pages you want indexed. The 404 page should carry `noindex`.

## Structured data (JSON-LD)

Use what fits the product, in one `<script type="application/ld+json">` per page, ideally as a `@graph`.

- **Home page:** `WebSite`, plus the product entity:
  - Software (a CLI, library, app or extension): `SoftwareApplication` with `name`, `description`, `applicationCategory` (for example `DeveloperApplication`), `operatingSystem`, `softwareVersion`, `license` (a URL), `url`, `downloadUrl` or `installUrl`, `author` or `publisher`, and `offers` with `price: "0"` and `priceCurrency` for free products.
  - A company or service: `Organization` with `logo` and `sameAs` (GitHub, social).
  - A physical or paid product: `Product` with real `offers`.
- **Subpages:** `BreadcrumbList`.
- **FAQ:** `FAQPage` only if the questions and answers are visible on the page.
- **How-to pages:** `HowTo` only for real step-by-step content.
- **Don't** add `aggregateRating` or `review` without real, visible reviews; that's against search-engine guidelines.

Validate with validator.schema.org and Google's Rich Results Test. `scripts/check-site.mjs` checks that every block parses and has `@context` and `@type`.

## Crawl files

**`sitemap.xml`** lists every indexable page with an absolute URL and `lastmod`, generated at build time:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc><lastmod>2026-01-01</lastmod></url>
</urlset>
```

**`robots.txt`**: start from `assets/robots.txt`. Allow everything you want found and point to the sitemap. Decide AI-crawler access *deliberately*, with the person: open-source and marketing sites usually want to be cited by AI assistants. The template names the main AI crawlers so the intent is explicit, and lists the opt-out tokens for model training.

**`llms.txt`** gives AI assistants a concise Markdown summary of the product, with one line and a link for each key page (see `assets/llms.txt`). Keep it factual, with the same facts as the site.

**Also include:**
- A `404.html` (styled, with links home and to the key pages).
- `site.webmanifest` with name, icons and theme colors.
- Favicons: SVG plus PNG fallbacks.

## AI search (answer engines)

AI assistants quote pages that state facts clearly. Help them:
- **The first paragraph** of each page answers "what is this and who is it for" in plain words.
- **Use real HTML text** for key facts (install command, supported platforms, license, price), not text inside images, canvas or animations.
- **Write question-shaped headings** where people really ask them ("How do I uninstall it?"), with direct answers.
- **Keep facts consistent** across the site, README, package metadata and `llms.txt`. Contradictions lower trust.
- **Server-render everything.** Content that appears only after JavaScript runs is often invisible to crawlers.

## Open Graph images

- 1200×630 PNG (or JPEG), under about 300 KB, in the site's visual style, with large readable text (the page title and product name).
- Generate them at build time from HTML or SVG, for example by screenshotting a template page with Playwright or rendering SVG, so they stay in sync with titles.
- Use one per key page, or a shared image with per-page titles.
- Check the preview with the platforms' card validators, or a generic OG preview tool, after deploy.

## Content that ranks

- Specific and useful beats long. Answer the visitor's real questions: what it does, how to start, what it costs, how it compares, and what's required.
- Show real proof: screenshots, real commands, real numbers from the build script, links to the source.
- No keyword stuffing, no doorway pages, no hidden text.

## Local businesses (local SEO)

For a shop, restaurant, clinic or studio, most visitors arrive through maps and local search, not the website itself.
- **Google Business Profile** matters more than the site. Tell the owner to create or claim it (only they can), with the same name, address, phone, hours, photos and website link.
- **Keep name, address and phone (NAP) identical** everywhere: the site, the JSON-LD, Google, Apple Maps, social profiles and directories.
- **Use a `LocalBusiness` subtype in JSON-LD** (`Bakery`, `Restaurant`, `Dentist`…) with `address`, `geo`, `telephone`, `openingHoursSpecification`, `hasMap`, `priceRange` (only if real) and `image` once real photos exist.
- **Put the key facts on the first screen as real text:** hours (and whether it's open now), the address with a map link, and a `tel:` link.
- Never add review markup for the business's own reviews from Google; that's against the guidelines.

## Multilingual sites

- One URL per language (for example `/` for the main language and `/en/`), with `<html lang>` set correctly on each page.
- `<link rel="alternate" hreflang="pt" href="…">` for every language version on every page, including a self-reference, plus `hreflang="x-default"`.
- Translate titles, descriptions, `llms.txt` sections and JSON-LD text too. Don't machine-translate and publish without the owner reading it.

## After launch

Tell the person how to:
- Verify the domain in Google Search Console (and Bing Webmaster Tools), and submit the sitemap.
- Check the page experience report, and the indexing status after a few days.
- Re-run `scripts/check-site.mjs` and Lighthouse after content changes.
