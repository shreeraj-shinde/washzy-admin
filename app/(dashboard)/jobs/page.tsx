import { JobsHeader, JobsStatStrip, JobsTable } from "@/features/jobs";

export default function JobsPage() {
  return (
    <div className="flex flex-col gap-8">
      <JobsHeader />
      <JobsStatStrip />
      <JobsTable />
    </div>
  );
}
