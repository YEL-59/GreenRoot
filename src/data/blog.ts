export interface Article {
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
}

export const articles: Article[] = [
  {
    slug: "true-benefits-of-organic",
    title: "The True Benefits of Choosing Organic for Your Family",
    titleBn: "কেন পরিবারের দৈনন্দিন খাবারে অর্গানিক খাদ্য অপরিহার্য?",
    excerpt: "Explore why chemical-free produce supports better health, richer nutrition, and a safer environment.",
    excerptBn: "বাণিজ্যিক কীটনাশক ও ফরমালিনযুক্ত খাদ্যের বিপরীতে কেন প্রাকৃতিক উপায়ে উৎপাদিত খাবার আপনার পরিবারের রোগ প্রতিরোধ ক্ষমতা বাড়ায়।",
    image: "/images/post-1.jpg",
    date: "October 5, 2026",
    dateBn: "৫ অক্টোবর, ২০২৬",
    author: "ডা. মাহমুদ হাসান (পুষ্টিবিদ)",
    category: "Health & Nutrition",
    categoryBn: "স্বাস্থ্য ও পুষ্টি",
    readTime: "৪ মিনিট পাঠ",
    content: [
      "বর্তমান সময়ে ভেজালমুক্ত খাবার পাওয়া অন্যতম বড় চ্যালেঞ্জ। বাজারে সহজলভ্য শাকসবজি ও ফলে প্রায়শই অনিয়ন্ত্রিত রাসায়নিক কীটনাশক ও প্রিজারভেটিভ ব্যবহার করা হয়, যা মানবদেহে দীর্ঘমেয়াদী বিভিন্ন জটিল রোগের ঝুঁকি তৈরি করে।",
      "অর্গানিক বা জৈব পদ্ধতিতে উৎপাদিত ফসলে কোনো কৃত্রিম কীটনাশক বা রাসায়নিক সার ব্যবহার করা হয় না। প্রাকৃতিক কম্পোস্ট ও কেঁচো সারে উৎপাদিত শাকসবজিতে খনিজ উপাদান, অ্যান্টিঅক্সিডেন্ট ও ভিটামিন অনেক বেশি পরিমাণে সংরক্ষিত থাকে।",
      "গ্রীনরুট খামারে আমরা প্রাকৃতিক পরাগায়ন ও মাটির স্বাভাবিক উর্বরতা বজায় রেখে ফসল ফলাই। এর ফলে প্রতিটি ফল ও শাকসবজিতে থাকে খাঁটি দেশি স্বাদ ও অতুলনীয় সুবাস।"
    ],
  },
  {
    slug: "pure-cow-milk-and-bilona-ghee",
    title: "Pure Cow Milk & Bilona Ghee: Why Traditional Processing Matters",
    titleBn: "খাঁটি গরুর দুধ ও বিলোনা ঘি: কেন সনাতন পদ্ধতিই সেরা?",
    excerpt: "Discover why unadulterated grass-fed milk and earthen-pot bilona ghee are vital superfoods.",
    excerptBn: "ঘাস খাওয়া দেশি গাভীর কাঁচা দুধ ও সনাতন বিলোনা পদ্ধতিতে মাটির হাঁড়িতে তৈরি গাওয়া ঘির অবিশ্বাস্য উপকারিতা।",
    image: "/images/post-2.jpg",
    date: "October 2, 2026",
    dateBn: "২ অক্টোবর, ২০২৬",
    author: "ফার্ম টিম গ্রীনরুট",
    category: "Dairy Care",
    categoryBn: "দুগ্ধজাত পণ্য",
    readTime: "৫ মিনিট পাঠ",
    content: [
      "বাণিজ্যিক ডেইরিতে গাভীকে কৃত্রিম হরমোন ও অ্যান্টিবায়োটিক দেওয়া হয় যা দুধে চলে আসে। কিন্তু গ্রীনরুট ডেইরিতে গাভী মুক্তভাবে কাঁচা ঘাস খেয়ে চরে বেড়ায়, যার ফলে দুধ হয় প্রাকৃতিক ও পুষ্টিসমৃদ্ধ।",
      "আমাদের ঘি সাধারণ মাখনের মতো সরাসরি ফ্যাট গরম করে তৈরি হয় না। সনাতন বিলোনা পদ্ধতিতে প্রথমে খাঁটি দুধ থেকে দই তৈরি হয়, তারপর দই মন্থন করে মাখন তুলে মাটির চুলায় মৃদু তাপে ঘি তৈরি করা হয়। এতে তৈরি হয় সুগন্ধি সোনালী দানাদার ঘি যা এ২ প্রোটিনে ভরপুর।"
    ],
  },
  {
    slug: "sundarban-raw-honey-guide",
    title: "Sundarban Raw Honey vs Sugar Syrup: How to Identify Authentic Honey",
    titleBn: "সুন্দরবনের খলিশা মধু: আসল প্রাকৃতিক মধু চেনার উপায়",
    excerpt: "Learn how authentic mangrove wild honey is harvested and how to distinguish it from heat-processed sugar syrups.",
    excerptBn: "গহীন সুন্দরবনের মৌয়ালদের হাত দিয়ে সংগৃহীত প্রাকৃতিক মধুর স্বাদ, ঘ্রাণ ও গুণাগুণ সম্পর্কে জানুন।",
    image: "/images/post-3.jpg",
    date: "September 28, 2026",
    dateBn: "২৮ সেপ্টেম্বর, ২০২৬",
    author: "মৌয়াল আব্দুল করিম",
    category: "Honey & Superfoods",
    categoryBn: "প্রাকৃতিক মধু",
    readTime: "৩ মিনিট পাঠ",
    content: [
      "সুন্দরবনের খলিশা ও গরান ফুলের মধু অন্যান্য মধুর চেয়ে কিছুটা পাতলা এবং এতে প্রাকৃতিক ফেনাভাব থাকতে পারে। এটি কোনো ত্রুটি নয়, বরং মধু যে কাঁচা এবং কোনো তাপ দেওয়া হয়নি তার প্রমাণ।",
      "কৃত্রিম চিনি-যুক্ত মধু এক ধরনের অতিরিক্ত মিষ্টি স্বাদ দেয়, অন্যদিকে সুন্দরবনের বুনো মধুতে ফুলের প্রাকৃতিক সুবাস এবং মৃদু টক-মিষ্টি ভারসাম্য থাকে।"
    ],
  },
];
