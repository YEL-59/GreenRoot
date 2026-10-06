/** Shared types for the Soilux (GreenRoot) Next.js conversion */

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Author {
  name: string;
  role: string;
  image: string;
}

export interface CounterStat {
  /** numeric part animated by the counter effect */
  value: string;
  /** suffix rendered after the counter, e.g. "+", "k+" */
  suffix?: string;
  label: string;
  icon?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
  icon: string;
  href: string;
}

export interface IconTitleItem {
  icon: string;
  title: string;
  description?: string;
}

export interface SkillItem {
  label: string;
  percent: number;
}

export interface PricingPlan {
  icon: string;
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  href: string;
}

export interface HowWorksStep {
  no: string;
  title: string;
  description: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  href: string;
  socials: SocialLink[];
}

export interface SocialLink {
  icon: string; // font-awesome class, e.g. "fa-brands fa-facebook-f"
  href: string;
  label: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  content: string;
  rating: number;
  author: Author;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  href: string;
}
