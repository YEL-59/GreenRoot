"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

type CharacterMascotProps = {
  isOpen: boolean;
  onToggle: () => void;
  unreadCount?: number;
};

export const CharacterMascot = ({
  isOpen,
  onToggle,
  unreadCount = 1,
}: CharacterMascotProps) => {
  const { isBn } = useLanguage();
  const [speechBubbleText, setSpeechBubbleText] = useState("");
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);

  // Rotate speech bubble hints periodically
  useEffect(() => {
    const hints = isBn
      ? [
          "ড্যাশবোর্ড বা পণ্য খুঁজছেন? ক্লিক করুন!",
          "লাইভ জিপিএস অর্ডারিং দেখতে চান?",
          "আমি আপনার গ্রীনরুট ফার্ম গাইড!",
          "খাঁটি দুধ ও ঘি সম্পর্কে জানুন!",
        ]
      : [
          "Need help finding products or dashboard?",
          "Want to try live GPS order tracking?",
          "I'm your GreenRoot farm assistant!",
          "Explore fresh grass-fed dairy & honey!",
        ];

    setSpeechBubbleText(hints[0]);
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % hints.length;
      setSpeechBubbleText(hints[index]);
      setShowSpeechBubble(true);
    }, 8000);

    return () => clearInterval(interval);
  }, [isBn]);

  return (
    <div className="fixed bottom-6 right-6 z-[990] flex flex-col items-end select-none">
      {/* Speech Bubble Hint (Visible when chat dialog is closed) */}
      {!isOpen && showSpeechBubble && (
        <div className="mb-2 relative animate-bounce duration-1000">
          <div className="bg-[#002719] text-white text-xs font-bold py-2 px-3.5 rounded-2xl shadow-xl border border-[#E8AF30]/40 flex items-center gap-2 max-w-[240px]">
            <span className="text-[#E8AF30] text-sm">💡</span>
            <span className="leading-snug">{speechBubbleText}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowSpeechBubble(false);
              }}
              className="text-stone-400 hover:text-white text-[10px] ml-1 p-0.5"
              aria-label="Dismiss hint"
            >
              ✕
            </button>
          </div>
          {/* Bubble Pointer Arrow */}
          <div className="absolute right-7 -bottom-1.5 w-3 h-3 bg-[#002719] border-r border-b border-[#E8AF30]/40 transform rotate-45" />
        </div>
      )}

      {/* Floating Animated Mascot Button */}
      <button
        type="button"
        onClick={onToggle}
        className="group relative flex items-center justify-center focus:outline-none"
        aria-label="Open Interactive Guide Assistant"
      >
        {/* Ambient Glowing Rings */}
        <span className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500/30 to-[#E8AF30]/30 blur-lg group-hover:blur-xl transition-all animate-pulse" />

        {/* Mascot Avatar Container */}
        <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-emerald-700 via-[#002719] to-emerald-950 p-1.5 shadow-[0_10px_30px_rgba(0,39,25,0.4)] border-2 border-[#E8AF30] transition-transform duration-300 group-hover:scale-108 group-active:scale-95">
          {/* Animated SVG Character */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Straw Hat Brim */}
            <ellipse cx="50" cy="30" rx="36" ry="10" fill="#E8AF30" />
            <path
              d="M26 29C26 18 36 10 50 10C64 10 74 18 74 29"
              fill="#D49D24"
              stroke="#B38014"
              strokeWidth="2"
            />
            {/* Hat Green Ribbon with Sprout */}
            <path d="M28 29H72V33H28V29Z" fill="#15803D" />
            <path
              d="M50 10C50 5 54 2 58 4C58 8 54 10 50 10Z"
              fill="#4ADE80"
            />

            {/* Character Face/Body */}
            <circle cx="50" cy="56" r="28" fill="#FDE047" />

            {/* Rosy Cheeks */}
            <circle cx="33" cy="62" r="5" fill="#F87171" opacity="0.6" />
            <circle cx="67" cy="62" r="5" fill="#F87171" opacity="0.6" />

            {/* Blinking Eyes */}
            <g className="animate-pulse">
              <ellipse cx="38" cy="52" rx="4" ry="5.5" fill="#1E293B" />
              <circle cx="36.5" cy="50" r="1.5" fill="#FFFFFF" />
              <ellipse cx="62" cy="52" rx="4" ry="5.5" fill="#1E293B" />
              <circle cx="60.5" cy="50" r="1.5" fill="#FFFFFF" />
            </g>

            {/* Cheerful Smile */}
            <path
              d="M41 64C44 70 56 70 59 64"
              stroke="#1E293B"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Farmer Overalls Straps */}
            <path d="M30 80L38 68H44L38 84" fill="#002719" />
            <path d="M70 80L62 68H56L62 84" fill="#002719" />

            {/* Waving Hand (Animated CSS rotate) */}
            <g className="origin-bottom-left transition-transform duration-300 group-hover:rotate-12">
              <ellipse cx="80" cy="68" rx="7" ry="5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
              <circle cx="84" cy="65" r="2.5" fill="#FDE047" />
            </g>
          </svg>

          {/* Active Status Live Badge */}
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
          </span>
        </div>

        {/* Unread Alert Badge (if any) */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -left-1 px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-black text-[10px] shadow-md border border-white">
            গাইড
          </span>
        )}
      </button>
    </div>
  );
};
