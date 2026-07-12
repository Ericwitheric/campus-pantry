import type { VideoEmbed as VideoEmbedType } from "@/content/types";

// Responsive 16:9 YouTube embed.
// - Uses youtube-nocookie.com so no tracking cookies are set until play.
// - loading="lazy" defers the iframe request until scroll-near.
// - Wraps in <figure>/<figcaption> so the title reads as image caption
//   semantically (screen readers announce it).
export function VideoEmbed({ youtubeId, title, description }: VideoEmbedType) {
  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative aspect-video bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <figcaption className="p-4">
        <p className="font-semibold text-fg">{title}</p>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </figcaption>
    </figure>
  );
}
