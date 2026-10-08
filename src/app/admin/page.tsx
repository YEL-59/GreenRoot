"use client";

import React from "react";
import Link from "next/link";
import { initialAdminStats, initialFarmNotices } from "@/data/adminData";
import { initialOrders } from "@/data/orders";
import { StatCard, SalesRevenueChart } from "@/components/admin";

export default function AdminOverviewPage() {
  const stats = initialAdminStats;
  const recentOrders = initialOrders.slice(0, 4);

  return (
    <div className="space-y-8 text-white">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0b2218] via-[#0e2c1f] to-[#0b2218] border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8AF30]">
              গ্রীনরুট কেন্দ্রীয় খামার কমান্ড সেন্টার (HQ)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            ফার্ম বিজনেস ও ইনভেন্টরি কন্ট্রোল
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            আজকের বিক্রয়, কোল্ড-চেইন ডেলিভারি বহর এবং মানিকগঞ্জ ও সাভার খামারের স্টক পর্যবেক্ষণ করুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-black text-xs shadow-lg transition-all"
          >
            <i className="fa-solid fa-plus"></i>
            <span>নতুন পণ্য আপলোড</span>
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/10"
          >
            <i className="fa-solid fa-truck-fast text-[#E8AF30]"></i>
            <span>ডেলিভারি হ্যান্ডলার</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue (মোট রাজস্ব)"
          titleBn="চলতি মাসের মোট আয়"
          value={`৳${stats.totalRevenue.toLocaleString()}`}
          change="+18.4%"
          isPositive={true}
          icon="fa-solid fa-bangladeshi-taka-sign"
          accentColor="emerald"
        />
        <StatCard
          title="Today's Revenue (আজকের আয়)"
          titleBn="আজকের মোট বিক্রয়"
          value={`৳${stats.todayRevenue.toLocaleString()}`}
          change="+12.5%"
          isPositive={true}
          icon="fa-solid fa-sack-dollar"
          accentColor="amber"
        />
        <StatCard
          title="Orders (অর্ডার সংখ্যা)"
          titleBn="মোট সফল ডেলিভারি"
          value={`${stats.totalOrders} টি`}
          change={`${stats.todayOrders} টি আজ`}
          isPositive={true}
          icon="fa-solid fa-boxes-packing"
          accentColor="blue"
        />
        <StatCard
          title="Low Stock Alert (সীমিত স্টক)"
          titleBn="দ্রুত রি-স্টক প্রয়োজন"
          value={`${stats.lowStockCount} টি পণ্য`}
          change="সতর্কতা"
          isPositive={false}
          icon="fa-solid fa-triangle-exclamation"
          accentColor="purple"
        />
      </div>

      {/* Revenue Trends Chart & Category Shares */}
      <SalesRevenueChart />

      {/* Quick Orders & Farm Notices Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table (Col-span 2) */}
        <div className="lg:col-span-2 bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
                সাম্প্রতিক লেনদেন
              </span>
              <h3 className="text-lg font-black text-white">সর্বশেষ অর্ডারসমূহ</h3>
            </div>

            <Link
              href="/admin/orders"
              className="text-xs font-bold text-[#E8AF30] hover:text-amber-300 transition-colors"
            >
              সব দেখুন ({initialOrders.length}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-stone-400 text-[10px] uppercase">
                  <th className="py-2.5 px-3">অর্ডার আইডি</th>
                  <th className="py-2.5 px-3">গ্রাহক</th>
                  <th className="py-2.5 px-3">মূল্য</th>
                  <th className="py-2.5 px-3">পেমেন্ট</th>
                  <th className="py-2.5 px-3">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-mono font-bold text-white">{o.id}</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{o.customerName}</div>
                      <div className="text-[10px] text-stone-400">{o.shippingAddress.district}</div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-400">৳{o.total}</td>
                    <td className="py-3 px-3 uppercase text-[10px] font-bold text-stone-300">
                      {o.paymentMethod}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          o.status === "delivered"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : o.status === "out_for_delivery"
                            ? "bg-[#E8AF30]/20 text-[#E8AF30] animate-pulse"
                            : "bg-purple-500/20 text-purple-300"
                        }`}
                      >
                        {o.status === "out_for_delivery" ? "ডেলিভারির পথে" : o.status === "delivered" ? "ডেলিভার্ড" : o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Farm Notices / Content Updates (Col-span 1) */}
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
              খামার কমিউনিকেশন
            </span>
            <h3 className="text-lg font-black text-white mb-4">লাইভ খামার নোটিশ</h3>

            <div className="space-y-3">
              {initialFarmNotices.map((n) => (
                <div key={n.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#E8AF30]/20 text-[#E8AF30] border border-[#E8AF30]/30">
                      {n.badge}
                    </span>
                    <span className="text-[10px] text-stone-400">{n.date}</span>
                  </div>
                  <h5 className="text-xs font-bold text-white leading-snug">{n.titleBn}</h5>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/admin/content"
            className="mt-6 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center block transition-all"
          >
            নোটিশ ও কনটেন্ট পরিচালনা করুন →
          </Link>
        </div>
      </div>

      {/* Cold-Chain Fleet Status & Farm Harvest Production (Advanced Operations) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cold-Chain Fleet Monitor */}
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
                লজিস্টিকস ও বহর ট্র্যাকিং
              </span>
              <h3 className="text-lg font-black text-white">
                কোল্ড-চেইন ডেলিভারি বহর (Active Fleet)
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              ৩ টি যান সক্রিয়
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                id: "BD-402",
                name: "ইলেকট্রিক কোল্ড-ভ্যান #৪০২",
                driver: "মোঃ সাইফুল ইসলাম",
                route: "সাভার ➔ গাবতলী ➔ ধানমন্ডি",
                temp: "৩.৮° C",
                battery: "৮৫%",
                status: "ডেলিভারি চলমান",
                active: true,
              },
              {
                id: "BD-108",
                name: "ইকো কোল্ড-বাইক #১০৮",
                driver: "রফিকুল আলম",
                route: "বনানী ➔ গুলশান ➔ বারিধারা",
                temp: "৪.১° C",
                battery: "৯২%",
                status: "ডেলিভারি চলমান",
                active: true,
              },
              {
                id: "BD-901",
                name: "হেভি চিলার ট্রাক #৯০১",
                driver: "আনিসুর রহমান",
                route: "মানিকগঞ্জ ডেইরি ➔ ঢাকা সেন্ট্রাল হাব",
                temp: "৩.২° C",
                battery: "১০০%",
                status: "দুধ লোডিং সম্পন্ন",
                active: false,
              },
            ].map((v) => (
              <div
                key={v.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8AF30]/20 text-[#E8AF30] flex items-center justify-center text-lg font-bold">
                    <i className="fa-solid fa-truck-moving"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{v.name}</h4>
                      <span className="text-[10px] font-mono text-stone-400">({v.driver})</span>
                    </div>
                    <div className="text-[11px] text-stone-300 mt-0.5">{v.route}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="text-right">
                    <div className="text-emerald-400 font-bold flex items-center gap-1 font-mono">
                      <i className="fa-solid fa-snowflake text-[10px]"></i> {v.temp}
                    </div>
                    <div className="text-[10px] text-stone-400">চার্জ: {v.battery}</div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      v.active
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    {v.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farm Production & Harvest Yield Today */}
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
                খামার উৎপাদন ও ফসল কর্তন
              </span>
              <h3 className="text-lg font-black text-white">
                আজকের খামার উৎপাদন (Daily Harvest)
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E8AF30]/20 text-[#E8AF30] border border-[#E8AF30]/30">
              ১০০% ফ্রেশ
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-stone-400">মানিকগঞ্জ ডেইরি</span>
                <i className="fa-solid fa-cow text-[#E8AF30] text-xs"></i>
              </div>
              <div className="text-xl font-black text-white">৩২০ লিটার</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                ভোরের কাঁচা দুধ দোহন সম্পন্ন ✓
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-stone-400">সাভার অর্গানিক প্লট</span>
                <i className="fa-solid fa-leaf text-emerald-400 text-xs"></i>
              </div>
              <div className="text-xl font-black text-white">১৪০ আঁটি</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                লাল শাক ও পালং শাক ফ্রেশ হারভেস্ট ✓
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-stone-400">যশোর গুড় কুটির</span>
                <i className="fa-solid fa-jar text-amber-400 text-xs"></i>
              </div>
              <div className="text-xl font-black text-white">৪৫ কেজি</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                খাঁটি পাটালি গুড় তৈরি ও প্যাকিং ✓
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-stone-400">পাবনা কাঠের ঘানি</span>
                <i className="fa-solid fa-mortar-pestle text-yellow-400 text-xs"></i>
              </div>
              <div className="text-xl font-black text-white">৬০ লিটার</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                কোল্ড-প্রেসড সরিষার তেল ছাঁকন ✓
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
