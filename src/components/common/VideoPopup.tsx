"use client";

import { useEffect, useState, type ReactNode } from "react";

function toEmbedUrl(url: string) {
  const id = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1];
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url;
}

export interface VideoPopupProps {
  url: string;
  className?: string;
  children: ReactNode;
}

/** Replaces Magnific Popup's `.popup-video` iframe lightbox (reuses its CSS classes). */
export function VideoPopup({ url, className = "popup-video", children }: VideoPopupProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href={url}
        className={className}
        data-cursor-text="Play"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>

      {open && (
        <>
          <div className="mfp-bg mfp-fade mfp-ready"></div>
          <div
            className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-fade mfp-ready"
            tabIndex={-1}
            style={{ overflowX: "hidden", overflowY: "auto" }}
            onClick={() => setOpen(false)}
          >
            <div className="mfp-container mfp-s-ready mfp-iframe-holder">
              <div className="mfp-content" onClick={(e) => e.stopPropagation()}>
                <div className="mfp-iframe-scaler">
                  <button title="Close (Esc)" type="button" className="mfp-close" onClick={() => setOpen(false)}>
                    ×
                  </button>
                  <iframe
                    className="mfp-iframe"
                    src={toEmbedUrl(url)}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
