"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { isBn } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center px-4 py-20 pt-28">
      <div className="max-w-lg w-full text-center bg-white rounded-[32px] p-8 sm:p-12 border border-stone-200/90 shadow-xl relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* 404 Visual Icon */}
        <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-800 border-2 border-emerald-200 mx-auto flex items-center justify-center text-4xl mb-6 shadow-sm">
          <i className="fa-solid fa-seedling"></i>
        </div>

        <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wider inline-block mb-3">
          Error 404
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2 leading-tight">
          {isBn ? "অনুরোধকৃত পৃষ্ঠাটি পাওয়া যায়নি" : "Harvest Not Found"}
        </h1>

        <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto mb-8">
          {isBn
            ? "আপনি যে লিঙ্কটি অনুসরণ করেছেন তা হয়তো পরিবর্তিত হয়েছে অথবা পৃষ্ঠাটি সরানো হয়েছে। নিচের বাটনগুলো ব্যবহার করে আবার ব্রাউজ করুন।"
            : "The page you are looking for might have been harvested, moved, or never planted. Let's get you back on the right path."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#002719] hover:bg-[#E8AF30] text-white hover:text-[#002719] font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-house text-xs"></i>
            <span>{isBn ? "হোমপেজে ফিরে যান" : "Back to Home"}</span>
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors border border-stone-200 flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-basket-shopping text-xs text-[#E8AF30]"></i>
            <span>{isBn ? "খামার শপ দেখুন" : "Browse Farm Shop"}</span>
          </Link>
        </div>

        {/* Customer Support Shortcut */}
        <div className="mt-8 pt-6 border-t border-stone-100 text-xs text-stone-500">
          <span>{isBn ? "সাহায্যের প্রয়োজন?" : "Need help?"} </span>
          <a
            href="tel:01712345678"
            className="font-bold text-[#002719] hover:underline inline-flex items-center gap-1"
          >
            <i className="fa-solid fa-phone text-[#E8AF30] text-[10px]"></i>
            <span>০১৭১২-৩৪৫৬৭৮</span>
          </a>
        </div>
      </div>
    </div>
  );
}
