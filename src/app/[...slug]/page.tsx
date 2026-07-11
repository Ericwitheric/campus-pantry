import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { findPage, pages } from "@/content/pages";

// Phase 1 placeholder catch-all. Every tile on the home page lands here
// (except onboarding once Phase 5 gives it a dedicated route). Reads title
// + category from src/content/pages.ts and shows a "Coming soon" state so
// nav works end-to-end without any 404s. Phase 3 replaces this file with
// the real PageHero + AccordionSection rendering (per T6).

interface RouteParams {
  slug: string[];
}

interface PageProps {
  params: Promise<RouteParams>;
}

// Static export needs every valid path enumerated at build time.
// pages[].slug is stored with '/' where the route has nested segments
// (e.g. "storefront-management/inventory"); split into segments for Next.
export function generateStaticParams(): RouteParams[] {
  return pages.map((p) => ({ slug: p.slug.split("/") }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug.join("/"));
  if (!page) return {};
  return { title: page.title };
}

export default async function SubpagePlaceholder({ params }: PageProps) {
  const { slug } = await params;
  const page = findPage(slug.join("/"));
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-280 px-6 py-12 md:px-8 md:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted transition hover:text-brand-red"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to handbook
      </Link>
      <div className="mt-8 max-w-2xl">
        <span className="inline-block rounded-full bg-card px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-red ring-1 ring-border">
          Coming soon &middot; {page.category}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
          {page.title}
        </h1>
        <div className="mt-3 h-1 w-24 rounded-full bg-brand-red" />
        <p className="mt-6 text-lg leading-relaxed text-fg">
          This page is being built. Sections, videos, and Google Doc links will
          land during the content pass. Check back soon.
        </p>
        <p className="mt-4 text-sm text-muted">
          Coming in this section: intro copy, collapsible sub-topics, and
          resource cards linking out to Google Docs, Sheets, or YouTube videos.
        </p>
      </div>
    </div>
  );
}
