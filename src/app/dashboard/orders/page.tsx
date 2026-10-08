"use client";

import React, { useState } from "react";
import { initialOrders } from "@/data/orders";
import { OrderCard } from "@/components/dashboard";

export default function UserOrdersPage() {
  const [filter, setFilter] = useState<"all" | "out_for_delivery" | "delivered">("all");
  const [search, setSearch] = useState("");

  const filteredOrders = initialOrders.filter((order) => {
    const matchesFilter = filter === "all" || order.status === filter;
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some((i) => i.titleBn.includes(search) || i.title.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            আমার সকল অর্ডার (Order History)
          </h2>
          <p className="text-xs text-stone-500">
            মোট {initialOrders.length} টি খামার অর্ডারের বিস্তারিত রেকর্ড
          </p>
        </div>

        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="অর্ডার ID বা পণ্য খুঁজুন..."
            className="pl-9 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#002719] shadow-sm w-full sm:w-64"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            filter === "all"
              ? "bg-[#002719] text-white shadow-md"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          সব অর্ডার ({initialOrders.length})
        </button>
        <button
          onClick={() => setFilter("out_for_delivery")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            filter === "out_for_delivery"
              ? "bg-[#E8AF30] text-[#002719] shadow-md font-black"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          ডেলিভারির পথে (Live Tracking)
        </button>
        <button
          onClick={() => setFilter("delivered")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            filter === "delivered"
              ? "bg-[#002719] text-white shadow-md"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          ডেলিভারি সম্পন্ন
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              <i className="fa-solid fa-box-open"></i>
            </div>
            <h4 className="text-base font-bold text-stone-900 mb-1">কোনো অর্ডার পাওয়া যায়নি</h4>
            <p className="text-xs text-stone-500">অনুসন্ধান বা ফিল্টারের সাথে মিল রেখে কোনো অর্ডার নেই।</p>
          </div>
        )}
      </div>
    </div>
  );
}
