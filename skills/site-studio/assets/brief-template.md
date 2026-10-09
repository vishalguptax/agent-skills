# Site brief: <product> (<domain>)

The single source of truth for this site. Fill it in phase by phase; every fact has a source.

- **Site type:** (see `references/site-types.md`)
- **Not available, so never shown:** (e.g. star count, testimonials, prices)

## 1. Fact sheet
Use the variant that fits, and delete the other. Mark numbers whose only source is the owner as **self-reported** until they confirm them.

**Product, business or event**
| Fact | Value | Source |
|---|---|---|
| One-line description | | README L1 |
| Audience | | |
| Problem it solves | | |
| Key features (with proof) | | |
| Get started / install / book / buy | | |
| Price / license | | |
| Version / status / dates / hours | | |
| Links (repo, package, docs, social, store) | | |

**Person (portfolio, CV)**
| Fact | Value | Source |
|---|---|---|
| Positioning (who, best at, role sought) | | CV summary |
| Selected work (role · problem · outcome · links · media permission) | | |
| Experience | | |
| Proof (talks, writing, open source, named testimonials with permission) | | |
| Location · availability | | |
| Contact and links | | |

**Open questions for the owner:**
-

## 2. Goals and constraints
- Primary goal (installs / sign-ups / docs / credibility):
- Audience and voice:
- Must-have pages:
- Domain and host:
- Avoid:
- Sites they love or hate:

## 3. Inspiration
**Keep:**
- <source> — <entry> (<url>): borrow …; avoid …; because …

**Rejected:**
- <style or site>: why

**Competitors' sites and how we'll differ:**
-

## 4. Direction (chosen at gate 1)
- Concept:
- Type:
- Palette (light and dark):
- Layout:
- Signature moment(s):
- Motion level:
- Minimal fallback:

## 5. Helpers (approved at gate 2)
| Helper | Source | Why | Touches (account / uploads / network) | Approved |
|---|---|---|---|---|

## 6. Information architecture and SEO
| URL | Purpose | Primary query | Title (≤ 60) | Description (≤ 155) |
|---|---|---|---|---|

- JSON-LD types:
- Crawl files: sitemap.xml · robots.txt (AI policy: …) · llms.txt · 404 · manifest · icons
- OG images: approach

## 7. Content outline
Per page: sections, and the source of each section's copy.

## 8. Design tokens
Extends: <existing DESIGN.md / theme> or new. The site's tokens are documented in `<site>/DESIGN.md`.

## 9. Motion spec
One block per moment: purpose · trigger · layer stack · choreography (timings, easing) · reduced-motion state · budget.

## 10. Build and hosting
- Stack and why:
- Build script (live numbers, sitemap, OG):
- Host, workflow and custom domain:
- Interaction with existing CI and releases:

## 11. Done when (each true or false)
- [ ] Every page in §6 exists and renders in light and dark from 320px to 1920px with no horizontal scroll
- [ ] Checked in a browser at 375px and 1440px, both themes, and with reduced motion (complete static state)
- [ ] Lighthouse mobile ≥ 95 in all four categories on every page (table attached)
- [ ] `check-site.mjs`: 0 errors
- [ ] JSON-LD validates; every page has a unique title and description
- [ ] Every number is baked from a source or traceable to the repo; no invented claims
- [ ] Deploy workflow ready; one-time host and DNS steps written for the owner
- [ ] Nothing committed or pushed without approval

## 12. Decisions log
- <date>: <decision> (gate N)
