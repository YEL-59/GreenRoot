"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ModernProductCard } from "@/components/common";
import type { Product } from "@/types";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const slug = resolvedParams?.slug;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return notFound();
  }

  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<"benefits" | "nutrition" | "origin" | "storage" | "reviews">("benefits");
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Pack sizes configuration
  const packOptions = [
    {
      label: `১ ${product.unitBn} (স্ট্যান্ডার্ড)`,
      unitText: product.unitBn,
      multiplier: 1,
      discountExtra: 0,
    },
    {
      label: `২ ${product.unitBn} (ফ্যামিলি প্যাক)`,
      unitText: `২ ${product.unitBn}`,
      multiplier: 2,
      discountExtra: product.price > 500 ? 50 : 5,
    },
    {
      label: `৫ ${product.unitBn} (সাপ্তাহিক স্টক)`,
      unitText: `৫ ${product.unitBn}`,
      multiplier: 5,
      discountExtra: product.price > 500 ? 150 : 30,
    },
  ];

  const currentPack = packOptions[selectedPackIndex];
  const unitPrice = product.price * currentPack.multiplier - currentPack.discountExtra;
  const originalUnitPrice = product.originalPrice
    ? product.originalPrice * currentPack.multiplier
    : Math.round(unitPrice * 1.15);

  const discountPercent = Math.round(
    ((originalUnitPrice - unitPrice) / originalUnitPrice) * 100
  );
  const totalSavings = originalUnitPrice - unitPrice;

  // Gallery multi-angle images
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80",
  ];

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 4);

  // Combo bundle cross-sell products
  const bundleProduct1 = products.find((p) => p.slug === "traditional-cow-ghee") || products[1];
  const bundleProduct2 = products.find((p) => p.slug === "sundarbans-raw-wild-honey") || products[4];
  const bundleOriginalTotal = unitPrice + bundleProduct1.price + bundleProduct2.price;
  const bundleDiscountedPrice = Math.round(bundleOriginalTotal * 0.92);

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        price: unitPrice,
        unitBn: currentPack.unitText,
      },
      quantity,
      false
    );
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        ...product,
        price: unitPrice,
        unitBn: currentPack.unitText,
      },
      quantity,
      false
    );
    router.push("/checkout");
  };

  const handleAddBundle = () => {
    addToCart(product, 1, false);
    addToCart(bundleProduct1, 1, false);
    addToCart(bundleProduct2, 1, false);
    openCart();
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="container px-4 max-w-7xl mx-auto">
        {/* Top Breadcrumb & Live Farm Broadcast Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-4 mb-4 border-b border-stone-200/80">
          <nav className="flex items-center gap-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#002719] font-medium transition-colors">
              হোম
            </Link>
            <span className="text-stone-300">/</span>
            <Link href="/products" className="hover:text-[#002719] font-medium transition-colors">
              ফার্ম শপ
            </Link>
            <span className="text-stone-300">/</span>
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-[#002719] font-medium transition-colors"
            >
              {product.categoryBn}
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-stone-900 font-bold truncate max-w-[200px] sm:max-w-none">
              {product.titleBn}
            </span>
          </nav>

          <div className="flex items-center gap-3 self-start md:self-auto text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 font-bold border border-emerald-300/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              ভোরের তাজা সংগ্রহ (Dawn Harvested)
            </span>
            <span className="text-stone-400 font-mono hidden sm:inline">
              ব্যাচ #GR-2026-FARM
            </span>
          </div>
        </div>

        {/* Hero Interactive Showcase Grid */}
        <div className="bg-white rounded-[32px] p-5 sm:p-8 lg:p-10 shadow-[0_10px_40px_-15px_rgba(0,39,25,0.08)] border border-stone-200/90 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Interactive Multi-Photo Cinematic Gallery (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Main Photo Viewport */}
              <div className="relative rounded-[28px] overflow-hidden bg-stone-100 aspect-[4/3] sm:aspect-square ring-1 ring-black/[0.04] shadow-md group">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                />

                {/* Top Overlay Vignettes */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 via-black/15 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />

                {/* Top Left Floating Badges */}
                <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
                  {product.badge && (
                    <span className="px-3 py-1 rounded-full bg-[#002719]/90 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {product.badge}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-white text-[10px] font-black shadow-md">
                      -{discountPercent}% ছাড় (৳{totalSavings} সাশ্রয়)
                    </span>
                  )}
                </div>

                {/* Top Right Floating Actions */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
                  <button
                    type="button"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-300 ${
                      isWishlisted
                        ? "bg-rose-500 text-white scale-105 shadow-rose-500/40"
                        : "bg-white/85 hover:bg-white text-stone-700 hover:text-rose-500"
                    }`}
                    title={isWishlisted ? "পছন্দ থেকে সরান" : "পছন্দের তালিকায় রাখুন"}
                    aria-label="Wishlist"
                  >
                    <i
                      className={`${
                        isWishlisted ? "fa-solid fa-heart" : "fa-regular fa-heart"
                      } text-sm`}
                    ></i>
                  </button>
                </div>

                {/* Bottom Badges: Provenance & Purity */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-xl bg-black/65 backdrop-blur-md border border-white/15 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm">
                    <i className="fa-solid fa-location-dot text-[#E8AF30] text-xs"></i>
                    <span>{product.originBn}</span>
                  </span>

                  <span className="px-3 py-1 rounded-xl bg-emerald-950/85 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <i className="fa-solid fa-shield-halved text-emerald-400 text-xs"></i>
                    <span>ল্যাব টেস্ট স্কোর ৯৯.৮%</span>
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails Carousel */}
              <div className="grid grid-cols-4 gap-2.5 pt-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-[#E8AF30] ring-2 ring-[#E8AF30]/40 scale-102"
                        : "border-stone-200/80 hover:border-stone-400 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Quality Certification Trust Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-emerald-950 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-award text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-emerald-950">
                      BSTI ও ISO স্ট্যান্ডার্ড সার্টিফাইড পিউরিটি
                    </h4>
                    <p className="text-[11px] text-emerald-800">
                      কোনো রাসায়নিক, মেলামাইন বা হরমোন মেশানো নেই।
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-emerald-200/50 text-[11px] font-bold text-emerald-900">
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-snowflake text-emerald-600"></i> ৪°C কোল্ড-চেইন
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-bottle-droplet text-emerald-600"></i> খাদ্য-উপযোগী সিলগালা জার
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Product Intelligence & Buy Box (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Verified Reviews Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-900 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
                      <i className="fa-solid fa-seedling mr-1.5 text-emerald-700"></i>
                      {product.categoryBn}
                    </span>

                    <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                      স্টক: {product.stock} টি উপলব্ধ
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("reviews")}
                    className="flex items-center gap-1.5 text-xs font-extrabold text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-full border border-amber-200 transition-colors"
                  >
                    <i className="fa-solid fa-star text-amber-500"></i>
                    <span className="text-stone-900">{product.rating}</span>
                    <span className="text-stone-500 font-medium underline">
                      ({product.reviewCount} কাস্টমার রিভিউ)
                    </span>
                  </button>
                </div>

                {/* Product Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-950 leading-tight mb-1">
                  {product.titleBn}
                </h1>
                <p className="text-stone-500 text-sm font-medium mb-5">
                  {product.title} • 100% Raw Grass-Fed Organic Farm Produce
                </p>

                {/* Price Display Card */}
                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-stone-50 via-stone-50/80 to-emerald-50/40 border border-stone-200/80 mb-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-0.5">
                      বিশেষ অফার মূল্য
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-black text-[#002719] font-mono tracking-tight">
                        ৳{unitPrice}
                      </span>
                      {originalUnitPrice > unitPrice && (
                        <span className="text-base sm:text-lg text-stone-400 line-through font-mono">
                          ৳{originalUnitPrice}
                        </span>
                      )}
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300/60">
                        ৳{totalSavings} সাশ্রয় (-{discountPercent}%)
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-0.5">
                      প্যাকেজিং
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-stone-800 bg-white px-3.5 py-1.5 rounded-xl border border-stone-200 shadow-xs inline-block">
                      {currentPack.unitText}
                    </span>
                  </div>
                </div>

                {/* Interactive Pack Size Selector */}
                <div className="mb-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">
                      প্যাক সাইজ বেছে নিন (Select Pack Size):
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold">
                      বড় প্যাকে বাড়তি সাশ্রয়!
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {packOptions.map((pack, i) => {
                      const isSelected = selectedPackIndex === i;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedPackIndex(i)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "bg-[#002719] text-white border-[#002719] shadow-md shadow-[#002719]/15"
                              : "bg-white hover:bg-stone-50 text-stone-800 border-stone-200/90"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold mb-1">
                            <span>{pack.label}</span>
                            {isSelected && (
                              <i className="fa-solid fa-circle-check text-[#E8AF30]"></i>
                            )}
                          </div>
                          <div className="text-xs font-mono font-bold">
                            ৳{product.price * pack.multiplier - pack.discountExtra}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Free Delivery Bar Progress */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 mb-5">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-truck-fast text-[#E8AF30]"></i>
                      ৳১,০০০ টাকার অর্ডারে ফ্রি এক্সপ্রেস ডেলিভারি
                    </span>
                    <span className="text-emerald-800">
                      {unitPrice * quantity >= 1000
                        ? "ফ্রি ডেলিভারি প্রযোজ্য! 🎉"
                        : `আর মাত্র ৳${Math.max(0, 1000 - unitPrice * quantity)} বাকি`}
                    </span>
                  </div>
                  <div className="w-full bg-amber-200/60 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-700 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, ((unitPrice * quantity) / 1000) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Delivery Slot Countdown Widget */}
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 mb-6 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 shrink-0">
                      <i className="fa-regular fa-clock text-[#E8AF30]"></i>
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block">
                        পরবর্তী এক্সপ্রেস ডেলিভারি স্লট
                      </span>
                      <span className="text-stone-500 text-[11px]">
                        আজ বিকাল ৪:০০ - রাত ৮:০০ (ঢাকা সিটিতে ৩ ঘণ্টার মধ্যে ডেলিভারি)
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold text-[11px] whitespace-nowrap">
                    স্লট উন্মুক্ত
                  </span>
                </div>
              </div>

              {/* Purchase Controls Box (Interactive Stepper & High Converting Buttons) */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-stone-700">পরিমাণ:</span>
                    <div className="flex items-center bg-stone-100 rounded-2xl p-1 border border-stone-200">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 rounded-xl bg-white hover:bg-stone-200 text-stone-800 font-black flex items-center justify-center transition-colors shadow-xs active:scale-90"
                        aria-label="Decrease quantity"
                      >
                        <i className="fa-solid fa-minus text-xs"></i>
                      </button>
                      <span className="w-12 text-center font-black font-mono text-stone-900 text-base">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-10 h-10 rounded-xl bg-white hover:bg-stone-200 text-stone-800 font-black flex items-center justify-center transition-colors shadow-xs active:scale-90"
                        aria-label="Increase quantity"
                      >
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-stone-500 block">সর্বমোট প্রদেয়:</span>
                    <span className="text-2xl font-black text-[#002719] font-mono">
                      ৳{unitPrice * quantity}
                    </span>
                  </div>
                </div>

                {/* Primary Actions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`py-4 px-6 rounded-2xl font-black text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95 ${
                      isAddedFeedback
                        ? "bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400"
                        : "bg-gradient-to-r from-[#002719] via-[#003824] to-[#002719] hover:from-[#E8AF30] hover:to-amber-400 text-white hover:text-[#002719] shadow-[#002719]/20"
                    }`}
                  >
                    <i
                      className={`${
                        isAddedFeedback ? "fa-solid fa-check" : "fa-solid fa-basket-shopping"
                      } text-base`}
                    ></i>
                    <span>{isAddedFeedback ? "ব্যাগে যুক্ত হয়েছে ✓" : "ব্যাগে নিন (Add to Cart)"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E8AF30] to-amber-400 hover:from-amber-400 hover:to-yellow-500 text-[#002719] font-black text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-md shadow-[#E8AF30]/25 active:scale-95"
                  >
                    <i className="fa-solid fa-bolt text-base"></i>
                    <span>সরাসরি কিনুন (1-Click Buy)</span>
                  </button>
                </div>

                {/* Direct Phone / WhatsApp Shortcut */}
                <div className="flex items-center justify-center gap-4 text-xs font-bold text-stone-600 pt-1">
                  <a
                    href="tel:01712345678"
                    className="flex items-center gap-1.5 hover:text-[#002719] transition-colors"
                  >
                    <i className="fa-solid fa-phone text-[#E8AF30]"></i>
                    <span>ফোনে অর্ডার: ০১৭১২-৩৪৫৬৭৮</span>
                  </a>
                  <span>•</span>
                  <a
                    href="https://wa.me/8801712345678"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
                  >
                    <i className="fa-brands fa-whatsapp text-emerald-600 text-sm"></i>
                    <span>হোয়াটসঅ্যাপে অর্ডার</span>
                  </a>
                </div>

                {/* 4 Core Pillars of Trust */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-stone-100">
                  <div className="p-2.5 rounded-xl bg-stone-50 text-center">
                    <i className="fa-solid fa-shield-heart text-emerald-700 text-base mb-1 block"></i>
                    <span className="text-[10px] font-bold text-stone-800 block">১০০% প্রাকৃতিক</span>
                    <span className="text-[9px] text-stone-500">রাসায়নিক মুক্ত</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-stone-50 text-center">
                    <i className="fa-solid fa-rotate-left text-emerald-700 text-base mb-1 block"></i>
                    <span className="text-[10px] font-bold text-stone-800 block">মানিব্যাক গ্যারান্টি</span>
                    <span className="text-[9px] text-stone-500">ইনস্ট্যান্ট রিফান্ড</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-stone-50 text-center">
                    <i className="fa-solid fa-hand-holding-dollar text-emerald-700 text-base mb-1 block"></i>
                    <span className="text-[10px] font-bold text-stone-800 block">ক্যাশ অন ডেলিভারি</span>
                    <span className="text-[9px] text-stone-500">পণ্য দেখে দাম দিন</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-stone-50 text-center">
                    <i className="fa-solid fa-truck-ramp-box text-emerald-700 text-base mb-1 block"></i>
                    <span className="text-[10px] font-bold text-stone-800 block">কোল্ড-চেইন</span>
                    <span className="text-[9px] text-stone-500">৪ ঘণ্টায় ডেলিভারি</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Sell Bundle: Frequently Bought Together (Farm Breakfast Essentials) */}
        <div className="bg-gradient-to-br from-[#002719] to-[#003824] rounded-[32px] p-6 sm:p-8 text-white mb-12 shadow-xl border border-emerald-800/60 relative overflow-hidden">
          <div className="max-w-2xl relative z-10 mb-6">
            <span className="text-[#E8AF30] text-xs font-bold uppercase tracking-wider block mb-1">
              খামারের স্বাস্থ্যকর কম্বো অফার
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
              একসাথে কিনুন এবং বাড়তি ১১১ টাকা সাশ্রয় করুন!
            </h3>
            <p className="text-emerald-200/80 text-xs sm:text-sm">
              খাঁটি দুধের সাথে বিলোনা গাওয়া ঘি ও সুন্দরবনের মধু—পরিপূর্ণ সকালের পুষ্টির জন্য আদর্শ প্যাকেজ।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            {/* Products Row */}
            <div className="lg:col-span-8 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Product 1 */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div>
                  <h4 className="font-bold text-xs line-clamp-1">{product.titleBn}</h4>
                  <span className="text-xs font-black text-[#E8AF30] font-mono">৳{unitPrice}</span>
                </div>
              </div>

              <span className="text-lg font-black text-emerald-400">+</span>

              {/* Product 2 */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <img
                  src={bundleProduct1.image}
                  alt={bundleProduct1.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div>
                  <h4 className="font-bold text-xs line-clamp-1">{bundleProduct1.titleBn}</h4>
                  <span className="text-xs font-black text-[#E8AF30] font-mono">৳{bundleProduct1.price}</span>
                </div>
              </div>

              <span className="text-lg font-black text-emerald-400">+</span>

              {/* Product 3 */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <img
                  src={bundleProduct2.image}
                  alt={bundleProduct2.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div>
                  <h4 className="font-bold text-xs line-clamp-1">{bundleProduct2.titleBn}</h4>
                  <span className="text-xs font-black text-[#E8AF30] font-mono">৳{bundleProduct2.price}</span>
                </div>
              </div>
            </div>

            {/* Bundle Checkout Action */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center">
              <span className="text-xs text-emerald-200 block mb-1">৩টি পণ্যের কম্বো মূল্য:</span>
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-2xl font-black text-[#E8AF30] font-mono">
                  ৳{bundleDiscountedPrice}
                </span>
                <span className="text-sm text-stone-400 line-through font-mono">
                  ৳{bundleOriginalTotal}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddBundle}
                className="w-full py-3 px-4 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-black text-xs tracking-wide transition-all shadow-md active:scale-95"
              >
                এক ক্লিকে কম্বো ব্যাগে নিন
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Benefits, Nutrition, Origin, Storage, Reviews */}
        <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-sm border border-stone-200/90 mb-16">
          {/* Tab Navigation Header */}
          <div className="flex items-center gap-3 border-b border-stone-200 overflow-x-auto pb-4 mb-8 scrollbar-none">
            <button
              onClick={() => setActiveTab("benefits")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "benefits"
                  ? "bg-[#002719] text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 bg-stone-50"
              }`}
            >
              পুষ্টি ও স্বাস্থ্য উপকারিতা
            </button>
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "nutrition"
                  ? "bg-[#002719] text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 bg-stone-50"
              }`}
            >
              ল্যাব টেস্ট রিপোর্ট ও মান নিয়ন্ত্রণ
            </button>
            <button
              onClick={() => setActiveTab("origin")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "origin"
                  ? "bg-[#002719] text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 bg-stone-50"
              }`}
            >
              খামারের উৎস ও সংগ্রহের গল্প
            </button>
            <button
              onClick={() => setActiveTab("storage")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "storage"
                  ? "bg-[#002719] text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 bg-stone-50"
              }`}
            >
              ব্যবহারবিধি ও সংরক্ষণ পরামর্শ
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "reviews"
                  ? "bg-[#002719] text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 bg-stone-50"
              }`}
            >
              কাস্টমার রিভিউ ({product.reviewCount})
            </button>
          </div>

          {/* Tab 1: Benefits */}
          {activeTab === "benefits" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="max-w-3xl">
                <h3 className="text-lg sm:text-xl font-black text-stone-900 mb-2">
                  কেন {product.titleBn} আপনার পরিবারের প্রতিদিনের পুষ্টির সেরা সমাধান?
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {product.descriptionBn || product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-stone-50 border border-stone-200/70"
                  >
                    <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 mb-0.5">
                        {b}
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        প্রাকৃতিক উৎস থেকে সংগৃহীত হওয়ায় শরীরের রোগ প্রতিরোধ ক্ষমতা বহুগুণ বাড়াতে সহায়তা করে।
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Lab Nutrition & Quality Testing */}
          {activeTab === "nutrition" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Purity Score Card */}
                <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-700 text-white text-2xl font-black flex items-center justify-center mx-auto mb-3 shadow-md">
                    ৯৯.৮%
                  </div>
                  <h4 className="font-black text-emerald-950 text-base mb-1">
                    সার্টিফাইড পিউরিটি স্কোর
                  </h4>
                  <p className="text-xs text-emerald-800">
                    দৈনিক মাইক্রোবায়োলজিক্যাল টেস্টে শূন্য কেমিক্যাল ও ভেজাল নিশ্চিত করা হয়েছে।
                  </p>
                </div>

                {/* Nutrition Facts Table */}
                <div className="md:col-span-2 p-6 rounded-3xl bg-stone-50 border border-stone-200">
                  <h4 className="font-extrabold text-stone-900 text-sm mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-list-check text-emerald-700"></i>
                    পুষ্টি উপাদান প্রোফাইল (প্রতি ১০০ মিলি/গ্রাম অনুযায়ী)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                      <span className="text-[11px] text-stone-500 block">ক্যালোরি</span>
                      <span className="text-base font-black text-stone-900 font-mono">৬৭ kcal</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                      <span className="text-[11px] text-stone-500 block">প্রোটিন</span>
                      <span className="text-base font-black text-stone-900 font-mono">৩.৪ গ্রাম</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                      <span className="text-[11px] text-stone-500 block">প্রাকৃতিক ফ্যাট</span>
                      <span className="text-base font-black text-stone-900 font-mono">৪.২%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                      <span className="text-[11px] text-stone-500 block">ক্যালসিয়াম</span>
                      <span className="text-base font-black text-stone-900 font-mono">১২৫ মি.গ্রা.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab Certification Points */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200/90 space-y-2">
                <h5 className="font-bold text-xs text-stone-900">ল্যাব টেস্টে যা নিশ্চিত করা হয়:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-emerald-600"></i>
                    <span>০% কৃত্রিম ইউরিয়া ও স্টার্চ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-emerald-600"></i>
                    <span>হরমোন ও অ্যান্টিবায়োটিক মুক্ত</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-emerald-600"></i>
                    <span>প্রাকৃতিক ঘন সর ও পুষ্টি সংরক্ষিত</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Origin Story */}
          {activeTab === "origin" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold inline-block">
                  খামারের গল্প ও ট্র্যাসেবিলিটি
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-950 leading-snug">
                  সবুজ ঘাসে চরে বেড়ানো গাভী ও খাঁটি সংগ্রহের শপথ
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  আমাদের খামারে গাভীদের কোনো প্রকার কৃত্রিম কমার্শিয়াল ফিড বা হরমোন প্রয়োগ করা হয় না। প্রতিদিন ভোরে সবুজ নেপিয়ার ঘাস ও ভুট্টার তাজা সাইলেজ খেয়ে প্রাকৃতিক পরিবেশে গাভীরা বেড়ে ওঠে।
                </p>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700">
                  <div className="flex items-center gap-2 font-bold">
                    <i className="fa-solid fa-location-pin text-[#E8AF30]"></i>
                    <span>খামারের অবস্থান: {product.originBn} (ঢাকা থেকে মাত্র ৪০ কিমি)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-tractor text-emerald-700"></i>
                    <span>তত্ত্বাবধায়ক: গ্রীনরুট কো-অপারেটিভ ডেইরি ফার্মার্স</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-clock text-emerald-700"></i>
                    <span>মিল্কিং সময়: ভোর ৫:০০ টা | চিলিং সম্পন্ন: ভোর ৫:৩০ টা</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-md border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80"
                  alt="Farm grass pasture"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Tab 4: Storage */}
          {activeTab === "storage" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-black text-stone-900">
                জ্বাল দেওয়ার সঠিক নিয়ম ও সংরক্ষণ গাইডলাইন
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="w-8 h-8 rounded-xl bg-[#002719] text-[#E8AF30] font-black flex items-center justify-center text-xs mb-3">
                    ১
                  </span>
                  <h4 className="font-bold text-sm text-stone-900 mb-1">হালকা আঁচে জ্বাল</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    দুধ পাওয়ার সাথে সাথে পরিষ্কার পাত্রে হালকা আঁচে একবার ফুটিয়ে নামিয়ে ফেলুন। বেশি সময় ধরে অতিরিক্ত ফোটালে পুষ্টিকর এনজাইম নষ্ট হতে পারে।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="w-8 h-8 rounded-xl bg-[#002719] text-[#E8AF30] font-black flex items-center justify-center text-xs mb-3">
                    ২
                  </span>
                  <h4 className="font-bold text-sm text-stone-900 mb-1">ঘন সর তোলার টিপস</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    জ্বাল দেওয়ার পর না ঢেকে স্বাভাবিক তাপমাত্রায় ঠান্ডা হতে দিন। এরপর ফ্রিজে রাখলে ওপরে পুরু ও সুস্বাদু সরের আস্তরণ পড়বে।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="w-8 h-8 rounded-xl bg-[#002719] text-[#E8AF30] font-black flex items-center justify-center text-xs mb-3">
                    ৩
                  </span>
                  <h4 className="font-bold text-sm text-stone-900 mb-1">ফ্রিজে সংরক্ষণ</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    ফ্রিজের সাধারণ চেম্বারে (৪°C তাপমাত্রায়) কাঁচের বোতলে মুখ বন্ধ অবস্থায় ৩-৪ দিন সম্পূর্ণ টাটকা থাকে।
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Reviews */}
          {activeTab === "reviews" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-stone-50 p-6 rounded-3xl border border-stone-200">
                <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-stone-200 pb-4 md:pb-0 md:pr-4">
                  <span className="text-5xl font-black text-stone-900 font-mono">
                    {product.rating}
                  </span>
                  <div className="text-amber-500 text-sm my-1">★★★★★</div>
                  <span className="text-xs text-stone-500 font-medium">
                    {product.reviewCount} জন ভেরিফাইড ক্রেতার মতামত
                  </span>
                </div>

                <div className="md:col-span-5 space-y-1.5 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <span className="w-10 text-right">৫ স্টার</span>
                    <div className="flex-1 bg-stone-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full w-[92%]" />
                    </div>
                    <span className="w-8">৯২%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10 text-right">৪ স্টার</span>
                    <div className="flex-1 bg-stone-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full w-[6%]" />
                    </div>
                    <span className="w-8">৬%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10 text-right">৩ স্টার</span>
                    <div className="flex-1 bg-stone-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full w-[2%]" />
                    </div>
                    <span className="w-8">২%</span>
                  </div>
                </div>

                <div className="md:col-span-3 text-center">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(true)}
                    className="w-full py-3 px-4 rounded-xl bg-[#002719] hover:bg-emerald-900 text-white font-bold text-xs tracking-wide transition-all shadow-md active:scale-95"
                  >
                    রিভিউ লিখুন
                  </button>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">
                        তা
                      </div>
                      <div>
                        <h5 className="font-extrabold text-xs text-stone-900">তানভীর আহমেদ</h5>
                        <span className="text-[10px] text-stone-400">ধানমন্ডি, ঢাকা • ২ দিন আগে</span>
                      </div>
                    </div>
                    <span className="text-xs text-amber-500 font-bold">★★★★★</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    বাচ্চাদের জন্য নিয়মিত নিচ্ছি। কোনো প্রকার ভেজাল নেই, সাধারণ বাজার থেকে পাওয়া দুধের সাথে কোনো তুলনাই চলে না। ওপরের ঘন সর দেখলেই বোঝা যায় আসল খাঁটি দুধ। অনেক ধন্যবাদ গ্রীনরুট টিমকে!
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                        ফ
                      </div>
                      <div>
                        <h5 className="font-extrabold text-xs text-stone-900">ফারহানা চৌধুরী</h5>
                        <span className="text-[10px] text-stone-400">উত্তরা সেক্টর ৭ • ৫ দিন আগে</span>
                      </div>
                    </div>
                    <span className="text-xs text-amber-500 font-bold">★★★★★</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    সকালে অর্ডার দিয়েছিলাম, দুপুরের আগেই একদম চিলড অবস্থায় কাঁচের বোতলে ডেলিভারি পেয়েছি। প্যাকেজিং ও দুধের মিষ্টি প্রাকৃতিক গন্ধ অসাধারণ।
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-[#E8AF30] uppercase tracking-wider block mb-0.5">
                  আরো খাঁটি সংগ্রহ
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  সম্পর্কিত অন্যান্য অর্গানিক পণ্য
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-[#002719] hover:text-[#E8AF30] transition-colors"
              >
                সব পণ্য দেখুন →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ModernProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Conversion Bar for Mobile (Always Accessible) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-stone-200/90 p-3 z-40 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-11 h-11 rounded-xl object-cover shrink-0 border border-stone-200"
          />
          <div className="min-w-0">
            <h4 className="font-bold text-xs text-stone-900 truncate">{product.titleBn}</h4>
            <span className="text-sm font-black text-[#002719] font-mono">
              ৳{unitPrice * quantity}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleAddToCart}
            className="py-2.5 px-4 rounded-xl bg-[#002719] text-white font-bold text-xs flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <i className="fa-solid fa-basket-shopping text-xs"></i>
            <span>ব্যাগে নিন</span>
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="py-2.5 px-4 rounded-xl bg-[#E8AF30] text-[#002719] font-black text-xs active:scale-95 shadow-sm"
          >
            কিনুন
          </button>
        </div>
      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>

            <h3 className="text-xl font-black text-stone-900 mb-1">
              আপনার অভিজ্ঞতা শেয়ার করুন
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              {product.titleBn} সম্পর্কে আপনার সৎ মূল্যায়ন আমাদের খামারের কৃষকদের উৎসাহিত করে।
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("আপনার মূল্যবান পর্যালোচনার জন্য ধন্যবাদ! এটি পর্যালোচনার পর প্রকাশিত হবে।");
                setShowReviewModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">রেটিং দিন:</label>
                <div className="flex gap-2 text-2xl text-amber-400 cursor-pointer">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">আপনার নাম:</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: তানভীর আহমেদ"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#E8AF30]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">আপনার এলাকা/শহর:</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: উত্তরা, ঢাকা"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#E8AF30]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">বিস্তারিত মতামত:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="স্বাদ, গন্ধ ও প্যাকেজিং কেমন লেগেছে তা লিখুন..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#E8AF30]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#002719] hover:bg-emerald-800 text-white font-bold text-xs tracking-wide transition-all shadow-md"
              >
                রিভিউ সাবমিট করুন
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
