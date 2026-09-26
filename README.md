<div align="center">

# Ishara Dhanushan — Portfolio

My personal software engineering portfolio, built with **Next.js, React, TypeScript, and Tailwind CSS**.

It brings together my experience, education, projects, technical skills, certifications, and software engineering articles in one place.

[![Next.js](https://img.shields.io/badge/NEXT.JS_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/REACT_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TYPESCRIPT_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TAILWIND_CSS_4-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com)

<br />

<p>
  <a href="https://ishara-dhanushan.github.io">🌐 <strong>Portfolio</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="https://github.com/ishara-dhanushan">
    <img src="./public/logos/github-white-icon.svg" width="16" height="16" alt="GitHub" />
    <strong> GitHub</strong>
  </a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/ishara-dhanushan">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original.svg" width="16" height="16" alt="LinkedIn" />
    <strong> LinkedIn</strong>
  </a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="https://medium.com/@isharadh2002">
    <img src="https://cdn.simpleicons.org/medium/FFFFFF" width="16" height="16" alt="Medium" />
    <strong> Medium</strong>
  </a>
</p>

</div>

---

## About the Portfolio

I built this portfolio to present my software engineering work in a clean and practical way.

The main page provides a quick overview of my background, experience, projects, technical stack, education, and certifications. Selected projects also have dedicated case-study pages where I can go into more detail about architecture, implementation decisions, challenges, and my contribution.

The site is designed as a mostly static application and is deployed through GitHub Pages.

## Highlights

- Responsive single-page portfolio
- Dedicated case studies for selected projects
- Centralized portfolio data structure
- Dynamically loaded Medium articles
- Static export for GitHub Pages
- SEO metadata and canonical URLs
- Open Graph metadata and generated social preview images
- Sitemap and `robots.txt`
- Schema.org `Person` structured data
- Responsive animations with reduced-motion support
- Automated formatting, linting, build checks, and deployment

## Featured Projects

### ConstructPro ERP

A construction management ERP with modular backend services, role-based workflows, finance features, analytics, and project management functionality.

**Stack:** Next.js, TypeScript, NestJS, PostgreSQL, Prisma, Docker

🌐 [View Case Study](https://ishara-dhanushan.github.io/projects/constructpro) &nbsp;·&nbsp; <img src="./public/logos/github-white-icon.svg" width="16" height="16" alt="GitHub" /> [Source Repositories](https://github.com/orgs/ConstructPro-ERP/repositories)

---

### Kochi Guru Pizza

A client web application for a pizza business with authentication, menu management, media handling, and administrative workflows.

**Stack:** Next.js, Express.js, MongoDB, JWT

🌐 [View Case Study](https://ishara-dhanushan.github.io/projects/kochi-guru-pizza) &nbsp;·&nbsp; <img src="./public/logos/github-white-icon.svg" width="16" height="16" alt="GitHub" /> [Repository](https://github.com/ishara-dhanushan/kochi-guru-pizza)

---

### FuelWise.lk

A multi-role fuel quota management system with separate web, mobile, and backend applications.

**Stack:** Spring Boot, React, Flutter, MySQL

🌐 [View Case Study](https://ishara-dhanushan.github.io/projects/fuelwise) &nbsp;·&nbsp; <img src="./public/logos/github-white-icon.svg" width="16" height="16" alt="GitHub" /> [Repository](https://github.com/MininduBimsara/FuelWiseLK)

## Built With

| Area       | Technologies                 |
| ---------- | ---------------------------- |
| Framework  | Next.js 16                   |
| Frontend   | React 19, TypeScript         |
| Styling    | Tailwind CSS 4               |
| Animation  | Framer Motion                |
| Icons      | Lucide React                 |
| Formatting | Prettier                     |
| Linting    | ESLint                       |
| Deployment | GitHub Actions, GitHub Pages |

The project also uses the Next.js React Compiler.

## Project Structure

The project is organized by responsibility so the portfolio content, page composition, reusable UI, integrations, and deployment logic remain separate.

```text
.
├── .github/
│   └── workflows/
│       ├── deploy.yml                 # Builds and deploys the production site to GitHub Pages
│       └── pr-check.yml               # Runs formatting, linting, and build checks for pull requests
│
├── public/                             # Static assets such as images, logos, documents, and the CV
│
├── src/
│   ├── app/                            # Next.js App Router pages, global metadata, and SEO routes
│   │   ├── projects/                   # Dedicated project case-study routes
│   │   │   ├── constructpro/
│   │   │   │   └── page.tsx           # ConstructPro ERP case-study page
│   │   │   ├── fuelwise/
│   │   │   │   └── page.tsx           # FuelWise.lk case-study page
│   │   │   └── kochi-guru-pizza/
│   │   │       └── page.tsx           # Kochi Guru Pizza case-study page
│   │   │
│   │   ├── globals.css                 # Global styles, theme tokens, typography, and shared layout rules
│   │   ├── layout.tsx                  # Root layout, fonts, shared shell, and global SEO metadata
│   │   ├── page.tsx                    # Main portfolio page and section composition
│   │   ├── opengraph-image.tsx         # Default Open Graph image for the portfolio
│   │   ├── robots.ts                   # Generates robots.txt
│   │   └── sitemap.ts                  # Generates sitemap.xml from portfolio routes
│   │
│   ├── components/
│   │   ├── articles/                   # Medium article cards and runtime article feed UI
│   │   ├── background/                 # Animated portfolio background
│   │   ├── case-study/                 # Reusable case-study sections, flows, metrics, and navigation
│   │   ├── layout/                     # Shared page layout components
│   │   │   ├── Header.tsx              # Main desktop navigation and header behaviour
│   │   │   ├── MobileMenu.tsx          # Responsive mobile navigation
│   │   │   └── Footer.tsx              # Footer and scroll-to-top interaction
│   │   ├── motion/                     # Scroll reveal and motion-related components
│   │   ├── projects/                   # Project cards used on the main portfolio page
│   │   ├── sections/                   # Individual sections of the homepage
│   │   │   ├── HeroSection.tsx         # Main introduction, roles, and primary actions
│   │   │   ├── AboutSection.tsx        # About section
│   │   │   ├── EducationSection.tsx    # Education and academic details
│   │   │   ├── ExperienceSection.tsx   # Professional experience
│   │   │   ├── ProjectsSection.tsx     # Featured and supporting project presentation
│   │   │   ├── TechStackSection.tsx    # Technologies grouped by engineering area
│   │   │   ├── MediumPostsSection.tsx  # Latest Medium articles section
│   │   │   └── ContactSection.tsx      # Contact links and final call to action
│   │   ├── seo/
│   │   │   └── PersonJsonLd.tsx        # Schema.org Person structured data
│   │   └── ui/                         # Small reusable UI components
│   │
│   ├── data/
│   │   └── portfolio.ts                # Main source of portfolio content: profile, projects, skills, etc.
│   │
│   ├── lib/
│   │   ├── medium-feed.ts              # Fetches, validates, formats, caches, and falls back Medium posts
│   │   └── og-image.tsx                # Shared Open Graph image generation logic
│   │
│   ├── types/
│   │   └── portfolio.ts                # TypeScript models for portfolio data
│   │
│   └── utils/
│       ├── assetPrefix.ts              # Handles GitHub Pages asset/base path configuration
│       └── scrollToSection.ts          # Shared section navigation and scrolling logic
│
├── next.config.ts                      # Next.js configuration and static-export settings
├── package.json                        # Dependencies and development/build scripts
└── README.md                           # Project documentation
```

### Key Files

The files I work with most when updating or extending the portfolio are:

| File                                          | Purpose                                                                                                                            |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/portfolio.ts`                       | Central source of portfolio content including profile information, projects, experience, education, technologies, and credentials. |
| `src/app/page.tsx`                            | Composes the main portfolio sections in their final page order.                                                                    |
| `src/app/layout.tsx`                          | Defines the global application shell, fonts, metadata, header, footer, background, and structured data.                            |
| `src/app/projects/*/page.tsx`                 | Contains the detailed content and structure for each featured project case study.                                                  |
| `src/components/sections/ProjectsSection.tsx` | Controls how featured and supporting projects are presented on the homepage.                                                       |
| `src/components/layout/Header.tsx`            | Handles the main navigation and desktop header interactions.                                                                       |
| `src/lib/medium-feed.ts`                      | Handles the runtime Medium integration, normalization, caching, timeout, and fallback behaviour.                                   |
| `src/components/seo/PersonJsonLd.tsx`         | Adds Schema.org structured data describing the portfolio owner.                                                                    |
| `src/app/sitemap.ts`                          | Generates the site's sitemap from the portfolio routes.                                                                            |
| `src/lib/og-image.tsx`                        | Provides shared logic used to generate social preview images.                                                                      |
| `src/utils/assetPrefix.ts`                    | Keeps assets and routes working correctly when deployed through GitHub Pages.                                                      |
| `next.config.ts`                              | Controls the Next.js build, static export, asset prefix, base path, and image behaviour.                                           |
| `.github/workflows/deploy.yml`                | Runs the production CI/CD pipeline and publishes the generated static site to GitHub Pages.                                        |
| `.github/workflows/pr-check.yml`              | Validates pull requests with formatting, linting, and production build checks.                                                     |

For normal content updates, `src/data/portfolio.ts` is usually the main file that needs to be changed.

## Medium Integration

The portfolio loads my latest Medium articles dynamically in the browser.

This is intentionally kept separate from the static build so publishing a new Medium article does not require rebuilding the portfolio.

The feed implementation includes:

- Client-side fetching
- Response validation and normalization
- Local storage caching
- Request timeout handling
- Cached fallback data
- Loading, empty, and error states

## SEO

The portfolio includes:

- Page-specific metadata
- Canonical URLs
- Open Graph metadata
- Twitter card metadata
- Generated Open Graph images
- `sitemap.xml`
- `robots.txt`
- Schema.org `Person` JSON-LD

## Running Locally

Clone the repository:

```bash
git clone https://github.com/ishara-dhanushan/ishara-dhanushan.github.io.git
cd ishara-dhanushan.github.io
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Creates the production build.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run format
```

Formats the project using Prettier.

```bash
npm run format:check
```

Checks formatting without modifying files.

## Environment Variables

The deployment supports the following variables:

```env
NEXT_PUBLIC_IS_EXPORT=true
NEXT_PUBLIC_ASSET_PREFIX=/my-portfolio
NEXT_PUBLIC_MEDIUM_FEED_API_URL=https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@isharadh2002
```

### `NEXT_PUBLIC_IS_EXPORT`

Enables static export mode for GitHub Pages.

### `NEXT_PUBLIC_ASSET_PREFIX`

Used when the application is deployed under a GitHub Pages repository subpath.

### `NEXT_PUBLIC_MEDIUM_FEED_API_URL`

Public API endpoint used to retrieve the Medium article feed.

## Deployment

The portfolio is automatically deployed to **GitHub Pages** through GitHub Actions.

The deployment workflow runs when changes are pushed to `main`.

```text
Push to main
      │
      ▼
Install dependencies
      │
      ▼
Formatting check
      │
      ▼
  Lint check
      │
      ▼
Production build
      │
      ▼
Static export
      │
      ▼
GitHub Pages
```

Pull requests to `main` also run formatting, linting, and build checks before changes are merged.

## Contact

<div align="center">

Feel free to connect with me or explore more of my work.

<br />

<a href="https://ishara-dhanushan.github.io">🌐 <strong>Portfolio</strong></a>
&nbsp;&nbsp;·&nbsp;&nbsp;
<a href="https://github.com/ishara-dhanushan">
<img src="./public/logos/github-white-icon.svg" width="16" height="16" alt="GitHub" />
<strong> GitHub</strong>
</a>
&nbsp;&nbsp;·&nbsp;&nbsp;
<a href="https://www.linkedin.com/in/ishara-dhanushan">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original.svg" width="16" height="16" alt="LinkedIn" />
<strong> LinkedIn</strong>
</a>
&nbsp;&nbsp;·&nbsp;&nbsp;
<a href="https://medium.com/@isharadh2002">
<img src="https://cdn.simpleicons.org/medium/FFFFFF" width="16" height="16" alt="Medium" />
<strong> Medium</strong>
</a>

</div>

---

<div align="center">

Built and maintained by **Ishara Dhanushan**

</div>
