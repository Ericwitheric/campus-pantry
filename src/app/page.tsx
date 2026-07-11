import { HomeTileGrid } from "@/components/HomeTileGrid";

export default function Home() {
  return (
    <div className="mx-auto max-w-280 px-6 py-12 md:px-8 md:py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Team <span className="text-brand-red">Handbook</span>
        </h1>
        <div className="mt-3 h-1 w-24 rounded-full bg-brand-red" />
        <p className="mt-6 text-lg leading-relaxed text-fg">
          SOPs, forms, schedules, and onboarding resources for Campus Pantry
          staff and volunteers. Pick a section below.
        </p>
        <p className="mt-4 text-sm text-muted">
          New here? Start with{" "}
          <a href="/onboarding" className="font-medium text-brand-red underline decoration-brand-red/30 underline-offset-4 hover:decoration-brand-red">
            Staff Onboarding
          </a>
          .
        </p>
      </div>
      <div className="mt-12 md:mt-16">
        <HomeTileGrid />
      </div>
    </div>
  );
}
