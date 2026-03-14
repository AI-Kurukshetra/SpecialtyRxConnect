import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="page-shell">
      <div className="content-shell">
        <div className="panel max-w-2xl p-8">
          <span className="eyebrow">Not found</span>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-slate-950">
            The page or case you requested is not available.
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Return to the workspace overview or the enrollment portal.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button>Open dashboard</Button>
            </Link>
            <Link href="/intake">
              <Button variant="secondary">Open intake</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
