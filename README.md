# GreenRoot 🌱

A modern, responsive Next.js 15 & TypeScript web application for Agriculture & Organic Farming, meticulously crafted with clean Parent-Child component architecture and custom design styling.

## 🌿 Overview

GreenRoot is built to deliver an organic farm and agricultural landing experience with rich animations, dynamic counters, interactive skill meters, video lightboxes, and smooth navigation.

### ✨ Features
- **Next.js 15 App Router & TypeScript**: Fast, type-safe, and modular code structure.
- **Parent-Child Component Pattern**: Highly reusable, organized components in `src/components/layout/`, `src/components/home/`, and `src/components/common/`.
- **Soilux Theme Aesthetics**: Beautiful primary green accents, warm earthy colors, and crisp typography (Plus Jakarta Sans, Manrope, Covered By Your Grace).
- **Interactive UI Effects**:
  - Interactive Preloader & Custom Animated Cursor
  - Animated stat counters with dynamic intersection observation
  - Dynamic skill bars with percentage animation
  - FAQ accordion
  - Responsive mobile navigation with toggles
  - Video lightbox modal & quote inquiry popups
- **Centralized Data & Config**: Structured data separated into `src/data/` and `src/config/` for easy maintainability.

---

## 📁 Project Architecture

```
GreenRoot/
├── public/
│   ├── css/          # Bootstrap grid, FontAwesome, Animate, Magnific Popup
│   ├── images/       # High-definition agricultural assets & SVG icons
│   └── webfonts/     # FontAwesome webfonts (WOFF2/TTF)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── common/   # Section titles, modals, social links, buttons
│   │   ├── home/     # Hero, About, Services, WhyChooseUs, Team, FAQ, etc.
│   │   ├── layout/   # Header, Footer, Topbar, Navigation
│   │   └── providers/# Preloader, MagicCursor, TemplateEffects
│   ├── config/       # Site metadata & global configurations
│   ├── data/         # Dynamic content data (home, navigation)
│   └── types/        # TypeScript interfaces and type definitions
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port indicated in your console) with your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🌿 Branching Strategy
- **`main`**: Production-ready releases
- **`dev`**: Active development and integration branch
- **`feature/*`**: Feature-specific development branches merged via Pull Requests or direct merges into `dev`
