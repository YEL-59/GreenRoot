"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { NavMenu } from "./NavMenu";
import { MobileMenu } from "./MobileMenu";

export const Header: React.FC = () => {
  const [stickyState, setStickyState] = useState<"" | "active" | "hide">("");

  useEffect(() => {
    const handleScroll = () => {
      const fromTop = window.scrollY;
      if (fromTop > 600) {
        setStickyState("active");
      } else if (fromTop > 200) {
        setStickyState("hide");
      } else {
        setStickyState("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="main-header header-gold active-sticky-header">
      <div className={`header-sticky bg-section ${stickyState}`}>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            {/* Logo Start */}
            <Link className="navbar-brand" href="/">
              <img src={siteConfig.logo} alt={siteConfig.name} />
            </Link>
            {/* Logo End */}

            {/* Desktop Navigation */}
            <NavMenu />

            {/* Mobile Navigation */}
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  );
};
