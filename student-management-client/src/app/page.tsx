import StatCard from "@/components/ui/stat-card";
import SubjectBar from "@/components/ui/subject-bar";
import { ACTIVITY, GRADE_STYLE, ICON_BUTTONS, SUBJECTS, TABLE_HEADERS, TOP_STUDENTS } from "@/constants/common";
import { LANGUAGES } from "@/constants/language";
import { ArrowUpRight, BarChart2, BookOpen, Layers, Search, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: LANGUAGES.META_TITLE_HOME,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-slate-50">
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

          {ICON_BUTTONS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              aria-label={label}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition"
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 px-8 py-7 flex flex-col gap-6">
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

        <div className="grid grid-cols-2 gap-4">
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