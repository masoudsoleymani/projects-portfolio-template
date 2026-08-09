interface TechCategory {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  period: string;
  summary: string;
  solution: string;
  impact: string;
  image: string;
  imageAlt: string;
  techCategories: TechCategory[];
}
