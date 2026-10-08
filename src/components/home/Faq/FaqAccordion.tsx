"use client";

import React, { useState } from "react";
import { faqData } from "@/data/home";
import { FaqItem } from "./FaqItem";

const delays = ["0s", "0.2s", "0.4s", "0.6s", "0.8s", "1s"];

export const FaqAccordion = () => {
  const [activeId, setActiveId] = useState<string | null>(faqData.defaultOpenId);

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="faq-accordion-gold" id="accordion">
      {faqData.items.map((item, idx) => (
        <FaqItem
          key={item.id}
          item={item}
          isOpen={activeId === item.id}
          onToggle={() => handleToggle(item.id)}
          delay={delays[idx % delays.length]}
        />
      ))}
    </div>
  );
};
