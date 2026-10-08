import React from "react";
import { whatWeDoData } from "@/data/home";

export function WhatWeDoCounters() {
  return (
    <div className="col-12">
      <div className="what-we-counter-list-gold wow fadeInUp" data-wow-delay="0.8s">
        {whatWeDoData.counters.map((c) => (
          <div className="what-we-counter-item-gold" key={c.label}>
            <h3>
              <span className="counter">{c.value}</span>
              {c.suffix}
            </h3>
            <p>{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
