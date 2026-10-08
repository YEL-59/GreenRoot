"use client";

import { useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { drawerCategories } from "@/data/navigation";

type SideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SideDrawer = ({ isOpen, onClose }: SideDrawerProps) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[999] h-full w-full max-w-[420px] bg-[#002f1f] text-white shadow-2xl transition-transform duration-300 ease-out flex flex-col justify-between overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Side menu"
      >
        {/* Top Header */}
        <div className="p-6 border-b border-emerald-900/60 flex items-center justify-between">
          <Link href="/" onClick={onClose} className="inline-block">
            <img src={siteConfig.logoLight} alt={siteConfig.name} className="h-10 w-auto" />
          </Link>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-emerald-950/80 hover:bg-[#E8AF30] text-emerald-200 hover:text-black flex items-center justify-center transition-all duration-200 border border-emerald-800/60 focus:outline-none"
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* About GreenRoot Bio */}
          <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-4">
            <h4 className="text-white font-semibold text-sm mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8AF30]"></span>
              Rooted in Nature
            </h4>
            <p className="text-emerald-100/70 text-xs leading-relaxed">
              GreenRoot empowers conscious living with certified organic farm yields, sustainable agriculture techniques, and direct farm-to-table freshness.
            </p>
          </div>

          {/* Categorized Pages Grid */}
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-900/40">
              <span className="text-[#E8AF30] text-xs font-bold uppercase tracking-wider">
                Explore All Pages
              </span>
              <span className="text-[11px] text-emerald-400/60">
                Quick Navigation
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {drawerCategories.map((cat) => (
                <div key={cat.title} className="space-y-2">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/80 border-l-2 border-[#E8AF30] pl-2">
                    {cat.title}
                  </h5>
                  <ul className="space-y-1 pl-2">
                    {cat.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="text-xs text-gray-300 hover:text-[#E8AF30] transition-colors duration-150 inline-block py-0.5"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact Info */}
          <div className="pt-4 border-t border-emerald-900/60 space-y-3">
            <h5 className="text-[#E8AF30] text-xs font-bold uppercase tracking-wider">
              Get in Touch
            </h5>
            <div className="space-y-2 text-xs text-emerald-100/80">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-900/60 flex items-center justify-center text-[#E8AF30]">
                  <i className="fa-solid fa-phone text-[11px]"></i>
                </span>
                <a href={siteConfig.phoneHref} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-900/60 flex items-center justify-center text-[#E8AF30]">
                  <i className="fa-solid fa-envelope text-[11px]"></i>
                </span>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-900/60 flex items-center justify-center text-[#E8AF30]">
                  <i className="fa-solid fa-location-dot text-[11px]"></i>
                </span>
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Socials */}
        <div className="p-6 border-t border-emerald-900/60 bg-emerald-950/60 flex items-center justify-between">
          <span className="text-[11px] text-emerald-300/60">Follow Us</span>
          <div className="flex items-center gap-2">
            {[
              { icon: "fa-brands fa-facebook-f", href: "#", label: "Facebook" },
              { icon: "fa-brands fa-instagram", href: "#", label: "Instagram" },
              { icon: "fa-brands fa-x-twitter", href: "#", label: "Twitter" },
              { icon: "fa-brands fa-linkedin-in", href: "#", label: "LinkedIn" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-8 h-8 rounded-full bg-emerald-900/80 hover:bg-[#E8AF30] text-white hover:text-black flex items-center justify-center text-xs transition-all duration-200"
                aria-label={social.label}
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
