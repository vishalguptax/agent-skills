# Site types

Identify the type in Phase 1, then use its row to shape the fact sheet, the information architecture, the motion and the SEO. Many sites mix two types (for example an open-source tool with docs), so combine the rows.

## Contents
- [Quick guide](#quick-guide)
- [Type notes](#type-notes)
- [Sections that most landing pages need](#sections-that-most-landing-pages-need)

## Quick guide

| Type | Visitor's goal → your goal | Must-have sections | Motion that suits it | JSON-LD |
|---|---|---|---|---|
| **SaaS / web product** | "Will this solve my problem, and what does it cost?" → sign-up or demo | Benefit-led hero with real product UI; problem → solution; key features with UI; how it works; pricing; security or trust; FAQ; CTA | The product UI animating through its core task; feature tabs that swap screens | `SoftwareApplication` (`WebApplication`), `Organization`, `FAQPage`, `BreadcrumbList` |
| **Developer tool / open-source project** | "What is it, does it fit my stack, how do I start?" → install or star | One-line what-it-is; install command (copyable); what it does with real code or output; supported platforms; how it works; docs links; license; changelog | Terminal or code demos that type or run; before/after diffs; architecture diagrams that assemble | `SoftwareApplication` (`DeveloperApplication`), `SoftwareSourceCode`, `WebSite` |
| **Mobile app** | "What's it like to use?" → install from the store | Hero with device mockup and real screens; 3–5 key moments; store badges (official assets); ratings only if real; privacy; FAQ | Screens playing in the device frame; scroll-linked screen swaps | `MobileApplication` (with `operatingSystem`, `offers`), `Organization` |
| **Personal portfolio** | "Is this person right for my role or project?" → contact or hire | Positioning line; selected work → case studies; about; proof; contact | Work → case-study View Transitions; hover previews; image reveals (see `portfolio.md`) | `ProfilePage` + `Person`, `CreativeWork` per case study |
| **Agency / studio** | "Can they do this for me, and have they before?" → enquiry | Positioning; selected client work with outcomes; services; process; team; clients (real, with permission); contact | Big case-study transitions; reel video with poster and pause; type moments | `Organization` or `ProfessionalService`, `CreativeWork` |
| **Startup launch / waitlist / coming soon** | "Is this interesting enough to sign up?" → email | Crisp promise; who it's for; 2–3 reasons; email form (labeled, accessible, with a clear privacy note); social links | One strong signature moment; minimal everything else | `Organization`, `WebSite` |
| **Event / conference / meetup** | "When, where, who's speaking, how do I get a ticket?" → register | Date, time zone, location or online upfront; speakers; schedule; venue and travel; tickets; code of conduct; sponsors (real) | Countdown (static fallback); schedule that filters; speaker reveals | `Event` (`startDate`, `location`, `offers`, `performer`), `Organization` |
| **Local business** (restaurant, clinic, studio, shop) | "Are they open, where, can I book?" → call, book or visit | Hours, address with a map link, phone (tap-to-call), booking; menu or services with prices; photos; reviews only if real | Restrained: photography-led, gentle reveals; speed matters more than effects (mobile, on the go) | `LocalBusiness` subtype (`Restaurant`, `MedicalClinic`…) with `address`, `geo`, `openingHoursSpecification`, `telephone` |
| **Single product / e-commerce** | "Is it worth the price, and when does it arrive?" → buy | Product hero (real photography or 3D only if real); key benefits; details and specs; price and availability; shipping and returns; reviews (real); FAQ | Product rotation or exploded view if assets exist; variant swaps | `Product` with `offers` (price, currency, availability), `AggregateRating` only with real visible reviews |
| **Course / creator / newsletter** | "Will I learn this, and from whom?" → enroll or subscribe | Outcome-led hero; who it's for; curriculum or sample issues; instructor; real testimonials; price; guarantee; FAQ | Curriculum that expands; sample content previews | `Course` (with `provider`), `Person`, `FAQPage` |
| **Documentation site** | "How do I do X?" → find the answer fast | Search; getting started; guides; reference; examples; changelog; edit-on-GitHub links | Almost none: speed and readability first; subtle page transitions at most | `TechArticle`, `BreadcrumbList`, `WebSite` with `SearchAction` only if there's real site search |
| **Nonprofit / cause** | "Is this credible, and how can I help?" → donate or volunteer | Mission; impact with real numbers; programs; stories (with consent); transparency (reports); donate/volunteer CTAs | Impact numbers that tick up; story reveals | `NGO` or `Organization`, `DonateAction` (as `potentialAction`) |
| **Résumé / CV page** | "Does the experience fit?" → contact or download | Summary; experience timeline; skills; education; links; PDF download | Minimal: a timeline that draws in | `ProfilePage` + `Person` |
| **Blog / publication** | "Is this worth reading and following?" → read more or subscribe | Featured posts; categories; author; subscribe; RSS | Reading-first; subtle | `Blog`, `BlogPosting` per post, `Person` or `Organization` |

## Type notes

- **Hero rule for every type:** within about five seconds a visitor should know *what this is, who it's for, and what to do next*, from real text, not only from an animation.
- **Product UI beats illustration** for SaaS, apps and dev tools. Use real screenshots, recordings or live code; abstract 3D blobs say nothing.
- **Trust signals must be true.** Logos, ratings, testimonials and user counts need a real, verifiable source. If there are none yet, say what *is* true (open source, license, privacy, who built it).
- **Pricing pages:** show the actual price, what's included, and the limits. Hidden pricing costs trust for self-serve products.
- **Forms** (waitlist, contact, booking): use labels (not placeholder-only), clear errors, a stated privacy note, spam protection that doesn't block assistive tech, and somewhere for the data to go. A static host needs a form service or the person's own endpoint, so ask which.
- **Local business and events:** the key facts (hours, address, date and time zone) belong in the first screen and in JSON-LD. Speed and tap targets matter more than motion.
- **Docs sites:** usually a generator is right (the project's own, or Astro Starlight, Docusaurus or VitePress). Apply this skill's design direction to the theme and the landing page, not to every reference page.

## Sections that most landing pages need

Treat this as a menu, not a template. Order it by the visitor's questions.
1. **Hero:** the promise, who it's for, the primary CTA, and real proof (product UI, work or code).
2. **Proof strip:** real numbers, logos, press or community, only if true.
3. **Problem and why now:** the situation the visitor recognizes.
4. **How it works:** 3–5 steps, ideally shown, not told. This is where the signature motion usually lives.
5. **Features or benefits:** grouped by job to be done, each with evidence.
6. **Comparison:** honest, against the status quo or alternatives (optional).
7. **Social proof:** real testimonials with names (optional).
8. **Pricing or getting started.**
9. **FAQ:** the real objections, answered directly (and as `FAQPage` JSON-LD).
10. **Final CTA and footer:** links, legal, social, and the site's other pages.
