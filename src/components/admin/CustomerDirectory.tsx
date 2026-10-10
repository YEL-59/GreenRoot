"use client";

import { useState } from "react";
import { initialCustomers, type AdminCustomer } from "@/data/adminData";
import { useLanguage } from "@/context/LanguageContext";

export const CustomerDirectory = () => {
  const { isBn } = useLanguage();
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
            {isBn ? "গ্রাহক ডাটাবেজ ও সিআরএম" : "Customer Database & CRM"}
          </span>
          <h3 className="text-xl font-extrabold text-white">
            {isBn
              ? `রেজিস্টার্ড কাস্টমার তালিকা (${filtered.length} জন)`
              : `Registered Customers (${filtered.length} users)`}
          </h3>
        </div>

        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isBn ? "গ্রাহকের নাম বা ফোন..." : "Search customer name or phone..."}
            className="pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#E8AF30] w-60"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-stone-400 uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">{isBn ? "গ্রাহক" : "Customer"}</th>
              <th className="py-3 px-4">{isBn ? "ঠিকানা / শহর" : "City / Location"}</th>
              <th className="py-3 px-4">{isBn ? "মোট অর্ডার" : "Total Orders"}</th>
              <th className="py-3 px-4">{isBn ? "লাইফটাইম খরচ (LTV)" : "Lifetime Value (LTV)"}</th>
              <th className="py-3 px-4">{isBn ? "সর্বশেষ অর্ডার" : "Last Order"}</th>
              <th className="py-3 px-4 text-right">{isBn ? "স্ট্যাটাস" : "Status"}</th>
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
                  {c.totalOrders} {isBn ? "টি" : "orders"}
                </td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-emerald-400">
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
                    {c.status === "vip" ? (isBn ? "★ গ্রীন ভিআইপি" : "★ Green VIP") : (isBn ? "সক্রিয়" : "Active")}
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
