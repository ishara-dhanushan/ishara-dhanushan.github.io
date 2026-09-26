// src/app/projects/constructpro/page.tsx
import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";
import { CaseStudyCompare } from "@/components/case-study/CaseStudyCompare";
import { CaseStudyFlow } from "@/components/case-study/CaseStudyFlow";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudyMetric } from "@/components/case-study/CaseStudyMetric";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { getProjectBySlug } from "@/data/portfolio";

const title = "ConstructPro ERP Case Study";
const description =
  "Engineering case study for ConstructPro ERP, covering NestJS services, quotation-to-project workflows, Prisma migrations, Neon PostgreSQL, authentication, testing, and delivery.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects/constructpro" },
  openGraph: {
    title,
    description,
    url: "/projects/constructpro",
    type: "article",
  },
  twitter: { card: "summary_large_image", title, description },
};

const project = getProjectBySlug("constructpro");

export default function ConstructProCaseStudyPage() {
  return (
    <main>
      <CaseStudyHero
        eyebrow="Case Study · ERP / Full-Stack Engineering"
        title="ConstructPro ERP"
        description="A construction-management ERP for Ishara Homes that connects lead and quotation workflows with project operations, finance, analytics, document handling, and role-aware access."
        role="Full-Stack / Backend Developer"
        scope="University group project"
        status="Ongoing"
        stack={[
          "Next.js",
          "TypeScript",
          "NestJS",
          "Prisma",
          "PostgreSQL",
          "Neon",
          "Vercel",
        ]}
        links={project.links}
        focus={[
          "Cross-service business workflows and domain boundaries.",
          "Prisma migrations and Neon database evolution.",
          "Concurrency-safe quotation-to-project conversion.",
          "Authentication, CI/CD, testing, and deployment behavior.",
        ]}
      />

      <CaseStudySection
        number="01 · Context"
        title="A workflow-driven ERP, not a collection of forms"
        description="The main challenge is keeping one business process consistent while several modules and services evolve independently."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <CaseStudyCard
            eyebrow="Business"
            title="Lead to construction project"
          >
            Leads move through quotation approval before becoming active
            construction work. That relationship then feeds project operations,
            finance, documents, and analytics.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Architecture" title="Domain-oriented backend">
            The browser-facing API stays behind a gateway while NestJS services
            and shared libraries separate business responsibilities, contracts,
            auth, and database access.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Delivery" title="Five-repository setup">
            Frontend, backend, infrastructure, documentation, and testing are
            separated into the repository structure required for the university
            project, with work tracked through issues and pull requests.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="02 · Architecture"
        title="Service boundaries that mirror the business"
        description="The backend is structured so authentication, projects, quotations, finance, analytics, and other domains can change without collapsing into one large module."
      >
        <CaseStudyFlow
          items={[
            {
              label: "Next.js frontend",
              detail:
                "Role-aware application UI, forms, dashboards, and API integration.",
            },
            {
              label: "API gateway",
              detail:
                "The public HTTP entry point validates and forwards requests to the appropriate backend service.",
            },
            {
              label: "NestJS domain services",
              detail:
                "Business rules live inside focused services such as auth, quotation, project, invoice, payment, analytics, and AI.",
            },
            {
              label: "Shared libraries",
              detail:
                "Contracts, database access, authentication helpers, configuration, and common types stay consistent across services.",
            },
            {
              label: "Prisma + Neon PostgreSQL",
              detail:
                "A relational model and tracked migrations persist ERP state across the domains.",
            },
          ]}
        />

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <CaseStudyCard title="Why the gateway matters">
            Internal service endpoints can stay private while the frontend works
            with one public API surface. The gateway also gives the system a
            consistent place to forward authenticated actor context and
            normalize downstream failures.
          </CaseStudyCard>

          <CaseStudyCard title="Why shared contracts matter">
            Cross-service workflows rely on typed payloads rather than
            duplicated object shapes. That becomes especially important when
            quotation approval has to call into the project domain and preserve
            domain-specific errors.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="03 · Contribution"
        title="My work crossed the data, service, frontend, and delivery layers"
        description="The strongest parts of my contribution are the pieces where one change affected more than one part of the system."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <CaseStudyCard eyebrow="Domain" title="Project service foundation">
            Implemented project creation, retrieval, filtering, updates, manager
            assignment, status behavior, validation, and the service boundary
            used by quotation conversion.
          </CaseStudyCard>

          <CaseStudyCard
            eyebrow="Workflow"
            title="Quotation → Project conversion"
          >
            Built the workflow for creating a project from an approved quotation
            or attaching another quotation to an existing project, including
            recovery and retry behavior.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Data" title="Migration reconciliation">
            Reconciled drift between repository schemas, Prisma migration
            history, and the deployed Neon database before continuing
            project-domain development.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Auth" title="Session and refresh-token flow">
            Contributed to backend refresh-token support and frontend session
            hydration, API interception, token refresh, and authenticated
            navigation behavior.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Delivery" title="Vercel and CI integration">
            Worked on service entrypoints, build behavior, formatting/lint
            checks, E2E environment setup, and deployment-oriented
            configuration.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Engineering" title="Tests and documentation">
            Added unit/integration coverage and documented project activation,
            schema changes, service contracts, and architecture decisions.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="04 · Deep Dive"
        title="Quotation approval became a cross-service transaction"
        description="A successful approval cannot stop at changing a quotation status. It has to produce a valid project relationship without creating duplicates or leaving the workflow half-finished."
      >
        <CaseStudyFlow
          items={[
            {
              label: "Approve quotation",
              detail:
                "The quotation service owns the approval workflow and validates that the quotation is eligible to continue.",
            },
            {
              label: "Call project service",
              detail:
                "The conversion request either contains the data for a new project or identifies an existing target project.",
            },
            {
              label: "Create or reuse project",
              detail:
                "Project service owns creation, activation, relationship rules, and idempotent recovery.",
            },
            {
              label: "Link quotation",
              detail:
                "The quotation is associated with the resulting project only after the project-side operation succeeds.",
            },
            {
              label: "Complete conversion",
              detail:
                "The quotation transitions into its converted state with the final project identifier preserved.",
            },
          ]}
        />

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <CaseStudyCard eyebrow="Path A" title="Create a new project">
            An approved quotation can create a new construction project using
            the project details required by the domain. The project then becomes
            the operational home for the approved work.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Path B" title="Attach to an existing project">
            A second quotation for another scope can target an existing project
            rather than creating a duplicate construction job.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="05 · Data Model"
        title="A client clarification changed the relationship model"
        description="The original design allowed only one quotation per project. The client later confirmed that one construction project can contain separate quotations for different scopes."
      >
        <CaseStudyCompare
          before={{
            label: "Before",
            value: "Project 1 → 0..1 Quotation",
            detail:
              "Quotation.projectId was unique, which meant the database itself prevented multiple quotations from pointing to one project.",
          }}
          after={{
            label: "After",
            value: "Project 1 → 0..* Quotations",
            detail:
              "The unique constraint became a normal index and the Prisma project relation changed to a quotations collection.",
          }}
        />

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <CaseStudyCard title="Migration safety">
            The change was validated against an isolated Neon branch before it
            reached the shared development database, preserving existing links.
          </CaseStudyCard>

          <CaseStudyCard title="Dependent code">
            Project lookups, deletion protection, invoice customer validation,
            contracts, and tests all had to move from a singular relation to a
            plural one.
          </CaseStudyCard>

          <CaseStudyCard title="Business fit">
            Design, 3D visualization, and construction quotations can now belong
            to the same real-world project instead of forcing artificial
            duplicates.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="06 · Reliability"
        title="Designing the conversion path for retries and concurrency"
        description="The same request can arrive twice because of a network retry, partial failure, or concurrent operation. The workflow therefore has to be safe when repeated."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <CaseStudyCard eyebrow="Risk" title="Duplicate project creation">
            Two conversion attempts for the same quotation must never create two
            separate project records.
          </CaseStudyCard>

          <CaseStudyCard
            eyebrow="Protection"
            title="Serializable transaction boundary"
          >
            The conversion path uses transaction isolation, row locking, and
            controlled retry handling around the critical relationship update.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Recovery" title="Reuse valid partial state">
            If a previous attempt already linked the quotation to a project, a
            retry can recover that project instead of treating the valid partial
            state as a reason to duplicate data.
          </CaseStudyCard>
        </div>

        <div className="mt-6 rounded-2xl border border-border/75 bg-surface/50 p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            Conflict handling
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Retry handling covers Prisma transaction conflicts such as P2034 and
            PostgreSQL serialization failures surfaced through the Prisma/Neon
            stack. If retries are exhausted, the service returns a controlled
            domain conflict rather than silently producing inconsistent state.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="07 · Verification"
        title="The workflow was tested beyond isolated service methods"
        description="The project-domain pull request included unit, integration, database-backed, and real service-boundary verification."
      >
        <div className="grid gap-6 sm:grid-cols-3">
          <CaseStudyMetric
            value="223"
            label="Unit tests passed"
            detail="Reported across 26 suites in the project-domain validation run."
          />
          <CaseStudyMetric
            value="66"
            label="E2E / integration tests passed"
            detail="Reported across 9 suites, with 2 additional tests skipped."
          />
          <CaseStudyMetric
            value="1:N"
            label="Project → quotation model"
            detail="Validated through migration and database-backed regression coverage."
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <CaseStudyCard title="Real service boundary">
            The conversion path was exercised through quotation service → HTTP
            client → project service → test database instead of stopping at a
            mocked client.
          </CaseStudyCard>

          <CaseStudyCard title="Deployment discipline">
            CI, migration checks, branch-based database validation, pull-request
            review, build verification, and release documentation are treated as
            part of delivery, not as work added after the feature is complete.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="08 · Reflection"
        title="What changed in the way I think about backend work"
        description="The most useful lessons came from features that crossed database, service, deployment, and team boundaries."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <CaseStudyCard title="Happy-path correctness is not enough">
            Distributed workflows need explicit idempotency and recovery rules
            because valid partial state can exist after a failure.
          </CaseStudyCard>

          <CaseStudyCard title="The schema is part of the product">
            A small client clarification can change cardinality, migrations,
            validation, contracts, and tests across several services.
          </CaseStudyCard>

          <CaseStudyCard title="Deployment constraints influence design">
            A service that works locally can still need different bootstrap and
            entrypoint behavior when deployed into a serverless environment.
          </CaseStudyCard>

          <CaseStudyCard title="Documentation prevents implementation drift">
            Architecture records and migration notes made later changes safer
            because the team could trace why the existing behavior was designed
            that way.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudyNavigation
        next={{ href: "/projects/kochi-guru-pizza", title: "Kochi Guru Pizza" }}
      />
    </main>
  );
}
