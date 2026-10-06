export interface AboutFeature {
  icon: string;
  title: string;
}

export interface ApproachItem {
  number?: string;
  image: string;
  icon: string;
  title: string;
  description: string;
  bullet: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  href: string;
  socials: { icon: string; href: string }[];
}

export interface TestimonialItem {
  name: string;
  designation: string;
  image: string;
  rating: number;
  quote: string;
}

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
}

export const aboutData = {
  header: {
    title: "About Us",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about", active: true },
    ],
  },
  overview: {
    subtitle: "About Our Farm",
    title: "From soil to harvest, we believe in clean and conscious farming",
    paragraphs: [
      "From soil preparation to the final harvest, we use sustainable, chemical-free methods that protect biodiversity, enrich the soil, and preserve natural resources.",
      "We are committed to farming in a way that respects both the land and the people who depend on it. Every crop we grow reflects our dedication to clean, conscious agriculture and our belief in providing fresh, honest food that supports healthier living and a more sustainable future.",
    ],
    features: [
      { icon: "/images/icon-about-item-1.svg", title: "Sustainable Farming Practices" },
      { icon: "/images/icon-about-item-2.svg", title: "Pure, Chemical Free Produce" },
      { icon: "/images/icon-about-item-3.svg", title: "Passion for Honest Agriculture" },
    ],
    footerTags: [
      "Natural Vegetables",
      "Fresh Organic Food",
      "Chemical-Free Farming",
      "Sustainable Agriculture",
    ],
    images: {
      image1: "/images/about-us-image-1.jpg",
      image2: "/images/about-us-image-2.jpg",
    },
  },
  approach: {
    subtitle: "Our Approach",
    title: "Growing better through clean and responsible farming",
    description:
      "We follow a farming approach rooted in purity, care, and long-term sustainability. By using natural methods, protecting soil health, and avoiding harmful chemicals.",
    items: [
      {
        image: "/images/our-approach-item-image-1.jpg",
        icon: "/images/icon-our-approach-item-1.svg",
        title: "Our Mission",
        description: "Our mission is to grow food with honesty, transparency, and deep respect for nature.",
        bullet: "Promoting Natural Farming Practices",
      },
      {
        image: "/images/our-approach-item-image-2.jpg",
        icon: "/images/icon-our-approach-item-2.svg",
        title: "Our Vision",
        description: "To become a leading example of sustainable agriculture where innovation and nature work in harmony.",
        bullet: "Building a Sustainable Food Future",
      },
    ],
    companyLogos: [
      "/images/company-logo-primary-1.svg",
      "/images/company-logo-primary-2.svg",
      "/images/company-logo-primary-3.svg",
      "/images/company-logo-primary-4.svg",
      "/images/company-logo-primary-5.svg",
    ],
  },
  advantage: {
    subtitle: "Our Advantage",
    title: "Your source for pure, fresh, and sustainably grown produce",
    box1: {
      icon: "/images/icon-our-advantage-1.svg",
      title: "Pure Quality Produce",
      description: "We grow our crops using natural, chemical-free methods that ensure nutrient density.",
      customers: "More Than 200+ Happy Customers",
    },
    box2: {
      image: "/images/our-advantage-image-1.jpg",
      videoUrl: "https://www.youtube.com/watch?v=Y-x0efG1seA",
    },
    box3: {
      image: "/images/our-advantage-image-2.jpg",
    },
    box4: {
      icon: "/images/icon-our-advantage-2.svg",
      years: 25,
      title: "Years of Experience",
      description: "We have honed our techniques to grow fresh, chemical free produce with dependable excellence.",
      bullets: ["Eco-Friendly Farming Practices", "Thousands of Acres of Fertile Farms"],
    },
    footerTags: [
      "Fresh Organic Food",
      "Natural Vegetables",
      "Sustainable Agriculture",
      "Chemical-Free Farming",
    ],
  },
  howItWorks: {
    subtitle: "How It Works",
    title: "See how we bring fresh, organic goodness straight to you",
    steps: [
      {
        number: "01",
        image: "/images/how-it-work-image-1.jpg",
        title: "Soil Assessment & Planning",
        description: "We analyze the soil's nutrients, texture, and structure to understand its unique ecosystem strengths.",
        bullet: "Comprehensive Soil Testing & Analysis",
      },
      {
        number: "02",
        image: "/images/how-it-work-image-2.jpg",
        title: "Seed Selection & Planting",
        description: "High-quality organic seeds are carefully selected and planted using eco-friendly farming methods.",
        bullet: "100% Non-GMO Certified Organic Seeds",
      },
      {
        number: "03",
        image: "/images/how-it-work-image-3.jpg",
        title: "Natural Growth & Care",
        description: "Crops are nurtured with organic fertilizers along smart, water-efficient drip irrigation systems.",
        bullet: "Natural Pest Control & Nutrient Enriched Soil",
      },
      {
        number: "04",
        image: "/images/how-it-work-image-4.jpg",
        title: "Harvesting & Fresh Delivery",
        description: "Produce is harvested responsibly at peak ripeness and delivered straight from fields to your doorstep.",
        bullet: "Temperature-Controlled Same-Day Delivery",
      },
    ],
  },
  team: {
    subtitle: "Meet Our Farmers",
    title: "Discover the team that makes organic farming possible",
    description:
      "Their passion, knowledge, and hands-on care ensure that every crop is grown sustainably, harvested responsibly, and delivered fresh to your table.",
    members: [
      {
        name: "Jacob Jones",
        role: "Agronomist",
        image: "/images/team-1.jpg",
        href: "#",
        socials: [
          { icon: "fa-brands fa-facebook-f", href: "#" },
          { icon: "fa-brands fa-dribbble", href: "#" },
          { icon: "fa-brands fa-instagram", href: "#" },
          { icon: "fa-brands fa-linkedin-in", href: "#" },
        ],
      },
      {
        name: "Ralph Edwards",
        role: "Farm Manager",
        image: "/images/team-2.jpg",
        href: "#",
        socials: [
          { icon: "fa-brands fa-facebook-f", href: "#" },
          { icon: "fa-brands fa-dribbble", href: "#" },
          { icon: "fa-brands fa-instagram", href: "#" },
          { icon: "fa-brands fa-linkedin-in", href: "#" },
        ],
      },
      {
        name: "Guy Hawkins",
        role: "Sustainability Coordinator",
        image: "/images/team-3.jpg",
        href: "#",
        socials: [
          { icon: "fa-brands fa-facebook-f", href: "#" },
          { icon: "fa-brands fa-dribbble", href: "#" },
          { icon: "fa-brands fa-instagram", href: "#" },
          { icon: "fa-brands fa-linkedin-in", href: "#" },
        ],
      },
      {
        name: "Arlene McCoy",
        role: "Head Farmer",
        image: "/images/team-4.jpg",
        href: "#",
        socials: [
          { icon: "fa-brands fa-facebook-f", href: "#" },
          { icon: "fa-brands fa-dribbble", href: "#" },
          { icon: "fa-brands fa-instagram", href: "#" },
          { icon: "fa-brands fa-linkedin-in", href: "#" },
        ],
      },
    ],
  },
  testimonials: {
    subtitle: "Our Testimonials",
    title: "Genuine testimonials reflecting our quality and purity",
    rating: "4.9",
    totalReviews: "4,200 Reviews",
    items: [
      {
        name: "Esther Howard",
        designation: "Organic Food Enthusiast",
        image: "/images/our-testimonials-image-1.jpg",
        rating: 5,
        quote: "“GreenRoot has completely changed our family's meals. The vegetables taste genuinely alive and stay crisp far longer than supermarket produce.”",
      },
      {
        name: "Leslie Alexander",
        designation: "Culinary Chef",
        image: "/images/our-testimonials-image-2.jpg",
        rating: 5,
        quote: "“As a restaurant chef, farm-to-table integrity is non-negotiable. GreenRoot supplies the cleanest greens and heirloom tomatoes in the region.”",
      },
      {
        name: "Kathryn Murphy",
        designation: "Eco-Living Advocate",
        image: "/images/our-testimonials-image-3.jpg",
        rating: 5,
        quote: "“Visiting their farm opened our eyes to real sustainable agriculture. Transparent practices, respectful people, and unbeatable fruit baskets.”",
      },
      {
        name: "Kristin Watson",
        designation: "Nutritionist",
        image: "/images/our-testimonials-image-4.jpg",
        rating: 5,
        quote: "“Clean, chemical-free nutrition is the root of wellness. I regularly recommend GreenRoot CSA baskets to all my health coaching clients.”",
      },
    ],
  },
  faqs: {
    subtitle: "Frequently Asked Questions",
    title: "Simple, clear answers to help you understand our work better",
    ctaImage: "/images/faqs-image.jpg",
    ctaCounter: "4K+",
    ctaText: "Satisfied Customers Across Regions",
    items: [
      {
        id: "faq-1",
        question: "Q1. What makes your farm products organic?",
        answer: "We follow natural farming methods, avoid all chemical fertilizers and pesticides, and focus on soil health to ensure every product is clean and truly organic.",
      },
      {
        id: "faq-2",
        question: "Q2. Do you use any chemical additives in your produce?",
        answer: "Never. All our crops grow purely from organic compost, certified non-GMO seeds, and natural biological pest control methods.",
      },
      {
        id: "faq-3",
        question: "Q3. How do you maintain freshness during delivery?",
        answer: "Harvesting happens in early morning hours, followed by prompt sorting and climate-controlled packing to reach your door within hours of picking.",
      },
      {
        id: "faq-4",
        question: "Q4. Do you offer seasonal produce boxes?",
        answer: "Yes, our seasonal harvest boxes provide curated assortments of peak fresh fruits, greens, and root crops tailored to every harvest cycle.",
      },
      {
        id: "faq-5",
        question: "Q5. How do you manage pests without chemicals?",
        answer: "We use companion planting, beneficial insect habitats, organic neem sprays, and crop rotation to nurture a balanced and pest-resistant farm ecosystem.",
      },
    ],
  },
};
