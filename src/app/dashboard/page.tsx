"use client";

import Link from "next/link";
import { initialUserProfile } from "@/data/userProfile";
import { initialOrders } from "@/data/orders";
import { OrderCard } from "@/components/dashboard";

export default function UserDashboardOverview() {
  const user = initialUserProfile;
  const activeOrder = initialOrders.find((o) => o.status === "out_for_delivery");
  const recentOrders = initialOrders.slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Welcome & Member Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#002719] via-[#003824] to-[#002719] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8AF30] text-[#002719]">
                {user.memberTier} Member
              </span>
              <span className="text-xs text-stone-300">সদস্য শুরু: {user.memberSince}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              স্বাগতম, {user.nameBn}!
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
              আপনার খামার পণ্যের সাম্প্রতিক আপডেট ও লাইভ ডেলিভারি স্ট্যাটাস এখান থেকেই দেখে নিন।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-black text-xs shadow-lg transition-all"
            >
              <i className="fa-solid fa-basket-shopping"></i>
              <span>নতুন অর্ডার করুন</span>
            </Link>
            <Link
              href="/dashboard/subscriptions"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/10"
            >
              <span>সাবস্ক্রিপশন</span>
            </Link>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-[#E8AF30]/10 to-transparent pointer-events-none" />
      </div>

      {/* Active Order Live Tracker Banner (If an order is on the way!) */}
      {activeOrder && (
        <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-white rounded-3xl p-6 border-2 border-[#E8AF30] shadow-lg animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E8AF30] text-[#002719] flex items-center justify-center text-xl font-black shadow-md animate-bounce">
                <i className="fa-solid fa-motorcycle"></i>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    পণ্য ডেলিভারির পথে রয়েছে!
                  </span>
                </div>
                <h3 className="text-lg font-black text-stone-900 mt-0.5">
                  অর্ডার #{activeOrder.id} - রাইডার সাইন্সল্যাব মোড় পার হচ্ছে
                </h3>
              </div>
            </div>

            <Link
              href={`/dashboard/track/${activeOrder.id}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#002719] hover:bg-[#003824] text-white text-xs font-black shadow-lg hover:shadow-xl transition-all self-start md:self-auto"
            >
              <i className="fa-solid fa-map-location-dot text-[#E8AF30]"></i>
              <span>লাইভ ম্যাপে রাইডার দেখুন (Live Track) →</span>
            </Link>
          </div>

          {/* Quick Progress Bar */}
          <div className="space-y-1.5 pt-2 border-t border-stone-200/80">
            <div className="flex justify-between text-xs text-stone-600 font-semibold">
              <span>সাভার খামার হাব</span>
              <span>গাবতলী কোল্ড হাব</span>
              <span className="text-emerald-700 font-bold">রাইডার (৭৫%)</span>
              <span>আপনার বাসা (ধানমন্ডি)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-[#E8AF30] to-emerald-600 animate-pulse"
                style={{ width: "75%" }}
              />
            </div>
            <div className="text-right text-[11px] text-stone-500 font-medium">
              আনুমানিক পৌঁছানোর সময়: সকাল ১০:৩০ - ১১:১৫
            </div>
          </div>
        </div>
      )}

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
            <i className="fa-solid fa-boxes-packing text-base"></i>
          </div>
          <div className="text-xs text-stone-500 font-semibold">মোট অর্ডার</div>
          <div className="text-2xl font-black text-stone-900 mt-0.5">{user.totalOrders} টি</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">সব সফল ডেলিভারি</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
            <i className="fa-solid fa-coins text-base"></i>
          </div>
          <div className="text-xs text-stone-500 font-semibold">GreenCoins রিওয়ার্ড</div>
          <div className="text-2xl font-black text-stone-900 mt-0.5">{user.rewardPoints}</div>
          <div className="text-[10px] text-amber-600 font-bold mt-1">৳২৪০ ছাড়ের সমান</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
            <i className="fa-solid fa-wallet text-base"></i>
          </div>
          <div className="text-xs text-stone-500 font-semibold">ওয়ালেট ব্যালেন্স</div>
          <div className="text-2xl font-black text-stone-900 mt-0.5">৳{user.walletBalance}</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">পরবর্তী অর্ডারে ব্যবহার্য</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
            <i className="fa-solid fa-repeat text-base"></i>
          </div>
          <div className="text-xs text-stone-500 font-semibold">ফার্ম সাবস্ক্রিপশন</div>
          <div className="text-2xl font-black text-stone-900 mt-0.5">
            {user.subscriptions.length} টি
          </div>
          <div className="text-[10px] text-purple-600 font-bold mt-1">দুধ ও শাকসবজি বাস্কেট</div>
        </div>
      </div>

      {/* Weekly Delivery Schedule & Organic Impact Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Delivery Schedule Strip */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
                সাপ্তাহিক রুটিন
              </span>
              <h3 className="text-base font-black text-stone-900">
                ডেলিভারি ক্যালেন্ডার (Delivery Schedule)
              </h3>
            </div>
            <Link
              href="/dashboard/subscriptions"
              className="text-xs font-bold text-[#002719] hover:text-[#E8AF30] transition-colors"
            >
              সাবস্ক্রিপশন পরিচালনা →
            </Link>
          </div>

          <p className="text-xs text-stone-500 mb-4">
            আপনার নিয়মিত খামার দুধ ও সবজি সরবরাহের সময়সূচী:
          </p>

          <div className="grid grid-cols-7 gap-2 text-center">
            {[
              { day: "শনি", en: "Sat", date: "১০", active: true, label: "দুধ + সবজি বাস্কেট" },
              { day: "রবি", en: "Sun", date: "১১", active: true, label: "দুধ (২L)" },
              { day: "সোম", en: "Mon", date: "১২", active: true, label: "দুধ (২L)" },
              { day: "মঙ্গল", en: "Tue", date: "১৩", active: true, label: "দুধ (২L)" },
              { day: "বুধ", en: "Wed", date: "১৪", active: true, label: "দুধ (২L)" },
              { day: "বৃহঃ", en: "Thu", date: "১৫", active: true, label: "দুধ (২L)" },
              { day: "শুক্র", en: "Fri", date: "১৬", active: false, label: "ছুটি" },
            ].map((d, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl border transition-all ${
                  d.active
                    ? "bg-emerald-50/70 border-emerald-200 shadow-sm"
                    : "bg-stone-50 border-stone-200 opacity-60"
                }`}
              >
                <div className="text-[11px] font-bold text-stone-600">{d.day}</div>
                <div className="text-lg font-black text-stone-900 my-0.5">{d.date}</div>
                <div className="text-[9px] font-semibold text-emerald-800 line-clamp-1">
                  {d.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organic Impact Meter */}
        <div className="bg-gradient-to-br from-[#002719] to-[#003824] rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider">
                ইমপ্যাক্ট মিটার
              </span>
            </div>
            <h3 className="text-base font-black text-white">
              আপনার স্বাস্থ্য ও পরিবেশ অবদান
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              গ্রীনরুট থেকে নিয়মিত পণ্য কেনার মাধ্যমে আপনি যে ইতিবাচক প্রভাব ফেলেছেন:
            </p>

            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between text-xs bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-leaf text-emerald-400"></i>
                  কীটনাশকমুক্ত খাদ্য:
                </span>
                <span className="font-bold text-emerald-300">১৮.৫ কেজি</span>
              </div>
              <div className="flex items-center justify-between text-xs bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-shield-virus text-amber-400"></i>
                  ফরমালিন ও রাসায়নিক মুক্ত:
                </span>
                <span className="font-bold text-amber-300">১০০% অর্গানিক</span>
              </div>
              <div className="flex items-center justify-between text-xs bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-hand-holding-heart text-pink-400"></i>
                  দেশি খামারি প্রত্যক্ষ আয়:
                </span>
                <span className="font-bold text-white">৳৮,৪০০+</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-stone-300">
            🌱 খাঁটি খাবারেই সুস্থ পরিবার ও সমৃদ্ধ দেশ!
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-black text-stone-900">সাম্প্রতিক অর্ডারসমূহ (Recent Orders)</h3>
            <p className="text-xs text-stone-500">আপনার সাম্প্রতিক খামার পণ্য অর্ডার তালিকা</p>
          </div>

          <Link
            href="/dashboard/orders"
            className="text-xs font-bold text-[#002719] hover:text-[#E8AF30] transition-colors"
          >
            সব অর্ডার দেখুন ({initialOrders.length}) →
          </Link>
        </div>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
