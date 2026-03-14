import Link from "next/link";
import { RegisterForm } from "@/components/features/auth/register-form";
import { SiteHeader } from "@/components/layout/site-header";
import { Card } from "@/components/ui/card";
import { registerRoleOptions } from "@/lib/auth/register";

export default function RegisterPage() {
  return (
    <main className="page-shell">
      <div className="content-shell">
        <SiteHeader
          currentPath="/register"
          navItems={[
            { href: "/", label: "Overview" },
            { href: "/intake", label: "Enrollment" },
            { href: "/dashboard", label: "Workspace" },
            { href: "/login", label: "Login" },
            { href: "/register", label: "Register" }
          ]}
        />

        <section className="grid gap-6 xl:grid-cols-[1.15fr_minmax(0,0.85fr)]">
          <RegisterForm />

          <div className="section-stack">
            <Card className="overflow-hidden p-0">
              <div className="border-b border-slate-200 bg-slate-950 px-6 py-5 text-white">
                <span className="text-[11px] uppercase tracking-[0.32em] text-slate-300">
                  Launch kit
                </span>
                <h2 className="mt-3 font-display text-3xl tracking-tight">
                  Every role lands in a shaped workspace, not an empty shell.
                </h2>
              </div>

              <div className="grid gap-px bg-slate-200">
                {registerRoleOptions.map((option) => (
                  <div className="bg-white px-6 py-5" key={option.value}>
                    <div className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                      {option.label}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="relative overflow-hidden p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.12),transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.9),rgba(248,250,252,0.95))]" />
              <div className="relative">
                <span className="eyebrow">What gets created</span>
                <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                  <p>
                    The register flow creates the auth user, attaches the profile to an
                    organization, and seeds starter records for dashboard, patients,
                    prior authorization, affordability, and outreach.
                  </p>
                  <p>
                    Provider and case-manager roles also get matching records in their
                    operational tables so the workspace opens in live mode immediately.
                  </p>
                </div>
                <Link
                  className="mt-5 inline-flex text-sm font-medium text-slate-900 underline"
                  href="/login"
                >
                  Prefer an existing account? Sign in
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
