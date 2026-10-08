"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { tourSteps } from "./guideKnowledge";

interface InteractiveTourProps {
  isActive: boolean;
  onClose: () => void;
}

export function InteractiveTour({
  isActive,
  onClose,
}: InteractiveTourProps) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isActive) return null;

  const currentStep = tourSteps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < tourSteps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      if (tourSteps[nextIndex].route) {
        router.push(tourSteps[nextIndex].route!);
      }
    } else {
      onClose();
      setCurrentStepIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      if (tourSteps[prevIndex].route) {
        router.push(tourSteps[prevIndex].route!);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300 select-none">
      <div className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#E8AF30] relative overflow-hidden">
        {/* Top Mascot Accent Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-[#002719] text-white flex items-center justify-center text-2xl shadow-md border border-[#E8AF30]">
              🌾
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full inline-block mb-0.5">
                {currentStep.badgeBn}
              </span>
              <h3 className="font-black text-lg text-stone-900">
                {currentStep.titleBn}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
            aria-label="Close Tour"
          >
            ✕
          </button>
        </div>

        {/* Step Content */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 mb-6">
          <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
            {currentStep.descriptionBn}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1.5">
            {tourSteps.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === currentStepIndex
                    ? "w-8 bg-[#E8AF30]"
                    : "w-2 bg-stone-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-stone-500 font-mono">
            ধাপ {currentStepIndex + 1} / {tourSteps.length}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              currentStepIndex === 0
                ? "text-stone-300 cursor-not-allowed"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            ← পূর্ববর্তী
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#002719] to-emerald-900 hover:from-[#E8AF30] hover:to-amber-400 text-white hover:text-[#002719] font-black text-xs transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <span>
              {currentStepIndex === tourSteps.length - 1
                ? "ট্যুর সমাপ্ত করুন ✓"
                : "পরবর্তী ধাপ →"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
