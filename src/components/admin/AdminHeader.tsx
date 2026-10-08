"use client";

import React from "react";
import Link from "next/link";

export const AdminHeader: React.FC<{
  onToggleSidebar: () => void;
  title?: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}> = ({
  onToggleSidebar,
  title = "বিজনেস ওভারভিউ (HQ Admin)",
  subtitle = "খামারের দৈনিক বিক্রয়, অর্ডার ডেলিভারি ও পণ্য স্টক পরিচালনা",
  actionButton,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#071911]/95 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between transition-all shadow-md text-white">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Toggle menu"
        >
          <i className="fa-solid fa-bars-staggered text-base"></i>
        </button>

        <div>
          <h1 className="text-base md:text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{title}</span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              Live Store Backend
            </span>
          </h1>
          <p className="hidden md:block text-xs text-stone-300 font-medium">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {actionButton}

        {/* Quick Live Shop Link */}
        <Link
          href="/products"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold text-white transition-all"
        >
          <i className="fa-solid fa-arrow-up-right-from-square text-[#E8AF30]"></i>
          <span>গ্রাহক শপ দেখুন</span>
        </Link>

        {/* Live Admin Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>সিস্টেম সচল (All Systems Operational)</span>
        </div>
      </div>
    </header>
  );
};
