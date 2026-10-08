import React from "react";
import Link from "next/link";
import { footerLegalLinks } from "@/data/navigation";

export const FooterBottom: React.FC = () => {
  return (
    <div className="col-lg-12">
      <div className="footer-copyright-gold">
        <div className="footer-copyright-text-gold">
          <p>Copyright © {new Date().getFullYear()} GreenRoot. All Rights Reserved.</p>
        </div>

        <div className="footer-privacy-policy-gold">
          <ul>
            {footerLegalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
