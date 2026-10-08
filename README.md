# GreenRoot 🌱 - Agriculture & Organic Farm E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.2.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-emerald?style=for-the-badge)](#)
[![Production Ready](https://img.shields.io/badge/Production-Grade_100%25-brightgreen?style=for-the-badge)](#)

A high-performance, enterprise-grade Next.js web application and e-commerce platform built for sustainable agriculture, farm-fresh produce delivery, and organic dairy products in Bangladesh.

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Folder Structure & Architecture](#-folder-structure--architecture)
- [Coding Standards & Conventions](#-coding-standards--conventions)
- [Production Grade Best Practices](#-production-grade-best-practices)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Git & Branching Workflow](#-git--branching-workflow)

---

## 🌿 Overview

**GreenRoot** bridges the gap between organic farms and urban households, delivering 100% pure raw cow milk, traditional bilona ghee, Sundarbans wild honey, cold-pressed mustard oil, and dawn-harvested seasonal produce directly to doorsteps.

The platform provides a consumer storefront, an interactive shopping experience, a customer order and cart management dashboard, and a full administrative operations console.

---

## ✨ Key Features

### 1. 🌐 Full Bilingual Localization (English & বাংলা)
- **Zero-Refresh Dynamic i18n**: Toggle effortlessly between **English** and **বাংলা (Bangla)** across the whole application.
- **Dedicated Translation Store**: Centralized dictionary in `src/i18n/translations.ts` paired with `LanguageContext` hook (`useLanguage()`).
- All product names, specifications, farm origin notes, buttons, invoices, and dashboards render natively in both languages.

### 2. 🛒 E-Commerce & Dedicated Cart System
- **Modern Product Catalog**: Categorized browsing, real-time search, price/rating sorting, and discount badges.
- **Dedicated Product Detail Pages (`/products/[slug]`)**: Pre-rendered statically with multi-angle galleries, interactive pack sizing (1 unit, Family Pack, Weekly Stock), instant savings calculation, cross-sell combo bundles, and verified buyer reviews.
- **Global Slide-Out Cart Drawer**: Fast slide-out cart drawer accessible anywhere across the site.
- **Dedicated Cart Page (`/cart`)**: 3-step checkout stepper, Delivery Zone calculation (Inside Dhaka ৳60 / Outside Dhaka ৳120), coupon voucher redemption (e.g., `GREEN10`), free shipping threshold meter, and order summary.
- **Streamlined Checkout (`/checkout`)**: Step-by-step customer details, delivery schedule, and payment options (Cash on Delivery, bKash, Nagad, Card).

### 3. 👤 Customer Dashboard & Cart Management System (`/dashboard`)
- **Customer Cart Hub (`/dashboard/cart`)**:
  - **Live Cart**: Real-time inspection and quantity synchronization.
  - **Family Baskets**: 1-click curated baskets (Weekly Organic Dairy, Monthly Pantry Essentials, Breakfast Bundle).
  - **Quick Reorder**: Instant one-click re-ordering from previous farm deliveries.
- **Live Order Tracking (`/dashboard/track/[id]`)**: Interactive route delivery progress map, carrier details, and real-time checkpoint timestamps.
- **Order History (`/dashboard/orders`)**: Complete invoice history with status badges (Processing, Out for Delivery, Delivered).
- **Address Book (`/dashboard/addresses`)**: Manage home, office, and family delivery locations.
- **GreenPoints Rewards (`/dashboard/rewards`)**: Earn loyalty points per purchase, unlocked tiers (Bronze, Silver, Gold), and claim reward discounts.
- **Recurring Subscriptions (`/dashboard/subscriptions`)**: Weekly recurring milk and vegetable basket delivery subscriptions.

### 4. 🛠️ Farm Admin Console (`/admin`)
- **Operations Dashboard**: Real-time sales metrics, order fulfillment counts, and conversion telemetry.
- **Product Management (`/admin/products`)**: Stock levels, price modification, and new product publishing modal.
- **Order Management (`/admin/orders`)**: Full lifecycle status updates (Pending → Packed → In Transit → Delivered).
- **Customer Directory (`/admin/customers`)**: Lifetime order spend, contact info, and activity histories.

### 5. 🤖 Interactive Farm Mascot Assistant
- **Character Mascot (`FarmGuideAssistant`)**: Floating interactive guide that provides tips, seasonal advice, guided tours, and agricultural inquiries.

---

## 📁 Folder Structure & Architecture

The project adheres to modern Next.js 15 App Router architecture with strict modularity:

```
GreenRoot/
├── .env.example                     # Environment configuration template
├── next.config.ts                   # Next.js config with security headers & optimization
├── package.json                     # Dependencies & project scripts
├── postcss.config.mjs               # PostCSS configuration
├── tailwind.config.ts               # Custom Tailwind theme tokens & color palettes
├── tsconfig.json                    # Strict TypeScript configuration
├── public/                          # Static assets served from root
│   ├── css/                         # Supplementary third-party vendor CSS
│   ├── images/                      # HD farm produce photos, logos & badges
│   └── webfonts/                    # FontAwesome icon font files
└── src/
    ├── app/                         # Next.js 15 App Router
    │   ├── layout.tsx               # Root Layout (Fonts, CartProvider, LanguageProvider, SEO)
    │   ├── page.tsx                 # Landing / Homepage
    │   ├── not-found.tsx            # Custom branded 404 error page
    │   ├── error.tsx                # Client error boundary with retry reset()
    │   ├── loading.tsx              # Animated seedling loading fallback
    │   ├── robots.ts                # Metadata route: dynamic robots.txt generator
    │   ├── sitemap.ts               # Metadata route: dynamic sitemap.xml generator
    │   ├── globals.css              # Global styles and Tailwind directives
    │   ├── about/                   # About Us page
    │   ├── admin/                   # Admin Operations Dashboard
    │   │   ├── content/             # Site content manager
    │   │   ├── customers/           # Customer management
    │   │   ├── orders/              # Orders lifecycle manager
    │   │   ├── products/            # Inventory & products manager
    │   │   └── settings/            # Store configuration
    │   ├── blog/                    # Agricultural insights & articles
    │   │   └── [slug]/              # Pre-rendered SSG blog article page
    │   ├── cart/                    # Dedicated shopping cart page & layout
    │   ├── checkout/                # Secure checkout page & layout
    │   ├── contact/                 # Contact & Farm visit inquiry page
    │   ├── dashboard/               # Customer account portal
    │   │   ├── addresses/           # Saved delivery addresses
    │   │   ├── cart/                # Dedicated user cart & basket reorder hub
    │   │   ├── orders/              # Order history & invoice views
    │   │   ├── rewards/             # Loyalty GreenPoints and tiers
    │   │   ├── subscriptions/       # Weekly farm recurring delivery management
    │   │   └── track/[id]/          # Live GPS delivery tracking map
    │   ├── products/                # Product shop catalog & filters
    │   │   └── [slug]/              # Pre-rendered SSG product detail page
    │   └── services/                # Farming & consultation services
    │       └── [slug]/              # SSG service detail pages
    ├── components/                  # Reusable UI component modules
    │   ├── about/                   # About overview, advantage, team, FAQ
    │   ├── admin/                   # Admin tables, metric cards, charts, modals
    │   ├── cart/                    # Cart drawer & items
    │   ├── common/                  # Shared components (LanguageSwitcher, ModernProductCard)
    │   ├── dashboard/               # Tracking map, user header, sidebar, order cards
    │   ├── guide/                   # Farm mascot guide, dialog, tour
    │   ├── home/                    # Hero, Story, WhyChooseUs, Testimonials, Sections
    │   ├── layout/                  # AppShell, Storefront Header, Footer, Topbar
    │   ├── products/                # ProductDetailView & product components
    │   ├── providers/               # Preloader, MagicCursor, TemplateEffects
    │   └── services/                # Services grid and detail cards
    ├── config/                      # Global configurations & constants
    │   └── site.ts                  # Site name, contact, social links, URLs
    ├── context/                     # Global React Contexts
    │   ├── CartContext.tsx          # Shopping cart state & local storage persistence
    │   └── LanguageContext.tsx      # Bilingual (BN / EN) state & switcher
    ├── data/                        # Domain mock databases & configurations
    │   ├── about.ts                 # Company & farming statistics
    │   ├── adminData.ts             # Admin sales telemetry & metrics
    │   ├── blog.ts                  # Organic agriculture articles
    │   ├── home.ts                  # Landing page content data
    │   ├── navigation.ts            # Primary & secondary menu routes
    │   ├── orders.ts                # Customer orders & order tracking seeds
    │   ├── products.ts              # 20+ organic products catalog
    │   ├── services.ts              # Farming services & workshops
    │   └── userProfile.ts           # Customer profile mock data
    ├── i18n/                        # Internationalization dictionary
    │   └── translations.ts          # Comprehensive English & Bengali translation map
    ├── lib/                         # Utilities & shared helpers
    │   ├── utils.ts                 # Formatting (currency, Bengali digits, classnames)
    │   └── animations/              # GSAP, WOW, Parallax, Counter utilities
    └── types/                       # TypeScript domain definitions
        └── index.ts                 # Interfaces for products, orders, cart, etc.
```

---

## 💎 Coding Standards & Conventions

To maintain a clean, maintainable, production-ready codebase, the following standards are strictly enforced:

### 1. Functional Component Format
Components use arrow function declarations with explicit, strongly-typed props:

```tsx
type ProductCardProps = {
  product: Product;
  featured?: boolean;
};

export const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  return (
    <div className="card">
      <h3>{product.title}</h3>
    </div>
  );
};
```

### 2. Forbidden Patterns
- ❌ **No `React.FC`**: Avoid `React.FC` or `React.FunctionComponent`.
- ❌ **No `import React from "react"`**: React 19 / Next.js uses the modern JSX transform; importing React is redundant and increases bundle overhead.
- ❌ **No Unused Any**: All props and data must have explicit TypeScript types from `src/types/`.

### 3. Separation of Concerns
- **Server Components by Default**: Pages in `src/app/` are Server Components whenever possible, exporting `generateStaticParams()` and `generateMetadata()`.
- **Client Components Isolated**: Interactive state hooks (`useState`, `useCart`, `useLanguage`) are isolated into dedicated `"use client"` components inside `src/components/`.

---

## 🛡️ Production Grade Best Practices

| Category | Implementation |
|---|---|
| **Build Optimization** | 61/61 routes pre-rendered statically with SSG (`generateStaticParams`). |
| **HTTP Security Headers** | Injected in `next.config.ts`: `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`, and disabled `X-Powered-By`. |
| **SEO & Crawlers** | Native dynamic `sitemap.ts` and `robots.ts` with disallow rules for `/admin/` and `/dashboard/`. |
| **Social OpenGraph** | Dynamic `openGraph` and `twitter` meta tags on all static and product detail pages. |
| **Error Handling** | Client error boundary (`error.tsx`) with recovery mechanism + custom branded `not-found.tsx`. |
| **Responsive UX** | 100% mobile-friendly across iPhone, Android, Tablet, Laptop, and 4K displays. |
| **Accessibility & Semantics** | Semantic HTML5 (`<header>`, `<main>`, `<article>`, `<nav>`, `<footer>`) with `lang="bn"` attribute and `aria-label` tags. |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.2.0](https://nextjs.org/) (App Router, Server Components, SSG)
- **Library**: [React 19.0.0](https://react.dev/)
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom Design System
- **Icons**: FontAwesome 6 Free + Lucide React
- **Animations**: GSAP (GreenSock) + Custom IntersectionObserver hooks
- **State Management**: React Context API (`CartContext`, `LanguageContext`)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.18.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/GreenRoot.git
cd GreenRoot
npm install
```

### 3. Environment Variables
Copy `.env.example` to create your local `.env`:

```bash
cp .env.example .env
```

Edit `.env` to configure your site URL:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Launches the Next.js local development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles the production bundle and generates all 61 static SSG pages. |
| `npm run start` | Runs the compiled production server. |
| `npx tsc --noEmit` | Executes TypeScript type-checking across all files without emitting JS. |

---

## 🚢 Deployment

### Deploying on Vercel (Recommended)
1. Push your code to GitHub / GitLab.
2. Import the repository into the [Vercel Dashboard](https://vercel.com/).
3. Set the Environment Variable `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://greenroot.farm`).
4. Click **Deploy**. Vercel will run `npm run build` and distribute the SSG pages globally via Edge CDN.

### Deploying on Self-Hosted Node.js / Docker
1. Build the production build:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm run start
   ```
3. Use a reverse proxy (Nginx or Caddy) with SSL certificate (Let's Encrypt).

---

## 🌿 Git & Branching Workflow

```
main (Production Releases)
 │
 └── dev (Integration Branch)
      │
      ├── feature/bilingual-i18n (Active feature branch)
      ├── feature/cart-management
      └── fix/seo-optimizations
```

- **`main`**: Production code deployed to live domain.
- **`dev`**: Main integration branch for tested features.
- **`feature/*`**: Feature branches for specific tasks and user requirements.

---

## 📄 License

© 2026 GreenRoot Agro & Dairy Ltd. All Rights Reserved.
