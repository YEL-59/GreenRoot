export type Language = "bn" | "en";

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    shop: string;
    services: string;
    blog: string;
    contact: string;
    dashboard: string;
    admin: string;
    cart: string;
    trackOrder: string;
    login: string;
    callUs: string;
  };
  hero: {
    subtitle: string;
    title: string;
    description: string;
    shopBtn: string;
    exploreBtn: string;
    tagline: string;
  };
  productsSection: {
    badge: string;
    title: string;
    subtitle: string;
    viewShop: string;
    bannerBadge: string;
    bannerTitle: string;
    bannerDesc: string;
    shopNow: string;
  };
  shopPage: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    sortBy: string;
    featured: string;
    priceAsc: string;
    priceDesc: string;
    rating: string;
    resultsCount: string;
    items: string;
    noProducts: string;
    noProductsDesc: string;
    reset: string;
    allCategories: string;
  };
  productCard: {
    addToCart: string;
    inCart: string;
    buyNow: string;
    inStock: string;
    outOfStock: string;
    quickView: string;
    organicCert: string;
    unit: string;
    reviews: string;
    save: string;
  };
  cart: {
    title: string;
    itemsCount: string;
    emptyTitle: string;
    emptySubtitle: string;
    browseProducts: string;
    subtotal: string;
    deliveryFee: string;
    insideDhaka: string;
    outsideDhaka: string;
    total: string;
    checkoutBtn: string;
    clearCart: string;
    close: string;
  };
  cartPage: {
    title: string;
    subtitle: string;
    manageInDashboard: string;
    clearBag: string;
    continueShopping: string;
    orderSummary: string;
    couponPlaceholder: string;
    apply: string;
    couponApplied: string;
    discount: string;
    checkout: string;
    deliveryZone: string;
    guarantee: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    overview: string;
    orders: string;
    addresses: string;
    subscriptions: string;
    rewards: string;
    backToShop: string;
    liveTracking: string;
    driverPhone: string;
    callDriver: string;
    estimatedDelivery: string;
  };
  dashboardCart: {
    title: string;
    subtitle: string;
    activeCartTab: string;
    savedBasketsTab: string;
    quickReorderTab: string;
    cartEmpty: string;
    cartEmptyDesc: string;
    loadBasket: string;
    reorderAll: string;
    syncNotice: string;
    basketAdded: string;
  };
  admin: {
    title: string;
    subtitle: string;
    overview: string;
    products: string;
    orders: string;
    customers: string;
    content: string;
    settings: string;
    addProduct: string;
    totalRevenue: string;
    totalOrders: string;
    activeCustomers: string;
    stockAlerts: string;
  };
  guide: {
    mascotName: string;
    role: string;
    speechDefault: string;
    welcomeMsg: string;
    startTour: string;
    closeChat: string;
    askPlaceholder: string;
    send: string;
    quickTopics: string;
  };
  common: {
    searchPlaceholder: string;
    bengali: string;
    english: string;
    switchLanguage: string;
    currency: string;
    tagline: string;
    allRights: string;
  };
  productDetail: {
    dawnHarvest: string;
    batchNo: string;
    specialOffer: string;
    packaging: string;
    selectPack: string;
    packSavings: string;
    freeDeliveryBanner: string;
    freeDeliveryReached: string;
    freeDeliveryRemaining: string;
    deliverySlot: string;
    deliverySlotTiming: string;
    slotOpen: string;
    quantity: string;
    totalPayable: string;
    addToBag: string;
    addedToBag: string;
    oneClickBuy: string;
    orderPhone: string;
    orderWhatsApp: string;
    trust1Title: string;
    trust1Sub: string;
    trust2Title: string;
    trust2Sub: string;
    trust3Title: string;
    trust3Sub: string;
    trust4Title: string;
    trust4Sub: string;
    comboBadge: string;
    comboTitle: string;
    comboDesc: string;
    comboPrice: string;
    addCombo: string;
    tabBenefits: string;
    tabNutrition: string;
    tabOrigin: string;
    tabStorage: string;
    tabReviews: string;
    benefitsHeading: string;
    benefitDefaultNote: string;
    certifiedPurityScore: string;
    certifiedPurityDesc: string;
    nutritionFactsTitle: string;
    calories: string;
    protein: string;
    naturalFat: string;
    calcium: string;
    labTestingTitle: string;
    labTest1: string;
    labTest2: string;
    labTest3: string;
    originBadge: string;
    originHeading: string;
    originDesc: string;
    farmLocationLabel: string;
    supervisorLabel: string;
    supervisorVal: string;
    milkingTimeLabel: string;
    milkingTimeVal: string;
    storageHeading: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    verifiedReviewsCount: string;
    star5: string;
    star4: string;
    star3: string;
    writeReview: string;
    shareExperience: string;
    shareExperienceDesc: string;
    rateLabel: string;
    yourName: string;
    yourLocation: string;
    feedbackLabel: string;
    feedbackPlaceholder: string;
    submitReview: string;
    reviewSuccessMsg: string;
    relatedBadge: string;
    relatedHeading: string;
    viewAllProducts: string;
    mobileAddBag: string;
    mobileBuy: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  bn: {
    nav: {
      home: "হোম",
      about: "আমাদের সম্পর্কে",
      shop: "খামার পণ্য",
      services: "সেবাসমূহ",
      blog: "কৃষি ব্লগ",
      contact: "যোগাযোগ",
      dashboard: "গ্রাহক পোর্টাল",
      admin: "এডমিন HQ",
      cart: "ব্যাগ",
      trackOrder: "অর্ডার ট্র্যাক",
      login: "লগইন",
      callUs: "হটলাইন",
    },
    hero: {
      subtitle: "প্রকৃতির খাঁটি উপহার • ১০০% অর্গানিক সাভার ও নাটোর খামার",
      title: "প্রকৃতির বুক থেকে সরাসরি খাঁটি ও নিরাপদ অর্গানিক পণ্য",
      description: "কোনো মধ্যস্বত্বভোগী বা কৃত্রিম প্রিজারভেটিভ ছাড়া সাভার ও নাটোরের নিজস্ব খামার থেকে তাজা খাঁটি গরুর দুধ, কাঁচা ঘি, সুন্দরবনের মধু এবং বিষমুক্ত মৌসুমি শাক-সবজি পৌঁছে দিচ্ছি আপনার পরিবারের টেবিলে।",
      shopBtn: "আমাদের পণ্য কিনুন",
      exploreBtn: "খামার সম্পর্কে জানুন",
      tagline: "ফার্ম ফ্রেশ এগ্রিকালচার",
    },
    productsSection: {
      badge: "খামার ফ্রেশ অর্গানিক বাজার",
      title: "ঘরে বসেই কিনুন আসল খামার পণ্য",
      subtitle: "কোনো প্রকার কেমিক্যাল বা ভেজাল ছাড়া সরাসরি আমাদের খামার ও প্রাকৃতিক উৎস থেকে সংগৃহীত।",
      viewShop: "সব পণ্য দেখুন",
      bannerBadge: "সরাসরি খামার থেকে হোম ডেলিভারি",
      bannerTitle: "সপ্তাহের তাজা বাজার ঘরে বসেই অর্ডার করুন",
      bannerDesc: "খাঁটি দুধ, বিলোনা ঘি, সুন্দরবনের মধু, কাঁচা সরিষার তেল ও তাজা মাছ—সব পাবেন এক ঠিকানায়।",
      shopNow: "সব খামার পণ্য কিনুন",
    },
    shopPage: {
      badge: "১০০% খাঁটি ও প্রাকৃতিক খামার পণ্য",
      title: "গ্রীনরুট ফার্ম শপ",
      subtitle: "সরাসরি খামার থেকে সংগৃহীত কাঁচা গরুর দুধ, কাঠের ঘানি ভাঙা তেল, মদিনার খেজুর, সুন্দরবনের মধু এবং তাজা শাকসবজি ও দেশি মাছ—আপনার পরিবারের সুস্বাস্থ্যের নিশ্চয়তায়।",
      searchPlaceholder: "পণ্য খুঁজুন (দুধ, খেজুর, মধু, তেল, শাক...)",
      sortBy: "সাজান:",
      featured: "ফিচার্ড পণ্য",
      priceAsc: "দাম: কম থেকে বেশি",
      priceDesc: "দাম: বেশি থেকে কম",
      rating: "সেরা রেটিং",
      resultsCount: "মোট পাওয়া গেছে:",
      items: "টি খাঁটি পণ্য",
      noProducts: "কোনো পণ্য পাওয়া যায়নি",
      noProductsDesc: "আপনার অনুসন্ধানের সাথে কোনো পণ্য মেলেনি। ভিন্ন শব্দ দিয়ে অনুসন্ধান করুন অথবা সব পণ্য দেখুন।",
      reset: "সব পণ্য রিসেট করুন",
      allCategories: "সব ক্যাটাগরি দেখুন",
    },
    productCard: {
      addToCart: "কার্টে যোগ",
      inCart: "কার্টে আছে",
      buyNow: "এখনই কিনুন",
      inStock: "মজুদ আছে ✓",
      outOfStock: "স্টক শেষ",
      quickView: "এক নজরে দেখুন",
      organicCert: "১০০% অর্গানিক সার্টিফাইড",
      unit: "একক",
      reviews: "রিভিউ",
      save: "সাশ্রয়",
    },
    cart: {
      title: "আপনার শপিং ব্যাগ",
      itemsCount: "টি পণ্য",
      emptyTitle: "আপনার ব্যাগ বর্তমানে খালি",
      emptySubtitle: "খামার থেকে তাজা খাঁটি পণ্য নির্বাচন করে ব্যাগে যোগ করুন",
      browseProducts: "পণ্য তালিকা দেখুন",
      subtotal: "পণ্যের মূল্য (Subtotal)",
      deliveryFee: "ডেলিভারি চার্জ",
      insideDhaka: "ঢাকা সিটির ভেতরে (৳৬০)",
      outsideDhaka: "ঢাকার বাইরে (৳১২০)",
      total: "সর্বমোট পরিশোধযোগ্য",
      checkoutBtn: "অর্ডার নিশ্চিত করতে এগিয়ে যান",
      clearCart: "ব্যাগ খালি করুন",
      close: "বন্ধ করুন",
    },
    cartPage: {
      title: "আপনার শপিং ব্যাগ ও কার্ট ব্যবস্থাপনা",
      subtitle: "নির্বাচিত পণ্যের পরিমাণ পরিবর্তন করুন, প্রোমোকোড যুক্ত করুন এবং খামার থেকে ফ্রেশ ডেলিভারি নিশ্চিত করুন",
      manageInDashboard: "ড্যাশবোর্ডে কার্ট ব্যবস্থাপনা",
      clearBag: "ব্যাগ খালি করুন",
      continueShopping: "আরো কেনাকাটা করুন",
      orderSummary: "অর্ডার সারসংক্ষেপ",
      couponPlaceholder: "কুপন কোড (যেমন: GREEN10)",
      apply: "প্রয়োগ",
      couponApplied: "১০% খামার ডিসকাউন্ট সক্রিয় হয়েছে!",
      discount: "ডিসকাউন্ট ছাড়",
      checkout: "চেকআউটে এগিয়ে যান",
      deliveryZone: "ডেলিভারি এলাকা নির্বাচন করুন:",
      guarantee: "১০০% খাঁটি ও কোল্ড-চেইন সংরক্ষিত ডেলিভারির নিশ্চয়তা",
    },
    dashboard: {
      title: "গ্রাহক ড্যাশবোর্ড (Customer Portal)",
      subtitle: "আপনার সকল খামার অর্ডার, ডেলিভারি ট্র্যাকিং ও সাবস্ক্রিপশন পরিচালনা করুন",
      overview: "ড্যাশবোর্ড ওভারভিউ",
      orders: "অর্ডার হিস্ট্রি ও ট্র্যাকিং",
      addresses: "সংরক্ষিত ঠিকানা",
      subscriptions: "দুধ ও ডিম সাবস্ক্রিপশন",
      rewards: "গ্রীনকয়েন ও ওয়ালেট",
      backToShop: "শপে ফিরে যান",
      liveTracking: "লাইভ জিপিএস রুট ট্র্যাকিং",
      driverPhone: "ডেলিভারিম্যান ফোন",
      callDriver: "সরাসরি কল দিন",
      estimatedDelivery: "আনুমানিক ডেলিভারি",
    },
    dashboardCart: {
      title: "কার্ট ও অর্ডার ম্যানেজমেন্ট সিস্টেম",
      subtitle: "আপনার সক্রিয় ব্যাগের পণ্যসমূহ, প্রি-সেভ করা খামার বাস্কেট এবং অতীত অর্ডারের কুইক রি-অর্ডার",
      activeCartTab: "বর্তমান সক্রিয় ব্যাগ",
      savedBasketsTab: "সেভ করা ফ্যামিলি বাস্কেট",
      quickReorderTab: "অতীত অর্ডার থেকে রি-কার্ট",
      cartEmpty: "আপনার ব্যাগে বর্তমানে কোনো পণ্য নেই",
      cartEmptyDesc: "শপ থেকে খাঁটি পণ্য বেছে নিন অথবা নিচের বাস্কেট থেকে এক ক্লিকে লোড করুন।",
      loadBasket: "বাস্কেট ব্যাগে নিন",
      reorderAll: "সব পণ্য আবার যোগ করুন",
      syncNotice: "এখানে যেকোনো পরিবর্তন স্বয়ংক্রিয়ভাবে আপনার মূল শপিং ব্যাগ ও চেকআউটে সিঙ্ক হবে।",
      basketAdded: "বাস্কেটের সকল পণ্য ব্যাগে সফলভাবে যুক্ত করা হয়েছে!",
    },
    admin: {
      title: "বিজনেস ওভারভিউ (HQ Admin)",
      subtitle: "খামারের দৈনিক বিক্রয়, অর্ডার ডেলিভারি ও পণ্য স্টক পরিচালনা",
      overview: "HQ ওভারভিউ",
      products: "পণ্য ইনভেন্টরি",
      orders: "অর্ডার ব্যবস্থাপনা",
      customers: "গ্রাহক তালিকা",
      content: "খামার নোটিশ ও ব্লগ",
      settings: "বিজনেস সেটিংস",
      addProduct: "+ নতুন পণ্য যুক্ত করুন",
      totalRevenue: "মোট রেভিনিউ",
      totalOrders: "মোট অর্ডার",
      activeCustomers: "সক্রিয় গ্রাহক",
      stockAlerts: "লো স্টক সতর্কতা",
    },
    guide: {
      mascotName: "সবুজ সাথী",
      role: "ফার্ম নেভিগেশন গাইড",
      speechDefault: "ড্যাশবোর্ড বা পণ্য খুঁজছেন? ক্লিক করুন!",
      welcomeMsg: "আসসালামু আলাইকুম! আমি 'সবুজ সাথী' (GreenRoot Guide)। ওয়েবসাইট ব্রাউজ করতে, ইউজার ড্যাশবোর্ড খুঁজতে অথবা পণ্য অর্ডার করতে আমি আপনাকে গাইড করব।",
      startTour: "ওয়েবসাইট ফিচার ট্যুর শুরু করুন",
      closeChat: "চ্যাট বন্ধ করুন",
      askPlaceholder: "কিছু জানতে চান? এখানে লিখুন...",
      send: "পাঠান",
      quickTopics: "জনপ্রিয় বিষয়সমূহ:",
    },
    common: {
      searchPlaceholder: "খাঁটি দুধ, ঘি, মধু, খেজুর খুঁজুন...",
      bengali: "বাংলা",
      english: "English",
      switchLanguage: "ভাষা পরিবর্তন",
      currency: "৳",
      tagline: "অর্গানিক এগ্রো ও ডেইরি",
      allRights: "সর্বস্বত্ব সংরক্ষিত।",
    },
    productDetail: {
      dawnHarvest: "ভোরের তাজা সংগ্রহ (Dawn Harvested)",
      batchNo: "ব্যাচ #GR-2026-FARM",
      specialOffer: "বিশেষ অফার মূল্য",
      packaging: "প্যাকেজিং",
      selectPack: "প্যাক সাইজ বেছে নিন (Select Pack Size):",
      packSavings: "বড় প্যাকে বাড়তি সাশ্রয়!",
      freeDeliveryBanner: "৳১,০০০ টাকার অর্ডারে ফ্রি এক্সপ্রেস ডেলিভারি",
      freeDeliveryReached: "ফ্রি ডেলিভারি প্রযোজ্য! 🎉",
      freeDeliveryRemaining: "আর মাত্র ৳{amount} বাকি",
      deliverySlot: "পরবর্তী এক্সপ্রেস ডেলিভারি স্লট",
      deliverySlotTiming: "আজ বিকাল ৪:০০ - রাত ৮:০০ (ঢাকা সিটিতে ৩ ঘণ্টার মধ্যে ডেলিভারি)",
      slotOpen: "স্লট উন্মুক্ত",
      quantity: "পরিমাণ:",
      totalPayable: "সর্বমোট প্রদেয়:",
      addToBag: "ব্যাগে নিন (Add to Cart)",
      addedToBag: "ব্যাগে যুক্ত হয়েছে ✓",
      oneClickBuy: "সরাসরি কিনুন (1-Click Buy)",
      orderPhone: "ফোনে অর্ডার: ০১৭১২-৩৪৫৬৭৮",
      orderWhatsApp: "হোয়াটসঅ্যাপে অর্ডার",
      trust1Title: "১০০% প্রাকৃতিক",
      trust1Sub: "রাসায়নিক মুক্ত",
      trust2Title: "মানিব্যাক গ্যারান্টি",
      trust2Sub: "ইনস্ট্যান্ট রিফান্ড",
      trust3Title: "ক্যাশ অন ডেলিভারি",
      trust3Sub: "পণ্য দেখে দাম দিন",
      trust4Title: "কোল্ড-চেইন",
      trust4Sub: "৪ ঘণ্টায় ডেলিভারি",
      comboBadge: "খামারের স্বাস্থ্যকর কম্বো অফার",
      comboTitle: "একসাথে কিনুন এবং বাড়তি ১১১ টাকা সাশ্রয় করুন!",
      comboDesc: "খাঁটি দুধের সাথে বিলোনা গাওয়া ঘি ও সুন্দরবনের মধু—পরিপূর্ণ সকালের পুষ্টির জন্য আদর্শ প্যাকেজ।",
      comboPrice: "৩টি পণ্যের কম্বো মূল্য:",
      addCombo: "এক ক্লিকে কম্বো ব্যাগে নিন",
      tabBenefits: "পুষ্টি ও স্বাস্থ্য উপকারিতা",
      tabNutrition: "ল্যাব টেস্ট রিপোর্ট ও মান নিয়ন্ত্রণ",
      tabOrigin: "খামারের উৎস ও সংগ্রহের গল্প",
      tabStorage: "ব্যবহারবিধি ও সংরক্ষণ পরামর্শ",
      tabReviews: "কাস্টমার রিভিউ",
      benefitsHeading: "কেন {title} আপনার পরিবারের প্রতিদিনের পুষ্টির সেরা সমাধান?",
      benefitDefaultNote: "প্রাকৃতিক উৎস থেকে সংগৃহীত হওয়ায় শরীরের রোগ প্রতিরোধ ক্ষমতা বহুগুণ বাড়াতে সহায়তা করে।",
      certifiedPurityScore: "সার্টিফাইড পিউরিটি স্কোর",
      certifiedPurityDesc: "দৈনিক মাইক্রোবায়োলজিক্যাল টেস্টে শূন্য কেমিক্যাল ও ভেজাল নিশ্চিত করা হয়েছে।",
      nutritionFactsTitle: "পুষ্টি উপাদান প্রোফাইল (প্রতি ১০০ মিলি/গ্রাম অনুযায়ী)",
      calories: "ক্যালোরি",
      protein: "প্রোটিন",
      naturalFat: "প্রাকৃতিক ফ্যাট",
      calcium: "ক্যালসিয়াম",
      labTestingTitle: "ল্যাব টেস্টে যা নিশ্চিত করা হয়:",
      labTest1: "০% কৃত্রিম ইউরিয়া ও স্টার্চ",
      labTest2: "হরমোন ও অ্যান্টিবায়োটিক মুক্ত",
      labTest3: "প্রাকৃতিক ঘন সর ও পুষ্টি সংরক্ষিত",
      originBadge: "খামারের গল্প ও ট্র্যাসেবিলিটি",
      originHeading: "সবুজ ঘাসে চরে বেড়ানো গাভী ও খাঁটি সংগ্রহের শপথ",
      originDesc: "আমাদের খামারে গাভীদের কোনো প্রকার কৃত্রিম কমার্শিয়াল ফিড বা হরমোন প্রয়োগ করা হয় না। প্রতিদিন ভোরে সবুজ নেপিয়ার ঘাস ও ভুট্টার তাজা সাইলেজ খেয়ে প্রাকৃতিক পরিবেশে গাভীরা বেড়ে ওঠে।",
      farmLocationLabel: "খামারের অবস্থান:",
      supervisorLabel: "তত্ত্বাবধায়ক:",
      supervisorVal: "গ্রীনরুট কো-অপারেটিভ ডেইরি ফার্মার্স",
      milkingTimeLabel: "মিল্কিং সময়:",
      milkingTimeVal: "ভোর ৫:০০ টা | চিলিং সম্পন্ন: ভোর ৫:৩০ টা",
      storageHeading: "জ্বাল দেওয়ার সঠিক নিয়ম ও সংরক্ষণ গাইডলাইন",
      step1Title: "হালকা আঁচে জ্বাল",
      step1Desc: "পাওয়ার সাথে সাথে পরিষ্কার পাত্রে হালকা আঁচে একবার ফুটিয়ে নামিয়ে ফেলুন। বেশি সময় ধরে অতিরিক্ত ফোটালে পুষ্টিকর এনজাইম নষ্ট হতে পারে।",
      step2Title: "ঘন সর তোলার টিপস",
      step2Desc: "জ্বাল দেওয়ার পর না ঢেকে স্বাভাবিক তাপমাত্রায় ঠান্ডা হতে দিন। এরপর ফ্রিজে রাখলে ওপরে পুরু ও সুস্বাদু সরের আস্তরণ পড়বে।",
      step3Title: "ফ্রিজে সংরক্ষণ",
      step3Desc: "ফ্রিজের সাধারণ চেম্বারে (৪°C তাপমাত্রায়) কাঁচের বোতলে মুখ বন্ধ অবস্থায় ৩-৪ দিন সম্পূর্ণ টাটকা থাকে।",
      verifiedReviewsCount: "জন ভেরিফাইড ক্রেতার মতামত",
      star5: "৫ স্টার",
      star4: "৪ স্টার",
      star3: "৩ স্টার",
      writeReview: "রিভিউ লিখুন",
      shareExperience: "আপনার অভিজ্ঞতা শেয়ার করুন",
      shareExperienceDesc: "সম্পর্কে আপনার সৎ মূল্যায়ন আমাদের খামারের কৃষকদের উৎসাহিত করে।",
      rateLabel: "রেটিং দিন:",
      yourName: "আপনার নাম:",
      yourLocation: "আপনার এলাকা/শহর:",
      feedbackLabel: "বিস্তারিত মতামত:",
      feedbackPlaceholder: "স্বাদ, গন্ধ ও প্যাকেজিং কেমন লেগেছে তা লিখুন...",
      submitReview: "রিভিউ সাবমিট করুন",
      reviewSuccessMsg: "আপনার মূল্যবান পর্যালোচনার জন্য ধন্যবাদ! এটি পর্যালোচনার পর প্রকাশিত হবে।",
      relatedBadge: "আরো খাঁটি সংগ্রহ",
      relatedHeading: "সম্পর্কিত অন্যান্য অর্গানিক পণ্য",
      viewAllProducts: "সব পণ্য দেখুন →",
      mobileAddBag: "ব্যাগে নিন",
      mobileBuy: "কিনুন",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      shop: "Farm Shop",
      services: "Services",
      blog: "Agro Blog",
      contact: "Contact",
      dashboard: "Customer Portal",
      admin: "Admin HQ",
      cart: "Cart",
      trackOrder: "Track Order",
      login: "Login",
      callUs: "Hotline",
    },
    hero: {
      subtitle: "Nature's Pure Gift • 100% Certified Organic Savar & Natore Farms",
      title: "Fresh, Pure & Chemical-Free Organic Produce Directly to Your Family",
      description: "Delivering wholesome raw cow milk, traditional grass-fed ghee, wild Sundarbans honey, and freshly picked pesticide-free vegetables directly from our self-sustained farms to your doorstep.",
      shopBtn: "Shop Farm Products",
      exploreBtn: "Explore Our Farm",
      tagline: "Farm Fresh Agriculture",
    },
    productsSection: {
      badge: "Farm Fresh Organic Produce",
      title: "Pure & Natural Harvest Directly to Your Kitchen",
      subtitle: "Zero artificial additives, preservatives, or chemical fertilizers. Harvested daily with certified lab tests.",
      viewShop: "View All Products",
      bannerBadge: "Direct Farm-to-Door Delivery",
      bannerTitle: "Order Your Weekly Farm Produce from Home",
      bannerDesc: "Pure raw cow milk, bilona ghee, Sundarbans wild honey, cold-pressed oils, and sweet dates—all delivered fresh.",
      shopNow: "Shop Farm Products",
    },
    shopPage: {
      badge: "100% Certified Organic Produce",
      title: "GreenRoot Farm Shop",
      subtitle: "Sourced fresh from our self-sustained farms—raw grass-fed cow milk, traditional bilona ghee, Sundarbans raw honey, cold-pressed wood mill mustard oil, and pesticide-free daily harvests.",
      searchPlaceholder: "Search products (milk, dates, honey, oil, greens...)",
      sortBy: "Sort By:",
      featured: "Featured Produce",
      priceAsc: "Price: Low to High",
      priceDesc: "Price: High to Low",
      rating: "Top Rated",
      resultsCount: "Total Found:",
      items: "Organic Items",
      noProducts: "No Products Found",
      noProductsDesc: "No items matched your search query. Try different keywords or reset filters.",
      reset: "Reset All Filters",
      allCategories: "View All Categories",
    },
    productCard: {
      addToCart: "Add to Bag",
      inCart: "In Bag",
      buyNow: "Buy Now",
      inStock: "In Stock ✓",
      outOfStock: "Out of Stock",
      quickView: "Quick View",
      organicCert: "100% Organic Certified",
      unit: "Unit",
      reviews: "reviews",
      save: "Save",
    },
    cart: {
      title: "Your Shopping Bag",
      itemsCount: "items",
      emptyTitle: "Your Shopping Bag is Empty",
      emptySubtitle: "Explore our farm-fresh catalog and add pure organic goods.",
      browseProducts: "Browse Products",
      subtotal: "Subtotal",
      deliveryFee: "Delivery Fee",
      insideDhaka: "Inside Dhaka (৳60)",
      outsideDhaka: "Outside Dhaka (৳120)",
      total: "Total Payable",
      checkoutBtn: "Proceed to Checkout",
      clearCart: "Clear Bag",
      close: "Close",
    },
    cartPage: {
      title: "Your Shopping Bag & Cart Management",
      subtitle: "Adjust quantities, apply vouchers, and secure fresh cold-chain farm delivery",
      manageInDashboard: "Manage Cart in Dashboard",
      clearBag: "Clear Bag",
      continueShopping: "Continue Shopping",
      orderSummary: "Order Summary",
      couponPlaceholder: "Coupon code (e.g., GREEN10)",
      apply: "Apply",
      couponApplied: "10% Farm Discount Applied!",
      discount: "Discount",
      checkout: "Proceed to Checkout",
      deliveryZone: "Select Delivery Zone:",
      guarantee: "100% Pure & Cold-Chain Secured Farm Delivery Guarantee",
    },
    dashboard: {
      title: "Customer Portal (Dashboard)",
      subtitle: "Track your farm orders, live delivery route and recurring subscriptions",
      overview: "Dashboard Overview",
      orders: "Orders & Live Tracking",
      addresses: "Saved Addresses",
      subscriptions: "Dairy & Egg Subscriptions",
      rewards: "GreenCoins & Wallet",
      backToShop: "Back to Shop",
      liveTracking: "Live GPS Route Tracking",
      driverPhone: "Rider Contact",
      callDriver: "Call Rider",
      estimatedDelivery: "Estimated Delivery",
    },
    dashboardCart: {
      title: "Cart & Order Management System",
      subtitle: "Your active shopping bag, pre-saved recurring family baskets, and 1-click reorder from past deliveries",
      activeCartTab: "Active Shopping Bag",
      savedBasketsTab: "Saved Family Baskets",
      quickReorderTab: "Reorder from Past",
      cartEmpty: "Your shopping bag is currently empty",
      cartEmptyDesc: "Browse the farm shop or 1-click load pre-configured baskets below.",
      loadBasket: "Load Basket to Bag",
      reorderAll: "Add All to Active Bag",
      syncNotice: "Any modifications made here sync in real-time with your shopping bag & checkout drawer.",
      basketAdded: "All basket items were successfully added to your shopping bag!",
    },
    admin: {
      title: "Business Overview (HQ Admin)",
      subtitle: "Manage farm daily sales, deliveries, stock inventory and store operations",
      overview: "HQ Overview",
      products: "Product Inventory",
      orders: "Order Management",
      customers: "Customer Directory",
      content: "Farm Notices & Blog",
      settings: "Store Settings",
      addProduct: "+ Add New Product",
      totalRevenue: "Total Revenue",
      totalOrders: "Total Orders",
      activeCustomers: "Active Customers",
      stockAlerts: "Low Stock Alerts",
    },
    guide: {
      mascotName: "Green Companion",
      role: "Farm Navigation Guide",
      speechDefault: "Looking for products or dashboard? Click me!",
      welcomeMsg: "Hello! I am your GreenRoot Farm Guide. I can help you find products, navigate your customer dashboard, or guide you through our ordering process.",
      startTour: "Start Interactive Website Tour",
      closeChat: "Close Chat",
      askPlaceholder: "Need guidance? Ask here...",
      send: "Send",
      quickTopics: "Popular Topics:",
    },
    common: {
      searchPlaceholder: "Search raw milk, ghee, honey, dates...",
      bengali: "বাংলা",
      english: "English",
      switchLanguage: "Switch Language",
      currency: "৳",
      tagline: "Organic Agro & Dairy",
      allRights: "All Rights Reserved.",
    },
    productDetail: {
      dawnHarvest: "Daily Dawn Harvest",
      batchNo: "Batch #GR-2026-FARM",
      specialOffer: "Special Offer Price",
      packaging: "Packaging",
      selectPack: "Select Pack Size:",
      packSavings: "Extra savings on larger packs!",
      freeDeliveryBanner: "Free express delivery on orders over ৳1,000",
      freeDeliveryReached: "Free delivery unlocked! 🎉",
      freeDeliveryRemaining: "Only ৳{amount} away from free delivery",
      deliverySlot: "Next Express Delivery Slot",
      deliverySlotTiming: "Today 4:00 PM - 8:00 PM (Within 3 hrs inside Dhaka)",
      slotOpen: "Slot Active",
      quantity: "Quantity:",
      totalPayable: "Total Payable:",
      addToBag: "Add to Bag",
      addedToBag: "Added to Bag ✓",
      oneClickBuy: "Buy Now (1-Click Buy)",
      orderPhone: "Order by Phone: 01712-345678",
      orderWhatsApp: "Order via WhatsApp",
      trust1Title: "100% Organic",
      trust1Sub: "Chemical-Free",
      trust2Title: "Money-Back Guarantee",
      trust2Sub: "Instant Refund",
      trust3Title: "Cash on Delivery",
      trust3Sub: "Pay on Inspection",
      trust4Title: "Cold-Chain",
      trust4Sub: "Delivered in 4 Hours",
      comboBadge: "Farm Healthy Combo Bundle",
      comboTitle: "Buy Together & Save ৳111 Extra!",
      comboDesc: "Pure raw cow milk with traditional bilona ghee and Sundarbans wild honey—the perfect morning nutrition bundle.",
      comboPrice: "Combo Price for 3 Items:",
      addCombo: "Add Combo to Bag with 1-Click",
      tabBenefits: "Health & Nutrition Benefits",
      tabNutrition: "Lab Test Reports & Quality",
      tabOrigin: "Farm Provenance & Story",
      tabStorage: "Usage & Storage Guide",
      tabReviews: "Customer Reviews",
      benefitsHeading: "Why {title} is the ultimate nutritional choice for your family?",
      benefitDefaultNote: "Naturally harvested without additives to maximize immunity and wholesome well-being.",
      certifiedPurityScore: "Certified Purity Score",
      certifiedPurityDesc: "Daily microbiological testing guarantees zero adulteration, formalin, or artificial thickeners.",
      nutritionFactsTitle: "Nutritional Profile (Per 100ml / 100g)",
      calories: "Calories",
      protein: "Protein",
      naturalFat: "Natural Fat",
      calcium: "Calcium",
      labTestingTitle: "What Our Lab Tests Guarantee:",
      labTest1: "0% Artificial Urea & Starch",
      labTest2: "Hormone & Antibiotic-Free",
      labTest3: "Rich Natural Cream Layer & Enzymes",
      originBadge: "Farm Provenance & Traceability",
      originHeading: "Grass-Fed Pastures & Dedicated Ethical Animal Care",
      originDesc: "Our cows thrive in open green pastures eating fresh Napier grass and seasonal corn silage. We never administer growth hormones or commercial synthetic feed.",
      farmLocationLabel: "Farm Location:",
      supervisorLabel: "Farm Cooperative:",
      supervisorVal: "GreenRoot Dairy Farmers Guild",
      milkingTimeLabel: "Milking Time:",
      milkingTimeVal: "5:00 AM Dawn | Chilled by 5:30 AM",
      storageHeading: "Boiling Instructions & Storage Guidelines",
      step1Title: "Gentle Low Heat",
      step1Desc: "Bring to a gentle boil once in a clean saucepan right after delivery. Avoid prolonged over-boiling to retain active enzymes.",
      step2Title: "Thick Cream Layer Tip",
      step2Desc: "Allow it to cool uncovered at room temperature, then place it in the refrigerator. A thick, golden cream layer will form.",
      step3Title: "Refrigerated Storage",
      step3Desc: "Keeps fresh for 3-4 days in sealed glass containers inside the main refrigerator shelf at 4°C.",
      verifiedReviewsCount: "Verified Customer Reviews",
      star5: "5 Star",
      star4: "4 Star",
      star3: "3 Star",
      writeReview: "Write a Review",
      shareExperience: "Share Your Experience",
      shareExperienceDesc: "Your honest feedback supports and inspires our hardworking rural farm team.",
      rateLabel: "Your Rating:",
      yourName: "Your Full Name:",
      yourLocation: "Your Area / City:",
      feedbackLabel: "Detailed Review:",
      feedbackPlaceholder: "Tell us about the taste, aroma, freshness and packaging...",
      submitReview: "Submit Review",
      reviewSuccessMsg: "Thank you for your valuable review! It has been submitted for verification.",
      relatedBadge: "More Farm Produce",
      relatedHeading: "Related Organic Products",
      viewAllProducts: "View All Products →",
      mobileAddBag: "Add to Bag",
      mobileBuy: "Buy Now",
    },
  },
};

export type TranslationKey = keyof TranslationSchema;
