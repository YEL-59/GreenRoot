"use client";

import Link from "next/link";
import { heroData } from "@/data/home";
import { useLanguage } from "@/context/LanguageContext";

export const HeroContent = () => {
  const { t } = useLanguage();

  return (
    <div className="hero-content-gold">
      <div className="section-title">
        <h3 className="wow fadeInUp">{t.hero.subtitle}</h3>
        <h1 className="text-anime-style-3" data-cursor="-opaque">
          {t.hero.title}
        </h1>
        <p className="wow fadeInUp" data-wow-delay="0.2s">
          {t.hero.description}
        </p>
      </div>

      <div className="hero-btn-gold wow fadeInUp" data-wow-delay="0.4s">
        <Link href={heroData.primaryBtn.href} className="btn-default btn-highlighted">
          {t.hero.shopBtn}
        </Link>
        <Link href={heroData.secondaryBtn.href} className="btn-default">
          {t.hero.exploreBtn}
        </Link>
      </div>
    </div>
  );
};
