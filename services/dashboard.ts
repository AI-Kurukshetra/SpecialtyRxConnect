import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasPublicSupabaseEnv } from "@/lib/env";
import { demoCases, demoDashboard } from "@/services/demo-data";
import { formatScheduledAt, humanizeSnakeCase } from "@/utils/formatters";
import { getPriorityLabel, getStatusTone } from "@/utils/status";
import type { ProviderDashboardData } from "@/types/dashboard";

export async function getDashboardSnapshot(): Promise<ProviderDashboardData> {
  if (!hasPublicSupabaseEnv()) {
    return demoDashboard;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const db = supabase as any;
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return demoDashboard;
    }

    const { data: profile } = await db
      .from("profiles")
      .select("organization_id")
      .eq("id", session.user.id)
      .maybeSingle();

    if (!profile?.organization_id) {
      return demoDashboard;
    }

    const organizationId = profile.organization_id;
    const [caseResult, authResult, faResult, communicationResult] = await Promise.all([
      db
        .from("patient_cases")
        .select(
          "id, status, priority, next_action, patients(first_name,last_name), prescriptions(medications(name)), insurance_policies(payer_name), last_activity_at"
        )
        .eq("organization_id", organizationId)
        .order("last_activity_at", { ascending: false })
        .limit(6),
      db
        .from("prior_authorizations")
        .select("status")
        .eq("organization_id", organizationId),
      db
        .from("financial_assistance_cases")
        .select("status")
        .eq("organization_id", organizationId),
      db
        .from("communications")
        .select("summary, channel, scheduled_for")
        .eq("organization_id", organizationId)
        .eq("status", "scheduled")
        .order("scheduled_for", { ascending: true })
        .limit(5)
    ]);

    if (caseResult.error || authResult.error || faResult.error || communicationResult.error) {
      return demoDashboard;
    }

    const caseRows = caseResult.data ?? [];
    const authRows = authResult.data ?? [];
    const faRows = faResult.data ?? [];
    const communicationRows = communicationResult.data ?? [];

    return {
      sourceLabel: "Live Supabase data",
      metrics: [
        {
          label: "Active access cases",
          value: String(caseRows.length),
          detail: "Cases currently assigned to your organization work queues.",
          tone: "default"
        },
        {
          label: "Prior auth in flight",
          value: String(
            authRows.filter((row: any) =>
              ["submitted", "pending", "appeal"].includes(row.status)
            ).length
          ),
          detail: "Authorizations waiting on payer action or supporting documentation.",
          tone: "warning"
        },
        {
          label: "Affordability opportunities",
          value: String(
            faRows.filter((row: any) =>
              ["screening", "submitted", "active"].includes(row.status)
            ).length
          ),
          detail: "Patients with active affordability workflows underway.",
          tone: "accent"
        },
        {
          label: "Critical blockers",
          value: String(
            caseRows.filter(
              (row: any) => row.priority === "critical" || row.status === "blocked"
            ).length
          ),
          detail: "Cases flagged as blocked or critical in the current queue.",
          tone: "critical"
        }
      ],
      cases:
        caseRows.length > 0
          ? caseRows.map((row: any) => ({
              id: row.id,
              patientName: `${row.patients?.first_name ?? ""} ${row.patients?.last_name ?? ""}`.trim(),
              therapy: row.prescriptions?.medications?.name ?? "Unassigned therapy",
              payer: row.insurance_policies?.payer_name ?? "Payer pending",
              status: humanizeSnakeCase(row.status),
              nextAction: row.next_action ?? "Review case",
              priorityLabel: getPriorityLabel(row.priority),
              tone: getStatusTone(row.status, row.priority)
            }))
          : demoDashboard.cases,
      outreachQueue:
        communicationRows.length > 0
          ? communicationRows.map((row: any) => ({
              recipient: "Scheduled outreach",
              channel: row.channel.toUpperCase(),
              summary: row.summary,
              scheduledFor: formatScheduledAt(row.scheduled_for)
            }))
          : demoDashboard.outreachQueue,
      activityLog: demoCases.slice(0, 3).map((entry, index) => ({
        title: `${entry.patientName} moved into ${entry.status}`,
        description: `${entry.therapy} with ${entry.payer}. Next action: ${entry.nextAction}.`,
        timestamp: index === 0 ? "Just now" : `${index * 18 + 16} minutes ago`
      }))
    };
  } catch {
    return demoDashboard;
  }
}
