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

export interface AccordionSection {
  id: string;
  heading: string;
  // Short lead-in shown above body/resources; plain text.
  intro?: string;
  // Rich markdown body: headings, bullets, links, blockquotes, bold, italic.
  // Rendered via react-markdown in AccordionSection.tsx.
  body?: string;
  // Link cards. Some sections (About / Staff FAQs) have body only, no cards;
  // Storefront Management etc. will have cards only.
  resources?: Resource[];
}

export type PageCategory = "Operations" | "People" | "Content";

export interface PageContent {
  slug: string;
  title: string;
  category: PageCategory;
  // Path served from public/ (e.g. /illustrations/about.svg).
  // Optional because most pages have no illustration yet — added per-page
  // in Phase 4 as unDraw SVGs are picked.
  heroImage?: string;
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
