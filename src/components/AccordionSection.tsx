import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AccordionSection as AccordionSectionType } from "@/content/types";
import { VideoEmbed } from "./VideoEmbed";

// CSS-first collapsible section (details/summary per T2 in SPEC.md).
// All content is in static HTML — search indexing, screen readers, and
// no-JS clients see everything. No client-side JavaScript needed for
// open/close; the browser handles it natively.
export function AccordionSection({
  section,
}: {
  section: AccordionSectionType;
}) {
  const hasResources =
    Array.isArray(section.resources) && section.resources.length > 0;
  const hasVideos =
    Array.isArray(section.videos) && section.videos.length > 0;
  const hasContent = Boolean(
    section.intro || section.body || hasVideos || hasResources,
  );

  return (
    <details
      id={section.id}
      className="group border-t border-dashed border-border first:border-t-0"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-b border-border py-6 text-lg font-bold uppercase tracking-widest text-fg transition hover:text-brand-red md:py-8 md:text-xl [&::-webkit-details-marker]:hidden">
        <span>{section.heading}</span>
        <ChevronDown
          aria-hidden
          className="h-5 w-5 flex-shrink-0 text-muted transition group-open:rotate-180 group-hover:text-brand-red md:h-6 md:w-6"
        />
      </summary>
      <div className="space-y-4 pb-10 pt-6">
        {section.intro && (
          <p className="leading-relaxed text-fg">{section.intro}</p>
        )}
        {section.body && (
          <div className="space-y-4 leading-relaxed text-fg">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="mt-6 text-xl font-bold text-fg">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-5 text-lg font-semibold text-fg">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="leading-relaxed text-fg">{children}</p>
                ),
                a: ({ children, href }) => {
                  const isExternal = href?.startsWith("http");
                  return (
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="text-brand-red underline decoration-brand-red/40 underline-offset-4 hover:decoration-brand-red"
                    >
                      {children}
                    </a>
                  );
                },
                strong: ({ children }) => (
                  <strong className="font-semibold text-fg">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                ul: ({ children }) => (
                  <ul className="ml-6 list-disc space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="ml-6 list-decimal space-y-2">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-fg">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-brand-red bg-card/60 px-6 py-3 italic text-fg">
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className="my-6 border-border" />,
                code: ({ children }) => (
                  <code className="rounded bg-card px-1.5 py-0.5 text-sm ring-1 ring-border">
                    {children}
                  </code>
                ),
              }}
            >
              {section.body}
            </ReactMarkdown>
          </div>
        )}
        {hasVideos && (
          <div className="grid gap-6 md:grid-cols-2">
            {section.videos!.map((video) => (
              <VideoEmbed key={video.youtubeId} {...video} />
            ))}
          </div>
        )}
        {/* T7: empty-section fallback — never a broken empty accordion */}
        {!hasContent && (
          <p className="italic text-muted">No content yet — check back soon.</p>
        )}
      </div>
    </details>
  );
}
