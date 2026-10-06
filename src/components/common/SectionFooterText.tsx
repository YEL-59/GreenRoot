import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionFooterTextProps {
  children: ReactNode;
  delay?: string;
  /** adds `.section-satisfy-img` (layout with avatar stack) */
  withImages?: boolean;
}

/** Template `.section-footer-text` strip shown below many sections. */
export function SectionFooterText({ children, delay, withImages }: SectionFooterTextProps) {
  return (
    <div
      className={cn("section-footer-text", withImages && "section-satisfy-img", "wow fadeInUp")}
      data-wow-delay={delay}
    >
      {children}
    </div>
  );
}

export function StarIcons({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <i className="fa-solid fa-star" key={i}></i>
      ))}
    </>
  );
}

/** `<ul>` with "4.9/5 ★★★★★ Over 4200 Reviews" used in footer strips. */
export function ReviewSummary({ score = "4.9", label }: { score?: string; label: string }) {
  return (
    <ul>
      <li>
        <span className="counter">{score}</span>/5
      </li>
      <li>
        <StarIcons />
      </li>
      <li>{label}</li>
    </ul>
  );
}
