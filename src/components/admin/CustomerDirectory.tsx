"use client";

import React, { useState } from "react";
import { initialCustomers, type AdminCustomer } from "@/data/adminData";

export function CustomerDirectory() {
  const [customers] = useState<AdminCustomer[]>(initialCustomers);
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
            গ্রাহক ডাটাবেজ ও সিআরএম
          </span>
          <h3 className="text-xl font-black text-white">
            রেজিস্টার্ড কাস্টমার তালিকা ({filtered.length} জন)
          </h3>
        </div>

        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="গ্রাহকের নাম বা ফোন..."
            className="pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#E8AF30] w-60"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-stone-400 uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">গ্রাহক</th>
              <th className="py-3 px-4">ঠিকানা / শহর</th>
              <th className="py-3 px-4">মোট অর্ডার</th>
              <th className="py-3 px-4">লাইফটাইম খরচ (LTV)</th>
              <th className="py-3 px-4">সর্বশেষ অর্ডার</th>
              <th className="py-3 px-4 text-right">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-white text-sm">{c.name}</div>
                  <div className="text-[11px] text-stone-400 font-mono">{c.phone}</div>
                </td>
                <td className="py-3.5 px-4 text-stone-300">{c.city}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-stone-200">
                  {c.totalOrders} টি
                </td>
                <td className="py-3.5 px-4 font-mono font-black text-emerald-400">
                  ৳{c.totalSpent.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-stone-400">{c.lastOrderDate}</td>
                <td className="py-3.5 px-4 text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      c.status === "vip"
                        ? "bg-[#E8AF30]/20 text-[#E8AF30] border border-[#E8AF30]/40 font-extrabold"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {c.status === "vip" ? "★ Green VIP" : "Active"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
