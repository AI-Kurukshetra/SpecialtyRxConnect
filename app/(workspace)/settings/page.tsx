import { SettingsPanels } from "@/components/features/settings/settings-panels";
import { PageIntro } from "@/components/layout/page-intro";
import { WorkspaceShell } from "@/components/layout/workspace-shell";
import { getSettingsSnapshot } from "@/services/settings";
import { getViewerContext } from "@/services/viewer";

export default async function SettingsPage() {
  const [viewer, snapshot] = await Promise.all([
    getViewerContext(),
    getSettingsSnapshot()
  ]);

  return (
    <WorkspaceShell pathname="/settings" viewer={viewer}>
      <PageIntro
        description="Keep preferences lightweight and operational. The settings surface defines default pharmacies, programs, alerts, and escalation behavior without forcing a sprawling admin module."
        eyebrow="Settings"
        title="Workflow preferences"
      />
      <SettingsPanels snapshot={snapshot} />
    </WorkspaceShell>
  );
}
