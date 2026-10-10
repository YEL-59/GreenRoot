"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Order } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

const RealLeafletMap = dynamic(
  () => import("./RealLeafletMap").then((mod) => mod.RealLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[420px] md:h-[500px] bg-[#071911] flex flex-col items-center justify-center text-emerald-400 gap-3">
        <div className="w-10 h-10 border-4 border-[#E8AF30] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-stone-300">Loading live GPS satellite map...</p>
      </div>
    ),
  }
);

export type LiveTrackingMapProps = {
  order: Order;
};

export const LiveTrackingMap = ({ order }: LiveTrackingMapProps) => {
  const { isBn } = useLanguage();
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string>("cp-3");
  const [callActive, setCallActive] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Live ETA Countdown Timer (seconds remaining simulation)
  const [secondsRemaining, setSecondsRemaining] = useState(1124); // ~18m 44s

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    if (isBn) {
      return `${m} মিনিট ${s < 10 ? "0" : ""}${s} সেকেন্ড`;
    }
    return `${m} min ${s < 10 ? "0" : ""}${s} sec`;
  };

  const tracking = order.tracking;
  if (!tracking) return null;

  const currentCp =
    tracking.checkpoints.find((c) => c.id === selectedCheckpoint) ||
    tracking.checkpoints[2];

  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrintSlip = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xl overflow-hidden">
      {/* Map Control Header */}
      <div className="bg-gradient-to-r from-[#002719] via-[#003824] to-[#002719] p-5 md:p-7 text-white flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#E8AF30]">
              {isBn ? "লাইভ কোল্ড-চেইন স্যাটেলাইট ট্র্যাকিং (Active GPS)" : "Live Cold-Chain Satellite GPS Tracking"}
            </span>
          </div>
          <h2 className="text-xl md:text-3xl font-extrabold text-white">
            {isBn ? "অর্ডার নং: " : "Order ID: "}
            <span className="text-[#E8AF30] font-mono">{order.id}</span>
          </h2>
          <p className="text-xs text-stone-300 mt-1 flex flex-wrap items-center gap-2">
            <span>
              {isBn ? "কুরিয়ার: " : "Courier: "}
              <strong className="text-white">{tracking.courierName}</strong>
            </span>
            <span>•</span>
            <span>
              {isBn ? "ট্র্যাকিং কোড: " : "Tracking Code: "}
              <strong className="font-mono bg-white/10 px-2.5 py-0.5 rounded text-[#E8AF30]">
                {tracking.trackingNumber}
              </strong>
            </span>
          </p>
        </div>

        {/* Live Active Countdown Card */}
        <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-md">
          <div className="w-14 h-14 rounded-2xl bg-[#E8AF30] text-[#002719] flex items-center justify-center text-2xl font-extrabold shadow-lg shrink-0">
            <i className="fa-solid fa-stopwatch animate-pulse"></i>
          </div>
          <div>
            <div className="text-[10px] text-stone-300 uppercase tracking-wider font-bold">
              {isBn ? "আনুমানিক পৌঁছানোর কাউন্টডাউন" : "Estimated Arrival Countdown"}
            </div>
            <div className="text-lg md:text-xl font-extrabold text-white font-mono">
              {formatCountdown(secondsRemaining)}
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>
                {isBn
                  ? "অবশিষ্ট দূরত্ব: ২.৩ কিমি | গতি: ২৪ কিমি/ঘণ্টা"
                  : "Remaining Distance: 2.3 km | Speed: 24 km/h"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Real Interactive Leaflet OpenStreetMap Viewport */}
      <RealLeafletMap
        isBn={isBn}
        selectedCheckpointId={selectedCheckpoint}
        onSelectCheckpoint={(id) => setSelectedCheckpoint(id)}
      />

      {/* Checkpoint Detail & Cold Telemetry Drawer */}
      <div className="p-5 md:p-8 bg-stone-50 border-t border-stone-200/80 space-y-6">
        {/* Checkpoint Status Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#002719] flex items-center justify-center text-xl font-extrabold shadow-sm shrink-0">
              <i className="fa-solid fa-location-pin-lock text-emerald-700"></i>
            </div>
            <div>
              <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                {isBn ? "বর্তমান চেকপয়েন্ট বিবরণ" : "Current Checkpoint Details"}
              </div>
              <h4 className="text-base font-extrabold text-stone-900">
                {isBn ? (currentCp.nameBn || currentCp.name) : (currentCp.name || currentCp.nameBn)}
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                {isBn ? currentCp.description : (currentCp.description || currentCp.name)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-stone-100 text-stone-700 border border-stone-200">
              {isBn ? "সময়: " : "Time: "}
              {currentCp.time || (isBn ? "স্বাভাবিক" : "Normal")}
            </span>
            <span
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${
                currentCp.status === "passed"
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : currentCp.status === "active"
                  ? "bg-[#E8AF30]/20 text-[#002719] border border-[#E8AF30]"
                  : "bg-stone-100 text-stone-500"
              }`}
            >
              {currentCp.status === "passed"
                ? (isBn ? "সম্পন্ন ✓" : "Completed ✓")
                : currentCp.status === "active"
                ? (isBn ? "চলমান..." : "In Transit...")
                : (isBn ? "পরবর্তী ধাপ" : "Upcoming Stage")}
            </span>
          </div>
        </div>

        {/* Cold-Chain Telemetry Dashboard & Security Handover PIN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sensor 1: Temperature */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center text-lg font-bold shrink-0">
              <i className="fa-solid fa-temperature-arrow-down"></i>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 font-semibold block uppercase">
                {isBn ? "ইনসুলেটেড বক্স তাপমাত্রা" : "Insulated Box Temp"}
              </span>
              <strong className="text-base font-extrabold text-cyan-900 font-mono">
                {isBn ? "৩.৮° C" : "3.8° C"}
              </strong>
              <span className="text-[10px] text-emerald-600 font-bold block">
                {isBn ? "নিরাপদ কোল্ড-স্টোরেজ ✓" : "Safe Cold Storage ✓"}
              </span>
            </div>
          </div>

          {/* Sensor 2: Humidity */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center text-lg font-bold shrink-0">
              <i className="fa-solid fa-droplet"></i>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 font-semibold block uppercase">
                {isBn ? "আর্দ্রতা লেভেল" : "Humidity Level"}
              </span>
              <strong className="text-base font-extrabold text-blue-900 font-mono">
                {isBn ? "৮৪%" : "84%"}
              </strong>
              <span className="text-[10px] text-emerald-600 font-bold block">
                {isBn ? "সতেজতা ধরে রাখার মানদণ্ড ✓" : "Optimal Freshness ✓"}
              </span>
            </div>
          </div>

          {/* Sensor 3: Fleet Battery */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg font-bold shrink-0">
              <i className="fa-solid fa-battery-three-quarters"></i>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 font-semibold block uppercase">
                {isBn ? "ইকো-বাইক ব্যাটারি" : "Eco-Bike Battery"}
              </span>
              <strong className="text-base font-extrabold text-stone-900 font-mono">
                {isBn ? "৮৮%" : "88%"}
              </strong>
              <span className="text-[10px] text-stone-500 block">
                {isBn ? "০% কার্বন নিঃসরণ" : "Zero Carbon Emission"}
              </span>
            </div>
          </div>

          {/* Handover OTP PIN */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#002719] to-[#003824] text-white shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#E8AF30] font-extrabold uppercase tracking-wider block">
                {isBn ? "ডেলিভারি যাচাইকরণ পিন" : "Delivery Verification PIN"}
              </span>
              <span className="text-[11px] text-stone-300">
                {isBn ? "রাইডারকে দেখান" : "Show to Rider"}
              </span>
            </div>
            <div className="font-mono text-xl font-extrabold text-[#E8AF30] px-3 py-1 rounded-xl bg-white/10 border border-white/20 tracking-wider">
              {isBn ? "৮৯৪২" : "8942"}
            </div>
          </div>
        </div>

        {/* Rider & Customer Contact & Quick Action Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rider Card (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <img
                src={
                  tracking.riderPhoto ||
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                }
                alt={tracking.riderName || "Rider"}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E8AF30] shadow-md shrink-0"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-extrabold text-stone-900">
                    {tracking.riderName}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {isBn ? "খামার সার্টিফাইড রাইডার" : "Farm Certified Rider"}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isBn
                    ? "যানবাহন: গ্রীনরুট ইলেকট্রিক কোল্ড-বাইক (#BD-402)"
                    : "Vehicle: GreenRoot Electric Cold-Bike (#BD-402)"}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-stone-600">
                  <span className="text-[#E8AF30] font-extrabold flex items-center gap-1">
                    <i className="fa-solid fa-star text-xs"></i> 4.9 ({isBn ? "৫০০+ সফল ডেলিভারি" : "500+ Trips"})
                  </span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">
                    {isBn ? "মাস্ক ও হাইজিন কিট পরিহিত" : "Sanitized & Mask Protected"}
                  </span>
                </div>
              </div>
            </div>

            {/* Rider Action Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href={`tel:${tracking.riderPhone}`}
                onClick={() => setCallActive(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#002719] hover:bg-[#003824] text-white text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <i className="fa-solid fa-phone text-[#E8AF30]"></i>
                <span>{isBn ? `কল করুন (${tracking.riderPhone})` : `Call (${tracking.riderPhone})`}</span>
              </a>

              <a
                href={`https://wa.me/880${tracking.riderPhone?.slice(1)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-lg shadow-md transition-all active:scale-95"
                title="WhatsApp Message"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Delivery Address Summary (1 col) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-[11px] text-stone-400 font-bold uppercase mb-1">
                {isBn ? "ডেলিভারি ঠিকানা" : "Delivery Address"}
              </div>
              <h5 className="text-xs font-bold text-stone-900">{order.shippingAddress.name}</h5>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {order.shippingAddress.address}, {order.shippingAddress.district}
              </p>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                {isBn ? "মোবাইল: " : "Phone: "}{order.shippingAddress.phone}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">{isBn ? "পরিশোধ পদ্ধতি:" : "Payment:"}</span>
              <span className="font-bold text-[#002719] uppercase bg-stone-100 px-2.5 py-1 rounded">
                {order.paymentMethod === "cod"
                  ? (isBn ? `ক্যাশ অন ডেলিভারি (৳${order.total})` : `Cash on Delivery (৳${order.total})`)
                  : order.paymentMethod.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Share & Print Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleShareLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold border border-stone-200 shadow-sm transition-all"
            >
              <i className="fa-solid fa-share-nodes text-[#E8AF30]"></i>
              <span>
                {copiedLink
                  ? (isBn ? "লিংক কপি হয়েছে!" : "Link Copied!")
                  : (isBn ? "ট্র্যাকিং লিংক শেয়ার করুন" : "Share Tracking Link")}
              </span>
            </button>

            <button
              onClick={handlePrintSlip}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold border border-stone-200 shadow-sm transition-all"
            >
              <i className="fa-solid fa-print text-stone-500"></i>
              <span>{isBn ? "ইনভয়েস প্রিন্ট স্লিপ" : "Print Order Slip"}</span>
            </button>
          </div>

          <div className="text-xs text-stone-500 flex items-center gap-2">
            <i className="fa-solid fa-headset text-emerald-600"></i>
            <span>
              {isBn
                ? "জরুরি খামার হেল্পলাইন: ০৯৬৩৮-৭৭৮৮৯৯ (সকাল ৬:০০ - রাত ১১:০০)"
                : "Farm Helpline: 09638-778899 (6:00 AM - 11:00 PM)"}
            </span>
          </div>
        </div>

        {/* Call Toast Notification */}
        {callActive && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-phone-volume text-emerald-600 animate-bounce"></i>
              {isBn
                ? `রাইডার ${tracking.riderName} (${tracking.riderPhone}) এর সাথে কল সংযুক্ত হচ্ছে...`
                : `Connecting call to rider ${tracking.riderName} (${tracking.riderPhone})...`}
            </span>
            <button
              onClick={() => setCallActive(false)}
              className="text-stone-400 hover:text-stone-700 font-bold"
            >
              {isBn ? "বন্ধ করুন ✕" : "Dismiss ✕"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
