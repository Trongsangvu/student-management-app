"use client";

import Link from "next/link";
import {
  Bell,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Layers,
  BarChart2,
  Search,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const SUBJECTS = [
  { subject: "Mathematics", score: 78, color: "bg-blue-500" },
  { subject: "Literature", score: 72, color: "bg-emerald-500" },
  { subject: "English", score: 81, color: "bg-violet-500" },
  { subject: "Physics", score: 68, color: "bg-orange-500" },
  { subject: "Chemistry", score: 65, color: "bg-red-500" },
  { subject: "History", score: 74, color: "bg-pink-500" },
];

const ACTIVITY = [
  { dotColor: "bg-emerald-500", title: "Scores uploaded", detail: "Math, Class 10A", time: "10 minutes ago" },
  { dotColor: "bg-blue-500", title: "New student enrolled", detail: "Nguyen Minh Khoa, 11B", time: "2 hours ago" },
  { dotColor: "bg-amber-500", title: "Grade report generated", detail: "Semester 1 summary", time: "Yesterday, 4:30 PM" },
  { dotColor: "bg-red-500", title: "3 students flagged", detail: "scores below passing", time: "Yesterday, 2:10 PM" },
];

const TOP_STUDENTS = [
  { rank: 1, name: "Tran Bao Chau", cls: "12A", math: 95, lit: 88, eng: 92, avg: 91.7, grade: "A" },
  { rank: 2, name: "Nguyen Thi Lan", cls: "11B", math: 90, lit: 92, eng: 87, avg: 89.7, grade: "B" },
  { rank: 3, name: "Le Duc Minh", cls: "12A", math: 88, lit: 79, eng: 91, avg: 86.0, grade: "B" },
  { rank: 4, name: "Pham Hong Anh", cls: "10C", math: 82, lit: 86, eng: 89, avg: 85.7, grade: "B" },
  { rank: 5, name: "Vo Quoc Khanh", cls: "11A", math: 85, lit: 80, eng: 84, avg: 83.0, grade: "B" },
];

const GRADE_STYLE: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-700",
  B: "bg-blue-100 text-blue-700",
  C: "bg-amber-100 text-amber-700",
};

const TABLE_HEADERS = ["#", "Student", "Class", "Math", "Literature", "English", "Avg", "Grade"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-1 hover:shadow-md transition-shadow duration-200">
      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 mb-2">
        {icon}
      </div>
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-[2rem] font-extrabold text-slate-900 leading-none my-1">{value}</p>
      <div className="text-[12px] text-slate-500 flex items-center gap-1">{sub}</div>
    </div>
  );
}

function SubjectBar({
  subject,
  score,
  color,
}: {
  subject: string;
  score: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[13px] text-slate-500 w-24 shrink-0">{subject}</span>
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-[13px] font-bold text-slate-700 w-6 text-right">{score}</span>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-slate-50">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white border-b border-slate-100 px-8 py-4">
        <div>
          <h1 className="text-[1.15rem] font-bold text-slate-900 leading-snug">
            Good morning, Admin 👋
          </h1>
          <p className="text-[12px] text-slate-400 mt-0.5">
            Semester 1 · Academic Year 2025–2026
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={14}
            />
            <input
              type="text"
              placeholder="Search students..."
              className="h-9 w-52 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Icon buttons */}
          {[
            { icon: <Bell size={15} />, label: "Notifications" },
            { icon: <Plus size={15} />, label: "Add" },
            { icon: <MoreHorizontal size={15} />, label: "More" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              aria-label={label}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition"
            >
              {icon}
            </button>
          ))}
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1 px-8 py-7 flex flex-col gap-6">

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            icon={<Users size={18} />}
            label="Total students"
            value={248}
            sub={
              <>
                <TrendingUp size={12} className="text-emerald-500" />
                <span className="text-emerald-600 font-semibold">12</span>
                &nbsp;from last year
              </>
            }
          />
          <StatCard
            icon={<Layers size={18} />}
            label="Classes"
            value={9}
            sub="3 grade levels"
          />
          <StatCard
            icon={<BookOpen size={18} />}
            label="Subjects"
            value={12}
            sub="this semester"
          />
          <StatCard
            icon={<BarChart2 size={18} />}
            label="Avg score"
            value="74.2"
            sub={
              <>
                <TrendingDown size={12} className="text-red-500" />
                <span className="text-red-500 font-semibold">1.3</span>
                &nbsp;from last sem
              </>
            }
          />
        </div>

        {/* Middle row — scores + activity */}
        <div className="grid grid-cols-2 gap-4">

          {/* Average scores by subject */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[15px] font-bold text-slate-900">Average scores by subject</h2>
              <Link
                href="#"
                className="text-[12px] text-blue-500 font-semibold flex items-center gap-0.5 hover:opacity-75 transition-opacity"
              >
                View all <ArrowUpRight size={13} />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {SUBJECTS.map((s) => (
                <SubjectBar key={s.subject} {...s} />
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[15px] font-bold text-slate-900">Recent activity</h2>
              <Link
                href="#"
                className="text-[12px] text-blue-500 font-semibold flex items-center gap-0.5 hover:opacity-75 transition-opacity"
              >
                View log <ArrowUpRight size={13} />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className={`mt-1.25 w-2.5 h-2.5 rounded-full shrink-0 ${a.dotColor}`} />
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">
                      {a.title}{" "}
                      <span className="font-normal text-slate-500">— {a.detail}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top students table */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[15px] font-bold text-slate-900">Top students this semester</h2>
            <Link
              href="#"
              className="text-[12px] text-blue-500 font-semibold flex items-center gap-0.5 hover:opacity-75 transition-opacity"
            >
              Full table <ArrowUpRight size={13} />
            </Link>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                {TABLE_HEADERS.map((h) => (
                  <th
                    key={h}
                    className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 px-2 first:pl-0"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_STUDENTS.map((s) => (
                <tr
                  key={s.rank}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-2 pl-0 text-[13px] font-semibold text-slate-400">{s.rank}</td>
                  <td className="py-3 px-2 text-[13px] font-bold text-slate-900">{s.name}</td>
                  <td className="py-3 px-2 text-[13px] text-slate-500">{s.cls}</td>
                  <td className="py-3 px-2 text-[13px] text-slate-700">{s.math}</td>
                  <td className="py-3 px-2 text-[13px] text-slate-700">{s.lit}</td>
                  <td className="py-3 px-2 text-[13px] text-slate-700">{s.eng}</td>
                  <td className="py-3 px-2 text-[13px] font-bold text-slate-900">{s.avg}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-bold ${GRADE_STYLE[s.grade]}`}
                    >
                      {s.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}