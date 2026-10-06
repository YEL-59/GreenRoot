"use client";

import React, { useState } from "react";
import type { ServiceDetailData } from "@/data/services";

interface ServiceDetailFaqProps {
  faqs: ServiceDetailData["faqs"];
}

export const ServiceDetailFaq: React.FC<ServiceDetailFaqProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="page-single-faqs">
      <div className="section-title">
        <h2 className="text-anime-style-3" data-cursor="-opaque">
          Frequently Asked Questions
        </h2>
        <p className="wow fadeInUp">
          Our FAQ section is designed to answer all your common queries about our
          organic farm, sustainable practices, and services.
        </p>
      </div>

      <div className="faq-accordion" id="accordion">
        {faqs.map((item, index) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="accordion-item wow fadeInUp"
              data-wow-delay={`${0.2 * index}s`}
            >
              <h2 className="accordion-header" id={`heading-${item.id}`}>
                <button
                  className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`collapse-${item.id}`}
                >
                  {item.question}
                </button>
              </h2>
              <div
                id={`collapse-${item.id}`}
                className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
                aria-labelledby={`heading-${item.id}`}
              >
                <div className="accordion-body">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
