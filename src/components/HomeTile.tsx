import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { HomeTileEntry } from "@/content/types";

export function HomeTile({ tile }: { tile: HomeTileEntry }) {
  const wrapperClass =
    "group flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center transition hover:-translate-y-0.5 hover:border-brand-red/60 hover:shadow-md";

  const inner = (
    <>
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-bg ring-1 ring-border">
        {/*
          Illustration placeholder — Phase 4 swaps this for the real
          <img src={tile.illustration} /> once unDraw SVGs are picked.
          For now, a subtle initials pill keeps the layout honest without
          fake artwork.
        */}
        <span className="text-xs font-medium uppercase tracking-widest text-muted">
          {tile.title
            .split(" ")
            .map((w) => w[0])
            .slice(0, 3)
            .join("")}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-fg group-hover:text-brand-red">
        {tile.title}
        {tile.external && (
          <ExternalLink
            aria-label="Opens in new tab"
            className="ml-1 inline h-3 w-3 align-baseline text-muted"
          />
        )}
      </h3>
    </>
  );

  if (tile.external) {
    return (
      <a
        href={tile.href}
        target="_blank"
        rel="noopener noreferrer"
        className={wrapperClass}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={tile.href} className={wrapperClass}>
      {inner}
    </Link>
  );
}
