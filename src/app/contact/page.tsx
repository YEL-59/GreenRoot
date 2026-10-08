"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Header Banner */}
      <section className="relative pt-36 pb-16 bg-[#002f1f] text-white">
        <div className="container relative z-10 px-4 text-center max-w-2xl mx-auto">
          <span className="text-[#E8AF30] text-xs font-bold uppercase tracking-wider block mb-2">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            যোগাযোগ ও খামার পরিদর্শন
          </h1>
          <p className="text-emerald-100/80 text-sm leading-relaxed">
            আমাদের খাঁটি অর্গানিক পণ্য সম্পর্কে যেকোনো প্রশ্ন, পাইকারি অর্ডার কিংবা খামার পরিদর্শনের জন্য সরাসরি যোগাযোগ করুন।
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
            {/* Left Contact Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#002f1f] text-[#E8AF30] flex items-center justify-center text-xl shrink-0">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base mb-1">কাস্টমার হেল্পলাইন</h3>
                  <p className="text-xs text-stone-500 mb-2">সকাল ৮:০০টা - রাত ৮:০০টা</p>
                  <a href={siteConfig.phoneHref} className="text-sm font-bold text-[#002f1f] hover:text-[#E8AF30] transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#002f1f] text-[#E8AF30] flex items-center justify-center text-xl shrink-0">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base mb-1">ইমেইল সহায়তা</h3>
                  <p className="text-xs text-stone-500 mb-2">দ্রুত উত্তর পেতে ইমেইল করুন</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-sm font-bold text-[#002f1f] hover:text-[#E8AF30] transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#002f1f] text-[#E8AF30] flex items-center justify-center text-xl shrink-0">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base mb-1">খামার ও হেড অফিস</h3>
                  <p className="text-xs text-stone-500 mb-1 leading-relaxed">
                    {siteConfig.address}
                  </p>
                  <span className="text-xs text-emerald-700 font-semibold">পরিদর্শন সময়: প্রতি শনিবার ১০টা - ৪টা</span>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="bg-[#002f1f] rounded-3xl p-6 text-white text-center">
                <h4 className="font-bold text-base mb-1">হোয়াটসঅ্যাপে সরাসরি অর্ডার?</h4>
                <p className="text-xs text-emerald-200/70 mb-4">আমাদের প্রতিনিধির সাথে চ্যাট করে দ্রুত বাজার করুন</p>
                <a
                  href={`https://wa.me/8801700000000`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E8AF30] text-[#181818] font-bold text-xs hover:bg-white transition-colors"
                >
                  <i className="fa-brands fa-whatsapp text-sm"></i>
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Right Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-stone-200/90 shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl mx-auto mb-4">
                    <i className="fa-solid fa-paper-plane"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">বার্তা পাঠানো হয়েছে!</h3>
                  <p className="text-stone-500 text-sm max-w-md mx-auto mb-6">
                    ধন্যবাদ আপনার বার্তার জন্য। আমাদের ফার্ম টিম খুব শীঘ্রই আপনার সাথে ফোনে অথবা ইমেইলে যোগাযোগ করবে।
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-default py-2.5 px-6 text-xs"
                  >
                    নতুন বার্তা পাঠান
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold text-stone-900 mb-1">আমাদের মেসেজ পাঠান</h2>
                  <p className="text-xs text-stone-500 mb-6">নিচের ফর্মটি পূরণ করুন, আমরা দ্রুত সাড়া দেব</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">আপনার নাম *</label>
                      <input
                        type="text"
                        required
                        placeholder="আপনার পূর্ণ নাম"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-[#E8AF30]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">মোবাইল নম্বর *</label>
                      <input
                        type="tel"
                        required
                        placeholder="017xxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-[#E8AF30]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">ইমেইল এড্রেস</label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-[#E8AF30]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">বিষয় (Subject)</label>
                      <input
                        type="text"
                        placeholder="যেমন: খামারের দুধ অর্ডার / পরামর্শ"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-[#E8AF30]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">আপনার বার্তা / অর্ডার বিবরণ *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="বিস্তারিত লিখুন..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-[#E8AF30]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-default w-full py-3.5 text-sm font-bold tracking-wide shadow-md"
                  >
                    মেসেজ পাঠান (Send Message)
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
