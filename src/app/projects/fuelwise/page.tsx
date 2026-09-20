// src/app/projects/fuelwise/page.tsx
import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";
import { CaseStudyFlow } from "@/components/case-study/CaseStudyFlow";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { getProjectBySlug } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "FuelWise.lk Case Study",
  description:
    "Multi-platform fuel quota management case study covering React, Spring Boot, Flutter, MySQL, quota workflows, transaction handling, and external vehicle validation.",
};

const project = getProjectBySlug("fuelwise");

export default function FuelWiseCaseStudyPage() {
  return (
    <main>
      <CaseStudyHero
        eyebrow="Case Study · Web + Mobile / Distributed Workflow"
        title="FuelWise.lk"
        description="A multi-role fuel quota management platform built across React, Spring Boot, Flutter, and MySQL, with separate experiences for vehicle owners, fuel stations, and administrators."
        role="Full-Stack / Mobile Contributor"
        scope="University group project"
        status="Completed"
        stack={["Spring Boot", "Java", "React", "Flutter", "Dart", "MySQL"]}
        links={project.links}
        focus={[
          "Quota and fuel-station workflows across backend and clients.",
          "React customer/station dashboards and transaction views.",
          "Flutter quota-update flows and backend integration.",
          "Cross-platform configuration and external vehicle validation.",
        ]}
      />

      <CaseStudySection
        number="01 · Problem"
        title="One fuel rule had to work across several user roles"
        description="FuelWise was built around a simple business idea—track a vehicle's fuel allowance—but that rule had to remain consistent across customer, station, admin, and mobile workflows."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <CaseStudyCard
            eyebrow="Vehicle owner"
            title="See vehicles and remaining quota"
          >
            Customer-facing screens provide registered vehicle information,
            quota data, QR access, and owner-specific vehicle views.
          </CaseStudyCard>

          <CaseStudyCard
            eyebrow="Fuel station"
            title="Process fueling activity"
          >
            Station workflows retrieve vehicle quota, apply fuel usage, and
            maintain transaction records tied to both the vehicle and the
            station.
          </CaseStudyCard>

          <CaseStudyCard
            eyebrow="Administrator"
            title="Manage the shared system"
          >
            Admin screens cover users, stations, vehicles, fuel quota
            configuration, and operational oversight.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="02 · Architecture"
        title="A shared backend serving web and mobile clients"
        description="The same business data is consumed by different interfaces, while a separate service simulates an external government vehicle-data source."
      >
        <CaseStudyFlow
          items={[
            {
              label: "React web application",
              detail:
                "Customer, fuel-station, and administrator dashboards use the main REST API.",
            },
            {
              label: "Flutter mobile application",
              detail:
                "Station-oriented mobile flows retrieve vehicle details and update fuel quota.",
            },
            {
              label: "Spring Boot API",
              detail:
                "Controllers, services, repositories, DTOs, validation, and JPA implement the shared business layer.",
            },
            {
              label: "MySQL persistence",
              detail:
                "Vehicles, owners, stations, quotas, transactions, QR data, and administrative records are persisted relationally.",
            },
            {
              label: "DMT simulation service",
              detail:
                "A second Spring Boot application represents authoritative vehicle-registration data for validation workflows.",
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection
        number="03 · Contribution"
        title="My work spanned React, Spring Boot, and Flutter"
        description="The contribution history shows work across the application boundary rather than one isolated module."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <CaseStudyCard eyebrow="Backend" title="Quota and station workflows">
            Worked on fuel-station update/delete operations, fuel quota updates,
            station and owner lookup endpoints, exception handling, and vehicle
            persistence.
          </CaseStudyCard>

          <CaseStudyCard
            eyebrow="Transactions"
            title="Station transaction integration"
          >
            Implemented station-specific transaction retrieval and connected
            vehicle details into transaction presentation for the fuel-station
            dashboard.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="React" title="Role-focused dashboards">
            Contributed customer vehicle filtering, fuel-station dashboards,
            routing, profile screens, transaction cards, navigation, and form
            validation.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Flutter" title="Quota operator flow">
            Worked on the fuel-quota screen, station ID retrieval, fuel-type
            selection, backend quota updates, registration screens, and mobile
            validation fixes.
          </CaseStudyCard>

          <CaseStudyCard
            eyebrow="Integration"
            title="Dynamic backend configuration"
          >
            Replaced repeated server addresses with shared host configuration in
            React and Flutter so development environments could change without
            editing every request.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Maintenance" title="Cross-boundary debugging">
            Fixed integration issues in vehicle responses, station retrieval,
            quota updates, merged routing, package/module setup, and mobile
            overflow behavior.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="04 · Core Flow"
        title="From vehicle identification to a recorded fuel transaction"
        description="The fueling workflow combines vehicle identity, remaining quota, station context, mutation of the allowance, and a persistent transaction record."
      >
        <CaseStudyFlow
          items={[
            {
              label: "Identify the vehicle",
              detail:
                "QR scanning or vehicle lookup resolves the vehicle record used by the station flow.",
            },
            {
              label: "Fetch remaining quota",
              detail:
                "The client requests owner, registration, and current quota details from the backend.",
            },
            {
              label: "Enter fuel amount and type",
              detail:
                "The station operator selects what was dispensed and how much should be applied.",
            },
            {
              label: "Update quota",
              detail:
                "Spring Boot applies the quota change to the vehicle using the current station context.",
            },
            {
              label: "Record transaction",
              detail:
                "The event is stored so the station can retrieve its own fueling history later.",
            },
          ]}
        />

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <CaseStudyCard title="Station context matters">
            The mobile flow retrieves the logged-in user&apos;s station ID so
            quota updates and transactions can be associated with the correct
            fuel station.
          </CaseStudyCard>

          <CaseStudyCard title="Owner context matters too">
            Customer dashboard vehicle lists are filtered using the current
            owner ID so a user sees their own records instead of a global
            vehicle collection.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="05 · Integration"
        title="Vehicle registration crosses an external service boundary"
        description="The project includes a separate Department of Motor Traffic simulation instead of treating every user-entered registration as automatically valid."
      >
        <CaseStudyFlow
          items={[
            {
              label: "Owner submits vehicle details",
              detail: "Registration begins inside the FuelWise customer flow.",
            },
            {
              label: "Query DMT simulation",
              detail:
                "A separate Spring Boot service looks up the licence plate in its vehicle dataset.",
            },
            {
              label: "Validate returned data",
              detail:
                "The FuelWise workflow compares the external record with the registration request.",
            },
            {
              label: "Persist FuelWise vehicle",
              detail:
                "A validated vehicle becomes part of the quota-management domain.",
            },
          ]}
        />

        <div className="mt-6 rounded-2xl border border-border/75 bg-surface/50 p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            Why this mattered
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            The extra service introduced a real integration boundary: data could
            be unavailable, malformed, or different from the user&apos;s input.
            That made the registration flow closer to a distributed workflow
            than a single-database form submission.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="06 · Configuration"
        title="Removing repeated backend addresses across clients"
        description="A practical multi-client problem was keeping React and Flutter pointed at the correct backend while the development host changed."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <CaseStudyCard
            eyebrow="Before"
            title="Host values repeated in requests"
          >
            API URLs were spread across individual calls, so moving the backend
            required editing several files and created a risk of stale
            addresses.
          </CaseStudyCard>

          <CaseStudyCard eyebrow="Change" title="Shared host configuration">
            I introduced a central server-host value for the React app and a
            shared backend URL constant for Flutter, then migrated requests to
            use them.
          </CaseStudyCard>

          <CaseStudyCard
            eyebrow="Result"
            title="One place to change environments"
          >
            Moving between local machines or network addresses became a
            configuration change instead of a search-and-replace exercise across
            the codebase.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="07 · Retrospective"
        title="What I would change before calling it production-ready"
        description="FuelWise was an academic project, and reviewing it now makes the gap between a working prototype and a hardened production system very visible."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <CaseStudyCard title="Tighten backend authorization">
            I would enforce role and ownership rules explicitly at each
            sensitive endpoint instead of relying heavily on role separation in
            the UI.
          </CaseStudyCard>

          <CaseStudyCard title="Move all secrets into runtime configuration">
            External-service credentials and environment-specific values should
            be stored outside source control and injected through environment or
            secret management.
          </CaseStudyCard>

          <CaseStudyCard title="Add automated tests around the business rules">
            Service unit tests, repository integration tests, and E2E scenarios
            should cover registration, quota mutation, and transaction creation.
          </CaseStudyCard>

          <CaseStudyCard title="Formalize contracts between clients and services">
            Typed request/response contracts and a shared error model would
            reduce hidden assumptions between React, Flutter, the main API, and
            the DMT simulation.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="08 · Reflection"
        title="What the multi-platform setup taught me"
        description="The same business rule can fail in very different ways depending on which layer is carrying the wrong assumption."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <CaseStudyCard title="Integration bugs rarely belong to one file">
            A wrong identifier, response shape, or environment URL can look like
            a frontend bug even when the real failure sits in the backend
            contract.
          </CaseStudyCard>

          <CaseStudyCard title="Shared configuration is infrastructure">
            Centralizing backend addresses looked small, but it removed repeated
            edits from dozens of requests and made multi-client development much
            easier.
          </CaseStudyCard>

          <CaseStudyCard title="Role-specific UI is not enough">
            Customer, station, and administrator experiences need matching
            data-access rules in the backend, not only different screens.
          </CaseStudyCard>

          <CaseStudyCard title="Older projects are useful design reviews">
            Revisiting FuelWise made security, testing, and configuration
            improvements obvious—practices I now introduce much earlier in newer
            projects.
          </CaseStudyCard>
        </div>
      </CaseStudySection>

      <CaseStudyNavigation
        previous={{
          href: "/projects/kochi-guru-pizza",
          title: "Kochi Guru Pizza",
        }}
      />
    </main>
  );
}
