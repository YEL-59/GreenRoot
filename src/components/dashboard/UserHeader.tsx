"use client";

import { useState } from "react";
import Link from "next/link";
import { initialNotifications, initialUserProfile } from "@/data/userProfile";
import { useCart } from "@/context/CartContext";

export type UserHeaderProps = {
  onToggleSidebar: () => void;
  title?: string;
  subtitle?: string;
};

export const UserHeader = ({
  onToggleSidebar,
  title = "গ্রাহক ড্যাশবোর্ড (Customer Portal)",
  subtitle = "আপনার সকল খামার অর্ডার, ডেলিভারি ট্র্যাকিং ও সাবস্ক্রিপশন পরিচালনা করুন",
}: UserHeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { totalItems, openCart } = useCart();
  const unreadCount = initialNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 md:px-8 py-3.5 flex items-center justify-between transition-all shadow-sm">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#002719] flex items-center justify-center transition-colors"
          aria-label="Toggle menu"
        >
          <i className="fa-solid fa-bars-staggered text-base"></i>
        </button>

        <div>
          <h1 className="text-base md:text-xl font-black text-stone-900 tracking-tight flex items-center gap-2">
            <span>{title}</span>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Verified Farm Member
            </span>
          </h1>
          <p className="hidden sm:block text-xs text-stone-500 font-medium">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Farm Shop Shortcut */}
        <Link
          href="/products"
          className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FAF9F5] border border-stone-200 hover:border-[#E8AF30] text-xs font-bold text-[#002719] transition-all hover:shadow-sm"
        >
          <i className="fa-solid fa-store text-[#E8AF30]"></i>
          <span>শপে কেনাকাটা করুন</span>
        </Link>

        {/* Global Cart button */}
        <button
          onClick={openCart}
          className="relative w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-all"
          title="Shopping Cart"
        >
          <i className="fa-solid fa-basket-shopping text-sm text-[#002719]"></i>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E8AF30] text-[#002719] text-[10px] font-black flex items-center justify-center border-2 border-white shadow-sm">
              {totalItems}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-all"
            title="Notifications"
          >
            <i className="fa-solid fa-bell text-sm text-stone-800"></i>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-50 animate-fadeIn">
              <div className="p-4 bg-[#002719] text-white flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">নোটিফিকেশন (Alerts)</h4>
                  <p className="text-[11px] text-stone-300">অর্ডার ও খামারের নতুন আপডেট</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8AF30] text-[#002719]">
                  {unreadCount} নতুন
                </span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                {initialNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3.5 hover:bg-stone-50 transition-colors flex gap-3 ${
                      !notif.read ? "bg-emerald-50/50" : ""
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm ${
                        notif.type === "order"
                          ? "bg-blue-100 text-blue-700"
                          : notif.type === "harvest"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      <i
                        className={
                          notif.type === "order"
                            ? "fa-solid fa-truck-fast"
                            : notif.type === "harvest"
                            ? "fa-solid fa-wheat-awn"
                            : "fa-solid fa-gift"
                        }
                      ></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-xs font-bold text-stone-900">{notif.titleBn}</h5>
                        <span className="text-[10px] text-stone-400">{notif.time}</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-snug">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-stone-50 border-t border-stone-100 text-center">
                <Link
                  href="/dashboard/orders"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-bold text-[#002719] hover:text-[#E8AF30] transition-colors"
                >
                  সব অর্ডার দেখুন →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Mini */}
        <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
          <img
            src={initialUserProfile.avatar}
            alt={initialUserProfile.name}
            className="w-9 h-9 rounded-full object-cover border border-[#E8AF30]"
          />
          <div className="hidden xl:block text-left">
            <span className="block text-xs font-bold text-stone-900 leading-tight">
              {initialUserProfile.name}
            </span>
            <span className="block text-[10px] text-stone-400">
              {initialUserProfile.phone}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
