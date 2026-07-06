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
  intro?: string;
  resources: Resource[];
}

export type PageCategory = "Operations" | "People" | "Content";

export interface PageContent {
  slug: string;
  title: string;
  category: PageCategory;
  heroImage: string;
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
