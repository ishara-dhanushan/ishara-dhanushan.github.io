// src/types/portfolio.ts
export interface Profile {
  name: string;
  initials: string;
  eyebrow: string;
  headline: string;
  roles: string[];
  summary: string;
  about: string[];
  location: string;
  email: string;
  resumeUrl: string;
  socials: {
    github: string;
    linkedin: string;
    medium: string;
  };
}

export interface ProofItem {
  label: string;
  value: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  stack: string[];
  summary: string;
  highlights: string[];
  logo?: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  video?: string;
  figma?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  ownership: string;
  summary: string;
  stack: string[];
  featured: boolean;
  hasCaseStudy: boolean;
  links: ProjectLinks;
}

export interface TechGroup {
  title: string;
  technologies: string[];
  evidence?: string;
}

export interface EducationEntry {
  level: string;
  institution: string;
  period: string;
  details: string;
}

export interface Credential {
  name: string;
  issuer: string;
}
