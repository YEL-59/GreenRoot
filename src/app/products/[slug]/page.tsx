"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const slug = resolvedParams?.slug;

  const product = products.find((p) => p.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"benefits" | "origin" | "reviews">("benefits");
  const { addToCart } = useCart();

  if (!product) {
    return notFound();
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Related products from same category or featured
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen pt-32 pb-20">
      <div className="container px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-stone-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#002f1f]">হোম</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#002f1f]">ফার্ম শপ</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-[#002f1f]">
            {product.categoryBn}
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-semibold">{product.titleBn}</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Product Image */}
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 aspect-square">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.badge && (
                  <span className="px-3.5 py-1.5 rounded-full bg-[#002f1f] text-white text-xs font-bold shadow-md">
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-md self-start">
                    {discount}% ছাড়
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 left-4 z-10">
                <span className="px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2">
                  <i className="fa-solid fa-location-dot text-[#E8AF30]"></i>
                  {product.originBn}
                </span>
              </div>
            </div>

            {/* Right: Product Info & Buy Box */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                    {product.categoryBn}
                  </span>
                  <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold">
                    <i className="fa-solid fa-star"></i>
                    <span className="text-stone-800 text-sm">{product.rating}</span>
                    <span className="text-stone-400 font-normal">({product.reviewCount} কাস্টমার রিভিউ)</span>
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 leading-snug mb-1">
                  {product.titleBn}
                </h1>
                <p className="text-stone-500 text-sm mb-4 font-medium">{product.title}</p>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-[#002f1f]/5 border border-[#002f1f]/10 mb-6 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-stone-500 block mb-0.5">মূল্য (Price):</span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-extrabold text-[#002f1f]">
                        ৳{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-base text-stone-400 line-through">
                          ৳{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-500 block">পরিমাণ (Unit):</span>
                    <span className="text-sm font-bold text-stone-800 bg-white px-3 py-1 rounded-lg border border-stone-200 inline-block mt-0.5">
                      {product.unitBn}
                    </span>
                  </div>
                </div>

                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  {product.descriptionBn}
                </p>

                {/* Key Points */}
                <div className="space-y-2 mb-8 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                  <span className="text-xs font-bold text-stone-700 block mb-1">
                    খামারের বিশেষ নিশ্চয়তা:
                  </span>
                  {product.benefits.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                      <i className="fa-solid fa-circle-check text-emerald-600 text-xs"></i>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Buttons */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-stone-700">অর্ডার সংখ্যা:</span>
                  <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-stone-700 hover:bg-stone-200 text-sm font-bold shadow-sm transition-colors"
                      aria-label="Decrease"
                    >
                      <i className="fa-solid fa-minus text-xs"></i>
                    </button>
                    <span className="w-12 text-center font-bold text-stone-900 text-base">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-stone-700 hover:bg-stone-200 text-sm font-bold shadow-sm transition-colors"
                      aria-label="Increase"
                    >
                      <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                  </div>
                  <span className="text-xs text-stone-500">
                    মোট: <span className="font-bold text-[#002f1f] text-sm">৳{product.price * quantity}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => addToCart(product, quantity)}
                    className="py-3.5 px-6 rounded-2xl bg-[#002f1f] hover:bg-emerald-900 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95"
                  >
                    <i className="fa-solid fa-basket-shopping"></i>
                    <span>ব্যাগে যোগ করুন</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-3.5 px-6 rounded-2xl bg-[#E8AF30] hover:bg-[#d49d24] text-[#181818] font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95"
                  >
                    <i className="fa-solid fa-bolt"></i>
                    <span>সরাসরি অর্ডার করুন</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Benefits, Sourcing, Reviews */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200 mb-16">
          <div className="flex items-center gap-4 border-b border-stone-200 pb-4 mb-6">
            <button
              onClick={() => setActiveTab("benefits")}
              className={`pb-2 text-sm font-bold transition-all relative ${
                activeTab === "benefits"
                  ? "text-[#002f1f] border-b-2 border-[#E8AF30]"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              পুষ্টি ও স্বাস্থ্য উপকারিতা
            </button>
            <button
              onClick={() => setActiveTab("origin")}
              className={`pb-2 text-sm font-bold transition-all relative ${
                activeTab === "origin"
                  ? "text-[#002f1f] border-b-2 border-[#E8AF30]"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              খামারের উৎস ও সংগ্রহের গল্প
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-2 text-sm font-bold transition-all relative ${
                activeTab === "reviews"
                  ? "text-[#002f1f] border-b-2 border-[#E8AF30]"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              কাস্টমার রিভিউ ({product.reviewCount})
            </button>
          </div>

          {activeTab === "benefits" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-stone-900 mb-2">
                কেন {product.titleBn} আপনার ডায়েটের জন্য সেরা?
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                {product.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                      ✓
                    </span>
                    <span className="text-xs text-stone-700 leading-snug">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "origin" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-stone-900 mb-2">
                উৎপাদন ও সংগ্রহের ঠিকানা: {product.originBn} ({product.origin})
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                গ্রীনরুট সর্বদা বিশ্বস্ত ও সনাতন কৃষি পদ্ধতিতে বিশ্বাসী। আমাদের বিশেষজ্ঞরা সরেজমিনে উৎপাদন প্রক্রিয়া পর্যবেক্ষণ করেন এবং রাসায়নিক ও কৃত্রিম খাদ্য মুক্ততা নিশ্চিত করে সরাসরি নিজস্ব কোল্ড-চেইন সাপ্লাইয়ে ভোক্তার ঘরে পৌঁছে দেন।
              </p>
              <div className="p-4 rounded-xl bg-[#002f1f]/5 border border-emerald-900/10 text-xs text-emerald-950 flex items-center gap-3">
                <i className="fa-solid fa-award text-2xl text-[#E8AF30]"></i>
                <div>
                  <h5 className="font-bold">গ্রীনরুট কোয়ালিটি ল্যাব সিল</h5>
                  <p className="text-stone-600">প্রতিটি ব্যাচ পরীক্ষিত এবং প্রিজারভেটিভ শূন্যতায় সার্টিফাইড।</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/50">
                <div className="text-3xl font-extrabold text-[#002f1f]">{product.rating}</div>
                <div>
                  <div className="flex text-amber-500 text-xs mb-1">
                    ★★★★★
                  </div>
                  <p className="text-xs text-stone-600 font-medium">
                    {product.reviewCount} জন সন্তুষ্ট গ্রাহকের গড় রেটিং
                  </p>
                </div>
              </div>

              {/* Sample verified reviews */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-stone-900 text-xs">তানভীর আহমেদ (ধানমন্ডি, ঢাকা)</span>
                    <span className="text-[11px] text-stone-400">৩ দিন আগে</span>
                  </div>
                  <div className="text-amber-500 text-xs mb-1">★★★★★</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    পণ্যটি হাতে পাওয়ার পর স্বাদ ও ঘ্রাণে মুগ্ধ হয়েছি। সম্পূর্ণ আসল খামারের অনুভূতি পাওয়া যায়। প্যাকেজিং ও ডেলিভারি দারুণ ছিল।
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-stone-900 text-xs">নাসরিন সুলতানা (উত্তরা, ঢাকা)</span>
                    <span className="text-[11px] text-stone-400">১ সপ্তাহ আগে</span>
                  </div>
                  <div className="text-amber-500 text-xs mb-1">★★★★★</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    বাচ্চাদের জন্য নিয়মিত নিচ্ছি। কোনো প্রকার ভেজাল নেই, বাজারের সাধারণ পণ্যের সাথে কোনো তুলনাই চলে না। ধন্যবাদ গ্রীনরুট!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-stone-900">
                সম্পর্কিত অন্যান্য খাঁটি পণ্য
              </h2>
              <Link
                href="/products"
                className="text-xs font-bold text-[#002f1f] hover:text-[#E8AF30]"
              >
                সব দেখুন →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 p-4 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <Link href={`/products/${p.slug}`}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full aspect-[4/3] object-cover rounded-2xl mb-3"
                    />
                    <h4 className="font-bold text-stone-900 text-sm leading-snug line-clamp-1">
                      {p.titleBn}
                    </h4>
                    <p className="text-xs text-stone-500 mb-2 truncate">{p.title}</p>
                  </Link>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-2">
                    <span className="text-base font-extrabold text-[#002f1f]">৳{p.price}</span>
                    <button
                      type="button"
                      onClick={() => addToCart(p, 1)}
                      className="px-3 py-1.5 rounded-xl bg-[#002f1f] hover:bg-[#E8AF30] text-white hover:text-black font-bold text-xs transition-colors"
                    >
                      + ব্যাগে নিন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
