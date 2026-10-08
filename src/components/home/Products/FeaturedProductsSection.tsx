"use client";

import React, { useState } from "react";
import Link from "next/link";
import { products, productCategories } from "@/data/products";
import { ModernProductCard } from "@/components/common";

export const FeaturedProductsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const featured = products
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .slice(0, 8);

  return (
    <section className="py-20 bg-[#FAF9F5]">
      <div className="container px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8AF30]/15 text-[#E8AF30] border border-[#E8AF30]/30 text-xs font-bold uppercase tracking-wider mb-3">
              <i className="fa-solid fa-basket-shopping text-xs"></i>
              খামার ফ্রেশ অর্গানিক বাজার
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 leading-tight">
              ঘরে বসেই কিনুন আসল খামার পণ্য
            </h2>
            <p className="text-stone-500 text-sm mt-2 leading-relaxed">
              কোনো প্রকার কেমিক্যাল বা ভেজাল ছাড়া সরাসরি আমাদের খামার ও প্রাকৃতিক উৎস থেকে সংগৃহীত।
            </p>
          </div>

          <Link
            href="/products"
            className="btn-default py-3 px-6 text-sm whitespace-nowrap self-start md:self-auto"
          >
            সব পণ্য দেখুন (View Shop)
          </Link>
        </div>

        {/* Quick Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {productCategories.slice(0, 6).map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? "bg-[#002f1f] text-white shadow-md shadow-[#002f1f]/20"
                    : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80"
                }`}
              >
                <i className={`${cat.icon} ${isSelected ? "text-[#E8AF30]" : "text-stone-400"}`}></i>
                <span>{cat.nameBn}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ModernProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 rounded-3xl bg-[#002f1f] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <span className="text-[#E8AF30] text-xs font-bold uppercase tracking-wider block mb-1">
              সরাসরি খামার থেকে হোম ডেলিভারি
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              সপ্তাহের তাজা বাজার ঘরে বসেই অর্ডার করুন
            </h3>
            <p className="text-emerald-200/80 text-xs md:text-sm">
              খাঁটি দুধ, বিলোনা ঘি, সুন্দরবনের মধু, কাঁচা সরিষার তেল ও তাজা মাছ—সব পাবেন এক ঠিকানায়।
            </p>
          </div>
          <Link
            href="/products"
            className="btn-default py-3.5 px-8 text-sm whitespace-nowrap relative z-10"
          >
            সব খামার পণ্য কিনুন
          </Link>
        </div>
      </div>
    </section>
  );
};
