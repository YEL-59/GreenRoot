"use client";
import type { FormEvent } from "react";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const FooterNewsletter = () => {
  const { isBn } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="footer-newsletter-box-gold order-xl-2 order-3">
      <h3>{isBn ? "খামার নিউজলেটার" : "Newsletter Signup"}</h3>
      <p>
        {isBn
          ? "তাজা খামার অফার, মৌসুমী ফসল ও স্বাস্থ্যকর টিপস পেতে যুক্ত থাকুন"
          : "Subscribe to receive fresh updates, seasonal offers, and health tips directly"}
      </p>
      <div className="footer-newsletter-form-gold">
        {submitted ? (
          <p style={{ color: "var(--accent-color, #E5A823)", marginTop: "10px" }}>
            {isBn ? "ধন্যবাদ! আপনি যুক্ত হয়েছেন।" : "Thank you for subscribing!"}
          </p>
        ) : (
          <form id="newslettersForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="mail"
                className="form-control"
                id="mail"
                placeholder={isBn ? "আপনার ইমেইল লিখুন" : "Enter Your Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-default btn-highlighted">
                {isBn ? "যুক্ত হোন" : "Subscribe"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
