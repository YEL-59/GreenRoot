"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";
import { initialOrders } from "@/data/orders";
import type { Product } from "@/types";

export default function DashboardCartPage() {
  const { isBn, t } = useLanguage();
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryZone,
    setDeliveryZone,
    deliveryFee,
    total,
    addToCart,
    totalItems,
  } = useCart();

  const [activeTab, setActiveTab] = useState<"active" | "baskets" | "reorder">("active");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Pre-configured Curated Farm Baskets
  const familyBaskets = [
    {
      id: "basket-breakfast",
      title: "Daily Healthy Breakfast Basket",
      titleBn: "সকালের পুষ্টিকর নাস্তা বাস্কেট",
      description: "Raw farm milk, wild Sundarban raw honey & farm deshi eggs",
      descriptionBn: "খাঁটি কাঁচা দুধ, সুন্দরবনের প্রাকৃতিক মধু ও পুষ্টিকর ফার্ম ফ্রেশ ডিমের আদর্শ মেলবন্ধন",
      badge: "জনপ্রিয় চয়েস",
      badgeEn: "Most Popular",
      regularPrice: 1390,
      bundlePrice: 1240,
      savings: 150,
      productIds: ["prod-1", "prod-10"],
      icon: "fa-solid fa-mug-hot",
      accent: "from-amber-500 to-emerald-600",
    },
    {
      id: "basket-pantry",
      title: "Weekly Organic Pure Pantry Basket",
      titleBn: "সাপ্তাহিক খাঁটি প্যান্ট্রি বাস্কেট",
      description: "Cold-pressed wood mill mustard oil, traditional cow ghee & organic spices",
      descriptionBn: "কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল, বিলোনা গাওয়া ঘি ও বাছাইকৃত রান্নার মসলা",
      badge: "ফ্যামিলি সেভার",
      badgeEn: "Family Saver",
      regularPrice: 1680,
      bundlePrice: 1490,
      savings: 190,
      productIds: ["prod-7", "prod-2", "prod-8"],
      icon: "fa-solid fa-kitchen-set",
      accent: "from-emerald-700 to-teal-800",
    },
    {
      id: "basket-ramadan",
      title: "Premium Ramadan & Vitality Basket",
      titleBn: "প্রিমিয়াম এনার্জি ও খেজুর বাস্কেট",
      description: "Authentic Madina Medjool dates, Sundarban raw honey & grass-fed ghee",
      descriptionBn: "মদিনার মেডজুল খেজুর, সুন্দরবনের মধু এবং খাঁটি গাওয়া ঘি দিয়ে পরিপূর্ণ শক্তিবর্ধক ঝুড়ি",
      badge: "প্রিমিয়াম গ্রেড",
      badgeEn: "Premium Grade",
      regularPrice: 2850,
      bundlePrice: 2520,
      savings: 330,
      productIds: ["prod-4", "prod-10", "prod-2"],
      icon: "fa-solid fa-moon",
      accent: "from-yellow-600 to-amber-700",
    },
  ];

  // Load a whole basket into active shopping bag
  const handleLoadBasket = (basket: typeof familyBaskets[0]) => {
    basket.productIds.forEach((pid) => {
      const prod = products.find((p) => p.id === pid);
      if (prod) {
        addToCart(prod, 1, false);
      }
    });
    showToast(
      isBn
        ? `"${basket.titleBn}" এর পণ্যসমূহ ব্যাগে সফলভাবে যুক্ত করা হয়েছে!`
        : `"${basket.title}" items successfully added to active bag!`
    );
    setActiveTab("active");
  };

  // Past order items for quick reorder
  const recentOrderItems = initialOrders[0]?.items || [];

  const handleReorderItem = (item: typeof recentOrderItems[0]) => {
    const prod = products.find((p) => p.id === item.id) || {
      id: item.id,
      slug: item.slug,
      title: item.title,
      titleBn: item.titleBn,
      price: item.price,
      unit: item.unit,
      unitBn: item.unit,
      category: "grocery",
      categoryBn: "মুদি",
      image: item.image,
      stock: 50,
      rating: 4.9,
      reviewCount: 30,
      origin: "Local Farm",
      originBn: "স্থানীয় খামার",
      description: item.title,
      descriptionBn: item.titleBn,
      benefits: ["100% Organic"],
      isFeatured: false,
    };
    addToCart(prod as Product, item.quantity, false);
    showToast(
      isBn
        ? `"${item.titleBn}" ব্যাগে যুক্ত করা হয়েছে!`
        : `"${item.title}" added to active bag!`
    );
  };

  const handleReorderAll = () => {
    recentOrderItems.forEach((item) => {
      handleReorderItem(item);
    });
    showToast(t.dashboardCart.basketAdded);
    setActiveTab("active");
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-[1000] max-w-md bg-[#002719] text-[#E8AF30] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#E8AF30]/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <i className="fa-solid fa-circle-check text-lg text-emerald-400"></i>
          <span className="text-xs font-bold text-white">{toastMessage}</span>
        </div>
      )}

      {/* Header & Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-gradient-to-r from-[#002719] via-[#003824] to-[#002719] p-6 sm:p-8 rounded-3xl text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8AF30]/20 border border-[#E8AF30]/40 text-[#E8AF30] text-xs font-bold uppercase tracking-wider mb-2">
            <i className="fa-solid fa-cart-shopping"></i>
            {isBn ? "গ্রাহক কার্ট পোর্টাল" : "Customer Cart Portal"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.dashboardCart.title}
          </h1>
          <p className="text-emerald-200/80 text-xs sm:text-sm mt-1 max-w-xl">
            {t.dashboardCart.subtitle}
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
            <span className="text-[10px] text-emerald-300 block">{isBn ? "সক্রিয় আইটেম" : "Active Items"}</span>
            <span className="text-lg font-extrabold text-white font-mono">{totalItems}</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
            <span className="text-[10px] text-emerald-300 block">{isBn ? "বর্তমান মূল্য" : "Cart Subtotal"}</span>
            <span className="text-lg font-extrabold text-[#E8AF30] font-mono">৳{subtotal}</span>
          </div>
          <Link
            href="/cart"
            className="px-4 py-2.5 rounded-2xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-extrabold text-xs transition-colors shadow-md inline-flex items-center gap-1.5"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <span>{isBn ? "ফুল কার্ট পেজ" : "Full Cart Page"}</span>
          </Link>
        </div>
      </div>

      {/* Real-time synchronization notice */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-3 text-xs text-emerald-900 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </span>
          <span className="font-bold">
            {t.dashboardCart.syncNotice}
          </span>
        </div>
        <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full hidden sm:inline">
          LIVE SYNC
        </span>
      </div>

      {/* Tabs Header */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "active"
              ? "bg-[#002719] text-white shadow-sm"
              : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200"
          }`}
        >
          <i className="fa-solid fa-bag-shopping text-xs"></i>
          <span>{t.dashboardCart.activeCartTab}</span>
          <span className={`px-2 py-0.2 rounded-full text-[10px] font-mono font-bold ${
            activeTab === "active" ? "bg-[#E8AF30] text-[#002719]" : "bg-stone-100 text-stone-700"
          }`}>
            {totalItems}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("baskets")}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "baskets"
              ? "bg-[#002719] text-white shadow-sm"
              : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200"
          }`}
        >
          <i className="fa-solid fa-boxes-packing text-xs text-[#E8AF30]"></i>
          <span>{t.dashboardCart.savedBasketsTab}</span>
          <span className="px-2 py-0.2 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
            ৩টি
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reorder")}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "reorder"
              ? "bg-[#002719] text-white shadow-sm"
              : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200"
          }`}
        >
          <i className="fa-solid fa-clock-rotate-left text-xs text-emerald-600"></i>
          <span>{t.dashboardCart.quickReorderTab}</span>
          <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold">
            {recentOrderItems.length}টি
          </span>
        </button>
      </div>

      {/* Tab 1: Active Shopping Bag */}
      {activeTab === "active" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {items.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-stone-200 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center text-2xl mb-4">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <h3 className="text-xl font-extrabold text-stone-900 mb-1">
                {t.dashboardCart.cartEmpty}
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto mb-6">
                {t.dashboardCart.cartEmptyDesc}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("baskets")}
                  className="py-2.5 px-5 rounded-xl bg-[#002719] hover:bg-[#E8AF30] text-white hover:text-[#002719] font-bold text-xs transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <i className="fa-solid fa-boxes-packing text-[#E8AF30]"></i>
                  <span>{isBn ? "সেভ করা বাস্কেট থেকে লোড করুন" : "Browse Saved Baskets"}</span>
                </button>
                <Link
                  href="/products"
                  className="py-2.5 px-5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors border border-stone-200"
                >
                  {isBn ? "ফার্ম শপে যান" : "Browse Farm Catalog"}
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Items List (8 Cols) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <span className="font-bold text-xs text-stone-500 uppercase tracking-wider">
                    {isBn ? "আইটেম বিবরণ" : "Item Details"}
                  </span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <i className="fa-regular fa-trash-can"></i>
                    <span>{t.cartPage.clearBag}</span>
                  </button>
                </div>

                <div className="divide-y divide-stone-100">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 rounded-2xl object-cover border border-stone-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <Link
                            href={`/products/${item.slug}`}
                            className="font-bold text-stone-900 text-sm hover:text-[#002719] line-clamp-1 block"
                          >
                            {isBn ? (item.titleBn || item.title) : item.title}
                          </Link>
                          <span className="text-stone-400 text-xs">
                            ৳{item.price} • {item.unit}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5">
                        {/* Stepper */}
                        <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-white hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="w-7 text-center font-extrabold font-mono text-stone-900 text-xs">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-white hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-extrabold font-mono text-stone-900 text-sm min-w-[60px] text-right">
                          ৳{item.price * item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors"
                        >
                          <i className="fa-solid fa-xmark text-xs"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Calculations Box (4 Cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-100">
                  {t.cartPage.orderSummary}
                </h3>

                {/* Delivery Zone Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 block">
                    {t.cartPage.deliveryZone}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryZone("inside-dhaka")}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        deliveryZone === "inside-dhaka"
                          ? "border-[#002719] bg-emerald-50 text-[#002719] font-extrabold"
                          : "border-stone-200 bg-white text-stone-600"
                      }`}
                    >
                      {t.cart.insideDhaka}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryZone("outside-dhaka")}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        deliveryZone === "outside-dhaka"
                          ? "border-[#002719] bg-emerald-50 text-[#002719] font-extrabold"
                          : "border-stone-200 bg-white text-stone-600"
                      }`}
                    >
                      {t.cart.outsideDhaka}
                    </button>
                  </div>
                </div>

                {/* Numbers breakdown */}
                <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                  <div className="flex justify-between">
                    <span>{t.cart.subtotal}:</span>
                    <span className="font-bold text-stone-900 font-mono">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.cart.deliveryFee}:</span>
                    <span className="font-bold text-stone-900 font-mono">৳{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                    <span>{t.cart.total}:</span>
                    <span className="text-[#002719] font-mono">৳{total}</span>
                  </div>
                </div>

                {/* Reward Preview */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center gap-2">
                  <i className="fa-solid fa-coins text-[#E8AF30]"></i>
                  <span>
                    {isBn
                      ? `এই অর্ডারে আপনি পাচ্ছেন ${Math.round(total / 25)} গ্রীনকয়েন ক্যাশব্যাক!`
                      : `Earn ${Math.round(total / 25)} GreenCoins reward with this order!`}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <Link
                    href="/checkout"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#002719] hover:bg-emerald-900 text-white font-extrabold text-xs text-center block transition-all shadow-md tracking-wide"
                  >
                    {t.cartPage.checkout}
                  </Link>

                  <Link
                    href="/cart"
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs text-center block transition-colors border border-stone-200"
                  >
                    {isBn ? "পূর্ণাঙ্গ শপিং কার্ট পেজ দেখুন" : "View Full Cart Page"}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Family Baskets */}
      {activeTab === "baskets" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
            <h3 className="font-extrabold text-lg text-stone-900 mb-1">
              {isBn ? "প্রস্তুতকৃত স্বাস্থ্যকর ফ্যামিলি বাস্কেট" : "Pre-Configured Healthy Family Baskets"}
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm">
              {isBn
                ? "আমাদের পুষ্টিবিদদের দ্বারা তৈরি কম্বো বান্ডেল। এক ক্লিকে সম্পূর্ণ ঝুড়িটি আপনার সক্রিয় ব্যাগে লোড করুন এবং নিয়মিত সাশ্রয় উপভোগ করুন।"
                : "Curated organic bundles for regular family nutrition. Load entire baskets to your cart with a single click."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {familyBaskets.map((basket) => (
              <div
                key={basket.id}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  {/* Card Top Banner */}
                  <div className={`p-5 bg-gradient-to-r ${basket.accent} text-white relative`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg text-white">
                        <i className={basket.icon}></i>
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#E8AF30] text-[#002719] text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                        {isBn ? basket.badge : basket.badgeEn}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-base sm:text-lg leading-tight text-white mb-1">
                      {isBn ? basket.titleBn : basket.title}
                    </h4>
                    <p className="text-white/80 text-xs line-clamp-2">
                      {isBn ? basket.descriptionBn : basket.description}
                    </p>
                  </div>

                  {/* Included Items Preview */}
                  <div className="p-5 space-y-3">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                      {isBn ? "ঝুড়ির অন্তর্ভুক্ত পণ্যসমূহ:" : "Included Farm Items:"}
                    </span>
                    <div className="space-y-2">
                      {basket.productIds.map((pid) => {
                        const prod = products.find((p) => p.id === pid);
                        if (!prod) return null;
                        return (
                          <div key={pid} className="flex items-center gap-2.5 text-xs text-stone-700">
                            <img
                              src={prod.image}
                              alt={prod.title}
                              className="w-8 h-8 rounded-lg object-cover border border-stone-200 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <span className="font-bold truncate block">
                                {isBn ? prod.titleBn : prod.title}
                              </span>
                              <span className="text-[10px] text-stone-400">
                                ৳{prod.price} / {isBn ? prod.unitBn : prod.unit}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-5 bg-stone-50 border-t border-stone-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block font-semibold">
                        {isBn ? "কম্বো বান্ডেল মূল্য" : "Bundle Price"}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-[#002719] font-mono">
                          ৳{basket.bundlePrice}
                        </span>
                        <span className="text-xs text-stone-400 line-through font-mono">
                          ৳{basket.regularPrice}
                        </span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ৳{basket.savings} {isBn ? "সাশ্রয়" : "Saved"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLoadBasket(basket)}
                    className="w-full py-3 px-4 rounded-xl bg-[#002719] hover:bg-[#E8AF30] text-white hover:text-[#002719] font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
                  >
                    <i className="fa-solid fa-basket-shopping text-xs"></i>
                    <span>{t.dashboardCart.loadBasket}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Quick Reorder from Past Orders */}
      {activeTab === "reorder" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-lg text-stone-900 mb-1">
                {isBn ? "অর্ডার #GR-2026-8841 থেকে দ্রুত রি-কার্ট" : "Quick Reorder from Order #GR-2026-8841"}
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm">
                {isBn
                  ? "আপনার গত সফল ডেলিভারির পছন্দের খাঁটি পণ্যসমূহ সরাসরি বর্তমান ব্যাগে যুক্ত করুন।"
                  : "One-click reorder your favorite farm goods from past delivered orders."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleReorderAll}
              className="py-2.5 px-5 rounded-xl bg-[#002719] hover:bg-[#E8AF30] text-white hover:text-[#002719] font-extrabold text-xs transition-colors shadow-sm shrink-0 flex items-center gap-2"
            >
              <i className="fa-solid fa-rotate text-xs"></i>
              <span>{t.dashboardCart.reorderAll}</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-sm">
            <div className="divide-y divide-stone-100">
              {recentOrderItems.map((item) => (
                <div
                  key={item.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-2xl object-cover border border-stone-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-stone-900 text-sm truncate">
                        {isBn ? item.titleBn : item.title}
                      </h4>
                      <p className="text-stone-400 text-xs">
                        ৳{item.price} • {item.unit}
                      </p>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
                        {isBn ? "অতীতে ১ বার অর্ডার করা হয়েছে" : "Previously Ordered"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      ৳{item.price * item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleReorderItem(item)}
                      className="py-2 px-4 rounded-xl bg-emerald-100 hover:bg-[#002719] text-emerald-900 hover:text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-plus text-[10px]"></i>
                      <span>{isBn ? "ব্যাগে নিন" : "Add to Bag"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
