"use client";

import React, { useState } from "react";
import { initialAdminStats } from "@/data/adminData";

export function SalesRevenueChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const data = initialAdminStats.recentSales;
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 7-Day Revenue Trend (Col-span 2) */}
      <div className="lg:col-span-2 bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
              সাপ্তাহিক বিক্রয় রিপোর্ট (Weekly Trend)
            </span>
            <h3 className="text-lg md:text-xl font-black text-white">দৈনিক রাজস্ব আয় (Daily Revenue)</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-stone-300">
              গত ৭ দিনের মোট: ৳২,৫৩,৬০০
            </span>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-2 md:gap-4 pt-8 pb-4 px-2 border-b border-white/10 relative">
          {data.map((item, idx) => {
            const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.date}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-12 z-20 bg-stone-900 border border-[#E8AF30] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl whitespace-nowrap animate-fadeIn">
                    <span className="text-[#E8AF30]">৳{item.revenue.toLocaleString()}</span>
                    <span className="text-stone-400 block text-[10px]">{item.orders} টি অর্ডার</span>
                  </div>
                )}

                {/* Animated Bar */}
                <div
                  className={`w-full max-w-[48px] rounded-t-xl transition-all duration-300 ${
                    isHovered
                      ? "bg-[#E8AF30] shadow-lg shadow-[#E8AF30]/40 scale-y-105"
                      : "bg-gradient-to-t from-emerald-600 to-teal-400 hover:from-emerald-500 hover:to-teal-300"
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />

                <span className="text-[11px] font-semibold text-stone-400 block whitespace-nowrap">
                  {item.date}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-stone-400 pt-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            স্বাভাবিক দিন
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8AF30] inline-block"></span>
            সর্বোচ্চ বিক্রয় (০৭ অক্টোবর ৳৪৫,৬০০)
          </span>
        </div>
      </div>

      {/* Category Breakdown (Col-span 1) */}
      <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
        <div>
          <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block mb-1">
            পণ্য বিভাগীয় অনুপাত
          </span>
          <h3 className="text-lg font-black text-white mb-6">ক্যাটাগরি অনুযায়ী আয় (Share)</h3>

          <div className="space-y-4">
            {initialAdminStats.categoryRevenue.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-stone-200">{cat.categoryBn}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-stone-400">৳{cat.amount.toLocaleString()}</span>
                    <span className="font-bold text-[#E8AF30]">{cat.percentage}%</span>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#E8AF30]"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-stone-300">
          <i className="fa-solid fa-lightbulb text-[#E8AF30] mr-2"></i>
          <span className="font-semibold text-white">ইনসাইট:</span> দুধ ও দুগ্ধজাত পণ্য এবং প্রাকৃতিক মধু খামারের মোট আয়ের ৫৯% অবদান রাখছে।
        </div>
      </div>
    </div>
  );
};
