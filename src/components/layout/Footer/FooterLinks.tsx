import React from "react";
import Link from "next/link";
import { footerQuickLinks, footerServiceLinks } from "@/data/navigation";

export const FooterLinks = () => {
  return (
    <div className="footer-links-box-gold order-xl-3 order-2">
      <div className="footer-links-gold">
        <h3>Quick Links</h3>
        <ul>
          {footerQuickLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-links-gold">
        <h3>Our Services</h3>
        <ul>
          {footerServiceLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
