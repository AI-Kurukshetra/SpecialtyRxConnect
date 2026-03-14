import { getReportsSnapshot, convertReportsToCsv } from "@/services/reports";

export async function GET() {
  const snapshot = await getReportsSnapshot();
  const csv = convertReportsToCsv(snapshot);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="specialtyrx-report.csv"'
    }
  });
}
