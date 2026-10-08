"use client";

import { useLanguage } from "@/context/LanguageContext";

export type LanguageSwitcherProps = {
  variant?: "pill" | "compact" | "drawer";
  className?: string;
};

export const LanguageSwitcher = ({
  variant = "pill",
  className = "",
}: LanguageSwitcherProps) => {
  const { language, setLanguage, isBn } = useLanguage();

  if (variant === "compact") {
    return (
      <button
        onClick={() => setLanguage(isBn ? "en" : "bn")}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
          isBn
            ? "bg-[#002719] text-[#E8AF30] border-[#002719]"
            : "bg-stone-900 text-white border-stone-800"
        } ${className}`}
        title={isBn ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
      >
        <span className="text-sm">{isBn ? "🇧🇩" : "🇬🇧"}</span>
        <span>{isBn ? "বাংলা" : "EN"}</span>
        <i className="fa-solid fa-repeat text-[10px] opacity-70 ml-0.5"></i>
      </button>
    );
  }

  if (variant === "drawer") {
    return (
      <div className={`flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 ${className}`}>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-globe text-[#E8AF30]"></i>
          <span className="text-sm font-bold text-white">ভাষা / Language</span>
        </div>
        <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setLanguage("bn")}
            className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
              language === "bn"
                ? "bg-[#E8AF30] text-[#002719] shadow-sm"
                : "text-stone-300 hover:text-white"
            }`}
          >
            🇧🇩 বাংলা
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
              language === "en"
                ? "bg-[#E8AF30] text-[#002719] shadow-sm"
                : "text-stone-300 hover:text-white"
            }`}
          >
            🇬🇧 EN
          </button>
        </div>
      </div>
    );
  }

  // Default "pill" switcher for navbar
  return (
    <div
      className={`relative inline-flex items-center bg-stone-100 p-1 rounded-full border border-stone-200/90 shadow-inner ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        onClick={() => setLanguage("bn")}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all duration-200 ${
          language === "bn"
            ? "bg-[#002719] text-[#E8AF30] shadow-sm scale-100"
            : "text-stone-600 hover:text-stone-900"
        }`}
      >
        <span className="text-xs">🇧🇩</span>
        <span>বাংলা</span>
      </button>

      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all duration-200 ${
          language === "en"
            ? "bg-[#002719] text-[#E8AF30] shadow-sm scale-100"
            : "text-stone-600 hover:text-stone-900"
        }`}
      >
        <span className="text-xs">🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
};
