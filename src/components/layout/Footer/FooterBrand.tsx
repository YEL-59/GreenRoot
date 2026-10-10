"use client";

import Link from "next/link";
import { siteConfig, socialLinks } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

export const FooterBrand = () => {
  const { isBn } = useLanguage();

  return (
    <div className="footer-about-gold order-1">
      <div className="footer-logo-gold">
        <Link href="/">
          <img src={siteConfig.logoLight} alt={siteConfig.name} />
        </Link>
      </div>
      <div className="about-footer-content-gold">
        <p>
          {isBn
            ? "আমরা সাভার ও নাটোরে বিষমুক্ত, রাসায়নিকবিহীন ১০০% অর্গানিক চাষাবাদ ও খাঁটি ডেইরি পণ্য উৎপাদনে নিবেদিতপ্রাণ। পরিবারের সুস্থতা ও পুষ্টি নিশ্চিত করাই আমাদের মূল লক্ষ্য।"
            : "We are a dedicated organic farm committed to growing fresh, chemical-free, and naturally cultivated produce. Our mission is to promote healthy living and sustainable agriculture."}
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
