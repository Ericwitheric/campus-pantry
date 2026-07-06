# Campus Pantry — Team Handbook

Internal handbook site for Campus Pantry staff, volunteers, and new hires. A curated link directory over external Google Docs / Sheets / YouTube videos, with a dedicated onboarding page.

**Full spec + roadmap:** [SPEC.md](./SPEC.md)

## Stack

- **Next.js 16** (App Router, static export)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (design tokens via `@theme` in `src/app/globals.css`)
- **Inter** font via `next/font/google`
- Deploys as static HTML/CSS/JS to any static host (planned: Vercel free tier)

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Common commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Local dev server with hot reload |
| `pnpm build` | Production static export to `out/` |
| `pnpm start` | Serve the built site locally (rarely needed with static export) |
| `pnpm lint` | ESLint |

## Project layout

```
src/
├── app/                    # Next.js App Router routes
│   ├── layout.tsx          # Root layout: Inter font, Header, Footer
│   ├── page.tsx            # Home
│   └── globals.css         # Tailwind v4 + design tokens
├── components/             # Reusable UI (Header, Footer, etc.)
├── content/                # Typed page content (no CMS — content lives here)
│   └── types.ts            # PageContent, Resource, OnboardingPhase, etc.
└── lib/                    # Small helpers
public/
├── illustrations/          # unDraw SVGs (one per page, brand-red primary)
└── pdfs/                   # Downloadable PDFs (if any)
```

## Content updates

Most content lives outside this repo — in Google Docs, Sheets, and YouTube. Updates to those sources propagate automatically; no redeploy needed.

Content that DOES live in the repo (page titles, section headings, intro copy, resource links) is edited in `src/content/` as typed TypeScript.

## Deployment

Planned: **Vercel free tier** with GitHub auto-deploy on push to `main`. See [SPEC.md](./SPEC.md#deployment--hosting) for the pipeline.

## Design tokens

Defined in `src/app/globals.css` via Tailwind v4's `@theme inline` block. Class names auto-generate from the tokens:

| Token | CSS var | Tailwind class |
|-------|---------|----------------|
| Brand red | `--color-brand-red` | `text-brand-red`, `bg-brand-red`, `border-brand-red` |
| Brand gold | `--color-brand-gold` | `text-brand-gold`, `bg-brand-gold` |
| Page background | `--color-bg` | `bg-bg` |
| Body text | `--color-fg` | `text-fg` |
| Muted text | `--color-muted` | `text-muted` |
| Borders | `--color-border` | `border-border`, `ring-border` |

## Status

Under construction. See [SPEC.md](./SPEC.md#development-phases) for phase-by-phase progress. Target launch: **end of August 2026**.
