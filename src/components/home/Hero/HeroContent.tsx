import React from "react";
import Link from "next/link";
import { heroData } from "@/data/home";

export const HeroContent: React.FC = () => {
  return (
    <div className="hero-content-gold">
      <div className="section-title">
        <h3 className="wow fadeInUp">{heroData.subtitle}</h3>
        <h1 className="text-anime-style-3" data-cursor="-opaque">
          {heroData.title}
        </h1>
        <p className="wow fadeInUp" data-wow-delay="0.2s">
          {heroData.description}
        </p>
      </div>

      <div className="hero-btn-gold wow fadeInUp" data-wow-delay="0.4s">
        <Link href={heroData.primaryBtn.href} className="btn-default btn-highlighted">
          {heroData.primaryBtn.label}
        </Link>
        <Link href={heroData.secondaryBtn.href} className="btn-default">
          {heroData.secondaryBtn.label}
        </Link>
      </div>
    </div>
  );
};
