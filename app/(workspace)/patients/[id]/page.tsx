import { CaseDetailView } from "@/components/features/patients/case-detail-view";
import { PageIntro } from "@/components/layout/page-intro";
import { WorkspaceShell } from "@/components/layout/workspace-shell";
import { getCaseDetail } from "@/services/patients";
import { requireViewerContext } from "@/services/viewer";

export const dynamic = "force-dynamic";

type PatientDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PatientDetailPage({
  params
}: PatientDetailPageProps) {
  const resolvedParams = await params;
  const viewer = await requireViewerContext();
  const detail = await getCaseDetail(resolvedParams.id);

  return (
    <WorkspaceShell pathname="/patients" viewer={viewer}>
      <PageIntro
        description="Each case combines patient identity, therapy, coverage, prior authorization, financial assistance, communications, and documents into one operational record."
        eyebrow="Case detail"
        title={detail.patient.fullName}
      />
      <CaseDetailView detail={detail} />
    </WorkspaceShell>
  );
}
