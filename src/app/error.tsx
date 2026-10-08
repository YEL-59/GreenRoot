"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({ error, reset }: ErrorProps) {
  const { isBn } = useLanguage();

  useEffect(() => {
    // Log client error report to monitoring
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center px-4 py-20 pt-28">
      <div className="max-w-lg w-full text-center bg-white rounded-[32px] p-8 sm:p-12 border border-stone-200/90 shadow-xl relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 border border-rose-200 mx-auto flex items-center justify-center text-3xl mb-5 shadow-xs">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>

        <span className="px-3.5 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-black uppercase tracking-wider inline-block mb-3">
          {isBn ? "সিস্টেম সতর্কতা" : "System Notice"}
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mb-2 leading-tight">
          {isBn ? "একটি অপ্রত্যাশিত সমস্যা ঘটেছে" : "Something Went Unexpectedly"}
        </h1>

        <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto mb-8">
          {isBn
            ? "দুঃখিত, তথ্য লোড করতে সাময়িক অসুবিধা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা হোমপেজে ফিরে যান।"
            : "An unexpected condition occurred while rendering this page. You can try refreshing the action below."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#002719] hover:bg-[#E8AF30] text-white hover:text-[#002719] font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-rotate text-xs"></i>
            <span>{isBn ? "আবার চেষ্টা করুন" : "Try Again"}</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors border border-stone-200 flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-house text-xs"></i>
            <span>{isBn ? "হোমে ফিরুন" : "Return to Home"}</span>
          </Link>
        </div>

        {error.digest && (
          <div className="mt-6 pt-4 border-t border-stone-100 text-[10px] text-stone-400 font-mono">
            Error Digest: {error.digest}
          </div>
        )}
      </div>
    </div>
  );
}
