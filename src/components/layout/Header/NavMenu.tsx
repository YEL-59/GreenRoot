import React from "react";
import Link from "next/link";
import { mainNav } from "@/data/navigation";
import type { NavLink } from "@/types";

export const NavMenu: React.FC = () => {
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

      <div className="header-btn">
        <Link href="/contact" className="btn-default">
          Get Started
        </Link>
      </div>
    </div>
  );
};
