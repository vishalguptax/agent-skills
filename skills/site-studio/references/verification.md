# Verification

"Looks fine" is not a result. Report evidence: scores, screenshots, the checker's output. Say plainly what you couldn't check.

## 1. Static checks (every build)

```bash
node <skill-dir>/scripts/check-site.mjs site --base https://example.com
```

Fix every error and review every warning.

## 2. Serve it like production

Test over HTTP, not `file://`, because clean URLs, `fetch`, modules and some headers behave differently from a file. Use any static server, for example:

```bash
npx --yes serve site -l 4173
```

If the site will live under a sub-path (for example a GitHub Pages project URL without a custom domain), test with that base path too.

## 3. The browser matrix

Use a real browser through the tools available: built-in browser control, the Playwright-based **webapp-testing** skill, or ask the person to check if you have no browser.

| Check | How |
|---|---|
| Phone (~375×812) and desktop (~1440×900) | Resize the window, or use device emulation |
| Light and dark | Toggle the site's theme switch, or emulate `prefers-color-scheme` |
| Reduced motion | Emulate `prefers-reduced-motion: reduce`. Every animated moment should show its final state. |
| No horizontal scroll | `document.documentElement.scrollWidth <= innerWidth` at 320px, 375px and 768px |
| Keyboard | Tab through the page. Focus must always be visible, the order must make sense, and every control must be reachable, including replay buttons and the menu. |
| Console | No errors or 404s in the console or network log |
| Motion | Each signature moment plays once, can be replayed, doesn't jank, and doesn't shift the layout |
| Links | Every nav and footer link works, and external links open correctly |

Take screenshots of the hero and one other section at both widths, in both themes, for the report.

## 4. Lighthouse (mobile, every page)

```bash
npx --yes lighthouse http://localhost:4173/ --quiet --chrome-flags="--headless=new" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output-path=./lighthouse-home.json
```

Lighthouse uses mobile emulation by default; add `--preset=desktop` for desktop. Read each category score from the JSON (`categories.<id>.score × 100`) and put them in a table:

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|

Target 95+ everywhere. Under target, read the failing audits (`audits` where `score < 0.9`) and fix their causes. Common causes:
- Render-blocking CSS or fonts.
- Unsized images.
- Large JS.
- Low contrast.
- Missing labels.

Scores vary between runs, so run twice if you're near the line.

## 5. Accessibility beyond Lighthouse

Lighthouse catches only part of the problem. Also check:
- Text contrast in both themes, including the accent color on its background.
- Meaningful alt text; decorative SVG gets `aria-hidden="true"`.
- Animated content still makes sense as static text, and a screen reader reads it in a sensible order.
- Nothing flashes more than three times per second.
- Tap targets are at least 24×24 px (44×44 is better).

## 6. Structured data and social cards

- Paste each page's JSON-LD (or its URL after deploy) into validator.schema.org and Google's Rich Results Test.
- After deploy, check the OG preview for the home page and one subpage.

## 7. Report

```md
## Verification
- Checker: 0 errors, N warnings (list)
- Lighthouse (mobile): table
- Browser: 375/1440 × light/dark × reduced motion — screenshots attached; no horizontal scroll; keyboard OK
- Structured data: validator results
- Not verified: … (and why)
```
