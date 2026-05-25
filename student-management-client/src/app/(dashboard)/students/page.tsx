import MetricCard from "@/components/ui/metric-card";
import { LANGUAGES } from "@/constants/language";
import StudentsListClient from "@/features/students/components/student-list-client";
import { Download, Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: LANGUAGES.META_TITLE_STUDENT,
  description: LANGUAGES.META_DES_STUDENT,
};

export default function StudentsPage() {
  return (
    <div className="p-6 max-w-300">
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
            <Download />
            Export
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.75 bg-blue-600 text-white rounded-lg text-[13px] font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus />
            Add student
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-5">
        <MetricCard label="Total students" value="248" sub="enrolled this year" />
        <MetricCard label="Classes" value="9" sub="3 grade levels" />
        <MetricCard label="Active students" value="227" sub="91.5% active" />
        <MetricCard label="At-risk students" value="21" sub="score below 50" danger />
      </div>

      <StudentsListClient />
    </div>
  );
}