"use client";


export type StatCardProps = {
  title: string;
  titleBn: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: string;
  accentColor?: "emerald" | "amber" | "blue" | "purple";
};

export const StatCard = ({
  title,
  titleBn,
  value,
  change,
  isPositive = true,
  icon,
  accentColor = "emerald",
}: StatCardProps) => {
  const colorMap = {
    emerald: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
    amber: "from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30",
    blue: "from-blue-500/20 to-cyan-500/10 text-blue-400 border-blue-500/30",
    purple: "from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30",
  };

  return (
    <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 shadow-lg hover:border-white/20 transition-all group">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider block">
            {title}
          </span>
          <h4 className="text-sm font-bold text-stone-200 mt-0.5">{titleBn}</h4>
        </div>

        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorMap[accentColor]} border flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform`}
        >
          <i className={icon}></i>
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2 mt-2">
        <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {value}
        </div>

        {change && (
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
              isPositive
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            <i
              className={`fa-solid ${
                isPositive ? "fa-arrow-trend-up" : "fa-arrow-trend-down"
              } text-[10px]`}
            ></i>
            {change}
          </span>
        )}
      </div>
    </div>
  );
};
