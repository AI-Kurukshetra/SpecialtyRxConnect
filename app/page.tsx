import Link from "next/link";
import { CapabilityGrid } from "@/components/features/home/capability-grid";
import { Hero } from "@/components/features/home/hero";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

const workflow = [
  {
    title: "Enrollment",
    body: "Collect the therapy story, payer details, and support needs without forcing the access team to reconstruct the case later."
  },
  {
    title: "Coverage",
    body: "Track benefits investigation and prior authorization in the same operational lane so handoffs do not disappear into email."
  },
  {
    title: "Affordability",
    body: "Surface copay, bridge, and assistance opportunities alongside the case instead of in separate spreadsheets."
  },
  {
    title: "Readiness",
    body: "Coordinate pharmacy, provider, and patient outreach from one source of truth until therapy begins."
  }
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="content-shell">
        <SiteHeader
          currentPath="/"
          navItems={[
            { href: "/", label: "Overview" },
            { href: "/login", label: "Login" },
            { href: "/register", label: "Register" }
          ]}
        />

        <Hero />

        <section className="metric-grid">
          <Card className="p-5">
            <span className="eyebrow">Target outcome</span>
            <div className="mt-4 font-display text-4xl tracking-tight text-slate-950">
              Faster starts
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Compress the therapy initiation path by keeping onboarding, payer
              work, affordability, and communication in one workflow.
            </p>
          </Card>
          <Card className="p-5">
            <span className="eyebrow">Command center</span>
            <div className="mt-4 font-display text-4xl tracking-tight text-slate-950">
              One queue
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Move from a welcome dashboard to a real case triage surface with
              blockers, due actions, and patient readiness.
            </p>
          </Card>
          <Card className="p-5">
            <span className="eyebrow">Data model</span>
            <div className="mt-4 font-display text-4xl tracking-tight text-slate-950">
              RLS ready
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Organization-scoped Supabase tables are prepared for auth, storage,
              auditability, and secure server-side access.
            </p>
          </Card>
          <Card className="p-5">
            <span className="eyebrow">Delivery</span>
            <div className="mt-4 font-display text-4xl tracking-tight text-slate-950">
              Vercel fit
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              App Router, Tailwind, typed Supabase clients, and server-first data
              flows keep the runtime lean and deployable.
            </p>
          </Card>
        </section>

        <CapabilityGrid />

        <section className="section-stack">
          <SectionHeading
            eyebrow="Workflow model"
            title="Keep the navigation shallow. Make the workflow model deeper."
            description="The design borrows the operational simplicity of the reference products, but upgrades the actual work surface with clearer status modeling, affordability orchestration, and next-action visibility."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflow.map((item) => (
              <Card className="p-5" key={item.title}>
                <div className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                  {item.title}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <Card className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-2xl">
            <span className="eyebrow">Ready to explore</span>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-slate-950">
              Create the admin account and start onboarding your team.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Registration creates the first administrator. After sign-in, that
              admin can invite providers, case managers, and staff into the live
              workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/register">
              <Button>Create live account</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary">Sign in</Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
