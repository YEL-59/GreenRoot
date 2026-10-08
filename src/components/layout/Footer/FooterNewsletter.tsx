"use client";
import type { FormEvent } from "react";

import { useState } from "react";

export const FooterNewsletter = () => {
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
      <h3>Newsletter Signup</h3>
      <p>Subscribe to receive fresh updates, seasonal offers, and health tips directly</p>
      <div className="footer-newsletter-form-gold">
        {submitted ? (
          <p style={{ color: "var(--accent-color, #E5A823)", marginTop: "10px" }}>
            Thank you for subscribing!
          </p>
        ) : (
          <form id="newslettersForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="mail"
                className="form-control"
                id="mail"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-default btn-highlighted">
                Subscribe
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
