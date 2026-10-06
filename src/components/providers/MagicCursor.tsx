"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const POINTER_SELECTOR = "a,input,textarea,button";

/**
 * Port of js/magiccursor.js. Renders `.cb-cursor` and reacts to
 * `data-cursor`, `data-cursor-text` and interactive elements.
 */
export function MagicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    const textEl = textRef.current;
    if (!el || !textEl) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let visible = false;
    let visibleTimer: ReturnType<typeof setTimeout>;
    let stateClass = "";

    const move = (x: number, y: number) =>
      gsap.to(el, { x, y, force3D: true, overwrite: true, ease: "expo.out", duration: visible ? 0.7 : 0 });

    const show = () => {
      if (visible) return;
      clearTimeout(visibleTimer);
      el.classList.add("-visible");
      visibleTimer = setTimeout(() => (visible = true));
    };
    const hide = () => {
      clearTimeout(visibleTimer);
      el.classList.remove("-visible");
      visibleTimer = setTimeout(() => (visible = false), 300);
    };

    const onMove = (e: MouseEvent) => {
      move(e.clientX, e.clientY);
      show();
    };
    const onDown = () => el.classList.add("-active");
    const onUp = () => el.classList.remove("-active");

    // Derive cursor state from whatever element is under the pointer
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;

      el.classList.toggle("-pointer", !!target.closest(POINTER_SELECTOR));

      const stateEl = target.closest<HTMLElement>("[data-cursor]");
      const nextState = stateEl?.dataset.cursor ?? "";
      if (nextState !== stateClass) {
        if (stateClass) el.classList.remove(stateClass);
        if (nextState) el.classList.add(nextState);
        stateClass = nextState;
      }

      const textHost = target.closest<HTMLElement>("[data-cursor-text]");
      if (textHost) {
        textEl.innerHTML = textHost.dataset.cursorText ?? "";
        el.classList.add("-text");
      } else {
        el.classList.remove("-text");
      }

      if (target.closest("iframe")) hide();
    };

    move(-window.innerWidth, -window.innerHeight);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);

    return () => {
      clearTimeout(visibleTimer);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
    };
  }, []);

  return (
    <div className="cb-cursor" ref={cursorRef}>
      <div className="cb-cursor-text" ref={textRef}></div>
    </div>
  );
}
