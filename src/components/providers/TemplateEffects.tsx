"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  initCounters,
  initGsapEffects,
  initParallax,
  initSkillBars,
  initWow,
} from "@/lib/animations";

/**
 * Replaces the template's js/function.js.
 * Runs every scroll/entrance effect after each route change and cleans up on leave.
 */
export function TemplateEffects() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];

    cleanups.push(initWow(), initCounters(), initSkillBars(), initParallax());

    // Heading split animation needs final font metrics (same as the template)
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      if (!cancelled) cleanups.push(initGsapEffects());
    });

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
