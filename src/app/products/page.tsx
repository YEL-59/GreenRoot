"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products, productCategories } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { ModernProductCard } from "@/components/common";
import type { Product } from "@/types";

const ProductsContent = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const { addToCart } = useCart();
  const { t, isBn } = useLanguage();

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
              {t.shopPage.badge}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {t.shopPage.title}
            </h1>
            <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed">
              {t.shopPage.subtitle}
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
                  placeholder={t.shopPage.searchPlaceholder}
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
                <span className="text-xs text-stone-500 font-medium">{t.shopPage.sortBy}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 text-sm focus:outline-none focus:border-[#E8AF30] font-medium cursor-pointer"
                >
                  <option value="featured">{t.shopPage.featured}</option>
                  <option value="price-asc">{t.shopPage.priceAsc}</option>
                  <option value="price-desc">{t.shopPage.priceDesc}</option>
                  <option value="rating">{t.shopPage.rating}</option>
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
                      <span>{isBn ? cat.nameBn : cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6 px-1">
            <p className="text-xs md:text-sm text-stone-600 font-medium">
              {t.shopPage.resultsCount}{" "}
              <span className="font-bold text-[#002f1f]">
                {filteredProducts.length} {t.shopPage.items}
              </span>
            </p>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-xs text-[#002f1f] hover:text-[#E8AF30] font-semibold underline"
              >
                {t.shopPage.allCategories}
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-lg mx-auto my-12">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4 text-2xl">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3 className="text-stone-800 font-bold text-lg mb-2">{t.shopPage.noProducts}</h3>
              <p className="text-stone-500 text-xs mb-6">
                {t.shopPage.noProductsDesc}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="btn-default py-2.5 px-6 text-sm"
              >
                {t.shopPage.reset}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ModernProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Farm Quality Guarantees / Trust Badges */}
          <div className="mt-20 bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[#E8AF30] text-xs font-bold uppercase tracking-wider block mb-1">
                {isBn ? "গ্রীনরুট গুণগত অঙ্গীকার" : "GreenRoot Quality Promise"}
              </span>
              <h2 className="text-2xl font-bold text-stone-900">
                {isBn ? "কেন আমাদের অর্গানিক পণ্য আলাদা?" : "Why Our Organic Farm Products Stand Apart?"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl mx-auto mb-4">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  {isBn ? "১০০% কেমিক্যালমুক্ত" : "100% Chemical-Free"}
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {isBn
                    ? "কোনো প্রকার ফরমালিন, কীটনাশক বা কৃত্রিম রং ব্যবহার ছাড়া উৎপাদিত।"
                    : "Grown naturally with zero formalin, synthetic pesticides, or artificial agents."}
                </p>
              </div>

              <div className="text-center p-5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl mx-auto mb-4">
                  <i className="fa-solid fa-tractor"></i>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  {isBn ? "সরাসরি নিজস্ব খামার" : "Direct From Our Farms"}
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {isBn
                    ? "সাভার, মানিকগঞ্জ ও নাটোরের নিজস্ব খামার থেকে মধ্যস্বত্বভোগী ছাড়া সতেজ পণ্য সংগ্রহ।"
                    : "Harvested directly from our verified farm fields without middleman commissions."}
                </p>
              </div>

              <div className="text-center p-5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-2xl mx-auto mb-4">
                  <i className="fa-solid fa-truck-fast"></i>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  {isBn ? "দ্রুত হোম ডেলিভারি" : "Express Cold Delivery"}
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {isBn
                    ? "সকালের তাজা শাকসবজি ও দুধ সরাসরি আপনার রান্নাঘরের দরজায়।"
                    : "Morning fresh milk, produce and fish delivered in cold-chain boxes to your kitchen."}
                </p>
              </div>

              <div className="text-center p-5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-800 flex items-center justify-center text-2xl mx-auto mb-4">
                  <i className="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  {isBn ? "ক্যাশ অন ডেলিভারি" : "Cash on Delivery"}
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {isBn
                    ? "পণ্য হাতে পেয়ে দেখে শুনে মূল্য পরিশোধের সম্পূর্ণ নিশ্চিন্ত সুবিধা।"
                    : "Inspect freshness and sealed quality at doorstep before paying."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductsPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen pt-36 text-center text-stone-500">Loading Farm Shop...</div>}>
      <ProductsContent />
    </Suspense>
  );
};

export default ProductsPage;
