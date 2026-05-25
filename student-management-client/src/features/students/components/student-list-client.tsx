"use client";

import PageBtn from "@/components/ui/page-button";
import { GRADES } from "@/constants/common";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { avg, CLASSES, letterGrade, STUDENTS } from "../types/student-type";
import StudentRow from "./student-row";

export default function StudentsListClient() {
  const [query, setQuery] = useState("");
  const [classFilter, setClass] = useState("");
  const [gradeFilter, setGrade] = useState("");
  const [page, setPage] = useState(1);

  const TOTAL_STUDENTS = 248;
  const PAGE_SIZE = 15;

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
      <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
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

        <select
          value={classFilter}
          onChange={(e) => { setClass(e.target.value); setPage(1); }}
          className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.75 text-[13px] text-gray-500 cursor-pointer"
          aria-label="Filter by class"
        >
          <option value="">All classes</option>
          {CLASSES.map((c) => <option key={c}>{c}</option>)}
        </select>

        <select
          value={gradeFilter}
          onChange={(e) => { setGrade(e.target.value); setPage(1); }}
          className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.75 text-[13px] text-gray-500 cursor-pointer"
          aria-label="Filter by grade"
        >
          <option value="">All grades</option>
          {GRADES.map((g) => <option key={g}>{g}</option>)}
        </select>

        <span className="ml-auto text-[13px] text-gray-500">
          Showing {filtered.length} of {TOTAL_STUDENTS} students
        </span>
      </div>

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

      <div className="flex items-center justify-between mt-3.5">
        <span className="text-[12px] text-gray-500">Page {page} of {totalPages}</span>
        <nav className="flex gap-1" aria-label="Pagination">
          <PageBtn
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ‹
          </PageBtn>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((n) => (
            <PageBtn
              key={n}
              active={page === n}
              onClick={() => setPage(n)}
              aria-current={page === n ? "page" : undefined}
            >
              {n}
            </PageBtn>
          ))}
          {totalPages > 5 && <span className="flex items-center px-1 text-[13px] text-gray-400">…</span>}
          {totalPages > 5 && (
            <PageBtn
              active={page === totalPages}
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </PageBtn>
          )}
          <PageBtn
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            ›
          </PageBtn>
        </nav>
      </div>
    </>
  );
}
