"use client";

import React from "react";
import type { OrderTrackingInfo } from "@/types";

export type TrackingTimelineProps = {
  tracking: OrderTrackingInfo;
};

export const TrackingTimeline = ({ tracking }: TrackingTimelineProps) => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-black text-stone-900">ডেলিভারি পর্যায়ক্রম (Delivery Timeline)</h3>
          <p className="text-xs text-stone-500">প্রতিটি ধাপ খামার ও কোল্ড-চেইন প্রক্রিয়ার মাধ্যমে ট্র্যাক করা হয়</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8AF30]/15 text-[#002719] border border-[#E8AF30]/30">
          অগ্রগতি: {tracking.routeProgress}%
        </span>
      </div>

      <div className="relative">
        {/* Continuous track line */}
        <div className="absolute top-6 bottom-6 left-5 md:left-6 w-0.5 bg-stone-200">
          <div
            className="w-full bg-[#10b981] transition-all duration-700"
            style={{ height: `${tracking.routeProgress}%` }}
          />
        </div>

        <div className="space-y-8">
          {tracking.timeline.map((step, idx) => {
            const isCompleted = step.completed;
            const isCurrent = step.current;

            return (
              <div key={idx} className="relative flex items-start gap-4 md:gap-6 group">
                {/* Step Circle Pin */}
                <div
                  className={`relative z-10 w-10 md:w-12 h-10 md:h-12 rounded-2xl flex items-center justify-center shrink-0 font-bold text-sm transition-all shadow-md ${
                    isCompleted
                      ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                      : isCurrent
                      ? "bg-[#E8AF30] text-[#002719] ring-4 ring-[#E8AF30]/30 animate-pulse scale-105"
                      : "bg-stone-100 text-stone-400 border border-stone-200"
                  }`}
                >
                  {isCompleted ? (
                    <i className="fa-solid fa-check text-sm"></i>
                  ) : isCurrent ? (
                    <i className="fa-solid fa-truck-ramp-box text-sm"></i>
                  ) : (
                    <span className="text-xs">{idx + 1}</span>
                  )}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? "bg-amber-50/60 border-[#E8AF30]/60 shadow-sm"
                      : isCompleted
                      ? "bg-stone-50/70 border-stone-200"
                      : "bg-white border-stone-100 opacity-60"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4
                      className={`text-sm md:text-base font-extrabold ${
                        isCurrent
                          ? "text-[#002719]"
                          : isCompleted
                          ? "text-stone-900"
                          : "text-stone-400"
                      }`}
                    >
                      {step.titleBn}
                    </h4>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        isCurrent
                          ? "bg-[#E8AF30] text-[#002719] font-bold"
                          : "text-stone-400 bg-white border border-stone-200"
                      }`}
                    >
                      {step.time}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {step.description}
                  </p>

                  {isCurrent && (
                    <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1.5 rounded-xl w-fit">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                      বর্তমানে এই ধাপে সক্রিয়ভাবে কাজ চলছে
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
