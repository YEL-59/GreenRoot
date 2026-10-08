"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { quickQuestions, findMatchingIntent, GuideIntent } from "./guideKnowledge";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  intent?: GuideIntent;
  timestamp: string;
}

interface GuideChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour: () => void;
}

export const GuideChatModal: React.FC<GuideChatModalProps> = ({
  isOpen,
  onClose,
  onStartTour,
}) => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: "আসসালামু আলাইকুম! আমি 'সবুজ সাথী' (GreenRoot Guide)। ওয়েবসাইট ব্রাউজ করতে, ইউজার ড্যাশবোর্ড খুঁজতে অথবা পণ্য অর্ডার করতে আমি আপনাকে গাইড করব। আপনি কী জানতে চান?",
      timestamp: "এখনই",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  const handleSendQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: "এখনই",
    };

    const intent = findMatchingIntent(queryText);

    const botMsg: Message = {
      id: `bot-${Date.now() + 1}`,
      sender: "bot",
      text: intent.responseBn,
      intent,
      timestamp: "এখনই",
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputValue("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendQuery(inputValue);
  };

  const handleActionClick = (url: string) => {
    onClose();
    router.push(url);
  };

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 z-[995] w-[92vw] sm:w-[420px] max-h-[82vh] flex flex-col bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,39,25,0.25)] border-2 border-[#E8AF30]/40 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#002719] via-[#003824] to-[#002719] p-4 text-white flex items-center justify-between border-b border-emerald-900/60">
        <div className="flex items-center gap-3">
          {/* Animated Mini Mascot Icon */}
          <div className="w-10 h-10 rounded-full bg-[#E8AF30] border-2 border-white flex items-center justify-center text-xl shadow-md">
            🌾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-sm text-white">সবুজ সাথী (GreenBot)</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-emerald-200/80">
              আপনার ব্যক্তিগত খামার সহকারী ও গাইড
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Close Guide"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>
      </div>

      {/* Interactive Website Tour Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-emerald-50 px-4 py-2.5 border-b border-stone-200/70 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-stone-800 font-bold">
          <span className="text-[#E8AF30] text-sm">🎯</span>
          <span>সম্পূর্ণ ওয়েবসাইট এক নজরে ঘুরে দেখতে চান?</span>
        </div>
        <button
          type="button"
          onClick={() => {
            onClose();
            onStartTour();
          }}
          className="px-2.5 py-1 rounded-lg bg-[#002719] hover:bg-emerald-800 text-white font-black text-[11px] transition-all shrink-0 active:scale-95"
        >
          ট্যুর শুরু করুন
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px] bg-stone-50/60 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs leading-relaxed ${
                m.sender === "user"
                  ? "bg-[#002719] text-white rounded-br-none"
                  : "bg-white text-stone-800 border border-stone-200/90 rounded-bl-none"
              }`}
            >
              <p className="whitespace-pre-line font-medium">{m.text}</p>

              {/* Bot Action Shortcut Button */}
              {m.intent?.actionUrl && (
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleActionClick(m.intent!.actionUrl!)}
                    className="py-1.5 px-3 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-black text-[11px] transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                  >
                    <span>{m.intent.actionLabelBn || "পেজ দেখুন"}</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </button>
                </div>
              )}
            </div>
            <span className="text-[9px] text-stone-400 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {/* Quick Suggestion Chips */}
        <div className="pt-2">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
            জনপ্রিয় প্রশ্নসমূহ (ক্লিক করুন):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendQuery(q.textBn)}
                className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 border border-stone-200/90 hover:border-emerald-300 font-bold text-[11px] transition-all text-left shadow-2xs active:scale-95"
              >
                {q.textBn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-white border-t border-stone-200/90 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="যেমন: ড্যাশবোর্ড কোথায়? বা দুধের দাম কত..."
          className="flex-1 px-3.5 py-2.5 rounded-2xl bg-stone-100 text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#E8AF30] border border-transparent placeholder:text-stone-400 font-medium"
        />
        <button
          type="submit"
          className="w-10 h-10 rounded-2xl bg-[#002719] hover:bg-[#E8AF30] text-white hover:text-[#002719] flex items-center justify-center transition-all shrink-0 active:scale-95 shadow-sm"
          aria-label="Send message"
        >
          <i className="fa-solid fa-paper-plane text-xs"></i>
        </button>
      </form>
    </div>
  );
};
