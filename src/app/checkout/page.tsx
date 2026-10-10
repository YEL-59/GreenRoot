"use client";
import type { FormEvent } from "react";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { addPlacedOrder } from "@/data/orders";
import type { Order } from "@/types";

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    deliveryZone,
    setDeliveryZone,
    deliveryFee,
    total,
    clearCart,
  } = useCart();

  // Form states
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [deliverySlot, setDeliverySlot] = useState<"morning" | "evening" | "regular">("morning");
  const [trxId, setTrxId] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "card">("cod");

  // Promo code
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Order submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<{
    orderId: string;
    name: string;
    phone: string;
    address: string;
    total: number;
    paymentMethod: string;
    itemsCount: number;
    deliverySlot: string;
    deliveryPin: string;
  } | null>(null);

  const applyCoupon = () => {
    setCouponError("");
    if (couponCode.trim().toUpperCase() === "ORGANIC10" || couponCode.trim().toUpperCase() === "GREEN10") {
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      setCouponApplied(true);
    } else {
      setCouponError("সঠিক কুপন কোড দিন (যেমন: GREEN10)");
    }
  };

  const finalPayable = Math.max(0, total - discountAmount);

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !address.trim()) {
      alert("অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন।");
      return;
    }

    if (items.length === 0) {
      alert("আপনার ব্যাগে কোনো পণ্য নেই। পণ্য যোগ করে অর্ডার করুন।");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomOrderId = "GR-" + Math.floor(100000 + Math.random() * 900000);
      const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
      const slotText =
        deliverySlot === "morning"
          ? "ভোরের স্লট (সকাল ৭:০০ - ১০:০০ টা)"
          : deliverySlot === "evening"
          ? "বিকালের স্লট (বিকাল ৪:০০ - রাত ৮:০০ টা)"
          : "রেগুলার ডেলিভারি (পরবর্তী ২৪ ঘণ্টার মধ্যে)";

      const newOrder: Order = {
        id: randomOrderId,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        dateBn: "আজ, " + new Date().toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" }),
        customerName: fullName,
        customerPhone: phoneNumber,
        customerEmail: "customer@greenroot.com",
        subtotal,
        shippingFee: deliveryFee,
        discount: discountAmount,
        total: finalPayable,
        status: "out_for_delivery",
        statusBn: "ডেলিভারির পথে (Out for Delivery)",
        paymentMethod: paymentMethod as any,
        paymentStatus: paymentMethod === "cod" ? "unpaid" : "paid",
        shippingAddress: {
          name: fullName,
          phone: phoneNumber,
          address: address,
          district: district,
          city: district,
          zone: deliveryZone === "inside-dhaka" ? "dhaka" : "outside_dhaka",
        },
        items: items.map((i) => ({
          id: i.id,
          slug: i.slug,
          title: i.title,
          titleBn: i.titleBn,
          price: i.price,
          unit: i.unit,
          quantity: i.quantity,
          image: i.image,
        })),
        tracking: {
          courierName: "গ্রীনরুট কোল্ড-চেইন এক্সপ্রেস বহর (GreenRoot Cold Fleet)",
          trackingNumber: `GRX-${randomOrderId.replace("GR-", "")}`,
          currentLocation: "মিরপুর রোড, সাইন্সল্যাব মোড় সংলগ্ন",
          riderName: "মোঃ সাইফুল ইসলাম (ID: #402)",
          riderPhone: "01712345678",
          riderPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
          estimatedDelivery: deliverySlot === "morning" ? "সকাল ৯:১৫ - ১০:০০" : "বিকাল ৫:৩০ - ৬:১৫",
          deliveryDate: "আজকের ডেলিভারি",
          deliverySlot: slotText,
          routeProgress: 75,
          checkpoints: [
            {
              id: "cp-1",
              name: "Savar Organic Farm Hub",
              nameBn: "সাভার খামার কালেকশন পয়েন্ট",
              description: "ভোর ৫:৩০ এ খাঁটি পণ্য প্যাকেজিং সম্পন্ন",
              lat: 23.8583,
              lng: 90.2667,
              status: "passed",
              time: "05:30 AM",
            },
            {
              id: "cp-2",
              name: "Gabtoli Cold Hub",
              nameBn: "গাবতলী কোল্ড-স্টোরেজ হাব",
              description: "তাপমাত্রা নিয়ন্ত্রিত চিলারে স্ক্যান সম্পন্ন",
              lat: 23.7779,
              lng: 90.3524,
              status: "passed",
              time: "07:15 AM",
            },
            {
              id: "cp-3",
              name: "Local Delivery Hub",
              nameBn: `${district} লোকাল ডেলিভারি জোন`,
              description: "রাইডারের ব্যাগে হস্তান্তর ও ডেলিভারির জন্য রওনা",
              lat: 23.7461,
              lng: 90.3742,
              status: "active",
              time: "08:45 AM",
            },
            {
              id: "cp-4",
              name: "Customer Destination",
              nameBn: `${address}`,
              description: "আপনার দরজায় ডেলিভারি ও যাচাইকরণ",
              lat: 23.7508,
              lng: 90.3789,
              status: "upcoming",
              time: "Est. ৯:৪৫ AM",
            },
          ],
          timeline: [
            {
              status: "confirmed",
              title: "Order Placed & Confirmed",
              titleBn: "অর্ডার সফলভাবে কনফার্ম হয়েছে",
              description: "সিস্টেমে আপনার অর্ডার গৃহীত হয়েছে।",
              time: "এখনই",
              completed: true,
              current: false,
            },
            {
              status: "processing",
              title: "Packed in Cold Chain Box",
              titleBn: "খামার থেকে কোল্ড-চেইনে সিল ও প্যাকিং",
              description: "৪°C তাপমাত্রায় পণ্য সিল করা হয়েছে।",
              time: "ভোর ৬:০০ AM",
              completed: true,
              current: false,
            },
            {
              status: "out_for_delivery",
              title: "Out for Delivery",
              titleBn: "রাইডার ডেলিভারির উদ্দেশ্যে পথে রয়েছে",
              description: "রাইডার সাইফুল ইসলাম আপনার ঠিকানার দিকে অগ্রসর হচ্ছেন।",
              time: "সকাল ৮:৩০ AM",
              completed: false,
              current: true,
            },
          ],
        },
      };

      addPlacedOrder(newOrder);

      setOrderPlaced({
        orderId: randomOrderId,
        name: fullName,
        phone: phoneNumber,
        address: `${address}, ${district}`,
        total: finalPayable,
        paymentMethod:
          paymentMethod === "cod"
            ? "ক্যাশ অন ডেলিভারি (Cash on Delivery)"
            : paymentMethod === "bkash"
            ? "বিকাশ মার্চেন্ট পেমেন্ট"
            : "অনলাইন কার্ড পেমেন্ট",
        itemsCount: items.reduce((acc, i) => acc + i.quantity, 0),
        deliverySlot: slotText,
        deliveryPin: randomPin,
      });

      clearCart();
      setIsSubmitting(false);
    }, 800);
  };

  if (orderPlaced) {
    return (
      <div className="bg-[#FAF9F5] min-h-screen pt-36 pb-24">
        <div className="container max-w-3xl px-4 mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-stone-200/90 shadow-2xl text-center relative overflow-hidden">
            {/* Top decorative gradient */}
            <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-emerald-600 via-[#E8AF30] to-emerald-600" />

            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-4xl mx-auto mb-5 shadow-sm animate-bounce">
              <i className="fa-solid fa-circle-check text-emerald-600"></i>
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-300 px-4 py-1.5 rounded-full inline-block mb-3">
              অর্ডার সফল হয়েছে! (Order Placed Successfully)
            </span>

            <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">
              ধন্যবাদ, আপনার তাজা খামার অর্ডারটি গ্রহণ করা হয়েছে!
            </h1>
            <p className="text-stone-500 text-sm mb-6">
              অর্ডার আইডি: <span className="font-mono font-extrabold text-[#002f1f] text-base px-2 py-0.5 rounded bg-stone-100">{orderPlaced.orderId}</span>
            </p>

            {/* Handover Security OTP PIN Card */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 border-2 border-[#E8AF30] flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8AF30] text-[#002719] flex items-center justify-center text-lg font-extrabold shrink-0">
                  <i className="fa-solid fa-key"></i>
                </div>
                <div>
                  <span className="text-[11px] text-stone-600 font-bold uppercase block">
                    ডেলিভারি হ্যান্ডওভার নিরাপত্তা পিন (Security PIN)
                  </span>
                  <span className="text-xs text-stone-700">
                    রাইডার আপনার বাসায় পৌঁছালে এই পিন কোডটি দেখান:
                  </span>
                </div>
              </div>

              <div className="px-5 py-2 rounded-xl bg-[#002719] text-[#E8AF30] font-mono text-2xl font-extrabold tracking-widest shadow-md">
                {orderPlaced.deliveryPin}
              </div>
            </div>

            {/* Order Summary Details */}
            <div className="bg-stone-50 rounded-2xl p-6 text-left border border-stone-200/80 mb-6 space-y-3 text-xs md:text-sm">
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-500">গ্রাহকের নাম:</span>
                <span className="font-bold text-stone-900">{orderPlaced.name}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-500">মোবাইল নম্বর:</span>
                <span className="font-bold text-stone-900 font-mono">{orderPlaced.phone}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-500">ডেলিভারি ঠিকানা:</span>
                <span className="font-bold text-stone-900 max-w-xs text-right truncate">{orderPlaced.address}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-500">নির্বাচিত ডেলিভারি স্লট:</span>
                <span className="font-bold text-emerald-800">{orderPlaced.deliverySlot}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-500">পেমেন্ট মেথড:</span>
                <span className="font-bold text-stone-900">{orderPlaced.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1 text-base">
                <span className="font-bold text-stone-900">সর্বমোট প্রদেয়:</span>
                <span className="font-extrabold text-[#002f1f] text-xl">৳{orderPlaced.total}</span>
              </div>
            </div>

            {/* Primary Action: Go to Live Tracker */}
            <div className="p-4 rounded-2xl bg-[#002719] text-white text-left mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#E8AF30] text-[#002719] flex items-center justify-center text-xl font-extrabold shrink-0 animate-pulse">
                  <i className="fa-solid fa-location-crosshairs"></i>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">
                    লাইভ কোল্ড-চেইন ম্যাপে রাইডার দেখুন
                  </h4>
                  <p className="text-xs text-stone-300">
                    রাইডারের রুট, গাড়ির তাপমাত্রা এবং পৌঁছানোর সময় সরাসরি ট্র্যাক করুন।
                  </p>
                </div>
              </div>

              <Link
                href={`/dashboard/track/${orderPlaced.orderId}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-extrabold text-xs shadow-lg transition-all shrink-0"
              >
                <span>লাইভ ট্র্যাকিং খুলুন →</span>
              </Link>
            </div>

            {/* Secondary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/8801712345678?text=${encodeURIComponent(
                  `হ্যালো গ্রীনরুট! আমি অর্ডার #${orderPlaced.orderId} সম্পন্ন করেছি (মোট ৳${orderPlaced.total})। ডেলিভারির আপডেট জানতে চাই।`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
                <span>হোয়াটসঅ্যাপে নোটিফিকেশন পান</span>
              </a>

              <Link
                href="/products"
                className="py-3 px-5 rounded-full border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-50 transition-colors"
              >
                আরো কেনাকাটা করুন
              </Link>

              <Link
                href="/dashboard"
                className="py-3 px-5 rounded-full border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-50 transition-colors"
              >
                কাস্টমার ড্যাশবোর্ড
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F5] min-h-screen pt-36 pb-20">
      <div className="container px-4">
        {/* Title */}
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <span className="text-[#E8AF30] text-xs font-bold uppercase tracking-wider block mb-1">
            নিরাপদ চেকআউট
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900">
            অর্ডার সম্পন্ন করুন (Complete Your Order)
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mt-2">
            ফর্মটি পূরণ করে নিশ্চিত করুন, খামার থেকে সরাসরি সতেজ পণ্য আপনার দরজায় পৌঁছে যাবে।
          </p>
        </div>

        {items.length === 0 ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-10 text-center border border-stone-200 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4 text-2xl">
              <i className="fa-solid fa-basket-shopping"></i>
            </div>
            <h3 className="text-stone-800 font-bold text-lg mb-2">আপনার ব্যাগ খালি</h3>
            <p className="text-stone-500 text-xs mb-6">
              চেকআউট করার পূর্বে খামার শপ থেকে পছন্দসই পণ্য ব্যাগে যোগ করুন।
            </p>
            <Link href="/products" className="btn-default py-3 px-6 text-sm">
              পণ্য দেখতে যান
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Customer Information Form (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 mb-1 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#002f1f] text-white flex items-center justify-center text-xs font-bold">১</span>
                    আপনার ডেলিভারি তথ্য (Delivery Address)
                  </h2>
                  <p className="text-xs text-stone-400 ml-9">সঠিক তথ্য দিন যাতে দ্রুত ডেলিভারি নিশ্চিত করা যায়</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মোহাম্মদ রফিকুল ইসলাম"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E8AF30]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      সচল মোবাইল নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="যেমন: 01712345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E8AF30]"
                    />
                    <span className="text-[11px] text-stone-400 mt-1 block">
                      অর্ডার কনফার্মেশনের জন্য এই নম্বরে কল দেওয়া হবে
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        ডেলিভারি এরিয়া <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={deliveryZone}
                        onChange={(e) => setDeliveryZone(e.target.value as any)}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E8AF30]"
                      >
                        <option value="inside-dhaka">ঢাকা সিটির ভিতরে (চার্জ ৳৬০)</option>
                        <option value="outside-dhaka">ঢাকা সিটির বাইরে (চার্জ ৳১২০)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        জেলা (District) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: ঢাকা / চট্টগ্রাম"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E8AF30]"
                      >
                      </input>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      পূর্ণ ঠিকানা (বাড়ি নং, রোড, থানা, এলাকা) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="যেমন: বাসা নং ১২, রোড ৪, সেক্টর ৭, উত্তরা, ঢাকা"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E8AF30]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      অর্ডার স্পেশাল নোট (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: সকাল ১০টার মধ্যে ডেলিভারি দিলে ভালো হয়"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E8AF30]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">
                      পছন্দের ডেলিভারি সময়সূচী (Delivery Time Slot) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        {
                          id: "morning",
                          label: "ভোরের স্লট (Dawn Slot)",
                          time: "সকাল ৭:০০ - ১০:০০ টা",
                          badge: "তাজা দুধ ও শাক",
                          icon: "fa-sun text-amber-500",
                        },
                        {
                          id: "evening",
                          label: "বিকালের স্লট (Evening)",
                          time: "বিকাল ৪:০০ - রাত ৮:০০ টা",
                          badge: "অফিস ফেরত",
                          icon: "fa-moon text-indigo-400",
                        },
                        {
                          id: "regular",
                          label: "রেগুলার ডেলিভারি",
                          time: "২৪ ঘণ্টার মধ্যে",
                          badge: "সারা বাংলাদেশ",
                          icon: "fa-truck text-emerald-500",
                        },
                      ].map((slot) => (
                        <div
                          key={slot.id}
                          onClick={() => setDeliverySlot(slot.id as any)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                            deliverySlot === slot.id
                              ? "bg-[#002f1f] text-white border-[#002f1f] shadow-md shadow-[#002f1f]/20"
                              : "bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <i className={`fa-solid ${slot.icon} text-xs`}></i>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                                deliverySlot === slot.id
                                  ? "bg-[#E8AF30] text-[#002719]"
                                  : "bg-white text-stone-600 border border-stone-200"
                              }`}
                            >
                              {slot.badge}
                            </span>
                          </div>
                          <div className="text-xs font-bold">{slot.label}</div>
                          <div
                            className={`text-[10px] mt-0.5 ${
                              deliverySlot === slot.id ? "text-stone-300" : "text-stone-500"
                            }`}
                          >
                            {slot.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="pt-6 border-t border-stone-200">
                  <h2 className="text-lg font-bold text-stone-900 mb-1 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#002f1f] text-white flex items-center justify-center text-xs font-bold">২</span>
                    পেমেন্ট পদ্ধতি (Payment Method)
                  </h2>
                  <p className="text-xs text-stone-400 ml-9 mb-4">পছন্দসই পেমেন্ট মেথড বেছে নিন</p>

                  <div className="space-y-3">
                    <label
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === "cod"
                          ? "border-[#002f1f] bg-[#002f1f]/5 ring-1 ring-[#002f1f]"
                          : "border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="w-4 h-4 text-[#002f1f] accent-[#002f1f]"
                        />
                        <div>
                          <span className="font-bold text-sm text-stone-900 block">
                            ক্যাশ অন ডেলিভারি (Cash on Delivery)
                          </span>
                          <span className="text-xs text-stone-500">
                            পণ্য হাতে পেয়ে দেখে শুনে মূল্য পরিশোধ করুন
                          </span>
                        </div>
                      </div>
                      <span className="text-emerald-700 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
                        জনপ্রিয়
                      </span>
                    </label>

                    <label
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === "bkash"
                          ? "border-[#002f1f] bg-[#002f1f]/5 ring-1 ring-[#002f1f]"
                          : "border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "bkash"}
                          onChange={() => setPaymentMethod("bkash")}
                          className="w-4 h-4 text-[#002f1f] accent-[#002f1f]"
                        />
                        <div>
                          <span className="font-bold text-sm text-stone-900 block">
                            বিকাশ / নগদ (bKash / Nagad Wallet)
                          </span>
                          <span className="text-xs text-stone-500">
                            মার্চেন্ট বা পার্সোনাল একাউন্ট থেকে ইনস্ট্যান্ট পরিশোধ
                          </span>
                        </div>
                      </div>
                      <span className="text-pink-600 font-bold text-xs">bKash / Nagad</span>
                    </label>

                    {/* bKash Details box when active */}
                    {paymentMethod === "bkash" && (
                      <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 text-xs space-y-3 animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-pink-900 flex items-center gap-2">
                            <i className="fa-solid fa-mobile-screen-button text-pink-600"></i>
                            গ্রীনরুট বিকাশ মার্চেন্ট অ্যাকাউন্ট
                          </span>
                          <span className="font-mono font-bold text-pink-700 bg-white px-2.5 py-0.5 rounded border border-pink-200">
                            01711-987654
                          </span>
                        </div>
                        <p className="text-stone-600 text-[11px] leading-relaxed">
                          বিকাশ অ্যাপের &quot;Payment&quot; অপশনে গিয়ে উপরের নম্বরে ৳{finalPayable} পাঠিয়ে TrxID নিচে লিখুন অথবা খালি রেখে অর্ডার কনফার্ম করুন (আমাদের প্রতিনিধি কল দিয়ে ভেরিফাই করবেন)।
                        </p>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">
                            বিকাশ ট্রানজেকশন আইডি (TrxID - ঐচ্ছিক)
                          </label>
                          <input
                            type="text"
                            placeholder="যেমন: 9J4K28L9P"
                            value={trxId}
                            onChange={(e) => setTrxId(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-pink-200 text-stone-800 text-xs font-mono uppercase focus:outline-none focus:border-pink-500"
                          />
                        </div>
                      </div>
                    )}

                    <label
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === "card"
                          ? "border-[#002f1f] bg-[#002f1f]/5 ring-1 ring-[#002f1f]"
                          : "border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="w-4 h-4 text-[#002f1f] accent-[#002f1f]"
                        />
                        <div>
                          <span className="font-bold text-sm text-stone-900 block">
                            ভিসা / মাস্টারকার্ড / ব্যাংক
                          </span>
                          <span className="text-xs text-stone-500">
                            অনলাইন ডেবিট বা ক্রেডিট কার্ড পেমেন্ট
                          </span>
                        </div>
                      </div>
                      <span className="text-blue-600 font-bold text-xs">Visa / MC</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Pay Button (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-6 sticky top-28">
                <div className="border-b border-stone-200 pb-4">
                  <h3 className="font-bold text-stone-900 text-lg">
                    অর্ডার সামারি (Order Items)
                  </h3>
                  <span className="text-xs text-stone-500">{items.length}টি পণ্য ব্যাগে আছে</span>
                </div>

                {/* Items preview list */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                        />
                        <div>
                          <h5 className="font-bold text-stone-900 line-clamp-1">{item.titleBn}</h5>
                          <span className="text-stone-400">{item.unit} × {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-stone-800 shrink-0">
                        ৳{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="pt-4 border-t border-stone-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="কুপন কোড (যেমন: GREEN10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                      className="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-[#E8AF30] uppercase"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      disabled={couponApplied}
                      className="px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors disabled:opacity-50"
                    >
                      {couponApplied ? "যুক্ত হয়েছে" : "প্রয়োগ"}
                    </button>
                  </div>
                  {couponApplied && (
                    <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                      ✓ ১০% ছাড় সক্রিয় হয়েছে (৳{discountAmount} সাশ্রয়)
                    </span>
                  )}
                  {couponError && (
                    <span className="text-[11px] text-red-500 mt-1 block">
                      {couponError}
                    </span>
                  )}
                </div>

                {/* Calculation breakdown */}
                <div className="space-y-2 text-xs text-stone-600 pt-4 border-t border-stone-100">
                  <div className="flex justify-between">
                    <span>পণ্যের মূল্য (Subtotal):</span>
                    <span className="font-bold text-stone-900">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>হোম ডেলিভারি চার্জ:</span>
                    <span className="font-bold text-stone-900">৳{deliveryFee}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>কুপন ছাড় (Discount):</span>
                      <span>-৳{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-stone-900 pt-3 border-t border-stone-200">
                    <span>সর্বমোট প্রদেয় বিল:</span>
                    <span className="text-[#002f1f] text-xl">৳{finalPayable}</span>
                  </div>
                </div>

                {/* Place Order CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-[#E8AF30] hover:bg-[#d9a024] text-[#181818] font-extrabold text-base tracking-wide transition-all shadow-lg hover:shadow-[#E8AF30]/25 disabled:opacity-50 active:scale-95"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      অর্ডার প্রসেস হচ্ছে...
                    </span>
                  ) : (
                    <span>অর্ডার কনফার্ম করুন (Place Order ৳{finalPayable})</span>
                  )}
                </button>

                <p className="text-[11px] text-stone-400 text-center leading-relaxed">
                  🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ। অর্ডারের পর কোনো লুকানো চার্জ নেই।
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
