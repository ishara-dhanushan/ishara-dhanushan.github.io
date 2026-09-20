// src/data/portfolio.ts
import { assetPrefix } from "@/utils/assetPrefix";
import type {
  Credential,
  EducationEntry,
  Experience,
  Profile,
  ProofItem,
  Project,
  TechGroup,
} from "@/types/portfolio";

// TODO: replace placeholder email/social/resume links with verified values before launch.
export const profile: Profile = {
  name: "Ishara Dhanushan",
  initials: "ID",
  eyebrow: "Software Engineer • Full-Stack Development",
  headline: "Building reliable web products and scalable application systems.",
  roles: [
    "Full-Stack Developer",
    "Software Engineer",
    "Backend & API Developer",
  ],
  summary:
    "Fourth-year Software Engineering undergraduate with hands-on experience in production web applications, REST APIs, Chrome extensions, secure integrations, and agile delivery.",
  about: [
    "Fourth-year Software Engineering undergraduate based in Kurunegala, Sri Lanka, with practical experience across full-stack web applications, REST APIs, browser extensions, and mobile applications built during a software-engineering internship and a range of individual, group, and client projects.",

    "I care about writing maintainable, well-tested code and building products that are genuinely useful to the people who use them. I work well in agile, Git-based teams and I'm always looking for the next thing to learn.",

    "Most of my recent work has focused on TypeScript, React and Next.js on the frontend, Node.js and NestJS on the backend, and PostgreSQL or MongoDB for data. I enjoy working across the full delivery path—from turning product requirements and UI designs into features to API design, debugging, deployment, and release verification.",
  ],
  location: "Kurunegala, Sri Lanka",
  email: "isharadh2002@gmail.com",
  resumeUrl: `${assetPrefix}/documents/ishara-dhanushan-cv.pdf`,
  socials: {
    github: "https://github.com/ishara-dhanushan",
    linkedin: "https://www.linkedin.com/in/ishara-dhanushan",
    medium: "https://medium.com/@isharadh2002",
  },
};

export const proofItems: ProofItem[] = [
  { label: "Experience", value: "6-month Software Engineering internship" },
  {
    label: "Delivery",
    value: "Production web applications and Chrome extensions",
  },
  { label: "Core stack", value: "Next.js, React, TypeScript, Node.js, NestJS" },
  { label: "Backend", value: "REST APIs, JWT, RBAC, PostgreSQL, MongoDB" },
  {
    label: "Academics",
    value: "B.Sc. Software Engineering; current GPA 3.51/4.00",
  },
];

export const experience: Experience = {
  role: "Software Engineering Intern",
  company: "ByteSquad Labs",
  period: "September 2025 – March 2026",
  stack: ["Next.js", "React", "TypeScript", "Node.js", "Express.js", "MongoDB"],
  summary:
    "Contributed to production-grade web applications and browser extensions involving REST APIs, secure integrations, analytics, user workflows, and agile delivery.",
  highlights: [
    "Implemented and improved full-stack product features across frontend and backend modules.",
    "Integrated third-party APIs and secure transaction or access-control workflows.",
    "Built responsive interfaces, browser-extension interactions, streaming data experiences, and state-management improvements.",
    "Debugged and refactored existing code, improved maintainability, and resolved integration issues.",
    "Translated Figma designs into working interfaces and refined usability based on product requirements.",
    "Worked in Jira-based sprints using Git collaboration, code reviews, environment configuration, and release verification.",
  ],
};

export const projects: Project[] = [
  {
    slug: "constructpro",
    title: "ConstructPro ERP",
    category: "Web / ERP",
    ownership: "Group, ongoing",
    summary:
      "Construction management ERP with modular architecture and role-based workflows.",
    stack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Docker",
    ],
    featured: true,
    hasCaseStudy: true,
    links: {},
  },
  {
    slug: "kochi-guru-pizza",
    title: "Kochi Guru Pizza",
    category: "Web",
    ownership: "Client, ongoing",
    summary:
      "Client ordering platform covering menu, cart, checkout, and admin workflows.",
    stack: ["Next.js", "Express.js", "MongoDB", "JWT"],
    featured: true,
    hasCaseStudy: true,
    links: {},
  },
  {
    slug: "fuelwise",
    title: "FuelWise.lk",
    category: "Web & Mobile",
    ownership: "Group",
    summary:
      "Multi-role fuel-quota tracking system across web, mobile, and admin clients.",
    stack: ["Spring Boot", "React", "Flutter", "MySQL"],
    featured: true,
    hasCaseStudy: true,
    links: {},
  },
  {
    slug: "brewhub",
    title: "BrewHub",
    category: "Web",
    ownership: "Individual",
    summary:
      "Responsive ordering app with menu browsing, cart, and authenticated checkout.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    featured: false,
    hasCaseStudy: false,
    links: {},
  },
  {
    slug: "advertisement-lk",
    title: "Advertisement.lk",
    category: "Web",
    ownership: "Group / Client",
    summary:
      "Advertisement management platform with payment-based listing boosts.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    featured: false,
    hasCaseStudy: false,
    links: {},
  },
  {
    slug: "multi-role-user-registration",
    title: "Multi-Role User Registration",
    category: "Web",
    ownership: "Individual",
    summary:
      "Role-based access-control system built around SOLID and design-pattern practice.",
    stack: ["Spring Boot", "Next.js", "Java", "MySQL"],
    featured: false,
    hasCaseStudy: false,
    links: {},
  },
  {
    slug: "findyourmechanic-lk",
    title: "FindYourMechanic.lk",
    category: "Web",
    ownership: "Group",
    summary:
      "Mechanic discovery and booking platform with role-based workflows.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    featured: false,
    hasCaseStudy: false,
    links: {},
  },
  {
    slug: "finance-tracker-app",
    title: "Finance Tracker App",
    category: "Mobile",
    ownership: "Individual",
    summary: "Budget-planning app with sync and financial insights.",
    stack: ["Flutter", "Firebase", "Provider"],
    featured: false,
    hasCaseStudy: false,
    links: {},
  },
  {
    slug: "taskmaster",
    title: "TaskMaster",
    category: "Mobile",
    ownership: "Individual",
    summary:
      "Task creation and completion tracking app with local persistence.",
    stack: ["React Native", "Zustand", "AsyncStorage"],
    featured: false,
    hasCaseStudy: false,
    links: {},
  },
  {
    slug: "habitbuddy",
    title: "HabitBuddy",
    category: "Mobile",
    ownership: "Individual",
    summary: "Habit-tracking app with authentication and persistent streaks.",
    stack: ["React Native", "Zustand", "AsyncStorage"],
    featured: false,
    hasCaseStudy: false,
    links: {},
  },
  {
    slug: "bookhub",
    title: "BookHub",
    category: "UI/UX",
    ownership: "Group",
    summary:
      "Book-borrowing dashboard and navigation flow designed as a Figma prototype.",
    stack: ["Figma"],
    featured: false,
    hasCaseStudy: false,
    links: {},
  },
];

// The visually emphasized "Core Stack" row shown above the grouped tech cards.
export const coreStack: string[] = [
  "TypeScript",
  "Next.js",
  "React.js",
  "Node.js",
  "Express.js / NestJS",
  "PostgreSQL",
  "MongoDB",
];

export const techGroups: TechGroup[] = [
  {
    title: "Backend and APIs",
    technologies: [
      "Node.js",
      "Express.js",
      "NestJS",
      "Spring Boot",
      "REST APIs",
    ],
    evidence:
      "Internship production work, ConstructPro ERP, Kochi Guru Pizza, FuelWise.lk.",
  },
  {
    title: "Databases and data access",
    technologies: ["PostgreSQL", "MongoDB", "MySQL", "Firebase", "Prisma"],
    evidence: "Used across ERP, client, and internship applications.",
  },
  {
    title: "Mobile development",
    technologies: [
      "React Native",
      "Flutter",
      "Dart",
      "Zustand",
      "AsyncStorage",
      "Provider",
    ],
    evidence:
      "TaskMaster, HabitBuddy, Finance Tracker App, FuelWise.lk mobile client.",
  },
  {
    title: "Architecture and security",
    technologies: [
      "JWT",
      "RBAC",
      "Modular services",
      "Microservices",
      "SOLID",
      "Design patterns",
    ],
    evidence:
      "ConstructPro ERP, Multi-Role User Registration, secure internship API work.",
  },
  {
    title: "Tools and delivery",
    technologies: [
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "Jira",
      "Vercel",
      "Neon",
      "Figma",
    ],
    evidence:
      "Version control, testing, sprint delivery, and deployment workflows.",
  },
];

export const capabilities: string[] = [
  "Maintainable component, module, and service structure.",
  "Protected APIs, input validation, and consistent error handling.",
  "Authentication and role-based authorization.",
  "REST API design and third-party integration workflows.",
  "Debugging, refactoring, and incremental codebase improvement.",
  "Responsive UI implementation from Figma designs.",
  "Git-based collaboration, code review, and sprint-based delivery.",
  "Static deployment, environment configuration, and release verification.",
];

export const education: EducationEntry[] = [
  {
    level: "B.Sc. (Hons.) Software Engineering",
    institution: "University of Kelaniya, Sri Lanka",
    period: "July 2023 – Present",
    details:
      "Current GPA: 3.51/4.00. Academic domains: Advanced Web Applications, Mobile Computing Applications, and Data Science & Engineering Applications.",
  },
  {
    level: "GCE Advanced Level — Physical Science Stream",
    institution: "Sri Sumangala College, Wariyapola",
    period: "2019 – 2022",
    details:
      "Z-Score: 1.61. Combined Mathematics: B, Physics: A, Chemistry: B.",
  },
];

export const credentials: Credential[] = [
  { name: "Java Object-Oriented Programming", issuer: "LinkedIn Learning" },
  { name: "GitHub Foundation", issuer: "GitHub" },
  { name: "Flutter & Dart for Beginners", issuer: "Udemy" },
];
