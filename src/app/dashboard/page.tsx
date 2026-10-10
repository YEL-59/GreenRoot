"use client";

import Link from "next/link";
import { initialUserProfile } from "@/data/userProfile";
import { initialOrders } from "@/data/orders";
import { OrderCard } from "@/components/dashboard";
import { useLanguage } from "@/context/LanguageContext";

export default function UserDashboardOverview() {
  const { isBn } = useLanguage();
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
              <span className="text-xs text-stone-300">
                {isBn ? `সদস্য শুরু: ${user.memberSince}` : `Member Since: ${user.memberSince}`}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {isBn ? `স্বাগতম, ${user.nameBn}!` : `Welcome back, ${user.name}!`}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
              {isBn
                ? "আপনার খামার পণ্যের সাম্প্রতিক আপডেট ও লাইভ ডেলিভারি স্ট্যাটাস এখান থেকেই দেখে নিন।"
                : "Monitor your dawn harvest dispatches, subscriptions, and reward points in real time."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-extrabold text-xs shadow-lg transition-all"
            >
              <i className="fa-solid fa-basket-shopping"></i>
              <span>{isBn ? "নতুন অর্ডার করুন" : "Shop Farm Fresh"}</span>
            </Link>
            <Link
              href="/dashboard/subscriptions"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/10"
            >
              <span>{isBn ? "সাবস্ক্রিপশন" : "Subscriptions"}</span>
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
              <div className="w-12 h-12 rounded-2xl bg-[#E8AF30] text-[#002719] flex items-center justify-center text-xl font-extrabold shadow-md animate-bounce">
                <i className="fa-solid fa-motorcycle"></i>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    {isBn ? "পণ্য ডেলিভারির পথে রয়েছে!" : "Order is Out for Delivery!"}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-stone-900 mt-0.5">
                  {isBn
                    ? `অর্ডার #${activeOrder.id} - রাইডার সাইন্সল্যাব মোড় পার হচ্ছে`
                    : `Order #${activeOrder.id} - Rider approaching near your area`}
                </h3>
              </div>
            </div>

            <Link
              href={`/dashboard/track/${activeOrder.id}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#002719] hover:bg-[#003824] text-white text-xs font-extrabold shadow-lg hover:shadow-xl transition-all self-start md:self-auto"
            >
              <i className="fa-solid fa-map-location-dot text-[#E8AF30]"></i>
              <span>{isBn ? "লাইভ ম্যাপে রাইডার দেখুন (Live Track) →" : "Track Rider on Live Map →"}</span>
            </Link>
          </div>

          {/* Quick Progress Bar */}
          <div className="space-y-1.5 pt-2 border-t border-stone-200/80">
            <div className="flex justify-between text-xs text-stone-600 font-semibold">
              <span>{isBn ? "সাভার খামার হাব" : "Savar Farm Hub"}</span>
              <span>{isBn ? "গাবতলী কোল্ড হাব" : "Gabtoli Cold Hub"}</span>
              <span className="text-emerald-700 font-bold">{isBn ? "রাইডার (৭৫%)" : "Rider (75%)"}</span>
              <span>{isBn ? "আপনার বাসা (ধানমন্ডি)" : "Your Address (Dhanmondi)"}</span>
            </div>
            <div className="w-full h-3 rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-[#E8AF30] to-emerald-600 animate-pulse"
                style={{ width: "75%" }}
              />
            </div>
            <div className="text-right text-[11px] text-stone-500 font-medium">
              {isBn
                ? "আনুমানিক পৌঁছানোর সময়: সকাল ১০:৩০ - ১১:১৫"
                : "Estimated Delivery: Today, 10:30 AM - 11:15 AM"}
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
          <div className="text-xs text-stone-500 font-semibold">
            {isBn ? "মোট অর্ডার" : "Total Orders"}
          </div>
          <div className="text-2xl font-extrabold text-stone-900 mt-0.5">
            {isBn ? `${user.totalOrders} টি` : `${user.totalOrders} Orders`}
          </div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">
            {isBn ? "সব সফল ডেলিভারি" : "All Delivered"}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
            <i className="fa-solid fa-coins text-base"></i>
          </div>
          <div className="text-xs text-stone-500 font-semibold">
            {isBn ? "GreenCoins রিওয়ার্ড" : "GreenCoins Rewards"}
          </div>
          <div className="text-2xl font-extrabold text-stone-900 mt-0.5">
            {user.rewardPoints}
          </div>
          <div className="text-[10px] text-amber-600 font-bold mt-1">
            {isBn ? "৳২৪০ ছাড়ের সমান" : "Equivalent to ৳240 off"}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
            <i className="fa-solid fa-wallet text-base"></i>
          </div>
          <div className="text-xs text-stone-500 font-semibold">
            {isBn ? "ওয়ালেট ব্যালেন্স" : "Wallet Balance"}
          </div>
          <div className="text-2xl font-extrabold text-stone-900 mt-0.5">
            ৳{user.walletBalance}
          </div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">
            {isBn ? "পরবর্তী অর্ডারে ব্যবহার্য" : "Usable on checkout"}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
            <i className="fa-solid fa-repeat text-base"></i>
          </div>
          <div className="text-xs text-stone-500 font-semibold">
            {isBn ? "ফার্ম সাবস্ক্রিপশন" : "Farm Subscriptions"}
          </div>
          <div className="text-2xl font-extrabold text-stone-900 mt-0.5">
            {isBn ? `${user.subscriptions.length} টি` : `${user.subscriptions.length} Active`}
          </div>
          <div className="text-[10px] text-purple-600 font-bold mt-1">
            {isBn ? "দুধ ও শাকসবজি বাস্কেট" : "Milk & Veggie Baskets"}
          </div>
        </div>
      </div>

      {/* Weekly Delivery Schedule & Organic Impact Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Delivery Schedule Strip */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
                {isBn ? "সাপ্তাহিক রুটিন" : "Weekly Schedule"}
              </span>
              <h3 className="text-base font-extrabold text-stone-900">
                {isBn ? "ডেলিভারি ক্যালেন্ডার (Delivery Schedule)" : "Delivery Calendar & Plan"}
              </h3>
            </div>
            <Link
              href="/dashboard/subscriptions"
              className="text-xs font-bold text-[#002719] hover:text-[#E8AF30] transition-colors"
            >
              {isBn ? "সাবস্ক্রিপশন পরিচালনা →" : "Manage Subscriptions →"}
            </Link>
          </div>

          <p className="text-xs text-stone-500 mb-4">
            {isBn
              ? "আপনার নিয়মিত খামার দুধ ও সবজি সরবরাহের সময়সূচী:"
              : "Your recurring schedule for organic raw milk and fresh vegetable deliveries:"}
          </p>

          <div className="grid grid-cols-7 gap-2 text-center">
            {[
              { day: isBn ? "শনি" : "Sat", date: "10", active: true, label: isBn ? "দুধ + সবজি" : "Milk + Veg" },
              { day: isBn ? "রবি" : "Sun", date: "11", active: true, label: isBn ? "দুধ (২L)" : "Milk (2L)" },
              { day: isBn ? "সোম" : "Mon", date: "12", active: true, label: isBn ? "দুধ (২L)" : "Milk (2L)" },
              { day: isBn ? "মঙ্গল" : "Tue", date: "13", active: true, label: isBn ? "দুধ (২L)" : "Milk (2L)" },
              { day: isBn ? "বুধ" : "Wed", date: "14", active: true, label: isBn ? "দুধ (২L)" : "Milk (2L)" },
              { day: isBn ? "বৃহঃ" : "Thu", date: "15", active: true, label: isBn ? "দুধ (২L)" : "Milk (2L)" },
              { day: isBn ? "শুক্র" : "Fri", date: "16", active: false, label: isBn ? "ছুটি" : "Rest" },
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
                <div className="text-lg font-extrabold text-stone-900 my-0.5">{d.date}</div>
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
                {isBn ? "ইমপ্যাক্ট মিটার" : "Impact Meter"}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white">
              {isBn ? "আপনার স্বাস্থ্য ও পরিবেশ অবদান" : "Your Health & Environmental Impact"}
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              {isBn
                ? "গ্রীনরুট থেকে নিয়মিত পণ্য কেনার মাধ্যমে আপনি যে ইতিবাচক প্রভাব ফেলেছেন:"
                : "The positive health and sustainable agriculture footprint you've created:"}
            </p>

            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between text-xs bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-leaf text-emerald-400"></i>
                  {isBn ? "কীটনাশকমুক্ত খাদ্য:" : "Pesticide-Free Food:"}
                </span>
                <span className="font-bold text-emerald-300">{isBn ? "১৮.৫ কেজি" : "18.5 KG"}</span>
              </div>
              <div className="flex items-center justify-between text-xs bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-shield-virus text-amber-400"></i>
                  {isBn ? "ফরমালিন ও রাসায়নিক মুক্ত:" : "Chemical & Formalin Free:"}
                </span>
                <span className="font-bold text-amber-300">{isBn ? "১০০% অর্গানিক" : "100% Organic"}</span>
              </div>
              <div className="flex items-center justify-between text-xs bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-hand-holding-heart text-pink-400"></i>
                  {isBn ? "দেশি খামারি প্রত্যক্ষ আয়:" : "Direct Farmer Support:"}
                </span>
                <span className="font-bold text-white">৳৮,৪০০+</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-stone-300">
            {isBn
              ? "🌱 খাঁটি খাবারেই সুস্থ পরিবার ও সমৃদ্ধ দেশ!"
              : "🌱 Pure farm food for a healthier family and a thriving nation!"}
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900">
              {isBn ? "সাম্প্রতিক অর্ডারসমূহ (Recent Orders)" : "Recent Orders"}
            </h3>
            <p className="text-xs text-stone-500">
              {isBn
                ? "আপনার সাম্প্রতিক খামার পণ্য অর্ডার তালিকা"
                : "Your recent farm produce dispatch receipts"}
            </p>
          </div>

          <Link
            href="/dashboard/orders"
            className="text-xs font-bold text-[#002719] hover:text-[#E8AF30] transition-colors"
          >
            {isBn ? `সব অর্ডার দেখুন (${initialOrders.length}) →` : `View All Orders (${initialOrders.length}) →`}
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

