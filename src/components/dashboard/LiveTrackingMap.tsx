"use client";

import { useState } from "react";
import type { Order } from "@/types";

export type LiveTrackingMapProps = {
  order: Order;
};

export const LiveTrackingMap = ({ order }: LiveTrackingMapProps) => {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string>("cp-3");
  const [callActive, setCallActive] = useState(false);

  const tracking = order.tracking;
  if (!tracking) return null;

  const currentCp = tracking.checkpoints.find((c) => c.id === selectedCheckpoint) || tracking.checkpoints[2];

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden">
      {/* Map Control Header */}
      <div className="bg-[#002719] p-4 md:p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8AF30]">
              লাইভ কোল্ড-চেইন ট্র্যাকিং (GPS Active)
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            অর্ডার নং: <span className="text-[#E8AF30]">{order.id}</span>
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            কুরিয়ার: <span className="font-semibold text-white">{tracking.courierName}</span> | ট্র্যাকিং কোড: <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[#E8AF30]">{tracking.trackingNumber}</span>
          </p>
        </div>

        {/* Live ETA Card */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E8AF30] text-[#002719] flex items-center justify-center text-xl font-black shadow-md">
            <i className="fa-solid fa-stopwatch animate-pulse"></i>
          </div>
          <div>
            <div className="text-[10px] text-stone-300 uppercase tracking-wider font-semibold">আনুমানিক ডেলিভারি সময় (ETA)</div>
            <div className="text-base font-extrabold text-white">{tracking.estimatedDelivery}</div>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <i className="fa-solid fa-snowflake text-[10px]"></i> তাপমাত্রা: ৪° সেলসিয়াস (ফার্ম কোল্ড-স্টোর)
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Visual Stage */}
      <div className="relative w-full h-[380px] md:h-[460px] bg-[#111e17] overflow-hidden select-none">
        {/* Subtle Map Grid & Topography lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22c55e" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Stylized Dhaka Roads and Waterway (Buriganga / Turag) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 500" preserveAspectRatio="none">
          {/* River Representation */}
          <path
            d="M 50,450 C 200,420 350,460 500,430 C 650,400 750,440 900,420"
            fill="none"
            stroke="#1e3a47"
            strokeWidth="38"
            strokeLinecap="round"
            opacity="0.7"
          />
          <text x="420" y="440" fill="#3b82f6" fontSize="12" fontWeight="bold" opacity="0.4" letterSpacing="3">
            বুড়িগঙ্গা ও তুরাগ নদী অববাহিকা
          </text>

          {/* Major Expressways / Arterials */}
          <path d="M 120,50 L 260,180 L 450,250 L 720,290 L 850,380" fill="none" stroke="#23382c" strokeWidth="14" strokeLinecap="round" />
          <path d="M 260,180 L 320,380 L 520,410" fill="none" stroke="#1d2e24" strokeWidth="10" strokeLinecap="round" />
          <path d="M 450,250 L 540,110 L 780,90" fill="none" stroke="#1d2e24" strokeWidth="8" strokeLinecap="round" />

          {/* Active Delivery Route Line */}
          <path
            d="M 140,90 Q 280,140 420,220 T 680,270"
            fill="none"
            stroke="#E8AF30"
            strokeWidth="5"
            strokeDasharray="8 6"
            className="animate-pulse"
          />

          {/* Completed Route Segment */}
          <path
            d="M 140,90 Q 280,140 420,220"
            fill="none"
            stroke="#10b981"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Live Rider Position Pulse Wave */}
          <circle cx="420" cy="220" r="28" fill="#10b981" opacity="0.2" className="animate-ping" />
          <circle cx="420" cy="220" r="16" fill="#10b981" opacity="0.4" />
          <circle cx="420" cy="220" r="8" fill="#E8AF30" />
        </svg>

        {/* Checkpoint Pins on the Map */}
        {/* CP 1: Savar Farm Hub */}
        <div
          onClick={() => setSelectedCheckpoint("cp-1")}
          className={`absolute top-[60px] left-[100px] md:left-[140px] cursor-pointer group transition-transform ${
            selectedCheckpoint === "cp-1" ? "scale-110 z-20" : "scale-100 z-10"
          }`}
        >
          <div className="relative flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-lg ring-4 ring-emerald-500/30 group-hover:bg-emerald-500">
              <i className="fa-solid fa-wheat-awn"></i>
            </div>
            <div className="mt-1.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-sm border border-emerald-500/40 text-[11px] font-bold text-white whitespace-nowrap shadow-md">
              সাভার খামার হাব (05:30 AM) ✓
            </div>
          </div>
        </div>

        {/* CP 2: Gabtoli Cold Hub */}
        <div
          onClick={() => setSelectedCheckpoint("cp-2")}
          className={`absolute top-[150px] left-[260px] md:left-[290px] cursor-pointer group transition-transform ${
            selectedCheckpoint === "cp-2" ? "scale-110 z-20" : "scale-100 z-10"
          }`}
        >
          <div className="relative flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-lg ring-4 ring-emerald-500/30 group-hover:bg-emerald-500">
              <i className="fa-solid fa-warehouse"></i>
            </div>
            <div className="mt-1.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-sm border border-emerald-500/40 text-[11px] font-bold text-white whitespace-nowrap shadow-md">
              গাবতলী কোল্ড হাব (07:15 AM) ✓
            </div>
          </div>
        </div>

        {/* CP 3: Active Rider In Transit */}
        <div
          onClick={() => setSelectedCheckpoint("cp-3")}
          className={`absolute top-[185px] left-[390px] md:left-[430px] cursor-pointer group transition-transform ${
            selectedCheckpoint === "cp-3" ? "scale-125 z-30" : "scale-100 z-20"
          }`}
        >
          <div className="relative flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#E8AF30] text-[#002719] flex items-center justify-center font-black text-lg shadow-2xl ring-4 ring-[#E8AF30]/50 animate-bounce">
              <i className="fa-solid fa-motorcycle"></i>
            </div>
            <div className="mt-1 px-3 py-1 rounded-lg bg-[#E8AF30] text-[#002719] font-black text-xs whitespace-nowrap shadow-xl flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#002719] animate-ping"></span>
              রাইডার সাইন্সল্যাব মোড়ে (In Transit)
            </div>
          </div>
        </div>

        {/* CP 4: Customer Destination (Dhanmondi) */}
        <div
          onClick={() => setSelectedCheckpoint("cp-4")}
          className={`absolute top-[230px] left-[610px] md:left-[670px] cursor-pointer group transition-transform ${
            selectedCheckpoint === "cp-4" ? "scale-110 z-20" : "scale-100 z-10"
          }`}
        >
          <div className="relative flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-base shadow-xl ring-4 ring-red-400/40">
              <i className="fa-solid fa-house-chimney"></i>
            </div>
            <div className="mt-1.5 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-sm border border-red-500/40 text-[11px] font-bold text-white whitespace-nowrap shadow-md">
              গন্তব্য: ধানমন্ডি ৭এ (আপনার ঠিকানা)
            </div>
          </div>
        </div>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-white text-xs max-w-xs hidden sm:block">
          <div className="font-bold text-[11px] text-[#E8AF30] uppercase mb-1">ম্যাপ নির্দেশিকা (Map Legend)</div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-[11px] text-stone-300">অতিক্রম করা চেকপয়েন্ট (Passed)</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-[#E8AF30] inline-block animate-pulse"></span>
            <span className="text-[11px] text-stone-300">রাইডারের বর্তমান অবস্থান (Live GPS)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span className="text-[11px] text-stone-300">আপনার ডেলিভারি গন্তব্য (Destination)</span>
          </div>
        </div>

        {/* Map Zoom / Recenter Buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => setSelectedCheckpoint("cp-3")}
            className="w-10 h-10 rounded-xl bg-white/90 hover:bg-white text-stone-900 flex items-center justify-center font-bold shadow-lg transition-transform hover:scale-105"
            title="Focus Rider"
          >
            <i className="fa-solid fa-crosshairs text-sm text-[#002719]"></i>
          </button>
          <div className="bg-white/90 rounded-xl shadow-lg overflow-hidden flex flex-col divide-y divide-stone-200">
            <button className="w-10 h-9 hover:bg-white flex items-center justify-center text-xs font-bold text-stone-800">
              <i className="fa-solid fa-plus"></i>
            </button>
            <button className="w-10 h-9 hover:bg-white flex items-center justify-center text-xs font-bold text-stone-800">
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Checkpoint Detail Drawer */}
      <div className="p-4 md:p-6 bg-stone-50 border-t border-stone-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#002719] flex items-center justify-center text-lg font-bold">
              <i className="fa-solid fa-location-pin-lock text-emerald-700"></i>
            </div>
            <div>
              <div className="text-[11px] text-stone-400 font-semibold uppercase">নির্বাচিত চেকপয়েন্ট বিবরণ</div>
              <h4 className="text-base font-bold text-stone-900">{currentCp.nameBn}</h4>
              <p className="text-xs text-stone-600">{currentCp.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700 border border-stone-200">
              সময়: {currentCp.time || "স্বাভাবিক"}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                currentCp.status === "passed"
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : currentCp.status === "active"
                  ? "bg-[#E8AF30]/20 text-[#002719] border border-[#E8AF30]"
                  : "bg-stone-100 text-stone-500"
              }`}
            >
              {currentCp.status === "passed" ? "সম্পন্ন ✓" : currentCp.status === "active" ? "চলমান..." : "পরবর্তী ধাপ"}
            </span>
          </div>
        </div>

        {/* Rider & Customer Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rider Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={tracking.riderPhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
                alt={tracking.riderName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E8AF30] shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-stone-900">{tracking.riderName}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    ফার্ম সার্টিফাইড রাইডার
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  যানবাহন: গ্রীনরুট ইলেকট্রিক কোল্ড-বাইক (#BD-402)
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-stone-600">
                  <span className="text-[#E8AF30] font-bold flex items-center gap-1">
                    <i className="fa-solid fa-star text-xs"></i> 4.9 (500+ ডেলিভারি)
                  </span>
                  <span>•</span>
                  <span>মাস্ক ও হাইজিন পরিহিত</span>
                </div>
              </div>
            </div>

            {/* Rider Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${tracking.riderPhone}`}
                onClick={() => setCallActive(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#002719] hover:bg-[#003824] text-white text-xs font-bold shadow-md transition-all"
              >
                <i className="fa-solid fa-phone text-[#E8AF30]"></i>
                <span>কল করুন ({tracking.riderPhone})</span>
              </a>

              <a
                href={`https://wa.me/880${tracking.riderPhone?.slice(1)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-base shadow-md transition-all"
                title="WhatsApp Message"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Delivery Address Summary */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-[11px] text-stone-400 font-semibold uppercase mb-1">
                ডেলিভারি ঠিকানা
              </div>
              <h5 className="text-xs font-bold text-stone-900">{order.shippingAddress.name}</h5>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {order.shippingAddress.address}, {order.shippingAddress.district}
              </p>
              <p className="text-xs text-stone-500 mt-0.5 font-mono">
                মোবাইল: {order.shippingAddress.phone}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">পরিশোধ পদ্ধতি:</span>
              <span className="font-bold text-[#002719] uppercase bg-stone-100 px-2 py-0.5 rounded">
                {order.paymentMethod === "cod" ? "ক্যাশ অন ডেলিভারি (৳" + order.total + ")" : order.paymentMethod}
              </span>
            </div>
          </div>
        </div>

        {/* Call Toast Notice if clicked */}
        {callActive && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-phone-volume text-emerald-600 animate-bounce"></i>
              রাইডার মোঃ সাইফুল ইসলামকে কল ডায়াল করা হচ্ছে...
            </span>
            <button
              onClick={() => setCallActive(false)}
              className="text-stone-400 hover:text-stone-700 text-xs font-bold"
            >
              বন্ধ করুন ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
