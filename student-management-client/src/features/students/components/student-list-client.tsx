"use client";

import { Eye, Pencil, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { avg, CLASSES, letterGrade, Student, STUDENTS } from "../types/student-type";
import { GradeBadge } from "./grade-badge";

const AVATAR_COLORS = [
  { bg: "bg-blue-50", text: "text-blue-700" },
  { bg: "bg-green-100", text: "text-green-800" },
  { bg: "bg-purple-50", text: "text-purple-700" },
  { bg: "bg-amber-50", text: "text-amber-700" },
  { bg: "bg-teal-50", text: "text-teal-700" },
  { bg: "bg-pink-50", text: "text-pink-700" },
];

function initials(name: string) {
  return name.split(" ").slice(-2).map((w) => w[0]).join("");
}

const TOTAL_STUDENTS = 248;
const PAGE_SIZE = 15;

export default function StudentsListClient() {
  const [query, setQuery] = useState("");
  const [classFilter, setClass] = useState("");
  const [gradeFilter, setGrade] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return STUDENTS.filter((s) => {
      const q = query.toLowerCase();
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
      const matchC = !classFilter || s.cls === classFilter;
      const matchG = !gradeFilter || letterGrade(avg(s)) === gradeFilter;
      return matchQ && matchC && matchG;
    });
  }, [query, classFilter, gradeFilter]);

  const totalPages = Math.max(1, Math.ceil(TOTAL_STUDENTS / PAGE_SIZE));

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.75 flex-1 max-w-70 text-gray-400">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search by name or ID…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            className="bg-transparent text-[13px] text-gray-900 outline-none w-full placeholder:text-gray-400"
            aria-label="Search students"
          />
        </div>

        {/* Class filter */}
        <select
          value={classFilter}
          onChange={(e) => { setClass(e.target.value); setPage(1); }}
          className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.75 text-[13px] text-gray-500 cursor-pointer"
          aria-label="Filter by class"
        >
          <option value="">All classes</option>
          {CLASSES.map((c) => <option key={c}>{c}</option>)}
        </select>

        {/* Grade filter */}
        <select
          value={gradeFilter}
          onChange={(e) => { setGrade(e.target.value); setPage(1); }}
          className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.75 text-[13px] text-gray-500 cursor-pointer"
          aria-label="Filter by grade"
        >
          <option value="">All grades</option>
          {(["A", "B", "C", "D"] as const).map((g) => <option key={g}>{g}</option>)}
        </select>

        <span className="ml-auto text-[13px] text-gray-500">
          Showing {filtered.length} of {TOTAL_STUDENTS} students
        </span>
      </div>

      {/* ── Table ── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-[13px] border-collapse" aria-label="Students list">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="w-9 px-3 py-2.5 border-b border-gray-200 font-medium text-gray-500 text-xs">
                <input type="checkbox" aria-label="Select all" className="cursor-pointer" />
              </th>
              <th className="px-3 py-2.5 border-b border-gray-200 font-medium text-gray-500 text-xs">Student</th>
              <th className="px-3 py-2.5 border-b border-gray-200 font-medium text-gray-500 text-xs">Class</th>
              <th className="px-3 py-2.5 border-b border-gray-200 font-medium text-gray-500 text-xs">Math</th>
              <th className="px-3 py-2.5 border-b border-gray-200 font-medium text-gray-500 text-xs">Literature</th>
              <th className="px-3 py-2.5 border-b border-gray-200 font-medium text-gray-500 text-xs">English</th>
              <th className="px-3 py-2.5 border-b border-gray-200 font-medium text-gray-500 text-xs">Avg</th>
              <th className="px-3 py-2.5 border-b border-gray-200 font-medium text-gray-500 text-xs">Grade</th>
              <th className="px-3 py-2.5 border-b border-gray-200 font-medium text-gray-500 text-xs">Status</th>
              <th className="px-3 py-2.5 border-b border-gray-200 font-medium text-gray-500 text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center text-gray-400 py-10">
                  No students match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((s, i) => <StudentRow key={s.id} student={s} index={i} />)
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between mt-3.5">
        <span className="text-[12px] text-gray-500">Page {page} of {totalPages}</span>
        <nav className="flex gap-1" aria-label="Pagination">
          <PageBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} aria-label="Previous page">
            ‹
          </PageBtn>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((n) => (
            <PageBtn key={n} active={page === n} onClick={() => setPage(n)} aria-current={page === n ? "page" : undefined}>
              {n}
            </PageBtn>
          ))}
          {totalPages > 5 && <span className="flex items-center px-1 text-[13px] text-gray-400">…</span>}
          {totalPages > 5 && (
            <PageBtn active={page === totalPages} onClick={() => setPage(totalPages)}>
              {totalPages}
            </PageBtn>
          )}
          <PageBtn onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} aria-label="Next page">
            ›
          </PageBtn>
        </nav>
      </div>
    </>
  );
}

/* ── Student row ── */
function StudentRow({ student: s, index }: { student: Student; index: number; }) {
  const a = avg(s);
  const col = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-3 py-2.5 border-b border-gray-100">
        <input type="checkbox" aria-label={`Select ${s.name}`} className="cursor-pointer" />
      </td>

      {/* Name */}
      <td className="px-3 py-2.5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${col.bg} ${col.text}`} aria-hidden="true">
            {initials(s.name)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{s.name}</p>
            <p className="text-[11px] text-gray-400">{s.id}</p>
          </div>
        </div>
      </td>

      <td className="px-3 py-2.5 border-b border-gray-100">
        <span className="inline-block bg-gray-100 text-gray-500 text-[11px] font-medium px-2 py-0.5 rounded-full">
          {s.cls}
        </span>
      </td>
      <td className="px-3 py-2.5 border-b border-gray-100 text-gray-700">{s.math}</td>
      <td className="px-3 py-2.5 border-b border-gray-100 text-gray-700">{s.literature}</td>
      <td className="px-3 py-2.5 border-b border-gray-100 text-gray-700">{s.english}</td>
      <td className="px-3 py-2.5 border-b border-gray-100 font-semibold text-gray-900">{a.toFixed(1)}</td>
      <td className="px-3 py-2.5 border-b border-gray-100"><GradeBadge average={a} /></td>

      {/* Status */}
      <td className="px-3 py-2.5 border-b border-gray-100">
        {s.status === "active" ? (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-[11px] font-medium px-2 py-0.5 rounded-full">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[11px] font-medium px-2 py-0.5 rounded-full">
            At risk
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="px-3 py-2.5 border-b border-gray-100">
        <div className="flex gap-1">
          <Link
            href={`/students/${s.id}`}
            className="w-7 h-7 border border-gray-200 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            title={`View ${s.name}`}
            aria-label={`View ${s.name}`}
          >
            <Eye size={13} />
          </Link>
          <button
            className="w-7 h-7 border border-gray-200 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            title="Edit"
            aria-label={`Edit ${s.name}`}
          >
            <Pencil size={13} />
          </button>
          <button
            className="w-7 h-7 border border-gray-200 rounded-md flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
            title="Delete"
            aria-label={`Delete ${s.name}`}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ── Pagination button ── */
function PageBtn({
  children, active, onClick, disabled, ...rest
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: unknown;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "w-7 h-7 border rounded-md text-[13px] flex items-center justify-center transition-colors",
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed",
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}