import type { NavLink } from "@/types";

export interface DrawerCategory {
  title: string;
  items: NavLink[];
}

export const mainNav: NavLink[] = [
  {
    label: "Home",
    labelBn: "হোম",
    href: "/",
  },
  {
    label: "About Us",
    labelBn: "আমাদের কথা",
    href: "/about",
  },
  {
    label: "Farm Shop",
    labelBn: "খামার শপ",
    href: "/products",
    children: [
      { label: "All Farm Products", labelBn: "সকল খামার পণ্য", href: "/products" },
      { label: "Milk & Dairy", labelBn: "দুধ ও গাওয়া ঘি", href: "/products?category=milk-dairy" },
      { label: "Premium Khejur", labelBn: "মেডজুল ও আজওয়া খেজুর", href: "/products?category=khejur" },
      { label: "Pure Spices & Oils", labelBn: "ঘানি ভাঙা তেল ও খাঁটি মশলা", href: "/products?category=mosla-oil" },
      { label: "Raw Honey & Gur", labelBn: "সুন্দরবন মধু ও খাঁটি গুড়", href: "/products?category=honey-gur" },
      { label: "Fresh Shak & Veggies", labelBn: "তাজা শাক ও বিষমুক্ত সবজি", href: "/products?category=shak-vegetables" },
      { label: "Deshi Fish & Protein", labelBn: "দেশি মাছ ও ডিম", href: "/products?category=deshi-fish-meat" },
      { label: "Shopping Bag (Cart)", labelBn: "শপিং ব্যাগ ও কার্ট", href: "/cart" },
    ],
  },
  {
    label: "Services",
    labelBn: "সেবাসমূহ",
    href: "/services",
    children: [
      { label: "All Services", labelBn: "সকল সার্ভিস", href: "/services" },
      { label: "Organic Farming", labelBn: "অর্গানিক ফার্মিং", href: "/services/organic-farming" },
      { label: "Service Details", labelBn: "সার্ভিস বিস্তারিত", href: "/services/organic-vegetable-farming" },
      { label: "Farm Tours", labelBn: "খামার ট্যুর", href: "/services/farm-tours" },
    ],
  },
  {
    label: "Blog",
    labelBn: "কৃষি ব্লগ",
    href: "/blog",
  },
  {
    label: "Contact Us",
    labelBn: "যোগাযোগ",
    href: "/contact",
  },
];

export const drawerCategories: DrawerCategory[] = [
  {
    title: "Core Services",
    items: [
      { label: "Service Details", href: "/services/organic-vegetable-farming" },
      { label: "Farm Tours", href: "/services/farm-tours" },
      { label: "Agricultural Consulting", href: "/services/agricultural-consulting" },
      { label: "Produce Delivery", href: "/services/fresh-produce-delivery" },
    ],
  },
  {
    title: "Portals & Dashboards",
    items: [
      { label: "User Dashboard (গ্রাহক পোর্টাল)", href: "/dashboard" },
      { label: "Order Cart Management (কার্ট সিস্টেম)", href: "/dashboard/cart" },
      { label: "Live Order Tracking Map", href: "/dashboard/track/GR-2026-8841" },
      { label: "My Orders & History", href: "/dashboard/orders" },
      { label: "Farm Subscriptions", href: "/dashboard/subscriptions" },
      { label: "Admin HQ Console (খামার অ্যাডমিন)", href: "/admin" },
      { label: "Products & Stock Manager", href: "/admin/products" },
      { label: "Orders Fulfillment", href: "/admin/orders" },
    ],
  },
  {
    title: "Products & Shop",
    items: [
      { label: "Farm Fresh Shop", href: "/products" },
      { label: "Shopping Bag & Cart", href: "/cart" },
      { label: "Pure Raw Cow Milk", href: "/products/pure-raw-cow-milk" },
      { label: "Sundarban Wild Honey", href: "/products/sundarban-raw-wild-honey" },
      { label: "Wood-Mill Mustard Oil", href: "/products/wood-mill-mustard-oil" },
      { label: "Checkout", href: "/checkout" },
    ],
  },
  {
    title: "Company & Help",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Blog & Insights", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export const footerQuickLinks: NavLink[] = [
  { label: "Homepage", labelBn: "হোমপেজ", href: "/" },
  { label: "About Us", labelBn: "আমাদের সম্পর্কে", href: "/about" },
  { label: "Our Products", labelBn: "আমাদের পণ্য", href: "/products" },
  { label: "Contact Us", labelBn: "যোগাযোগ", href: "/contact" },
];

export const footerServiceLinks: NavLink[] = [
  { label: "Farm Tours", labelBn: "খামার পরিদর্শন", href: "/services/farm-tours" },
  { label: "Organic Farming", labelBn: "অর্গানিক চাষাবাদ", href: "/services/organic-farming" },
  { label: "Agricultural Consulting", labelBn: "কৃষি পরামর্শ সেবা", href: "/services/agricultural-consulting" },
  { label: "Fresh Produce Delivery", labelBn: "ফ্রেশ হোম ডেলিভারি", href: "/services/fresh-produce-delivery" },
];

export const footerLegalLinks: NavLink[] = [
  { label: "Privacy Policy", labelBn: "গোপনীয়তা নীতি", href: "#" },
  { label: "Terms & Conditions", labelBn: "শর্তাবলী ও নিয়ম", href: "#" },
];
