"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products, productCategories } from "@/data/products";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

const ProductsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const { addToCart } = useCart();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          product.title.toLowerCase().includes(query) ||
          product.titleBn.includes(query) ||
          product.categoryBn.includes(query) ||
          product.originBn.includes(query);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Header Banner */}
      <section className="relative pt-36 pb-16 bg-[#002f1f] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E8AF30_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8AF30]/15 text-[#E8AF30] border border-[#E8AF30]/30 text-xs font-bold uppercase tracking-wider mb-4">
              <i className="fa-solid fa-seedling text-xs"></i>
              ১০০% খাঁটি ও প্রাকৃতিক খামার পণ্য
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              GreenRoot Farm Shop
            </h1>
            <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed">
              সরাসরি খামার থেকে সংগৃহীত কাঁচা গরুর দুধ, কাঠের ঘানি ভাঙা তেল, মদিনার খেজুর, সুন্দরবনের মধু এবং তাজা শাকসবজি ও দেশি মাছ—আপনার পরিবারের সুস্বাস্থ্যের নিশ্চয়তায়।
            </p>
          </div>
        </div>
      </section>

      {/* Main Shop Container */}
      <section className="py-12">
        <div className="container px-4">
          {/* Controls Bar: Search & Category Pills */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 mb-10">
            {/* Search & Sort row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-100">
              {/* Search input */}
              <div className="relative w-full md:w-96">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm"></i>
                <input
                  type="text"
                  placeholder="পণ্য খুঁজুন (দুধ, খেজুর, মধু, তেল, শাক...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-full bg-stone-50 border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E8AF30] focus:ring-2 focus:ring-[#E8AF30]/20 transition-all placeholder:text-stone-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                    aria-label="Clear search"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <span className="text-xs text-stone-500 font-medium">সাজান:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 text-sm focus:outline-none focus:border-[#E8AF30] font-medium cursor-pointer"
                >
                  <option value="featured">ফিচার্ড পণ্য (Featured)</option>
                  <option value="price-asc">দাম: কম থেকে বেশি</option>
                  <option value="price-desc">দাম: বেশি থেকে কম</option>
                  <option value="rating">সেরা রেটিং (Top Rated)</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="pt-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {productCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                        isSelected
                          ? "bg-[#002f1f] text-white shadow-md shadow-[#002f1f]/20 scale-105"
                          : "bg-stone-100/80 hover:bg-stone-200 text-stone-700 hover:text-stone-900"
                      }`}
                    >
                      <i className={`${cat.icon} ${isSelected ? "text-[#E8AF30]" : "text-stone-500"}`}></i>
                      <span>{cat.nameBn}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6 px-1">
            <p className="text-xs md:text-sm text-stone-600 font-medium">
              মোট পাওয়া গেছে: <span className="font-bold text-[#002f1f]">{filteredProducts.length}টি</span> খাঁটি পণ্য
            </p>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-xs text-[#002f1f] hover:text-[#E8AF30] font-semibold underline"
              >
                সব ক্যাটাগরি দেখুন
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-lg mx-auto my-12">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4 text-2xl">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3 className="text-stone-800 font-bold text-lg mb-2">কোনো পণ্য পাওয়া যায়নি</h3>
              <p className="text-stone-500 text-xs mb-6">
                আপনার অনুসন্ধানের সাথে কোনো পণ্য মেলেনি। ভিন্ন শব্দ দিয়ে অনুসন্ধান করুন অথবা সব পণ্য দেখুন।
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="btn-default py-2.5 px-6 text-sm"
              >
                সব পণ্য রিসেট করুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const discount = product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                  >
                    <div>
                      {/* Image Thumbnail Container */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                          {product.badge && (
                            <span className="px-3 py-1 rounded-full bg-[#002f1f] text-white text-[11px] font-bold shadow-sm">
                              {product.badge}
                            </span>
                          )}
                          {discount > 0 && (
                            <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow-sm self-start">
                              {discount}% ছাড়
                            </span>
                          )}
                        </div>

                        {/* Origin Pill */}
                        <div className="absolute bottom-3 left-3 z-10">
                          <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1">
                            <i className="fa-solid fa-location-dot text-[#E8AF30]"></i>
                            {product.originBn}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-5">
                        {/* Rating & Stock */}
                        <div className="flex items-center justify-between text-xs mb-2">
                          <div className="flex items-center gap-1 text-amber-500">
                            <i className="fa-solid fa-star text-[11px]"></i>
                            <span className="font-bold text-stone-800">{product.rating}</span>
                            <span className="text-stone-400">({product.reviewCount})</span>
                          </div>
                          <span className="text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md">
                            {product.categoryBn}
                          </span>
                        </div>

                        {/* Titles */}
                        <Link href={`/products/${product.slug}`} className="block group-hover:text-emerald-800 transition-colors">
                          <h3 className="font-bold text-stone-900 text-base leading-snug mb-1">
                            {product.titleBn}
                          </h3>
                          <p className="text-stone-500 text-xs font-medium truncate mb-3">
                            {product.title}
                          </p>
                        </Link>

                        {/* Price & Unit */}
                        <div className="flex items-baseline justify-between pt-2 border-t border-stone-100">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-extrabold text-[#002f1f]">
                                ৳{product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-stone-400 line-through">
                                  ৳{product.originalPrice}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-stone-500">
                              প্রতি {product.unitBn}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Add-to-Cart Button */}
                    <div className="p-5 pt-0">
                      <div className="grid grid-cols-4 gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          className="col-span-1 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 flex items-center justify-center text-xs font-semibold transition-colors"
                          title="বিস্তারিত দেখুন"
                        >
                          <i className="fa-regular fa-eye"></i>
                        </Link>
                        <button
                          type="button"
                          onClick={() => addToCart(product, 1)}
                          className="col-span-3 py-2.5 px-4 rounded-xl bg-[#002f1f] hover:bg-[#E8AF30] text-white hover:text-black font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all duration-200 shadow-sm active:scale-95"
                        >
                          <i className="fa-solid fa-basket-shopping text-xs"></i>
                          <span>ব্যাগে নিন</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Farm Quality Guarantees / Trust Badges */}
          <div className="mt-20 bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[#E8AF30] text-xs font-bold uppercase tracking-wider block mb-1">
                গ্রীনরুট গুণগত অঙ্গীকার
              </span>
              <h2 className="text-2xl font-bold text-stone-900">
                কেন আমাদের অর্গানিক পণ্য আলাদা?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl mx-auto mb-4">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">১০০% কেমিক্যালমুক্ত</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  কোনো প্রকার ফরমালিন, কীটনাশক বা কৃত্রিম রং ব্যবহার ছাড়া উৎপাদিত।
                </p>
              </div>

              <div className="text-center p-5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl mx-auto mb-4">
                  <i className="fa-solid fa-tractor"></i>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">সরাসরি নিজস্ব খামার</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  মানিকগঞ্জ, বগুড়া ও সুন্দরবন থেকে মধ্যস্বত্বভোগী ছাড়া সতেজ পণ্য সংগ্রহ।
                </p>
              </div>

              <div className="text-center p-5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-2xl mx-auto mb-4">
                  <i className="fa-solid fa-truck-fast"></i>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">দ্রুত হোম ডেলিভারি</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  সকালের তাজা শাকসবজি ও দুধ সরাসরি আপনার রান্নাঘরের দরজায়।
                </p>
              </div>

              <div className="text-center p-5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-800 flex items-center justify-center text-2xl mx-auto mb-4">
                  <i className="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">ক্যাশ অন ডেলিভারি</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  পণ্য হাতে পেয়ে দেখে শুনে মূল্য পরিশোধের সম্পূর্ণ নিশ্চিন্ত সুবিধা।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-36 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
