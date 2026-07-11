import type { HomeTileEntry, PageContent } from "./types";

// Ordered tile grid on the home page. Order is independent of nav grouping
// so we can prioritize what staff hit most often (e.g., Storefront Management
// first, Onboarding last as a "for new hires" call-to-action).
export const homeTiles: HomeTileEntry[] = [
  { title: "About The Pantry",     href: "/about",                              illustration: "/illustrations/about.svg" },
  { title: "Staff FAQs",           href: "/faqs",                               illustration: "/illustrations/faqs.svg" },
  { title: "Storefront Management",href: "/storefront-management",              illustration: "/illustrations/storefront.svg" },
  { title: "Storefront Inventory", href: "/storefront-management/inventory",    illustration: "/illustrations/inventory.svg" },
  { title: "Volunteers",           href: "/volunteers",                         illustration: "/illustrations/volunteers.svg" },
  { title: "Staff Appointments",   href: "/appointments",                       illustration: "/illustrations/appointments.svg" },
  { title: "Donations",            href: "/donations",                          illustration: "/illustrations/donations.svg" },
  { title: "Compost Tracking",     href: "/compost-tracking",                   illustration: "/illustrations/compost.svg" },
  { title: "Teaching Kitchen",     href: "/teaching-kitchen",                   illustration: "/illustrations/teaching-kitchen.svg" },
  { title: "Supplies",             href: "/supplies",                           illustration: "/illustrations/supplies.svg" },
  { title: "Resources & Links",    href: "/resources",                          illustration: "/illustrations/resources.svg" },
  { title: "Staff Onboarding",     href: "/onboarding",                         illustration: "/illustrations/onboarding.svg" },
];

// Placeholder subpage metadata. Sections + resources fill in one page at a
// time in Phase 4 (the user provides content per page as we go).
// The dynamic catch-all route reads title / category / heroImage from here
// and renders a "Coming soon" placeholder until sections are populated.
export const pages: PageContent[] = [
  { slug: "about",                          title: "About The Pantry",     category: "Content",    heroImage: "/illustrations/about.svg",           sections: [] },
  { slug: "faqs",                           title: "Staff FAQs",           category: "People",     heroImage: "/illustrations/faqs.svg",            sections: [] },
  { slug: "storefront-management",          title: "Storefront Management",category: "Operations", heroImage: "/illustrations/storefront.svg",      sections: [] },
  { slug: "storefront-management/inventory",title: "Storefront Inventory", category: "Operations", heroImage: "/illustrations/inventory.svg",       sections: [] },
  { slug: "volunteers",                     title: "Volunteers",           category: "People",     heroImage: "/illustrations/volunteers.svg",      sections: [] },
  { slug: "appointments",                   title: "Staff Appointments",   category: "People",     heroImage: "/illustrations/appointments.svg",    sections: [] },
  { slug: "donations",                      title: "Donations",            category: "Operations", heroImage: "/illustrations/donations.svg",       sections: [] },
  { slug: "compost-tracking",               title: "Compost Tracking",     category: "Operations", heroImage: "/illustrations/compost.svg",         sections: [] },
  { slug: "teaching-kitchen",               title: "Teaching Kitchen",     category: "Content",    heroImage: "/illustrations/teaching-kitchen.svg",sections: [] },
  { slug: "supplies",                       title: "Supplies",             category: "Operations", heroImage: "/illustrations/supplies.svg",        sections: [] },
  { slug: "resources",                      title: "Resources & Links",    category: "Content",    heroImage: "/illustrations/resources.svg",       sections: [] },
  { slug: "onboarding",                     title: "Staff Onboarding",     category: "People",     heroImage: "/illustrations/onboarding.svg",      sections: [] },
];

export function findPage(slug: string): PageContent | undefined {
  return pages.find((p) => p.slug === slug);
}
