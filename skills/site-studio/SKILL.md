---
name: site-studio
description: Design and build a distinctive, fast, SEO-ready website for a project, person, business or idea — landing page, SaaS or product site, dev-tool/open-source page, modern portfolio with motion, agency, app, launch/waitlist, event, local business, store, course or docs. Works from evidence (repo, URLs, CV, LinkedIn PDF, decks; asks when there is no context), researches design prompt libraries and galleries (designprompts.dev, superdesign.dev, motionsites.ai, Godly, Awwwards, Mobbin), proposes distinct directions with meaningful motion, plans with approval gates, builds accessible static pages, adds full SEO and AI-search files (JSON-LD, sitemap, robots, llms.txt, OG images), verifies in a browser and with Lighthouse, and sets up hosting such as GitHub Pages with a custom domain. Use it whenever someone wants a website, homepage, landing or launch page, portfolio, or "a page for my project/app/business", wants a site to look less generic or less AI-made, or wants SEO for a site they are building.
---

# Site Studio

Build a website that is true to the product, looks like nothing else, loads fast, ranks, and is easy to host. The work moves through gates where the person decides; between gates, you do the research and the building.

The failure modes this skill exists to prevent:
- **Generic "AI landing page" output**: purple-blue gradients, glass cards, a centered hero with two buttons, three feature cards, invented testimonials. It's forgettable, and for many products it contradicts the brand.
- **Made-up facts**: user counts, logos, benchmarks or features that aren't real. One false number costs more trust than the page earns.
- **Motion as decoration**: heavy effects that hurt performance and accessibility and say nothing about the product.
- **SEO bolted on at the end**, or missing entirely.

## How to work

- **Evidence over assumption.** Every claim on the site comes from the project (README, docs, manifests, changelog, code, a live URL) or from the person. Keep a fact sheet with a source for each fact, and if something isn't there, ask or leave it out.
- **Ask only what you can't find out.** Read first, then ask a few focused questions. People hate being asked what their own README already says.
- **Gates are real stops.** At each gate, present the work and wait. Don't install anything, create accounts, upload a project to a third-party service, commit or push without an explicit yes. These are hard to undo, or they send someone's work elsewhere.
- **Inspiration is input, not output.** Study prompt libraries and galleries to learn structure, technique and taste, then make something specific to this product. Don't paste someone else's prompt or design verbatim into the project, both for copyright and because the result would look like everyone else's.
- **Fit the tool you're running in.** Use plan mode, subagents, browser automation and image tools where your environment has them, and say so plainly when it doesn't.

## The workflow

Scale the depth to the job. A one-page launch page for a weekend project can move through all of this in an hour; a multi-page product site deserves the full process. When someone asks for something "simple" (a one-page site for a small business or a quick launch page), keep the gates but make them light: short directions, a one-screen gate message, and fewer helpers.

### Phase 1: Intake and product truth (no edits)

1. **Collect the source material.** People start in very different places, so work from whatever they give you:
   - **A repo or folder:** read it (see step 2).
   - **A URL:** their current site, a product page, an app store listing, a GitHub profile. Fetch it, using a browser tool for JavaScript-heavy pages.
   - **A LinkedIn profile:** LinkedIn usually blocks automated reading. Ask them to attach the profile PDF (on their profile: *More → Save to PDF*) or paste the sections. Don't try to get around a login wall.
   - **Attached documents:** CV or résumé (PDF/DOCX), pitch deck, one-pager, brand guide, case-study write-ups, press kit, menu or price list, event schedule, notes. Read every one, using a PDF or DOCX reader skill or tool if you have one.
   - **Images:** screenshots, logos, product photos, a moodboard. Look at them; they show the brand and what visuals already exist.
   - **Several sources at once:** merge them into the one fact sheet. Where they disagree (an old CV and a newer LinkedIn, say), prefer the newest and flag the difference.

   **If they give little or no context** (for example "build me a landing page" or "make a portfolio"), don't guess and don't start designing. Ask a short intake in one message, and invite attachments:
   > To make this specific to you (not a template), I need a few things:
   > 1. What is it for: you, a product, a business or an event? One line on what it is.
   > 2. Who should it convince, and what should they do (hire you, sign up, install, book, buy)?
   > 3. What can you share? Attach or link anything you have: a CV or LinkedIn PDF, an existing site, a repo, a deck, screenshots, a logo, brand colors, or sites you like.
   > 4. Where will it live: a domain and host, if you know them?

   If they'd rather skip it, offer a clearly marked draft with placeholder content for them to replace. Never fill the site with invented facts.
2. **Find out what exists.** Is this an existing repo or product, a person's portfolio, a live site to redesign, or just an idea? Identify the site type with `references/site-types.md` (SaaS, dev tool, mobile app, portfolio, agency, launch/waitlist, event, local business, e-commerce, course, docs, nonprofit, résumé, blog); its row shapes the sections, motion and structured data. For a portfolio, also read `references/portfolio.md`. Read the README, docs, the package manifest (name, description, version, license, homepage, keywords), the changelog, screenshots, an existing brand or design-system file (`DESIGN.md`, tokens, a theme or Tailwind config, logo files), and any live site.
3. **Write the fact sheet** in `site-brief.md` at the project root, from `assets/brief-template.md` (it has product and person variants): what it is in one sentence, who it's for, the problem it solves, the key features or work with proof, how to get started, price or license, and links. Put a source next to every line, record the site type, and list facts that aren't available (for example "no star count, no testimonials") so nobody fills them in later. A number whose only source is the person (a CV metric, a revenue figure) gets marked "self-reported" and confirmed with them before it goes on the site; mockups may show it with a visible "unconfirmed" note. Sanity-check contact details too: a phone number, email or link that looks like a placeholder (`000 000`, `example.com`) gets flagged, not published.
4. **List the remaining gaps**: the site's goal, audience, voice, must-have pages, domain and host, deadlines, things to avoid, and sites they love or hate. Don't send them as a separate message unless one blocks the research (you can't tell what the product is). Otherwise they go into the gate 1 message, so the person answers everything in one go.

### Phase 2: Inspiration research (no edits)

Read `references/inspiration-sources.md` for the source list and how to mine each one; it also covers browsing JavaScript-heavy sites.

1. Pick sources that match the product's category and tone; you don't need all of them. Typically use one or two prompt libraries (for example designprompts.dev for whole design systems, superdesign.dev for animated-landing and style prompts, motionsites.ai for choreographed motion heroes), two or three curated galleries (Godly, Awwwards, One Page Love, SaaSFrame or Mobbin for product UI), and one type resource.
2. For each candidate, note what makes it work: structure, type, color, grid, the signature moment, and the motion technique. Note also what would be wrong for *this* product, and why.
3. Look at what the product's direct competitors' sites do, so you can differentiate rather than imitate.
4. **If the sources won't load:** many of them render with JavaScript, so a plain fetch returns an empty page. If you have no browser tool, use web search for write-ups and screenshots of the entries, your own knowledge of the named styles, and the person's own examples. Say plainly in the gate 1 message that the research was limited and why. Don't present guesses about a page you couldn't see as if you'd studied it.

### Phase 3: Direction, the first gate

Read `references/design-direction.md`.

1. **Find the concept.** Find the one idea that makes this site belong to this product: a metaphor drawn from what the product *does*. Some examples:
   - A code-review tool → a spec sheet marked up in red pen.
   - A weather API → a forecast broadsheet.
   - A database → a card catalog.

   When the design itself demonstrates the product, it becomes the message, and it's unlikely to look like anyone else's.
2. **Respect what exists.** If the product already has a brand or a `DESIGN.md`, extend it; a site that clashes with its own product feels like a different company. With a strong existing brand, make the three directions differ in *concept, structure and motion level* rather than in colors and fonts. The product's own rules (say, "no web fonts") win over this skill's general advice; raise any conflict as a question.
3. **Present three directions**, one of them deliberately minimal. For each, give:
   - the concept
   - type pairing
   - palette (light and dark)
   - layout system
   - the signature motion moment
   - the references it draws on
   - why it suits this product
   - its risks

   Make each one concrete with a hero mockup: `mockups/direction-<n>-<name>.html`, the hero (plus the first content block if the concept needs it, such as a work index), self-contained, with a light/dark toggle, its signature motion working, and its reduced-motion state. Content must be visible without JavaScript; scripts only add the motion. If the product has no logo, a direction may propose a simple mark or wordmark as a clearly labelled draft. CDN fonts are fine in these throwaway mockups but not in the real build. If you can't render HTML, write a precise description instead. Show the rejected options too, with one line each on why they were rejected.
4. **Send the gate 1 message and stop.** Read `references/seo.md` and `references/hosting.md` first, because the message outlines both. Send one message, so the person sees the whole picture before choosing. Lead with your recommendation, keep each direction to a short block, and link the mockups rather than describing every detail:
   - the three directions, each with a link to its mockup, plus your recommendation and why;
   - a **draft page list**: each page, its purpose and its main search intent;
   - a short **SEO and hosting outline**: structured-data types for this site type, the crawl files (sitemap, robots and its AI-crawler policy, llms.txt, OG images), and the host and domain;
   - the helpers you propose (Phase 4), each with its source and what it touches;
   - the remaining questions from Phase 1, numbered so they're easy to answer.

   Record the decisions in the brief when they reply.

### Phase 4: Helpers and tools, the second gate (often combined with gate 1)

Read `references/companion-skills.md`. Propose only what this job needs. For each one, give who publishes it, the source URL, what it does, why it's needed here, and what it touches (an account, uploads, network). Prefer official, well-maintained sources; checking the source is enough to propose one, and you read its files before using it. Install only after a yes; some installs (like `/plugin` commands) are typed by the person, not by you.

### Phase 5: Plan, the third gate

Complete the brief (`assets/brief-template.md`):
- **Information architecture:** each page with its own search intent.
- **Content outline:** the real copy sources for each section.
- **Design tokens:** extend an existing system or create a new one, and document it as the site's own `DESIGN.md`.
- **Motion spec:** per animated moment, the layer stack, trigger, choreography (what moves, how far, in what order, how long, with what easing), the reduced-motion version and the performance budget.
- **Build stack:** see `references/build-and-motion.md`. Default to static HTML/CSS/JS, and justify any framework.
- **SEO plan:** see `references/seo.md`.
- **Hosting:** see `references/hosting.md`.
- **Done-when list:** binary checks only.

Present it and stop for approval.

### Phase 6: Design proof, the fourth gate

Build the hero and one representative section, in both themes, with the signature motion working and its reduced-motion version. Check it in a browser at phone and desktop widths and show screenshots. Getting the look right on one screen is cheap; rebuilding ten pages because the look was wrong is not. Stop for approval.

### Phase 7: Build

- **Content:** pages follow the approved information architecture, and copy is drawn from the fact sheet: specific, plain and human, with no hype words. Every number is either baked in at build time from a real source or traceable to the repo.
- **Accessibility:** semantic HTML, one `h1` per page, logical headings and descriptive links. Text is real text, not images of text.
- **Motion and performance:** motion and performance rules are in `references/build-and-motion.md`. Animate only transform, opacity, clip-path and SVG strokes. No scroll-jacking, and give `prefers-reduced-motion` a complete static design.
- **Live numbers:** stars, downloads and version are baked into the HTML by a small build script, not fetched in the browser. That keeps them in the markup for SEO with no layout shift, and the script keeps the last value if a fetch fails.
- **Social images:** generate 1200×630 Open Graph images in the site's style, from HTML or SVG, so they stay in sync.

### Phase 8: SEO and AI search

Follow `references/seo.md`: a unique title and description per page, canonical URLs, Open Graph and Twitter tags, JSON-LD that matches the product type, `sitemap.xml`, `robots.txt` (with deliberate AI-crawler rules), `llms.txt`, icons, the web manifest and a 404 page. Then run the bundled checker:

```bash
node <skill-dir>/scripts/check-site.mjs <site-dir> --base https://your-domain.example
```

It reports missing or duplicate titles and descriptions, length problems, missing canonicals and Open Graph tags, invalid JSON-LD, pages missing from the sitemap, `h1` problems, images without alt or dimensions, and broken internal links. Fix every error before verifying.

### Phase 9: Verify

Follow `references/verification.md`:
- Check every page in a real browser at about 375px and 1440px, in light and dark, with reduced motion on.
- Confirm there's no horizontal scroll.
- Make sure the keyboard alone can reach everything.
- Run Lighthouse in mobile mode on every page; the target is 95+ in all four categories.
- Validate the structured data.
- Report the evidence (scores and screenshots). Say plainly what you couldn't check.

### Phase 10: Ship, the last gate

Show the person what's ready, then, with their yes, commit and push. Give the exact one-time steps only they can do: the host's settings, the DNS records for the custom domain, enforcing HTTPS, and setting the repo homepage. Hand over a short maintenance note: how to edit content, how the live numbers refresh, and how to re-run the checker.

## Bundled files

| File | Read it when |
|---|---|
| `assets/brief-template.md` | Starting Phase 1; the brief is the single source of truth through the build |
| `references/inspiration-sources.md` | Phase 2: which sources, what each is good for, how to extract prompts and techniques |
| `references/design-direction.md` | Phase 3: finding the concept, the anti-generic checklist, type and color, writing three directions |
| `references/companion-skills.md` | Phase 4: vetted helper skills and tools, and how to vet unknown ones |
| `references/build-and-motion.md` | Phases 5–7: stack choice, the motion toolkit, choreography specs, performance budgets |
| `references/seo.md` | Before the gate 1 message, and in Phases 5 and 8: per-page tags, JSON-LD by site type, local SEO, multilingual, crawl files, OG images |
| `references/verification.md` | Phase 9: the browser matrix, Lighthouse, accessibility and reporting |
| `references/hosting.md` | Before the gate 1 message, and in Phases 5 and 10: choosing a host for the owner, GitHub Pages plus a custom domain, alternatives |
| `references/site-types.md` | Phase 1 and onward: per type, the goal, must-have sections, fitting motion, JSON-LD, and pitfalls |
| `references/portfolio.md` | When the site is a personal portfolio: intake, case studies, motion patterns, Person/ProfilePage SEO |
| `assets/pages.yml` | A GitHub Pages deploy workflow to adapt |
| `assets/robots.txt`, `assets/llms.txt` | Starting points for the crawl files |
| `scripts/check-site.mjs` | Phase 8 and on every rebuild: a static SEO and quality audit (Node 18+, no dependencies) |
