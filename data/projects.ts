import { type Project } from "types/project";

export const projects: Project[] = [
  {
    title: "Lumen Studio Website",
    period: "2025",
    summary:
      "Built a polished portfolio experience with accessible UI, motion-led interactions, and reusable components.",
    solution:
      "Designed a modular component system with Astro and Tailwind CSS, ensuring consistent brand experience across all breakpoints.",
    impact:
      "Achieved sub-1s page load metrics and 95+ Lighthouse scores through optimized asset delivery and lazy loading strategies.",
    image: "astro-01.webp",
    imageAlt: "Lumen Studio website showcase",
    techCategories: [
      {
        category: "Frontend",
        items: ["TypeScript", "Astro", "Tailwind CSS", "Responsive Design"],
      },
      {
        category: "Performance",
        items: ["Asset Optimization", "Lazy Loading", "Image CDN"],
      },
    ],
  },

  {
    title: "Nova Launch Marketing Platform",
    period: "2024",
    summary:
      "Delivered a modular marketing site and interactive product showcase for a launch-ready SaaS brand.",
    solution:
      "Implemented a content-driven architecture with reusable card components and dynamic project pages, enabling non-technical content updates.",
    impact:
      "Reduced content update time by 80% through intuitive component-based structure; enabled marketing team independence.",
    image: "astro-02.jpeg",
    imageAlt: "Nova Launch platform interface",
    techCategories: [
      {
        category: "Frontend",
        items: ["Astro", "TypeScript", "Tailwind CSS"],
      },
      {
        category: "Developer Experience",
        items: ["Vite", "ESLint", "Automated Testing"],
      },
    ],
  },
];
