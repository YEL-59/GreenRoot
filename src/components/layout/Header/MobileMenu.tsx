"use client";

import React, { useState } from "react";
import Link from "next/link";
import { mainNav } from "@/data/navigation";
import type { NavLink } from "@/types";

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <div className="navbar-toggle">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`slicknav_btn ${isOpen ? "slicknav_open" : ""}`}
          aria-label="Toggle navigation"
          style={{ border: "none", background: "none", cursor: "pointer" }}
        >
          <span className="slicknav_menutxt"></span>
          <span className="slicknav_icon">
            <span className="slicknav_icon-bar"></span>
            <span className="slicknav_icon-bar"></span>
            <span className="slicknav_icon-bar"></span>
          </span>
        </button>
      </div>

      <div className="responsive-menu">
        {isOpen && (
          <div className="slicknav_menu" style={{ display: "block" }}>
            <ul className="slicknav_nav" aria-hidden="false" role="menu">
              {mainNav.map((item: NavLink) => {
                const hasChildren = !!item.children;
                const isSubOpen = openSubmenu === item.label;

                return (
                  <li
                    key={item.label}
                    className={`slicknav_item ${hasChildren ? "slicknav_collapsed" : ""}`}
                  >
                    {hasChildren ? (
                      <>
                        <a
                          role="menuitem"
                          aria-haspopup="true"
                          tabIndex={0}
                          className="slicknav_item"
                          onClick={() => toggleSubmenu(item.label)}
                          style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}
                        >
                          <span>{item.label}</span>
                          <span
                            className="slicknav_arrow"
                            style={{
                              transform: isSubOpen ? "rotate(-180deg)" : "none",
                              transition: "transform 0.3s ease",
                            }}
                          >
                            &#9662;
                          </span>
                        </a>
                        {isSubOpen && (
                          <ul className="slicknav_hidden" role="menu">
                            {item.children?.map((sub: NavLink) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  role="menuitem"
                                  tabIndex={0}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        role="menuitem"
                        tabIndex={0}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
