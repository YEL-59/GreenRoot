export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  active?: boolean;
}

export interface ServiceDetailData {
  slug: string;
  title: string;
  heroImage: string;
  shortDesc: string;
  paragraphs: string[];
  whyChooseIntro: string;
  whyChoosePoints: {
    icon: string;
    title: string;
    description: string;
  }[];
  audienceDesc: string;
  benefitsIntro: string;
  benefits: {
    icon: string;
    title: string;
    description: string;
    bullet: string;
  }[];
  benefitImage: string;
  faqs: {
    id: string;
    question: string;
    answer: string;
  }[];
}

export const servicesList: ServiceItem[] = [
  {
    id: "service-1",
    slug: "sustainable-farming-consultation",
    title: "Sustainable Farming Consultation",
    description: "We focus on delivering clean, naturally grown crops along with expert guidance that encourages sustainable agriculture.",
    icon: "/images/icon-services-1.svg",
    image: "/images/service-image-1-gold.jpg",
  },
  {
    id: "service-2",
    slug: "organic-fertilizer-and-soil-care",
    title: "Organic Fertilizer & Soil Care",
    description: "Enriching soils with 100% certified organic compost, biological nutrients, and sustainable micro-ecosystem care.",
    icon: "/images/icon-services-2.svg",
    image: "/images/service-image-2-gold.jpg",
    active: true,
  },
  {
    id: "service-3",
    slug: "organic-seasonal-produce-boxes",
    title: "Organic Seasonal Produce Boxes",
    description: "Curated farm-fresh harvest baskets delivered directly from our fertile fields to your kitchen counter.",
    icon: "/images/icon-services-3.svg",
    image: "/images/service-image-3-gold.jpg",
  },
  {
    id: "service-4",
    slug: "organic-dairy-and-farm-products",
    title: "Organic Dairy & Farm Products",
    description: "Wholesome, pasture-raised dairy and artisan organic items produced with pure ethical care.",
    icon: "/images/icon-services-4.svg",
    image: "/images/service-image-4-gold.jpg",
  },
  {
    id: "service-5",
    slug: "organic-crop-production",
    title: "Organic Crop Production",
    description: "Large-scale certified organic cultivation utilizing regenerative crop rotation and natural pollination.",
    icon: "/images/icon-services-5.svg",
    image: "/images/service-image-1-gold.jpg",
  },
  {
    id: "service-6",
    slug: "fresh-produce-supply",
    title: "Fresh Produce Supply",
    description: "Reliable B2B and institutional wholesale supply of premium grade chemical-free organic harvests.",
    icon: "/images/icon-services-6.svg",
    image: "/images/service-image-2-gold.jpg",
  },
  {
    id: "service-7",
    slug: "farm-to-home-delivery",
    title: "Farm to Home Delivery",
    description: "Same-day climate-controlled delivery ensuring crisp freshness and peak nutritional potency.",
    icon: "/images/icon-services-7.svg",
    image: "/images/service-image-3-gold.jpg",
  },
  {
    id: "service-8",
    slug: "seed-and-plant-nursery",
    title: "Seed & Plant Nursery",
    description: "Heirloom non-GMO certified seeds and hardy organic saplings nurtured for resilient home & commercial growth.",
    icon: "/images/icon-services-8.svg",
    image: "/images/service-image-4-gold.jpg",
  },
];

export const defaultServiceDetail: ServiceDetailData = {
  slug: "sustainable-farming-consultation",
  title: "Sustainable Farming Consultation",
  heroImage: "/images/service-single-image.jpg",
  shortDesc:
    "Our Sustainable Farming Consultation service is designed to help farmers, businesses, and individuals adopt eco-friendly and efficient agricultural practices.",
  paragraphs: [
    "Our Sustainable Farming Consultation service is designed to help farmers, businesses, and individuals adopt eco-friendly and efficient agricultural practices. We provide expert guidance on improving soil health, maximizing crop yield naturally, and implementing environmentally responsible techniques.",
    "We combine decades of experience in organic farming with modern eco-friendly strategies to create a comprehensive plan tailored to your farm's unique ecosystem, ensuring lasting productivity while protecting biodiversity.",
  ],
  whyChooseIntro:
    "By leveraging our expertise and personalized approach, you can transform your farm into a model of sustainability, ensuring that your produce is healthy, your land remains fertile, and your operations are efficient—all while protecting the environment for future generations.",
  whyChoosePoints: [
    {
      icon: "/images/icon-service-why-choose-1.svg",
      title: "Comprehensive Farm Assessment",
      description: "We evaluate soil chemistry, water availability, crop cycles, and farm micro-climates for optimal planning.",
    },
    {
      icon: "/images/icon-service-why-choose-2.svg",
      title: "Eco-Friendly Farming Techniques",
      description: "Guidance on composting, natural fertilizers, crop rotation, cover crops, and integrated natural systems.",
    },
    {
      icon: "/images/icon-service-why-choose-3.svg",
      title: "Soil & Resource Management",
      description: "Proven recommendations to enrich microbial soil fertility, reduce erosion, and conserve fresh water.",
    },
    {
      icon: "/images/icon-service-why-choose-4.svg",
      title: "Training & Knowledge Sharing",
      description: "Hands-on workshops, seasonal farm visits, and ongoing support to equip teams with practical skills.",
    },
  ],
  audienceDesc:
    "Farmers, agricultural businesses, community farms, NGOs, and anyone looking to transition to sustainable, organic, and environmentally conscious farming practices.",
  benefitsIntro:
    "When you choose our farm, you're not just getting fresh, organic produce—you're partnering with a team dedicated to sustainability, quality, and integrity. Our eco-friendly farming methods ensure healthier crops and nutrient-rich food.",
  benefits: [
    {
      icon: "/images/icon-service-benefit-1.svg",
      title: "Sustainably Grown, Healthier Produce",
      description: "Our farm follows eco-friendly and organic practices, ensuring you receive fresh, nutrient-dense harvest.",
      bullet: "Enjoy fresh, chemical-free fruits and vegetables grown with love.",
    },
    {
      icon: "/images/icon-service-benefit-2.svg",
      title: "Expertise from Soil to Harvest",
      description: "Our dedicated team ensures optimal crop growth, high-quality yields, and responsible farming.",
      bullet: "Ensuring farming methods that sustain the environment for decades.",
    },
  ],
  benefitImage: "/images/service-benefit-image.jpg",
  faqs: [
    {
      id: "faq-s1",
      question: "Q1. What makes your farm products organic?",
      answer: "We follow natural farming methods, avoid all chemical fertilizers and pesticides, and focus on soil health to ensure every product is clean and truly organic.",
    },
    {
      id: "faq-s2",
      question: "Q2. Do you use any chemical additives in your produce?",
      answer: "Never. All our crops grow purely from organic compost, certified non-GMO seeds, and natural biological pest control methods.",
    },
    {
      id: "faq-s3",
      question: "Q3. How do you maintain freshness during delivery?",
      answer: "Harvesting happens in early morning hours, followed by prompt sorting and climate-controlled packing to reach your door within hours of picking.",
    },
    {
      id: "faq-s4",
      question: "Q4. Do you offer seasonal produce boxes?",
      answer: "Yes, our seasonal harvest boxes provide curated assortments of peak fresh fruits, greens, and root crops tailored to every harvest cycle.",
    },
    {
      id: "faq-s5",
      question: "Q5. How do you manage pests without chemicals?",
      answer: "We use companion planting, beneficial insect habitats, organic neem sprays, and crop rotation to nurture a balanced and pest-resistant farm ecosystem.",
    },
  ],
};

export const servicesData = {
  header: {
    title: "Our Services",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Our Services", href: "/services", active: true },
    ],
  },
  services: servicesList,
};
