---
title: Campus Pantry Team Handbook — Rebuild Spec
status: Draft
target_launch: 2026-08-31
authors: julianthant@gmail.com
last_updated: 2026-07-06
---

# Campus Pantry Team Handbook — Rebuild Spec

## Context

The Campus Pantry team needs an internal staff handbook website. Content today lives across scattered Google Docs, Sheets, and YouTube videos, with no single navigable entry point. New volunteers and staff have no clear onboarding path.

This project builds a **curated link directory** — a small static website that wraps existing external content (Google Docs / Sheets / YouTube) with clean navigation, categorized landing pages, and a dedicated onboarding page. The site does not host content directly; it links out to source-of-truth documents so the manager can update content in place without ever touching the code.

**Reference design:** another UMD department's handbook site (screenshot provided during spec kickoff). We take structural inspiration only — clean tile grid on home, hero image per page, collapsible section pattern for subpages — not the exact styling.

**Why now:** manager wants v1 shipped before the end of August 2026 so it is live before fall semester onboarding.

## Goals

1. **Single entry point for all pantry staff and volunteers.** Every SOP, form, video, and reference doc reachable in one or two clicks from the home page.
2. **Self-service onboarding for new hires.** A structured onboarding page grouped by phase ("Before your first shift" / "Your first week" / "Ongoing reference") so a new volunteer can orient themselves without a manager present.
3. **Zero content-editing friction for the manager.** Content lives in Google Docs / Sheets / YouTube. Updates there propagate instantly. No CMS, no admin panel, no deploy needed for content changes.
4. **Ship before end of August 2026.** ~8 weeks from spec approval.

## Non-Goals (Explicitly Out of Scope)

- **Authentication.** URL is effectively public; obscurity is the "gate." Confirmed no sensitive data (student PII, donor contact info, keys/codes) will ever live on the site.
- **User accounts, sessions, or user state.**
- **Content hosted in the app.** All body content lives in linked-out Google Docs / Sheets / YouTube. Only page copy (headers, intros, section labels) lives in the repo.
- **Analytics.** No page-view tracking in v1.
- **Contact form / "report a problem" button.**
- **Dark mode.**
- **Multiple languages.**
- **Comments, annotations, ratings.**
- **Interactive tools** (inventory calculators, appointment sign-ups, etc.). All such tools live in the linked-out Google Sheets/Forms.
- **CMS or admin panel.**
- **Onboarding completion tracking.** Reference-only, no checklists persisted.
- **Google Doc / Sheet embeds.** Link out instead. Embeds break silently when source docs aren't published to web.
- **Newer pages from the reference sidebar** (Budget, Reports, Fundraising, Presentations, Projects, Engagement & Outreach, Media & Marketing, Terps Move Out Donation, Staff, Media). Deferred to v2 — trivial to add post-launch (10-20 min per page with the pattern below).

## Users

| Role | What they do on the site |
|------|-------------------------|
| Pantry staff (paid) | Look up SOPs mid-shift on desktop or mobile. |
| Pantry volunteers | Reference schedules, procedures, forms. |
| New hires (staff or volunteer) | Onboarding page during first 1-4 weeks. |
| Manager (site owner) | Reviews site occasionally; updates linked Google Docs / YouTube playlist as needed. |

No public users. No students-who-visit-the-pantry. No donors.

## Architecture Overview

```
                    ┌─────────────────────────────────┐
                    │  campus-pantry.vercel.app       │
                    │  (static HTML/CSS/JS on CDN)    │
                    └────────────┬────────────────────┘
                                 │
             ┌───────────────────┼────────────────────┐
             │                   │                    │
             ▼                   ▼                    ▼
     ┌───────────────┐   ┌──────────────┐   ┌──────────────┐
     │ Google Docs   │   │ Google Sheets│   │ YouTube      │
     │ (SOPs, forms) │   │ (schedules,  │   │ (training    │
     │               │   │  inventories)│   │  videos)     │
     └───────────────┘   └──────────────┘   └──────────────┘
             ▲                   ▲                    ▲
             └───────────────────┼────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │  Manager updates source │
                    │  docs. Site auto-shows  │
                    │  latest via links.      │
                    └─────────────────────────┘
```

**Key property:** the site itself is a thin navigation shell. Content lives outside. Manager edits sources → users see updated content immediately, no rebuild.

### Deploy pipeline

```
┌──────────┐   git push    ┌─────────┐   webhook   ┌────────┐   CDN    ┌──────┐
│  local   │──────────────▶│ GitHub  │────────────▶│ Vercel │─────────▶│ user │
│ (VS Code)│               │ (main)  │             │ builds │          │      │
└──────────┘               └─────────┘             └────────┘          └──────┘
                                                        │
                                                        ▼
                                               ┌───────────────┐
                                               │ static export │
                                               │ (HTML/CSS/JS) │
                                               └───────────────┘
```

- Push to `main` → Vercel auto-builds → deploy to `campus-pantry.vercel.app` (free tier).
- Preview URLs on PRs (auto-generated by Vercel).
- No API routes, no server, no database, no secrets.

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js 16 (App Router)** | Modern DX, matches learning goal, supports static export. Note: the create-next-app scaffold in July 2026 pulled `next@16.2.10` + `react@19.2.4`; App Router APIs are compatible with the v15 patterns the spec was originally written against, but new files should be validated against `node_modules/next/dist/docs/` per AGENTS.md. |
| Rendering | **Static export** (`output: 'export'` in `next.config.ts`) | No auth, no DB, no dynamic data → all pre-built HTML. Hosts anywhere. |
| Language | **TypeScript** (strict) | Fewer runtime bugs; portfolio value; guards content-model integrity. |
| Styling | **Tailwind CSS v4** | Design tokens live in `src/app/globals.css` inside an `@theme inline` block — Tailwind v4 auto-generates canonical utilities (`text-brand-red`, `bg-card`, `ring-border`) from the tokens. No `tailwind.config.ts` file. |
| Content authoring | **TypeScript config files** | Page copy + resource links live in `src/content/pages.ts`. No MDX — the payload is small enough that plain TS is cleaner and simpler to typecheck. |
| Icons | **lucide-react** | Tree-shakeable, matches clean aesthetic, free. |
| Fonts | **Inter** (Google Fonts, self-hosted via `next/font`) | System-standard, readable, no license concerns. |
| Deployment | **Vercel free tier** | Best Next.js DX, free auto-deploy, free HTTPS, free preview URLs. |
| Repo | **GitHub** (public) | Auto-deploy trigger, portfolio visibility, free. |
| Testing | **Playwright** (E2E smoke tests) | Right tool for static content site; verifies nav, links, mobile menu. |
| Package manager | **pnpm** | Faster installs, disk-efficient. |
| Node version | **20 LTS** | Vercel default; Next.js 16 supported. |

**Rejected alternatives:**
- Astro — technically leaner for a static content site, but user is learning Next.js.
- Full Next.js server (SSR + API routes) — over-engineered; no dynamic data.
- Plain HTML/CSS — undersells the learning goal; no component reuse.
- WordPress / Google Sites — better for manager, worse for portfolio + learning.

## Page Inventory & Routing

Twelve tiles on the home page (11 subpage routes + 1 external link tile). Grouped into three categories that also drive the mega-menu.

| Tile | Route | Category | Notes |
|------|-------|----------|-------|
| About The Pantry | `/about` | Content | High-content page (per Phase 3 input) |
| Staff FAQs | `/faqs` | People | High-content page |
| Storefront Management | `/storefront-management` | Operations | High-content page |
| Storefront Inventory | `/storefront-management/inventory` | Operations | Nested route; still shown as home tile |
| Volunteers | `/volunteers` | People | |
| Staff Appointments | `/appointments` | People | |
| Donations | `/donations` | Operations | |
| Compost Tracking | *(external link)* | Operations | Tile links directly to Google Sheet, no subpage |
| Teaching Kitchen | `/teaching-kitchen` | Content | |
| Supplies | `/supplies` | Operations | Added in Phase 2 review |
| Resources and Links | `/resources` | Content | Catch-all utility page, added in Phase 2 review |
| Staff Onboarding | `/onboarding` | People | Special layout (grouped by phase, not accordion) |

**Home page tile grid:** 3 columns × 4 rows on desktop; 2 × 6 on tablet; 1 × 12 on mobile.

## Nav & Layout

### Global header (persistent, all pages)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🥕 Campus Pantry     Home    Handbook ▾    Onboarding       🔍     │
└─────────────────────────────────────────────────────────────────────┘
```

- **Left:** logo + "Campus Pantry" wordmark → click returns to home.
- **Center-right:** `Home` · `Handbook ▾` · `Onboarding`.
- **`Handbook ▾`** opens a mega-menu dropdown (below).
- **Right:** search icon (🔍) — opens site-wide search modal on click or `Cmd/Ctrl-K` (see Search section).
- **Mobile:** hamburger icon replaces nav links; opens fullscreen categorized panel. Search icon remains in header.

### Handbook mega-menu (desktop)

```
┌──────────────────────────────────────────────────────────────────┐
│  OPERATIONS         PEOPLE                CONTENT                │
│  ──────────         ──────                ────────               │
│  Storefront Mgmt    Staff FAQs            About The Pantry       │
│  ↳ Inventory        Volunteers            Teaching Kitchen       │
│  Supplies           Appointments          Resources & Links      │
│  Donations                                                       │
│  Compost Tracking → (external, opens in new tab)                 │
└──────────────────────────────────────────────────────────────────┘
```

- Opens on hover (desktop) with a 150ms delay to avoid accidental triggers.
- Also opens on click / keyboard Enter (accessibility).
- Closes on Escape or click-outside.
- External links show a small arrow icon (↗) and open in a new tab.

### Footer

```
┌─────────────────────────────────────────────────────────────────┐
│  © 2026 Campus Pantry    Contact: <manager email>               │
│  Last updated: <build date>                                     │
└─────────────────────────────────────────────────────────────────┘
```

- Contact email → `mailto:` link.
- "Last updated" auto-populated from build timestamp (helps staff know if page is current).

## Subpage Pattern (applies to all subpages except Onboarding)

Every subpage follows the same shape:

```
┌─────────────────────────────────────────────────────────────────┐
│                                            ┌──────────────┐    │
│  PAGE TITLE                                │              │    │
│  ═══════════                               │  cartoon     │    │
│                                            │ illustration │    │
│  Optional intro paragraph.                 │              │    │
│                                            └──────────────┘    │
└─────────────────────────────────────────────────────────────────┘

  ┌───────────────────────────────────────────────────────────┐
  │ Optional intro paragraph, 1-3 sentences. Frames the page. │
  └───────────────────────────────────────────────────────────┘

  ▼ SECTION HEADING 1                                          ⌄
  ─────────────────────────────────────────────────────────────
    (collapsed by default; click to expand)

  ▼ SECTION HEADING 2                                          ⌄
  ─────────────────────────────────────────────────────────────
    (expanded)
    Optional intro text for this section.

    ┌─────────────────────────────────────────────┐
    │ 📄  Reusable Bag Log                        │
    │     Track bag counts each shift             │
    │     Google Sheet                          ↗ │
    └─────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────┐
    │ 📺  Storefront Opening Walkthrough           │
    │     Recorded April 2026                      │
    │     YouTube (4:32)                        ↗ │
    └─────────────────────────────────────────────┘

  ▼ SECTION HEADING 3                                          ⌄
  ─────────────────────────────────────────────────────────────
```

**Key rules:**
- Hero uses a **stock cartoon illustration** (see Design System → Illustrations), not a photograph. Illustration on the right, title + intro on the left (desktop). On mobile, stacks: title on top, illustration below.
- Hero region ~40vh on desktop, auto-height on mobile (illustration scales to viewport width).
- Page title has a **red accent underline** (matches reference aesthetic).
- All sections **collapsed by default**. User expands what they need.
- First-time visitors see a full page of headings — orienting.
- Resource cards show: **icon** (📄 doc / 📊 sheet / 📺 video / 📎 link / 📕 PDF), **title**, optional **description**, **source type label**, external-link arrow.
- Clicking a resource card opens the link in a **new tab** (staff don't lose their place on the handbook).

## Onboarding Page (special layout)

Unlike other pages, onboarding is **not accordion-based** — it's a linear scroll grouped by phase, so a new hire can read top-to-bottom.

```
┌─────────────────────────────────────────────────────────────────┐
│                    [ onboarding hero image ]                    │
│                    STAFF ONBOARDING                             │
│                    ══════════════════                           │
└─────────────────────────────────────────────────────────────────┘

  Welcome to Campus Pantry. This page walks you through your first
  weeks with us. Work through each phase in order. Bookmark this
  page — most of the resources here you'll return to often.

  ═══════════════════════════════════════════════════════════════
   PHASE 1  ·  BEFORE YOUR FIRST SHIFT
  ═══════════════════════════════════════════════════════════════

    Optional phase intro text (1-2 sentences).

    ┌──────────────────────────────────────────┐
    │ 📄  Read the Volunteer Agreement          │
    └──────────────────────────────────────────┘
    ┌──────────────────────────────────────────┐
    │ 📺  Welcome from the Manager (3 min)      │
    └──────────────────────────────────────────┘

  ═══════════════════════════════════════════════════════════════
   PHASE 2  ·  YOUR FIRST WEEK
  ═══════════════════════════════════════════════════════════════

    ...

  ═══════════════════════════════════════════════════════════════
   PHASE 3  ·  ONGOING REFERENCE
  ═══════════════════════════════════════════════════════════════

    ...
```

- Each phase has a heading, optional intro paragraph, and a stack of resource cards.
- Cards render the same as on subpages (icon + title + description + type + ↗).
- Nothing is collapsed — a new hire scrolls the whole page.
- No completion tracking. No checkboxes that persist. Pure reference.

## Search (site-wide)

Persistent 🔍 icon in the header (all pages) opens a fullscreen modal with fuzzy search across every page's title, section headings, intro text, and resource card titles / descriptions. Keyboard shortcut: `Cmd/Ctrl-K`.

### Implementation — Pagefind

**Pagefind** is a static-site-native search tool: it runs after `next build`, scans the exported HTML in `out/`, and generates a static search index in `out/pagefind/`. The runtime is ~10KB gzip, loaded on demand when the user opens the modal. No server, no external service, no API keys.

- `package.json`: `"build": "next build && pagefind --site out"`
- `next.config.ts` unchanged (`output: 'export'` still works).
- Search index ships alongside static HTML to the CDN.
- Rebuild-cost: adds ~2-5 seconds to the build.

### Components

- `src/components/SearchButton.tsx` — icon in header; renders modal on click or `Cmd/Ctrl-K`.
- `src/components/SearchModal.tsx` — modal wrapping Pagefind's search API. Custom-styled results list matching site design system.

### UX

```
┌────────────────────────────────────────────────────────────┐
│  🔍  Search the handbook...                          [ESC] │
│  ────────────────────────────────────────────────────────  │
│                                                            │
│  STOREFRONT MANAGEMENT                                     │
│  ...opening procedures and the reusable bag log...         │
│                                                            │
│  STAFF FAQS                                                │
│  ...how do I request time off during storefront hours...   │
│                                                            │
│  ONBOARDING · Phase 1                                      │
│  ...watch the welcome-from-manager video before your...    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

- Escape closes; click-outside closes; Enter navigates to the first result.
- Each result shows: **page name** (with breadcrumb if nested, e.g. `STOREFRONT MANAGEMENT · Inventory`), **matched snippet** with the query term highlighted, click-to-navigate.
- Empty query state: show a short prompt ("Type to search across all pages") and 3-4 "Popular pages" links (hardcoded: Storefront Management, Staff FAQs, Onboarding).

### What is indexed

- Page titles (`<h1>`)
- Section headings (accordion headers)
- Page intro paragraphs
- Resource card titles and descriptions
- Onboarding phase headings and intros

### What is NOT indexed (important — surface this to the manager)

- The **actual content of linked-out Google Docs, Sheets, or YouTube videos**. Search only surfaces what's on this site.
- Consequence: if a staff member searches for text that only lives inside a linked Google Doc, they won't find it — they have to open the doc and Ctrl+F there. This is a known limitation of the "site is a link directory" model.
- Mitigation: write resource card descriptions with searchable keywords ("Reusable Bag Log — tracks daily bag counts, weekly reusable-bag totals, and monthly bag reorder triggers"). The card description is indexed; the doc contents aren't.

## Design System

### Colors

```
Primary red      #C0392B    (pantry accent, headings underline, hero overlays)
Gold accent      #E4B85E    (subtle accents, hover states, section rules)
Off-white bg     #FBF7F2    (page background — warm, not stark white)
Charcoal text    #1F2933    (body text)
Muted text       #6B7280    (metadata, "last updated", card descriptions)
Border grey      #E5E7EB    (card borders, dividers)
```

UMD-inspired palette (red + gold), warm off-white background matches the "food/pantry" vibe better than pure white.

### Typography

- **Body:** Inter (400 / 500 / 600)
- **Headings:** Inter (700), tracking-tight
- **Base size:** 16px mobile, 17px desktop
- **Line height:** 1.6 body, 1.2 headings

### Spacing

- Container max-width: 1120px (px-6 on mobile, px-8 on desktop)
- Vertical rhythm: 24px between paragraphs, 48px between sections, 96px between page regions

### Motion

- Accordion expand/collapse: 200ms ease-out
- Mega-menu open: 150ms fade + 4px translateY
- Search modal open: 150ms fade + subtle scale-in
- No auto-playing videos. No parallax. No scroll-jacking.

### Illustrations

**Source:** [unDraw](https://undraw.co) — free, open-source SVG illustrations with a customizable primary color. Set unDraw's primary color to our brand red (`#C0392B`) before downloading each illustration so they all share a consistent palette.

- One illustration per page (12 illustrations total for v1).
- Format: **SVG** (scales cleanly, tiny file size, no image optimization pipeline needed).
- Storage: `public/illustrations/<page-slug>.svg`.
- Aesthetic guidance for picking illustrations:
  - Prefer illustrations with **people doing pantry-relevant actions** (someone with a shopping bag, someone at a checkout, someone reading, a group of volunteers).
  - Avoid corporate/office scenes that don't fit a food pantry vibe.
  - Consistency matters more than perfection — pick 12 that feel like they belong together.
- **Alt text is required** on every illustration for screen readers (e.g., "Illustration of a volunteer restocking shelves").
- **Switch to real photos later:** the `PageHero` component takes an image `src` prop. Swapping `illustrations/storefront.svg` for `hero/storefront.jpg` later is a one-line content change per page.

## Content Model (TypeScript)

Located in `src/content/`. Fully type-checked at build time.

```typescript
// src/content/types.ts

export type ResourceType =
  | 'google-doc'
  | 'google-sheet'
  | 'youtube'
  | 'pdf'
  | 'external';

export interface Resource {
  title: string;
  description?: string;
  href: string;
  type: ResourceType;
}

export interface AccordionSection {
  id: string;           // stable slug for anchor links
  heading: string;
  intro?: string;       // markdown-ish (plain text with links OK for v1)
  resources: Resource[];
}

export interface PageContent {
  slug: string;         // matches route
  title: string;
  category: 'Operations' | 'People' | 'Content';
  heroImage: string;    // path served from public/, referenced as /illustrations/... (public/ is served at site root, so never prefix with /public)
  intro?: string;
  sections: AccordionSection[];
}

export interface OnboardingPhase {
  id: string;
  title: string;
  intro?: string;
  resources: Resource[];
}
```

```typescript
// src/content/pages.ts (example entry)

export const storefrontManagement: PageContent = {
  slug: 'storefront-management',
  title: 'Storefront Management',
  category: 'Operations',
  heroImage: '/hero/storefront.jpg',
  intro: 'Everything you need to open, run, and close the storefront.',
  sections: [
    {
      id: 'opening',
      heading: 'Opening',
      resources: [
        {
          title: 'Opening Checklist',
          description: 'Step-by-step opening procedure',
          href: 'https://docs.google.com/document/d/xxx',
          type: 'google-doc',
        },
      ],
    },
    // ... more sections
  ],
};
```

## Repo Structure

```
campus-pantry/
├── .github/
│   └── workflows/
│       └── ci.yml                        # typecheck + lint + playwright on PR
├── public/
│   ├── favicon.ico
│   ├── illustrations/                    # unDraw SVGs, brand-red primary
│   │   ├── home.svg
│   │   ├── about.svg
│   │   ├── faqs.svg
│   │   ├── storefront.svg
│   │   ├── inventory.svg
│   │   ├── volunteers.svg
│   │   ├── appointments.svg
│   │   ├── donations.svg
│   │   ├── teaching-kitchen.svg
│   │   ├── supplies.svg
│   │   ├── resources.svg
│   │   └── onboarding.svg
│   ├── pdfs/                             # any downloadable PDFs
│   └── pagefind/                         # search index (git-ignored, generated at build)
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # root layout, header + footer
│   │   ├── page.tsx                      # home tile grid
│   │   ├── about/page.tsx
│   │   ├── faqs/page.tsx
│   │   ├── storefront-management/
│   │   │   ├── page.tsx
│   │   │   └── inventory/page.tsx
│   │   ├── volunteers/page.tsx
│   │   ├── appointments/page.tsx
│   │   ├── donations/page.tsx
│   │   ├── teaching-kitchen/page.tsx
│   │   ├── supplies/page.tsx
│   │   ├── resources/page.tsx
│   │   └── onboarding/page.tsx           # special layout
│   ├── components/
│   │   ├── Header.tsx                    # logo + nav + search + mobile hamburger
│   │   ├── MegaMenu.tsx                  # Handbook dropdown
│   │   ├── MobileNav.tsx                 # fullscreen mobile panel
│   │   ├── SearchButton.tsx              # 🔍 icon + Cmd/Ctrl-K shortcut
│   │   ├── SearchModal.tsx               # Pagefind-backed fullscreen search
│   │   ├── Footer.tsx
│   │   ├── HomeTileGrid.tsx
│   │   ├── HomeTile.tsx
│   │   ├── PageHero.tsx                  # illustration + title + red rule
│   │   ├── AccordionSection.tsx          # collapsible section wrapper
│   │   ├── ResourceCard.tsx              # icon + title + desc + type + ↗
│   │   ├── OnboardingPhase.tsx           # phase heading + card stack
│   │   └── ResourceIcon.tsx              # maps ResourceType → lucide icon
│   ├── content/
│   │   ├── types.ts                      # PageContent, Resource, etc.
│   │   ├── pages.ts                      # all subpage content
│   │   ├── onboarding.ts                 # onboarding phases
│   │   └── nav.ts                        # category → page mapping
│   ├── lib/
│   │   └── cn.ts                         # classnames helper
│   └── styles/
│       └── globals.css                   # Tailwind base + design tokens
├── tests/
│   └── e2e/
│       ├── home.spec.ts                  # tiles render, all clickable
│       ├── nav.spec.ts                   # header nav + mega-menu + mobile
│       ├── search.spec.ts                # 🔍 opens modal, results navigate
│       ├── subpages.spec.ts              # each subpage renders + accordions work
│       ├── onboarding.spec.ts            # onboarding page renders
│       └── external-links.spec.ts        # every external link has valid URL
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── next.config.ts
├── package.json
├── playwright.config.ts
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md                             # setup + deploy instructions
└── tsconfig.json                         # (no tailwind.config.ts — Tailwind v4 tokens live in globals.css)
```

## Development Phases

Deadline: **2026-08-31** (~8 weeks from 2026-07-06 spec approval). Solo developer with intermediate Next.js/React experience.

### Phase 0 — Setup (2 days)
- Init repo (`pnpm create next-app@latest`), TypeScript strict, Tailwind, `output: 'export'` config.
- Wire GitHub → Vercel auto-deploy.
- Commit initial home page skeleton.
- **Ship signal:** `campus-pantry.vercel.app` returns "Hello Campus Pantry."

### Phase 1 — Design system + home page (4-5 days)
- Tailwind config with color tokens, Inter font, spacing scale.
- `Header`, `Footer`, `HomeTileGrid`, `HomeTile` components.
- Home page renders all 12 tiles (link tiles work, subpage tiles route to placeholder subpages).
- Mobile responsive.
- **Ship signal:** home page pixel-close to design intent on desktop + mobile.

### Phase 2 — Nav (3 days)
- **Single `src/content/nav.ts` is the source of truth** (per T5). Both `MegaMenu` (desktop dropdown) and `MobileNav` (fullscreen panel) render from the same data structure — no duplicated arrays, no drift between desktop and mobile navigation. Adding a page or renaming a category is one edit.
- `MegaMenu` with categorized dropdown (Operations / People / Content).
- Keyboard accessibility (Tab, Enter, Escape).
- `MobileNav` fullscreen panel with same categorization.
- **Ship signal:** can navigate to every page from header on desktop and mobile.

### Phase 3 — Subpage template (3 days)
- `PageHero`, `AccordionSection`, `ResourceCard`, `ResourceIcon`.
- **Dynamic routing (per T6):** subpages render via a single `src/app/[slug]/page.tsx` (with `generateStaticParams` returning every slug from `content/pages.ts`), plus a nested `[slug]/[sub]/page.tsx` for `/storefront-management/inventory`. This replaces the earlier plan of 11 hand-written page files — one place to touch when adding a page or changing the subpage template.
- **Accordion is CSS-first (per T2):** all section content renders in static HTML so search, screen readers, and no-JS clients see the full content. Collapse/expand uses `<details>` + `<summary>` (or an equivalent `aria-expanded` pattern) — no client-side JavaScript needed for basic collapse.
- **Empty-section fallback built into `AccordionSection` in this phase, not deferred (per T7).** Section with zero resources renders a subtle "No resources yet — check back soon" state, not a broken empty accordion.
- Wire to `content/types.ts` and one hardcoded page (`storefront-management`) as a test.
- **Generate per-page Playwright specs against placeholder data (per T9)** — so Phase 6 can run them without writing them from scratch. Content fills in during Phase 4; the tests already exist.
- Verify accordion open/close (with keyboard), card icons, external-link behavior.
- **Ship signal:** Storefront Management page renders end-to-end from content config; per-page test skeleton in `tests/e2e/subpages.spec.ts` runs green against placeholder content.

### Phase 4 — Content pass, subpages (5-7 days)
- Manager provides Google Doc / Sheet / YouTube URLs for each page (this is the critical-path handoff — start collecting Day 1 of Phase 4, ideally sooner).
- Fill in `content/pages.ts` for all 11 subpage routes.
- Write ~2 sentences of page intro and section headings per page.
- Wire subroute (`/storefront-management/inventory`).
- Source 12 unDraw illustrations (brand-red primary color), save to `public/illustrations/`, add alt text.
- **Ship signal:** every subpage tile leads to a working page with real content and an illustration.

### Phase 5 — Onboarding page (2-3 days)
- `OnboardingPhase` component.
- Fill in `content/onboarding.ts` with all phases.
- Different layout from other subpages (no accordions).
- **Ship signal:** onboarding page reads well top-to-bottom as a new hire.

### Phase 6 — Polish + search + tests (5-6 days, revised up per T13)
- Install Pagefind (`pnpm add -D pagefind`); update build script to run Pagefind after `next build`.
- Build `SearchButton` and `SearchModal` components (Cmd/Ctrl-K shortcut, focus trap, escape-to-close).
- **Lazy-load Pagefind runtime via dynamic import** (per T12) so the search bundle only downloads when the user opens the modal; dev mode shows a graceful "run `pnpm build` to enable search" message instead of failing.
- Verify search results navigate correctly and match snippets render with the query term highlighted.
- **Run** the Playwright suite generated during Phase 3 (per T9). This phase writes at most the search + a11y specs; per-page rendering specs already exist.
- Add the 8 missing test specs per T10: keyboard nav on mega-menu, focus trap on search modal, screen-reader smoke, broken-URL pattern detection, `target="_blank"` + `rel="noopener noreferrer"` audit, 404 route, hero illustration alt-text audit, console-clean check.
- **CI: add SVGO minify step + 20KB-per-illustration size budget (per T11).** Build fails if any illustration exceeds 20KB — forces conscious tradeoffs on illustration complexity.
- Illustrations properly sized, alt text present, no layout shift on load.
- Empty-state handling (a section with no resources — hide gracefully). Note: `AccordionSection` empty-state fallback was already built in Phase 3 (per T7), not deferred here.
- Fix broken external URLs discovered during testing.
- Accessibility pass (keyboard nav, focus rings, aria labels on mega-menu and search modal).
- **Ship signal:** all E2E tests green, no console errors, Lighthouse ≥ 90 on all axes, search returns real results.

### Phase 7 — Manager review + fixes (3-5 days)
- Send manager the Vercel URL.
- Walk through together on desktop + phone.
- Fix copy, layout, or link corrections manager surfaces.
- **Ship signal:** manager signs off.

### Phase 8 — Launch (1 day)
- If UMD assigns a custom domain, wire it up in Vercel + DNS.
- Otherwise, `campus-pantry.vercel.app` is the launch URL.
- Announce to staff via manager's channel.
- **Ship signal:** launch URL shared with team; first staff member successfully lands on onboarding page.

**Total (post plan-eng-review): ~30 working days = 6 weeks of engineering + 2 weeks of manager review and content collection = fits the 8-week window with minimal slack.** See Critical-path risks below for the "if X slips, drop Y" order. Original estimate of "5 weeks + 2-3 weeks" was revised upward per T13 — Phase 6 was under-budgeted for the search + test + a11y + Lighthouse work stacked into one week.

### Critical-path risks

1. **Content collection is the real bottleneck**, not code. If manager doesn't hand over URLs by end of week 3, launch slips. Mitigation: start collecting URLs on Day 1 alongside Phase 0. A shared Google Sheet listing every needed URL by page is the artifact.
2. **Illustration consistency.** 12 unDraw SVGs need to feel like they belong together — same illustration style, same primary color (brand red `#C0392B`), similar composition weight. Budget 2-3 hours to browse and pick a coherent set before dropping them in. If manager later provides real pantry photos, swap them in per page — the `PageHero` component takes an image `src` prop, so it's a one-line content change.
3. **Solo developer with intermediate experience.** Realistic pace. If Phase 3 (subpage template) takes >5 days, escalate — it's the load-bearing component and shouldn't sprawl.
4. **Phase 6 risk concentration (per plan-eng-review T10-T12).** The original Phase 6 wraps Pagefind wiring, 8+ Playwright specs, illustration size budget CI, accessibility pass, and Lighthouse tuning — all inside a 4-5 day window. Two things go wrong here: any single item that slips (typical: Pagefind lazy-load edge cases or an a11y failure that requires component refactors) blows the whole phase, AND the phase touches every previous phase's output so bugs surface late. Mitigation: **shift test writing left**. Generate per-page Playwright specs during Phase 3 against placeholder data (T9) so Phase 6 is only running the suite + fixing, not writing it. Budget Phase 6 at 5-6 days, not 3-4.
5. **Realistic timeline (per plan-eng-review T13).** Original spec says "5 weeks eng + 2-3 weeks review = comfortably within 8 weeks." Honest read is closer to **6 weeks eng + 2 weeks review** with no slack. If the calendar tightens, drop features in this order:
   1. **Drop Pagefind search first.** Ship without site-wide search; Ctrl+F on a page is a real fallback for a small handbook. Search can ship in v1.1 the week after launch.
   2. **Drop the deferred pages** (Supplies, Resources & Links) — ship the 10 originally-planned tiles only.
   3. **Drop the illustration polish** — ship with plain colored panels instead of unDraw SVGs. Illustrations added in the first post-launch iteration.
   Do NOT drop: onboarding page, accordion pattern, mobile responsiveness, or accessibility basics. These are load-bearing.
6. **Public repo + Vercel preview URL leak (accepted, per plan-eng-review T14).** Every push to a branch generates a Vercel preview URL that's publicly reachable if guessed, and the source repo is public. This is an accepted cost — the spec's "no sensitive data" guarantee makes preview leaks a non-issue, and portfolio visibility from the public repo is the tradeoff we chose. If sensitive content ever lands on the site, flip the repo to private AND enable Vercel deployment protection before the next push.

## Acceptance Criteria

1. Home page displays 12 tiles in a responsive grid (3 col desktop, 2 col tablet, 1 col mobile).
2. Every tile links to its correct destination (subpage or external URL).
3. Header nav present on every page with working `Home`, `Handbook ▾` (mega-menu with categorized pages), and `Onboarding` links.
4. Mobile hamburger menu opens a fullscreen categorized panel and every link works.
5. Each subpage renders: hero image, page title with red underline, optional intro, list of collapsible accordion sections.
6. Every accordion expands / collapses on click, with keyboard support (Enter / Space).
7. Every resource card shows: icon matching its type, title, optional description, source type label, external-link arrow.
8. Every resource card opens its `href` in a new tab.
9. Onboarding page renders 3 phase sections (or however many defined), each with heading + intro + resource cards, laid out top-to-bottom (no accordions).
10. Compost Tracking home tile links directly to its Google Sheet in a new tab — no subpage.
11. Storefront Inventory has both a home tile AND is reachable at `/storefront-management/inventory`.
12. Site is fully responsive at 375px, 768px, 1024px, 1440px viewport widths.
13. All pages have unique `<title>` and `<meta description>`.
14. All hero illustrations have descriptive `alt` text.
15. Site-wide search opens via the 🔍 header icon OR the `Cmd/Ctrl-K` keyboard shortcut.
16. Search returns real results from Pagefind's index (searches page titles, section headings, resource card titles/descriptions).
17. Clicking a search result navigates to the correct page. Escape closes the modal.
18. Site builds cleanly with `pnpm build && pagefind --site out` — zero TypeScript errors, zero ESLint errors, search index generated.
19. All Playwright E2E tests pass.
20. Lighthouse (mobile) ≥ 90 for Performance, Accessibility, Best Practices, SEO.
21. Site deployed and reachable at `campus-pantry.vercel.app` (or custom domain if provided).
22. Footer shows contact email + "Last updated" build timestamp.
23. No `console.error` or `console.warn` output on any page load.

## Testing Plan

| Layer | What | Count |
|-------|------|-------|
| E2E (Playwright) | Home page renders 12 tiles, all links have valid `href` | 1 |
| E2E | Header nav visible on every route; mega-menu opens on click | 2 |
| E2E | Mobile hamburger opens panel; every panel link routes correctly | 2 |
| E2E | Each of 11 subpages renders (hero, title, at least one section) | 11 |
| E2E | Accordions expand and collapse on click | 1 |
| E2E | Onboarding page renders each phase with correct heading | 1 |
| E2E | Search icon opens modal; `Cmd/Ctrl-K` opens modal; Escape closes it | 2 |
| E2E | Typing a known page title returns at least one Pagefind result; clicking navigates correctly | 2 |
| E2E | All external links have valid URL patterns (`https://`, no `undefined`, no `TODO`) | 1 |
| E2E | Every resource card has `target="_blank"` and `rel="noopener noreferrer"` | 1 |
| E2E | 404 page renders for unknown routes | 1 |
| Type-check | `tsc --noEmit` on CI | build gate |
| Lint | `eslint` on CI | build gate |
| Build | `pnpm build` succeeds | build gate |

No unit tests. For a static content site, unit tests add noise. E2E covers the user-visible behavior that matters.

## Files Reference

| File | Purpose |
|------|---------|
| `next.config.ts` | `output: 'export'`, image config, base path if needed |
| `src/app/globals.css` | Tailwind v4 `@theme inline` block — design tokens, dark palette via `.dark` variant |
| `src/app/layout.tsx` | Header + Footer wrapping all pages, plus the theme-init script |
| `src/app/page.tsx` | Home tile grid |
| `src/app/[slug]/page.tsx` (multiple) | One per subpage — each pulls content from `content/pages.ts` |
| `src/app/onboarding/page.tsx` | Special layout for onboarding |
| `src/components/Header.tsx` | Persistent top header |
| `src/components/MegaMenu.tsx` | Handbook dropdown |
| `src/components/AccordionSection.tsx` | Load-bearing subpage primitive |
| `src/components/ResourceCard.tsx` | Load-bearing content primitive |
| `src/content/pages.ts` | All subpage content (single source of truth) |
| `src/content/onboarding.ts` | Onboarding phases |
| `src/content/nav.ts` | Category → page mapping for mega-menu |
| `tests/e2e/*.spec.ts` | Playwright smoke tests |
| `README.md` | Setup + local-dev + deploy instructions |

## Rollback Plan

Because there is no database and no user state:

- **Broken deploy:** Vercel dashboard → previous deployment → "Promote to Production." One click.
- **Bad content update:** `git revert <commit>` and push. Vercel auto-redeploys.
- **Site completely offline (Vercel outage):** direct users to source Google Docs / YouTube links (which are the real content anyway). Site is a convenience layer, not the source of truth. This is by design.

## Post-Launch (v2 candidates, not built now)

- Add deferred pages from reference sidebar (Budget, Reports, Fundraising, etc.) as content emerges.
- Simple analytics via Vercel Analytics (free tier) to see which pages staff actually use — pair with search queries (Pagefind can log to console) to learn what content staff can't find.
- Downloadable PDF export of the full handbook (for offline reference).
- Real photos of the actual pantry, replacing the unDraw illustrations page by page.
- Real authentication if the site ever needs to hold sensitive data.
- Content edited via a headless CMS if content velocity outstrips manager willingness to touch GitHub.

## Related

*(No prior issues — greenfield project. This spec is the source of truth.)*

## NOT in scope (review-deferred)

Items raised during the plan-eng-review and explicitly not addressed in this spec:

- **Broken-link health monitoring** (D6). Manual link check in Phase 7 only. Manager can revoke Google Doc sharing; a volunteer will hit a "request access" wall. The complete solution is a nightly CI job that HEADs every external href; the spec is comfortable with the manual approach for v1.
- **Search "Popular pages" hardcoded list** (outside voice #9). Three hardcoded links will drift as pages are added. The mega-menu already provides this; the search modal duplicates nav state. Acceptable for v1; the data-driven variant is a v2 fix.
- **Footer "Last updated" semantics** (outside voice #10). The footer shows build timestamp, which staff will (reasonably) read as content freshness. Every Vercel rebuild — including no-content changes — bumps the date. No per-page "last reviewed" field. Acceptable for v1; per-page content review dates are a v2 addition.
- **"Search popular pages" hardcoded list maintenance** is implicitly captured in D-above.
- **Compost Tracking external tile has no fallback** (outside voice #3). If the Google Sheet is renamed or restricted, the home tile points to a dead link with no in-site replacement. Acceptable for v1; an in-site subpage with a fallback message is a v2.
- **"Trivial 10-20 min" per deferred page** (outside voice #5). The spec's claim is generous; the real cost per deferred page is ~20-30 min including content, illustration (if new), test, and a11y pass. v2 timing estimate should be revised upward.

## What already exists

- **Phase 0 scaffold (committed)**: `package.json` (next@16.2.10, react@19.2.4, tailwindcss@^4), `next.config.ts` (`output: "export"`, `trailingSlash`, `images.unoptimized`), `src/app/layout.tsx` (Inter font, Header/Footer imports), `src/app/page.tsx` (placeholder home), `src/app/globals.css`, `src/components/{Header,Footer}`, `public/`, `out/` (build output), `.vercel/` (deployment metadata), `eslint.config.mjs`, `tsconfig.json`. Phase 0 is functionally complete: `campus-pantry.vercel.app` returns the placeholder home page.
- **AGENTS.md** in repo: warns "This is NOT the Next.js you know — APIs, conventions, and file structure may all differ." The spec's Next 15 references are suspect on this basis; the review resolved this in D2 (update spec to Next 16).
- **The repo-level pattern is a static-export + Vercel pipeline** that the spec describes. No existing code is being reused; this is greenfield, and the design doc check is the source of truth.

## Implementation Tasks (synthesized from review)

- [ ] **T1 (P1, human: ~1h / CC: ~30min)** — spec — Update SPEC.md tech stack to Next.js 16 + React 19; audit App Router references for v16 validity
- [ ] **T2 (P1, human: ~1h / CC: ~30min)** — subpage — Render all accordion content in static HTML; collapse via CSS+aria-expanded at runtime
- [ ] **T3 (P3, human: ~1min / CC: ~30s)** — spec — Fix PageContent.heroImage doc comment: drop /public prefix
- [ ] **T4 (P1, human: ~1h / CC: ~30min)** — design-system — Adopt Tailwind v4 design tokens in globals.css via @theme; remove tailwind.config.ts
- [ ] **T5 (P1, human: ~2h / CC: ~30min)** — nav — Single src/content/nav.ts as source of truth; MegaMenu and MobileNav both render from it
- [ ] **T6 (P1, human: ~1h / CC: ~30min)** — routing — Collapse 11 subpage page.tsx into a single dynamic [category]/[slug]/page.tsx driven by content/pages.ts
- [ ] **T7 (P1, human: ~30min / CC: ~10min)** — subpage — Build empty-section fallback into AccordionSection from Phase 3; ship the test in Phase 3 not Phase 6
- [ ] **T8 (P1, human: ~0 / CC: ~5min)** — content — Drop MDX from SPEC.md tech stack; use TypeScript config only
- [ ] **T9 (P1, human: ~1h / CC: ~30min)** — tests — Generate per-page Playwright specs in Phase 3 against placeholder data; content fills in during Phase 4
- [ ] **T10 (P1, human: ~3h / CC: ~1h)** — tests — Add 8 missing Playwright specs: keyboard nav, focus trap, screen reader smoke, broken-URL pattern, target=_blank, 404 page, hero alt, console clean
- [ ] **T11 (P1, human: ~1h / CC: ~30min)** — perf — Add SVGO minify step + 20KB-per-illustration size budget in CI; fail build on violation
- [ ] **T12 (P1, human: ~30min / CC: ~15min)** — search — Lazy-load Pagefind via dynamic import on first search-icon click; dev-mode shows graceful "build to search" message
- [ ] **T13 (P1, human: ~1h / CC: ~30min)** — spec — Update SPEC.md Critical-path risks: realistic timeline, Phase 6 risk concentration, explicit "if X slips, drop Y" priority order
- [ ] **T14 (P3, human: ~5min / CC: ~1min)** — spec — Note in SPEC.md that the public repo + Vercel preview URL leak is an accepted cost (portfolio value over preview URL privacy)

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | — | — |
| Codex Review | `/codex review` | Independent 2nd opinion | 0 | — | — |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | ISSUES_OPEN | 14 issues, 0 critical gaps |
| Design Review | `/plan-design-review` | UI/UX gaps | 0 | — | — |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | — | — |

- **CODEX:** Codex not installed; outside voice ran as a Claude subagent. 11 additional findings surfaced; user triaged to A (timeline + Phase 6 risk in spec) and B-public (accept the leak).
- **CROSS-MODEL:** No prior reviews to compare.
- **VERDICT:** ENG REVIEW ISSUES_OPEN — 14 issues raised, all triaged. Ready to implement; review record persisted in `~/.gstack/projects/Campus-Pantry/tasks-eng-review-*.jsonl`.

NO UNRESOLVED DECISIONS
