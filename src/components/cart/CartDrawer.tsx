"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    totalItems,
    subtotal,
    deliveryZone,
    setDeliveryZone,
    deliveryFee,
    total,
  } = useCart();

  // Close drawer on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[999] h-full w-full max-w-[440px] bg-[#002517] text-white shadow-2xl transition-transform duration-300 ease-out flex flex-col justify-between ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping Cart Drawer"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-emerald-900/60 flex items-center justify-between bg-[#001f13]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8AF30]/15 flex items-center justify-center text-[#E8AF30]">
              <i className="fa-solid fa-basket-shopping text-base"></i>
            </div>
            <div>
              <h3 className="text-white font-bold text-base leading-tight">
                Farm Cart ({totalItems})
              </h3>
              <p className="text-emerald-300/70 text-xs">আপনার নির্বাচিত পণ্যসমূহ</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full bg-emerald-950/80 hover:bg-[#E8AF30] text-emerald-200 hover:text-black flex items-center justify-center transition-all duration-200 border border-emerald-800/60 focus:outline-none"
            aria-label="Close cart"
          >
            <i className="fa-solid fa-xmark text-base"></i>
          </button>
        </div>

        {/* Free Delivery / Info Pill */}
        <div className="bg-[#E8AF30]/10 border-y border-[#E8AF30]/20 px-5 py-2.5 flex items-center justify-between text-xs">
          <span className="text-[#E8AF30] font-semibold flex items-center gap-2">
            <i className="fa-solid fa-truck-fast"></i>
            ফার্ম থেকে সরাসরি ফ্রেশ হোম ডেলিভারি
          </span>
          <span className="text-emerald-200/80">১০০% অর্গানিক</span>
        </div>

        {/* Items List Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400/50 mb-4 text-3xl">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <h4 className="text-white font-bold text-lg mb-1">
                আপনার ব্যাগ এখন খালি
              </h4>
              <p className="text-emerald-200/70 text-xs max-w-xs mb-6">
                খাঁটি গরুর দুধ, গাওয়া ঘি, প্রিমিয়াম খেজুর, মধু ও দেশি তাজা মাছ দিয়ে আপনার স্বাস্থ্যকর বাজার সাজান।
              </p>
              <Link
                href="/products"
                onClick={closeCart}
                className="btn-default py-2.5 px-6 text-sm"
              >
                পণ্য দেখতে ক্লিক করুন
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 p-3.5 bg-black/30 border border-emerald-900/40 rounded-2xl transition-colors hover:border-emerald-700/50"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm font-semibold truncate leading-snug">
                    {item.titleBn}
                  </h4>
                  <p className="text-emerald-300/70 text-xs truncate mb-1">
                    {item.title} • {item.unit}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#E8AF30] font-bold text-sm">
                      ৳{item.price * item.quantity}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/15">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/20 text-white text-xs transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <i className="fa-solid fa-minus text-[10px]"></i>
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/20 text-white text-xs transition-colors"
                        aria-label="Increase quantity"
                      >
                        <i className="fa-solid fa-plus text-[10px]"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400/60 hover:text-red-400 p-1.5 transition-colors self-start"
                  aria-label="Remove item"
                  title="Remove from cart"
                >
                  <i className="fa-solid fa-trash-can text-xs"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout Section */}
        {items.length > 0 && (
          <div className="p-5 border-t border-emerald-900/60 bg-[#001c11] space-y-3.5">
            {/* Delivery Location Selector */}
            <div className="space-y-1.5">
              <span className="text-emerald-200/80 text-xs font-medium block">
                ডেলিভারি এরিয়া নির্বাচন করুন:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setDeliveryZone("inside-dhaka")}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    deliveryZone === "inside-dhaka"
                      ? "border-[#E8AF30] bg-[#E8AF30]/15 text-[#E8AF30] font-bold"
                      : "border-white/10 bg-black/20 text-emerald-100/70 hover:border-white/20"
                  }`}
                >
                  ঢাকা সিটি (৳৬০)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryZone("outside-dhaka")}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    deliveryZone === "outside-dhaka"
                      ? "border-[#E8AF30] bg-[#E8AF30]/15 text-[#E8AF30] font-bold"
                      : "border-white/10 bg-black/20 text-emerald-100/70 hover:border-white/20"
                  }`}
                >
                  ঢাকার বাইরে (৳১২০)
                </button>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-emerald-100/80 pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span>পণ্য সাবটোটাল:</span>
                <span className="font-semibold text-white">৳{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>হোম ডেলিভারি চার্জ:</span>
                <span className="font-semibold text-white">৳{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-1.5 border-t border-white/10">
                <span>সর্বমোট প্রদেয় বিল:</span>
                <span className="text-[#E8AF30] text-lg">৳{total}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full block py-3.5 px-4 rounded-xl bg-[#E8AF30] hover:bg-[#d9a024] text-[#181818] font-bold text-center text-sm transition-all shadow-lg hover:shadow-[#E8AF30]/20 tracking-wide"
              >
                অর্ডার সম্পন্ন করুন (Proceed to Checkout)
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="w-full py-2 text-xs text-emerald-300/80 hover:text-white transition-colors"
              >
                আরো পণ্য যোগ করুন (Continue Shopping)
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
