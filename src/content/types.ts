export type ResourceType =
  | "google-doc"
  | "google-sheet"
  | "youtube"
  | "pdf"
  | "external";

export interface Resource {
  title: string;
  description?: string;
  href: string;
  type: ResourceType;
}

export interface VideoEmbed {
  // 11-char YouTube video ID (from a URL like watch?v=<id> or youtu.be/<id>).
  // Storing the ID rather than the URL keeps the data clean and lets us swap
  // to youtube-nocookie.com automatically for privacy.
  youtubeId: string;
  title: string;
  description?: string;
}

export interface AccordionSection {
  id: string;
  heading: string;
  // Short lead-in shown above body/videos/resources; plain text.
  intro?: string;
  // Rich markdown body: headings, bullets, links, blockquotes, bold, italic.
  // Rendered via react-markdown in AccordionSection.tsx.
  body?: string;
  // Inline video embeds (YouTube), rendered below body, above resources.
  // Responsive 16:9 grid — 1 col mobile, 2 col desktop.
  videos?: VideoEmbed[];
  // Link cards. Some sections (About / Staff FAQs) have body only, no cards;
  // Storefront Management etc. will have cards only.
  resources?: Resource[];
}

export type PageCategory = "Operations" | "People" | "Content";

export interface PageContent {
  slug: string;
  title: string;
  category: PageCategory;
  // Path served from public/ (e.g. /hero/about.jpeg or /illustrations/about.svg).
  // Optional because most pages have no image yet.
  heroImage?: string;
  // How to render the hero image.
  //   "photo"        — full-bleed background photo + dark overlay + centered
  //                    white title (used for real pantry photos)
  //   "illustration" — side-by-side layout with the image on the right (used
  //                    for unDraw SVGs once we pick them)
  // Defaults to the plain text hero when neither heroImage nor heroStyle is set.
  heroStyle?: "photo" | "illustration";
  intro?: string;
  sections: AccordionSection[];
}

export interface OnboardingPhase {
  id: string;
  title: string;
  intro?: string;
  resources: Resource[];
}

export interface HomeTileEntry {
  title: string;
  href: string;
  external?: boolean;
  illustration: string;
  description?: string;
}
