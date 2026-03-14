import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_minmax(0,0.9fr)] lg:items-center">
      <div className="space-y-6">
        <span className="eyebrow">Specialty therapy operations</span>
        <h1 className="max-w-5xl font-display text-5xl tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
          Reduce therapy friction without building another bloated admin
          panel.
        </h1>
        <p className="max-w-2xl text-base leading-8 text-slate-600">
          SpecialtyRx Connect is a provider and access-team workspace for
          patient enrollment, coverage verification, prior authorization,
          affordability, communications, and treatment readiness.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/register">
            <Button>Create live account</Button>
          </Link>
          <Link href="/intake">
            <Button variant="secondary">Open enrollment portal</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">Open provider workspace</Button>
          </Link>
        </div>
      </div>

      <div className="panel relative overflow-hidden p-6">
        <div className="absolute inset-0 bg-hero-grid bg-[size:32px_32px] opacity-40" />
        <div className="relative">
          <Image
            alt="Abstract therapy journey illustration"
            className="w-full rounded-[28px]"
            height={720}
            priority
            src="/therapy-orbit.svg"
            width={960}
          />
        </div>
      </div>
    </section>
  );
}
