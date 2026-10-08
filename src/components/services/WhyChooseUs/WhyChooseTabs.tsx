"use client";

import React, { useState } from "react";

export const WhyChooseTabs = () => {
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab2");

  const tabContents = {
    tab1: {
      intro:
        "Organic farming is a natural approach to agriculture that avoids synthetic chemicals and embraces eco-friendly practices. It nurtures healthy soil and supports biodiversity.",
    },
    tab2: {
      intro:
        "Fresh produce harvested daily ensures maximum vitamin content, mouthwatering natural sweetness, and complete chemical-free safety for your household.",
    },
    tab3: {
      intro:
        "Our specialized direct delivery fleet ensures that delicate leafy greens and fresh fruits reach local stores and consumer homes in chilled, pristine condition.",
    },
  };

  return (
    <div
      className="why-choose-us-box tab-content wow fadeInUp"
      data-wow-delay="0.4s"
      id="myTabContent"
    >
      {/* Nav Tabs */}
      <div className="why-choose-nav">
        <ul className="nav nav-tabs flex items-center gap-2" role="tablist">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
              onClick={() => setActiveTab("tab1")}
              type="button"
              role="tab"
            >
              Organic Farming
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
              onClick={() => setActiveTab("tab2")}
              type="button"
              role="tab"
            >
              Fresh Produce
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
              onClick={() => setActiveTab("tab3")}
              type="button"
              role="tab"
            >
              Delivery & Supply
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="why-choose-item tab-pane fade show active">
        <div className="why-choose-tab-content">
          <p>{tabContents[activeTab].intro}</p>

          <div className="why-choose-info-item-list">
            <div className="why-choose-info-item">
              <div className="icon-box">
                <img src="/images/icon-why-choose-info-item-1.svg" alt="" />
              </div>
              <div className="why-choose-info-item-content">
                <h3>Natural Soil Enrichment</h3>
                <p>
                  Organic farming enhances soil health using compost, crop
                  rotation, and biological nutrients, ensuring long-term fertility.
                </p>
              </div>
            </div>

            <div className="why-choose-info-item">
              <div className="icon-box">
                <img src="/images/icon-why-choose-info-item-2.svg" alt="" />
              </div>
              <div className="why-choose-info-item-content">
                <h3>Eco-Friendly Pest & Weed Control</h3>
                <p>
                  Instead of harmful pesticides, organic methods use natural
                  predators and plant-based solutions, protecting biodiversity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
