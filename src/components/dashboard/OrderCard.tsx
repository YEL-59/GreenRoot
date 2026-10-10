"use client";

import { useState } from "react";
import Link from "next/link";
import type { Order } from "@/types";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export type OrderCardProps = {
  order: Order;
};

export const OrderCard = ({ order }: OrderCardProps) => {
  const { isBn } = useLanguage();
  const [reordered, setReordered] = useState(false);
  const { addToCart, openCart } = useCart();

  const handleReorder = () => {
    order.items.forEach((item) => {
      addToCart(
        {
          id: item.id,
          slug: item.slug,
          title: item.title,
          titleBn: item.titleBn,
          price: item.price,
          unit: item.unit,
          unitBn: item.unit,
          image: item.image,
          category: "reorder",
          categoryBn: "পুনরায় অর্ডার",
          rating: 5,
          reviewCount: 1,
          stock: 100,
          origin: "GreenRoot",
          originBn: "গ্রীনরুট খামার",
          description: "",
          descriptionBn: "",
          benefits: [],
        },
        item.quantity
      );
    });
    setReordered(true);
    openCart();
    setTimeout(() => setReordered(false), 3000);
  };

  const statusColors = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    confirmed: "bg-blue-100 text-blue-800 border-blue-200",
    processing: "bg-purple-100 text-purple-800 border-purple-200",
    shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
    out_for_delivery: "bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse font-bold",
    delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  const statusEnglishLabels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    processing: "Packaging",
    shipped: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-all">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-stone-400">
              {isBn ? "অর্ডার আইডি:" : "Order ID:"}
            </span>
            <span className="font-extrabold text-sm text-[#002719] bg-stone-100 px-2 py-0.5 rounded">
              {order.id}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
            <i className="fa-regular fa-calendar-check text-[11px]"></i>
            {isBn ? order.dateBn : order.date}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs border font-bold flex items-center gap-1.5 ${
              statusColors[order.status] || "bg-stone-100 text-stone-700"
            }`}
          >
            {order.status === "out_for_delivery" && (
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
            )}
            {isBn ? order.statusBn : (statusEnglishLabels[order.status] || order.status)}
          </span>

          <span className="text-base md:text-lg font-extrabold text-stone-900 font-mono">
            ৳{order.total}
          </span>
        </div>
      </div>

      {/* Items Preview List */}
      <div className="py-4 space-y-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={isBn ? item.titleBn : item.title}
                className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
              />
              <div>
                <h5 className="text-xs md:text-sm font-bold text-stone-900 line-clamp-1">
                  {isBn ? item.titleBn : item.title}
                </h5>
                <p className="text-[11px] text-stone-500">
                  {item.unit} × {item.quantity} {isBn ? "পিস" : "pcs"}
                </p>
              </div>
            </div>

            <div className="text-xs font-bold text-stone-800 shrink-0 font-mono">
              ৳{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-stone-500">
          {isBn ? "পরিশোধ: " : "Payment: "}
          <span className="font-bold text-stone-800 uppercase">
            {order.paymentMethod === "cod"
              ? (isBn ? "ক্যাশ অন ডেলিভারি" : "Cash on Delivery (COD)")
              : order.paymentMethod.toUpperCase()}
          </span>{" "}
          (
          {order.paymentStatus === "paid"
            ? (isBn ? "পরিশোধিত ✓" : "Paid ✓")
            : (isBn ? "বকেয়া" : "Pending")}
          )
        </div>

        <div className="flex items-center gap-2">
          {order.tracking && (
            <Link
              href={`/dashboard/track/${order.id}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#002719] hover:bg-[#003824] text-white text-xs font-bold shadow-sm transition-all"
            >
              <i className="fa-solid fa-map-location-dot text-[#E8AF30]"></i>
              <span>{isBn ? "লাইভ ম্যাপে ট্র্যাক করুন" : "Live Map Track"}</span>
            </Link>
          )}

          <button
            onClick={handleReorder}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-[#E8AF30] hover:text-[#002719] text-stone-700 text-xs font-bold transition-all"
          >
            <i className="fa-solid fa-rotate-right text-xs"></i>
            <span>
              {reordered
                ? (isBn ? "ব্যাগে যোগ হয়েছে ✓" : "Added to Cart ✓")
                : (isBn ? "আবার কিনুন" : "Buy Again")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

