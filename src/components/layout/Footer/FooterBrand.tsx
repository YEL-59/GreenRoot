import React from "react";
import Link from "next/link";
import { siteConfig, socialLinks } from "@/config/site";

export const FooterBrand: React.FC = () => {
  return (
    <div className="footer-about-gold order-1">
      <div className="footer-logo-gold">
        <Link href="/">
          <img src={siteConfig.logoLight} alt={siteConfig.name} />
        </Link>
      </div>
      <div className="about-footer-content-gold">
        <p>
          We are a dedicated organic farm committed to growing fresh, chemical-free,
          and naturally cultivated produce. Our mission is to promote healthy living
          and support sustainable
        </p>
      </div>
      <div className="footer-social-icons-gold">
        <ul>
          {socialLinks.map((s) => (
            <li key={s.label}>
              <a href={s.href} aria-label={s.label}>
                <i className={s.icon}></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
