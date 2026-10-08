"use client";

import React, { useState } from "react";
import { CharacterMascot } from "./CharacterMascot";
import { GuideChatModal } from "./GuideChatModal";
import { InteractiveTour } from "./InteractiveTour";

export const FarmGuideAssistant: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);

  return (
    <>
      {/* Floating Animated Mascot Button & Speech Bubble */}
      <CharacterMascot
        isOpen={isChatOpen || isTourActive}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Interactive Chat & Intent Guide Modal */}
      <GuideChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onStartTour={() => {
          setIsChatOpen(false);
          setIsTourActive(true);
        }}
      />

      {/* Interactive Website Walkthrough Spotlight Tour */}
      <InteractiveTour
        isActive={isTourActive}
        onClose={() => setIsTourActive(false)}
      />
    </>
  );
};
