import { letterGrade } from "../types/student-type";

const STYLES: Record<string, string> = {
  A: "bg-green-100 text-green-800",
  B: "bg-blue-50 text-blue-700",
  C: "bg-amber-50 text-amber-700",
  D: "bg-red-50 text-red-700",
};

export function GradeBadge({ average }: { average: number }) {
  const g = letterGrade(average);
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${STYLES[g]}`}>
      {g}
    </span>
  );
}