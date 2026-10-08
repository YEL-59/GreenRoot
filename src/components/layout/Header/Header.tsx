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
      if (fromTop > 100) {
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
      <header className="main-header header-gold active-sticky-header">
        <div className={`header-sticky bg-section transition-all duration-300 ${stickyState}`}>
          <nav className="navbar navbar-expand-lg">
            <div className="container flex items-center justify-between px-4 sm:px-6">
              {/* Logo Start */}
              <Link className="navbar-brand flex items-center gap-2 group shrink-0" href="/">
                <img
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  className="h-9 sm:h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
