"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import type { NavLink } from "@/types";

interface NavMenuProps {
  onOpenDrawer?: () => void;
}

export const NavMenu: React.FC<NavMenuProps> = ({ onOpenDrawer }) => {
  const pathname = usePathname();
  const { openCart, totalItems, subtotal } = useCart();

  return (
    <div className="!hidden lg:!flex items-center justify-between flex-1 ml-6 xl:ml-12 main-menu">
      {/* Centered Navigation Links */}
      <div className="nav-menu-wrapper flex-1 text-center">
        <ul className="navbar-nav inline-flex items-center justify-center gap-1 lg:gap-1.5 xl:gap-3 m-0 p-0 list-none" id="menu">
          {mainNav.map((item: NavLink) => {
            const isCurrent =
              (item.href === "/" && pathname === "/") ||
              (item.href !== "/" && (pathname === item.href || pathname?.startsWith(item.href + "/"))) ||
              (item.children &&
                item.children.some(
                  (sub: NavLink) => pathname === sub.href || pathname?.startsWith(sub.href + "/")
                ));

            return (
              <li
                key={item.label}
                className={`nav-item relative group ${item.children ? "submenu" : ""} ${
                  isCurrent ? "active" : ""
                }`}
              >
                <Link
                  className={`nav-link whitespace-nowrap inline-flex items-center gap-1.5 py-3 px-3 xl:px-4 text-[15px] xl:text-[16px] font-semibold tracking-normal transition-all duration-200 relative ${
                    isCurrent
                      ? "!text-[#E8AF30] font-bold"
                      : "text-[#2C2C2C] hover:!text-[#E8AF30]"
                  }`}
                  href={item.href}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.children && (
                    <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 opacity-70 group-hover:rotate-180 group-hover:opacity-100 group-hover:text-[#E8AF30] transition-all duration-200"></i>
                  )}
                  {/* Subtle active indicator underline pill */}
                  {isCurrent && (
                    <span className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-[#E8AF30]" />
                  )}
                </Link>

                {item.children && (
                  <ul className="sub-menu transition-all duration-200 absolute top-full left-0 min-w-[240px] bg-[#00281b] rounded-2xl p-2.5 shadow-2xl border border-[#E8AF30]/30 z-50 text-left">
                    {item.children.map((sub: NavLink) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <li key={sub.label} className="nav-item my-0.5 list-none">
                          <Link
                            className={`nav-link whitespace-nowrap block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                              isSubActive
                                ? "!text-[#E8AF30] bg-white/10 font-semibold translate-x-1"
                                : "!text-emerald-100/90 hover:!text-white hover:bg-white/10 hover:translate-x-1"
                            }`}
                            href={sub.href}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right Actions: Cart, CTA & Explore Side Drawer Button */}
      <div className="header-btn flex items-center gap-2.5 xl:gap-3 shrink-0">
        {/* Cart Drawer Trigger Button */}
        <button
          type="button"
          onClick={openCart}
          className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-stone-900/5 hover:bg-[#E8AF30]/20 border border-stone-900/10 hover:border-[#E8AF30] text-[#2C2C2C] transition-all duration-300 shadow-sm group focus:outline-none"
          aria-label="View Shopping Cart"
          title="View Cart"
        >
          <i className="fa-solid fa-basket-shopping text-base text-[#2C2C2C] group-hover:scale-110 transition-transform"></i>
          <span className="text-xs font-bold hidden xl:inline text-[#2C2C2C]">৳{subtotal}</span>
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-[#E8AF30] text-[#181818] font-extrabold text-[11px] flex items-center justify-center shadow-md animate-bounce">
              {totalItems}
            </span>
          )}
        </button>

        {/* User Dashboard & Live Order Track Button */}
        <Link
          href="/dashboard"
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-stone-900/5 hover:bg-[#002719] hover:text-[#E8AF30] border border-stone-900/10 text-[#2C2C2C] transition-all duration-300 shadow-sm group focus:outline-none"
          aria-label="Customer Dashboard & Track Orders"
          title="Customer Dashboard & Track Orders"
        >
          <i className="fa-regular fa-user text-sm group-hover:scale-110 transition-transform"></i>
        </Link>

        <Link
          href="/products"
          className="btn-default shadow-sm hover:shadow-md transition-all whitespace-nowrap"
        >
          Shop Fresh
        </Link>

        {/* Right-Side Offcanvas Drawer Toggle Button */}
        {onOpenDrawer && (
          <button
            type="button"
            onClick={onOpenDrawer}
            className="w-11 h-11 rounded-full bg-[#E8AF30]/15 hover:bg-[#E8AF30] border border-[#E8AF30]/40 hover:border-[#E8AF30] text-[#2C2C2C] hover:text-[#181818] flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 group focus:outline-none"
            aria-label="Open Explore Side Menu"
            title="Explore All Pages"
          >
            <i className="fa-solid fa-bars-staggered text-sm group-hover:scale-110 transition-transform"></i>
          </button>
        )}
      </div>
    </div>
  );
};
