"use client";

import { useState } from "react";
import type { FarmSubscription } from "@/types";
import { initialUserProfile } from "@/data/userProfile";

export const SubscriptionCard = () => {
  const [subscriptions, setSubscriptions] = useState<FarmSubscription[]>(
    initialUserProfile.subscriptions
  );

  const toggleStatus = (id: string) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === id
          ? { ...sub, status: sub.status === "active" ? "paused" : "active" }
          : sub
      )
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-black text-stone-900">ফার্ম ডেলিভারি সাবস্ক্রিপশন (Regular Deliveries)</h3>
          <p className="text-xs text-stone-500">প্রতিদিন বা প্রতি সপ্তাহে ঝামেলামুক্ত সরাসরি খামার থেকে তরতাজা সরবরাহ</p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit">
          {subscriptions.filter((s) => s.status === "active").length} টি সক্রিয় সাবস্ক্রিপশন
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subscriptions.map((sub) => {
          const isActive = sub.status === "active";

          return (
            <div
              key={sub.id}
              className={`p-6 rounded-2xl border transition-all ${
                isActive
                  ? "bg-gradient-to-br from-white to-emerald-50/30 border-emerald-200 shadow-sm"
                  : "bg-stone-50 border-stone-200 opacity-75"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#002719] text-[#E8AF30] flex items-center justify-center text-xl shadow-md">
                    <i className={sub.icon}></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-stone-900">{sub.titleBn}</h4>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8AF30]/20 text-[#002719] border border-[#E8AF30]/30">
                      ফ্রিকোয়েন্সি: {sub.frequency}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {isActive ? "সক্রিয় (Active)" : "স্থগিত (Paused)"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-stone-200/80 mb-4 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-stone-600">
                  <span>পণ্য তালিকা:</span>
                  <span className="font-bold text-stone-800">{sub.items}</span>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span>পরবর্তী ডেলিভারি:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <i className="fa-regular fa-clock text-[10px]"></i>
                    {sub.nextDelivery}
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-600 pt-1.5 border-t border-stone-100">
                  <span>প্রতি ডেলিভারি মূল্য:</span>
                  <span className="text-sm font-black text-stone-900">৳{sub.pricePerCycle}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => toggleStatus(sub.id)}
                  className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    isActive
                      ? "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
                      : "bg-[#002719] hover:bg-[#003824] text-white"
                  }`}
                >
                  {isActive ? "সাময়িক বন্ধ করুন (Pause)" : "পুনরায় চালু করুন (Resume)"}
                </button>

                <button
                  onClick={() => alert("পরবর্তী ডেলিভারির সময় পরিবর্তন করা হয়েছে।")}
                  className="py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold"
                  title="Modify schedule"
                >
                  <i className="fa-solid fa-calendar-days"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
