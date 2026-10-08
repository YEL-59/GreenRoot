"use client";

import React, { useState } from "react";
import type { FaqItemData } from "@/data/about";

type FaqAccordionProps = {
  items: FaqItemData[];
};

export const FaqAccordion = ({ items }: FaqAccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="faq-accordion" id="accordion">
      {items.map((item, index) => {
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
  );
};
