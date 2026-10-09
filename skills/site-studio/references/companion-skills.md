# Companion skills and tools

Propose only what this job needs. For each one, tell the person who publishes it, the source, what it does, why it's needed here, and anything it touches (accounts, uploads, network). Install only after they agree. Read a skill's files before relying on it: a skill is code and instructions you're choosing to follow.

## Vetted helpers

These were checked when this skill was written. Re-check that they still exist and are maintained before recommending them.

| Helper | Publisher / source | Use it for | Notes |
|---|---|---|---|
| **frontend-design** | Anthropic: `anthropics/skills` (`skills/frontend-design`), also in the official Claude Code plugin marketplace as `frontend-design@claude-plugins-official` | Distinctive, non-templated visual direction while building UI | In Claude Code the person runs `/plugin install frontend-design@claude-plugins-official`; other tools can install with `npx skills add anthropics/skills` (the skill picker) |
| **webapp-testing** | Anthropic: `anthropics/skills` (`skills/webapp-testing`) | Driving a local site with Playwright: screenshots, console logs, interaction checks | Useful when there's no built-in browser tool |
| **web-design-guidelines** | Vercel: `vercel-labs/agent-skills` (`skills/web-design-guidelines`) | Reviewing the built UI against Vercel's web interface guidelines (accessibility, forms, focus, motion and more) | A review pass after the build, not a design generator |
| **react-view-transitions** | Vercel: `vercel-labs/agent-skills` | Only if the site is built with React | For a static site, use the native View Transitions API instead |
| **Superdesign** | superdesign.dev (`superdesigndev/superdesign-skill`, CLI `@superdesign/cli`) | Exploring design variations on a canvas | A cloud service: it needs a login and uploads repo UI context. Ask first. In Claude Code the person runs `/plugin marketplace add superdesigndev/superdesign-skill` and then `/plugin install superdesign@superdesign`. |
| **Lighthouse CLI** | Google: `npx lighthouse` | Performance, accessibility, best-practices and SEO scores | Needs Chrome or Chromium installed |
| **Schema validators** | validator.schema.org; Google Rich Results Test | Checking JSON-LD | Web tools; paste a URL or the code |
| **Figma or Mobbin connectors** | If the environment has them connected | Pulling an existing design or UI references | Use them only if the person already uses them |

The `npx skills` CLI (`vercel-labs/skills`) installs skills into many coding agents. Use the slug for the agent you're running in.

## SEO skills

When this skill was written, the publicly listed "SEO skills" for coding agents were small, recent and unproven. That's why this skill includes its own SEO reference (`seo.md`) and a checker script (`scripts/check-site.mjs`), plus Lighthouse. If someone suggests an SEO skill, vet it (below) before adopting it.

## Vetting an unknown skill or plugin

1. **Publisher:** is it a known organization or a maintained personal project? How old is it, how many stars, and is it still being updated?
2. **Contents:** read `SKILL.md` and every script. Watch for network calls, credential access, telemetry, `curl | sh`, and instructions to skip asking the user.
3. **Scope:** does it fit this job, or does it bring a whole competing workflow?
4. **Data:** does it send code or content to a third-party service? If so, it needs the person's explicit OK.
5. Prefer a short checklist you can follow yourself over a heavy dependency.
