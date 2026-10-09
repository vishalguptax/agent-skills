# Hosting

Choose the host for the person who will maintain the site:
- **There's a code repo, or a developer maintains it:** GitHub Pages deployed by a GitHub Actions workflow, with a custom domain. It's free for public repos, the site lives next to the code, and each deploy is a reviewed commit.
- **A non-technical owner** (a shop, a clinic, a freelancer without a repo): Netlify or Cloudflare Pages, which offer drag-and-drop deploys, easy custom domains, and forms or redirects if needed. Write the update steps in plain words.

The GitHub Pages setup comes first below; the alternatives come at the end.

## GitHub Pages (Actions deploy)

1. **Put the site in a folder** (usually `site/`) and add `site/.nojekyll`, so files are served as-is.
2. **Add the workflow:** copy `assets/pages.yml` to `.github/workflows/pages.yml` and adjust:
   - `paths:` to the site folder and build script;
   - the build step (remove it if the site is plain files);
   - the `schedule:` if live numbers need refreshing.
3. **Custom domain:** put the bare domain in `site/CNAME` (for example `docs.example.com`, with no protocol). It has to be in the *deployed artifact*, so put it in the site folder.
4. **Check other workflows:** if the repo publishes packages from `main`, make sure a site-only push can't trigger a release, and that `site/` isn't in the package's published files.

### One-time setup (the person does this; give exact values)

**In the repo:** Settings → Pages:
1. Set **Source** to **GitHub Actions**.
2. Set **Custom domain** to the same value as `site/CNAME`, then save.
3. Tick **Enforce HTTPS** once GitHub has issued the certificate. That can take minutes up to about a day after DNS resolves.

**At the DNS provider:**
- **Subdomain** (`docs.example.com`): add a `CNAME` record with host `docs` and value `<github-username-or-org>.github.io`.
- **Apex domain** (`example.com`):
  - `A` records pointing to GitHub Pages' IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
  - Optionally `AAAA` records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
  - Optionally a `www` CNAME to `<user>.github.io`.

  Check these against GitHub's current docs ("Managing a custom domain for your GitHub Pages site") before handing them over.
- **Recommended:** verify the domain for the account or organization (Settings → Pages → Verified domains). That stops anyone else from claiming a dangling subdomain.

**Afterwards:**
- Optionally set the repo homepage: `gh repo edit <owner>/<repo> --homepage https://<domain>`.
- Check the deploy with `gh run list --workflow pages.yml`, then load the domain and confirm the certificate.

### Pitfalls

- **Sub-path URLs:** without a custom domain, a project site lives at `https://<user>.github.io/<repo>/`. Then absolute paths like `/assets/…` break. Use the custom domain, or relative paths, or a base-path setting.
- **No server:** GitHub Pages has no server-side redirects or custom headers. Use `404.html` for unknown paths, and `<meta http-equiv="refresh">` pages for moved URLs.
- **Private repos:** Pages from a private repo needs a paid plan, and the site is public anyway.

## Alternatives

| Host | Choose it when | Notes |
|---|---|---|
| **Cloudflare Pages** | You want headers, redirects (`_headers` and `_redirects` files), preview deploys and a fast global CDN | Connect the repo, or deploy with `wrangler pages deploy site` |
| **Netlify** | The same reasons: headers, redirects, forms, previews | `netlify.toml`; easy custom domains |
| **Vercel** | The site is a Next.js or framework app, or you want previews per PR | Static output works fine too |

Whichever host you choose, set the canonical URLs, the sitemap and the robots `Sitemap:` line to the final domain *before* launch, and redirect any other host names (`www`, the platform's own subdomain) to that one canonical domain.
