# Site Studio

**A skill that helps your coding agent design and build websites that look like nobody else's, load fast, and get found.** It covers landing pages, product and SaaS sites, developer-tool and open-source pages, portfolios, agencies, app pages, launches and waitlists, events, local businesses, single-product stores, courses, docs and more.

Ask your agent for "a landing page for this repo" and you usually get the same page as everyone else: a gradient, a centered hero, three feature cards and an invented testimonial. Site Studio gives the agent a real process instead:

1. **Starts from your facts.** It reads your repo, URLs, CV, LinkedIn PDF, deck or screenshots, and if you give it nothing, it asks a few short questions. Every claim on the site comes with a source; nothing is invented.
2. **Researches design properly.** It studies prompt libraries (designprompts.dev, superdesign.dev, motionsites.ai) and galleries (Godly, Awwwards, One Page Love, SaaSFrame, Mobbin and others), then proposes **three distinct directions** built on one concept drawn from what your product does. One of the three is always minimal.
3. **Uses motion that means something.** It favours native scroll-driven animations, SVG, the Web Animations API and View Transitions, adds a library only when one is needed, and always includes a complete reduced-motion version.
4. **Handles SEO and AI search fully.** Each page gets a unique title, description and canonical URL, Open Graph images, JSON-LD for the site type, a sitemap, a deliberate `robots.txt` policy for AI crawlers, and `llms.txt`.
5. **Proves it works.** A bundled checker audits the built site, and the agent checks it in a real browser (phone and desktop, light and dark, reduced motion) and runs Lighthouse with a target of 95+.
6. **Ships it.** It sets up a GitHub Pages workflow with a custom domain, or another host, and gives you the exact DNS steps.

It stops for your approval at each gate: direction, helper installs, plan, design proof, and ship. It never installs anything, uploads your work to a third-party service, commits or pushes without asking.

## Install

**Claude Code:**
```
/plugin marketplace add vishalguptax/site-studio-skill
/plugin install site-studio@site-studio
```

**Any other agent** (Codex, Cursor, Copilot, Gemini CLI, Windsurf, opencode and many more), using the [skills CLI](https://github.com/vercel-labs/skills):
```
npx skills add vishalguptax/site-studio-skill
```

**By hand:** copy `skills/site-studio/` into your agent's skills folder (for example `~/.claude/skills/site-studio/` or `.agents/skills/site-studio/`).

## Use

Just ask for what you want. The skill triggers on requests like:
- "Build a landing page for this repo and host it on GitHub Pages at docs.example.com"
- "Make me a modern portfolio with nice animations. Here's my CV and LinkedIn PDF."
- "Our bakery needs a simple site with hours, menu and online booking"
- "Redesign our SaaS homepage, it looks too generic. Here's the current URL."
- "Coming-soon page with a waitlist for my app"

In Claude Code you can also run `/site-studio`.

## What's inside

```
skills/site-studio/
├── SKILL.md                      the workflow and its gates
├── references/
│   ├── site-types.md             14 site types: goals, sections, motion, JSON-LD
│   ├── portfolio.md              portfolios in depth
│   ├── inspiration-sources.md    prompt libraries, galleries, type; how to mine them
│   ├── design-direction.md       finding the concept; anti-generic checklist
│   ├── companion-skills.md       vetted helper skills (frontend-design, webapp-testing…)
│   ├── build-and-motion.md       stack, performance budget, motion toolkit and specs
│   ├── seo.md                    head tags, JSON-LD, crawl files, AI search, OG images
│   ├── verification.md           browser matrix, Lighthouse, accessibility, report
│   └── hosting.md                GitHub Pages + custom domain; alternatives
├── assets/                       brief template, pages.yml, robots.txt, llms.txt
└── scripts/check-site.mjs        static SEO/quality audit (Node 18+, no dependencies)
```

Run the checker on any built site:
```
node skills/site-studio/scripts/check-site.mjs site --base https://example.com
```

## Credits

Built on ideas and tools from [Anthropic's skills](https://github.com/anthropics/skills) (`frontend-design`, `webapp-testing`, `skill-creator`), [Vercel's agent skills](https://github.com/vercel-labs/agent-skills) and [skills CLI](https://github.com/vercel-labs/skills), and the design communities behind designprompts.dev, superdesign.dev, motionsites.ai and the galleries it references. Site Studio links to these sources and doesn't copy their prompts or assets.

## License

[MIT](LICENSE)
