"use client";

import { useState, useMemo } from "react";
import {
  initialAdminStats,
  analyticsData7d,
  analyticsData30d,
  analyticsData12m,
  bangladeshRegionalSales,
  paymentMethodStats,
  harvestVsDemandStats,
  AnalyticsTimeframeData,
} from "@/data/adminData";
import { useLanguage } from "@/context/LanguageContext";

export const SalesRevenueChart = () => {
  const { isBn } = useLanguage();
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "12m">("7d");
  const [metric, setMetric] = useState<"revenue" | "orders" | "aov" | "margin">("revenue");
  const [chartType, setChartType] = useState<"area" | "bar">("area");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Active dataset based on timeframe
  const activeDataset: AnalyticsTimeframeData[] = useMemo(() => {
    switch (timeframe) {
      case "30d":
        return analyticsData30d;
      case "12m":
        return analyticsData12m;
      case "7d":
      default:
        return analyticsData7d;
    }
  }, [timeframe]);

  // Metric value extractor
  const getMetricValue = (item: AnalyticsTimeframeData) => {
    switch (metric) {
      case "orders":
        return item.orders;
      case "aov":
        return item.aov;
      case "margin":
        return item.margin;
      case "revenue":
      default:
        return item.revenue;
    }
  };

  const metricLabel = useMemo(() => {
    switch (metric) {
      case "orders":
        return {
          name: isBn ? "অর্ডার সংখ্যা (Orders)" : "Total Orders",
          unit: isBn ? "টি" : "orders",
          prefix: "",
          isCurrency: false,
        };
      case "aov":
        return {
          name: isBn ? "গড় অর্ডার মূল্য (AOV)" : "Average Order Value (AOV)",
          unit: "",
          prefix: "৳",
          isCurrency: true,
        };
      case "margin":
        return {
          name: isBn ? "নিট লাভ মার্জিন (Margin)" : "Net Profit Margin",
          unit: "%",
          prefix: "",
          isCurrency: false,
        };
      case "revenue":
      default:
        return {
          name: isBn ? "মোট রাজস্ব আয় (Revenue)" : "Total Sales Revenue",
          unit: "",
          prefix: "৳",
          isCurrency: true,
        };
    }
  }, [metric, isBn]);

  const values = activeDataset.map(getMetricValue);
  const maxValue = Math.max(...values, 1);
  const minValue = Math.min(...values);
  const totalSum = activeDataset.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrdersSum = activeDataset.reduce((sum, item) => sum + item.orders, 0);
  const avgMargin = (
    activeDataset.reduce((sum, item) => sum + item.margin, 0) / activeDataset.length
  ).toFixed(1);

  // SVG Area / Line Chart coordinate calculations
  const svgWidth = 720;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 25;

  const points = useMemo(() => {
    const usableW = svgWidth - paddingX * 2;
    const usableH = svgHeight - paddingY * 2;
    const count = activeDataset.length;

    return activeDataset.map((item, idx) => {
      const val = getMetricValue(item);
      const x = paddingX + (idx / Math.max(count - 1, 1)) * usableW;
      const normalized = (val - (minValue > 0 ? minValue * 0.85 : 0)) / (maxValue - (minValue > 0 ? minValue * 0.85 : 0) || 1);
      const y = svgHeight - paddingY - normalized * usableH;
      return { x, y, val, item };
    });
  }, [activeDataset, metric, maxValue, minValue]);

  // Create smooth bezier path
  const areaPathD = useMemo(() => {
    if (points.length === 0) return { linePath: "", closedArea: "" };
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const cpX = (current.x + next.x) / 2;
      d += ` C ${cpX} ${current.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
    }
    const linePath = d;
    const closedArea = `${linePath} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;
    return { linePath, closedArea };
  }, [points]);

  const handleExportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["তারিখ / সময়,রাজস্ব (টাকা),অর্ডার সংখ্যা,গড় অর্ডার মূল্য,মার্জিন %"]
        .concat(
          activeDataset.map(
            (d) => `"${d.label}",${d.revenue},${d.orders},${d.aov},${d.margin}%`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `greenroot_sales_report_${timeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice("সফলভাবে CSV রিপোর্ট ডাউনলোড হয়েছে!");
    setTimeout(() => setExportNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Export Toast if active */}
      {exportNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center justify-between animate-fadeIn shadow-lg">
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-circle-check text-emerald-400"></i>
            {exportNotice}
          </span>
          <button
            onClick={() => setExportNotice(null)}
            className="text-stone-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Interactive Super Graph Card */}
      <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow ambient background effect */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#E8AF30]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Controls */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8AF30] animate-pulse"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E8AF30]">
                {isBn ? "গ্রীনরুট সুপার অ্যানালিটিক্স ও ডায়নামিক গ্রাফ" : "GreenRoot Super Analytics & Live Trends"}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-stone-300">
                {isBn ? "লাইভ রিফ্রেশ" : "Live Realtime"}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <span>{isBn ? "খামার বিক্রয় ও পারফরম্যান্স মেট্রিক" : "Farm Sales & Performance Analytics"}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                +{timeframe === "7d" ? "১৮.৪%" : timeframe === "30d" ? "২৪.২%" : "৪৮.৫%"} {isBn ? "গ্রোথ" : "Growth"}
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              {isBn ? "মোট সংগৃহীত রাজস্ব: " : "Total Sales Revenue: "}
              <span className="text-[#E8AF30] font-extrabold font-mono">
                ৳{totalSum.toLocaleString()}
              </span>{" "}
              | {isBn ? "সর্বমোট সফল ডেলিভারি: " : "Total Delivered: "}
              <span className="text-white font-bold">{totalOrdersSum} {isBn ? "টি" : "orders"}</span> |{" "}
              {isBn ? "গড় মুনাফা: " : "Avg Margin: "}
              <span className="text-emerald-400 font-bold">{avgMargin}%</span>
            </p>
          </div>

          {/* Controls: Timeframe & Metric & Chart Type */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Timeframe pill selector */}
            <div className="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 text-xs">
              {(
                [
                  { id: "7d", label: isBn ? "৭ দিন" : "7 Days" },
                  { id: "30d", label: isBn ? "৩০ দিন" : "30 Days" },
                  { id: "12m", label: isBn ? "১২ মাস" : "12 Mos" },
                ] as const
              ).map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => setTimeframe(tf.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    timeframe === tf.id
                      ? "bg-[#E8AF30] text-[#002719] shadow-md"
                      : "text-stone-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            {/* Metric pill selector */}
            <div className="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 text-xs">
              {(
                [
                  { id: "revenue", label: isBn ? "রাজস্ব (৳)" : "Revenue", icon: "fa-bangladeshi-taka-sign" },
                  { id: "orders", label: isBn ? "অর্ডার" : "Orders", icon: "fa-boxes-packing" },
                  { id: "aov", label: "AOV", icon: "fa-calculator" },
                  { id: "margin", label: isBn ? "মার্জিন %" : "Margin %", icon: "fa-chart-pie" },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMetric(m.id)}
                  className={`px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                    metric === m.id
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-stone-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <i className={`fa-solid ${m.icon} text-[10px]`}></i>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {/* Visual Type (Area vs Bar) */}
            <div className="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 text-xs">
              <button
                onClick={() => setChartType("area")}
                className={`p-1.5 rounded-xl transition-all ${
                  chartType === "area"
                    ? "bg-white/20 text-[#E8AF30]"
                    : "text-stone-400 hover:text-white"
                }`}
                title={isBn ? "কার্ভড এরিয়া চার্ট" : "Curved Area Chart"}
              >
                <i className="fa-solid fa-chart-area"></i>
              </button>
              <button
                onClick={() => setChartType("bar")}
                className={`p-1.5 rounded-xl transition-all ${
                  chartType === "bar"
                    ? "bg-white/20 text-[#E8AF30]"
                    : "text-stone-400 hover:text-white"
                }`}
                title={isBn ? "ভার্টিকাল বার চার্ট" : "Vertical Bar Chart"}
              >
                <i className="fa-solid fa-chart-column"></i>
              </button>
            </div>

            {/* Export CSV button */}
            <button
              onClick={handleExportData}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white text-xs font-bold border border-white/10 transition-all flex items-center gap-1.5"
              title={isBn ? "CSV রিপোর্ট ডাউনলোড" : "Download CSV Report"}
            >
              <i className="fa-solid fa-file-csv text-[#E8AF30]"></i>
              <span className="hidden sm:inline">{isBn ? "CSV এক্সপোর্ট" : "Export CSV"}</span>
            </button>
          </div>
        </div>

        {/* Visual Graph View Area */}
        <div className="relative z-10 pt-6">
          {/* Active Highlight Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-400">{isBn ? "বর্তমান ভিউ:" : "Current View:"}</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-extrabold font-mono">
                {metricLabel.name}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8AF30]"></span>
                {isBn ? "সর্বোচ্চ পিক: " : "Peak Peak: "}
                <strong className="text-white font-mono">
                  {metricLabel.prefix}
                  {maxValue.toLocaleString()}
                  {metricLabel.unit}
                </strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                {isBn ? "গড় মান: " : "Average: "}
                <strong className="text-white font-mono">
                  {metricLabel.prefix}
                  {Math.round(
                    values.reduce((a, b) => a + b, 0) / values.length
                  ).toLocaleString()}
                  {metricLabel.unit}
                </strong>
              </span>
            </div>
          </div>

          {/* Area / Curved Graph Representation */}
          {chartType === "area" ? (
            <div className="relative w-full overflow-hidden bg-black/20 rounded-2xl border border-white/5 p-2 sm:p-4">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-64 sm:h-72 overflow-visible select-none"
              >
                <defs>
                  {/* Glowing vertical gradient for filled area */}
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E8AF30" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#10b981" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#0b2218" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Line stroke gradient */}
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#E8AF30" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>

                  {/* Dot glow filter */}
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Horizontal reference grid lines */}
                {[0.2, 0.5, 0.8].map((ratio, i) => {
                  const yLine = svgHeight - paddingY - ratio * (svgHeight - paddingY * 2);
                  return (
                    <line
                      key={i}
                      x1={paddingX}
                      y1={yLine}
                      x2={svgWidth - paddingX}
                      y2={yLine}
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeDasharray="4 4"
                    />
                  );
                })}

                {/* Closed Area fill */}
                {areaPathD.closedArea && (
                  <path d={areaPathD.closedArea} fill="url(#areaGradient)" />
                )}

                {/* Smooth Curve stroke line */}
                {areaPathD.linePath && (
                  <path
                    d={areaPathD.linePath}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Interactive Points & Tooltips */}
                {points.map((pt, idx) => {
                  const isHovered = hoveredIdx === idx;
                  return (
                    <g
                      key={idx}
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      {/* Invisible hover area trigger */}
                      <circle cx={pt.x} cy={pt.y} r={20} fill="transparent" />

                      {/* Visible interactive dot */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 7 : 4.5}
                        fill={isHovered ? "#E8AF30" : "#10b981"}
                        stroke="#0b2218"
                        strokeWidth="2.5"
                        filter={isHovered ? "url(#glow)" : undefined}
                      />

                      {/* Vertical line indicator on hover */}
                      {isHovered && (
                        <line
                          x1={pt.x}
                          y1={paddingY}
                          x2={pt.x}
                          y2={svgHeight - paddingY}
                          stroke="#E8AF30"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                      )}

                      {/* X-axis labels */}
                      <text
                        x={pt.x}
                        y={svgHeight - 6}
                        textAnchor="middle"
                        fill={isHovered ? "#E8AF30" : "#a8a29e"}
                        fontSize="9.5"
                        fontWeight={isHovered ? "bold" : "normal"}
                      >
                        {pt.item.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Dynamic Floating Tooltip */}
              {hoveredIdx !== null && points[hoveredIdx] && (
                <div
                  className="absolute z-30 pointer-events-none bg-stone-900/95 border-2 border-[#E8AF30] text-white p-3 rounded-2xl shadow-2xl backdrop-blur-md transition-all -translate-x-1/2"
                  style={{
                    left: `${(points[hoveredIdx].x / svgWidth) * 100}%`,
                    top: "12px",
                  }}
                >
                  <div className="flex items-center justify-between gap-3 text-[10px] text-stone-400 mb-1 border-b border-white/10 pb-1">
                    <span className="font-bold text-[#E8AF30]">
                      {points[hoveredIdx].item.label}
                    </span>
                    <span>সফল অর্ডার</span>
                  </div>
                  <div className="text-base font-extrabold text-white font-mono">
                    {metricLabel.prefix}
                    {points[hoveredIdx].val.toLocaleString()}
                    {metricLabel.unit}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1.5 text-[10px] text-stone-300">
                    <div>
                      বিক্রয়:{" "}
                      <span className="font-mono text-emerald-400 font-bold">
                        ৳{points[hoveredIdx].item.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      {isBn ? "অর্ডার: " : "Orders: "}
                      <span className="font-mono text-white font-bold">
                        {points[hoveredIdx].item.orders} {isBn ? "টি" : "orders"}
                      </span>
                    </div>
                    <div>
                      AOV:{" "}
                      <span className="font-mono text-stone-200">
                        ৳{points[hoveredIdx].item.aov}
                      </span>
                    </div>
                    <div>
                      {isBn ? "মার্জিন: " : "Margin: "}
                      <span className="font-mono text-[#E8AF30] font-bold">
                        {points[hoveredIdx].item.margin}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Bar Chart View */
            <div className="h-64 sm:h-72 flex items-end justify-between gap-2 md:gap-4 pt-8 pb-4 px-2 border-b border-white/10 relative bg-black/20 rounded-2xl p-4">
              {activeDataset.map((item, idx) => {
                const val = getMetricValue(item);
                const heightPercent = Math.round((val / maxValue) * 100);
                const isHovered = hoveredIdx === idx;

                return (
                  <div
                    key={item.label}
                    className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {isHovered && (
                      <div className="absolute -top-14 z-30 bg-stone-900 border border-[#E8AF30] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl whitespace-nowrap animate-fadeIn">
                        <span className="text-[#E8AF30]">
                          {metricLabel.prefix}
                          {val.toLocaleString()}
                          {metricLabel.unit}
                        </span>
                        <span className="text-stone-400 block text-[10px]">
                          {item.orders} {isBn ? "টি সফল ডেলিভারি" : "completed orders"}
                        </span>
                      </div>
                    )}

                    <div
                      className={`w-full max-w-[48px] rounded-t-xl transition-all duration-300 ${
                        isHovered
                          ? "bg-[#E8AF30] shadow-lg shadow-[#E8AF30]/40 scale-y-105"
                          : "bg-gradient-to-t from-emerald-600 to-teal-400 hover:from-emerald-500 hover:to-teal-300"
                      }`}
                      style={{ height: `${Math.max(heightPercent, 8)}%` }}
                    />

                    <span className="text-[10px] sm:text-[11px] font-semibold text-stone-400 block whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Key Insights Footer */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-wand-magic-sparkles text-[#E8AF30]"></i>
              <span>
                <strong>{isBn ? "ফার্ম ইনসাইট: " : "Farm Insight: "}</strong>
                {isBn
                  ? "প্রতিদিন সকাল ৬টা থেকে ৯টার মধ্যে ভোরের তাজা দুধ ও শাকসবজির অর্ডার ৬০% বৃদ্ধি পায়।"
                  : "Fresh morning raw milk & vegetable orders surge by 60% between 6 AM and 9 AM."}
              </span>
            </div>
            <div className="text-[11px] text-stone-400">
              {isBn
                ? "* বিএসটিআই ও খামার ল্যাব টেস্ট রিপোর্ট অনুযায়ী প্রতিদিনের কোল্ড-চেইন ডেটা সিঙ্ক করা"
                : "* Cold-chain and lab verified quality parameters synced continuously"}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Regional Bangladesh Sales & Payment Settlement Mix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bangladesh Regional Division Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
                  {isBn ? "আঞ্চলিক বিক্রয় ও ডেলিভারি কর্মক্ষমতা" : "Regional Sales & Delivery Breakdown"}
                </span>
                <h4 className="text-lg font-extrabold text-white">
                  {isBn
                    ? "বাংলাদেশের বিভাগ ও জোনভিত্তিক বিতরণ (Regional Share)"
                    : "Bangladesh Regional Distribution Share"}
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {isBn ? "৫টি সক্রিয় হাব" : "5 Active Hubs"}
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {bangladeshRegionalSales.map((region) => (
                <div
                  key={region.division}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <h5 className="text-xs font-extrabold text-white">
                        {isBn ? region.divisionBn : region.division}
                      </h5>
                      <span className="text-[10px] text-stone-400 block">{region.topAreas}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-mono font-bold text-[#E8AF30]">
                        ৳{region.revenue.toLocaleString()}
                      </span>
                      <span className="font-mono text-stone-300">
                        ({region.orders} {isBn ? "অর্ডার" : "orders"})
                      </span>
                      <span className="font-extrabold text-white px-2 py-0.5 rounded bg-white/10 text-[10px]">
                        {region.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-[#E8AF30]"
                      style={{ width: `${region.percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-stone-400 mt-2">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <i className="fa-solid fa-circle-check text-[9px]"></i>
                      {isBn ? `সফলতা হার: ${region.deliverySuccess}%` : `Success Rate: ${region.deliverySuccess}%`}
                    </span>
                    <span>
                      {isBn
                        ? `গড় ডেলিভারি সময়: ${region.avgHours} ঘণ্টা`
                        : `Avg Delivery: ${region.avgHours} hrs`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-stone-300 flex items-center justify-between">
            <span className="text-[11px]">
              {isBn
                ? "ঢাকা সিটিতে ভোরবেলার এক্সপ্রেস কোল্ড-চেইন বহর কার্যকর হওয়ায় রিটার্ন হার ১% এর নিচে।"
                : "Morning cold-chain express vans in Dhaka achieve sub-1% return rates."}
            </span>
          </div>
        </div>

        {/* Payment Gateways & Settlement Split (5 cols) */}
        <div className="lg:col-span-5 bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
                  {isBn ? "পেমেন্ট পদ্ধতি ও তহবিল সেটেলমেন্ট" : "Payment Methods & Settlement Mix"}
                </span>
                <h4 className="text-lg font-extrabold text-white">
                  {isBn ? "লেনদেন অনুপাত (Payment Mix)" : "Transaction Mix (Payment Share)"}
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8AF30]/20 text-[#E8AF30]">
                {isBn ? "১০০% ভেরিফাইড" : "100% Reconciled"}
              </span>
            </div>

            {/* Split Visual Bar */}
            <div className="w-full h-4 rounded-xl overflow-hidden flex mb-6 border border-white/10 shadow-inner">
              {paymentMethodStats.map((p) => (
                <div
                  key={p.method}
                  style={{ width: `${p.share}%`, backgroundColor: p.color }}
                  title={`${isBn ? p.methodBn : p.method}: ${p.share}%`}
                  className="h-full transition-all hover:opacity-90"
                />
              ))}
            </div>

            {/* Payment method cards */}
            <div className="space-y-3">
              {paymentMethodStats.map((p) => (
                <div
                  key={p.method}
                  className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: p.color }}
                    >
                      <i className={p.icon}></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-white">
                          {isBn ? p.methodBn : p.method}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-stone-300">
                          {p.badge}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 block">{p.settlementStatus}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-extrabold text-white font-mono">
                      ৳{p.amount.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-bold text-[#E8AF30] font-mono">
                      {p.share}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3.5 rounded-2xl bg-amber-500/10 border border-[#E8AF30]/30 text-xs text-amber-200">
            <i className="fa-solid fa-coins text-[#E8AF30] mr-2"></i>
            <strong>{isBn ? "নগদ ট্র্যাকিং: " : "Cash Logistics: "}</strong>
            {isBn
              ? "ক্যাশ অন ডেলিভারি (COD) এর ৯৭,৫১০ টাকা রাইডারদের কোল্ড-ভল্ট থেকে প্রতিদিন ব্যাংকে ডিপোজিট হয়।"
              : "৳97,510 from Cash on Delivery (COD) riders deposited into bank account daily."}
          </div>
        </div>
      </div>

      {/* Row 3: Farm Harvest Yield vs Consumer Demand Matrix */}
      <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
              {isBn ? "আজকের সরবরাহ ও চাহিদা ভারসাম্য" : "Daily Supply & Demand Balance"}
            </span>
            <h4 className="text-lg font-extrabold text-white">
              {isBn
                ? "খামার উৎপাদন বনাম গ্রাহকের অর্ডার চাহিদা (Harvest vs Demand Matrix)"
                : "Farm Yield vs Customer Order Demand Matrix"}
            </h4>
          </div>
          <span className="text-xs text-stone-300 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            {isBn ? "আজকের ফিল রেট: " : "Daily Fill Rate: "}
            <strong className="text-emerald-400">১০২.২%</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {harvestVsDemandStats.map((item) => (
            <div
              key={item.item}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      item.status === "surplus"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : item.status === "balanced"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}
                  >
                    {item.status === "surplus"
                      ? (isBn ? "উদ্বৃত্ত মজুদ" : "Surplus Stock")
                      : item.status === "balanced"
                      ? (isBn ? "ভারসাম্যপূর্ণ" : "Balanced")
                      : (isBn ? "উচ্চ চাহিদা" : "High Demand")}
                  </span>
                  <span className="text-[10px] font-mono text-[#E8AF30] font-bold">
                    {item.fillRate}%
                  </span>
                </div>

                <h5 className="text-xs font-bold text-white mt-1 leading-snug">
                  {isBn ? item.itemBn : item.item}
                </h5>
                <span className="text-[10px] text-stone-400 block mt-0.5">{item.sourceOrigin}</span>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 space-y-1 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>{isBn ? "আজকের ফলন:" : "Harvest Yield:"}</span>
                  <strong className="text-white font-mono">
                    {item.harvestToday} {item.unit}
                  </strong>
                </div>
                <div className="flex justify-between text-stone-400 text-[11px]">
                  <span>{isBn ? "অর্ডার চাহিদা:" : "Order Demand:"}</span>
                  <span className="font-mono text-stone-300">
                    {item.demandToday} {item.unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
