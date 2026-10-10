"use client";
import { use } from "react";

import Link from "next/link";
import { notFound } from "next/navigation";
import { initialOrders } from "@/data/orders";
import { LiveTrackingMap, TrackingTimeline } from "@/components/dashboard";
import { useLanguage } from "@/context/LanguageContext";

export default function OrderLiveTrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;
  const { isBn } = useLanguage();

  const order = initialOrders.find((o) => o.id === id) || initialOrders[0];

  if (!order) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <nav className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/dashboard" className="hover:text-[#002719]">
            {isBn ? "ড্যাশবোর্ড" : "Dashboard"}
          </Link>
          <span>/</span>
          <Link href="/dashboard/orders" className="hover:text-[#002719]">
            {isBn ? "অর্ডারসমূহ" : "Orders"}
          </Link>
          <span>/</span>
          <span className="font-bold text-stone-900 font-mono">
            {order.id} {isBn ? "ট্র্যাকিং" : "Tracking"}
          </span>
        </nav>

        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#002719]"
        >
          <i className="fa-solid fa-arrow-left text-xs"></i>
          <span>{isBn ? "সকল অর্ডারে ফিরে যান" : "Back to All Orders"}</span>
        </Link>
      </div>

      {/* Main Interactive Live Map */}
      <LiveTrackingMap order={order} />

      {/* Step by Step Timeline */}
      {order.tracking && <TrackingTimeline tracking={order.tracking} />}

      {/* Ordered Products in this delivery */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
        <h3 className="text-base font-extrabold text-stone-900 mb-4">
          {isBn
            ? `এই ডেলিভারির পণ্য তালিকা (${order.items.length} টি)`
            : `Products in this Delivery (${order.items.length})`}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80"
            >
              <img
                src={item.image}
                alt={isBn ? item.titleBn : (item.title || item.titleBn)}
                className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
              />
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-stone-900 truncate">
                  {isBn ? item.titleBn : (item.title || item.titleBn)}
                </h4>
                <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                  {item.unit} × {item.quantity}
                </p>
                <div className="text-xs font-extrabold text-emerald-800 mt-1">
                  ৳{item.price * item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
