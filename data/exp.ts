import { type Experience } from "types/experience";

export const experiences: Experience[] = [
  {
    period: "2025",
    title: "Lead Product Designer",
    company: "Lumen Studio",
    summary:
      "Built a polished portfolio experience with accessible UI, motion-led interactions, and reusable components.",
    highlights: [
      "Designed and shipped the complete website using Astro, Tailwind CSS, and content-driven components",
      "Crafted consistent responsive layouts and accessible typography across desktop and mobile",
      "Optimized asset delivery and performance for sub-1s page load metrics",
    ],
    tech: ["TypeScript", "Astro", "Tailwind CSS", "Node", "Vite"],
  },

  {
    period: "2024",
    title: "Frontend Architect",
    company: "Nova Launch",
    summary:
      "Delivered a modular marketing site and interactive product showcase for a launch-ready SaaS brand.",
    highlights: [
      "Implemented a component-based design system with reusable cards, buttons, and hero sections",
      "Built content-driven project pages, archive views, and client-side navigation enhancements",
      "Added cross-browser polish and performance tuning with image optimization and lazy loading",
    ],
    tech: ["Astro", "TypeScript", "Tailwind CSS", "Node", "Vite"],
  },

  {
    period: "2023",
    title: "UI Engineer",
    company: "Orbital Creative",
    summary:
      "Created an interactive product showcase with a clean visual system and accessible component library.",
    highlights: [
      "Built a flexible project card system for content updates without code changes",
      "Improved brand consistency with typography, color, and motion guidelines",
      "Added testing and quality checks for cross-device UI fidelity",
    ],
    tech: ["Astro", "Tailwind CSS", "JavaScript", "Node", "Vitest"],
  },
];
