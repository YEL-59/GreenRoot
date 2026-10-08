"use client";
import type { FormEvent } from "react";

import { useState } from "react";
import { initialFarmNotices, type FarmNotice } from "@/data/adminData";
import { articles as initialArticles } from "@/data/blog";

export default function AdminContentManagementPage() {
  const [notices, setNotices] = useState<FarmNotice[]>(initialFarmNotices);
  const [newNoticeTitle, setNewNoticeTitle] = useState("");
  const [newNoticeBadge, setNewNoticeBadge] = useState("Harvest Notice");

  const handleAddNotice = (e: FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle) return;

    const newN: FarmNotice = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle,
      titleBn: newNoticeTitle,
      badge: newNoticeBadge,
      date: "Today",
      active: true,
    };

    setNotices([newN, ...notices]);
    setNewNoticeTitle("");
  };

  const handleToggleNotice = (id: string) => {
    setNotices(
      notices.map((n) => (n.id === id ? { ...n, active: !n.active } : n))
    );
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-8 text-white">
      <div>
        <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
          কনটেন্ট ও পাবলিকেশন
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          খামার নোটিশ ও ব্লগ পরিচালনা (Content Management)
        </h2>
      </div>

      {/* Farm Announcements Section */}
      <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
        <h3 className="text-lg font-black text-white mb-4">
          লাইভ খামার নোটিশ বোর্ড (Farm Announcements)
        </h3>

        {/* Add Notice Form */}
        <form onSubmit={handleAddNotice} className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newNoticeTitle}
            onChange={(e) => setNewNoticeTitle(e.target.value)}
            placeholder="নতুন খামার ঘোষণা বা স্টক আপডেট লিখুন..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#E8AF30]"
            required
          />
          <select
            value={newNoticeBadge}
            onChange={(e) => setNewNoticeBadge(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-900 border border-white/15 text-xs text-white"
          >
            <option value="Dairy Notice">দুগ্ধ খামার আপডেট</option>
            <option value="Harvest Notice">ফসল কর্তন নোটিশ</option>
            <option value="Seasonal Offer">মৌসুমি অফার</option>
            <option value="Stock Update">স্টক আপডেট</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#E8AF30] text-[#002719] text-xs font-black shadow-md transition-all whitespace-nowrap"
          >
            প্রকাশ করুন +
          </button>
        </form>

        {/* Notices List */}
        <div className="space-y-3">
          {notices.map((n) => (
            <div
              key={n.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#E8AF30]/20 text-[#E8AF30] border border-[#E8AF30]/30 shrink-0">
                  {n.badge}
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{n.titleBn}</h4>
                  <span className="text-[10px] text-stone-400">তারিখ: {n.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleNotice(n.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    n.active
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-white/5 text-stone-500"
                  }`}
                >
                  {n.active ? "সক্রিয়" : "লুকানো"}
                </button>
                <button
                  onClick={() => handleDeleteNotice(n.id)}
                  className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center text-xs"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Published Blog Articles */}
      <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-white">প্রকাশিত কৃষি ও স্বাস্থ্য ব্লগ ({initialArticles.length} টি)</h3>
          <a
            href="/blog"
            target="_blank"
            className="text-xs font-bold text-[#E8AF30] hover:text-amber-300"
          >
            লাইভ ব্লগ পেজ দেখুন →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {initialArticles.map((art) => (
            <div key={art.slug} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div>
                <img src={art.image} alt={art.titleBn} className="w-full h-32 rounded-xl object-cover mb-3" />
                <span className="text-[10px] font-bold text-[#E8AF30] block mb-1">{art.categoryBn}</span>
                <h4 className="text-xs font-bold text-white line-clamp-2">{art.titleBn}</h4>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
                <span>{art.dateBn}</span>
                <a href={`/blog/${art.slug}`} target="_blank" className="text-white hover:text-[#E8AF30]">
                  পড়ুন <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
