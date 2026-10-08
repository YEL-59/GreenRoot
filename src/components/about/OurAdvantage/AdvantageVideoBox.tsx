"use client";

import React from "react";
import { VideoPopup } from "@/components/common";

interface AdvantageVideoBoxProps {
  image: string;
  videoUrl: string;
}

export function AdvantageVideoBox({
  image,
  videoUrl,
}: AdvantageVideoBoxProps) {
  return (
    <div
      className="our-advantage-image box-2 wow fadeInUp"
      data-wow-delay="0.2s"
    >
      <figure>
        <img src={image} alt="GreenRoot Farm Story" />
      </figure>

      <div className="video-play-btn">
        <VideoPopup url={videoUrl} className="popup-video">
          <i className="fa-solid fa-play"></i>
        </VideoPopup>
      </div>
    </div>
  );
};
