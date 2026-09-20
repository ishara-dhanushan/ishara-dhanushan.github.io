import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";
import { CaseStudyFlow } from "@/components/case-study/CaseStudyFlow";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { getProjectBySlug } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Kochi Guru Pizza Case Study",
  description:
    "Full-stack client-project case study covering Next.js, Express, MongoDB, authentication, menu management, Cloudflare R2 media storage, Docker, CI, and performance work.",
};

const project = getProjectBySlug("kochi-guru-pizza");

export default function KochiGuruPizzaCaseStudyPage() {
  return (
    <main>
      <CaseStudyHero
        eyebrow="Case Study · Client / Full-Stack Product"
        title="Kochi Guru Pizza"
        description="A full-stack platform for a real pizza business, combining a public menu experience with secure authentication, role-aware administration, dynamic content management, and cloud-hosted media."
        role="Full-Stack Developer"
        scope="Client project"
        status="Ongoing"
        stack={[
          "Next.js",
          "TypeScript",
          "Express.js",
          "MongoDB",
          "Cloudflare R2",
          "Docker",
        ]}
        links={project.links}
        focus={[
          "End-to-end ownership across frontend, backend, data, and deployment.",
          "JWT and Google authentication with rotating refresh tokens.",
          "Menu management with mixed pricing models and multiple images.",
          "Cloud media lifecycle, CI, Docker, and frontend performance work.",
        ]}
      />

      <CaseStudySection
        number="01 · Product"
        title="Turning a restaurant site into a maintainable product"
        description="The goal was to avoid a static site where every menu or availability change required a developer."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <CaseStudyCard eyebrow="Customer" title="Browse a real menu">
            Public pages expose categories, menu-item details, availability,
            descriptions, pricing, and image galleries in a responsive interface.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Staff" title="Manage content without code">
            Authenticated staff can create and edit menu items, change availability,
            manage pricing, and maintain uploaded images through the dashboard.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Platform" title="Keep the product deployable">
            Frontend and backend are independently buildable, containerized for local
            development, checked by CI, and structured around clear service boundaries.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="02 · Architecture"
        title="A simple stack with deliberate boundaries"
        description="The architecture stays understandable while separating UI state, API access, business logic, persistence, and media storage."
      >
        <CaseStudyFlow
          items={[
            {
              label: "Next.js frontend",
              detail:
                "Public pages, authentication state, menu UX, and administration screens.",
            },
            {
              label: "Typed HTTP layer",
              detail:
                "Frontend service functions isolate request logic and keep API access consistent.",
            },
            {
              label: "Express backend",
              detail:
                "Routes, middleware, validation, authentication, and menu business logic.",
            },
            {
              label: "Mongoose + MongoDB",
              detail:
                "User and menu-domain models store application data with explicit indexes and constraints.",
            },
            {
              label: "Cloudflare R2",
              detail:
                "Menu images live in object storage while MongoDB stores the URLs used by the product.",
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection
        number="03 · Ownership"
        title="I built the product across the full delivery path"
        description="Kochi Guru is where I had the most end-to-end ownership, from initializing the repositories to maintaining the deployed application."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <CaseStudyCard title="Project and data foundation">
            Initialized the frontend and backend, configured MongoDB, designed the user
            and menu models, and evolved indexes as the product grew.
          </CaseStudyCard>

          <CaseStudyCard title="Authentication">
            Built local registration/login, Google OAuth, JWT access tokens,
            refresh-token rotation, multiple active sessions, logout, route protection,
            and client-side auth state.
          </CaseStudyCard>

          <CaseStudyCard title="Menu management">
            Implemented menu models and controllers, staff/admin management screens,
            public menu pages, detailed item pages, validation, availability controls,
            and editing flows.
          </CaseStudyCard>

          <CaseStudyCard title="Media storage">
            Added Cloudflare R2 uploads, multiple images per item, safe deletion behavior,
            and reconciliation logic for detecting unreferenced objects.
          </CaseStudyCard>

          <CaseStudyCard title="UX and performance">
            Reworked responsive components, fixed animation flicker and overflow issues,
            improved hero performance, refined navigation, and tuned menu-card behavior.
          </CaseStudyCard>

          <CaseStudyCard title="Delivery tooling">
            Added Docker containerization, Vercel configuration, GitHub Actions, linting,
            formatting checks, build verification, and runtime updates.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="04 · Authentication"
        title="Treating sessions as a lifecycle, not a login flag"
        description="The authentication system had to survive access-token expiry, multiple devices, OAuth, and temporary network failures without making the user feel like the app was unstable."
      >
        <CaseStudyFlow
          items={[
            {
              label: "Local or Google sign-in",
              detail:
                "Both account types resolve into the same user model and authenticated application state.",
            },
            {
              label: "Issue access + refresh tokens",
              detail:
                "The short-lived access token handles API access while the refresh token supports session continuity.",
            },
            {
              label: "Track active sessions",
              detail:
                "Refresh tokens are stored per user so multiple browsers or devices can remain signed in.",
            },
            {
              label: "Rotate on refresh",
              detail:
                "The used refresh token is replaced with a new one instead of being reused indefinitely.",
            },
            {
              label: "Recover client state",
              detail:
                "The frontend refreshes the current user and separates genuine auth failures from transient network errors.",
            },
          ]}
        />

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <CaseStudyCard eyebrow="Sessions" title="Multiple devices without unlimited growth">
            The user model can hold several refresh tokens, while a configurable session
            limit prevents the stored list from growing without control.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Reliability" title="A network error is not a logout">
            Retry behavior and client-side error handling avoid clearing a valid session
            just because one request temporarily fails.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="05 · Domain Design"
        title="One menu model, two different pricing rules"
        description="Restaurant data becomes more interesting when different categories follow different pricing behavior."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <CaseStudyCard eyebrow="Variant pricing" title="Pizza and add-ons">
            These items can store small, medium, and large price variants as structured
            size/price pairs.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Flat pricing" title="Other categories">
            Pasta, buns, sandwiches, snacks, juices, milkshakes, mojitos, and soft drinks
            can use one flat price while sharing the same menu-item model.
          </CaseStudyCard>
        </div>

        <div className="mt-6 rounded-2xl border border-border/75 bg-surface/50 p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            Preventing stale state
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            When an item changes category, the update path clears incompatible pricing
            fields so a product does not accidentally keep an old flat price and a new
            variant structure at the same time. Public list APIs can also filter by
            category and availability with deterministic sorting.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="06 · Media"
        title="Treating image storage as a lifecycle"
        description="Uploading an image was only the first step. The system also needed predictable paths, safe deletion, and a way to identify files no longer referenced by menu data."
      >
        <CaseStudyFlow
          items={[
            {
              label: "Select menu image",
              detail:
                "The admin UI sends a validated image upload to the backend.",
            },
            {
              label: "Express + Multer",
              detail:
                "The backend receives the file in memory and passes it to the storage service.",
            },
            {
              label: "Upload to Cloudflare R2",
              detail:
                "The object receives a controlled key and is stored through the S3-compatible API.",
            },
            {
              label: "Store URL in MongoDB",
              detail:
                "Menu data references the public object URL rather than storing image bytes in the database.",
            },
            {
              label: "Reconcile storage",
              detail:
                "Bucket objects can be compared with active menu references to find orphaned files safely.",
            },
          ]}
        />

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <CaseStudyCard title="Controlled object paths">
            Generated names keep menu uploads inside a known prefix and preserve supported
            image extensions.
          </CaseStudyCard>

          <CaseStudyCard title="Deletion guardrails">
            The service validates both the expected public domain and object prefix before
            it allows a deletion request to reach R2.
          </CaseStudyCard>

          <CaseStudyCard title="Dry-run cleanup">
            Storage reconciliation can report orphaned objects before deleting them,
            making cleanup observable instead of destructive by default.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="07 · Product Quality"
        title="Small reliability and interaction fixes changed how the product felt"
        description="A large part of the work was not adding another feature. It was removing the little failures that make an application feel unfinished."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <CaseStudyCard title="Animation without flicker">
            Several UI passes focused on animation flicker, conflicting utility classes,
            responsive overflow, and hero performance so motion stayed subtle instead of
            becoming visual noise.
          </CaseStudyCard>

          <CaseStudyCard title="Responsive menu behavior">
            Menu cards, detail pages, image galleries, header behavior, and mobile
            navigation were refined as the real content became more complex.
          </CaseStudyCard>

          <CaseStudyCard title="CI before deployment">
            Frontend and backend jobs run formatting, linting, and production builds so a
            change has to pass basic quality checks before it is considered ready.
          </CaseStudyCard>

          <CaseStudyCard title="Containerized local environment">
            Docker Compose connects the frontend and backend in a predictable local setup,
            including an internal API URL between containers.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="08 · Reflection"
        title="What I learned from owning the whole product"
        description="End-to-end ownership made it obvious that frontend polish, backend correctness, data modeling, and deployment quality are all parts of the same user experience."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <CaseStudyCard title="Authentication is a distributed UI problem">
            Token expiry, network errors, OAuth callbacks, and local state all have to
            cooperate before sign-in feels reliable to the user.
          </CaseStudyCard>

          <CaseStudyCard title="Media needs lifecycle rules">
            Uploading is easy; keeping object storage clean and preventing unsafe deletion
            is where the system starts to feel production-minded.
          </CaseStudyCard>

          <CaseStudyCard title="Subtle polish compounds">
            Small fixes to press feedback, transitions, responsive behavior, loading
            perception, and navigation add up to a product that feels deliberate rather
            than assembled.
          </CaseStudyCard>

          <CaseStudyCard title="Operational code deserves the same design attention">
            CI, container configuration, indexes, environment behavior, and deployment
            files are part of the product even though customers never see them directly.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudyNavigation
        previous={{ href: "/projects/constructpro", title: "ConstructPro ERP" }}
        next={{ href: "/projects/fuelwise", title: "FuelWise.lk" }}
      />
    </main>
  );
}
