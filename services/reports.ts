import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasPublicSupabaseEnv } from "@/lib/env";
import { demoReports } from "@/services/demo-data";
import type { ReportsSnapshot } from "@/types/workspace";

export async function getReportsSnapshot(): Promise<ReportsSnapshot> {
  if (!hasPublicSupabaseEnv()) {
    return demoReports;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const db = supabase as any;
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return demoReports;
    }

    const { data: profile } = await db
      .from("profiles")
      .select("organization_id")
      .eq("id", session.user.id)
      .maybeSingle();

    if (!profile?.organization_id) {
      return demoReports;
    }

    const { data, error } = await db
      .from("patient_cases")
      .select(
        "id, status, created_at, patients(first_name,last_name), prescriptions(medications(name)), insurance_policies(payer_name), case_managers(full_name)"
      )
      .eq("organization_id", profile.organization_id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error || !data) {
      return demoReports;
    }

    const rows = data.map((row: any) => ({
      id: row.id,
      patientName: `${row.patients?.first_name ?? ""} ${row.patients?.last_name ?? ""}`.trim(),
      therapy: row.prescriptions?.medications?.name ?? "Medication pending",
      payer: row.insurance_policies?.payer_name ?? "Payer pending",
      status: row.status,
      createdAt: new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).format(new Date(row.created_at)),
      owner: row.case_managers?.full_name ?? "Unassigned"
    }));

    return {
      metrics: [
        {
          label: "Case exports available",
          value: String(rows.length),
          note: "Rows included in the submission export generated from the current organization."
        },
        ...demoReports.metrics.slice(1)
      ],
      rows: rows.length > 0 ? rows : demoReports.rows
    };
  } catch {
    return demoReports;
  }
}

export function convertReportsToCsv(snapshot: ReportsSnapshot) {
  const header = ["Patient", "Therapy", "Payer", "Status", "Created At", "Owner"];
  const rows = snapshot.rows.map((row) => [
    row.patientName,
    row.therapy,
    row.payer,
    row.status,
    row.createdAt,
    row.owner
  ]);

  return [header, ...rows]
    .map((columns) =>
      columns
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(",")
    )
    .join("\n");
}
