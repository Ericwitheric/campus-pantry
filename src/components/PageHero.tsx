import type { PageCategory } from "@/content/types";

interface PageHeroProps {
  category: PageCategory;
  title: string;
  intro?: string;
  illustration?: string;
}

export function PageHero({
  category,
  title,
  intro,
  illustration,
}: PageHeroProps) {
  return (
    <div className="mx-auto max-w-280 px-6 pt-12 pb-8 md:px-8 md:pt-16 md:pb-12">
      <div className="flex flex-col-reverse items-start gap-8 md:flex-row md:items-center md:gap-12">
        <div className="flex-1">
          <span className="inline-block rounded-full bg-card px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-red ring-1 ring-border">
            {category}
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <div className="mt-3 h-1 w-24 rounded-full bg-brand-red" />
          {intro && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg">
              {intro}
            </p>
          )}
        </div>
        {illustration && (
          <div className="w-full md:w-1/3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={illustration} alt="" className="h-auto w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
