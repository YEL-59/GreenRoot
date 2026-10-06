import type { SocialLink } from "@/types";

export const siteConfig = {
  name: "GreenRoot",
  title: "GreenRoot - Agriculture & Organic Farm",
  description:
    "Discover the true taste of nature with our farm-fresh, chemical-free, and sustainably grown produce.",
  phone: "+00 123 456 789",
  phoneHref: "tel:123456789",
  email: "info@greenrootfarm.com",
  address: "124 Farmview Road, Green Valley, CA",
  hours: "Mon - Sat: 8:00 AM - 6:00 PM",
  logo: "/images/logo-dark.svg",
  logoLight: "/images/logo.svg",
};

export const socialLinks: SocialLink[] = [
  { icon: "fa-brands fa-facebook-f", href: "#", label: "Facebook" },
  { icon: "fa-brands fa-dribbble", href: "#", label: "Dribbble" },
  { icon: "fa-brands fa-instagram", href: "#", label: "Instagram" },
  { icon: "fa-brands fa-linkedin-in", href: "#", label: "LinkedIn" },
];
