"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type FarmTour = {
  id: string;
  title: string;
  titleBn: string;
  time: string;
  timeBn: string;
  priceAdult: number;
  priceChild: number;
  image: string;
  rating: number;
  highlights: string[];
  highlightsBn: string[];
};

const toursList: FarmTour[] = [
  {
    id: "tour-dairy",
    title: "Dawn Cow-Milking & Pure Dairy Experience",
    titleBn: "ভোরের গাভী দোহন ও তাজা ডেইরি অভিজ্ঞতা",
    time: "Every Friday & Saturday (06:00 AM - 09:30 AM)",
    timeBn: "প্রতি শুক্র ও শনিবার (সকাল ০৬:০০ - ০৯:৩০)",
    priceAdult: 850,
    priceChild: 450,
    image: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    highlights: [
      "Live hand-milking demonstration on desi cows",
      "Traditional wooden churned (Bilona) ghee workshop",
      "Complimentary village breakfast with hot milk & paratha",
      "Complimentary 1L pure morning milk bottle to take home",
    ],
    highlightsBn: [
      "দেশী গাভী সরাসরি দোহন শেখার সুযোগ",
      "কাঠের ঘানি ও সনাতন বিলোনা ঘি তৈরির সরাসরি কর্মশালা",
      "ফার্মের তাজা গরম দুধ ও রুটি দিয়ে সকালের নাস্তা",
      "বাসায় নেওয়ার জন্য ১ লিটার তাজা ভোরের দুধ উপহার",
    ],
  },
  {
    id: "tour-harvest",
    title: "Organic Vegetable Harvest & Farmer Breakfast",
    titleBn: "অর্গানিক শাকসবজি হার্ভেস্টিং ও খামার সকাল",
    time: "Every Saturday (08:00 AM - 12:00 PM)",
    timeBn: "প্রতি শনিবার (সকাল ০৮:০০ - ১২:০০)",
    priceAdult: 750,
    priceChild: 350,
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    highlights: [
      "Harvest fresh seasonal vegetables with your own hands",
      "Composting & chemical-free soil science walk",
      "Basket of 3kg mixed organic vegetables included",
      "Farm-to-table fresh juice tasting",
    ],
    highlightsBn: [
      "নিজের হাতে ক্ষেত থেকে তাজা শাকসবজি তোলার রোমাঞ্চ",
      "কেঁচো সার ও রাসায়নিকমুক্ত জৈব মাটির বিজ্ঞান পরিচিতি",
      "৩ কেজি মিশ্র অর্গানিক শাকসবজি উপহার",
      "খামারের তাজা ভেষজ জুস ও নাশতা",
    ],
  },
  {
    id: "tour-honey",
    title: "Beekeeping & Wild Honey Extraction Workshop",
    titleBn: "মৌমাছি পালন ও খাঁটি মধু নিষ্কাশন কর্মশালা",
    time: "Every Friday (10:00 AM - 01:30 PM)",
    timeBn: "প্রতি শুক্রবার (সকাল ১০:০০ - দুপুর ০১:৩০)",
    priceAdult: 950,
    priceChild: 500,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    highlights: [
      "Protective beekeeping suits provided for safe close-up view",
      "Extracting raw unfiltered honey directly from combs",
      "Sundarbans wild forest bee behavior interactive lecture",
      "250g jar of freshly harvested honey bottle",
    ],
    highlightsBn: [
      "নিরাপদ পর্যবেক্ষণের জন্য সুরক্ষিত বি-স্যুট প্রদান",
      "সরাসরি মৌচাক থেকে খাঁটি মধু নিষ্কাশন দেখার অভিজ্ঞতা",
      "সুন্দরবনের প্রাকৃতিক মৌমাছি ও মধুর বৈশিষ্ট্য নিয়ে আলোচনা",
      "২৫০ গ্রাম সদ্য নিষ্কাশিত খাঁটি মধুর জার উপহার",
    ],
  },
];

export default function FarmToursBookingPage() {
  const { isBn } = useLanguage();
  const [selectedTour, setSelectedTour] = useState<FarmTour>(toursList[0]);
  const [selectedDate, setSelectedDate] = useState("2026-10-16");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [bookedPass, setBookedPass] = useState<any | null>(null);

  const totalAmount = adults * selectedTour.priceAdult + children * selectedTour.priceChild;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedPass({
      passId: `GR-TOUR-${Math.floor(100000 + Math.random() * 900000)}`,
      tour: selectedTour,
      date: selectedDate,
      adults,
      children,
      totalAmount,
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <nav className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <Link href="/dashboard" className="hover:text-[#002719]">
              {isBn ? "ড্যাশবোর্ড" : "Dashboard"}
            </Link>
            <span>/</span>
            <span className="font-bold text-stone-900">
              {isBn ? "ফার্ম ভিজিট ও এগ্রি-ট্যুরিজম" : "Farm Visits & Agri-Tourism"}
            </span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900">
            {isBn ? "সাভার গ্রীনরুট ফার্ম ভিজিট ও উইকেন্ড ট্যুর" : "Savar GreenRoot Farm Visits & Weekend Tours"}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {isBn
              ? "পরিবার ও সন্তানদের নিয়ে ঢাকা থেকে মাত্র ৪৫ মিনিটে চলে আসুন আমাদের সবুজ প্রাকৃতিক খামারে।"
              : "Bring your family to our lush organic farm in Savar, just 45 minutes from Dhaka."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <i className="fa-solid fa-map-pin text-emerald-700"></i>
            {isBn ? "হেমায়েতপুর-সাভার, ঢাকা" : "Hemayetpur-Savar, Dhaka"}
          </span>
        </div>
      </div>

      {/* Booking Confirmation Pass Modal/Banner */}
      {bookedPass && (
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#002719] via-emerald-950 to-[#001f14] text-white border-2 border-[#E8AF30] shadow-2xl relative overflow-hidden animate-scaleUp">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8AF30]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8AF30] text-[#002719] font-extrabold text-[10px] uppercase tracking-wider mb-2">
                <i className="fa-solid fa-circle-check"></i>
                {isBn ? "ডিজিটাল ফার্ম এন্ট্রি পাস (Confirmed)" : "Digital Farm Entry Pass (Confirmed)"}
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                {isBn ? bookedPass.tour.titleBn : bookedPass.tour.title}
              </h2>
              <p className="text-xs text-stone-300 mt-1">
                {isBn ? "পাস নম্বর: " : "Pass ID: "}
                <span className="font-mono text-[#E8AF30] font-bold text-sm">{bookedPass.passId}</span> |{" "}
                {isBn ? "তারিখ: " : "Date: "}
                <span className="font-bold text-white">{bookedPass.date}</span>
              </p>
            </div>

            <div className="bg-white/10 p-3 rounded-2xl flex items-center gap-4 border border-white/20 self-start md:self-auto">
              {/* QR Code Simulation */}
              <div className="w-16 h-16 bg-white p-1 rounded-xl flex items-center justify-center">
                <div className="w-full h-full border-2 border-stone-900 border-dashed flex items-center justify-center font-mono text-[9px] font-extrabold text-stone-900 text-center">
                  GR-PASS<br />VERIFIED
                </div>
              </div>
              <div>
                <div className="text-[10px] text-stone-300 uppercase">
                  {isBn ? "মোট পরিদর্শক" : "Visitors"}
                </div>
                <div className="text-sm font-extrabold text-white">
                  {isBn
                    ? `${bookedPass.adults} প্রাপ্তবয়স্ক + ${bookedPass.children} শিশু`
                    : `${bookedPass.adults} Adults + ${bookedPass.children} Children`}
                </div>
                <div className="text-xs font-bold text-[#E8AF30]">
                  {isBn ? "পরিশোধিত: ৳" : "Paid: ৳"}{bookedPass.totalAmount}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-stone-300">
              <i className="fa-solid fa-location-dot text-[#E8AF30] text-base"></i>
              <span>
                {isBn
                  ? "গ্রীনরুট এগ্রো ফার্ম, আনন্দপুর রোড, হেমায়েতপুর, সাভার, ঢাকা। (গুগল ম্যাপে 'GreenRoot Farm Savar' লিখে সার্চ করুন)"
                  : "GreenRoot Agro Farm, Anandapur Road, Hemayetpur, Savar, Dhaka. (Search 'GreenRoot Farm Savar' on Google Maps)"}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-2"
              >
                <i className="fa-solid fa-print"></i>
                {isBn ? "পাস প্রিন্ট করুন" : "Print Pass"}
              </button>
              <button
                onClick={() => setBookedPass(null)}
                className="px-4 py-2 rounded-xl bg-[#E8AF30] text-[#002719] font-extrabold text-xs hover:bg-amber-400"
              >
                {isBn ? "নতুন বুকিং করুন" : "Book Another Tour"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Available Tours Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {toursList.map((tour) => {
          const isSelected = selectedTour.id === tour.id;
          return (
            <div
              key={tour.id}
              onClick={() => setSelectedTour(tour)}
              className={`bg-white rounded-3xl border overflow-hidden transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "border-[#002719] shadow-xl ring-2 ring-[#002719]"
                  : "border-stone-200 hover:shadow-md hover:border-stone-300"
              }`}
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-400 font-bold text-xs flex items-center gap-1">
                    <i className="fa-solid fa-star text-[10px]"></i>
                    {tour.rating}
                  </div>
                  {isSelected && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#002719] text-[#E8AF30] font-extrabold text-xs shadow-md">
                      {isBn ? "নির্বাচিত ✓" : "Selected ✓"}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                    {isBn ? tour.timeBn : tour.time}
                  </div>
                  <h3 className="font-extrabold text-base text-stone-900 mb-3 leading-snug">
                    {isBn ? tour.titleBn : tour.title}
                  </h3>

                  <ul className="space-y-1.5 text-xs text-stone-600 mb-4">
                    {(isBn ? tour.highlightsBn : tour.highlights).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <i className="fa-solid fa-circle-check text-emerald-600 text-[11px] mt-0.5 shrink-0"></i>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 block">
                    {isBn ? "টিকেট মূল্য" : "Ticket Price"}
                  </span>
                  <span className="text-sm font-extrabold text-[#002719]">
                    ৳{tour.priceAdult} <span className="text-[10px] font-normal text-stone-500">{isBn ? "/ বড়" : "/ Adult"}</span> • ৳{tour.priceChild} <span className="text-[10px] font-normal text-stone-500">{isBn ? "/ শিশু" : "/ Child"}</span>
                  </span>
                </div>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-[#002719] text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {isSelected
                    ? (isBn ? "বাছাই করা হয়েছে" : "Selected")
                    : (isBn ? "বাছাই করুন" : "Select Tour")}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Form Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
        <h3 className="text-lg font-extrabold text-stone-900 mb-1">
          {isBn ? "অনলাইন বুকিং ফরম: " : "Online Booking Form: "}
          <span className="text-emerald-800">
            {isBn ? selectedTour.titleBn : selectedTour.title}
          </span>
        </h3>
        <p className="text-xs text-stone-500 mb-6">
          {isBn
            ? "তারিখ ও পরিদর্শকের সংখ্যা নির্বাচন করুন। বুকিং নিশ্চিতের সাথে সাথেই ডিজিটাল এন্ট্রি পাস তৈরি হবে।"
            : "Select your visit date and party size. Your digital entry pass will be generated instantly."}
        </p>

        <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-2">
              {isBn ? "ভিজিটের তারিখ" : "Visit Date"}
            </label>
            <input
              type="date"
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-emerald-600 font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-2">
              {isBn
                ? `প্রাপ্তবয়স্ক (Adults - ৳${selectedTour.priceAdult})`
                : `Adults (৳${selectedTour.priceAdult})`}
            </label>
            <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-10 py-2.5 bg-stone-50 hover:bg-stone-100 font-bold text-stone-700 text-xs"
              >
                -
              </button>
              <div className="flex-1 text-center font-bold text-xs text-stone-900">
                {isBn ? `${adults} জন` : `${adults} Persons`}
              </div>
              <button
                type="button"
                onClick={() => setAdults(adults + 1)}
                className="w-10 py-2.5 bg-stone-50 hover:bg-stone-100 font-bold text-stone-700 text-xs"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-2">
              {isBn
                ? `শিশু (Children 4-12 yrs - ৳${selectedTour.priceChild})`
                : `Children 4-12 yrs (৳${selectedTour.priceChild})`}
            </label>
            <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="w-10 py-2.5 bg-stone-50 hover:bg-stone-100 font-bold text-stone-700 text-xs"
              >
                -
              </button>
              <div className="flex-1 text-center font-bold text-xs text-stone-900">
                {isBn ? `${children} জন` : `${children} Persons`}
              </div>
              <button
                type="button"
                onClick={() => setChildren(children + 1)}
                className="w-10 py-2.5 bg-stone-50 hover:bg-stone-100 font-bold text-stone-700 text-xs"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-semibold">
                {isBn ? "সর্বমোট ফি:" : "Total Fee:"}
              </span>
              <span className="font-extrabold text-lg text-emerald-900">৳{totalAmount}</span>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#002719] hover:bg-emerald-900 text-[#E8AF30] font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-calendar-check text-xs"></i>
              {isBn ? "বুকিং কনফার্ম করুন" : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
