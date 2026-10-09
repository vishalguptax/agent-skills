# Inspiration sources

Use a few sources that fit the product. The goal is to understand *why* something works and then make something specific to this product. Never paste someone else's prompt or design into the project, and don't reuse their assets (images, videos, 3D files, fonts) unless the license allows it.

## Contents
- [Prompt libraries](#prompt-libraries): ready-made design-system and motion prompts
- [Curated galleries](#curated-galleries): real sites to study
- [Product UI](#product-ui): app and SaaS screens
- [Motion](#motion)
- [Type and color](#type-and-color)
- [How to browse JavaScript-heavy sites](#how-to-browse-javascript-heavy-sites)
- [What to write down](#what-to-write-down)

## Prompt libraries

| Source | What it offers | How to use it |
|---|---|---|
| **designprompts.dev** | About 30 complete design-system prompts (Newsprint, Swiss Minimalist, Bauhaus, Terminal, Kinetic, Monochrome, Neo Brutalism, Academia, Industrial, Art Deco, Botanical, Luxury, Retro and more), each with a live demo page at `designprompts.dev/<style>`, filterable by light/dark and sans/serif/mono | Open a style's page and press **Prompt** to read its system, a long XML prompt with a role, design philosophy, tokens and component rules. Borrow its *structural rules* (grid, radius, hierarchy, density) and combine two or three, rather than shipping one style as is. |
| **superdesign.dev** | A prompt library (Style, Animation, UI Component, Landing Page and Presentations), for example "Animated Landing Page: One Product That Travels the Whole Page", "Ascii hero", "Kinetic Orange Style", "High Contrast Landing Page", plus an AI design canvas | The library is good for animation *ideas*. The canvas is a cloud service: it installs as an agent plugin with a CLI, needs a login, and uploads the repo's UI context. Use it only with the person's consent. It's for exploring variations, never as the source of final code. |
| **motionsites.ai** | Premium prompts for 3D and animated landing pages (some free, some need an account or "Unlimited"), plus animated background videos | The prompts are precise build recipes: exact fonts, hosted asset URLs, a layer stack, tokens per breakpoint and exact entrance motion. Their look is often liquid glass, 3D or video, which is heavy and reads as generic "AI" for most dev or B2B products. Borrow the *prompt structure* (layer stack, choreography, breakpoints), not the look or their hosted assets. |

### designprompts.dev styles at a glance (for when the pages won't load)
- **Light:** Monochrome (stark black/white, oversized serif), Bauhaus, Newsprint (broadsheet grid, dramatic serif, zero radius, visible rules), SaaS, Luxury, Swiss Minimalist (strict grid, one signal color, bold grotesk), Flat, Material, Neo Brutalism (thick borders, hard shadows, loud color), Academia, Playful Geometric, Claymorphism, Professional, Botanical, Enterprise, Sketch, Industrial (hardware-panel skeuomorphism), Neumorphism, Organic, Maximalism, Retro.
- **Dark:** Modern Dark, Terminal (green-on-black CLI, mono, typed cursor), Kinetic (huge uppercase grotesk, acid accent, type in motion), Art Deco, Bold Typography, Cyberpunk, Web3, Minimal Dark, Vaporwave.

## Curated galleries

| Source | Good for |
|---|---|
| **godly.website** | Ambitious, current web design with a lot of motion; good for signature moments |
| **awwwards.com** | Award-winning sites; filter by category; "Sites of the Day" shows current trends |
| **onepagelove.com** | One-page sites and landing pages, by category |
| **saasframe.io** | SaaS landing and product pages broken down by section (hero, pricing, FAQ) |
| **minimal.gallery** | Restrained, typographic, minimal sites |
| **dark.design** | Dark-mode sites |
| **hoverstat.es** | Interaction and hover details |
| **cssdesignawards.com** | Another awards gallery with categories |
| **cosmos.so** | A visual moodboard platform; search a mood and collect references |
| **land-book.com**, **lapa.ninja**, **siteinspire.com** | Large landing-page galleries. They often block scripted requests, so open them in a real browser. |

## Product UI

- **mobbin.com** has real app and web UI flows; it needs an account. If a Mobbin connector or MCP is available, use it to search for screens such as "onboarding" or "pricing".
- **refero.design** is a searchable reference library of product UI.
- If the product has an app, use its own screenshots and recordings. Real UI beats illustrations.

## Motion

- **gsap.com/showcase** has scroll-driven and timeline work and shows what's possible. Most of it can be done natively today (see `build-and-motion.md`).
- Award sites from the galleries above, filtered by "animation" or "interaction".
- For native CSS techniques, MDN's guides to scroll-driven animations and View Transitions, and the Chrome for Developers articles on both.

## Type and color

- **typewolf.com** and **fontsinuse.com** show type pairings in real use.
- **fontshare.com** (free, high-quality fonts) and **fonts.google.com** (download and self-host; don't hotlink in production if performance matters).
- Check the license on every font you ship.

## How to browse JavaScript-heavy sites

Prompt libraries and galleries usually render with JavaScript, so a plain HTTP fetch returns an empty shell.
- Use a browser automation tool if you have one (Chrome tools, Playwright). Navigate, wait, then read the page text, take a screenshot and click into entries.
- Prompt text often appears in a modal or is copied to the clipboard. Read it from the modal element. If it's clipboard-only, you can wrap `navigator.clipboard.writeText` in the page to capture the copied text for reading.
- Without a browser, ask the person to paste the prompt or a screenshot.
- Respect login walls and paywalls: don't try to bypass them. Ask the person if a premium prompt matters.

## What to write down

For each reference you keep, add a line to the brief:

```md
- <source> — <entry> (<url>): what to borrow (structure / type / motion idea), what to avoid, and why.
```

Then add a short "Rejected" list with a reason for each. It keeps the build from drifting back toward them.
