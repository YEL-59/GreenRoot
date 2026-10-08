import React from "react";
import Link from "next/link";
import { aboutData } from "@/data/about";
import { AboutStepCard } from "./AboutStepCard";

export const AboutHowItWorks = () => {
  const { howItWorks } = aboutData;

  return (
    <div className="how-it-work bg-section">
      <div className="container">
        {/* Section Title */}
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">{howItWorks.subtitle}</h3>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                {howItWorks.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="row">
          <div className="col-lg-12">
            <div className="how-work-step-box wow fadeInUp" data-wow-delay="0.2s">
              {howItWorks.steps.map((step) => (
                <AboutStepCard key={step.number} step={step} />
              ))}
            </div>
          </div>

          {/* Section Footer */}
          <div className="col-lg-12">
            <div
              className="section-footer-text section-satisfy-img wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div className="satisfy-client-images">
                <div className="satisfy-client-image">
                  <figure className="image-anime">
                    <img src="/images/author-1.jpg" alt="Author" />
                  </figure>
                </div>
                <div className="satisfy-client-image add-more">
                  <i>
                    <img src="/images/icon-phone-primary.svg" alt="Phone" />
                  </i>
                </div>
              </div>
              <p>
                Let&apos;s make something great work together.{" "}
                <Link href="/contact">Get Free Quote</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export * from "./AboutStepCard";
