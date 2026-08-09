import { experiences } from "@data/exp";
import { projects } from "@data/projects";
/**
 * ============================================
 * PAGE CONTENT DATA
 * ============================================
 * All structured content for pages lives here.
 * Edit these arrays/objects to customize the template content.
 *
 * Replace placeholder images in src/assets/ with your own.
 */

export const site = {
  url: "https://example.com",
  meta: {
    title: "Alex Morgan | Full-stack engineer",
    description:
      "Portfolio example: shipping reliable web products with clear architecture, tests, and delivery practices.",
  },
  hero: {
    name: "Alex Morgan",
    role: "Full-stack engineer",
    tagline:
      "From product intent to production — pragmatic systems, accessible UI, and maintainable code.",
    contact:
      "Open to collaborations and senior IC roles on product-minded teams.",
    avatarSrc: "/favicon.svg",
    avatarAlt: "Alex Morgan",
  },
  about: {
    paragraphs: [
      "A brief, compelling introduction about who you are and what you do. Mention your core philosophy, your passion for building digital products, and your drive for creating efficient, high-impact solutions.",
      "I care about clear boundaries between modules, automated checks in CI, and documentation that helps the next contributor ship safely.",
      {
        heading: "Example focus areas",
        bullets: [
          "Designing APIs and client boundaries with typed contracts",
          "Performance budgets, caching, and pragmatic observability",
          "Shipping incrementally with feature flags and rollback-friendly deploys",
        ],
      },
      {
        heading: "Sample stack",
        techItems: ["TypeScript", "Astro", "Tailwind CSS", "Node", "Vitest"],
      },
    ],
  },
  experiences: experiences,
  featuredProjects: projects,

  projectArchivePage: {
    title: "All projects",
    description:
      "Project archive: dates, roles, and technologies across representative engagements.",
    intro: "A concise archive of engagements and representative work.",
  },
  projectArchive: [
    {
      date: "2025",
      project: "Design system rollout",
      role: "Frontend",
      techStack: "Astro, CSS, Storybook",
    },
    {
      date: "2024",
      project: "Checkout reliability",
      role: "Full-stack",
      techStack: "TypeScript, Postgres, Redis",
    },
    {
      date: "2024",
      project: "Auth hardening",
      role: "Backend",
      techStack: "OAuth2, JWT, rate limits",
    },
    {
      date: "2023",
      project: "Analytics pipeline",
      role: "Data",
      techStack: "SQL, dbt, warehouse",
    },
    {
      date: "2023",
      project: "Mobile web refresh",
      role: "Frontend",
      techStack: "HTML, CSS, a11y audits",
    },
  ],
  contact: {
    email: "hello@example.com",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
} as const;

export type ProjectArchiveRow = (typeof site.projectArchive)[number];
export type FeaturedProject = (typeof site.featuredProjects)[number];
