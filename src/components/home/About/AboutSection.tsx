import React from "react";
import Link from "next/link";
import { aboutData } from "@/data/home";
import { AboutMission } from "./AboutMission";
import { AboutVision } from "./AboutVision";

export const AboutSection: React.FC = () => {
  return (
    <div className="about-us-gold">
      <div className="container">
        <div className="row section-row align-items-center">
          <div className="col-xl-7">
            <div className="section-title">
              <h3 className="wow fadeInUp">{aboutData.subtitle}</h3>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                {aboutData.title}
              </h2>
            </div>
          </div>

          <div className="col-xl-5">
            <div className="section-content-btn">
              <div className="section-title-content wow fadeInUp" data-wow-delay="0.2s">
                <p>{aboutData.description}</p>
              </div>

              <div className="section-btn wow fadeInUp" data-wow-delay="0.4s">
                <Link href={aboutData.button.href} className="btn-default">
                  {aboutData.button.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Child 1: Mission Box */}
          <AboutMission />

          {/* Child 2: Center Reveal Image */}
          <div className="col-xl-6 col-md-12 order-xl-2 order-md-3">
            <div className="about-us-image-gold">
              <figure className="image-anime reveal">
                <img src={aboutData.image} alt={aboutData.title} />
              </figure>
            </div>
          </div>

          {/* Child 3: Vision Box & Reviews */}
          <AboutVision />

          {/* Child 4: Footer Strip */}
          <div className="col-lg-12 order-4">
            <div className="section-footer-text wow fadeInUp" data-wow-delay="0.6s">
              <p>
                <span>{aboutData.footer.tag}</span>
                {aboutData.footer.text}
                <Link href={aboutData.footer.href}>{aboutData.footer.linkLabel}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
