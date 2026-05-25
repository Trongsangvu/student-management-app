type Props = {
  label: string;
  value: string;
  sub: string;
  danger?: boolean;
};

export default function MetricCard({ label, value, sub, danger }: Props) {
  return (
    <div className="bg-gray-100 rounded-lg px-4 py-3.5">
      <p className="text-[12px] text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${danger ? "text-red-700" : "text-gray-900"}`}>{value}</p>
      <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}