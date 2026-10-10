"use client";
import type { FormEvent } from "react";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminSettingsPage() {
  const { isBn } = useLanguage();
  const [farmName, setFarmName] = useState("GreenRoot Agriculture & Organic Farm");
  const [hotline, setHotline] = useState("+880 1712-345678");
  const [email, setEmail] = useState("support@greenrootfarm.com");
  const [insideDhakaFee, setInsideDhakaFee] = useState("60");
  const [outsideDhakaFee, setOutsideDhakaFee] = useState("120");
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState("1500");
  const [bkashNumber, setBkashNumber] = useState("01712345678");
  const [enableCod, setEnableCod] = useState(true);
  const [enableBkash, setEnableBkash] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 text-white w-full">
      <div>
        <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
          {isBn ? "কনফিগারেশন ও সেটিংস" : "Configuration & Settings"}
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          {isBn ? "বিজনেস ও ডেলিভারি সেটিংস (Store Settings)" : "Store & Delivery Settings"}
        </h2>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <i className="fa-solid fa-circle-check text-base"></i>
          <span>
            {isBn
              ? "সেটিংস সফলভাবে সংরক্ষিত ও আপডেট করা হয়েছে!"
              : "Settings saved and updated successfully!"}
          </span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Store Info */}
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
          <h3 className="text-base font-extrabold text-white pb-3 border-b border-white/10 flex items-center gap-2">
            <i className="fa-solid fa-store text-[#E8AF30]"></i>
            {isBn ? "খামার ও ব্যবসা পরিচিতি" : "Farm & Business Profile"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "খামারের নাম" : "Farm / Store Name"}
              </label>
              <input
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "কাস্টমার সাপোর্ট হটলাইন" : "Customer Support Hotline"}
              </label>
              <input
                type="text"
                value={hotline}
                onChange={(e) => setHotline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "অফিসিয়াল ইমেইল" : "Official Support Email"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>
          </div>
        </div>

        {/* Bangladeshi Delivery Fee Setup */}
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
          <h3 className="text-base font-extrabold text-white pb-3 border-b border-white/10 flex items-center gap-2">
            <i className="fa-solid fa-truck-fast text-[#E8AF30]"></i>
            {isBn ? "ডেলিভারি চার্জ ও ফ্রি ডেলিভারি শর্ত" : "Delivery Fees & Thresholds"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "ঢাকা সিটির ভিতরে (৳)" : "Inside Dhaka City (৳)"}
              </label>
              <input
                type="number"
                value={insideDhakaFee}
                onChange={(e) => setInsideDhakaFee(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "ঢাকার বাহিরে (৳)" : "Outside Dhaka (৳)"}
              </label>
              <input
                type="number"
                value={outsideDhakaFee}
                onChange={(e) => setOutsideDhakaFee(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "ফ্রি ডেলিভারি ন্যূনতম কেনাকাটা (৳)" : "Free Delivery Minimum (৳)"}
              </label>
              <input
                type="number"
                value={freeDeliveryThreshold}
                onChange={(e) => setFreeDeliveryThreshold(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>
          </div>
        </div>

        {/* Bangladeshi Payments Setup */}
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
          <h3 className="text-base font-extrabold text-white pb-3 border-b border-white/10 flex items-center gap-2">
            <i className="fa-solid fa-money-bill-wave text-[#E8AF30]"></i>
            {isBn ? "পেমেন্ট মেথড কনফিগারেশন" : "Payment Gateways Configuration"}
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <h4 className="text-xs font-bold text-white">
                  {isBn
                    ? "ক্যাশ অন ডেলিভারি (Cash on Delivery - COD)"
                    : "Cash on Delivery (COD)"}
                </h4>
                <p className="text-[11px] text-stone-400">
                  {isBn
                    ? "পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা"
                    : "Pay in cash upon doorstep arrival"}
                </p>
              </div>
              <input
                type="checkbox"
                checked={enableCod}
                onChange={(e) => setEnableCod(e.target.checked)}
                className="w-5 h-5 accent-[#E8AF30] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {isBn
                      ? "বিকাশ / নগদ মার্চেন্ট পেমেন্ট (bKash Gateway)"
                      : "bKash / Nagad Mobile Wallet"}
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    {isBn
                      ? "অনলাইন অটোমেটেড মার্চেন্ট ওয়ালেট"
                      : "Instant automated mobile money checkout"}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={enableBkash}
                  onChange={(e) => setEnableBkash(e.target.checked)}
                  className="w-5 h-5 accent-[#E8AF30] cursor-pointer"
                />
              </div>

              {enableBkash && (
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    {isBn ? "মার্চেন্ট বিকাশ নম্বর" : "Merchant bKash Number"}
                  </label>
                  <input
                    type="text"
                    value={bkashNumber}
                    onChange={(e) => setBkashNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-[#E8AF30]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] text-xs font-extrabold shadow-xl transition-all"
          >
            {isBn ? "পরিবর্তন সংরক্ষণ করুন (Save Settings)" : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
