"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { initialUserProfile } from "@/data/userProfile";

const menuItems = [
  { href: "/dashboard", label: "ড্যাশবোর্ড ওভারভিউ", labelEn: "Overview", icon: "fa-solid fa-house" },
  { href: "/dashboard/orders", label: "আমার সকল অর্ডার", labelEn: "My Orders", icon: "fa-solid fa-box-open" },
  { href: "/dashboard/track/GR-2026-8841", label: "লাইভ ডেলিভারি ট্র্যাকিং", labelEn: "Live Track Map", icon: "fa-solid fa-map-location-dot", badge: "Live" },
  { href: "/dashboard/subscriptions", label: "ফার্ম সাবস্ক্রিপশন", labelEn: "Subscriptions", icon: "fa-solid fa-repeat" },
  { href: "/dashboard/addresses", label: "সংরক্ষিত ঠিকানা", labelEn: "Saved Addresses", icon: "fa-solid fa-location-dot" },
  { href: "/dashboard/rewards", label: "গ্রীনকয়েন ও ওয়ালেট", labelEn: "Rewards & Wallet", icon: "fa-solid fa-coins" },
];

export const UserSidebar: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({
  isOpen = false,
  onClose,
}) => {
  const pathname = usePathname();
  const user = initialUserProfile;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#002719] text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-2xl lg:shadow-none`}
      >
        {/* Brand / Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#E8AF30] flex items-center justify-center text-[#002719] font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-seedling"></i>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white block">GreenRoot</span>
              <span className="text-[10px] text-[#E8AF30] font-semibold uppercase tracking-wider block">Customer Portal</span>
            </div>
          </Link>

          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
          )}
        </div>

        {/* User Card */}
        <div className="p-6 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#E8AF30]"
            />
            <div className="overflow-hidden">
              <h4 className="font-bold text-sm text-white truncate">{user.nameBn}</h4>
              <p className="text-xs text-stone-400 truncate">{user.email}</p>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-1 rounded text-[10px] font-bold bg-[#E8AF30]/20 text-[#E8AF30] border border-[#E8AF30]/30">
                <i className="fa-solid fa-award text-[9px]"></i>
                {user.memberTier}
              </span>
            </div>
          </div>

          {/* Quick Wallet Stats */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
            <div>
              <div className="text-[10px] text-stone-400">GreenCoins</div>
              <div className="text-sm font-extrabold text-[#E8AF30] flex items-center justify-center gap-1">
                <i className="fa-solid fa-coins text-xs"></i>
                {user.rewardPoints}
              </div>
            </div>
            <div className="border-l border-white/10">
              <div className="text-[10px] text-stone-400">ব্যালেন্স</div>
              <div className="text-sm font-extrabold text-white">৳{user.walletBalance}</div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? "bg-[#E8AF30] text-[#002719] shadow-lg shadow-[#E8AF30]/20 font-bold"
                    : "text-stone-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <i
                    className={`${item.icon} text-sm transition-transform group-hover:scale-110 ${
                      isActive ? "text-[#002719]" : "text-[#E8AF30]"
                    }`}
                  ></i>
                  <div>
                    <span className="block">{item.label}</span>
                    <span className={`text-[10px] block opacity-75 font-normal ${isActive ? "text-[#002719]" : "text-stone-400"}`}>
                      {item.labelEn}
                    </span>
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold animate-pulse ${
                      isActive
                        ? "bg-[#002719] text-[#E8AF30]"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer shortcuts */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/products"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all text-center"
          >
            <i className="fa-solid fa-basket-shopping text-[#E8AF30]"></i>
            ফার্ম শপে যান (Shop Fresh)
          </Link>
          <Link
            href="/admin"
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold transition-all text-center"
          >
            <i className="fa-solid fa-shield-halved text-xs"></i>
            অ্যাডমিন পোর্টালে যান (Admin)
          </Link>
        </div>
      </aside>
    </>
  );
};
