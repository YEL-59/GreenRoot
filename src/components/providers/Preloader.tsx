"use client";

import { useEffect, useState } from "react";

/** Template preloader – fades out 600ms after window load. */
export const Preloader = () => {
  const [state, setState] = useState<"visible" | "fading" | "hidden">("visible");

  useEffect(() => {
    const fade = () => {
      setState("fading");
      setTimeout(() => setState("hidden"), 600);
    };
    if (document.readyState === "complete") fade();
    else window.addEventListener("load", fade, { once: true });
    return () => window.removeEventListener("load", fade);
  }, []);

  if (state === "hidden") return null;

  return (
    <div
      className="preloader"
      style={{ opacity: state === "fading" ? 0 : 1, transition: "opacity 600ms ease" }}
    >
      <div className="loading-container">
        <div className="loading"></div>
        <div id="loading-icon">
          <img src="/images/loader.svg" alt="" />
        </div>
      </div>
    </div>
  );
};
