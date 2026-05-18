import StudentsListClient from "@/features/students/components/student-list-client";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Students — EduTrack",
  description: "Browse, search and manage all enrolled students.",
};

export default function StudentsPage() {
  return (
    <div className="p-6 max-w-300">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <nav className="flex items-center gap-1.5 text-[13px] mb-1" aria-label="Breadcrumb">
            <Link
              href="/"
              className="text-gray-400 hover:text-gray-700 transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-gray-300" aria-hidden="true">/</span>
            <span className="text-[16px] font-semibold text-gray-900">Students</span>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.75 bg-white text-gray-500 border border-gray-200 rounded-lg text-[13px] hover:bg-gray-50 transition-colors"
          >
            <DownloadIcon />
            Export
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.75 bg-blue-600 text-white rounded-lg text-[13px] font-medium hover:bg-blue-700 transition-colors"
          >
            <PlusIcon />
            Add student
          </button>
        </div>
      </div>

      {/* ── Metric cards ── */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <MetricCard label="Total students" value="248" sub="enrolled this year" />
        <MetricCard label="Classes" value="9" sub="3 grade levels" />
        <MetricCard label="Active students" value="227" sub="91.5% active" />
        <MetricCard label="At-risk students" value="21" sub="score below 50" danger />
      </div>

      {/* ── Interactive table ── */}
      <StudentsListClient />
    </div>
  );
}

function MetricCard({
  label, value, sub, danger,
}: {
  label: string; value: string; sub: string; danger?: boolean;
}) {
  return (
    <div className="bg-gray-100 rounded-lg px-4 py-3.5">
      <p className="text-[12px] text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${danger ? "text-red-700" : "text-gray-900"}`}>{value}</p>
      <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}