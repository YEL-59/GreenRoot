"use client";

import React from "react";
import Link from "next/link";
import { mainNav } from "@/data/navigation";
import type { NavLink } from "@/types";

interface NavMenuProps {
  onOpenDrawer?: () => void;
}

export const NavMenu: React.FC<NavMenuProps> = ({ onOpenDrawer }) => {
  return (
    <div className="collapse navbar-collapse main-menu">
      <div className="nav-menu-wrapper">
        <ul className="navbar-nav mr-auto" id="menu">
          {mainNav.map((item: NavLink) => (
            <li
              key={item.label}
              className={`nav-item ${item.children ? "submenu" : ""}`}
            >
              <Link className="nav-link" href={item.href}>
                {item.label}
              </Link>
              {item.children && (
                <ul>
                  {item.children.map((sub: NavLink) => (
                    <li key={sub.label} className="nav-item">
                      <Link className="nav-link" href={sub.href}>
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="header-btn flex items-center gap-3">
        <Link href="/contact" className="btn-default">
          Get Started
        </Link>

        {/* Right-Side Offcanvas Drawer Toggle Button */}
        {onOpenDrawer && (
          <button
            type="button"
            onClick={onOpenDrawer}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#E8AF30] border border-white/20 text-white hover:text-black flex items-center justify-center transition-all duration-300 shadow-md group focus:outline-none"
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
