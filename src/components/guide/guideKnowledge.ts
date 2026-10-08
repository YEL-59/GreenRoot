export interface GuideIntent {
  keywords: string[];
  titleBn: string;
  responseBn: string;
  actionUrl?: string;
  actionLabelBn?: string;
  category: "navigation" | "shopping" | "features" | "about";
}

export interface TourStep {
  step: number;
  titleBn: string;
  descriptionBn: string;
  targetSelector?: string;
  route?: string;
  badgeBn: string;
}

export const guideKnowledge: GuideIntent[] = [
  {
    keywords: ["dashboard", "ড্যাশবোর্ড", "user dashboard", "প্রোফাইল", "ইউজার", "my account", "অ্যাকাউন্ট"],
    titleBn: "ইউজার ড্যাশবোর্ড (User Dashboard)",
    responseBn:
      "ইউজার ড্যাশবোর্ডে আপনি আপনার সব অতীত ও বর্তমান অর্ডার দেখতে পারবেন, ডেলিভারি শিডিউল ক্যালেন্ডার ম্যানেজ করতে পারবেন এবং অর্গানিক ইমপ্যাক্ট স্কোর চেক করতে পারবেন। উপরের হেডার এর ইউজার আইকনে ক্লিক করে অথবা নিচের বাটনে চাপ দিয়ে সরাসরি যেতে পারেন!",
    actionUrl: "/dashboard",
    actionLabelBn: "👉 ইউজার ড্যাশবোর্ডে যান",
    category: "navigation",
  },
  {
    keywords: ["track", "ট্র্যাক", "live map", "order track", "অর্ডার কোথায়", "রাইডার", "gps", "ম্যাপ"],
    titleBn: "লাইভ জিপিএস অর্ডার ট্র্যাকিং (Live GPS Tracking)",
    responseBn:
      "আপনার অর্ডার কনফার্ম হওয়ার পর আমাদের নিজস্ব কোল্ড-চেইন ডেলিভারি রাইডারের রিয়েল-টাইম GPS লোকেশন ম্যাপে দেখা যায়! আনুমানিক কত মিনিটে পণ্য আপনার দরজায় পৌঁছাবে তার লাইভ কাউন্টডাউন দেখতে পাবেন।",
    actionUrl: "/dashboard/track/ORD-8921",
    actionLabelBn: "📍 লাইভ অর্ডার ট্র্যাক ম্যাপ দেখুন",
    category: "features",
  },
  {
    keywords: ["admin", "অ্যাডমিন", "ম্যানেজ", "মালিক", "প্রোডাক্ট আপলোড", "স্টক", "hq", "manage"],
    titleBn: "অ্যাডমিন কন্ট্রোল সেন্টার (Admin HQ)",
    responseBn:
      "অ্যাডমিন প্যানেল থেকে আপনি সম্পূর্ণ গ্রীনরুট ফার্মের পণ্য আপলোড, ইনভেন্টরি স্টক আপডেট, কাস্টমার অর্ডার প্রসেসিং ও ডেলিভারি ফ্লিট মনিটর করতে পারবেন।",
    actionUrl: "/admin",
    actionLabelBn: "🔐 অ্যাডমিন HQ কনসোলে যান",
    category: "navigation",
  },
  {
    keywords: ["buy", "কেনাকাটা", "কিভাবে কিনব", "order", "অর্ডার", "shop", "পণ্য", "বাজার", "how to buy"],
    titleBn: "পণ্য কেনার সহজ নিয়ম (How to Shop)",
    responseBn:
      "১. ফার্ম শপ (/products) পেজে যান।\n২. পছন্দের পণ্যের নিচে 'ব্যাগে নিন' বাটনে চাপ দিন (অথবা +/- দিয়ে পরিমাণ ঠিক করুন)।\n৩. সরাসরি 'সরাসরি কিনুন (1-Click Buy)' বাটনে ক্লিক করে নাম, মোবাইল ও ঠিকানা দিয়ে ক্যাশ অন ডেলিভারি বা বিকাশে অর্ডার কনফার্ম করুন!",
    actionUrl: "/products",
    actionLabelBn: "🛒 ফার্ম শপে কেনাকাটা করুন",
    category: "shopping",
  },
  {
    keywords: ["purpose", "উদ্দেশ্য", "why", "কেন", "greenroot", "গ্রীনরুট", "organic", "অর্গানিক", "খাঁটি"],
    titleBn: "গ্রীনরুটের মিশন ও অঙ্গীকার (Our Purpose)",
    responseBn:
      "গ্রীনরুটের মূল উদ্দেশ্য হলো কোনো প্রকার ক্ষতিকর রাসায়নিক, মেলামাইন, ইউরিয়া বা ভেজাল ছাড়াই সরাসরি নিজস্ব খামার ও প্রাকৃতিক উৎস থেকে খাঁটি পুষ্টিকর খাদ্য সাধারণ মানুষের দোরগোড়ায় পৌঁছে দেওয়া। মধ্যস্বত্বভোগী ছাড়া কৃষকদের ন্যায্য মূল্য এবং ভোক্তাদের ১০০% বিশুদ্ধতার নিশ্চয়তা দেয়াই আমাদের অঙ্গীকার।",
    actionUrl: "/about",
    actionLabelBn: "🌿 আমাদের খামারের গল্প পড়ুন",
    category: "about",
  },
  {
    keywords: ["milk", "দুধ", "গরুর দুধ", "cow milk", "কাঁচা দুধ"],
    titleBn: "ঘরোয়া খাঁটি গরুর দুধ (Pure Raw Cow Milk)",
    responseBn:
      "প্রতিদিন ভোরে মানিকগঞ্জের মুক্ত চারণভূমিতে ঘাস খাওয়া সুস্থ গাভী থেকে সংগ্রহ করা খাঁটি অপরিশোধিত দুধ। এতে প্রাকৃতিকভাবে ঘন সর ও ভিটামিন ডি থাকে। ৪°C তাপমাত্রায় চিলড সিলগালা বোতলে ডেলিভারি করা হয়। প্রতি লিটার মাত্র ১১০ টাকা!",
    actionUrl: "/products/pure-raw-cow-milk",
    actionLabelBn: "🥛 খাঁটি দুধের বিস্তারিত দেখুন",
    category: "shopping",
  },
  {
    keywords: ["ghee", "ঘি", "গাওয়া ঘি", "bilona"],
    titleBn: "ঐতিহ্যবাহী বিলোনা গাওয়া ঘি (Bilona Ghee)",
    responseBn:
      "দুধের দই মন্থন করে মাখন আলাদা করে মাটির চুলায় মৃদু আঁচে জ্বাল দিয়ে তৈরি হয় আসল বিলোনা ঘি। অতুলনীয় দানাদার টেক্সচার ও প্রাকৃতিক সুবাস। ৫০০ গ্রাম ৯৫০ টাকা!",
    actionUrl: "/products/traditional-cow-ghee",
    actionLabelBn: "🍯 খাঁটি ঘি দেখুন",
    category: "shopping",
  },
  {
    keywords: ["delivery", "ডেলিভারি", "চার্জ", "fee", "খরচ", "সময়"],
    titleBn: "ডেলিভারি চার্জ ও সময়সীমা",
    responseBn:
      "ঢাকা সিটির ভেতরে ডেলিভারি চার্জ মাত্র ৬০ টাকা এবং এক্সপ্রেস ডেলিভারিতে ৩-৪ ঘণ্টার মধ্যে পৌঁছে যায়। ঢাকা সিটির বাইরে ১২০ টাকা। আর ১,০০০ টাকার বেশি অর্ডারে পুরো ডেলিভারি সম্পূর্ণ ফ্রি!",
    actionUrl: "/products",
    actionLabelBn: "📦 ফ্রি ডেলিভারির জন্য শপিং করুন",
    category: "shopping",
  },
  {
    keywords: ["contact", "যোগাযোগ", "ফোন", "phone", "help", "সাহায্য", "whatsapp"],
    titleBn: "সরাসরি খামার হেল্পলাইন",
    responseBn:
      "যেকোনো প্রয়োজনে আমাদের কৃষক সাপোর্ট টিমে সরাসরি কল করুন: ০১৭১২-৩৪৫৬৭৮ অথবা হোয়াটসঅ্যাপে মেসেজ দিন। আমরা সকাল ৮টা থেকে রাত ১০টা পর্যন্ত সক্রিয় থাকি।",
    actionUrl: "/contact",
    actionLabelBn: "📞 যোগাযোগ পেজে যান",
    category: "about",
  },
];

export const quickQuestions: { textBn: string; intentKey: string }[] = [
  { textBn: "📊 ড্যাশবোর্ড কোথায়?", intentKey: "dashboard" },
  { textBn: "🛒 পণ্য কীভাবে কিনব?", intentKey: "buy" },
  { textBn: "🌿 গ্রীনরুটের উদ্দেশ্য কি?", intentKey: "purpose" },
  { textBn: "🚚 অর্ডার কীভাবে ট্র্যাক করব?", intentKey: "track" },
  { textBn: "🔐 অ্যাডমিন প্যানেল কোথায়?", intentKey: "admin" },
  { textBn: "🥛 খাঁটি দুধ ও ঘি এর বিস্তারিত", intentKey: "milk" },
];

export const tourSteps: TourStep[] = [
  {
    step: 1,
    badgeBn: "ধাপ ১: হেডার ও মেনু",
    titleBn: "নেভিগেশন ও ফার্ম মেনু",
    descriptionBn:
      "উপরে থাকা মেনু থেকে আপনি হোম, ফার্ম শপ, আমাদের গল্প, ব্লগ ও কন্টাক্ট পেজে সরাসরি যেতে পারবেন।",
    route: "/",
  },
  {
    step: 2,
    badgeBn: "ধাপ ২: ফার্ম শপ",
    titleBn: "খামার ফ্রেশ অর্গানিক বাজার",
    descriptionBn:
      "এখানে দুধ, ঘি, তেল, মধু, খেজুর, শাকসবজি ও দেশি মাছসহ সব পণ্যের ল্যাব টেস্ট সনদ ও লাইভ স্টক দেখতে পাবেন।",
    route: "/products",
  },
  {
    step: 3,
    badgeBn: "ধাপ ৩: ইনস্ট্যান্ট কার্ট ও চেকআউট",
    titleBn: "এক ক্লিকে অর্ডার সম্পন্ন",
    descriptionBn:
      "যেকোনো পণ্যে 'ব্যাগে নিন' বা 'সরাসরি কিনুন' চাপলে দ্রুত কার্ট স্লাইড-আউট হবে এবং মাত্র ৩ ধাপে ক্যাশ অন ডেলিভারিতে অর্ডার করতে পারবেন।",
    route: "/products/pure-raw-cow-milk",
  },
  {
    step: 4,
    badgeBn: "ধাপ ৪: ইউজার ড্যাশবোর্ড",
    titleBn: "লাইভ GPS ম্যাপে অর্ডার ট্র্যাকিং",
    descriptionBn:
      "অর্ডার করার পর ইউজার ড্যাশবোর্ডে গিয়ে রাইডারের লাইভ লোকেশন, ডেলিভারি ক্যালেন্ডার ও অর্গানিক পয়েন্ট দেখতে পারবেন।",
    route: "/dashboard",
  },
  {
    step: 5,
    badgeBn: "ধাপ ৫: অ্যাডমিন HQ",
    titleBn: "ব্যবসা ও স্টক ব্যবস্থাপনা",
    descriptionBn:
      "খামারের নতুন পণ্য আপলোড, মূল্য পরিবর্তন ও অর্ডার ডেলিভারি অনুমোদন করতে অ্যাডমিন প্যানেল ব্যবহার করুন।",
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
    responseBn: `আপনার প্রশ্ন "${query}" বুঝতে পেরেছি। আপনি কি ফার্ম শপ দেখতে চান, ড্যাশবোর্ডে যেতে চান নাকি কোনো নির্দিষ্ট পণ্যের পুষ্টিগুণ জানতে চান? নিচের অপশনগুলোতে ক্লিক করতে পারেন!`,
    actionUrl: "/products",
    actionLabelBn: "🛒 ফার্ম শপে পণ্য দেখুন",
    category: "about",
  };
}
