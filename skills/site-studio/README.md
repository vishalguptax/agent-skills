# Site Studio

**Category:** Web & Design · **Version:** 0.1.0 · **Works with:** Claude Code, Codex, Cursor, Copilot, Gemini CLI, Windsurf, opencode and other agents that support skills

Site Studio helps your coding agent design and build websites that look like nobody else's, load fast, and get found.

## What it's for

Ask an agent for "a landing page" and you usually get the same page as everyone else: a gradient, a centered hero, three feature cards and an invented testimonial. Site Studio gives the agent a real process instead, so the site is true to your product, distinctive, fast and ready for search.

| Site type | Examples |
|---|---|
| Product | SaaS and web apps, developer tools and open-source projects, mobile apps, single-product stores |
| People | Modern portfolios with motion, résumé/CV pages, creators and course pages |
| Businesses | Agencies and studios, local businesses (restaurants, bakeries, clinics, shops), nonprofits |
| Moments | Launches, waitlists and coming-soon pages, events and conferences |
| Content | Docs sites, blogs |

## When to use it

Just ask. It triggers on requests like these:
- "Build a landing page for this repo and host it on GitHub Pages at docs.example.com"
- "Make me a modern portfolio with nice animations. Here's my CV and LinkedIn PDF."
- "Our bakery needs a simple site with hours, our menu and cake orders. Help us get found on Google."
- "Redesign our SaaS homepage, it looks too generic: https://…"
- "A coming-soon page with a waitlist for my app"

In Claude Code you can also type `/site-studio`.

## How it works

It works in phases and stops for your approval at each gate. It never installs anything, uploads your work to a third-party service, commits or pushes without asking.

1. **Intake.** It works from whatever you give it: a repo, URLs, a CV, a LinkedIn PDF, a deck, screenshots. If you give it nothing, it asks four short questions. Every fact gets a source, and nothing is invented. Numbers that only you can vouch for are marked "self-reported" until you confirm them.
2. **Inspiration.** It studies prompt libraries (designprompts.dev, superdesign.dev, motionsites.ai) and galleries (Godly, Awwwards, One Page Love, SaaSFrame, Mobbin and more) for your category, plus your competitors' sites.
3. **Direction (gate 1).** It sends one message containing:
   - three distinct directions, each with a working hero mockup (light and dark, its signature motion, and a reduced-motion state), one of them always minimal;
   - a recommendation;
   - a draft page list;
   - an SEO and hosting outline;
   - the helpers it proposes;
   - its remaining questions.
4. **Plan, then design proof.** The plan covers pages, content sources, design tokens, a motion spec, the stack and a done-when list. Then the hero and one section are built and checked in a browser before the rest of the site.
5. **Build.** Static, accessible pages with motion only where it means something. Live numbers (stars, downloads, version) are baked into the HTML at build time.
6. **SEO and AI search.**
   - Every page gets a unique title, description and canonical URL, Open Graph images, and JSON-LD for its site type.
   - The site gets a sitemap, a `robots.txt` with a deliberate policy for AI crawlers, and `llms.txt`.
   - It also covers local search (Google Business Profile, keeping name, address and phone identical everywhere) and sites in more than one language.
7. **Verify.** A bundled checker audits the built site. The site is checked in a real browser at phone and desktop widths, in light and dark, with reduced motion. Lighthouse runs on mobile, with a target of 95+ in every category.
8. **Ship (last gate).** It sets up a GitHub Pages workflow with a custom domain, or Netlify or Cloudflare Pages for non-technical owners, and gives you the exact DNS steps.

## What's inside

```
site-studio/
├── SKILL.md                      the workflow and its gates
├── README.md                     this page
├── references/
│   ├── site-types.md             14 site types: goals, sections, motion, JSON-LD, pitfalls
│   ├── portfolio.md              portfolios in depth
│   ├── inspiration-sources.md    prompt libraries, galleries, type; how to mine them
│   ├── design-direction.md       finding the concept; the anti-generic checklist
│   ├── companion-skills.md       vetted helper skills and how to vet others
│   ├── build-and-motion.md       stack, performance budget, motion toolkit and specs
│   ├── seo.md                    head tags, JSON-LD, local and multilingual SEO, crawl files, OG
│   ├── verification.md           browser matrix, Lighthouse, accessibility, report
│   └── hosting.md                GitHub Pages + custom domain; alternatives
├── assets/                       brief template, pages.yml, robots.txt, llms.txt
└── scripts/check-site.mjs        static SEO and quality audit (Node 18+, no dependencies)
```

Run the checker on any built site:
```
node skills/site-studio/scripts/check-site.mjs site --base https://example.com
```

## Helpers it may suggest

- Anthropic's `frontend-design` and `webapp-testing` skills.
- Vercel's `web-design-guidelines`.
- Lighthouse CLI and schema validators.
- Superdesign, optional. It needs a login and uploads context, so only with your OK.

Each one is proposed with its source and what it touches, and installed only if you approve.

## Tested

The skill was tested against the same prompts run without it, for a developer-tool landing page, a portfolio built from a CV, a request with no context, and a local bakery. In round 1 it passed 86.9% of the checks against 69.0% without the skill. After fixes, round 2 scored 100% against 50%. The test prompts and fixtures are in [`evals/site-studio/`](../../evals/site-studio/).

## Credits

Built on ideas and tools from [Anthropic's skills](https://github.com/anthropics/skills) (`frontend-design`, `webapp-testing`, `skill-creator`), [Vercel's agent skills](https://github.com/vercel-labs/agent-skills) and [skills CLI](https://github.com/vercel-labs/skills), and the design communities behind designprompts.dev, superdesign.dev, motionsites.ai and the galleries it references. Site Studio links to these sources and doesn't copy their prompts or assets.
