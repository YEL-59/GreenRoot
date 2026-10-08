"use client";
import type { MouseEvent } from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export type ModernProductCardProps = {
  product: Product;
  showQuickBuy?: boolean;
};

export const ModernProductCard = ({
  product,
  showQuickBuy = true,
}: ModernProductCardProps) => {
  const router = useRouter();
  const { items, addToCart, updateQuantity, openCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showQuickModal, setShowQuickModal] = useState(false);
  const [modalQty, setModalQty] = useState(1);

  // Check if product is already in cart and its quantity
  const cartItem = items.find((i) => i.id === product.id);
  const cartQty = cartItem ? cartItem.quantity : 0;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const handleBuyNow = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, false);
    router.push("/checkout");
  };

  const toggleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleIncrease = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, cartQty + 1);
  };

  const handleDecrease = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, cartQty - 1);
  };

  return (
    <>
      <div className="group relative bg-white rounded-[26px] p-3 sm:p-3.5 border border-stone-200/90 hover:border-emerald-500/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_22px_45px_-12px_rgba(0,39,25,0.18)] transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5">
        {/* Ambient Subtle Glow on Hover */}
        <div className="absolute -inset-0.5 rounded-[28px] bg-gradient-to-r from-emerald-500/15 via-[#E8AF30]/15 to-emerald-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 pointer-events-none" />

        {/* Top Media Container */}
        <div className="relative">
          <Link
            href={`/products/${product.slug}`}
            className="block relative rounded-[20px] overflow-hidden bg-stone-100 aspect-[4/3] select-none ring-1 ring-black/[0.04]"
          >
            {/* Main Product Image */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />

            {/* Subtle Vignettes for High Contrast Readability */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/55 via-black/15 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />

            {/* Top Left Floating Badges (Stacked vertically to never collide with heart) */}
            <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1 z-10 max-w-[70%]">
              {product.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#002719]/90 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[9px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                  </span>
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-white text-[9px] font-black shadow-md whitespace-nowrap">
                  -{discount}% ছাড়
                </span>
              )}
            </div>

            {/* Bottom Left: Provenance Chip */}
            <div className="absolute bottom-2 left-2 z-10 max-w-[55%]">
              <span className="px-2 py-0.5 rounded-lg bg-black/65 backdrop-blur-md border border-white/15 text-white text-[9px] font-medium flex items-center gap-1 shadow-sm truncate">
                <i className="fa-solid fa-location-dot text-[#E8AF30] text-[8px] shrink-0"></i>
                <span className="truncate">{product.originBn}</span>
              </span>
            </div>

            {/* Bottom Right: In Stock Badge */}
            <div className="absolute bottom-2 right-2 z-10">
              <span className="px-2 py-0.5 rounded-lg bg-emerald-950/85 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-[9px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                মজুদ আছে ✓
              </span>
            </div>

            {/* Center Hover Action: Quick View Trigger */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowQuickModal(true);
                }}
                className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#002719] font-black text-[11px] shadow-xl backdrop-blur-md border border-white/80 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
              >
                <i className="fa-regular fa-eye text-[#002719]"></i>
                <span>এক নজরে দেখুন</span>
              </button>
            </div>
          </Link>

          {/* Top Right: Floating Wishlist Heart */}
          <button
            type="button"
            onClick={toggleWishlist}
            className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-md ${
              isWishlisted
                ? "bg-rose-500 text-white scale-110 shadow-rose-500/35"
                : "bg-white/85 hover:bg-white text-stone-600 hover:text-rose-500 hover:scale-110"
            }`}
            title={isWishlisted ? "পছন্দের তালিকা থেকে সরান" : "পছন্দের তালিকায় রাখুন"}
            aria-label="Wishlist"
          >
            <i
              className={`${
                isWishlisted ? "fa-solid fa-heart" : "fa-regular fa-heart"
              } text-xs transition-transform active:scale-75`}
            ></i>
          </button>
        </div>

        {/* Middle Body Content */}
        <div className="p-2 sm:p-2.5 pt-3 flex-1 flex flex-col justify-between">
          <div>
            {/* Category & Rating Bar */}
            <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 truncate">
                <i className="fa-solid fa-seedling text-[9px] text-emerald-600 shrink-0"></i>
                <span className="truncate">{product.categoryBn}</span>
              </span>

              <div className="flex items-center gap-1 text-[10px] text-amber-500 font-extrabold bg-amber-50/90 px-2 py-0.5 rounded-md border border-amber-200/60 shrink-0">
                <i className="fa-solid fa-star text-[9px]"></i>
                <span className="text-stone-800">{product.rating}</span>
                <span className="text-stone-400 font-normal">({product.reviewCount})</span>
              </div>
            </div>

            {/* Titles (2-line allowance with uniform min-height) */}
            <Link
              href={`/products/${product.slug}`}
              className="block group-hover:text-emerald-900 transition-colors mt-0.5"
            >
              <h3 className="font-extrabold text-stone-900 text-sm leading-snug line-clamp-2 h-10">
                {product.titleBn}
              </h3>
              <p className="text-stone-400 text-xs font-normal truncate mt-0.5">
                {product.title}
              </p>
            </Link>

            {/* Guarantee Tag */}
            <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium mt-1 truncate">
              <i className="fa-solid fa-circle-check text-[9px] text-emerald-600 shrink-0"></i>
              <span>১০০% প্রাকৃতিক ও নির্ভেজাল</span>
            </div>
          </div>

          {/* Pricing Architecture */}
          <div className="pt-2.5 mt-2 border-t border-stone-100">
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-[#002719] tracking-tight font-mono">
                  ৳{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through font-mono">
                    ৳{product.originalPrice}
                  </span>
                )}
              </div>

              <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200/50 whitespace-nowrap shrink-0">
                প্রতি {product.unitBn}
              </span>
            </div>

            {/* Savings Pill or Quality Note */}
            {savings > 0 ? (
              <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-2 py-0.5 inline-flex items-center gap-1">
                <i className="fa-solid fa-tag text-[8px]"></i>
                <span>৳{savings} সাশ্রয় হচ্ছে</span>
              </div>
            ) : (
              <div className="text-[10px] text-stone-400 flex items-center gap-1">
                <i className="fa-solid fa-truck-fast text-[8px] text-[#E8AF30]"></i>
                <span>আজকের ফ্রেশ সংগ্রহ</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions Bar (State-driven for ultra-modern UX) */}
        <div className="p-2 sm:p-2.5 pt-0 space-y-1.5">
          {cartQty > 0 ? (
            /* Interactive In-Cart Stepper Controls */
            <div className="space-y-1.5">
              <div className="flex items-center justify-between bg-emerald-50/90 border border-emerald-200/90 rounded-2xl p-1 shadow-sm">
                <button
                  type="button"
                  onClick={handleDecrease}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-600 text-emerald-950 font-black flex items-center justify-center transition-all shadow-xs active:scale-90"
                  aria-label="Decrease quantity"
                  title="পরিমাণ কমান"
                >
                  <i className="fa-solid fa-minus text-xs"></i>
                </button>

                <div className="flex flex-col items-center px-1">
                  <span className="text-xs font-black text-emerald-950 font-mono leading-none">
                    {cartQty} {product.unitBn}
                  </span>
                  <span className="text-[8px] font-bold text-emerald-700 flex items-center gap-0.5 mt-0.5">
                    <i className="fa-solid fa-check text-[7px]"></i> ব্যাগে যুক্ত
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleIncrease}
                  className="w-8 h-8 rounded-xl bg-[#002719] hover:bg-emerald-800 text-white font-black flex items-center justify-center transition-all shadow-xs active:scale-90"
                  aria-label="Increase quantity"
                  title="পরিমাণ বাড়ান"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => openCart()}
                  className="flex-1 py-1.5 rounded-xl bg-emerald-900/10 hover:bg-emerald-900/20 text-[#002719] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>কার্ট দেখুন</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuickModal(true)}
                  className="w-8 h-8 rounded-xl border border-stone-200 bg-stone-50 hover:bg-white text-stone-600 flex items-center justify-center text-xs transition-colors"
                  title="বিস্তারিত"
                >
                  <i className="fa-regular fa-eye"></i>
                </button>
              </div>
            </div>
          ) : (
            /* Standard Modern Add to Bag & Quick Buy Buttons */
            <>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-2.5 px-3 rounded-2xl font-black text-xs tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-md active:scale-95 ${
                    isAdded
                      ? "bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400"
                      : "bg-gradient-to-r from-[#002719] via-[#003824] to-[#002719] hover:from-[#E8AF30] hover:to-amber-400 text-white hover:text-[#002719] shadow-[#002719]/15 hover:shadow-[#E8AF30]/25"
                  }`}
                >
                  <i
                    className={`${
                      isAdded ? "fa-solid fa-check" : "fa-solid fa-basket-shopping"
                    } text-xs transition-transform ${isAdded ? "scale-125" : "group-hover:scale-110"}`}
                  ></i>
                  <span>{isAdded ? "ব্যাগে যুক্ত হয়েছে ✓" : "ব্যাগে নিন"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowQuickModal(true)}
                  className="w-10 h-10 rounded-2xl border border-stone-200/80 bg-stone-50 hover:bg-[#FAF9F5] hover:border-[#E8AF30] text-stone-700 hover:text-[#002719] flex items-center justify-center text-xs transition-all shadow-sm shrink-0"
                  title="এক নজরে বিস্তারিত দেখুন"
                >
                  <i className="fa-regular fa-eye"></i>
                </button>
              </div>

              {showQuickBuy && (
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-1.5 rounded-xl bg-amber-50 hover:bg-[#E8AF30]/20 text-[#002719] border border-amber-200/80 hover:border-[#E8AF30] text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <i className="fa-solid fa-bolt text-[10px] text-[#E8AF30]"></i>
                  <span>সরাসরি কিনুন (1-Click Buy)</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modern Quick View Modal */}
      {showQuickModal && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowQuickModal(false)}
        >
          <div
            className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200/90 relative p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowQuickModal(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors z-10"
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
              {/* Left Photo & Badges */}
              <div className="space-y-3">
                <div className="relative aspect-square rounded-[24px] overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-black shadow-md">
                      -{discount}% ছাড়
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5">
                    <i className="fa-solid fa-location-dot text-[#E8AF30]"></i>
                    {product.originBn}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900 text-xs flex items-center gap-2">
                  <i className="fa-solid fa-shield-halved text-emerald-600 text-sm"></i>
                  <span>গ্রীনরুট ল্যাব টেস্টেড ও ১০০% খাঁটি পণ্য নিশ্চয়তা</span>
                </div>
              </div>

              {/* Right Specs & Actions */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                      {product.categoryBn}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-full">
                      <i className="fa-solid fa-star"></i>
                      <span className="text-stone-800">{product.rating}</span>
                      <span className="text-stone-400">({product.reviewCount} রিভিউ)</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-black text-stone-900 leading-tight">
                    {product.titleBn}
                  </h2>
                  <p className="text-stone-400 text-xs font-medium mt-0.5">
                    {product.title}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/70">
                  <span className="text-3xl font-black text-[#002719] font-mono">
                    ৳{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through font-mono">
                      ৳{product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs font-bold text-stone-600 bg-stone-200/80 px-2.5 py-1 rounded-lg ml-auto">
                    প্রতি {product.unitBn}
                  </span>
                </div>

                {/* Description */}
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {product.descriptionBn || product.description}
                </p>

                {/* Benefits */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-stone-900 block">
                      প্রধান বৈশিষ্ট্যসমূহ:
                    </span>
                    <div className="grid grid-cols-1 gap-1 text-xs text-stone-600">
                      {product.benefits.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <i className="fa-solid fa-check text-emerald-600 text-[10px]"></i>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Action Buttons */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                      <button
                        type="button"
                        onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-stone-700 hover:bg-stone-200 transition-colors"
                      >
                        <i className="fa-solid fa-minus text-xs"></i>
                      </button>
                      <span className="w-10 text-center font-bold text-sm font-mono text-stone-800">
                        {modalQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setModalQty(modalQty + 1)}
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-stone-700 hover:bg-stone-200 transition-colors"
                      >
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        addToCart(product, modalQty, true);
                        setShowQuickModal(false);
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#002719] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                    >
                      <i className="fa-solid fa-basket-shopping text-xs"></i>
                      <span>কার্টে যোগ করুন</span>
                    </button>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    onClick={() => setShowQuickModal(false)}
                    className="block text-center text-xs font-bold text-[#002719] hover:text-[#E8AF30] py-1 transition-colors"
                  >
                    সম্পূর্ণ বিবরণ ও কাস্টমার রিভিউ পেজে যান →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
