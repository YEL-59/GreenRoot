"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import type { NavLink } from "@/types";

type MobileMenuProps = {
  onOpenDrawer?: () => void;
};

export const MobileMenu = ({ onOpenDrawer }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const { openCart, totalItems } = useCart();

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {/* Mobile Controls (Visible on mobile & tablet, hidden on desktop lg+) */}
      <div className="flex lg:hidden items-center gap-2 shrink-0">
        {/* Mobile Cart Trigger */}
        <button
          type="button"
          onClick={openCart}
          className="relative w-10 h-10 rounded-full bg-stone-100 hover:bg-[#E8AF30]/20 border border-stone-200/90 text-stone-800 flex items-center justify-center transition-all duration-200 focus:outline-none shadow-xs"
          aria-label="Open Shopping Cart"
          title="Cart"
        >
          <i className="fa-solid fa-basket-shopping text-sm text-[#002719]"></i>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#E8AF30] text-[#181818] font-black text-[10px] flex items-center justify-center shadow-md animate-bounce">
              {totalItems}
            </span>
          )}
        </button>

        {onOpenDrawer && (
          <button
            type="button"
            onClick={onOpenDrawer}
            className="w-10 h-10 rounded-full bg-[#E8AF30]/15 hover:bg-[#E8AF30] border border-[#E8AF30]/40 text-stone-800 hover:text-[#181818] flex items-center justify-center transition-all duration-200 focus:outline-none shadow-xs"
            aria-label="Open Explore Side Menu"
            title="Explore All Pages"
          >
            <i className="fa-solid fa-bars-staggered text-sm"></i>
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200/90 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 focus:outline-none"
          aria-label="Toggle navigation"
        >
          <span
            className={`w-5 h-0.5 bg-stone-800 rounded-full transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-stone-800 rounded-full transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-stone-800 rounded-full transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Floating Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 w-full px-4 pt-2 pb-4 z-[990]">
          <div className="bg-[#002719] border-2 border-[#E8AF30]/40 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-white">
            <ul className="space-y-1.5 p-0 m-0 list-none">
              {mainNav.map((item: NavLink) => {
                const hasChildren = !!item.children;
                const isSubOpen = openSubmenu === item.label;
                const isCurrent =
                  (item.href === "/" && pathname === "/") ||
                  (item.href !== "/" && (pathname === item.href || pathname?.startsWith(item.href + "/"))) ||
                  (item.children &&
                    item.children.some(
                      (sub: NavLink) => pathname === sub.href || pathname?.startsWith(sub.href + "/")
                    ));

                return (
                  <li key={item.label} className="border-b border-white/10 last:border-b-0 pb-1.5">
                    {hasChildren ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleSubmenu(item.label)}
                          className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-semibold transition-colors ${
                            isCurrent
                              ? "text-[#E8AF30] bg-white/10"
                              : "text-white hover:text-[#E8AF30]"
                          }`}
                        >
                          <span>{item.label}</span>
                          <i
                            className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${
                              isSubOpen ? "rotate-180 text-[#E8AF30]" : "text-white/60"
                            }`}
                          />
                        </button>

                        {isSubOpen && (
                          <ul className="pl-4 pr-2 py-2 space-y-1 bg-black/40 rounded-xl mt-1.5 mb-2 border border-white/10 list-none">
                            {item.children?.map((sub: NavLink) => {
                              const isSubActive = pathname === sub.href;
                              return (
                                <li key={sub.label}>
                                  <Link
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                                      isSubActive
                                        ? "text-[#E8AF30] font-bold bg-white/15"
                                        : "text-emerald-100/90 hover:text-white hover:bg-white/10"
                                    }`}
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-2.5 px-3 rounded-xl text-base font-semibold transition-colors ${
                          isCurrent
                            ? "text-[#E8AF30] bg-white/10 font-bold"
                            : "text-white hover:text-[#E8AF30]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Mobile Actions */}
            <div className="mt-5 pt-4 border-t border-white/15 flex flex-col gap-2.5">
              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 px-4 rounded-full bg-[#E8AF30] hover:bg-[#dfbe2c] text-[#181818] font-bold text-sm tracking-wide transition-colors shadow-md"
              >
                Get Started
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-white/10 text-center"
                >
                  <i className="fa-regular fa-user text-xs text-[#E8AF30]"></i>
                  <span>ইউজার ড্যাশবোর্ড</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-white/10 text-center"
                >
                  <i className="fa-solid fa-shield-halved text-xs text-[#E8AF30]"></i>
                  <span>অ্যাডমিন প্যানেল</span>
                </Link>
              </div>

              {onOpenDrawer && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenDrawer();
                  }}
                  className="w-full text-center py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-white/10"
                >
                  <i className="fa-solid fa-compass text-xs text-[#E8AF30]"></i>
                  <span>Explore All Pages</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
