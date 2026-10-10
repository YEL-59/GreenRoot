"use client";

import Link from "next/link";
import { footerLegalLinks } from "@/data/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/common";

export const FooterBottom = () => {
  const { t, isBn } = useLanguage();

  return (
    <div className="col-lg-12">
      <div className="footer-copyright-gold flex flex-col md:flex-row items-center justify-between gap-4 py-4">
        <div className="footer-copyright-text-gold">
          <p>
            Copyright © {new Date().getFullYear()} GreenRoot. {t.common.allRights}
          </p>
        </div>

        {/* Global Footer Language Switcher */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher variant="pill" />
        </div>

        <div className="footer-privacy-policy-gold">
          <ul>
            {footerLegalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>
                  {isBn && link.labelBn ? link.labelBn : link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
