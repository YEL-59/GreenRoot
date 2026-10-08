import React from "react";
import Link from "next/link";
import { aboutData } from "@/data/about";
import { AdvantageQualityBox } from "./AdvantageQualityBox";
import { AdvantageVideoBox } from "./AdvantageVideoBox";
import { AdvantageCounterBox } from "./AdvantageCounterBox";

export const OurAdvantage = () => {
  const { advantage } = aboutData;

  return (
    <div className="our-advantage">
      <div className="container">
        {/* Section Title */}
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">{advantage.subtitle}</h3>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                {advantage.title}
              </h2>
            </div>
          </div>
        </div>

        {/* 4 Advantage Grid Boxes */}
        <div className="row">
          <div className="col-lg-12">
            <div className="our-advantage-boxes">
              {/* Box 1: Quality & Reviews */}
              <AdvantageQualityBox
                icon={advantage.box1.icon}
                title={advantage.box1.title}
                description={advantage.box1.description}
                customers={advantage.box1.customers}
              />

              {/* Box 2: Image + Video Play */}
              <AdvantageVideoBox
                image={advantage.box2.image}
                videoUrl={advantage.box2.videoUrl}
              />

              {/* Box 3: Image Anime */}
              <div
                className="our-advantage-image box-3 wow fadeInUp"
                data-wow-delay="0.4s"
              >
                <figure className="image-anime">
                  <img src={advantage.box3.image} alt="GreenRoot Advantage" />
                </figure>
              </div>

              {/* Box 4: Counter Box */}
              <AdvantageCounterBox
                icon={advantage.box4.icon}
                years={advantage.box4.years}
                title={advantage.box4.title}
                description={advantage.box4.description}
                bullets={advantage.box4.bullets}
              />
            </div>
          </div>

          {/* Advantage Section Footer */}
          <div className="col-lg-12">
            <div
              className="our-advantage-footer wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div className="our-advantage-footer-list">
                <ul>
                  {advantage.footerTags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>

              <div className="section-footer-text section-satisfy-img">
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
    </div>
  );
};

export * from "./AdvantageQualityBox";
export * from "./AdvantageVideoBox";
export * from "./AdvantageCounterBox";
