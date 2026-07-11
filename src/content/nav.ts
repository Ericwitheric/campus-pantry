import type { PageCategory } from "./types";

export interface NavPage {
  slug: string;
  title: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  category: PageCategory;
  pages: NavPage[];
}

// Single source of truth for site navigation.
// Consumed by MegaMenu (desktop dropdown) and MobileNav (fullscreen panel)
// in Phase 2 — no duplicated arrays, no drift between desktop and mobile.
// Adding or renaming a page happens here and everywhere reflects it.
export const nav: NavGroup[] = [
  {
    category: "Operations",
    pages: [
      { slug: "storefront-management", title: "Storefront Management", href: "/storefront-management" },
      { slug: "storefront-management/inventory", title: "Storefront Inventory", href: "/storefront-management/inventory" },
      { slug: "supplies", title: "Supplies", href: "/supplies" },
      { slug: "donations", title: "Donations", href: "/donations" },
      { slug: "compost-tracking", title: "Compost Tracking", href: "/compost-tracking" },
    ],
  },
  {
    category: "People",
    pages: [
      { slug: "faqs", title: "Staff FAQs", href: "/faqs" },
      { slug: "volunteers", title: "Volunteers", href: "/volunteers" },
      { slug: "appointments", title: "Staff Appointments", href: "/appointments" },
    ],
  },
  {
    category: "Content",
    pages: [
      { slug: "about", title: "About The Pantry", href: "/about" },
      { slug: "teaching-kitchen", title: "Teaching Kitchen", href: "/teaching-kitchen" },
      { slug: "resources", title: "Resources & Links", href: "/resources" },
    ],
  },
];

// Onboarding is intentionally NOT in the categorized nav — it's a top-level
// header link (Phase 5 gives it a dedicated route + special layout).
export const onboardingNav: NavPage = {
  slug: "onboarding",
  title: "Staff Onboarding",
  href: "/onboarding",
};
