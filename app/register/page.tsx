import Link from "next/link";
import { RegisterForm } from "@/components/features/auth/register-form";
import { SiteHeader } from "@/components/layout/site-header";
import { Card } from "@/components/ui/card";
import { registerRoleOptions } from "@/lib/auth/register";

export default function RegisterPage() {
  return (
    <main className="page-shell register-page">
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
            <Card className="register-highlight-surface overflow-hidden p-0">
              <div className="border-b register-divider bg-transparent px-6 py-5">
                <span className="register-kicker text-[11px] uppercase tracking-[0.32em]">
                  Launch kit
                </span>
                <h2 className="register-heading mt-3 font-display text-3xl tracking-tight">
                  Every role lands in a shaped workspace, not an empty shell.
                </h2>
              </div>

              <div className="grid gap-px">
                {registerRoleOptions.map((option) => (
                  <div className="register-subtle-surface px-6 py-5" key={option.value}>
                    <div className="register-kicker text-[11px] uppercase tracking-[0.28em]">
                      {option.label}
                    </div>
                    <p className="register-body mt-3 text-sm leading-7">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="register-subtle-surface relative overflow-hidden p-6">
              <div className="relative">
                <span className="eyebrow register-kicker">What gets created</span>
                <div className="mt-4 space-y-4 text-sm leading-7 register-body">
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
                  className="register-link mt-5 inline-flex text-sm font-medium underline"
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
