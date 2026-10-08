"use client";

import React, { useState } from "react";
import Link from "next/link";
import { products, productCategories } from "@/data/products";
import { useCart } from "@/context/CartContext";

export const FeaturedProductsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addToCart } = useCart();

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
          {featured.map((product) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      {product.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#002f1f] text-white text-[10px] font-bold">
                          {product.badge}
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold self-start">
                          {discount}% ছাড়
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 z-10">
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[9px] font-medium flex items-center gap-1">
                        <i className="fa-solid fa-location-dot text-[#E8AF30]"></i>
                        {product.originBn}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-1 text-amber-500 text-[11px]">
                        <i className="fa-solid fa-star"></i>
                        <span className="font-bold text-stone-800">{product.rating}</span>
                      </div>
                      <span className="text-emerald-700 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                        {product.categoryBn}
                      </span>
                    </div>

                    <Link href={`/products/${product.slug}`} className="block group-hover:text-emerald-800 transition-colors">
                      <h4 className="font-bold text-stone-900 text-sm leading-snug line-clamp-1 mb-0.5">
                        {product.titleBn}
                      </h4>
                      <p className="text-stone-400 text-xs truncate mb-2">{product.title}</p>
                    </Link>

                    <div className="flex items-baseline gap-2 pt-2 border-t border-stone-100">
                      <span className="text-lg font-extrabold text-[#002f1f]">৳{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone-400 line-through">
                          ৳{product.originalPrice}
                        </span>
                      )}
                      <span className="text-[10px] text-stone-500 ml-auto">{product.unitBn}</span>
                    </div>
                  </div>
                </div>

                {/* Add to cart */}
                <div className="p-4 pt-0">
                  <button
                    type="button"
                    onClick={() => addToCart(product, 1)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#002f1f] hover:bg-[#E8AF30] text-white hover:text-black font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-sm"
                  >
                    <i className="fa-solid fa-basket-shopping text-xs"></i>
                    <span>ব্যাগে নিন</span>
                  </button>
                </div>
              </div>
            );
          })}
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
