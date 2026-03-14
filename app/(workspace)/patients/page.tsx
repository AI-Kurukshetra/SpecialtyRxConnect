import Link from "next/link";
import { CasesTable } from "@/components/features/patients/cases-table";
import { PageIntro } from "@/components/layout/page-intro";
import { WorkspaceShell } from "@/components/layout/workspace-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCaseList } from "@/services/patients";
import { requireViewerContext } from "@/services/viewer";

export const dynamic = "force-dynamic";

type PatientsPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function PatientsPage({ searchParams }: PatientsPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q ?? "";
  const viewer = await requireViewerContext();
  const cases = await getCaseList(query);
  const canCreateCase = ["admin", "case_manager", "provider"].includes(viewer.role);

  return (
    <WorkspaceShell pathname="/patients" viewer={viewer}>
      <PageIntro
        action={
          canCreateCase ? (
            <Link href="/intake">
              <Button>Add patient case</Button>
            </Link>
          ) : (
            <div className="rounded-2xl border border-slate-200 px-4 py-3 text-xs text-slate-600">
              Ask your administrator to create cases or grant broader permissions.
            </div>
          )
        }
        description="Track the cases that matter now. This queue emphasizes next action, affordability state, payer progress, and ownership instead of only listing names."
        eyebrow="Case queue"
        title="Patient access cases"
      />

      <form className="max-w-md" method="get">
        <Input defaultValue={query} name="q" placeholder="Search patient, therapy, or payer" />
      </form>

      <CasesTable cases={cases} />
    </WorkspaceShell>
  );
}
