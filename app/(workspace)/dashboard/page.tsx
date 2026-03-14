import { DashboardOverview } from "@/components/features/dashboard/dashboard-overview";
import { PageIntro } from "@/components/layout/page-intro";
import { WorkspaceShell } from "@/components/layout/workspace-shell";
import { Card } from "@/components/ui/card";
import { getDashboardSnapshot } from "@/services/dashboard";
import { getViewerContext } from "@/services/viewer";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [viewer, dashboard] = await Promise.all([
    getViewerContext(),
    getDashboardSnapshot()
  ]);

  return (
    <WorkspaceShell pathname="/dashboard" viewer={viewer}>
      <PageIntro
        action={<Card className="px-4 py-3 text-sm text-slate-600">{dashboard.sourceLabel}</Card>}
        description="The dashboard is built as a command center, not a vanity surface. It prioritizes the cases, communications, and blockers that change time-to-therapy outcomes."
        eyebrow="Provider workspace"
        title="Access command center"
      />
      <DashboardOverview data={dashboard} />
    </WorkspaceShell>
  );
}
