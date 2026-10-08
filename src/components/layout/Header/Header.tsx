"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { NavMenu } from "./NavMenu";
import { MobileMenu } from "./MobileMenu";
import { SideDrawer } from "./SideDrawer";

export const Header: React.FC = () => {
  const [stickyState, setStickyState] = useState<"" | "active">("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const fromTop = window.scrollY;
      if (fromTop > 40) {
        setStickyState("active");
      } else {
        setStickyState("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div
          className={`transition-all duration-300 ${
            stickyState === "active"
              ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_25px_-5px_rgba(0,0,0,0.08)] border-b border-stone-200/90 py-2 sm:py-2.5"
              : "bg-white/95 backdrop-blur-md shadow-[0_2px_15px_-4px_rgba(0,0,0,0.04)] border-b border-stone-200/70 py-3 sm:py-3.5"
          }`}
        >
          <nav className="navbar navbar-expand-lg !p-0">
            <div className="container flex items-center justify-between px-4 sm:px-6">
              {/* Logo Start */}
              <Link className="navbar-brand flex items-center gap-2 group shrink-0" href="/">
                <img
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              {/* Logo End */}

              {/* Desktop Navigation */}
              <NavMenu onOpenDrawer={() => setIsDrawerOpen(true)} />

              {/* Mobile Navigation */}
              <MobileMenu onOpenDrawer={() => setIsDrawerOpen(true)} />
            </div>
          </nav>
        </div>
      </header>

      {/* Right-Side Offcanvas Drawer with All Pages & Info */}
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
