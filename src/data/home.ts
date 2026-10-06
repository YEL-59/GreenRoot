import type {
  Author,
  BlogPost,
  CounterStat,
  FaqItem,
  HowWorksStep,
  IconTitleItem,
  PricingPlan,
  ServiceItem,
  SkillItem,
  TeamMember,
  Testimonial,
} from "@/types";
import { socialLinks } from "@/config/site";

/* ---------------- Shared ---------------- */
export const clientAvatars = [
  "/images/author-1.jpg",
  "/images/author-2.jpg",
  "/images/author-3.jpg",
  "/images/author-4.jpg",
];

/* ---------------- Hero ---------------- */
export const heroData = {
  subtitle: "Healthy Farms, Healthy Lives",
  title: "Growing pure organic goodness for a healthier tomorrow",
  description:
    "Discover the true taste of nature with our farm-fresh, chemical-free, and sustainably grown produce. From nutrient-rich vegetables to naturally ripened fruits,",
  bigTitle: "Soilux",
  image: "/images/hero-image-gold.png",
  primaryBtn: { label: "Visit Our Farm", href: "/contact" },
  secondaryBtn: { label: "View Our Services", href: "/services" },
};

/* ---------------- About ---------------- */
export const aboutData = {
  subtitle: "About Our Farm",
  title: "A deep look into our commitment to pure, natural, and eco-friendly agricultural practices",
  description:
    "Welcome to our organic farm, a place where nature, purity, and passion come together to create food you can trust. Our story began with a simple belief: healthy farming leads to healthy living.",
  button: { label: "More About Us", href: "/about" },
  image: "/images/about-us-img-gold.jpg",
  mission: {
    icon: "/images/icon-about-us-item-1-gold.svg",
    title: "Our Mission",
    description:
      "Our mission is to cultivate pure, and nutrient-rich food using sustainable agricultural practices that respect both",
  },
  vision: {
    icon: "/images/icon-about-us-item-2-gold.svg",
    title: "Our Vision",
    description:
      "Our vision is to become a leading symbol of sustainable farming, inspiring a global shift toward responsible food production.",
  },
  counters: [
    { value: "10", suffix: "+", label: "Years of Farming", icon: "/images/icon-about-counter-item-1-gold.svg" },
    { value: "25", suffix: "+", label: "Years of Farming", icon: "/images/icon-about-counter-item-2-gold.svg" },
  ] satisfies CounterStat[],
  rating: "4.5",
  review: {
    text: "I have been purchasing organic produce from this farm for over a year now,",
    href: "/contact",
  },
  footer: {
    tag: "Free",
    text: "Where Nature Meets Quality - ",
    linkLabel: "Discover Our Organic Farming Services!",
    href: "/services",
  },
};

/* ---------------- Services ---------------- */
const serviceDesc =
  "Fresh, pesticide-free vegetables grown using natural compost and sustainable soil practices to ensure";

export const servicesData: ServiceItem[] = [
  { title: "Organic Vegetable Farming", description: serviceDesc, image: "/images/service-image-1-gold.jpg", icon: "/images/icon-service-item-1-gold.svg", href: "/services/organic-vegetable-farming" },
  { title: "Seasonal Fruit Cultivation", description: serviceDesc, image: "/images/service-image-2-gold.jpg", icon: "/images/icon-service-item-2-gold.svg", href: "/services/seasonal-fruit-cultivation" },
  { title: "Medicinal Plant Farming", description: serviceDesc, image: "/images/service-image-3-gold.jpg", icon: "/images/icon-service-item-3-gold.svg", href: "/services/medicinal-plant-farming" },
  { title: "Dairy & Livestock Care", description: serviceDesc, image: "/images/service-image-4-gold.jpg", icon: "/images/icon-service-item-4-gold.svg", href: "/services/dairy-livestock-care" },
];

export const serviceTags = [
  "Natural Vegetables",
  "Fresh Organic Food",
  "Sustainable Agriculture",
  "Chemical-Free Farming",
];

/* ---------------- Why Choose Us ---------------- */
export const whyChooseData = {
  subtitle: "Why Choose Us",
  title: "Healthy food choices start with our organic farming",
  description:
    "We are committed to delivering pure, organic, and sustainably grown produce that nurtures your health and protects the environment. Our farming practices are completely chemical-free,",
  image1: "/images/why-choose-image-1-gold.jpg",
  image2: "/images/why-choose-image-2-gold.jpg",
  counter: { value: "20", suffix: "+", label: "Years of Farming Experience", icon: "/images/icon-why-choose-counter-box.svg" } satisfies CounterStat,
  features: [
    { icon: "/images/icon-why-choose-item-1-gold.svg", title: "100% Pure & Organic Produce" },
    { icon: "/images/icon-why-choose-item-2-gold.svg", title: "Sustainable Farming Practices" },
  ] satisfies IconTitleItem[],
  skills: [
    { label: "Quality Tested", percent: 75 },
    { label: "Passionate Farmers", percent: 90 },
  ] satisfies SkillItem[],
  button: { label: "Get in Touch", href: "/contact" },
  author: { name: "Ralph Edwards", role: "Agronomist", image: "/images/author-1.jpg" } satisfies Author,
};

/* ---------------- Our Story ---------------- */
export const ourStoryData = {
  subtitle: "Our Story",
  title: "Our organic farming journey rooted in nature",
  description:
    "We are committed to delivering pure, organic, and sustainably grown produce that nurtures your health and protects the environment. Our farming practices are completely chemical-free,",
  videoUrl: "https://www.youtube.com/watch?v=Y-x0efG1seA",
};

/* ---------------- What We Do ---------------- */
export const whatWeDoData = {
  subtitle: "Wht We Do",
  title: "Providing quality organic food for every family",
  description:
    "At our farm, we focus on growing fresh, organic, and chemical-free produce while protecting the environment. From nutrient-rich vegetables and fruits to medicinal herbs and ethically",
  image1: "/images/what-we-image-1-gold.jpg",
  image2: "/images/what-we-image-2-gold.jpg",
  steps: [
    { icon: "/images/icon-what-we-item-1-gold.svg", title: "Grow Fresh Organic Produce", description: "We cultivate seasonal vegetables, fruits, herbs, and grains using 100% natural, chemical-free farming methods." },
    { icon: "/images/icon-what-we-item-2-gold.svg", title: "Protect Soil and Environment", description: "Through composting, crop rotation, and natural fertilizers, we keep the soil healthy and support long-term sustainability." },
    { icon: "/images/icon-what-we-item-3-gold.svg", title: "Use Eco-Friendly Water Techniques", description: "Our farm relies on drip irrigation and rainwater harvesting to conserve water while nourishing crops effectively." },
  ] satisfies IconTitleItem[],
  button: { label: "Contact Us", href: "/contact" },
  counters: [
    { value: "500", suffix: "+", label: "Acres of Organic Farmland" },
    { value: "1", suffix: "k+", label: "KG Fresh Produce Daily" },
    { value: "365", suffix: "+", label: "Days of Sustainable Farming" },
    { value: "50", suffix: "k+", label: "Happy Customer Families" },
    { value: "800", suffix: "+", label: "Farm Visits Annually" },
  ] satisfies CounterStat[],
};

/* ---------------- Pricing ---------------- */
const pricingFeatures = [
  "Free farm tour pass (once a year)",
  "Special festive produce add every month",
  "Weekly delivery of fruits & vegetable",
  "Special discounts on dairy products",
];
const pricingDesc = "Choose from our flexible and affordable pricing plans designed to bring fresh,";

export const pricingPlans: PricingPlan[] = [
  { icon: "/images/icon-pricing-item-1-gold.svg", title: "Basic Organic Basket", description: pricingDesc, price: "$49.00", period: "/Monthly", features: pricingFeatures, href: "/contact" },
  { icon: "/images/icon-pricing-item-2-gold.svg", title: "Standard Organic Basket", description: pricingDesc, price: "$59.00", period: "/Monthly", features: pricingFeatures, href: "/contact" },
  { icon: "/images/icon-pricing-item-3-gold.svg", title: "Premium Farm Harvest Box", description: pricingDesc, price: "$69.00", period: "/Monthly", features: pricingFeatures, href: "/contact" },
];

export const pricingBenefits = [
  { icon: "/images/icon-pricing-benefit-1.svg", label: "Get 30 day free trial" },
  { icon: "/images/icon-pricing-benefit-2.svg", label: "No any hidden fees pay" },
  { icon: "/images/icon-pricing-benefit-3.svg", label: "You can cancel anytime " },
];

/* ---------------- How It Works ---------------- */
export const howItWorksSteps: HowWorksStep[] = [
  { no: "01", title: "We Grow Everything", description: "Our crops are cultivated using natural fertilizers, compost, and eco-friendly methods that protect soil", image: "/images/how-works-item-image-1-gold.jpg" },
  { no: "02", title: "Harvested at the Right Time", description: "Every fruit, vegetable, and herb is harvested at peak ripeness to maintain maximum nutrition,", image: "/images/how-works-item-image-2-gold.jpg" },
  { no: "03", title: "Quality Checked", description: "Each batch goes through strict quality checks before being packed in eco-friendly materials to keep it fresh", image: "/images/how-works-item-image-3-gold.jpg" },
  { no: "04", title: "Direct Delivery", description: "Once packed, your organic produce is delivered straight to your home, ensuring you get farm-fresh food", image: "/images/how-works-item-image-4-gold.jpg" },
];

/* ---------------- Team ---------------- */
export const teamMembers: TeamMember[] = [
  { name: "Ramesh Patel", role: "Head Farmer", image: "/images/team-1-gold.jpg", href: "/team/ramesh-patel", socials: socialLinks },
  { name: "Anita Desai", role: "Soil & Crop Specialist", image: "/images/team-2-gold.jpg", href: "/team/anita-desai", socials: socialLinks },
  { name: "Mahesh Kumar", role: "Livestock & Dairy Expert", image: "/images/team-3-gold.jpg", href: "/team/mahesh-kumar", socials: socialLinks },
  { name: "Sunita Sharma", role: "Production Manager", image: "/images/team-4-gold.jpg", href: "/team/sunita-sharma", socials: socialLinks },
];

/* ---------------- FAQ ---------------- */
const faqAnswer =
  "We follow natural farming methods, avoid all chemical fertilizers and pesticides, and focus on soil health to ensure every product is clean and truly organic.";

export const faqData = {
  subtitle: "Frequently Asked Questions",
  title: "Get quick answers to your common questions",
  description:
    "Our FAQ section is designed to provide quick, clear, and helpful answers to the questions we receive most often. Whether you're curious about our services, processes, pricing, or policies,",
  image: "/images/faqs-image-gold.jpg",
  defaultOpenId: "2",
  items: [
    { id: "1", question: "Q1. What makes your farm products organic?", answer: faqAnswer },
    { id: "2", question: "Q2. Do you offer home delivery for fresh produce?", answer: faqAnswer },
    { id: "3", question: "Q3. Are your fruits and vegetables pesticide-free?", answer: faqAnswer },
    { id: "4", question: "Q4. Can we visit your farm for tours?", answer: faqAnswer },
    { id: "5", question: "Q5. How do you ensure product freshness?", answer: faqAnswer },
    { id: "6", question: "Q6. How do you manage pests without chemicals?", answer: faqAnswer },
  ] satisfies FaqItem[],
};

/* ---------------- Testimonials ---------------- */
const testimonialText =
  "\"Their logistics solutions transformed our supply chain. On-time delivery and real-time tracking have made our operations seamless reliable, efficient, and professional service every time.\"";

export const testimonialsData = {
  subtitle: "Our Testimonial",
  title: "What our happy organic farm customers say",
  image: "/images/our-testimonials-image-gold.png",
  button: { label: "View All Review", href: "/testimonials" },
  items: [
    { content: testimonialText, rating: 5, author: { name: "Ralph Edwards", role: "Agronomist", image: "/images/author-1.jpg" } },
    { content: testimonialText, rating: 5, author: { name: "Devon Lane", role: "Agronomist", image: "/images/author-2.jpg" } },
    { content: testimonialText, rating: 5, author: { name: "Darlene Robertson", role: "Agronomist", image: "/images/author-3.jpg" } },
  ] satisfies Testimonial[],
};

/* ---------------- Blog ---------------- */
export const blogPosts: BlogPost[] = [
  { title: "The True Benefits of Choosing Organic for Your Family", excerpt: "Explore why chemical free produce supports better health, richer nutrition, and a safer environment.", image: "/images/post-1.jpg", href: "/blog/true-benefits-of-organic" },
  { title: "Bringing Traditional Farming Wisdom Into Modern Agriculture", excerpt: "Discover how ancient knowledge and modern blend to create a more efficient and sustainable farm system.", image: "/images/post-2.jpg", href: "/blog/traditional-farming-wisdom" },
  { title: "Natural Pest Control That Protects Both Crops and Nature", excerpt: "Find out how we manage pests the organic way without chemicals, while keeping the ecosystem balanced.", image: "/images/post-3.jpg", href: "/blog/natural-pest-control" },
];
