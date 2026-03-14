import type { Route } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/utils/cn";
import { buttonStyles } from "@/components/ui/button";

type NavItem = {
  href: Route;
  label: string;
};

type SiteHeaderProps = {
  navItems: NavItem[];
  currentPath?: string;
};

export function SiteHeader({ navItems, currentPath }: SiteHeaderProps) {
  return (
    <header className="panel sticky top-4 z-20 flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <Link className="flex items-center gap-3" href="/">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-sm font-semibold text-white">
          SR
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
            Specialty operations
          </span>
          <span className="text-sm font-medium text-slate-900">
            SpecialtyRx Connect
          </span>
        </div>
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        <ThemeToggle />
        <nav className="flex flex-wrap gap-2" aria-label="Primary">
        {navItems.map((item) => (
          <Link
            className={cn(
              buttonStyles(currentPath === item.href ? "primary" : "secondary"),
              "min-h-10 px-4 text-xs sm:text-sm"
            )}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
        </nav>
      </div>
    </header>
  );
}
