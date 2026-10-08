import React from "react";
import Link from "next/link";
import type { AboutFeature } from "@/data/about";

interface AboutContentProps {
  subtitle: string;
  title: string;
  paragraphs: string[];
  features: AboutFeature[];
}

export function AboutContent({
  subtitle,
  title,
  paragraphs,
  features,
}: AboutContentProps) {
  return (
    <div className="about-us-content">
      {/* Section Title */}
      <div className="section-title">
        <h3 className="wow fadeInUp">{subtitle}</h3>
        <h2 className="text-anime-style-3" data-cursor="-opaque">
          {title}
        </h2>
        {paragraphs.map((para, idx) => (
          <p
            key={idx}
            className="wow fadeInUp"
            data-wow-delay={`${0.2 * (idx + 1)}s`}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Feature Items List */}
      <div className="about-us-item-list wow fadeInUp" data-wow-delay="0.6s">
        {features.map((feat) => (
          <div key={feat.title} className="about-us-item">
            <div className="icon-box">
              <img src={feat.icon} alt={feat.title} />
            </div>
            <div className="about-us-item-content">
              <h3>{feat.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="about-us-btn wow fadeInUp" data-wow-delay="0.8s">
        <Link href="/contact" className="btn-default">
          contact now
        </Link>
      </div>
    </div>
  );
};
