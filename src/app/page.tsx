export default function Home() {
  return (
    <div className="mx-auto max-w-280 px-6 py-16 md:px-8 md:py-24">
      <div className="max-w-2xl">
        <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-red ring-1 ring-border">
          Under construction
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
          Campus Pantry <span className="text-brand-red">Team Handbook</span>
        </h1>
        <div className="mt-3 h-1 w-24 rounded-full bg-brand-red" />
        <p className="mt-6 text-lg leading-relaxed text-fg">
          Internal handbook for pantry staff, volunteers, and new hires. Currently
          being built &mdash; the tile grid, subpages, and onboarding page will
          land page-by-page over the next few weeks.
        </p>
        <p className="mt-4 text-sm text-muted">
          Full plan and roadmap in{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs ring-1 ring-border">
            SPEC.md
          </code>
          .
        </p>
      </div>
    </div>
  );
}
