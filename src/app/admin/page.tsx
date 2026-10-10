"use client";

import Link from "next/link";
import { initialAdminStats, initialFarmNotices } from "@/data/adminData";
import { initialOrders } from "@/data/orders";
import { StatCard, SalesRevenueChart } from "@/components/admin";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminOverviewPage() {
  const { isBn } = useLanguage();
  const stats = initialAdminStats;
  const recentOrders = initialOrders.slice(0, 4);

  return (
    <div className="space-y-8 text-white">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0b2218] via-[#0e2c1f] to-[#0b2218] border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8AF30]">
              {isBn ? "গ্রীনরুট কেন্দ্রীয় খামার কমান্ড সেন্টার (HQ)" : "GreenRoot Central Farm Command HQ"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {isBn ? "ফার্ম বিজনেস ও ইনভেন্টরি কন্ট্রোল" : "Farm Business & Inventory Control"}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            {isBn
              ? "আজকের বিক্রয়, কোল্ড-চেইন ডেলিভারি বহর এবং মানিকগঞ্জ ও সাভার খামারের স্টক পর্যবেক্ষণ করুন।"
              : "Monitor today's revenue, active cold-chain logistics fleet, and live inventory across Manikganj and Savar farm hubs."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-extrabold text-xs shadow-lg transition-all"
          >
            <i className="fa-solid fa-plus"></i>
            <span>{isBn ? "নতুন পণ্য আপলোড" : "Add New Product"}</span>
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/10"
          >
            <i className="fa-solid fa-truck-fast text-[#E8AF30]"></i>
            <span>{isBn ? "ডেলিভারি হ্যান্ডলার" : "Order Fulfillment"}</span>
          </Link>
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 font-bold text-xs transition-all border border-emerald-500/40"
          >
            <i className="fa-solid fa-file-pen text-[#E8AF30]"></i>
            <span>{isBn ? "সাইট কনটেন্ট CMS" : "Site Content CMS"}</span>
          </Link>
        </div>
      </div>

      {/* Live Operational Ticker Bar */}
      <div className="p-4 rounded-2xl bg-[#071911] border border-emerald-500/20 text-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-stone-400 font-semibold">
              {isBn ? "মানিকগঞ্জ চিলার ভ্যাট:" : "Manikganj Chiller Vat:"}
            </span>
            <strong className="text-emerald-400 font-mono">
              {isBn ? "৩.৪°C (স্বাভাবিক)" : "3.4°C (Normal)"}
            </strong>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-leaf text-emerald-400 text-[10px]"></i>
            <span className="text-stone-400 font-semibold">
              {isBn ? "সাভার হারভেস্ট লট:" : "Savar Harvest Lot:"}
            </span>
            <strong className="text-white font-mono">
              {isBn ? "১৪০ আঁটি প্রস্তুত" : "140 Bunches Ready"}
            </strong>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-truck text-[#E8AF30] text-[10px]"></i>
            <span className="text-stone-400 font-semibold">
              {isBn ? "সক্রিয় কোল্ড-বহর:" : "Active Cold Fleet:"}
            </span>
            <strong className="text-[#E8AF30] font-mono">
              {isBn ? "৩/৩ টি রুট অন-টাইম" : "3/3 Routes On-Time"}
            </strong>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-building-columns text-blue-400 text-[10px]"></i>
            <span className="text-stone-400 font-semibold">
              {isBn ? "ব্র্যাক ব্যাংক সেটেলমেন্ট:" : "BRAC Bank Settlement:"}
            </span>
            <strong className="text-blue-300 font-mono">
              {isBn ? "৳১,৮৮,০৫৫ সম্পন্ন" : "৳1,88,055 Settled"}
            </strong>
          </div>
        </div>

        <div className="text-[11px] text-stone-400 flex items-center gap-1.5 font-mono">
          <i className="fa-solid fa-clock-rotate-left text-stone-500"></i>
          <span>{isBn ? "সর্বশেষ আপডেট: ১০:০৫ AM (BST)" : "Last Sync: 10:05 AM (BST)"}</span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Monthly Revenue"
          titleBn="চলতি মাসের মোট আয়"
          value={`৳${stats.totalRevenue.toLocaleString()}`}
          change="+18.4%"
          changeEn="+18.4% vs last month"
          isPositive={true}
          icon="fa-solid fa-bangladeshi-taka-sign"
          accentColor="emerald"
        />
        <StatCard
          title="Today's Revenue"
          titleBn="আজকের মোট বিক্রয়"
          value={`৳${stats.todayRevenue.toLocaleString()}`}
          change="+12.5%"
          changeEn="+12.5% today"
          isPositive={true}
          icon="fa-solid fa-sack-dollar"
          accentColor="amber"
        />
        <StatCard
          title="Total Orders Fulfilled"
          titleBn="মোট সফল ডেলিভারি"
          value={isBn ? `${stats.totalOrders} টি` : `${stats.totalOrders} Orders`}
          change={isBn ? `${stats.todayOrders} টি আজ` : `+${stats.todayOrders} today`}
          changeEn={`+${stats.todayOrders} today`}
          isPositive={true}
          icon="fa-solid fa-boxes-packing"
          accentColor="blue"
        />
        <StatCard
          title="Low Stock Alert"
          titleBn="দ্রুত রি-স্টক প্রয়োজন"
          value={isBn ? `${stats.lowStockCount} টি পণ্য` : `${stats.lowStockCount} Items`}
          change={isBn ? "সতর্কতা" : "Action Needed"}
          changeEn="Action Needed"
          isPositive={false}
          icon="fa-solid fa-triangle-exclamation"
          accentColor="purple"
        />
      </div>

      {/* Revenue Trends Chart & Category Shares */}
      <SalesRevenueChart />

      {/* Quick Orders & Farm Notices Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table (Col-span 2) */}
        <div className="lg:col-span-2 bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
                {isBn ? "সাম্প্রতিক লেনদেন" : "Recent Transactions"}
              </span>
              <h3 className="text-lg font-extrabold text-white">
                {isBn ? "সর্বশেষ অর্ডারসমূহ" : "Latest Customer Orders"}
              </h3>
            </div>

            <Link
              href="/admin/orders"
              className="text-xs font-bold text-[#E8AF30] hover:text-amber-300 transition-colors"
            >
              {isBn ? `সব দেখুন (${initialOrders.length}) →` : `View All (${initialOrders.length}) →`}
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-stone-400 text-[10px] uppercase">
                  <th className="py-2.5 px-3">{isBn ? "অর্ডার আইডি" : "Order ID"}</th>
                  <th className="py-2.5 px-3">{isBn ? "গ্রাহক" : "Customer"}</th>
                  <th className="py-2.5 px-3">{isBn ? "মূল্য" : "Total"}</th>
                  <th className="py-2.5 px-3">{isBn ? "পেমেন্ট" : "Payment"}</th>
                  <th className="py-2.5 px-3">{isBn ? "স্ট্যাটাস" : "Status"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-mono font-bold text-white">{o.id}</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{o.customerName}</div>
                      <div className="text-[10px] text-stone-400">{o.shippingAddress.district}</div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-400">৳{o.total}</td>
                    <td className="py-3 px-3 uppercase text-[10px] font-bold text-stone-300">
                      {o.paymentMethod}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          o.status === "delivered"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : o.status === "out_for_delivery"
                            ? "bg-[#E8AF30]/20 text-[#E8AF30] animate-pulse"
                            : "bg-purple-500/20 text-purple-300"
                        }`}
                      >
                        {o.status === "out_for_delivery"
                          ? isBn
                            ? "ডেলিভারির পথে"
                            : "Out for Delivery"
                          : o.status === "delivered"
                          ? isBn
                            ? "ডেলিভার্ড"
                            : "Delivered"
                          : isBn
                          ? "প্যাকেজিং চলছে"
                          : "Processing"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Farm Notices / Content Updates (Col-span 1) */}
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
              {isBn ? "খামার কমিউনিকেশন" : "Farm Communication"}
            </span>
            <h3 className="text-lg font-extrabold text-white mb-4">
              {isBn ? "লাইভ খামার নোটিশ" : "Live Farm Bulletins"}
            </h3>

            <div className="space-y-3">
              {initialFarmNotices.map((n) => (
                <div key={n.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#E8AF30]/20 text-[#E8AF30] border border-[#E8AF30]/30">
                      {isBn ? n.badge : n.badge.replace("আপডেট", "Update")}
                    </span>
                    <span className="text-[10px] text-stone-400">{n.date}</span>
                  </div>
                  <h5 className="text-xs font-bold text-white leading-snug">
                    {isBn ? n.titleBn : (n.title || n.titleBn)}
                  </h5>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/admin/content"
            className="mt-6 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center block transition-all"
          >
            {isBn ? "নোটিশ ও কনটেন্ট পরিচালনা করুন →" : "Manage CMS & Bulletins →"}
          </Link>
        </div>
      </div>

      {/* Top Selling Agro Products Leaderboard */}
      <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
              {isBn ? "সর্বোচ্চ বিক্রিত পণ্য" : "Top Best Sellers"}
            </span>
            <h3 className="text-lg md:text-xl font-extrabold text-white">
              {isBn
                ? "শীর্ষ ৫টি জনপ্রিয় খামার পণ্য লিডারবোর্ড (Top Farm Produce)"
                : "Top 5 Popular Farm Produce Leaderboard"}
            </h3>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-bold text-[#E8AF30] hover:text-amber-300 transition-colors"
          >
            {isBn ? "ইনভেন্টরি ও স্টক পরিচালনা করুন →" : "Manage Inventory & Stock →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              rank: 1,
              title: isBn ? "ঘরোয়া খাঁটি গরুর দুধ" : "Pure Raw Cow Milk",
              origin: isBn ? "মানিকগঞ্জ ডেইরি" : "Manikganj Dairy",
              units: isBn ? "৪৮০ লিটার" : "480 Litres",
              revenue: "৳৫২,৮০০",
              stock: isBn ? "২৮০ লিটার অবশিষ্ট" : "280L Remaining",
              growth: "+24%",
              image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
            },
            {
              rank: 2,
              title: isBn ? "কাঠের ঘানি ভাঙা সরিষার তেল" : "Cold Pressed Mustard Oil",
              origin: isBn ? "পাবনা কাঠের ঘানি" : "Pabna Cold Ghani",
              units: isBn ? "২১০ লিটার" : "210 Litres",
              revenue: "৳৬১,৯৫০",
              stock: isBn ? "৬৫ লিটার অবশিষ্ট" : "65L Remaining",
              growth: "+18%",
              image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
            },
            {
              rank: 3,
              title: isBn ? "সুন্দরবনের খলিশা মধু" : "Sundarban Raw Honey",
              origin: isBn ? "সাতক্ষীরা সুন্দরবন" : "Satkhira Sundarbans",
              units: isBn ? "৯৫ কেজি" : "95 KG",
              revenue: "৳৯৩,১০০",
              stock: isBn ? "৪০ কেজি অবশিষ্ট" : "40 KG Remaining",
              growth: "+15%",
              image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80",
            },
            {
              rank: 4,
              title: isBn ? "ঐতিহ্যবাহী বিলোনা ঘি" : "Traditional Bilona Ghee",
              origin: isBn ? "সিরাজগঞ্জ খামার" : "Sirajganj Dairy Belt",
              units: isBn ? "৭২ কেজি" : "72 KG",
              revenue: "৳১,০৮,০০০",
              stock: isBn ? "১৮ কেজি (সীমিত)" : "18 KG (Limited)",
              growth: "+31%",
              image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=400&q=80",
            },
            {
              rank: 5,
              title: isBn ? "যশোরের খাঁটি নলেন গুড়" : "Pure Date Palm Jaggery",
              origin: isBn ? "যশোর গুড় কুটির" : "Jessore Jaggery Cottage",
              units: isBn ? "১৩০ কেজি" : "130 KG",
              revenue: "৳৪৫,৫০০",
              stock: isBn ? "৫০ কেজি অবশিষ্ট" : "50 KG Remaining",
              growth: "+40%",
              image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80",
            },
          ].map((prod) => (
            <div
              key={prod.rank}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#E8AF30]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative mb-3 rounded-xl overflow-hidden aspect-video border border-white/10">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#E8AF30] text-[#002719] font-extrabold text-xs flex items-center justify-center shadow-md">
                    #{prod.rank}
                  </span>
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-emerald-400 font-mono text-[10px] font-bold">
                    {prod.growth}
                  </span>
                </div>

                <h4 className="text-xs font-extrabold text-white line-clamp-1">{prod.title}</h4>
                <p className="text-[10px] text-stone-400 mt-0.5">{prod.origin}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-stone-400">{isBn ? "বিক্রয়:" : "Units Sold:"}</span>
                  <strong className="text-white font-mono">{prod.units}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">{isBn ? "মোট রাজস্ব:" : "Revenue:"}</span>
                  <strong className="text-[#E8AF30] font-mono">{prod.revenue}</strong>
                </div>
                <div className="text-[10px] text-stone-400 text-right mt-1">
                  {isBn ? "স্টক: " : "Stock: "}
                  <span className="text-stone-300 font-mono">{prod.stock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cold-Chain Fleet Status & Farm Harvest Production (Advanced Operations) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cold-Chain Fleet Monitor */}
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
                {isBn ? "লজিস্টিকস ও বহর ট্র্যাকিং" : "Logistics & Fleet Dispatch"}
              </span>
              <h3 className="text-lg font-extrabold text-white">
                {isBn ? "কোল্ড-চেইন ডেলিভারি বহর (Active Fleet)" : "Active Cold-Chain Delivery Fleet"}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {isBn ? "৩ টি যান সক্রিয়" : "3 Vehicles Active"}
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                id: "BD-402",
                name: isBn ? "ইলেকট্রিক কোল্ড-ভ্যান #৪০২" : "Electric Cold-Van #402",
                driver: isBn ? "মোঃ সাইফুল ইসলাম" : "Md. Saiful Islam",
                route: isBn ? "সাভার ➔ গাবতলী ➔ ধানমন্ডি" : "Savar ➔ Gabtoli ➔ Dhanmondi",
                temp: "3.8°C",
                battery: isBn ? "৮৫%" : "85%",
                status: isBn ? "ডেলিভারি চলমান" : "In Transit",
                active: true,
              },
              {
                id: "BD-108",
                name: isBn ? "ইকো কোল্ড-বাইক #১০৮" : "Eco Cold-Bike #108",
                driver: isBn ? "রফিকুল আলম" : "Rafiqul Alam",
                route: isBn ? "বনানী ➔ গুলশান ➔ বারিধারা" : "Banani ➔ Gulshan ➔ Baridhara",
                temp: "4.1°C",
                battery: isBn ? "৯২%" : "92%",
                status: isBn ? "ডেলিভারি চলমান" : "In Transit",
                active: true,
              },
              {
                id: "BD-901",
                name: isBn ? "হেভি চিলার ট্রাক #৯০১" : "Heavy Chiller Truck #901",
                driver: isBn ? "আনিসুর রহমান" : "Anisur Rahman",
                route: isBn ? "মানিকগঞ্জ ডেইরি ➔ ঢাকা সেন্ট্রাল হাব" : "Manikganj Dairy ➔ Dhaka Central Hub",
                temp: "3.2°C",
                battery: isBn ? "১০০%" : "100%",
                status: isBn ? "দুধ লোডিং সম্পন্ন" : "Milk Loaded",
                active: false,
              },
            ].map((v) => (
              <div
                key={v.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8AF30]/20 text-[#E8AF30] flex items-center justify-center text-lg font-bold">
                    <i className="fa-solid fa-truck-moving"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{v.name}</h4>
                      <span className="text-[10px] font-mono text-stone-400">({v.driver})</span>
                    </div>
                    <div className="text-[11px] text-stone-300 mt-0.5">{v.route}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="text-right">
                    <div className="text-emerald-400 font-bold flex items-center gap-1 font-mono">
                      <i className="fa-solid fa-snowflake text-[10px]"></i> {v.temp}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {isBn ? "চার্জ: " : "Battery: "}
                      {v.battery}
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      v.active
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    {v.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farm Production & Harvest Yield Today */}
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
                {isBn ? "খামার উৎপাদন ও ফসল কর্তন" : "Farm Production & Harvest Yield"}
              </span>
              <h3 className="text-lg font-extrabold text-white">
                {isBn ? "আজকের খামার উৎপাদন (Daily Harvest)" : "Today's Harvested Volume"}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E8AF30]/20 text-[#E8AF30] border border-[#E8AF30]/30">
              {isBn ? "১০০% ফ্রেশ" : "100% Fresh"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-stone-400">
                  {isBn ? "মানিকগঞ্জ ডেইরি" : "Manikganj Dairy"}
                </span>
                <i className="fa-solid fa-cow text-[#E8AF30] text-xs"></i>
              </div>
              <div className="text-xl font-extrabold text-white">
                {isBn ? "৩২০ লিটার" : "320 Litres"}
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                {isBn ? "ভোরের কাঁচা দুধ দোহন সম্পন্ন ✓" : "Dawn raw milking completed ✓"}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-stone-400">
                  {isBn ? "সাভার অর্গানিক প্লট" : "Savar Organic Plot"}
                </span>
                <i className="fa-solid fa-leaf text-emerald-400 text-xs"></i>
              </div>
              <div className="text-xl font-extrabold text-white">
                {isBn ? "১৪০ আঁটি" : "140 Bunches"}
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                {isBn ? "লাল শাক ও পালং শাক ফ্রেশ হারভেস্ট ✓" : "Red & spinach greens freshly harvested ✓"}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-stone-400">
                  {isBn ? "যশোর গুড় কুটির" : "Jessore Jaggery Cottage"}
                </span>
                <i className="fa-solid fa-jar text-amber-400 text-xs"></i>
              </div>
              <div className="text-xl font-extrabold text-white">
                {isBn ? "৪৫ কেজি" : "45 KG"}
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                {isBn ? "খাঁটি পাটালি গুড় তৈরি ও প্যাকিং ✓" : "Pure Patali jaggery packaged ✓"}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-stone-400">
                  {isBn ? "পাবনা কাঠের ঘানি" : "Pabna Cold Ghani"}
                </span>
                <i className="fa-solid fa-mortar-pestle text-yellow-400 text-xs"></i>
              </div>
              <div className="text-xl font-extrabold text-white">
                {isBn ? "৬০ লিটার" : "60 Litres"}
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                {isBn ? "কোল্ড-প্রেসড সরিষার তেল ছাঁকন ✓" : "Cold-pressed mustard oil filtered ✓"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
