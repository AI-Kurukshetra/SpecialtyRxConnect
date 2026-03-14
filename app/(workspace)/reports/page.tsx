import Link from "next/link";
import { ReportTable } from "@/components/features/reports/report-table";
import { PageIntro } from "@/components/layout/page-intro";
import { WorkspaceShell } from "@/components/layout/workspace-shell";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/metric-card";
import { getReportsSnapshot } from "@/services/reports";
import { requireViewerContext } from "@/services/viewer";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const viewer = await requireViewerContext();
  const snapshot = await getReportsSnapshot();

  return (
    <WorkspaceShell pathname="/reports" viewer={viewer}>
      <PageIntro
        action={
          <Link href="/reports/export">
            <Button>Download CSV</Button>
          </Link>
        }
        description="Reporting starts with exportability, but this MVP also highlights operating metrics so the team can react before they export."
        eyebrow="Reports"
        title="Submission and throughput visibility"
      />

      <section className="metric-grid">
        {snapshot.metrics.map((metric) => (
          <MetricCard
            detail={metric.note}
            key={metric.label}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </section>

      <ReportTable snapshot={snapshot} />
    </WorkspaceShell>
  );
}
