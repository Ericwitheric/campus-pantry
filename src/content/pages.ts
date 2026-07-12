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

// Page metadata + section content. Filled in per page — content pages first,
// with real staff content sourced from the 2026 Campus Pantry Manual and
// the Fall 2026 FAQ doc. Placeholder pages render a "Coming soon" fallback
// until sections are added.
export const pages: PageContent[] = [
  {
    slug: "about",
    title: "About The Pantry",
    category: "Content",
    heroImage: "/hero/about.jpeg",
    heroStyle: "photo",
    intro:
      "Campus Pantry is a UMD food security program in the Department of Dining Services, staffed by paid students and open to all UMD students, staff, and faculty. Below: where to find us, why we exist, what we do, and how our work supports UMD's sustainability commitments.",
    sections: [
      {
        id: "mission-vision-values",
        heading: "Mission, Vision & Values",
        body: `### Mission

To alleviate food hardship among UMD-College Park students, faculty, and staff by providing emergency food to UMD-College Park students, faculty, and staff in need.

### Vision

Eliminate food hardship at the UMD College Park campus.

### Values

- **Food Security.** We provide a safe space to distribute good-quality, nutritious emergency food to current UMD-College Park students, faculty, and staff. We create and promote a space dedicated to food donation collection. We raise awareness around hunger issues, especially as experienced by low-income college students.
- **Sustainability.** We collect good-quality, nutritious food item donations that may otherwise go to waste to enhance sustainability initiatives on campus.
- **Build Community.** We encourage student engagement to foster a sense of community, volunteerism, and service to peers on campus.`,
      },
      {
        id: "general-space-info",
        heading: "General Space Info",
        body: `**Location:** South Campus Dining Hall, 7093 Preinkert Drive, College Park, MD 20742. Ground floor. Visitor entrance is along the side of the building, below the cafe and convenience store.

**Access:** Active UMD ID required — swipe in to enter.

**Contact:**

- Phone: (301) 405-9579
- Email: [campuspantry@umd.edu](mailto:campuspantry@umd.edu)
- Website: [dining.umd.edu/sustainability/campus-pantry](https://dining.umd.edu/sustainability/campus-pantry)

### Hours

Closed when the campus is closed.

**Fall / Spring:**

- Students: Monday – Friday, 10 am – 5 pm
- Staff / Faculty: Monday, 12 pm – 5 pm

**Summer:**

- Students: Monday / Wednesday / Friday, 11 am – 4 pm
- Staff / Faculty: Monday, 12 pm – 4 pm`,
      },
      {
        id: "our-why",
        heading: "Our Why: Student Wellbeing & Waste Diversion",
        body: `The Campus Pantry addresses two related realities at UMD: **food insecurity** (per the USDA, when access to nutritionally adequate food is limited or uncertain) and **food hardship** (per the Food Research and Action Center, when a household has run out of money for food in the past 12 months).

The **Food Access and Student Well-Being Study** surveyed 4,901 UMD students — 12% of the 2017 campus enrollment. **20% reported food insecurity.** Food-insecure students also reported poorer physical health, lower self-esteem, and higher rates of anxiety, depression, anger, and loneliness. Academic impacts followed: trouble concentrating, failing exams, missing class, and withdrawing from courses.

Statewide, 640,180 Marylanders — roughly 1 in 10 — report food insecurity per Feeding America's 2019 Meal Gap Report, despite Maryland being one of the wealthiest states in the country.

Our work closes two loops at once: less waste, more nourishment. **Join us in creating a hunger-free UMD.**`,
      },
      {
        id: "how-we-support",
        heading: "How We Support Students' Essential Needs",
        body: `### Who we serve

Any UMD student, staff, or faculty member with an active UMD ID. No proof of income. No financial-status test. Self-disclosure of need is enough.

### How much you can take

All visitors: one bag per visit, up to 30 lb. One of each weekly special item (milk, juice, oil, protein, peanut butter). Students: unlimited visits. Staff / faculty: up to twice per month.

### Beyond the pantry

- **Resource Room.** Available to any current UMD student by reservation, Monday – Friday during operating hours.
- **Teaching Kitchen.** Open to the UMD community for cooking demonstrations and educational classes (2 – 3 main ingredients must come from the pantry). Contact the current manager to reserve.

### We employ student staff to run the pantry, which:

- Improves the financial situation of students
- Offers paid positions relevant to sustainability interests, so students don't have to take unpaid work in their field
- Provides a local job that doesn't require travel`,
      },
      {
        id: "meeting-sustainability-goals",
        heading: "Meeting UMD Sustainability Campus Goals",
        body: `The University of Maryland's **Climate Action Plan 2.0** (2017) commits the campus to institution-wide sustainability targets. Campus Pantry directly serves two of them: **Hunger Free UMD** and **Waste Minimization**.

### Hunger Free UMD

Campus Pantry is one of UMD's primary vehicles for the Hunger Free goal, providing emergency food to students, staff, and faculty experiencing food hardship. In partnership with the Department of Resident Life, we collect non-perishable donations from **Terp to Terp bins** in residential halls, campus donation drives, and individual donors. Every meal distributed here is a measurable step toward Hunger Free UMD.

### Waste Minimization

UMD is committed to **75% waste diversion** campus-wide as part of the Waste Minimization goal. In 2021, the Office of Sustainability's SustainableUMD Progress Hub reported the university diverted **68.17%** of solid waste from landfills. Campus Pantry supports this by accepting donations that might otherwise become waste — pantry-stable goods that residents can't take home at semester's end, packaged food nearing best-by dates, and surplus from donation drives.

### Global Impact

Diverting food from landfills prevents greenhouse gas emissions from food decomposition, avoids the water and energy embedded in producing replacement food, and lowers the environmental footprint of the community we serve. Local (a fed student) and global (a lighter climate footprint) impacts come from the same action.`,
      },
      {
        id: "supporting-sdgs",
        heading: "Supporting Sustainable Development Goals",
        body: `> "The 2030 Agenda for Sustainable Development, adopted by all United Nations Member States in 2015, provides a shared blueprint for peace and prosperity for people and the planet, now and into the future. At its heart are the 17 Sustainable Development Goals (SDGs), which are an urgent call for action by all countries — developed and developing — in a global partnership. They recognize that ending poverty and other deprivations must go hand-in-hand with strategies that improve health and education, reduce inequality, and spur economic growth — all while tackling climate change and working to preserve our oceans and forests." — *United Nations*

The University of Maryland is among many institutions globally working toward the 2030 vision. Campus operations staff address climate change, preserve aquatic ecosystems, and reduce inequalities; faculty and students conduct research across every SDG; organizations like UMD's chapter of Engineers Without Borders build sustainable development projects in under-resourced communities around the world.

Campus Pantry's contribution — direct food security work — sits within **SDG 2 (Zero Hunger)** and **SDG 12 (Responsible Consumption and Production)**.`,
      },
    ],
  },

  {
    slug: "faqs",
    title: "Staff FAQs",
    category: "People",
    intro:
      "Scripted answers for staff replying to visitor, donor, media, and volunteer inquiries. Match the tone shown here when responding via email or at the front desk.",
    sections: [
      {
        id: "schedule",
        heading: "What is the schedule for the pantry?",
        body: `The pantry is open Monday–Friday, 10 am–5 pm to distribute food. Staff and faculty hours are Monday, 12 pm–5 pm. In summer, student hours shift to Monday, Wednesday, and Friday, 11 am–4 pm. The pantry is closed if the campus is closed.

For live updates, check [Facebook](https://www.facebook.com/UMDCampusPantry) or the [Campus Pantry website](http://campuspantry.umd.edu/).`,
      },
      {
        id: "location",
        heading: "Where is the pantry located?",
        body: `Ground floor of the South Campus Dining Hall at 7093 Preinkert Drive, College Park, MD 20742. The visitor entrance is along the side of the building, below the cafe and convenience store.`,
      },
      {
        id: "appointment",
        heading: "Can I schedule an individual appointment?",
        body: `Yes. Email [campuspantry@umd.edu](mailto:campuspantry@umd.edu) and someone will meet you at the pantry. UMD staff and faculty are limited to two pantry visits per month.`,
      },
      {
        id: "qualifications",
        heading: "What qualifications are needed to access the pantry?",
        body: `An active University of Maryland ID. Bring it every visit, even if you've been before. **No proof of income or financial status is required** — self-disclosure of need is enough.`,
      },
      {
        id: "drop-off-donation",
        heading: "How do I drop off a food donation?",
        body: `Bring donations to the pantry Monday–Friday, 10 am–5 pm. Non-perishable food items only for drop-in. Medications (vitamin supplements, cough syrup, cough drops, allergy medication, other over-the-counter drugs) are not accepted.

For details on what's most needed, see "What items are needed at the pantry?" below.`,
      },
      {
        id: "pickup-donation",
        heading: "Can I schedule a pickup for my food donation?",
        body: `Yes. The pantry team collects donations from campus on **Monday afternoons, 1–4 pm**. To schedule:

1. Email [campuspantry@umd.edu](mailto:campuspantry@umd.edu) 24–48 hours in advance
2. Include a phone number for the pickup window
3. Bring the donation to the curb outside your building so it's accessible by car
4. Organize items into boxes or containers for easy transport
5. Help load the donation into the vehicle

If Monday doesn't work, drop-off during normal hours (Monday–Friday, 10 am–5 pm) is preferred.`,
      },
      {
        id: "financial-contribution",
        heading: "How do I make a financial contribution?",
        body: `Use the [Campus Pantry giving page](https://advancement.umd.edu/giving/fund.php?name=campus-pantry) to donate by credit card and receive an instant receipt. **Monetary donations are not accepted on-site** — direct all financial contributions through the giving link.`,
      },
      {
        id: "items-needed",
        heading: "What items are needed at the pantry?",
        body: `Reusable bags (cloth or sturdy plastic) are always welcome. Non-perishable food items in demand:

- Cooking ingredients (flour, spices, etc.)
- Canned fish, poultry, vegetables, and beans (no salt added preferred)
- Canned fruit (in juice / no sugar added preferred)
- Dry pasta, rice, cereal, or oatmeal
- Pasta sauce, peanut butter, jelly, or jam
- Baby food or formula
- Non-fat dry or canned milk
- Mixed nuts, dried fruit

Hygiene items are also accepted: shampoo, soap, diapers, deodorant, paper towels, feminine hygiene items.`,
      },
      {
        id: "perishable-expired",
        heading: "Do you accept perishable or expired food?",
        body: `Yes, as long as items are in the **original sealed packaging** — we make the final call on whether an item is servable once it arrives. **No dented cans or damaged packaging**, please.`,
      },
      {
        id: "food-drive",
        heading: "How do I organize a food drive for the pantry?",
        body: `Any office or student organization can run a food drive. Suggested steps:

1. Pick a donation collection site in your office or common space (front desk, central room)
2. Repurpose a supply box to collect donations and label it clearly
3. Promote via staff meetings, events, posters, flyers, or email
4. Optional: run a competition or incentive to boost participation
5. When collection wraps, schedule a Monday pickup (1–4 pm) or drop off at the pantry directly (Monday–Friday, 10 am–5 pm)`,
      },
      {
        id: "media-filming",
        heading: "I'm a journalist or student working on a story — can I film during a distribution day?",
        body: `No filming during open hours. **Visitor confidentiality** is a core operating principle: no student staff or visitors can appear on camera during distribution.

Email [campuspantry@umd.edu](mailto:campuspantry@umd.edu) to arrange an interview or a walkthrough tour outside of distribution hours. Staff can provide interviews and answer questions off-shift.`,
      },
      {
        id: "volunteer",
        heading: "How can I volunteer at the pantry?",
        body: `Individual volunteers: email [campuspantry@umd.edu](mailto:campuspantry@umd.edu) or check [Terps for Change](https://stamp.umd.edu/get_involved/leadership_community_servicelearning/terps_change) for volunteer opportunities.

Groups larger than five people: we recommend organizing a food drive instead of on-site shifts. Space is limited, and drives have more impact than a large group volunteering for a single shift.`,
      },
    ],
  },

  // Placeholder pages — full content lands per-page in Phase 4.
  { slug: "storefront-management",           title: "Storefront Management",category: "Operations", sections: [] },
  { slug: "storefront-management/inventory", title: "Storefront Inventory", category: "Operations", sections: [] },
  { slug: "volunteers",                      title: "Volunteers",           category: "People",     sections: [] },
  { slug: "appointments",                    title: "Staff Appointments",   category: "People",     sections: [] },
  { slug: "donations",                       title: "Donations",            category: "Operations", sections: [] },
  { slug: "compost-tracking",                title: "Compost Tracking",     category: "Operations", sections: [] },
  {
    slug: "teaching-kitchen",
    title: "Teaching Kitchen",
    category: "Content",
    intro:
      "A campus-community cooking and education space attached to the pantry — used for cooking demonstrations, educational classes, and hands-on food-prep sessions that connect pantry ingredients to student wellness.",
    sections: [
      {
        id: "about-teaching-kitchen",
        heading: "About the Teaching Kitchen",
        body: `The Teaching Kitchen is open to everyone in the UMD campus community.

**What it's for.** Cooking demonstrations, educational classes, and hands-on food-prep sessions.

**What it's not for.** Students who forgot to make their lunch or want to stop between classes — the kitchen isn't a walk-in dining option.

**One rule for cooking demos.** **2 – 3 of the main ingredients must come from the pantry.** Demos exist to show what pantry ingredients can turn into.`,
      },
      {
        id: "cooking-demo-videos",
        heading: "Cooking Demonstration Videos",
        intro:
          "Recorded demos featuring pantry ingredients, filmed in the Teaching Kitchen with Campus Pantry staff.",
        videos: [
          {
            youtubeId: "Ez_V_DEnosc",
            title: "Zero Waste Butternut Squash Soup Demo",
          },
          {
            youtubeId: "lnECbK0aU9E",
            title: "Chicken Pasta Bake Demo",
          },
        ],
      },
      {
        id: "how-to-reserve",
        heading: "How to Reserve",
        body: `Contact the current manager to reserve the Teaching Kitchen for a demonstration or class. Include the date, expected number of attendees, and the pantry ingredients you're planning to feature.`,
      },
    ],
  },
  { slug: "supplies",                        title: "Supplies",             category: "Operations", sections: [] },
  { slug: "resources",                       title: "Resources & Links",    category: "Content",    sections: [] },
  // TODO(onboarding): manager is sending onboarding videos to embed. Planned
  // sections: Welcome & Values, Schedule, Meetings & Shift Attendance,
  // Timesheets & Pay, Job Expectations (regular / shift lead / supervisor /
  // manager), Workplace Conduct, Social Media Use, Apparel Guidelines,
  // Feedback & Behavior, Safety Basics.
  //
  // Confirmed Social Media Use body content (approved by manager, save for
  // when we build the page):
  //
  //   Official Pantry messages should only be shared through approved social
  //   media accounts, typically as part of an individual's outlined job
  //   responsibilities. Exceptions include promoting job announcements,
  //   encouraging participation in Giving Day and other development
  //   activities, and promoting approved initiatives.
  //
  //   Campus guidelines for social media use for staff who are publishing
  //   and commenting on behalf of a UMD-affiliated account are available at
  //   https://brand.umd.edu/social-media-guidelines
  { slug: "onboarding",                      title: "Staff Onboarding",     category: "People",     sections: [] },
];

export function findPage(slug: string): PageContent | undefined {
  return pages.find((p) => p.slug === slug);
}
