import type { NavLink } from "@/types";

export interface DrawerCategory {
  title: string;
  items: NavLink[];
}

export const mainNav: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Farm Shop",
    href: "/products",
    children: [
      { label: "All Farm Products (সব পণ্য)", href: "/products" },
      { label: "Milk & Dairy (দুধ ও গাওয়া ঘি)", href: "/products?category=milk-dairy" },
      { label: "Premium Khejur (মেডজুল ও আজওয়া)", href: "/products?category=khejur" },
      { label: "Pure Spices & Oils (ঘানি ভাঙা তেল)", href: "/products?category=mosla-oil" },
      { label: "Raw Honey & Gur (সুন্দরবন মধু ও গুড়)", href: "/products?category=honey-gur" },
      { label: "Fresh Shak & Veggies (তাজা শাকসবজি)", href: "/products?category=shak-vegetables" },
      { label: "Deshi Fish & Protein (দেশি মাছ ও ডিম)", href: "/products?category=deshi-fish-meat" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services" },
      { label: "Organic Farming", href: "/services/organic-farming" },
      { label: "Service Details", href: "/services/organic-vegetable-farming" },
      { label: "Farm Tours", href: "/services/farm-tours" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact Us",
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
  { label: "Homepage", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Products", href: "/products" },
  { label: "Contact Us", href: "/contact" },
];

export const footerServiceLinks: NavLink[] = [
  { label: "Farm Tours", href: "/services/farm-tours" },
  { label: "Organic Farming", href: "/services/organic-farming" },
  { label: "Agricultural Consulting", href: "/services/agricultural-consulting" },
  { label: "Fresh Produce Delivery", href: "/services/fresh-produce-delivery" },
];

export const footerLegalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];
