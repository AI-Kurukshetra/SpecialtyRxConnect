import Link from "next/link";
import { LoginForm } from "@/components/features/auth/login-form";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="page-shell">
      <div className="content-shell">
        <SiteHeader
          currentPath="/login"
          navItems={[
            { href: "/", label: "Overview" },
            { href: "/intake", label: "Enrollment" },
            { href: "/dashboard", label: "Workspace" },
            { href: "/login", label: "Login" },
            { href: "/register", label: "Register" }
          ]}
        />

        <section className="grid gap-8 lg:grid-cols-[1fr_minmax(0,0.85fr)] lg:items-center">
          <div>
            <span className="eyebrow">Workspace access</span>
            <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight text-slate-950 sm:text-6xl">
              Sign in when live auth is ready. Preview the product before that.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              The application supports Supabase authentication with self-service
              registration, but it also keeps the core UI reviewable in preview
              mode so product, design, and data modeling can move before identity
              provisioning is complete.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register">
                <Button>Create account</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="secondary">Open preview workspace</Button>
              </Link>
            </div>
          </div>

          <LoginForm />
        </section>
      </div>
    </main>
  );
}
