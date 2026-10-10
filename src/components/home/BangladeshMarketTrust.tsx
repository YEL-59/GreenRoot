"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const BangladeshMarketTrustSection = () => {
  const { isBn } = useLanguage();
  const [activeTab, setActiveTab] = useState<"lab" | "districts" | "delivery" | "payment">("lab");

  const labReports = [
    {
      id: "milk",
      titleBn: "১০০% খাঁটি কাঁচা গরুর দুধ ল্যাব টেস্ট",
      titleEn: "100% Pure Raw Cow Milk Lab Analysis",
      readingBn: "ল্যাকটোমিটার ২৮-৩২ | ফ্যাট ৪.২%",
      readingEn: "Lactometer 28-32 | Fat 4.2%",
      certBn: "BSTI ও ফার্ম গ্রেড ভেরিফাইড",
      certEn: "BSTI & Farm Grade Verified",
      descBn: "কোনো পানি, গুঁড়া দুধ, প্রিজারভেটিভ বা ইউরিয়া মেশানো হয় না। মানিকগঞ্জ ডেইরি খামার থেকে ভোরবেলায় দোহন করে চিলারে ৪° সেলসিয়াসে ঠান্ডা করা হয়।",
      descEn: "Zero water, powdered milk, or preservatives. Milked at dawn from grass-fed cows and chilled to 4°C immediately.",
      icon: "fa-solid fa-cow",
      color: "emerald",
    },
    {
      id: "honey",
      titleBn: "সুন্দরবনের প্রাকৃতিক খলিশা মধু বিশুদ্ধতা",
      titleEn: "Sundarban Wild Honey Purity Test",
      readingBn: "আর্দ্রতা ১৭.৪% | ০% চিনি সিরাপ",
      readingEn: "Moisture 17.4% | 0% Added Sugar",
      certBn: "পোলারমিটার টেস্ট পাসড",
      certEn: "Polarimeter Test Passed",
      descBn: "মৌয়ালদের সাথে সুন্দরবনের গভীর ম্যানগ্রোভ বন থেকে সংগৃহীত। কোনো রিফাইন বা হিটিং ছাড়াই অপরিশোধিত প্রাকৃতিক এনজাইম অক্ষুণ্ণ রাখা হয়।",
      descEn: "Harvested directly from mangrove forests by traditional Mouyals without artificial heating or synthetic sugars.",
      icon: "fa-solid fa-jar",
      color: "amber",
    },
    {
      id: "oil",
      titleBn: "কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল",
      titleEn: "Cold Pressed Wood Mill Mustard Oil",
      readingBn: "কোল্ড-প্রেসড অ্যাসিড মান <১.৩",
      readingEn: "Cold-Pressed Acid Value < 1.3",
      certBn: "১০০% প্রাকৃতিক খাঁটি মাঘি সরিষা",
      certEn: "100% Pure Maghi Mustard Seed",
      descBn: "ধীরগতির কাঠের ঘানিতে পিষে তৈরি, যাতে কোনো উত্তাপ ছাড়াই ঝাঁঝ ও ভিটামিন-ই সংরক্ষিত থাকে। কোনো ধরনের মিনারেল অয়েল বা কেমিক্যাল নেই।",
      descEn: "Slow crushed on traditional wooden expellers without heat to preserve natural pungency, nutrients, and antioxidants.",
      icon: "fa-solid fa-mortar-pestle",
      color: "yellow",
    },
    {
      id: "veggies",
      titleBn: "ভোরের ফসল ও শাকসবজি (ফরমালিনমুক্ত)",
      titleEn: "Dawn Harvested Formalin-Free Veggies",
      readingBn: "০% কার্বাইড ও ফরমালিন টেস্ট",
      readingEn: "0% Carbide & Formalin Tested",
      certBn: "সাভার খামার জৈব চাষ",
      certEn: "Savar Organic Farmland",
      descBn: "ভোর ৫:০০ টায় সাভার অর্গানিক প্লট থেকে তোলা হয় এবং কোল্ড-ভ্যানে সকাল ৯:০০ টার মধ্যে ধানমন্ডি, গুলশান ও উত্তরার দরজায় পৌঁছানো হয়।",
      descEn: "Dawn harvested from our Savar organic plots and delivered to Dhaka households within 4 hours without chemical sprays.",
      icon: "fa-solid fa-leaf",
      color: "teal",
    },
  ];

  const districts = [
    {
      districtBn: "সুন্দরবন (সাতক্ষীরা/বাগেরহাট)",
      districtEn: "Sundarbans (Satkhira / Bagerhat)",
      itemBn: "প্রাকৃতিক খলিশা ও পদ্ম মধু",
      itemEn: "Raw Khalisha & Wild Flora Honey",
      descBn: "গভীর বনের মৌচাক থেকে সরাসরি প্রাকৃতিক কাঁচা মধু",
      descEn: "Harvested directly from wild honeycomb in deep mangrove forests",
      badgeBn: "জিআই পণ্য সমমান",
      badgeEn: "GI Equivalent Heritage",
    },
    {
      districtBn: "মানিকগঞ্জ (সিঙ্গাইর ডেইরি বেল্ট)",
      districtEn: "Manikganj (Singair Dairy Belt)",
      itemBn: "ঘরোয়া খাঁটি গরুর দুধ ও মিষ্টি ছানা",
      itemEn: "Grass-Fed Raw Cow Milk & Chhana",
      descBn: "ভোরের তাজা দোহনকৃত ৪.২% ফ্যাট সমৃদ্ধ পুষ্টিকর দুধ",
      descEn: "Dawn fresh milking with natural 4.2% nutrient-rich fat content",
      badgeBn: "কোল্ড-চেইন সংরক্ষিত",
      badgeEn: "Cold-Chain Chilled",
    },
    {
      districtBn: "পাবনা ও নাটোর",
      districtEn: "Pabna & Natore",
      itemBn: "কাঠের ঘানির প্রথম চাপের সরিষার তেল",
      itemEn: "First-Press Wooden Ghani Mustard Oil",
      descBn: "দেশি মাঘি সরিষা থেকে সনাতন কাঠের ঘানিতে নিষ্কাশিত",
      descEn: "Slow crushed on traditional wooden expellers without heat",
      badgeBn: "১০০% ঝাঁজালো",
      badgeEn: "100% Pungent & Pure",
    },
    {
      districtBn: "সিরাজগঞ্জ (বাঘাবাড়ী অঞ্চল)",
      districtEn: "Sirajganj (Baghabari Region)",
      itemBn: "ঐতিহ্যবাহী কাঠের মন্থন বিলোনা ঘি",
      itemEn: "Traditional Churned Bilona Cow Ghee",
      descBn: "দই থেকে মাখন বানিয়ে জ্বালানো খাঁটি সুবাসিত দানাদার ঘি",
      descEn: "Cultured curd butter simmered into aromatic golden granular ghee",
      badgeBn: "আসল বিলোনা পদ্ধতি",
      badgeEn: "Authentic Bilona Process",
    },
    {
      districtBn: "যশোর (খাজুরা গুড় কুটির)",
      districtEn: "Jashore (Khajura Molasses Hub)",
      itemBn: "খেজুরের খাঁটি নলেন পাটালি গুড়",
      itemEn: "Pure Date Palm Nolen Patali Jaggery",
      descBn: "গাছিদের ভোরের তাজা খেজুর রস থেকে তৈরি কোনো চিনি ছাড়া",
      descEn: "Prepared from dawn date palm sap with zero added sucrose",
      badgeBn: "শীতের স্পেশাল",
      badgeEn: "Winter Seasonal Special",
    },
    {
      districtBn: "দিনাজপুর",
      districtEn: "Dinajpur",
      itemBn: "সুগন্ধি কাটারিভোগ ও চিনিগুঁড়া চাল",
      itemEn: "Aromatic Kataribhog & Chinigura Rice",
      descBn: "প্রাচীন জাতের প্রাকৃতিকভাবে ফলানো সুবাসিত পোলাওয়ের চাল",
      descEn: "Heritage fragrant rice naturally grown in indigenous soils",
      badgeBn: "ঐতিহ্যবাহী জাত",
      badgeEn: "Heritage Variety",
    },
  ];

  const deliveryZones = [
    {
      zoneBn: "ঢাকা সেন্ট্রাল (ধানমন্ডি, কলাবাগান, লালমাটিয়া, মোহাম্মদপুর)",
      zoneEn: "Dhaka Central (Dhanmondi, Kalabagan, Lalmatia, Mohammadpur)",
      timeBn: "ভোরের স্লট (সকাল ৭:০০ - ৯:০০)",
      timeEn: "Dawn Slot (07:00 AM - 09:00 AM)",
      feeBn: "৳৬০ (৳১০০০+ অর্ডারে ফ্রি)",
      feeEn: "৳60 (Free over ৳1,000)",
    },
    {
      zoneBn: "ঢাকা নর্থ (গুলশান, বনানী, বারিধারা, উত্তরা, বসুন্ধরা)",
      zoneEn: "Dhaka North (Gulshan, Banani, Baridhara, Uttara, Bashundhara)",
      timeBn: "সকাল ৮:০০ - ১০:০০",
      timeEn: "08:00 AM - 10:00 AM",
      feeBn: "৳৬০ (৳১০০০+ অর্ডারে ফ্রি)",
      feeEn: "৳60 (Free over ৳1,000)",
    },
    {
      zoneBn: "ঢাকা সাব-আরবান (সাভার, গাজীপুর, নারায়ণগঞ্জ)",
      zoneEn: "Dhaka Sub-Urban (Savar, Gazipur, Narayanganj)",
      timeBn: "দুপুর ১২:০০ - বিকাল ৩:০০",
      timeEn: "12:00 PM - 03:00 PM",
      feeBn: "৳৯০",
      feeEn: "৳90",
    },
    {
      zoneBn: "সারা বাংলাদেশ (৬৪ জেলা কুরিয়ার এক্সপ্রেস)",
      zoneEn: "All Bangladesh (64 Districts Express Courier)",
      timeBn: "২৪ - ৪৮ ঘণ্টার মধ্যে ইনসুলেটেড প্যাকেজিং",
      timeEn: "24 - 48 Hours Insulated Cold Pack",
      feeBn: "৳১২০",
      feeEn: "৳120",
    },
  ];

  const paymentMethods = [
    {
      titleBn: "ক্যাশ অন ডেলিভারি (COD)",
      titleEn: "Cash on Delivery (COD)",
      descBn: "পণ্য হাতে পেয়ে প্যাকেট খুলে সন্তুষ্ট হয়ে টাকা পরিশোধ করুন। কোনো অগ্রিম ফি লাগবে না।",
      descEn: "Inspect items at your doorstep, verify freshness, and pay in cash. Zero advance needed.",
      badgeBn: "জনপ্রিয়",
      badgeEn: "Most Popular",
      color: "emerald",
      icon: "fa-solid fa-hand-holding-dollar",
    },
    {
      titleBn: "বিকাশ পেমেন্ট (bKash)",
      titleEn: "bKash Digital Payment",
      descBn: "মার্চেন্ট একাউন্টে তাৎক্ষণিক নিরাপদে পেমেন্ট করুন। সরাসরি অর্ডার কনফার্মেশন।",
      descEn: "Instant and secure merchant payment with immediate order verification.",
      badgeBn: "ইনস্ট্যান্ট",
      badgeEn: "Instant",
      color: "pink",
      icon: "fa-solid fa-mobile-screen",
    },
    {
      titleBn: "নগদ ও রকেট ওয়ালেট",
      titleEn: "Nagad & Rocket Wallet",
      descBn: "বাংলাদেশ ডাক বিভাগের নগদ এবং ডাচ-বাংলা রকেটের মাধ্যমে ঝামেলাহীন পেমেন্ট।",
      descEn: "Seamless payment via Bangladesh Post Office Nagad and DBBL Rocket wallets.",
      badgeBn: "সহজ",
      badgeEn: "Easy",
      color: "orange",
      icon: "fa-solid fa-wallet",
    },
    {
      titleBn: "ভিসা ও মাস্টারকার্ড",
      titleEn: "Visa & Mastercard",
      descBn: "অনলাইন ডেবিট বা ক্রেডিট কার্ড দিয়ে সুরক্ষিত ব্যাংক গেটওয়ের মাধ্যমে পরিশোধ।",
      descEn: "Pay securely using local or international Visa and Mastercard bank gateways.",
      badgeBn: "নিরাপদ",
      badgeEn: "Secure",
      color: "blue",
      icon: "fa-solid fa-credit-card",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF9F5] via-white to-[#FAF9F5] relative overflow-hidden border-t border-stone-200/80">
      {/* Decorative ambient blurred spots */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#E8AF30]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container px-4 max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-[#002719] text-xs font-extrabold uppercase tracking-wider mb-4 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>
              {isBn
                ? "বাংলাদেশের বাজারে ১০০% বিশুদ্ধতার নিশ্চয়তা"
                : "100% Purity Assurance in Bangladesh Market"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium text-stone-900 leading-6">
            {isBn ? (
              <>
                কেন গ্রীনরুট বাংলাদেশের পরিবারের <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002719] via-emerald-700 to-[#E8AF30]">
                  এক নম্বর বিশ্বস্ত খাদ্য উৎস?
                </span>
              </>
            ) : (
              <>
                Why GreenRoot Is The #1 Trusted <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002719] via-emerald-700 to-[#E8AF30]">
                  Food Source for Bangladeshi Families?
                </span>
              </>
            )}
          </h2>
          <p className="text-stone-600 text-sm md:text-base mt-3 leading-relaxed">
            {isBn
              ? "অনলাইনে খাবার কেনাকাটায় ভেজালের ভয় দূর করতে গ্রীনরুট নিয়ে এসেছে ল্যাব-টেস্টেড গ্যারান্টি, ভোরের কোল্ড-চেইন ডেলিভারি এবং দোরগোড়ায় দেখে নেওয়ার অন-স্পট রিটার্ন সুবিধা।"
              : "To eliminate the fear of adulteration in online food, GreenRoot delivers lab-tested certificates, dawn cold-chain logistics, and doorstep on-the-spot inspection."}
          </p>
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 max-w-4xl mx-auto">
          {[
            {
              id: "lab",
              labelBn: "১০০% ফরমালিন ও ল্যাব টেস্ট গ্যারান্টি",
              labelEn: "100% Lab Tested & Chemical Free",
              icon: "fa-microscope",
            },
            {
              id: "districts",
              labelBn: "বাংলাদেশের জেলাভিত্তিক খাঁটি পণ্য",
              labelEn: "District Origin Authenticity",
              icon: "fa-map-location-dot",
            },
            {
              id: "delivery",
              labelBn: "ঢাকা সিটিতে ভোরের কোল্ড-চেইন বহর",
              labelEn: "Dawn Cold-Chain Delivery Fleet",
              icon: "fa-truck-fast",
            },
            {
              id: "payment",
              labelBn: "হাতে পেয়ে মূল্য পরিশোধ ও সহজ পেমেন্ট",
              labelEn: "Doorstep Inspection & Easy Payment",
              icon: "fa-hand-holding-dollar",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 sm:px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
                activeTab === tab.id
                  ? "bg-[#002719] text-white ring-2 ring-[#E8AF30] shadow-md"
                  : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200"
              }`}
            >
              <i
                className={`fa-solid ${tab.icon} ${
                  activeTab === tab.id ? "text-[#E8AF30]" : "text-stone-400"
                }`}
              ></i>
              <span>{isBn ? tab.labelBn : tab.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Lab Tests & Purity Guarantee */}
        {activeTab === "lab" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {labReports.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#002719] flex items-center justify-center text-xl font-extrabold mb-4 group-hover:scale-110 transition-transform">
                      <i className={item.icon}></i>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8AF30]/20 text-[#002719] border border-[#E8AF30]/40 inline-block mb-2">
                      {isBn ? item.certBn : item.certEn}
                    </span>

                    <h3 className="text-base font-extrabold text-stone-900 leading-snug">
                      {isBn ? item.titleBn : item.titleEn}
                    </h3>

                    <div className="mt-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50/80 p-2 rounded-xl">
                      {isBn ? item.readingBn : item.readingEn}
                    </div>

                    <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                      {isBn ? item.descBn : item.descEn}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-100 text-[11px] font-bold text-stone-400 flex items-center justify-between">
                    <span>{isBn ? "ল্যাব টেস্ট রিপোর্ট ভেরিফাইড" : "Lab Test Report Verified"}</span>
                    <i className="fa-solid fa-circle-check text-emerald-600 text-sm"></i>
                  </div>
                </div>
              ))}
            </div>

            {/* On-the-spot Check Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#002719] via-[#003824] to-[#002719] text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8AF30] animate-ping"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E8AF30]">
                    {isBn
                      ? "দোরগোড়ায় টেস্ট করার শতভাগ স্বাধীনতা"
                      : "100% Doorstep Inspection Freedom"}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {isBn
                    ? "পছন্দ না হলে ডেলিভারি ম্যানের হাতে সাথে সাথে ফেরত দিন!"
                    : "Not satisfied? Return immediately to the delivery rider!"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
                  {isBn
                    ? "দুধের ঘনত্ব, মধুর স্বাদ বা ঘির ঘ্রাণে বিন্দুমাত্র সংশয় থাকলে এক পয়সাও দেওয়া লাগবে না। গ্রাহকের সন্তুষ্টিই গ্রীনরুটের প্রথম অঙ্গীকার।"
                    : "If you have any doubt about the thickness of milk, aroma of ghee, or purity of honey, pay nothing. Customer trust is GreenRoot's first promise."}
                </p>
              </div>

              <Link
                href="/products"
                className="px-6 py-3.5 rounded-2xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-extrabold text-xs shadow-lg transition-all shrink-0 self-start md:self-auto"
              >
                {isBn ? "খামার শপে পণ্য দেখুন →" : "Browse Farm Catalog →"}
              </Link>
            </div>
          </div>
        )}

        {/* Tab 2: Bangladesh Districts Origin Map */}
        {activeTab === "districts" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {districts.map((d, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <i className="fa-solid fa-location-dot mr-1.5 text-emerald-600"></i>
                        {isBn ? d.districtBn : d.districtEn}
                      </span>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {isBn ? d.badgeBn : d.badgeEn}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-stone-900 mt-2">
                      {isBn ? d.itemBn : d.itemEn}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      {isBn ? d.descBn : d.descEn}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-400">
                      {isBn ? "উৎস: সরাসরি স্থানীয় খামারি" : "Source: Direct Local Farm"}
                    </span>
                    <span className="text-emerald-700 font-bold">
                      {isBn ? "১০০% আসল ✓" : "100% Authentic ✓"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Dawn Cold-Chain Delivery Fleet */}
        {activeTab === "delivery" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliveryZones.map((z, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#002719] flex items-center justify-center text-lg font-bold mb-3">
                      <i className="fa-solid fa-truck-ramp-box"></i>
                    </div>
                    <h4 className="text-sm font-extrabold text-stone-900 leading-snug">
                      {isBn ? z.zoneBn : z.zoneEn}
                    </h4>
                    <div className="text-xs text-stone-500 mt-2 flex items-center gap-1.5">
                      <i className="fa-regular fa-clock text-[#E8AF30]"></i>
                      <span>{isBn ? z.timeBn : z.timeEn}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-bold text-emerald-800">
                    {isBn ? "ডেলিভারি চার্জ: " : "Delivery Fee: "}{isBn ? z.feeBn : z.feeEn}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
              <i className="fa-solid fa-snowflake text-amber-600 text-lg shrink-0"></i>
              <span>
                <strong>{isBn ? "কোল্ড-চেইন প্রযুক্তি: " : "Cold-Chain Technology: "}</strong>
                {isBn
                  ? "আমাদের সমস্ত ডেলিভারি ভ্যান ও বাইক ইনসুলেটেড চিলার বক্স দ্বারা সজ্জিত, যাতে ৪০ ডিগ্রি তাপমাত্রাতেও কাঁচা দুধ ও শাকসবজি ৩-৫° সেলসিয়াসে সম্পূর্ণ ফ্রেশ থাকে।"
                  : "All our delivery vans and bikes are equipped with insulated chiller boxes, ensuring raw milk and vegetables stay 100% fresh at 3-5°C even in 40°C heat."}
              </span>
            </div>
          </div>
        )}

        {/* Tab 4: Easy Payment & COD */}
        {activeTab === "payment" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paymentMethods.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center text-xl font-extrabold mb-3">
                      <i className={p.icon}></i>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-extrabold text-stone-900">
                        {isBn ? p.titleBn : p.titleEn}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {isBn ? p.badgeBn : p.badgeEn}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      {isBn ? p.descBn : p.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WhatsApp & Direct Phone Hotline Bar (Bangladeshi Quick-Order Culture) */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/30 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg shadow-emerald-500/25 shrink-0">
              <i className="fa-brands fa-whatsapp animate-pulse"></i>
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                {isBn
                  ? "অনলাইনে অর্ডার করতে ঝামেলা মনে হচ্ছে?"
                  : "Prefer quick ordering without web checkout?"}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                {isBn
                  ? "এক ক্লিকে হোয়াটসঅ্যাপে বা ফোনে পণ্যের তালিকা পাঠান"
                  : "Send your product list via WhatsApp or call us directly"}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {isBn
                  ? "আমাদের খামার প্রতিনিধি আপনার অর্ডার নোট করে আজই তাজা পণ্য পৌঁছে দেবেন।"
                  : "Our farm representative will take your order and arrange fresh delivery today."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/8801712345678?text=${encodeURIComponent(
                isBn
                  ? "হ্যালো গ্রীনরুট! আমি খাঁটি কাঁচা দুধ ও অর্গানিক খামার পণ্য অর্ডার করতে চাই।"
                  : "Hello GreenRoot! I want to order pure raw milk and organic farm products."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              <i className="fa-brands fa-whatsapp text-base"></i>
              <span>{isBn ? "হোয়াটসঅ্যাপে অর্ডার করুন" : "Order on WhatsApp"}</span>
            </a>

            <a
              href="tel:01712345678"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#002719] hover:bg-[#003824] text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              <i className="fa-solid fa-phone text-[#E8AF30]"></i>
              <span>{isBn ? "সরাসরি কল: ০১৭১২-৩৪৫৬৭৮" : "Call Hotline: 01712-345678"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
