import React from "react";
import { aboutData } from "@/data/about";
import { AboutImages } from "./AboutImages";
import { AboutContent } from "./AboutContent";
import { AboutFooter } from "./AboutFooter";

export function AboutOverview() {
  const { overview } = aboutData;

  return (
    <div className="about-us">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column: Images */}
          <div className="col-xl-5">
            <AboutImages
              image1={overview.images.image1}
              image2={overview.images.image2}
            />
          </div>

          {/* Right Column: Content */}
          <div className="col-xl-7">
            <AboutContent
              subtitle={overview.subtitle}
              title={overview.title}
              paragraphs={overview.paragraphs}
              features={overview.features}
            />
          </div>

          {/* Bottom Full-Width Column: Footer */}
          <div className="col-lg-12">
            <AboutFooter tags={overview.footerTags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export * from "./AboutImages";
export * from "./AboutContent";
export * from "./AboutFooter";
