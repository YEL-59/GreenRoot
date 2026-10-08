"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import type { NavLink } from "@/types";

type NavMenuProps = {
  onOpenDrawer?: () => void;
};

export const NavMenu = ({ onOpenDrawer }: NavMenuProps) => {
  const pathname = usePathname();
  const { openCart, totalItems, subtotal } = useCart();
  const { isBn, t } = useLanguage();

  return (
    <div className="!hidden lg:!flex items-center justify-between flex-1 ml-6 xl:ml-12 main-menu">
      {/* Centered Navigation Links */}
      <div className="nav-menu-wrapper flex-1 text-center">
        <ul className="navbar-nav inline-flex items-center justify-center gap-1 lg:gap-2 xl:gap-3.5 m-0 p-0 list-none" id="menu">
          {mainNav.map((item: NavLink) => {
            const isCurrent =
              (item.href === "/" && pathname === "/") ||
              (item.href !== "/" && (pathname === item.href || pathname?.startsWith(item.href + "/"))) ||
              (item.children &&
                item.children.some(
                  (sub: NavLink) => pathname === sub.href || pathname?.startsWith(sub.href + "/")
                ));

            const displayLabel = isBn ? (item.labelBn || item.label) : item.label;

            return (
              <li
                key={item.label}
                className={`nav-item relative group ${item.children ? "submenu" : ""} ${
                  isCurrent ? "active" : ""
                }`}
              >
                <Link
                  className={`nav-link whitespace-nowrap inline-flex items-center gap-1.5 py-2.5 px-3 xl:px-3.5 text-[15px] xl:text-[16px] font-bold tracking-tight transition-all duration-200 relative ${
                    isCurrent
                      ? "!text-[#002719] font-extrabold"
                      : "!text-stone-700 hover:!text-[#002719]"
                  }`}
                  href={item.href}
                >
                  <span className="whitespace-nowrap">{displayLabel}</span>
                  {item.children && (
                    <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 opacity-60 group-hover:rotate-180 group-hover:opacity-100 group-hover:text-[#E8AF30] transition-all duration-200"></i>
                  )}
                  {/* Active indicator underline pill */}
                  {isCurrent && (
                    <span className="absolute -bottom-1 left-3 right-3 h-[2.5px] rounded-full bg-[#E8AF30]" />
                  )}
                </Link>

                {item.children && (
                  <ul className="sub-menu transition-all duration-200 absolute top-full left-0 min-w-[240px] bg-[#00281b] rounded-2xl p-2.5 shadow-2xl border border-[#E8AF30]/30 z-50 text-left">
                    {item.children.map((sub: NavLink) => {
                      const isSubActive = pathname === sub.href;
                      const subLabel = isBn ? (sub.labelBn || sub.label) : sub.label;
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
                            {subLabel}
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

      {/* Right Actions: Language Switcher, Cart, Dashboard & Side Drawer */}
      <div className="header-btn flex items-center gap-2 xl:gap-3 shrink-0">
        {/* Language Switcher Pill (বাংলা / EN) */}
        <LanguageSwitcher variant="pill" />

        {/* Cart Drawer Trigger Button */}
        <button
          type="button"
          onClick={openCart}
          className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-stone-100 hover:bg-[#E8AF30]/20 border border-stone-200/90 hover:border-[#E8AF30] text-stone-800 transition-all duration-300 shadow-xs group focus:outline-none"
          aria-label={t.cart.title}
          title={t.cart.title}
        >
          <i className="fa-solid fa-basket-shopping text-base text-[#002719] group-hover:scale-110 transition-transform"></i>
          <span className="text-xs font-black hidden xl:inline text-stone-900 font-mono">৳{subtotal}</span>
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-[#E8AF30] text-[#181818] font-extrabold text-[11px] flex items-center justify-center shadow-md animate-bounce">
              {totalItems}
            </span>
          )}
        </button>

        {/* User Dashboard & Live Order Track Button */}
        <Link
          href="/dashboard"
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-stone-100 hover:bg-[#002719] hover:text-[#E8AF30] border border-stone-200/90 text-stone-700 transition-all duration-300 shadow-xs group focus:outline-none"
          aria-label={t.dashboard.title}
          title={t.dashboard.title}
        >
          <i className="fa-regular fa-user text-sm group-hover:scale-110 transition-transform"></i>
        </Link>

        {/* Shop Fresh Button */}
        <Link
          href="/products"
          className="btn-default shadow-xs hover:shadow-md transition-all whitespace-nowrap text-xs font-extrabold uppercase tracking-wider py-2.5 px-5"
        >
          {t.nav.shop}
        </Link>

        {/* Right-Side Offcanvas Drawer Toggle Button */}
        {onOpenDrawer && (
          <button
            type="button"
            onClick={onOpenDrawer}
            className="w-10 h-10 rounded-full bg-[#E8AF30]/15 hover:bg-[#E8AF30] border border-[#E8AF30]/40 hover:border-[#E8AF30] text-stone-800 hover:text-[#181818] flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 group focus:outline-none"
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
