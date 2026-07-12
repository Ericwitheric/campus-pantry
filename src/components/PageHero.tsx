import type { PageCategory } from "@/content/types";

interface PageHeroProps {
  category: PageCategory;
  title: string;
  intro?: string;
  heroImage?: string;
  heroStyle?: "photo" | "illustration";
}

export function PageHero({
  category,
  title,
  intro,
  heroImage,
  heroStyle,
}: PageHeroProps) {
  if (heroImage && heroStyle === "photo") {
    return <PhotoHero category={category} title={title} intro={intro} image={heroImage} />;
  }
  return (
    <IllustrationHero
      category={category}
      title={title}
      intro={intro}
      illustration={heroStyle === "illustration" ? heroImage : undefined}
    />
  );
}

// Full-bleed photograph hero: photo behind, dark overlay, big centered white
// title. Matches the reference site aesthetic. Used for real pantry photos.
function PhotoHero({
  category,
  title,
  intro,
  image,
}: {
  category: PageCategory;
  title: string;
  intro?: string;
  image: string;
}) {
  return (
    <div className="relative isolate">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        aria-hidden
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/70 via-black/55 to-black/70"
      />
      <div className="mx-auto flex min-h-[55vh] max-w-280 flex-col items-center justify-center px-6 py-24 text-center md:px-8 md:py-32">
        <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white ring-1 ring-white/30 backdrop-blur">
          {category}
        </span>
        <h1 className="mt-6 text-5xl font-bold uppercase tracking-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <div className="mt-6 h-1 w-40 rounded-full bg-brand-red md:h-1.5 md:w-64" />
        {intro && (
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}

// Text-only or side-by-side illustration hero. Default for any page without
// a photograph. Illustration slot is filled per-page once unDraw SVGs land.
function IllustrationHero({
  category,
  title,
  intro,
  illustration,
}: {
  category: PageCategory;
  title: string;
  intro?: string;
  illustration?: string;
}) {
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
