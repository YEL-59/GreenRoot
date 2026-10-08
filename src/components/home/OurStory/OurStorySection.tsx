import React from "react";
import Link from "next/link";
import { ourStoryData } from "@/data/home";
import { VideoPopup } from "@/components/common";

export function OurStorySection() {
  return (
    <div className="our-story-gold bg-section dark-section parallaxie">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-md-8">
            <div className="our-story-content-gold">
              <div className="section-title">
                <h3 className="wow fadeInUp">{ourStoryData.subtitle}</h3>
                <h2 className="text-anime-style-3" data-cursor="-opaque">
                  {ourStoryData.title}
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  {ourStoryData.description}
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-md-4">
            <div className="our-story-button-gold wow fadeInUp" data-wow-delay="0.4s">
              <div className="video-play-button-gold">
                <VideoPopup url={ourStoryData.videoUrl}>
                  <i className="fa-solid fa-play"></i>
                </VideoPopup>
              </div>

              <div className="get-in-touch-circle-gold">
                <Link href="/contact">
                  <img src="/images/get-in-touch-circle.svg" alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStorySection;
