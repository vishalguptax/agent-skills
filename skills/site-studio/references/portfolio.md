# Portfolios

A portfolio sells a person, and the proof is their work. The workflow is the same as for a product site; what changes is what you gather, how you find the concept, the motion patterns, and the structured data.

## Intake (fact sheet for a person)

Gather from the person, their résumé or LinkedIn export, their GitHub, Dribbble or Behance, and their existing site:
- **Positioning:** one line for who they are and what they're best at, and the kind of work or role they want next. A portfolio that fits everyone convinces no one.
- **Selected work:** 3–8 projects, not everything. For each one:
  - role, team, timeframe;
  - the problem, what *they* did, and the outcome, with real numbers only if they can stand behind them;
  - links to the live product, repo or write-up;
  - real images and recordings, and permission to show them (NDA work may need to be anonymized or described without visuals).
- **About:** a short bio, location or time zone, availability, and a photo (optional).
- **Proof:** talks, writing, open source, awards, and testimonials *with names and permission*. Never invent any of these.
- **Contact:** an email (consider obfuscating it, or using a `mailto:` link only), links, and a CV PDF if they want one.
- **Discretion:** if they're job-hunting while still employed, ask how public "open to new roles" should be, and whether current-employer work and metrics may be named.

## Finding the concept

The concept comes from how the person works, or from their craft, not from a trend:
- A motion designer → the site itself is a timeline you scrub.
- A backend or infrastructure engineer → a calm, precise "system status" or schematic aesthetic, with work shown as incident write-ups.
- A type-loving designer → an editorial specimen book.
- A photographer → images first, and the interface nearly disappears.

Still offer three directions, including a minimal one. For many senior people, calm typography with superb case studies beats spectacle.

## Structure

| Page | Notes |
|---|---|
| `/` | Positioning line, selected work (the main thing), a short about, contact |
| `/work/<project>/` | One case study per project: context → problem → their role → process → outcome → links. Real images, captioned. |
| `/about/` | Bio, experience timeline, skills (specific, not a logo wall), photo |
| `/writing/` or `/talks/` | Only if there's real content |
| `/contact/` | Or a section on every page |

A single-page portfolio is fine when there are few projects; give each case study its own URL as soon as there are more than about three. That's better for sharing and SEO.

## Motion patterns that suit portfolios

Use a few, and make them good:
- **Work index → case study transition:** the project's thumbnail expands into the case-study hero using cross-document View Transitions (`view-transition-name` on the thumbnail and the hero). This is the most "modern portfolio" moment there is, and it's native.
- **Hover previews** on the work list: a looping clip or image follows the cursor, or reveals on hover. Provide a static image on touch devices, and pause offscreen.
- **Image reveals** on scroll: a `clip-path` wipe or slight scale using `animation-timeline: view()`. Keep them subtle.
- **Type moments:** the name or positioning line set in large display type, with a per-letter or per-line entrance. Run it once, and keep it readable by screen readers: animate wrapper spans and keep the real text intact, with `aria-label` on the heading if it's split.
- **Cursor effects** only if they're part of the concept, never instead of the native cursor, and never on touch devices.
- Smooth-scroll and WebGL libraries are common on award sites, but they cost performance and accessibility. Use them only if they *are* the concept, lazy-loaded with a static fallback.

All the rules in `build-and-motion.md` still apply: transform, opacity and clip-path only; no scroll-jacking; a complete reduced-motion state.

## Images and video (portfolios are media-heavy)

- AVIF or WebP at the right sizes (`srcset` and `sizes`), with explicit dimensions, lazy below the fold and priority for the first visible image.
- Video: compressed MP4/WebM, a poster image, muted and `playsinline` for silent previews, `preload="none"` until needed, and pause offscreen.
- Keep the home page light: thumbnails, not full-size images. The full media lives on the case-study pages.

## SEO for a person

- **Titles:** `Name: Role (e.g. Product Designer) in City` on home; `Project name: what it was, Name` on case studies.
- **JSON-LD:**
  - Home or about: `ProfilePage` whose `mainEntity` is a `Person` with `name`, `jobTitle`, `url`, `image`, `sameAs` (GitHub, LinkedIn, Dribbble and so on), and optionally `worksFor` and `knowsAbout`.
  - Case studies: `CreativeWork` or `Article` with `author` → the `Person`, `datePublished`, `image`; plus `BreadcrumbList`.
- **`llms.txt`:** who they are, what they do, their selected work with a link each, and how to contact them.
- **OG images:** each case study gets its own social card built from its hero image and title. Portfolios are shared link by link.
- Ask whether they want the site indexed under their name. Most do; some want it private (then `noindex`, and leave it out of search engines).
