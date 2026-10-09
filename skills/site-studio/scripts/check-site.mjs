#!/usr/bin/env node
// Static SEO and quality audit for a built site folder. Node 18+, no dependencies.
//
//   node check-site.mjs <site-dir> [--base https://example.com] [--json]
//
// Errors (exit 1): things that break indexing, sharing or navigation.
// Warnings: things worth fixing that don't block a launch.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const siteDir = args.find((a) => !a.startsWith("--"));
const base = valueOf("--base")?.replace(/\/+$/, "");
const asJson = args.includes("--json");

if (!siteDir || !existsSync(siteDir) || !statSync(siteDir).isDirectory()) {
  console.error("Usage: node check-site.mjs <site-dir> [--base https://example.com] [--json]");
  process.exit(2);
}

function valueOf(flag) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
}

const root = path.resolve(siteDir);
const findings = []; // { level, file, message }
const error = (file, message) => findings.push({ level: "error", file, message });
const warn = (file, message) => findings.push({ level: "warning", file, message });

// ---------- helpers ----------

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".") || entry.name === "node_modules") return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

/** The URL path a file is served at: index.html → its folder with a trailing slash. */
function urlPathOf(file) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
}

function parseAttrs(tag) {
  const attrs = {};
  const body = tag.replace(/^<\s*[\w-]+/, "").replace(/\/?>$/, "");
  for (const m of body.matchAll(/([a-zA-Z_:@][-\w:.@]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
    attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
  }
  return attrs;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => parseAttrs(m[0]));
}

function decode(text) {
  return text
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

const stripTags = (s) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

/** Resolves an internal reference to a file in the site, or null if it isn't internal. */
function resolveInternal(ref, fromFile) {
  if (!ref || /^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(ref) || ref.startsWith("//")) {
    if (base && ref?.startsWith(base)) ref = ref.slice(base.length) || "/";
    else return null;
  }
  const clean = ref.split("#")[0].split("?")[0];
  if (!clean) return null;
  const abs = clean.startsWith("/") ? path.join(root, clean) : path.join(path.dirname(fromFile), clean);
  const candidates = [abs, path.join(abs, "index.html"), `${abs}.html`];
  return { ref, found: candidates.some((c) => existsSync(c) && statSync(c).isFile()) };
}

// ---------- pages ----------

const files = walk(root);
const pages = files.filter((f) => f.endsWith(".html"));
if (pages.length === 0) error(".", "No .html files found.");

const titles = new Map();
const descriptions = new Map();
const indexable = [];

for (const file of pages) {
  const rel = path.relative(root, file);
  const raw = readFileSync(file, "utf8");
  const html = raw.replace(/<!--[\s\S]*?-->/g, "");
  const head = (html.match(/<head\b[\s\S]*?<\/head>/i) ?? [""])[0];
  const body = html.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "");
  const metas = tags(head, "meta");
  const links = tags(head, "link");
  const meta = (key, value) => metas.find((m) => (m[key] ?? "").toLowerCase() === value)?.content;
  const is404 = /(^|\/)404\.html$/.test(rel);
  const robots = (meta("name", "robots") ?? "").toLowerCase();
  const noindex = robots.includes("noindex");

  if (!/<html\b[^>]*\blang\s*=/i.test(html)) error(rel, "<html> has no lang attribute.");
  if (!meta("name", "viewport")) error(rel, "No <meta name=\"viewport\">.");
  if (!/<meta\b[^>]*charset/i.test(head)) warn(rel, "No <meta charset>.");

  const title = stripTags((head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) ?? [, ""])[1]);
  if (!title) error(rel, "Missing <title>.");
  else {
    if (title.length > 60) warn(rel, `Title is ${title.length} characters (aim for ≤ 60): "${title}"`);
    if (!is404) titles.set(title, [...(titles.get(title) ?? []), rel]);
  }

  const description = meta("name", "description");
  if (!description && !is404) error(rel, "Missing meta description.");
  else if (description) {
    if (description.length > 160) warn(rel, `Description is ${description.length} characters (aim for ≤ 155).`);
    if (description.length < 50) warn(rel, `Description is only ${description.length} characters.`);
    if (!is404) descriptions.set(description, [...(descriptions.get(description) ?? []), rel]);
  }

  const canonical = links.find((l) => (l.rel ?? "").toLowerCase() === "canonical")?.href;
  if (!is404 && !noindex) {
    if (!canonical) error(rel, "Missing <link rel=\"canonical\">.");
    else if (!/^https?:\/\//.test(canonical)) error(rel, `Canonical must be an absolute URL: ${canonical}`);
    else if (base && canonical !== `${base}${urlPathOf(file)}`) warn(rel, `Canonical ${canonical} differs from the expected ${base}${urlPathOf(file)}.`);
    indexable.push(file);
  }
  if (is404 && !noindex) warn(rel, "The 404 page should have <meta name=\"robots\" content=\"noindex\">.");

  if (!is404) {
    for (const prop of ["og:title", "og:description", "og:image", "og:url", "og:type"]) {
      if (!meta("property", prop)) error(rel, `Missing <meta property="${prop}">.`);
    }
    const ogImage = meta("property", "og:image");
    if (ogImage && !/^https?:\/\//.test(ogImage)) error(rel, `og:image must be an absolute URL: ${ogImage}`);
    if (ogImage && !meta("property", "og:image:alt")) warn(rel, "No og:image:alt.");
    if (!meta("name", "twitter:card")) warn(rel, "No twitter:card (summary_large_image recommended).");
  }

  if (!links.some((l) => /(^|\s)icon(\s|$)/i.test(l.rel ?? ""))) warn(rel, "No favicon <link rel=\"icon\">.");

  const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1]));
  if (h1s.length === 0) error(rel, "No <h1>.");
  if (h1s.length > 1) warn(rel, `${h1s.length} <h1> elements (use one per page).`);
  const levels = [...body.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      warn(rel, `Heading level jumps from h${levels[i - 1]} to h${levels[i]}.`);
      break;
    }
  }

  for (const img of tags(body, "img")) {
    const src = img.src ?? img["data-src"] ?? "(no src)";
    if (!("alt" in img)) error(rel, `<img src="${src}"> has no alt attribute (use alt="" if decorative).`);
    if (!("width" in img) || !("height" in img)) warn(rel, `<img src="${src}"> has no width/height (risk of layout shift).`);
  }

  for (const a of tags(body, "a")) {
    if (a.href === undefined) continue;
    const r = resolveInternal(a.href, file);
    if (r && !r.found) error(rel, `Broken internal link: ${a.href}`);
  }
  for (const m of body.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = stripTags(m[1]);
    const attrs = parseAttrs(m[0].match(/<a\b[^>]*>/i)[0]);
    if (!text && !attrs["aria-label"] && !/<img\b[^>]*\balt\s*=\s*["'][^"']+/i.test(m[1])) warn(rel, `Link with no text or label: ${attrs.href ?? ""}`);
    else if (/^(click here|here|read more|learn more|more)$/i.test(text)) warn(rel, `Vague link text "${text}" (${attrs.href ?? ""}).`);
  }
  for (const tag of [...tags(html, "link"), ...tags(html, "script"), ...tags(body, "img"), ...tags(body, "source"), ...tags(body, "video")]) {
    for (const key of ["href", "src", "poster"]) {
      if (!tag[key] || (key === "href" && /^(canonical|alternate|preconnect|dns-prefetch)$/i.test(tag.rel ?? ""))) continue;
      const r = resolveInternal(tag[key], file);
      if (r && !r.found) error(rel, `Missing asset: ${tag[key]}`);
    }
  }

  const blocks = [...html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (blocks.length === 0 && !is404) warn(rel, "No JSON-LD structured data.");
  for (const [, json] of blocks) {
    try {
      const data = JSON.parse(json);
      const items = Array.isArray(data) ? data : data["@graph"] ? data["@graph"] : [data];
      const context = Array.isArray(data) ? data[0]?.["@context"] : data["@context"];
      if (!context) error(rel, "JSON-LD has no @context.");
      for (const item of items) if (!item["@type"]) error(rel, "A JSON-LD item has no @type.");
      for (const item of items) {
        if ((item["@type"] === "FAQPage") && !/<(details|dl|h[2-4])\b/i.test(body)) warn(rel, "FAQPage JSON-LD but no visible FAQ markup found.");
        if (item.aggregateRating || item.review) warn(rel, "JSON-LD includes ratings/reviews: only use these with real, visible reviews.");
      }
    } catch (e) {
      error(rel, `JSON-LD does not parse: ${e.message}`);
    }
  }
}

for (const [title, where] of titles) if (where.length > 1) error(where.join(", "), `Duplicate title "${title}".`);
for (const [desc, where] of descriptions) if (where.length > 1) error(where.join(", "), `Duplicate description "${desc.slice(0, 60)}…".`);

// ---------- crawl files ----------

const sitemapFile = path.join(root, "sitemap.xml");
if (!existsSync(sitemapFile)) error("sitemap.xml", "Missing sitemap.xml.");
else {
  const xml = readFileSync(sitemapFile, "utf8");
  if (!/<urlset\b[^>]*sitemaps\.org\/schemas\/sitemap\/0\.9/.test(xml)) error("sitemap.xml", "No <urlset> with the sitemaps.org namespace.");
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) error("sitemap.xml", "No <loc> entries.");
  for (const loc of locs) if (!/^https?:\/\//.test(loc)) error("sitemap.xml", `Relative <loc>: ${loc}`);
  if (base) {
    for (const file of indexable) {
      const expected = `${base}${urlPathOf(file)}`;
      if (!locs.includes(expected)) error("sitemap.xml", `Indexable page not listed: ${expected}`);
    }
    for (const loc of locs) {
      if (!loc.startsWith(base)) warn("sitemap.xml", `<loc> on a different host: ${loc}`);
      else if (!resolveInternal(loc.slice(base.length) || "/", path.join(root, "index.html"))?.found) error("sitemap.xml", `<loc> points to a missing page: ${loc}`);
    }
  }
}

const robotsFile = path.join(root, "robots.txt");
if (!existsSync(robotsFile)) error("robots.txt", "Missing robots.txt.");
else {
  const robots = readFileSync(robotsFile, "utf8");
  if (!/^sitemap:\s*https?:\/\//im.test(robots)) warn("robots.txt", "No absolute Sitemap: line.");
  if (/^disallow:\s*\/\s*$/im.test(robots) && /^user-agent:\s*\*\s*$/im.test(robots)) warn("robots.txt", "Contains \"Disallow: /\"; check it isn't blocking all crawlers.");
  if (base && /^sitemap:/im.test(robots) && !robots.includes(base)) warn("robots.txt", `Sitemap line doesn't use ${base}.`);
}

if (!existsSync(path.join(root, "llms.txt"))) warn("llms.txt", "No llms.txt (a concise summary for AI assistants).");
if (!existsSync(path.join(root, "404.html"))) warn("404.html", "No 404.html.");
if (!files.some((f) => /\.webmanifest$|manifest\.json$/.test(f))) warn("site.webmanifest", "No web app manifest.");

// ---------- report ----------

const errors = findings.filter((f) => f.level === "error");
const warnings = findings.filter((f) => f.level === "warning");
if (asJson) {
  console.log(JSON.stringify({ pages: pages.length, errors, warnings }, null, 2));
} else {
  const byFile = new Map();
  for (const f of findings) byFile.set(f.file, [...(byFile.get(f.file) ?? []), f]);
  for (const [file, list] of byFile) {
    console.log(`\n${file}`);
    for (const f of list) console.log(`  ${f.level === "error" ? "ERROR" : "warn "}  ${f.message}`);
  }
  console.log(`\nChecked ${pages.length} page(s): ${errors.length} error(s), ${warnings.length} warning(s).${base ? "" : " (Pass --base https://your-domain to also check canonicals and the sitemap against the domain.)"}`);
}
process.exit(errors.length > 0 ? 1 : 0);
