"use client";

import { useState } from "react";
import { initialUserProfile } from "@/data/userProfile";

export default function UserRewardsPage() {
  const user = initialUserProfile;
  const [copied, setCopied] = useState(false);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText("GREENROOT-TANVIR");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            গ্রীনকয়েন ও ওয়ালেট রিওয়ার্ড (GreenCoins & Wallet)
          </h2>
          <p className="text-xs text-stone-500">
            খামার থেকে প্রতিটি অর্ডারে কয়েন ক্যাশব্যাক ও বিশেষ মেম্বারশিপ ছাড় উপভোগ করুন
          </p>
        </div>
      </div>

      {/* Balances Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#002719] to-[#003824] rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block mb-1">
              ডিজিটাল খামার ওয়ালেট
            </span>
            <div className="text-3xl md:text-4xl font-black text-white mt-1">
              ৳{user.walletBalance}
            </div>
            <p className="text-xs text-stone-300 mt-2">
              পরবর্তী যেকোনো কেনাকাটায় সরাসরি বিল থেকে বাদ দেওয়া যাবে।
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => alert("রিচার্জ অপশন শীঘ্রই আসছে (bKash/Nagad)")}
                className="px-4 py-2 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] text-xs font-black transition-all shadow-md"
              >
                টাকা যোগ করুন
              </button>
            </div>
          </div>
          <div className="absolute right-4 -bottom-6 text-white/5 text-9xl font-black pointer-events-none">
            ৳
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#E8AF30] to-amber-500 rounded-3xl p-6 md:p-8 text-[#002719] shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[11px] text-[#002719]/80 font-bold uppercase tracking-wider block mb-1">
              রিওয়ার্ড পয়েন্ট ব্যালেন্স
            </span>
            <div className="text-3xl md:text-4xl font-black text-[#002719] mt-1 flex items-center gap-2">
              <i className="fa-solid fa-coins"></i>
              <span>{user.rewardPoints}</span>
              <span className="text-base font-bold">কয়েন</span>
            </div>
            <p className="text-xs text-[#002719]/80 mt-2">
              ১০০ GreenCoins = ৳৫০ সমমূল্যের ভাউচার ডিসকাউন্ট।
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => alert("কয়েন ভাউচারে কনভার্ট হয়েছে!")}
                className="px-4 py-2 rounded-xl bg-[#002719] hover:bg-[#003824] text-white text-xs font-black transition-all shadow-md"
              >
                ভাউচারে রূপান্তর করুন
              </button>
            </div>
          </div>
          <div className="absolute right-4 -bottom-6 text-[#002719]/10 text-9xl font-black pointer-events-none">
            <i className="fa-solid fa-award"></i>
          </div>
        </div>
      </div>

      {/* Referral Invite Box */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
            রেফার করুন ও আয় করুন
          </span>
          <h3 className="text-lg font-black text-stone-900 mt-2">বন্ধুদের আমন্ত্রণ জানান, পাবেন ১০০ গ্রীনকয়েন!</h3>
          <p className="text-xs text-stone-600 mt-1 max-w-xl">
            আপনার রেফারেল কোড ব্যবহার করে বন্ধু প্রথম অর্ডার সম্পন্ন করলে উভয়েই পাবেন অতিরিক্ত ১০০ GreenCoins ও ফ্রি ডেলিভারি।
          </p>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-2xl bg-stone-100 border border-stone-200">
          <span className="font-mono text-xs font-black text-[#002719] px-3">GREENROOT-TANVIR</span>
          <button
            onClick={handleCopyReferral}
            className="px-4 py-2 rounded-xl bg-[#002719] text-white text-xs font-bold hover:bg-[#003824] transition-all"
          >
            {copied ? "কপি হয়েছে ✓" : "কপি কোড"}
          </button>
        </div>
      </div>
    </div>
  );
}
