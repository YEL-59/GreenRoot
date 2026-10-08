"use client";

import Link from "next/link";
import { footerQuickLinks, footerServiceLinks } from "@/data/navigation";
import { useLanguage } from "@/context/LanguageContext";

export const FooterLinks = () => {
  const { isBn } = useLanguage();

  return (
    <div className="footer-links-box-gold order-xl-3 order-2">
      <div className="footer-links-gold">
        <h3>{isBn ? "প্রয়োজনীয় লিংক" : "Quick Links"}</h3>
        <ul>
          {footerQuickLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>
                {isBn && link.labelBn ? link.labelBn : link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-links-gold">
        <h3>{isBn ? "আমাদের সেবাসমূহ" : "Our Services"}</h3>
        <ul>
          {footerServiceLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>
                {isBn && link.labelBn ? link.labelBn : link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
