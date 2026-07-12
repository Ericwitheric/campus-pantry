import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AccordionSection } from "@/components/AccordionSection";
import { PageHero } from "@/components/PageHero";
import { findPage, pages } from "@/content/pages";

// Dynamic catch-all route (per T6 in SPEC.md). Every non-home path resolves
// here, generateStaticParams pre-renders each valid slug at build time, and
// the body shape depends on whether the page has content yet:
//   - sections[] populated → PageHero + AccordionSection list
//   - sections[] empty     → "Coming soon" placeholder
// Adding a new page = one entry in content/pages.ts. No new file per page.

interface RouteParams {
  slug: string[];
}

interface PageProps {
  params: Promise<RouteParams>;
}

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

export default async function Subpage({ params }: PageProps) {
  const { slug } = await params;
  const page = findPage(slug.join("/"));
  if (!page) notFound();

  const hasContent = page.sections.length > 0;

  return (
    <>
      {hasContent ? (
        <>
          <PageHero
            category={page.category}
            title={page.title}
            intro={page.intro}
            heroImage={page.heroImage}
            heroStyle={page.heroStyle}
          />
          <div className="mx-auto max-w-280 px-6 pb-16 md:px-8 md:pb-24">
            <div className="border-b border-dashed border-border">
              {page.sections.map((section) => (
                <AccordionSection key={section.id} section={section} />
              ))}
            </div>
            <Link
              href="/"
              className="mt-10 inline-flex items-center gap-1 text-sm font-medium text-muted transition hover:text-brand-red"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to handbook
            </Link>
          </div>
        </>
      ) : (
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
              This page is being built. Sections, videos, and Google Doc links
              will land during the content pass. Check back soon.
            </p>
            <p className="mt-4 text-sm text-muted">
              Coming in this section: intro copy, collapsible sub-topics, and
              resource cards linking out to Google Docs, Sheets, or YouTube
              videos.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
