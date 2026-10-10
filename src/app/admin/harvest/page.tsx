"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type HarvestLog = {
  id: string;
  category: string;
  categoryBn: string;
  quantity: string;
  batchCode: string;
  time: string;
  qualityScore: string;
  supervisor: string;
  status: "approved" | "testing" | "pending";
};

const initialHarvestLogs: HarvestLog[] = [
  {
    id: "HL-101",
    category: "Pure Raw Cow Milk",
    categoryBn: "খাঁটি কাঁচা তরল দুধ",
    quantity: "৪২০ লিটার",
    batchCode: "BATCH-MILK-20261008-01",
    time: "আজ ভোর ০৫:১৫ AM",
    qualityScore: "ফ্যাট ৪.৮%, এসএনএফ ৮.৭% (১০০% খাঁটি)",
    supervisor: "ড. শফিকুল ইসলাম (ডেইরি ইনচার্জ)",
    status: "approved",
  },
  {
    id: "HL-102",
    category: "Traditional Bilona Ghee",
    categoryBn: "সনাতন বিলোনা গাওয়া ঘি",
    quantity: "২৮ কেজি",
    batchCode: "BATCH-GHEE-20261008-04",
    time: "আজ সকাল ০৮:৩০ AM",
    qualityScore: "ন্যাচারাল সুবাস, শূন্য কৃত্রিম রং",
    supervisor: "ফারুক আহমেদ (ঘি প্রসেসিং ইউনিট)",
    status: "approved",
  },
  {
    id: "HL-103",
    category: "Sundarban Wild Honey",
    categoryBn: "সুন্দরবনের খলিশা ফুলের মধু",
    quantity: "৬৫ কেজি",
    batchCode: "BATCH-HNY-20261007-02",
    time: "গতকাল বিকাল ০৪:০০ PM",
    qualityScore: "আর্দ্রতা ১৭.২%, র' আনফিল্টার্ড",
    supervisor: "মাওলানা কায়সার (মৌয়াল টিম লিড)",
    status: "approved",
  },
  {
    id: "HL-104",
    category: "Cold Pressed Mustard Oil",
    categoryBn: "কাঠের ঘানির সরিষার তেল",
    quantity: "৮৫ লিটার",
    batchCode: "BATCH-OIL-20261008-01",
    time: "আজ সকাল ০৯:৪৫ AM",
    qualityScore: "প্রথম প্রেস (কোল্ড এক্সট্র্যাকশন)",
    supervisor: "সাইফুল ইসলাম (ঘানি অপারেটর)",
    status: "testing",
  },
];

export default function AdminHarvestOperationsPage() {
  const { isBn } = useLanguage();
  const [logs, setLogs] = useState<HarvestLog[]>(initialHarvestLogs);
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [newCategory, setNewCategory] = useState("খাঁটি কাঁচা তরল দুধ");
  const [newQuantity, setNewQuantity] = useState("");
  const [newQuality, setNewQuality] = useState("");

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: HarvestLog = {
      id: `HL-${Math.floor(100 + Math.random() * 900)}`,
      category: newCategory,
      categoryBn: newCategory,
      quantity: newQuantity || (isBn ? "৫০ কেজি" : "50 kg"),
      batchCode: `BATCH-AGRO-${Date.now().toString().slice(-6)}`,
      time: isBn ? "মাত্র সংগৃহীত" : "Just recorded",
      qualityScore: newQuality || (isBn ? "ল্যাব টেস্টে শতভাগ বিশুদ্ধ" : "100% pure certified"),
      supervisor: isBn ? "মুস্তাফিজুর রহমান (ফার্ম সুপারভাইজার)" : "Mustafizur Rahman (Supervisor)",
      status: "approved",
    };
    setLogs([newLog, ...logs]);
    setShowAddLogModal(false);
    setNewQuantity("");
    setNewQuality("");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-1">
            <Link href="/admin" className="hover:text-emerald-400">
              {isBn ? "অ্যাডমিন কনসোল" : "Admin Console"}
            </Link>
            <span>/</span>
            <span className="text-white font-bold">
              {isBn ? "দৈনিক সংগ্রহ ও কোল্ড-চেইন অপারেশন" : "Daily Harvest & Cold-Chain"}
            </span>
          </nav>
          <h1 className="text-2xl font-extrabold text-white">
            {isBn
              ? "সাভার খামার সংগ্রহ, কোল্ড-চেইন ও কোয়ালিটি কন্ট্রোল"
              : "Farm Harvest, Cold Chain & Quality Telemetry"}
          </h1>
        </div>

        <button
          onClick={() => setShowAddLogModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E8AF30] to-amber-500 hover:from-amber-400 hover:to-[#E8AF30] text-[#002719] font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-plus text-xs"></i>
          {isBn ? "আজকের নতুন সংগ্রহ যোগ করুন" : "Add Harvest Entry"}
        </button>
      </div>

      {/* IoT Cold Chain Real-Time Sensor Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 to-[#071911] border border-emerald-500/30 text-white shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              {isBn ? "ভ্যাট ১: ডেইরি মিল্ক চিলার" : "Vat 1: Dairy Milk Chiller"}
            </span>
            <span className="flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-300 mb-1">৩.৮° C</div>
          <div className="text-xs text-stone-300">
            {isBn ? "টার্গেট রেঞ্জ: ২°C - ৪°C (অপটিমাল কোল্ড-স্টোর)" : "Target: 2°C - 4°C (Optimal Cold Store)"}
          </div>
          <div className="mt-3 text-[11px] text-stone-400 border-t border-white/10 pt-2 flex justify-between">
            <span>{isBn ? "ক্যাপাসিটি: ৮৫০ লিটার" : "Capacity: 850 Liters"}</span>
            <span className="text-emerald-400 font-bold">
              {isBn ? "স্ট্যাটাস: কুলিং অ্যাক্টিভ" : "Status: Active Cooling"}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-cyan-950/40 to-[#071911] border border-cyan-500/30 text-white shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
              {isBn ? "ভ্যাট ২: বাটার ও ঘি চিলার" : "Vat 2: Butter & Ghee Chiller"}
            </span>
            <span className="flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-cyan-300 mb-1">২.১° C</div>
          <div className="text-xs text-stone-300">
            {isBn ? "টার্গেট রেঞ্জ: ১°C - ৩°C (ডিপ চিলিং)" : "Target: 1°C - 3°C (Deep Chilling)"}
          </div>
          <div className="mt-3 text-[11px] text-stone-400 border-t border-white/10 pt-2 flex justify-between">
            <span>{isBn ? "ক্যাপাসিটি: ৪০০ কেজি" : "Capacity: 400 kg"}</span>
            <span className="text-cyan-400 font-bold">
              {isBn ? "স্ট্যাটাস: নরমাল স্টেবল" : "Status: Nominal Stable"}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-950/40 to-[#071911] border border-amber-500/30 text-white shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              {isBn ? "ট্রানজিট ভ্যান ১ (ঢাকা রুট)" : "Transit Van 1 (Dhaka Route)"}
            </span>
            <span className="flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-300 mb-1">৩.৫° C</div>
          <div className="text-xs text-stone-300">
            {isBn ? "থার্মো-কিং অনবোর্ড রিফার ইউনিট রানিং" : "Thermo-King Reefer System Active"}
          </div>
          <div className="mt-3 text-[11px] text-stone-400 border-t border-white/10 pt-2 flex justify-between">
            <span>{isBn ? "অবস্থান: গাবতলী সংযোগ সড়ক" : "Location: Gabtoli Highway"}</span>
            <span className="text-[#E8AF30] font-bold">
              {isBn ? "ইন-ট্রানজিট" : "In-Transit"}
            </span>
          </div>
        </div>
      </div>

      {/* Daily Harvest & Processing Logs Table */}
      <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-extrabold text-white text-base">
            {isBn ? "দৈনিক সংগ্রহ ও ল্যাব টেস্ট লগ" : "Daily Harvest & Quality Logs"}
          </h3>
          <span className="text-xs text-stone-400">
            {isBn
              ? "প্রতিটি ব্যাচের অনন্য বারকোড ও ট্রেসেবিলিটি কোড"
              : "Unique batch barcode and traceability tracking"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-white/5 uppercase tracking-wider text-stone-400 font-semibold border-b border-white/10">
              <tr>
                <th className="py-4 px-6">{isBn ? "লগ আইডি" : "Log ID"}</th>
                <th className="py-4 px-6">{isBn ? "সংগৃহীত পণ্য" : "Produce"}</th>
                <th className="py-4 px-6">{isBn ? "পরিমাণ" : "Quantity"}</th>
                <th className="py-4 px-6">{isBn ? "ব্যাচ ট্র্যাকিং কোড" : "Batch Code"}</th>
                <th className="py-4 px-6">{isBn ? "সংগ্রহের সময়" : "Time"}</th>
                <th className="py-4 px-6">{isBn ? "ল্যাব টেস্ট ফলাফল" : "Quality Specs"}</th>
                <th className="py-4 px-6">{isBn ? "দায়িত্বপ্রাপ্ত কর্মকর্তা" : "Supervisor"}</th>
                <th className="py-4 px-6 text-right">{isBn ? "স্ট্যাটাস" : "Status"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-4 px-6 font-mono text-white font-bold">{log.id}</td>
                  <td className="py-4 px-6 text-white font-bold">
                    {isBn ? log.categoryBn : log.category}
                  </td>
                  <td className="py-4 px-6 text-[#E8AF30] font-extrabold text-sm">{log.quantity}</td>
                  <td className="py-4 px-6 font-mono text-stone-400 text-[11px]">{log.batchCode}</td>
                  <td className="py-4 px-6 text-stone-400">{log.time}</td>
                  <td className="py-4 px-6 text-emerald-400">{log.qualityScore}</td>
                  <td className="py-4 px-6 text-stone-300">{log.supervisor}</td>
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        log.status === "approved"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {log.status === "approved"
                        ? (isBn ? "কোয়ালিটি সার্টিফাইড ✓" : "Certified ✓")
                        : (isBn ? "ল্যাব পরীক্ষায়..." : "In Lab Test...")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Harvest Log Modal */}
      {showAddLogModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#071911] border border-white/20 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <h3 className="font-extrabold text-lg text-white">
                {isBn ? "নতুন খামার সংগ্রহ ও ল্যাব টেস্ট এন্ট্রি" : "New Harvest & Quality Log Entry"}
              </h3>
              <button onClick={() => setShowAddLogModal(false)} className="text-stone-400 hover:text-white">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleAddLog} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-300 block mb-1">
                  {isBn ? "পণ্যের ক্যাটাগরি" : "Produce Category"}
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#E8AF30]"
                >
                  <option value="খাঁটি কাঁচা তরল দুধ" className="bg-stone-900">
                    {isBn ? "খাঁটি কাঁচা তরল দুধ (Pure Raw Cow Milk)" : "Pure Raw Cow Milk"}
                  </option>
                  <option value="সনাতন বিলোনা গাওয়া ঘি" className="bg-stone-900">
                    {isBn ? "সনাতন বিলোনা গাওয়া ঘি (Bilona Cow Ghee)" : "Traditional Bilona Cow Ghee"}
                  </option>
                  <option value="সুন্দরবনের মধু" className="bg-stone-900">
                    {isBn ? "সুন্দরবনের খলিশা ফুলের মধু (Sundarban Honey)" : "Sundarban Raw Honey"}
                  </option>
                  <option value="কাঠের ঘানির সরিষার তেল" className="bg-stone-900">
                    {isBn ? "কাঠের ঘানির সরিষার তেল (Cold Pressed Mustard Oil)" : "Cold-Pressed Mustard Oil"}
                  </option>
                  <option value="মৌসুমি অর্গানিক শাকসবজি" className="bg-stone-900">
                    {isBn ? "মৌসুমি অর্গানিক শাকসবজি (Fresh Farm Vegetables)" : "Seasonal Organic Vegetables"}
                  </option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-300 block mb-1">
                  {isBn ? "মোট সংগৃহীত পরিমাণ" : "Total Harvest Quantity"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isBn ? "যেমন: ৩৫০ লিটার অথবা ৫০ কেজি" : "e.g. 350 Liters or 50 kg"}
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#E8AF30]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-300 block mb-1">
                  {isBn ? "ল্যাব প্যারামিটার / কোয়ালিটি স্পেসিফিকেশন" : "Lab Parameter / Quality Specifications"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isBn ? "যেমন: ফ্যাট ৪.৭%, এসএনএফ ৮.৬%, আর্দ্রতা স্বাভাবিক" : "e.g. Fat 4.7%, SNF 8.6%, Optimal moisture"}
                  value={newQuality}
                  onChange={(e) => setNewQuality(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#E8AF30]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-extrabold text-xs shadow-lg transition-all"
                >
                  {isBn ? "লগ নিশ্চিত করুন ও বারকোড তৈরি করুন" : "Confirm Log & Generate Barcode"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
