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
    children: [
      { label: "Blog Grid", href: "/blog" },
      { label: "Blog Details", href: "/blog/true-benefits-of-organic" },
    ],
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
    title: "Products & Shop",
    items: [
      { label: "Our Products", href: "/products" },
      { label: "Product Details", href: "/products/organic-basket" },
    ],
  },
  {
    title: "Company & People",
    items: [
      { label: "Our Team", href: "/team" },
      { label: "Team Details", href: "/team/ramesh-patel" },
      { label: "Pricing Plan", href: "/pricing" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Media & Help",
    items: [
      { label: "Image Gallery", href: "/image-gallery" },
      { label: "Video Gallery", href: "/video-gallery" },
      { label: "FAQs", href: "/faqs" },
      { label: "404 Error", href: "/404" },
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
