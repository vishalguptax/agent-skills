# Adding or changing a skill

## Add a skill

1. **Pick a name and category.**
   - The name is kebab-case and says what the skill does (`site-studio`, `release-notes`), and it doesn't clash with common built-in commands (`fix`, `review`, `init`).
   - The category is an `id` from [`categories.json`](categories.json). If none fits, add one there in the same change.
2. **Copy the template:** `cp -r template skills/<name> && mv skills/<name>/SKILL.template.md skills/<name>/SKILL.md`. The template file is named so that skill installers don't mistake it for a real skill.
3. **Write `SKILL.md`:** this is what the agent reads.
   - **`description`** (at most 1024 characters) is the trigger. It says what the skill does *and* the phrases and situations that should trigger it.
   - **`metadata`** holds:
     - `category`
     - `version` (`0.1.0` to start)
     - `summary`: one line for the catalog
     - `tags`
   - Keep the body under about 500 lines. Move detail into `references/` and say in the body when to read each file.
   - Explain *why* for each instruction rather than piling up MUSTs. Gate anything hard to undo behind the person's approval.
   - Write for every agent: say "use a browser tool if you have one", not one tool's private command.
4. **Write `README.md`:** this is what people read. Cover what it's for, example requests, how it works, what's inside, and how it was tested.
5. **Add tests:** `evals/<name>/evals.json`, with realistic prompts, the expected outcome, and pass/fail assertions (format: Anthropic's [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)). Put the input files in `evals/<name>/files/`. Use fictional people and data in fixtures, never real personal data.
6. **Run the catalog:** `node scripts/catalog.mjs` validates every skill, then regenerates `.claude-plugin/marketplace.json` and the catalog in the README.
7. **Test the skill.** Run the eval prompts with and without the skill (skill-creator automates this), and record the results in the skill's README. Keep run workspaces outside the repo.
8. Add a line to [CHANGELOG.md](CHANGELOG.md).

## Change a skill

- Bump `metadata.version`:
  - **patch** for fixes and wording;
  - **minor** for new capabilities or references;
  - **major** when it behaves differently in a way users would notice.
- Re-run its evals when the workflow changes, and update the results in its README.
- Run `node scripts/catalog.mjs`, and add a CHANGELOG line.

## Rules for every skill

- **No secrets or personal data** in skills or fixtures.
- **No surprise behavior.** A skill does what its description says. It doesn't phone home, collect telemetry, or tell the agent to skip asking the user.
- **Third-party content:** link to sources rather than copying their prompts, assets or code, unless the license allows it, and credit them in the skill's README.
- **Scripts:** prefer Node 18+ or POSIX `sh` with no dependencies, and document how to run them.

## CI

`.github/workflows/validate.yml` runs `node scripts/catalog.mjs --check` on every push and pull request. It fails if any skill is invalid or the generated files are out of date.
