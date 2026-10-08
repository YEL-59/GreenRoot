"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavItems = [
  { href: "/admin", label: "বিজনেস ওভারভিউ", labelEn: "Overview & Analytics", icon: "fa-solid fa-chart-pie" },
  { href: "/admin/products", label: "পণ্য ও স্টক পরিচালনা", labelEn: "Products & Stock", icon: "fa-solid fa-boxes-stacked", badge: "20" },
  { href: "/admin/orders", label: "অর্ডার ও ডেলিভারি", labelEn: "Orders & Shipping", icon: "fa-solid fa-truck-ramp-box", badge: "12 New" },
  { href: "/admin/customers", label: "গ্রাহক তালিকা", labelEn: "Customers Directory", icon: "fa-solid fa-users" },
  { href: "/admin/content", label: "খামার নোটিশ ও ব্লগ", labelEn: "Notices & Blog", icon: "fa-solid fa-newspaper" },
  { href: "/admin/settings", label: "বিজনেস সেটিংস", labelEn: "Store Settings", icon: "fa-solid fa-sliders" },
];

export const AdminSidebar: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({
  isOpen = false,
  onClose,
}) => {
  const pathname = usePathname();

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
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#071911] text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-2xl lg:shadow-none border-r border-white/5`}
      >
        {/* Admin Brand */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E8AF30] to-amber-300 flex items-center justify-center text-[#002719] font-black text-xl shadow-lg">
              <i className="fa-solid fa-tractor"></i>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white block">GreenRoot</span>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Farm HQ Admin Console</span>
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

        {/* Admin Role Status */}
        <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Admin"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#E8AF30]"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#071911]"></span>
            </div>
            <div>
              <div className="text-xs font-bold text-white">খামার প্রশাসক (Super Admin)</div>
              <div className="text-[11px] text-stone-400">admin@greenrootfarm.com</div>
              <span className="inline-block px-1.5 py-0.2 mt-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Full HQ Access
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {adminNavItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
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
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive
                        ? "bg-[#002719] text-[#E8AF30]"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
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
            href="/dashboard"
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-all text-center"
          >
            <i className="fa-solid fa-user text-[#E8AF30]"></i>
            গ্রাহক ড্যাশবোর্ড (User Portal)
          </Link>
          <Link
            href="/products"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#002719] hover:bg-[#003824] border border-[#E8AF30]/40 text-[#E8AF30] text-xs font-bold transition-all text-center"
          >
            <i className="fa-solid fa-store"></i>
            লাইভ শপ ভিউ (Live Store)
          </Link>
        </div>
      </aside>
    </>
  );
};
