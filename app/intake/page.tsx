import Link from "next/link";
import { EnrollmentForm } from "@/components/features/intake/enrollment-form";
import { SiteHeader } from "@/components/layout/site-header";
import { Card } from "@/components/ui/card";

export default function IntakePage() {
  return (
    <main className="page-shell">
      <div className="content-shell">
        <SiteHeader
          currentPath="/intake"
          navItems={[
            { href: "/", label: "Overview" },
            { href: "/intake", label: "Enrollment" },
            { href: "/dashboard", label: "Workspace" },
            { href: "/login", label: "Login" },
            { href: "/register", label: "Register" }
          ]}
        />

        <section className="grid gap-6 xl:grid-cols-[1.15fr_minmax(0,0.8fr)]">
          <EnrollmentForm />

          <div className="section-stack">
            <Card className="p-6">
              <span className="eyebrow">Why this flow</span>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-slate-950">
                Structured enough for access teams, simple enough for rapid intake.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                The form captures the therapy, payer, and patient context needed
                to start benefits investigation, prior authorization, and
                affordability work without forcing a multi-page referral maze.
              </p>
            </Card>

            <Card className="p-6">
              <span className="eyebrow">Routing outcome</span>
              <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                <li>Creates a patient, prescription, insurance policy, and case record when live server credentials are present.</li>
                <li>Falls back to preview mode when only public credentials are configured.</li>
                <li>Feeds the same provider workspace used by case managers and access coordinators.</li>
              </ul>
            </Card>

            <Card className="p-6">
              <span className="eyebrow">Next step</span>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                After submission, the case enters the dashboard queue for
                verification, prior authorization, affordability review, and
                patient communication.
              </p>
              <Link className="mt-4 inline-flex text-sm font-medium text-slate-900 underline" href="/dashboard">
                View workspace preview
              </Link>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
