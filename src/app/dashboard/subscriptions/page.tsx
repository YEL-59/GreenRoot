"use client";

import { SubscriptionCard } from "@/components/dashboard";

export default function UserSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            খামার নিয়মিত সরবরাহ (Subscriptions)
          </h2>
          <p className="text-xs text-stone-500">
            নিয়মিত খাঁটি গরুর দুধ ও মৌসুমি অর্গানিক সবজির ঝুড়ি সরাসরি আপনার দরজায়
          </p>
        </div>
      </div>

      <SubscriptionCard />

      {/* Subscription Benefits Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-bold mb-3">
            <i className="fa-solid fa-clock"></i>
          </div>
          <h4 className="text-xs font-extrabold text-stone-900">ভোরবেলার নিশ্চিন্ত সরবরাহ</h4>
          <p className="text-[11px] text-stone-600 mt-1">প্রতিদিন সকাল ৭:০০ টার মধ্যে তাজা কাঁচা দুধ ফ্রিজে রাখার সুবিধা।</p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
          <div className="w-9 h-9 rounded-xl bg-[#E8AF30] text-[#002719] flex items-center justify-center text-sm font-bold mb-3">
            <i className="fa-solid fa-pause"></i>
          </div>
          <h4 className="text-xs font-extrabold text-stone-900">যেকোনো সময় পজ বা বন্ধ</h4>
          <p className="text-[11px] text-stone-600 mt-1">ছুটিতে বা ভ্রমণের সময় কোনো চার্জ ছাড়াই ডেলিভারি পজ করার সুবিধা।</p>
        </div>

        <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold mb-3">
            <i className="fa-solid fa-percent"></i>
          </div>
          <h4 className="text-xs font-extrabold text-stone-900">ফ্রি ডেলিভারি চার্জ</h4>
          <p className="text-[11px] text-stone-600 mt-1">সকল মাসিক সাবস্ক্রিপশনে হোম ডেলিভারি সম্পূর্ণ ফ্রি।</p>
        </div>
      </div>
    </div>
  );
}
