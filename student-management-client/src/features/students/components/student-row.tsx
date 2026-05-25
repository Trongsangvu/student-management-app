import { AVATAR_COLORS } from "@/constants/common";
import { routes } from "@/lib/routes";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { avg, Student } from "../types/student-type";
import { initials } from "../utils/student-util";
import { GradeBadge } from "./grade-badge";

function StudentRow({ student: s, index }: { student: Student; index: number; }) {
  const a = avg(s);
  const col = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-3 py-2.5 border-b border-gray-100">
        <input type="checkbox" aria-label={`Select ${s.name}`} className="cursor-pointer" />
      </td>

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

      <td className="px-3 py-2.5 border-b border-gray-100">
        <div className="flex gap-1">
          <Link
            href={routes.studentDetail(s.id)}
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

export default StudentRow;