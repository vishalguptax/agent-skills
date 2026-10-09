# Design direction

## Find the concept first

A distinctive site starts from one idea that belongs to this product, not from a style. Ask:
- What does the product *do*, physically or metaphorically? A linter reviews, a CDN delivers, a database files things away, an API answers.
- What artifact from the real world does that resemble? A marked-up manuscript, a shipping manifest, a card catalog, a switchboard, a weather map.
- Can the hero *demonstrate* the product instead of describing it? A before/after, the core interaction playing out, or real output.

Some examples of turning a product into a concept:

| Product | Concept | Signature moment |
|---|---|---|
| A code-review / guardrails tool | "The review copy": a spec sheet marked up in red pen | Sloppy code gets red-penned, becomes clean code, and gets a VERIFIED stamp |
| A CLI for data pipelines | "The plumbing diagram": schematic lines and gauges | Data flows through the schematic as you scroll |
| A note-taking app | "The commonplace book": paper, marginalia | Scattered notes link themselves into a page |
| A deploy tool | "The departures board": split-flap type | Deploy statuses flip on the board |

If the person likes a style they saw (for example Newsprint), fold it into the concept instead of shipping it as is.

## Respect what exists

- If the product has a logo, colors, a `DESIGN.md`, a theme file or an app UI, start from those. Extend them for marketing scale: a display type scale, section rhythm, motion. Don't replace them.
- If nothing exists, the site's design system becomes the brand. Document it as `DESIGN.md` (tokens and usage rules) so the app and docs can follow.

## Anti-generic checklist

Each item should be false for the final design. If one is true, the design needs another pass.
- A purple, indigo or blue-to-pink gradient is the main visual.
- Glassmorphism cards, or a blurred blob or aurora background, carry the hero.
- The hero is a centered headline, a subline, two buttons and a floating product mock with nothing else distinctive.
- The page is a row of three or six identical rounded feature cards with icons.
- It uses default Inter or system-UI everywhere, at one weight, with no typographic hierarchy.
- It has stock 3D, sparkle or robot-head icons, or random emoji as decoration.
- It has fake social proof: invented logos, testimonials, user counts, or "Trusted by 10,000+ teams".
- Motion on every element (fade-up on scroll everywhere) instead of a few meaningful moments.
- Someone who knows the product category could mistake it for a competitor's site.

## Writing the three directions

Make them truly different, not three color variants. A good spread:
1. **The concept, at full strength.** The signature motion and the most distinctive type.
2. **The concept, restrained.** The same idea expressed mostly through layout and typography, with lighter motion.
3. **Minimal.** Editorial or Swiss calm: superb typography, one accent, almost no motion, and very fast. It's always a valid choice.

For each direction, give:

```md
### Direction N: <name>
- Concept: one sentence linking the visual idea to what the product does
- Type: display / text / mono, with fallbacks and licenses
- Palette: light and dark tokens; one accent; contrast notes
- Layout: grid, density, borders/radius, imagery
- Signature moment: what happens, why it explains the product
- Motion level: high / medium / minimal; technique
- Draws on: references from the brief
- Suits this product because:
- Risks: (performance, accessibility, content needs, effort)
```

Then add a quick hero mockup for each one: static HTML, an image, or a precise written description if you can't render.

## Typography

- Hierarchy carries more distinctiveness than color does. Use real contrast in size and weight, and real pairing (serif display with grotesk text, grotesk display with mono labels, and so on).
- Use at most two families and three files on the critical path. Subset to the scripts you need, serve them as woff2, and set `font-display: swap`.
- Display sizes use `clamp()` so they scale smoothly. Measure 60–75 characters for body text.
- Free, high-quality sources: Fontshare, Google Fonts (self-host), and the foundries' own free families. Check every license.

## Color

- Define tokens for both themes from the start, so dark mode isn't an inverted afterthought.
- Use one accent color, and mean it: links, the signature moment, key status.
- Check WCAG 2.2 AA contrast for text in both themes, including text over images or video.
