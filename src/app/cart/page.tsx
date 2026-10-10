"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";

export default function CartPage() {
  const { isBn, t } = useLanguage();
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryZone,
    setDeliveryZone,
    deliveryFee,
    total,
    addToCart,
    totalItems,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Recommendations to cross-sell: grab items not in cart
  const crossSellProducts = products
    .filter((p) => !items.some((item) => item.id === p.id))
    .slice(0, 4);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "GREEN10" || code === "FARM10") {
      setCouponDiscountPercent(10);
      setCouponMessage(t.cartPage.couponApplied);
      setCouponError(null);
    } else {
      setCouponDiscountPercent(0);
      setCouponMessage(null);
      setCouponError(
        isBn
          ? "অবৈধ কুপন কোড! ট্রাই করুন: GREEN10"
          : "Invalid coupon code! Try: GREEN10"
      );
    }
  };

  const discountAmount = Math.round((subtotal * couponDiscountPercent) / 100);
  const finalPayable = Math.max(0, total - discountAmount);

  return (
    <div className="bg-[#FAF9F5] min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="container px-4 max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-stone-500 py-4 mb-4 border-b border-stone-200/80">
          <Link href="/" className="hover:text-[#002719] font-medium transition-colors">
            {t.nav.home}
          </Link>
          <span className="text-stone-300">/</span>
          <Link href="/products" className="hover:text-[#002719] font-medium transition-colors">
            {t.nav.shop}
          </Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900 font-bold">
            {isBn ? "শপিং ব্যাগ ও কার্ট" : "Shopping Cart"}
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
              <i className="fa-solid fa-basket-shopping text-emerald-700"></i>
              {isBn ? "খামার ফ্রেশ কার্ট" : "Farm Fresh Cart"}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-950 tracking-tight">
              {t.cartPage.title}
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-2xl">
              {t.cartPage.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/cart"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002719] hover:bg-emerald-900 text-[#E8AF30] font-bold text-xs transition-all shadow-sm"
            >
              <i className="fa-solid fa-gauge-high"></i>
              <span>{t.cartPage.manageInDashboard}</span>
            </Link>
          </div>
        </div>

        {/* Main Cart Body */}
        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-8 sm:p-14 text-center border border-stone-200/80 shadow-sm max-w-2xl mx-auto my-6">
            <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center text-3xl mb-5 shadow-xs border border-amber-100">
              <i className="fa-solid fa-bag-shopping"></i>
            </div>
            <h2 className="text-2xl font-extrabold text-stone-900 mb-2">
              {t.cart.emptyTitle}
            </h2>
            <p className="text-stone-500 text-sm max-w-md mx-auto mb-8">
              {t.cart.emptySubtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/products"
                className="py-3 px-6 rounded-xl bg-[#002719] hover:bg-[#E8AF30] text-white hover:text-[#002719] font-extrabold text-xs transition-all shadow-md"
              >
                <i className="fa-solid fa-seedling mr-2"></i>
                {t.cart.browseProducts}
              </Link>
              <Link
                href="/dashboard/cart"
                className="py-3 px-6 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-all border border-stone-200"
              >
                <i className="fa-solid fa-boxes-packing mr-2 text-[#E8AF30]"></i>
                {isBn ? "সেভ করা ফ্যামিলি বাস্কেট লোড করুন" : "Load Saved Family Basket"}
              </Link>
            </div>
          </div>
        ) : (
          /* Populated Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-stone-900 text-base">
                      {isBn ? "ব্যাগের পণ্যসমূহ" : "Items in Cart"}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                      {totalItems} {isBn ? "টি" : "items"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1.5 transition-colors"
                  >
                    <i className="fa-regular fa-trash-can"></i>
                    <span>{t.cartPage.clearBag}</span>
                  </button>
                </div>

                {/* Items Stack */}
                <div className="divide-y divide-stone-100">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      {/* Product Media & Info */}
                      <div className="flex items-center gap-3.5 min-w-0">
                        <Link href={`/products/${item.slug}`} className="shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-stone-200 group-hover:scale-102 transition-transform"
                          />
                        </Link>
                        <div className="min-w-0">
                          <Link
                            href={`/products/${item.slug}`}
                            className="font-extrabold text-stone-900 text-sm sm:text-base hover:text-[#002719] line-clamp-1 transition-colors block"
                          >
                            {isBn ? (item.titleBn || item.title) : item.title}
                          </Link>
                          <p className="text-stone-500 text-xs mt-0.5 truncate">
                            {isBn ? item.title : item.titleBn} • {item.unit}
                          </p>
                          <span className="text-xs font-mono font-bold text-[#002719] sm:hidden block mt-1">
                            ৳{item.price}
                          </span>
                        </div>
                      </div>

                      {/* Controls: Stepper, Price, Delete */}
                      <div className="flex items-center justify-between sm:justify-end gap-5">
                        {/* Unit Price (Desktop) */}
                        <div className="hidden sm:block text-right">
                          <span className="text-[10px] text-stone-400 block font-semibold">
                            {isBn ? "একক মূল্য" : "Unit Price"}
                          </span>
                          <span className="text-xs font-mono font-bold text-stone-700">
                            ৳{item.price}
                          </span>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center transition-colors shadow-xs active:scale-95"
                            aria-label="Decrease quantity"
                          >
                            <i className="fa-solid fa-minus text-[10px]"></i>
                          </button>
                          <span className="w-8 text-center font-extrabold font-mono text-stone-900 text-xs">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center transition-colors shadow-xs active:scale-95"
                            aria-label="Increase quantity"
                          >
                            <i className="fa-solid fa-plus text-[10px]"></i>
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right min-w-[70px]">
                          <span className="text-[10px] text-stone-400 block font-semibold sm:block hidden">
                            {isBn ? "মোট" : "Total"}
                          </span>
                          <span className="text-sm sm:text-base font-extrabold font-mono text-[#002719]">
                            ৳{item.price * item.quantity}
                          </span>
                        </div>

                        {/* Delete Action */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors"
                          title={isBn ? "পণ্যটি মুছুন" : "Remove item"}
                        >
                          <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sub-actions toolbar */}
                <div className="pt-5 mt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <Link
                    href="/products"
                    className="font-bold text-stone-600 hover:text-[#002719] flex items-center gap-1.5 transition-colors"
                  >
                    <i className="fa-solid fa-arrow-left text-[10px]"></i>
                    <span>{t.cartPage.continueShopping}</span>
                  </Link>

                  <div className="flex items-center gap-2 text-stone-500 text-[11px]">
                    <i className="fa-solid fa-shield-halved text-emerald-600"></i>
                    <span>{t.cartPage.guarantee}</span>
                  </div>
                </div>
              </div>

              {/* Cross-Sell Recommendations */}
              {crossSellProducts.length > 0 && (
                <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#E8AF30] uppercase tracking-wider block">
                        {isBn ? "এক ক্লিকে যোগ করুন" : "Quick Add to Bag"}
                      </span>
                      <h3 className="text-base font-extrabold text-stone-900">
                        {isBn ? "খামারের জনপ্রিয় আরো খাঁটি পণ্য" : "Popular Farm Produce You May Like"}
                      </h3>
                    </div>
                    <Link
                      href="/products"
                      className="text-xs font-bold text-[#002719] hover:underline"
                    >
                      {isBn ? "সব পণ্য →" : "View all →"}
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {crossSellProducts.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 flex items-center justify-between gap-3 hover:border-emerald-500/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs text-stone-900 truncate">
                              {isBn ? p.titleBn : p.title}
                            </h4>
                            <span className="text-xs font-mono font-bold text-[#002719]">
                              ৳{p.price} <span className="text-[10px] text-stone-400 font-sans">/ {isBn ? p.unitBn : p.unit}</span>
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => addToCart(p, 1, false)}
                          className="shrink-0 px-3 py-1.5 rounded-xl bg-[#002719] hover:bg-[#E8AF30] text-white hover:text-[#002719] font-bold text-xs transition-colors shadow-xs"
                        >
                          + {isBn ? "যোগ করুন" : "Add"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary & Checkout (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-sm space-y-5">
                <h3 className="font-extrabold text-lg text-stone-900 border-b border-stone-100 pb-3">
                  {t.cartPage.orderSummary}
                </h3>

                {/* Delivery Zone Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-700 block">
                    {t.cartPage.deliveryZone}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryZone("inside-dhaka")}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        deliveryZone === "inside-dhaka"
                          ? "border-[#002719] bg-emerald-50 text-[#002719] font-extrabold ring-1 ring-[#002719]"
                          : "border-stone-200 bg-white text-stone-600 hover:border-stone-400"
                      }`}
                    >
                      <i className="fa-solid fa-city mb-1 block text-sm"></i>
                      <span>{t.cart.insideDhaka}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryZone("outside-dhaka")}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        deliveryZone === "outside-dhaka"
                          ? "border-[#002719] bg-emerald-50 text-[#002719] font-extrabold ring-1 ring-[#002719]"
                          : "border-stone-200 bg-white text-stone-600 hover:border-stone-400"
                      }`}
                    >
                      <i className="fa-solid fa-truck-ramp-box mb-1 block text-sm"></i>
                      <span>{t.cart.outsideDhaka}</span>
                    </button>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-1.5 pt-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={t.cartPage.couponPlaceholder}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-[#002719]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[#002719] hover:bg-emerald-900 text-white font-bold text-xs transition-colors shrink-0"
                    >
                      {t.cartPage.apply}
                    </button>
                  </div>
                  {couponMessage && (
                    <span className="text-[11px] font-bold text-emerald-700 block">
                      ✓ {couponMessage}
                    </span>
                  )}
                  {couponError && (
                    <span className="text-[11px] font-bold text-rose-600 block">
                      ✕ {couponError}
                    </span>
                  )}
                </form>

                {/* Financial Breakdown */}
                <div className="space-y-2.5 text-xs text-stone-600 pt-3 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <span>{t.cart.subtotal}:</span>
                    <span className="font-bold text-stone-900 font-mono text-sm">৳{subtotal}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>{t.cart.deliveryFee}:</span>
                    <span className="font-bold text-stone-900 font-mono text-sm">৳{deliveryFee}</span>
                  </div>

                  {couponDiscountPercent > 0 && (
                    <div className="flex items-center justify-between text-emerald-700 font-bold">
                      <span>{t.cartPage.discount} (10%):</span>
                      <span className="font-mono text-sm">-৳{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-base font-extrabold text-stone-950 pt-2.5 border-t border-stone-200">
                    <span>{t.cart.total}:</span>
                    <span className="text-2xl font-extrabold text-[#002719] font-mono">
                      ৳{finalPayable}
                    </span>
                  </div>
                </div>

                {/* Direct Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E8AF30] to-amber-400 hover:from-amber-400 hover:to-yellow-500 text-[#002719] font-extrabold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-md shadow-[#E8AF30]/25 active:scale-95 block text-center"
                >
                  <i className="fa-solid fa-lock text-sm"></i>
                  <span>{t.cartPage.checkout}</span>
                </Link>

                {/* Customer Service Support Note */}
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-center space-y-1 text-xs">
                  <span className="text-stone-500 text-[11px] block">
                    {isBn ? "অর্ডার সম্পন্ন করতে কোনো অসুবিধা?" : "Need assistance with your order?"}
                  </span>
                  <a
                    href="tel:01712345678"
                    className="font-bold text-[#002719] hover:text-[#E8AF30] transition-colors inline-flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-phone text-xs text-[#E8AF30]"></i>
                    <span>০১৭১২-৩৪৫৬৭৮</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
