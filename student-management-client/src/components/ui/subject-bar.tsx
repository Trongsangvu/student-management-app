type Props = {
  subject: string;
  score: number;
  color: string;
};

export default function SubjectBar({
  subject,
  score,
  color,
}: Props) {
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