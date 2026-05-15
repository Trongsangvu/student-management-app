"use client";

import { NAV } from "@/constants/navigation";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "../ui/nav-icon";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col h-screen sticky top-0 bg-white border-r border-slate-100 overflow-y-auto">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <svg
            width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="white" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div>
          <p className="text-[14px] font-bold text-slate-900 leading-tight">EduTrack</p>
          <p className="text-[11px] text-slate-400 leading-tight">School Management</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-5 px-3 py-4" aria-label="Main navigation">
        {NAV.map((section) => (
          <div key={section.label} className="flex flex-col gap-0.5">
            <p className="px-2 mb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              {section.label}
            </p>

            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors",
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <NavIcon name={item.icon} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto min-w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-[11px] font-semibold px-1.5">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-slate-100">
        <button
          type="button"
          className="w-full flex items-center gap-3 rounded-lg px-2.5 py-2 hover:bg-slate-100 transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[12px] font-bold shrink-0">
            AT
          </div>
          <div className="overflow-hidden">
            <p className="text-[13px] font-semibold text-slate-900 truncate">Admin Tran</p>
            <p className="text-[11px] text-slate-400 truncate">Administrator</p>
          </div>
        </button>
      </div>
    </aside>
  );
}