import type { NavLink } from "@/types";

export const mainNav: NavLink[] = [
  {
    label: "Home",
    href: "/",
    children: [
      { label: "Home - Version 1", href: "/" },
      { label: "Home - Version 2", href: "/" },
      { label: "Home - Version 3", href: "/" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  {
    label: "Pages",
    href: "#",
    children: [
      { label: "Service Details", href: "/services/organic-vegetable-farming" },
      { label: "Blog Details", href: "/blog/true-benefits-of-organic" },
      { label: "Our Products", href: "/products" },
      { label: "Product Details", href: "/products/organic-basket" },
      { label: "Our Team", href: "/team" },
      { label: "Team Details", href: "/team/ramesh-patel" },
      { label: "Pricing Plan", href: "/pricing" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Image Gallery", href: "/image-gallery" },
      { label: "Video Gallery", href: "/video-gallery" },
      { label: "FAQs", href: "/faqs" },
      { label: "404", href: "/404" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
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
