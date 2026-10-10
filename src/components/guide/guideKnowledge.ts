export interface GuideIntent {
  keywords: string[];
  titleBn: string;
  titleEn?: string;
  responseBn: string;
  responseEn?: string;
  actionUrl?: string;
  actionLabelBn?: string;
  actionLabelEn?: string;
  category: "navigation" | "shopping" | "features" | "about";
}

export interface TourStep {
  step: number;
  badgeBn: string;
  badgeEn?: string;
  titleBn: string;
  titleEn?: string;
  descriptionBn: string;
  descriptionEn?: string;
  targetSelector?: string;
  route?: string;
}

export const guideKnowledge: GuideIntent[] = [
  {
    keywords: ["dashboard", "ড্যাশবোর্ড", "user dashboard", "প্রোফাইল", "ইউজার", "my account", "অ্যাকাউন্ট", "account"],
    titleBn: "ইউজার ড্যাশবোর্ড (User Dashboard)",
    titleEn: "Customer Portal & Dashboard",
    responseBn:
      "ইউজার ড্যাশবোর্ডে আপনি আপনার সব অতীত ও বর্তমান অর্ডার দেখতে পারবেন, ডেলিভারি শিডিউল ক্যালেন্ডার ম্যানেজ করতে পারবেন এবং অর্গানিক ইমপ্যাক্ট স্কোর চেক করতে পারবেন। উপরের হেডার এর ইউজার আইকনে ক্লিক করে অথবা নিচের বাটনে চাপ দিয়ে সরাসরি যেতে পারেন!",
    responseEn:
      "In the Customer Portal, you can review past & active orders, live delivery tracking, recurring dairy subscriptions, and GreenCoins loyalty wallet.",
    actionUrl: "/dashboard",
    actionLabelBn: "👉 ইউজার ড্যাশবোর্ডে যান",
    actionLabelEn: "👉 Go to Customer Dashboard",
    category: "navigation",
  },
  {
    keywords: ["track", "ট্র্যাক", "live map", "order track", "অর্ডার কোথায়", "রাইডার", "gps", "ম্যাপ", "rider"],
    titleBn: "লাইভ জিপিএস অর্ডার ট্র্যাকিং (Live GPS Tracking)",
    titleEn: "Live GPS Order Tracking",
    responseBn:
      "আপনার অর্ডার কনফার্ম হওয়ার পর আমাদের নিজস্ব কোল্ড-চেইন ডেলিভারি রাইডারের রিয়েল-টাইম GPS লোকেশন ম্যাপে দেখা যায়! আনুমানিক কত মিনিটে পণ্য আপনার দরজায় পৌঁছাবে তার লাইভ কাউন্টডাউন দেখতে পাবেন।",
    responseEn:
      "Once your farm order is confirmed, track our cold-chain delivery rider in real time with interactive GPS route coordinates and delivery ETA.",
    actionUrl: "/dashboard/track/GR-2026-8841",
    actionLabelBn: "📍 লাইভ অর্ডার ট্র্যাক ম্যাপ দেখুন",
    actionLabelEn: "📍 Open Live Tracking Map",
    category: "features",
  },
  {
    keywords: ["admin", "অ্যাডমিন", "ম্যানেজ", "মালিক", "প্রোডাক্ট আপলোড", "স্টক", "hq", "manage", "inventory"],
    titleBn: "অ্যাডমিন কন্ট্রোল সেন্টার (Admin HQ)",
    titleEn: "Admin HQ Control Center",
    responseBn:
      "অ্যাডমিন প্যানেল থেকে আপনি সম্পূর্ণ গ্রীনরুট ফার্মের পণ্য আপলোড, ইনভেন্টরি স্টক আপডেট, কাস্টমার অর্ডার প্রসেসিং ও ডেলিভারি ফ্লিট মনিটর করতে পারবেন।",
    responseEn:
      "The Admin HQ console lets farm supervisors add new produce, update stock inventory, review order dispatches, and manage store operations.",
    actionUrl: "/admin",
    actionLabelBn: "🔐 অ্যাডমিন HQ কনসোলে যান",
    actionLabelEn: "🔐 Open Admin HQ Console",
    category: "navigation",
  },
  {
    keywords: ["buy", "কেনাকাটা", "কিভাবে কিনব", "order", "অর্ডার", "shop", "পণ্য", "বাজার", "how to buy", "purchase"],
    titleBn: "পণ্য কেনার সহজ নিয়ম (How to Shop)",
    titleEn: "How to Shop & Order",
    responseBn:
      "১. ফার্ম শপ (/products) পেজে যান।\n২. পছন্দের পণ্যের নিচে 'ব্যাগে নিন' বাটনে চাপ দিন (অথবা +/- দিয়ে পরিমাণ ঠিক করুন)।\n৩. সরাসরি 'সরাসরি কিনুন (1-Click Buy)' বাটনে ক্লিক করে নাম, মোবাইল ও ঠিকানা দিয়ে ক্যাশ অন ডেলিভারি বা বিকাশে অর্ডার কনফার্ম করুন!",
    responseEn:
      "1. Browse our Farm Shop (/products).\n2. Click 'Add to Bag' or choose your quantity.\n3. Click 'Buy Now' or proceed to checkout with Cash on Delivery or bKash!",
    actionUrl: "/products",
    actionLabelBn: "🛒 ফার্ম শপে কেনাকাটা করুন",
    actionLabelEn: "🛒 Browse Farm Shop",
    category: "shopping",
  },
  {
    keywords: ["purpose", "উদ্দেশ্য", "why", "কেন", "greenroot", "গ্রীনরুট", "organic", "অর্গানিক", "খাঁটি", "mission"],
    titleBn: "গ্রীনরুটের মিশন ও অঙ্গীকার (Our Purpose)",
    titleEn: "Our Purpose & Organic Mission",
    responseBn:
      "গ্রীনরুটের মূল উদ্দেশ্য হলো কোনো প্রকার ক্ষতিকর রাসায়নিক, মেলামাইন, ইউরিয়া বা ভেজাল ছাড়াই সরাসরি নিজস্ব খামার ও প্রাকৃতিক উৎস থেকে খাঁটি পুষ্টিকর খাদ্য সাধারণ মানুষের দোরগোড়ায় পৌঁছে দেওয়া। মধ্যস্বত্বভোগী ছাড়া কৃষকদের ন্যায্য মূল্য এবং ভোক্তাদের ১০০% বিশুদ্ধতার নিশ্চয়তা দেয়াই আমাদের অঙ্গীকার।",
    responseEn:
      "GreenRoot is dedicated to delivering 100% natural, chemical-free organic farm produce without middlemen or preservatives, ensuring fair prices for farmers and healthy nutrition for your family.",
    actionUrl: "/about",
    actionLabelBn: "🌿 আমাদের খামারের গল্প পড়ুন",
    actionLabelEn: "🌿 Read Our Farm Story",
    category: "about",
  },
  {
    keywords: ["milk", "দুধ", "গরুর দুধ", "cow milk", "কাঁচা দুধ", "dairy"],
    titleBn: "ঘরোয়া খাঁটি গরুর দুধ (Pure Raw Cow Milk)",
    titleEn: "Pure Grass-Fed Raw Cow Milk",
    responseBn:
      "প্রতিদিন ভোরে মুক্ত চারণভূমিতে ঘাস খাওয়া সুস্থ গাভী থেকে সংগ্রহ করা খাঁটি অপরিশোধিত দুধ। এতে প্রাকৃতিকভাবে ঘন সর ও ভিটামিন ডি থাকে। ৪°C তাপমাত্রায় চিলড সিলগালা বোতলে ডেলিভারি করা হয়।",
    responseEn:
      "Sourced every dawn from free-grazing cows, unadulterated and chilled at 4°C in sealed food-grade glass/PET containers.",
    actionUrl: "/products/pure-raw-cow-milk",
    actionLabelBn: "🥛 খাঁটি দুধের বিস্তারিত দেখুন",
    actionLabelEn: "🥛 View Pure Cow Milk",
    category: "shopping",
  },
  {
    keywords: ["ghee", "ঘি", "গাওয়া ঘি", "bilona", "butter"],
    titleBn: "ঐতিহ্যবাহী বিলোনা গাওয়া ঘি (Bilona Ghee)",
    titleEn: "Traditional Hand-Churned Bilona Ghee",
    responseBn:
      "দুধের দই মন্থন করে মাখন আলাদা করে মাটির চুলায় মৃদু আঁচে জ্বাল দিয়ে তৈরি হয় আসল বিলোনা ঘি। অতুলনীয় দানাদার টেক্সচার ও প্রাকৃতিক সুবাস।",
    responseEn:
      "Cultured from fresh cow yogurt, hand-churned in traditional Bilona method, and simmered slowly on earthen stoves for golden granular aroma.",
    actionUrl: "/products/traditional-cow-ghee",
    actionLabelBn: "🍯 খাঁটি ঘি দেখুন",
    actionLabelEn: "🍯 View Bilona Ghee",
    category: "shopping",
  },
  {
    keywords: ["delivery", "ডেলিভারি", "চার্জ", "fee", "খরচ", "সময়", "shipping"],
    titleBn: "ডেলিভারি চার্জ ও সময়সীমা",
    titleEn: "Delivery Charges & Schedule",
    responseBn:
      "ঢাকা সিটির ভেতরে ডেলিভারি চার্জ মাত্র ৬০ টাকা এবং এক্সপ্রেস ডেলিভারিতে ৩-৪ ঘণ্টার মধ্যে পৌঁছে যায়। ঢাকা সিটির বাইরে ১২০ টাকা।",
    responseEn:
      "Inside Dhaka delivery charge is ৳60 (express delivery within 3-4 hours). Outside Dhaka delivery is ৳120 via specialized cold-chain courier.",
    actionUrl: "/products",
    actionLabelBn: "📦 শপিং করুন",
    actionLabelEn: "📦 Shop Farm Produce",
    category: "shopping",
  },
  {
    keywords: ["contact", "যোগাযোগ", "ফোন", "phone", "help", "সাহায্য", "whatsapp", "hotline"],
    titleBn: "সরাসরি খামার হেল্পলাইন",
    titleEn: "Direct Farm Hotline & Support",
    responseBn:
      "যেকোনো প্রয়োজনে আমাদের সাপোর্ট টিমে সরাসরি কল করুন: ০১৭১২-৩৪৫৬৭৮ অথবা হোয়াটসঅ্যাপে মেসেজ দিন।",
    responseEn:
      "For inquiries, call our farm hotline directly: +880 1712-345678 or reach us via WhatsApp anytime.",
    actionUrl: "/contact",
    actionLabelBn: "📞 যোগাযোগ পেজে যান",
    actionLabelEn: "📞 Go to Contact Page",
    category: "about",
  },
];

export const quickQuestions: { textBn: string; textEn: string; intentKey: string }[] = [
  { textBn: "📊 ড্যাশবোর্ড কোথায়?", textEn: "📊 Where is Dashboard?", intentKey: "dashboard" },
  { textBn: "🛒 পণ্য কীভাবে কিনব?", textEn: "🛒 How do I order?", intentKey: "buy" },
  { textBn: "🌿 গ্রীনরুটের উদ্দেশ্য কি?", textEn: "🌿 What is GreenRoot?", intentKey: "purpose" },
  { textBn: "🚚 অর্ডার কীভাবে ট্র্যাক করব?", textEn: "🚚 Live GPS Tracking?", intentKey: "track" },
  { textBn: "🔐 অ্যাডমিন প্যানেল কোথায়?", textEn: "🔐 Where is Admin HQ?", intentKey: "admin" },
  { textBn: "🥛 খাঁটি দুধ ও ঘি এর বিস্তারিত", textEn: "🥛 Milk & Ghee Quality", intentKey: "milk" },
];

export const tourSteps: TourStep[] = [
  {
    step: 1,
    badgeBn: "ধাপ ১: হেডার ও মেনু",
    badgeEn: "Step 1: Header & Menu",
    titleBn: "নেভিগেশন ও ফার্ম মেনু",
    titleEn: "Navigation & Store Directory",
    descriptionBn:
      "উপরে থাকা মেনু থেকে আপনি হোম, ফার্ম শপ, আমাদের গল্প, ব্লগ ও কন্টাক্ট পেজে সরাসরি যেতে পারবেন।",
    descriptionEn:
      "From the top navigation bar, seamlessly explore Farm Shop, About Us, Agro Blogs, Customer Portal, and Hotline.",
    route: "/",
  },
  {
    step: 2,
    badgeBn: "ধাপ ২: ফার্ম শপ",
    badgeEn: "Step 2: Farm Catalog",
    titleBn: "খামার ফ্রেশ অর্গানিক বাজার",
    titleEn: "Pure Farm-Fresh Catalog",
    descriptionBn:
      "এখানে দুধ, ঘি, তেল, মধু, খেজুর, শাকসবজি ও দেশি মাছসহ সব পণ্যের ল্যাব টেস্ট সনদ ও লাইভ স্টক দেখতে পাবেন।",
    descriptionEn:
      "Discover organic raw dairy, cold-pressed oils, Sundarbans wild honey, and natural farm produce with lab certifications.",
    route: "/products",
  },
  {
    step: 3,
    badgeBn: "ধাপ ৩: ইনস্ট্যান্ট কার্ট ও চেকআউট",
    badgeEn: "Step 3: Instant Cart",
    titleBn: "এক ক্লিকে অর্ডার সম্পন্ন",
    titleEn: "Quick Slide-Out Cart",
    descriptionBn:
      "যেকোনো পণ্যে 'ব্যাগে নিন' বা 'সরাসরি কিনুন' চাপলে দ্রুত কার্ট স্লাইড-আউট হবে এবং মাত্র ৩ ধাপে ক্যাশ অন ডেলিভারিতে অর্ডার করতে পারবেন।",
    descriptionEn:
      "Click 'Add to Bag' or 'Buy Now' to trigger our drawer and complete checkout in 3 easy steps with Cash on Delivery or bKash.",
    route: "/products/pure-raw-cow-milk",
  },
  {
    step: 4,
    badgeBn: "ধাপ ৪: ইউজার ড্যাশবোর্ড",
    badgeEn: "Step 4: Customer Portal",
    titleBn: "লাইভ GPS ম্যাপে অর্ডার ট্র্যাকিং",
    titleEn: "Real-Time GPS Order Tracking",
    descriptionBn:
      "অর্ডার করার পর ইউজার ড্যাশবোর্ডে গিয়ে রাইডারের লাইভ লোকেশন, ডেলিভারি ক্যালেন্ডার ও অর্গানিক পয়েন্ট দেখতে পারবেন।",
    descriptionEn:
      "Track your order delivery rider live on GPS maps, manage milk subscriptions, and view loyalty GreenCoins.",
    route: "/dashboard",
  },
  {
    step: 5,
    badgeBn: "ধাপ ৫: অ্যাডমিন HQ",
    badgeEn: "Step 5: Admin HQ",
    titleBn: "ব্যবসা ও স্টক ব্যবস্থাপনা",
    titleEn: "Farm Operations Management",
    descriptionBn:
      "খামারের নতুন পণ্য আপলোড, মূল্য পরিবর্তন ও অর্ডার ডেলিভারি অনুমোদন করতে অ্যাডমিন প্যানেল ব্যবহার করুন।",
    descriptionEn:
      "Add new products, monitor live inventory counts, review sales analytics, and manage rider logistics.",
    route: "/admin",
  },
];

export function findMatchingIntent(query: string): GuideIntent {
  const normalized = query.toLowerCase().trim();

  for (const intent of guideKnowledge) {
    if (intent.keywords.some((k) => normalized.includes(k.toLowerCase()))) {
      return intent;
    }
  }

  // Fallback default helpful response
  return {
    keywords: [],
    titleBn: "আমি আপনাকে সাহায্য করতে প্রস্তুত!",
    titleEn: "Ready to assist you!",
    responseBn: `আপনার প্রশ্ন "${query}" বুঝতে পেরেছি। আপনি কি ফার্ম শপ দেখতে চান, ড্যাশবোর্ডে যেতে চান নাকি কোনো নির্দিষ্ট পণ্যের পুষ্টিগুণ জানতে চান? নিচের অপশনগুলোতে ক্লিক করতে পারেন!`,
    responseEn: `Got your inquiry: "${query}". Would you like to explore our farm shop, access your customer dashboard, or learn about product nutrition? Feel free to use the quick buttons below!`,
    actionUrl: "/products",
    actionLabelBn: "🛒 ফার্ম শপে পণ্য দেখুন",
    actionLabelEn: "🛒 View Farm Shop",
    category: "about",
  };
}
