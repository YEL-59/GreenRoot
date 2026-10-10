"use client";

import { SubscriptionCard } from "@/components/dashboard";
import { useLanguage } from "@/context/LanguageContext";

export default function UserSubscriptionsPage() {
  const { isBn } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
            {isBn ? "খামার নিয়মিত সরবরাহ (Subscriptions)" : "Farm Deliveries & Subscriptions"}
          </h2>
          <p className="text-xs text-stone-500">
            {isBn
              ? "নিয়মিত খাঁটি গরুর দুধ ও মৌসুমি অর্গানিক সবজির ঝুড়ি সরাসরি আপনার দরজায়"
              : "Fresh grass-fed raw cow milk and seasonal organic vegetable baskets delivered straight to your doorstep"}
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
          <h4 className="text-xs font-extrabold text-stone-900">
            {isBn ? "ভোরবেলার নিশ্চিন্ত সরবরাহ" : "Dawn Morning Deliveries"}
          </h4>
          <p className="text-[11px] text-stone-600 mt-1">
            {isBn
              ? "প্রতিদিন সকাল ৭:০০ টার মধ্যে তাজা কাঁচা দুধ ফ্রিজে রাখার সুবিধা।"
              : "Pure cold-chain milk delivered before 07:00 AM every morning."}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
          <div className="w-9 h-9 rounded-xl bg-[#E8AF30] text-[#002719] flex items-center justify-center text-sm font-bold mb-3">
            <i className="fa-solid fa-pause"></i>
          </div>
          <h4 className="text-xs font-extrabold text-stone-900">
            {isBn ? "যেকোনো সময় পজ বা বন্ধ" : "Pause or Resume Anytime"}
          </h4>
          <p className="text-[11px] text-stone-600 mt-1">
            {isBn
              ? "ছুটিতে বা ভ্রমণের সময় কোনো চার্জ ছাড়াই ডেলিভারি পজ করার সুবিধা।"
              : "Pause deliveries anytime during vacations or trips with zero penalty."}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold mb-3">
            <i className="fa-solid fa-percent"></i>
          </div>
          <h4 className="text-xs font-extrabold text-stone-900">
            {isBn ? "ফ্রি ডেলিভারি চার্জ" : "100% Free Delivery Fee"}
          </h4>
          <p className="text-[11px] text-stone-600 mt-1">
            {isBn
              ? "সকল মাসিক সাবস্ক্রিপশনে হোম ডেলিভারি সম্পূর্ণ ফ্রি।"
              : "All monthly recurring farm subscriptions come with free shipping."}
          </p>
        </div>
      </div>
    </div>
  );
}

