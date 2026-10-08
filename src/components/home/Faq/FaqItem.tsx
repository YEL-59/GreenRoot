import React from "react";
import type { FaqItem as FaqItemType } from "@/types";

export interface FaqItemProps {
  item: FaqItemType;
  isOpen: boolean;
  onToggle: () => void;
  delay?: string;
}

export function FaqItem({ item, isOpen, onToggle, delay }: FaqItemProps) {
  return (
    <div className="accordion-item-gold wow fadeInUp" data-wow-delay={delay}>
      <h2 className="accordion-header" id={`heading${item.id}`}>
        <button
          className={`accordion-button ${isOpen ? "" : "collapsed"}`}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`collapse${item.id}`}
        >
          {item.question}
        </button>
      </h2>
      <div
        id={`collapse${item.id}`}
        className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
        role="region"
        aria-labelledby={`heading${item.id}`}
      >
        <div className="accordion-body">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
};
