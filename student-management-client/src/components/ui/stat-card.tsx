type Props = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub: React.ReactNode;
};

export default function StatCard({
  icon,
  label,
  value,
  sub,
}: Props) {
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