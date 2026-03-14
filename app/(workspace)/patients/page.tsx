import { CasesTable } from "@/components/features/patients/cases-table";
import { PageIntro } from "@/components/layout/page-intro";
import { WorkspaceShell } from "@/components/layout/workspace-shell";
import { Input } from "@/components/ui/input";
import { getCaseList } from "@/services/patients";
import { getViewerContext } from "@/services/viewer";

export const dynamic = "force-dynamic";

type PatientsPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function PatientsPage({ searchParams }: PatientsPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q ?? "";
  const [viewer, cases] = await Promise.all([
    getViewerContext(),
    getCaseList(query)
  ]);

  return (
    <WorkspaceShell pathname="/patients" viewer={viewer}>
      <PageIntro
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
