"use client";

import { useState } from "react";
import Link from "next/link";

type Coupon = {
  id: string;
  code: string;
  discountType: "percentage" | "fixed" | "free_shipping";
  discountValue: number;
  minOrder: number;
  timesUsed: number;
  maxUsage: number;
  expiryDate: string;
  isActive: boolean;
};

const initialCoupons: Coupon[] = [
  {
    id: "CPN-01",
    code: "GREEN10",
    discountType: "percentage",
    discountValue: 10,
    minOrder: 800,
    timesUsed: 184,
    maxUsage: 500,
    expiryDate: "2026-12-31",
    isActive: true,
  },
  {
    id: "CPN-02",
    code: "EIDMUBARAK",
    discountType: "fixed",
    discountValue: 150,
    minOrder: 1500,
    timesUsed: 92,
    maxUsage: 200,
    expiryDate: "2026-11-15",
    isActive: true,
  },
  {
    id: "CPN-03",
    code: "FREESHIP",
    discountType: "free_shipping",
    discountValue: 60,
    minOrder: 1000,
    timesUsed: 65,
    maxUsage: 300,
    expiryDate: "2026-10-31",
    isActive: true,
  },
  {
    id: "CPN-04",
    code: "WELCOME50",
    discountType: "fixed",
    discountValue: 50,
    minOrder: 500,
    timesUsed: 71,
    maxUsage: 100,
    expiryDate: "2026-10-25",
    isActive: false,
  },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [showModal, setShowModal] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState<"percentage" | "fixed">("percentage");
  const [newValue, setNewValue] = useState(10);
  const [newMinOrder, setNewMinOrder] = useState(1000);
  const [newExpiry, setNewExpiry] = useState("2026-12-31");

  const toggleCoupon = (id: string) => {
    setCoupons(
      coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const createdCoupon: Coupon = {
      id: `CPN-0${coupons.length + 1}`,
      code: newCode.toUpperCase().trim(),
      discountType: newType,
      discountValue: Number(newValue),
      minOrder: Number(newMinOrder),
      timesUsed: 0,
      maxUsage: 250,
      expiryDate: newExpiry,
      isActive: true,
    };
    setCoupons([createdCoupon, ...coupons]);
    setShowModal(false);
    setNewCode("");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-1">
            <Link href="/admin" className="hover:text-emerald-400">অ্যাডমিন কনসোল</Link>
            <span>/</span>
            <span className="text-white font-bold">ডিসকাউন্ট ভাউচার ও কুপন</span>
          </nav>
          <h1 className="text-2xl font-extrabold text-white">
            প্রমোশন ক্যাম্পেইন ও ডিসকাউন্ট কুপন ম্যানেজমেন্ট
          </h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E8AF30] to-amber-500 hover:from-amber-400 hover:to-[#E8AF30] text-[#002719] font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-plus text-xs"></i>
          নতুন কুপন কোড তৈরি করুন
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 text-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E8AF30]/15 text-[#E8AF30] border border-[#E8AF30]/30 flex items-center justify-center text-xl">
            <i className="fa-solid fa-ticket"></i>
          </div>
          <div>
            <div className="text-[11px] text-stone-400 uppercase font-bold">সক্রিয় কুপন ক্যাম্পেইন</div>
            <div className="text-2xl font-extrabold">{coupons.filter((c) => c.isActive).length} টি চালু আছে</div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 text-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl">
            <i className="fa-solid fa-users"></i>
          </div>
          <div>
            <div className="text-[11px] text-stone-400 uppercase font-bold">মোট কুপন রিডেম্পশন</div>
            <div className="text-2xl font-extrabold">৪১২ বার ব্যবহার হয়েছে</div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 text-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center text-xl">
            <i className="fa-solid fa-hand-holding-dollar"></i>
          </div>
          <div>
            <div className="text-[11px] text-stone-400 uppercase font-bold">গ্রাহকদের মোট সাশ্রয়</div>
            <div className="text-2xl font-extrabold text-emerald-400">৳৩৮,৫০০ BDT</div>
          </div>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-extrabold text-white text-base">সকল প্রমো কোড ও ক্যাম্পেইন</h3>
          <span className="text-xs text-stone-400">গ্রাহকরা চেকআউট এবং কার্ট পেজে কোডটি ব্যবহার করতে পারেন</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-white/5 uppercase tracking-wider text-stone-400 font-semibold border-b border-white/10">
              <tr>
                <th className="py-4 px-6">কুপন কোড</th>
                <th className="py-4 px-6">ডিসকাউন্টের ধরন</th>
                <th className="py-4 px-6">ডিসকাউন্ট মান</th>
                <th className="py-4 px-6">নূন্যতম অর্ডার</th>
                <th className="py-4 px-6">ব্যবহারের হিসেব</th>
                <th className="py-4 px-6">মেয়াদ শেষ</th>
                <th className="py-4 px-6 text-center">স্ট্যাটাস</th>
                <th className="py-4 px-6 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-lg bg-[#E8AF30]/15 text-[#E8AF30] border border-[#E8AF30]/30 font-mono font-extrabold text-xs">
                      {c.code}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {c.discountType === "percentage" && "শতাংশ (%) ছাড়"}
                    {c.discountType === "fixed" && "নির্দিষ্ট টাকা (BDT) ছাড়"}
                    {c.discountType === "free_shipping" && "ফ্রি হোম ডেলিভারি"}
                  </td>
                  <td className="py-4 px-6 text-white font-bold">
                    {c.discountType === "percentage" ? `${c.discountValue}%` : `৳${c.discountValue}`}
                  </td>
                  <td className="py-4 px-6 text-stone-300">৳{c.minOrder}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full"
                          style={{ width: `${(c.timesUsed / c.maxUsage) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-[11px] text-stone-400">{c.timesUsed}/{c.maxUsage}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-stone-400">{c.expiryDate}</td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.isActive
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-stone-500/20 text-stone-400 border border-stone-500/30"
                      }`}
                    >
                      {c.isActive ? "সক্রিয়" : "স্থগিত"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => toggleCoupon(c.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        c.isActive
                          ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                          : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                      }`}
                    >
                      {c.isActive ? "বন্ধ করুন" : "চালু করুন"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#071911] border border-white/20 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <h3 className="font-extrabold text-lg text-white">নতুন কুপন কোড তৈরি করুন</h3>
              <button onClick={() => setShowModal(false)} className="text-stone-400 hover:text-white">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-300 block mb-1">কুপন কোড (যেমন: SUMMER20)</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. ORGANIC15"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-mono uppercase focus:outline-none focus:border-[#E8AF30]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-300 block mb-1">ছাড়ের ধরন</label>
                  <select
                    value={newType}
                    onChange={(e: any) => setNewType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#E8AF30]"
                  >
                    <option value="percentage" className="bg-stone-900">শতাংশ (%)</option>
                    <option value="fixed" className="bg-stone-900">নির্দিষ্ট টাকা (BDT)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-300 block mb-1">ছাড়ের পরিমাণ</label>
                  <input
                    type="number"
                    required
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#E8AF30]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-300 block mb-1">নূন্যতম অর্ডার (BDT)</label>
                  <input
                    type="number"
                    required
                    value={newMinOrder}
                    onChange={(e) => setNewMinOrder(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#E8AF30]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-300 block mb-1">মেয়াদ উত্তীর্ণের তারিখ</label>
                  <input
                    type="date"
                    required
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#E8AF30]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-extrabold text-xs shadow-lg transition-all"
                >
                  কুপন সেভ ও সক্রিয় করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
