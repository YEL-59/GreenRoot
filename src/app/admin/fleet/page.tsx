"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const AdminFleetMap = dynamic(
  () => import("@/components/admin/AdminFleetMap").then((mod) => mod.AdminFleetMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] bg-[#071911] rounded-3xl flex flex-col items-center justify-center text-emerald-400 gap-3 border border-white/10">
        <div className="w-10 h-10 border-4 border-[#E8AF30] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-stone-300">Loading GPS fleet map...</p>
      </div>
    ),
  }
);

export default function AdminFleetPage() {
  const { isBn } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-1">
            <Link href="/admin" className="hover:text-emerald-400">
              {isBn ? "অ্যাডমিন কনসোল" : "Admin Console"}
            </Link>
            <span>/</span>
            <span className="text-white font-bold">
              {isBn ? "লাইভ ফ্লিট ট্র্যাকিং ম্যাপ" : "Live Fleet Tracking Map"}
            </span>
          </nav>
          <h1 className="text-2xl font-extrabold text-white">
            {isBn
              ? "ডেলিভারি ফ্লিট ও রিয়েল-টাইম জিপিএস মনিটরিং"
              : "Delivery Fleet & Real-Time GPS Tracking"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            {isBn ? "স্যাটেলাইট লিঙ্ক সক্রিয়" : "Satellite Link Active"}
          </span>
        </div>
      </div>

      <AdminFleetMap isBn={isBn} />
    </div>
  );
}
