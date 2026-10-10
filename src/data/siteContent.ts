export interface HomeContent {
  heroSubtitle: string;
  heroSubtitleBn: string;
  heroTitle: string;
  heroTitleBn: string;
  heroDescription: string;
  heroDescriptionBn: string;
  heroPrimaryBtnText: string;
  heroSecondaryBtnText: string;
  announcementTicker: string;
  announcementTickerActive: boolean;
  trustPillars: {
    id: string;
    icon: string;
    title: string;
    titleBn: string;
    desc: string;
    descBn: string;
  }[];
}

export interface AboutContent {
  headerSubtitle: string;
  headerTitle: string;
  storyTitleBn: string;
  storyParagraphsBn: string[];
  values: {
    id: string;
    icon: string;
    titleBn: string;
    descBn: string;
  }[];
  team: {
    id: string;
    name: string;
    roleBn: string;
    image: string;
    experience: string;
  }[];
}

export interface ContactContent {
  hotline: string;
  whatsapp: string;
  email: string;
  farmAddressBn: string;
  dhakaHubAddressBn: string;
  operatingHoursBn: string;
  emergencyChillerBn: string;
}

export interface FaqItemCMS {
  id: string;
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
  category: "dairy" | "delivery" | "payment" | "purity" | "general";
  active: boolean;
}

export interface PolicySectionCMS {
  id: string;
  titleBn: string;
  tag: string;
  clauses: string[];
  lastUpdated: string;
}

export interface FarmNoticeCMS {
  id: string;
  title: string;
  titleBn: string;
  badge: string;
  date: string;
  active: boolean;
  priority?: "high" | "normal" | "low";
}

export interface BlogArticleCMS {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  excerpt: string;
  excerptBn: string;
  image: string;
  date: string;
  dateBn: string;
  author: string;
  category: string;
  categoryBn: string;
  readTime: string;
  content: string[];
  active: boolean;
}

export interface SiteContentState {
  home: HomeContent;
  about: AboutContent;
  contact: ContactContent;
  faqs: FaqItemCMS[];
  policies: PolicySectionCMS[];
  notices: FarmNoticeCMS[];
  articles: BlogArticleCMS[];
}

export const defaultSiteContent: SiteContentState = {
  home: {
    heroSubtitle: "GreenRoot 100% Organic Farm",
    heroSubtitleBn: "গ্রীনরুট ১০০% খাঁটি ও অর্গানিক খামার",
    heroTitle: "Growing pure organic goodness for a healthier tomorrow",
    heroTitleBn: "১০০% ভেজালমুক্ত, সরাসরি খামার থেকে তাজা পুষ্টি প্রতিদিন",
    heroDescription:
      "Discover the true taste of nature with farm-fresh, chemical-free, and sustainably grown produce. Delivered chilled directly from our partner farms in Manikganj, Pabna and Sundarbans.",
    heroDescriptionBn:
      "মানিকগঞ্জ ও পাবনার নিজস্ব খামার থেকে প্রতিদিন সকালে সংগৃহীত ঘাস খাওয়া দেশি গাভীর খাঁটি দুধ, বিলোনা ঘি ও সুন্দরবনের খলিশা মধু। ৪°C কোল্ড-চেইনে সরাসরি আপনার ঘরে পৌঁছে দিচ্ছি।",
    heroPrimaryBtnText: "তাজা পণ্য কিনুন",
    heroSecondaryBtnText: "খামার পরিচিতি",
    announcementTicker:
      "🌾 ভোরের তাজা কাঁচা দুধ ও খলিশা মধু সংগ্রহ সম্পন্ন! আজকের ডেলিভারি স্লট দ্রুত বুকিং করুন • হেল্পলাইন: 01712-345678",
    announcementTickerActive: true,
    trustPillars: [
      {
        id: "tr-1",
        icon: "fa-solid fa-flask-vial",
        title: "Formalin & Chemical Free",
        titleBn: "১০০% ফরমালিন ও রাসায়নিকমুক্ত",
        desc: "Strict daily photometer purity assay with 0.00% chemical additives.",
        descBn: "প্রতিদিনের সংগৃহীত প্রতিটি ব্যাচ ল্যাব টেস্টে শূন্য ফরমালিন ও মেলামাইন প্রমাণিত।",
      },
      {
        id: "tr-2",
        icon: "fa-solid fa-snowflake",
        title: "4°C Cold-Chain Transit",
        titleBn: "৪°C কোল্ড-চেইন ডেলিভারি",
        desc: "Chilled vans protect vital probiotics and prevent microbial degradation.",
        descBn: "বিশেষায়িত চিলার ভ্যানে ভোরের দোহনের ৪ ঘণ্টার মধ্যে ঢাকাবাসীর দোরগোড়ায়।",
      },
      {
        id: "tr-3",
        icon: "fa-solid fa-award",
        title: "BSTI & ISO 22000 Certified",
        titleBn: "BSTI ও ISO ২২০০০ সার্টিফাইড",
        desc: "Fully compliant with national standard specifications and food hygiene.",
        descBn: "বাংলাদেশ স্ট্যান্ডার্ডস অ্যান্ড টেস্টিং ইনস্টিটিউশন এবং আন্তর্জাতিক খাদ্যমান সনদপ্রাপ্ত।",
      },
      {
        id: "tr-4",
        icon: "fa-solid fa-hand-holding-dollar",
        title: "100% Cash on Delivery & Return",
        titleBn: "পণ্য দেখে ক্যাশ অন ডেলিভারি ও দ্রুত ফেরত",
        desc: "Check taste and seal before payment. Instant hassle-free replacement.",
        descBn: "প্যাকেজিং ও সিল পরীক্ষা করে মূল্য পরিশোধের সুযোগ। কোনো অসঙ্গতিতে তাৎক্ষণিক ফেরত।",
      },
    ],
  },
  about: {
    headerSubtitle: "গ্রীনরুট খামার দর্শন",
    headerTitle: "মাটি থেকে ফসল: সততা ও প্রাকৃতিক শুদ্ধতার প্রতি আমাদের আজীবন অঙ্গীকার",
    storyTitleBn: "আমাদের খামারের পথচলা ও কৃষক অংশীদারিত্ব",
    storyParagraphsBn: [
      "২০১৮ সালে মানিকগঞ্জের এক প্রত্যন্ত গ্রামে মাত্র ৫টি দেশি গাভী এবং এক টুকরো জৈব জমি নিয়ে আমাদের যাত্রা শুরু হয়েছিল। মূল উদ্দেশ্য ছিল একটাই—শহরের প্রতিটি শিশুর মুখে অন্তত খাঁটি, ক্ষতিকর হরমোনমুক্ত দুধ ও নির্ভেজাল খাবার তুলে দেওয়া।",
      "আজ গ্রীনরুট পাবনা, মানিকগঞ্জ ও সুন্দরবনের ১২টিরও বেশি প্রত্যন্ত খামারি পরিবারের সাথে যৌথভাবে কাজ করছে। আমাদের কোনো পণ্যে বাণিজ্যিক প্রিজারভেটিভ বা মেলামাইন ব্যবহার করা হয় না।",
      "আমরা বিশ্বাস করি, স্বাস্থ্যকর খাবারের অধিকার সবার। তাই কৃষককে ন্যায্য মূল্য দিয়ে সরাসরি ভোক্তার কাছে খাঁটি পণ্য পৌঁছে দেওয়াই আমাদের অনুপ্রেরণা।",
    ],
    values: [
      {
        id: "v-1",
        icon: "fa-solid fa-seedling",
        titleBn: "প্রাকৃতিক জৈব চাষাবাদ",
        descBn: "কোনো সিন্থেটিক কীটনাশক বা রাসায়নিক সার ছাড়াই প্রাকৃতিক কম্পোস্টে উৎপাদন।",
      },
      {
        id: "v-2",
        icon: "fa-solid fa-cow",
        titleBn: "মুক্ত চারণভূমির প্রাণীকল্যাণ",
        descBn: "অ্যান্টিবায়োটিক ও গ্রোথ হরমোন ছাড়া মুক্ত ঘাস খাওয়া সুস্থ গাভীর লালন-পালন।",
      },
      {
        id: "v-3",
        icon: "fa-solid fa-truck-fast",
        titleBn: "ভোরের কোল্ড-চেইন শৃঙ্খলা",
        descBn: "খামার থেকে ঘরে পৌঁছানো পর্যন্ত সার্বক্ষণিক ৪°C তাপমাত্রা নিয়ন্ত্রণ।",
      },
      {
        id: "v-4",
        icon: "fa-solid fa-handshake-angle",
        titleBn: "কৃষকের সরাসরি অধিকার",
        descBn: "মধ্যস্বত্বভোগী ছাড়া স্থানীয় কৃষক ও মৌয়ালদের সর্বোচ্চ ন্যায্য পারিশ্রমিক প্রদান।",
      },
    ],
    team: [
      {
        id: "tm-1",
        name: "ড. মোস্তাফিজুর রহমান",
        roleBn: "প্রধান ভেটেরিনারি ও ডেইরি বিশেষজ্ঞ",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        experience: "১২+ বছর খামার গবেষণা",
      },
      {
        id: "tm-2",
        name: "ড. মাসুম বিল্লাহ",
        roleBn: "কোয়ালিটি ও ল্যাব অডিট ডিরেক্টর",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        experience: "সাবেক বার্ক (BARC) রিসার্চ ফেলো",
      },
      {
        id: "tm-3",
        name: "মোছাঃ নাজমুন নাহার",
        roleBn: "প্রধান কৃষিবিদ ও জৈব সার গবেষক",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        experience: "বাংলাদেশ কৃষি বিশ্ববিদ্যালয়",
      },
    ],
  },
  contact: {
    hotline: "01712-345678",
    whatsapp: "01712-345678",
    email: "support@greenrootfarm.com",
    farmAddressBn: "মানিকগঞ্জ ডেইরি জোন, ঢাকা-আরিচা মহাসড়ক, মানিকগঞ্জ",
    dhakaHubAddressBn: "গ্রীনরুট ডিস্ট্রিবিউশন হাব, বাড়ি #১২, রোড #০৪, ধানমন্ডি, ঢাকা-১২০৫",
    operatingHoursBn: "প্রতিদিন ভোর ৬:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত লাইভ কাস্টমার সার্ভিস",
    emergencyChillerBn: "কোল্ড-চেইন জরুরি হেল্পলাইন: 01800-998877",
  },
  faqs: [
    {
      id: "faq-1",
      question: "How do you guarantee milk is formalin free?",
      questionBn: "আপনারা কীভাবে নিশ্চিত করেন যে দুধে ফরমালিন নেই?",
      answer: "Every morning batch undergoes spectrophotometric testing before dispatch. Lab certificates are accessible online.",
      answerBn: "প্রতিদিন সকালে মানিকগঞ্জ খামার থেকে দুধ সংগ্রহের সাথে সাথে আধুনিক ডিজিটাল কিট এবং স্পেকট্রোফোটোমিটার দিয়ে টেস্ট করা হয়। আমাদের টেস্ট রেজাল্ট ১০০% ফরমালিনমুক্ত (০.০০% PPM)।",
      category: "dairy",
      active: true,
    },
    {
      id: "faq-2",
      question: "What is your delivery timing in Dhaka?",
      questionBn: "ঢাকায় ডেলিভারির সময়সূচি কেমন?",
      answer: "We offer dawn slots (6 AM - 8 AM), afternoon slots, and 4-hour express cold delivery.",
      answerBn: "আমরা ভোর ৬:০০ - ৮:৩০ টা (সকালের নাস্তার আগে) এবং বিকাল ৪:০০ - ৬:৩০ টার স্লটে বিশেষায়িত কোল্ড-বক্সে ডেলিভারি দিই।",
      category: "delivery",
      active: true,
    },
    {
      id: "faq-3",
      question: "Can I inspect the product before paying?",
      questionBn: "ডেলিভারিম্যানের সামনে পণ্য দেখে টাকা দেওয়া যাবে কি?",
      answer: "Yes, you can inspect seals, aroma, and packaging on Cash on Delivery.",
      answerBn: "অবশ্যই! আমাদের ডেলিভারিম্যানের সামনে জারের সিল ও প্যাকেজিং পরীক্ষা করে ক্যাশ অন ডেলিভারিতে বা বিকাশ/নগদে পেমেন্ট করতে পারবেন।",
      category: "payment",
      active: true,
    },
    {
      id: "faq-4",
      question: "How is Sundarbans raw honey collected?",
      questionBn: "সুন্দরবনের খাঁটি মধু কীভাবে সংগ্রহ করা হয়?",
      answer: "Harvested directly by local Mouyals inside mangrove reserve forests without boiling or artificial sugar syrups.",
      answerBn: "সুন্দরবনের অনুমোদিত মৌয়ালদের সাথে সরাসরি গিয়ে প্রাকৃতিক মৌচাক কেটে সংগ্রহ করা হয়। এটি কখনোই হিটিং বা চিনির সিরাপে মেশানো হয় না।",
      category: "purity",
      active: true,
    },
  ],
  policies: [
    {
      id: "pol-1",
      titleBn: "৪°C কোল্ড-চেইন তাজাতার নিশ্চয়তা পলিসি",
      tag: "Freshness Policy",
      clauses: [
        "খামার থেকে কাঁচা দুধ দোহনের সর্বোচ্চ ১৫ মিনিটের মধ্যে ৪°C চিলারে স্থানান্তর করা হয়।",
        "ডেলিভারি ভ্যানে সবসময় সেন্সর দ্বারা তাপমাত্রা মনিটর করা হয় যাতে ব্যাকটেরিয়ার বিস্তার শূন্য থাকে।",
        "গ্রাহক প্যাকেট খোলার পর কোনোপ্রকার গন্ধ বা অস্বাভাবিক জমাট পেলে ৪ ঘণ্টার মধ্যে বিনা খরচে নতুন বোতল রিপ্লেস করা হবে।",
      ],
      lastUpdated: "২০২৬-১০-১০",
    },
    {
      id: "pol-2",
      titleBn: "তাৎক্ষণিক ক্যাশব্যাক ও রিপ্লেসমেন্ট পলিসি",
      tag: "Refund & Returns",
      clauses: [
        "ডেলিভারি গ্রহণের পর কোনো পণ্যের গুণগত মানে অসন্তুষ্ট হলে ২৪ ঘণ্টার মধ্যে রিফান্ড আবেদন করা যায়।",
        "বিকাশ, নগদ বা ব্যাংক ট্রান্সফারের মাধ্যমে ৩ কার্যঘণ্টার মধ্যে টাকা ফেরত নিশ্চিত করা হয়।",
        "পণ্য ফেরতের জন্য কোনো অতিরিক্ত ডেলিভারি চার্জ প্রযোজ্য হবে না।",
      ],
      lastUpdated: "২০২৬-১০-১০",
    },
    {
      id: "pol-3",
      titleBn: "ব্যক্তিগত তথ্যের নিরাপত্তা ও প্রাইভেসী",
      tag: "Privacy & Data",
      clauses: [
        "গ্রাহকের মোবাইল নম্বর ও ঠিকানা শুধুমাত্র ডেলিভারি ও অর্ডার ট্র্যাক করার কাজেই ব্যবহৃত হয়।",
        "কোনো তৃতীয় পক্ষের কাছে গ্রাহকের তথ্য বিক্রি বা হস্তান্তর করা সম্পূর্ণ নিষিদ্ধ।",
      ],
      lastUpdated: "২০২৬-১০-১০",
    },
  ],
  notices: [
    {
      id: "not-1",
      title: "Fresh Morning Milk Harvest Slot Open",
      titleBn: "মানিকগঞ্জ ডেইরি খামারে ভোরের কাঁচা দুধের স্লট খোলা হয়েছে",
      badge: "Dairy Notice",
      date: "আজকের লাইভ আপডেট",
      active: true,
      priority: "high",
    },
    {
      id: "not-2",
      title: "Sundarbans Raw Honeycomb Stock Arrived",
      titleBn: "সুন্দরবনের খাঁটি প্রাকৃতিক খলিশা মধুর নতুন স্টক ঢাকায় পৌঁছেছে",
      badge: "Stock Update",
      date: "গতকাল",
      active: true,
      priority: "normal",
    },
    {
      id: "not-3",
      title: "Eid Special Bilona Ghee Advance Booking",
      titleBn: "সনাতন বিলোনা ঘি অগ্রিম বুকিংয়ে ১০% ক্যাশব্যাক অফার",
      badge: "Seasonal Offer",
      date: "৩ দিন আগে",
      active: true,
      priority: "normal",
    },
  ],
  articles: [
    {
      id: "art-1",
      slug: "true-benefits-of-organic",
      title: "The True Benefits of Choosing Organic for Your Family",
      titleBn: "কেন পরিবারের দৈনন্দিন খাবারে অর্গানিক খাদ্য অপরিহার্য?",
      excerpt: "Explore why chemical-free produce supports better health, richer nutrition, and a safer environment.",
      excerptBn: "বাণিজ্যিক কীটনাশক ও ফরমালিনযুক্ত খাদ্যের বিপরীতে কেন প্রাকৃতিক উপায়ে উৎপাদিত খাবার আপনার পরিবারের রোগ প্রতিরোধ ক্ষমতা বাড়ায়।",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
      date: "October 5, 2026",
      dateBn: "৫ অক্টোবর, ২০২৬",
      author: "ডা. মাহমুদ হাসান (পুষ্টিবিদ)",
      category: "Health & Nutrition",
      categoryBn: "স্বাস্থ্য ও পুষ্টি",
      readTime: "৪ মিনিট পাঠ",
      content: [
        "বর্তমান সময়ে ভেজালমুক্ত খাবার পাওয়া অন্যতম বড় চ্যালেঞ্জ। বাজারে সহজলভ্য শাকসবজি ও ফলে প্রায়শই অনিয়ন্ত্রিত রাসায়নিক কীটনাশক ও প্রিজারভেটিভ ব্যবহার করা হয়।",
        "অর্গানিক বা জৈব পদ্ধতিতে উৎপাদিত ফসলে কোনো কৃত্রিম কীটনাশক বা রাসায়নিক সার ব্যবহার করা হয় না। প্রাকৃতিক কম্পোস্ট ও কেঁচো সারে উৎপাদিত শাকসবজিতে খনিজ উপাদান, অ্যান্টিঅক্সিডেন্ট ও ভিটামিন অনেক বেশি পরিমাণে সংরক্ষিত থাকে।",
        "গ্রীনরুট খামারে আমরা প্রাকৃতিক পরাগায়ন ও মাটির স্বাভাবিক উর্বরতা বজায় রেখে ফসল ফলাই। এর ফলে প্রতিটি ফল ও শাকসবজিতে থাকে খাঁটি দেশি স্বাদ ও অতুলনীয় সুবাস।",
      ],
      active: true,
    },
    {
      id: "art-2",
      slug: "pure-cow-milk-and-bilona-ghee",
      title: "Pure Cow Milk & Bilona Ghee: Why Traditional Processing Matters",
      titleBn: "খাঁটি গরুর দুধ ও বিলোনা ঘি: কেন সনাতন পদ্ধতিই সেরা?",
      excerpt: "Discover why unadulterated grass-fed milk and earthen-pot bilona ghee are vital superfoods.",
      excerptBn: "ঘাস খাওয়া দেশি গাভীর কাঁচা দুধ ও সনাতন বিলোনা পদ্ধতিতে মাটির হাঁড়িতে তৈরি গাওয়া ঘির অবিশ্বাস্য উপকারিতা।",
      image: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=600&q=80",
      date: "October 2, 2026",
      dateBn: "২ অক্টোবর, ২০২৬",
      author: "ফার্ম টিম গ্রীনরুট",
      category: "Dairy Care",
      categoryBn: "দুগ্ধজাত পণ্য",
      readTime: "৫ মিনিট পাঠ",
      content: [
        "বাণিজ্যিক ডেইরিতে গাভীকে কৃত্রিম হরমোন ও অ্যান্টিবায়োটিক দেওয়া হয় যা দুধে চলে আসে। কিন্তু গ্রীনরুট ডেইরিতে গাভী মুক্তভাবে কাঁচা ঘাস খেয়ে চরে বেড়ায়, যার ফলে দুধ হয় প্রাকৃতিক ও পুষ্টিসমৃদ্ধ।",
        "আমাদের ঘি সাধারণ মাখনের মতো সরাসরি ফ্যাট গরম করে তৈরি হয় না। সনাতন বিলোনা পদ্ধতিতে প্রথমে খাঁটি দুধ থেকে দই তৈরি হয়, তারপর দই মন্থন করে মাখন তুলে মাটির চুলায় মৃদু তাপে ঘি তৈরি করা হয়।",
      ],
      active: true,
    },
    {
      id: "art-3",
      slug: "sundarban-raw-honey-guide",
      title: "Sundarban Raw Honey vs Sugar Syrup: How to Identify Authentic Honey",
      titleBn: "সুন্দরবনের খলিশা মধু: আসল প্রাকৃতিক মধু চেনার উপায়",
      excerpt: "Learn how authentic mangrove wild honey is harvested and how to distinguish it from heat-processed sugar syrups.",
      excerptBn: "গহীন সুন্দরবনের মৌয়ালদের হাত দিয়ে সংগৃহীত প্রাকৃতিক মধুর স্বাদ, ঘ্রাণ ও গুণাগুণ সম্পর্কে জানুন।",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
      date: "September 28, 2026",
      dateBn: "২৮ সেপ্টেম্বর, ২০২৬",
      author: "মৌয়াল আব্দুল জব্বার",
      category: "Honey Harvesting",
      categoryBn: "মধু সংগ্রহ",
      readTime: "৬ মিনিট পাঠ",
      content: [
        "সুন্দরবনের খলিশা ফুলের খাঁটি মধুর একটি বিশেষ বৈশিষ্ট্য হলো এর মনমাতানো প্রাকৃতিক সুবাস এবং হালকা লালচে সোনালী বর্ণ।",
        "বাণিজ্যিক প্রক্রিয়াজাত মধুতে অতিরিক্ত হিটিংয়ের ফলে এনজাইম নষ্ট হয়ে যায় এবং চিনির সিরাপ যোগ করা হয়। কিন্তু কাঁচা মধু ফিল্টার করার পরও এর ভেতর পরাগরেণু ও অ্যান্টিঅক্সিডেন্ট অক্ষুণ্ণ থাকে।",
      ],
      active: true,
    },
  ],
};

const STORAGE_KEY = "greenroot_cms_site_content_v1";

export const getStoredSiteContent = (): SiteContentState => {
  if (typeof window === "undefined") {
    return defaultSiteContent;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSiteContent;
    const parsed = JSON.parse(raw);
    return {
      home: { ...defaultSiteContent.home, ...parsed.home },
      about: { ...defaultSiteContent.about, ...parsed.about },
      contact: { ...defaultSiteContent.contact, ...parsed.contact },
      faqs: parsed.faqs || defaultSiteContent.faqs,
      policies: parsed.policies || defaultSiteContent.policies,
      notices: parsed.notices || defaultSiteContent.notices,
      articles: parsed.articles || defaultSiteContent.articles,
    };
  } catch {
    return defaultSiteContent;
  }
};

export const saveStoredSiteContent = (content: SiteContentState): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    window.dispatchEvent(new CustomEvent("greenroot_cms_updated", { detail: content }));
  } catch (err) {
    console.error("Failed to save site content to localStorage:", err);
  }
};

export const resetStoredSiteContent = (): SiteContentState => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("greenroot_cms_updated", { detail: defaultSiteContent }));
  }
  return defaultSiteContent;
};
