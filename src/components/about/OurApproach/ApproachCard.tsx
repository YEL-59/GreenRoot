import React from "react";
import type { ApproachItem } from "@/data/about";

type ApproachCardProps = {
  item: ApproachItem;
  delay?: string;
};

export const ApproachCard = ({ item, delay = "0.6s" }: ApproachCardProps) => {
  return (
    <div className="approach-item wow fadeInUp" data-wow-delay={delay}>
      {/* Approach Image */}
      <div className="approach-item-image">
        <figure className="image-anime reveal">
          <img src={item.image} alt={item.title} />
        </figure>
      </div>

      {/* Approach Body */}
      <div className="approach-item-body">
        <div className="icon-box">
          <img src={item.icon} alt="" />
        </div>
        <div className="approach-item-content">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <ul>
            <li>{item.bullet}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
