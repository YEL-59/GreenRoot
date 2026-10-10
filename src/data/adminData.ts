import type { AdminStats } from "@/types";

export const initialAdminStats: AdminStats = {
  totalRevenue: 348250,
  todayRevenue: 24800,
  totalOrders: 184,
  todayOrders: 14,
  pendingOrders: 5,
  totalProducts: 20,
  lowStockCount: 3,
  totalCustomers: 1240,
  recentSales: [
    { date: "02 Oct", revenue: 28400, orders: 15 },
    { date: "03 Oct", revenue: 32100, orders: 18 },
    { date: "04 Oct", revenue: 39500, orders: 22 },
    { date: "05 Oct", revenue: 41200, orders: 24 },
    { date: "06 Oct", revenue: 36800, orders: 19 },
    { date: "07 Oct", revenue: 45600, orders: 26 },
    { date: "08 Oct", revenue: 24800, orders: 14 },
  ],
  categoryRevenue: [
    { category: "Milk & Dairy", categoryBn: "দুধ ও দুগ্ধজাত (কাঁচা দুধ ও ঘি)", amount: 118400, percentage: 34 },
    { category: "Raw Honey & Gur", categoryBn: "সুন্দরবনের মধু ও নলেন গুড়", amount: 87000, percentage: 25 },
    { category: "Spices & Oils", categoryBn: "ঘানি ভাঙা সরিষার তেল ও মশলা", amount: 59200, percentage: 17 },
    { category: "Premium Dates", categoryBn: "প্রিমিয়াম খেজুর ও ড্রাই ফ্রুটস", amount: 45250, percentage: 13 },
    { category: "Deshi Fish & Protein", categoryBn: "দেশি মাছ ও দেশি হাঁস/মুরগির ডিম", amount: 24400, percentage: 7 },
    { category: "Fresh Shak & Veggies", categoryBn: "ভোরের তাজা শাকসবজি", amount: 14000, percentage: 4 },
  ],
};

export interface AnalyticsTimeframeData {
  label: string;
  revenue: number;
  orders: number;
  aov: number; // Average Order Value
  margin: number; // Profit Margin %
}

export const analyticsData7d: AnalyticsTimeframeData[] = [
  { label: "০২ অক্টো", revenue: 28400, orders: 15, aov: 1893, margin: 28.5 },
  { label: "০৩ অক্টো", revenue: 32100, orders: 18, aov: 1783, margin: 29.1 },
  { label: "০৪ অক্টো", revenue: 39500, orders: 22, aov: 1795, margin: 31.4 },
  { label: "০৫ অক্টো", revenue: 41200, orders: 24, aov: 1716, margin: 30.8 },
  { label: "০৬ অক্টো", revenue: 36800, orders: 19, aov: 1936, margin: 32.2 },
  { label: "০৭ অক্টো", revenue: 45600, orders: 26, aov: 1753, margin: 33.5 },
  { label: "০৮ অক্টো (আজ)", revenue: 24800, orders: 14, aov: 1771, margin: 29.8 },
];

export const analyticsData30d: AnalyticsTimeframeData[] = [
  { label: "সপ্তাহ ১ (১-৭ সেপ্টে)", revenue: 195000, orders: 108, aov: 1805, margin: 29.5 },
  { label: "সপ্তাহ ২ (৮-১৪ সেপ্টে)", revenue: 224500, orders: 122, aov: 1840, margin: 30.2 },
  { label: "সপ্তাহ ৩ (১৫-২১ সেপ্টে)", revenue: 248900, orders: 134, aov: 1857, margin: 31.8 },
  { label: "সপ্তাহ ৪ (২২-২৮ সেপ্টে)", revenue: 278400, orders: 152, aov: 1831, margin: 32.4 },
  { label: "সপ্তাহ ৫ (২৯ সেপ-০৮ অক্টো)", revenue: 248400, orders: 138, aov: 1800, margin: 31.0 },
];

export const analyticsData12m: AnalyticsTimeframeData[] = [
  { label: "জানু", revenue: 420000, orders: 240, aov: 1750, margin: 27.5 },
  { label: "ফেব্রু", revenue: 490000, orders: 275, aov: 1781, margin: 28.2 },
  { label: "মার্চ", revenue: 680000, orders: 370, aov: 1837, margin: 31.5 },
  { label: "এপ্রিল", revenue: 750000, orders: 410, aov: 1829, margin: 32.1 },
  { label: "মে", revenue: 810000, orders: 445, aov: 1820, margin: 31.9 },
  { label: "জুন", revenue: 890000, orders: 490, aov: 1816, margin: 33.0 },
  { label: "জুলাই", revenue: 920000, orders: 505, aov: 1821, margin: 32.5 },
  { label: "আগস্ট", revenue: 980000, orders: 535, aov: 1831, margin: 33.2 },
  { label: "সেপ্টে", revenue: 1080000, orders: 580, aov: 1862, margin: 34.0 },
  { label: "অক্টো (চলতি)", revenue: 348250, orders: 184, aov: 1892, margin: 34.5 },
];

export interface RegionalSalesStat {
  division: string;
  divisionBn: string;
  topAreas: string;
  revenue: number;
  orders: number;
  percentage: number;
  deliverySuccess: number;
  avgHours: number;
}

export const bangladeshRegionalSales: RegionalSalesStat[] = [
  {
    division: "Dhaka Central Metro",
    divisionBn: "ঢাকা সেন্ট্রাল মেট্রো (ধানমন্ডি, গুলশান, বনানী, উত্তরা, মিরপুর)",
    topAreas: "ধানমন্ডি, গুলশান-২, বনানী, উত্তরা সেক্টর ৩/৭/১১, ডিওএইচএস",
    revenue: 215700,
    orders: 114,
    percentage: 62,
    deliverySuccess: 99.4,
    avgHours: 2.8,
  },
  {
    division: "Dhaka Suburbs",
    divisionBn: "ঢাকা উপশহর (সাভার, গাজীপুর, নারায়ণগঞ্জ, কেরানীগঞ্জ)",
    topAreas: "সাভার সেনানিবাস, জয়দেবপুর, চাষাড়া, হাসনাবাদ",
    revenue: 55600,
    orders: 30,
    percentage: 16,
    deliverySuccess: 98.2,
    avgHours: 4.5,
  },
  {
    division: "Chittagong",
    divisionBn: "চট্টগ্রাম বিভাগ (জিইসি, খুলশী, আগ্রাবাদ, নাসিরাবাদ)",
    topAreas: "খুলশী আ/এ, জিইসি মোড়, ওআর নিজাম রোড",
    revenue: 38300,
    orders: 20,
    percentage: 11,
    deliverySuccess: 97.5,
    avgHours: 18.0,
  },
  {
    division: "Sylhet",
    divisionBn: "সিলেট বিভাগ (উপশহর, কুমারপাড়া, শাহী ঈদগাহ)",
    topAreas: "শাহজালাল উপশহর, কুমারপাড়া, জিন্দাবাজার",
    revenue: 20900,
    orders: 11,
    percentage: 6,
    deliverySuccess: 97.0,
    avgHours: 22.0,
  },
  {
    division: "Rajshahi & North Bengal",
    divisionBn: "রাজশাহী ও উত্তরবঙ্গ (বগুড়া, নাটোর, পাবনা)",
    topAreas: "উপশহর রাজশাহী, জলেশ্বরীতলা বগুড়া",
    revenue: 17750,
    orders: 9,
    percentage: 5,
    deliverySuccess: 98.0,
    avgHours: 24.0,
  },
];

export interface PaymentMethodStat {
  method: string;
  methodBn: string;
  share: number;
  amount: number;
  badge: string;
  color: string;
  icon: string;
  settlementStatus: string;
}

export const paymentMethodStats: PaymentMethodStat[] = [
  {
    method: "bKash Payment & Merchant",
    methodBn: "বিকাশ মার্চেন্ট ও ইনস্ট্যান্ট পেমেন্ট",
    share: 54,
    amount: 188055,
    badge: "ইনস্ট্যান্ট সেটেলমেন্ট",
    color: "#E2136E",
    icon: "fa-solid fa-mobile-screen-button",
    settlementStatus: "অটো ব্যাংক ট্রান্সফার (BRAC Bank)",
  },
  {
    method: "Cash on Delivery (COD)",
    methodBn: "ক্যাশ অন ডেলিভারি (হাতে পেয়ে মূল্য পরিশোধ)",
    share: 28,
    amount: 97510,
    badge: "রাইডার ক্যাশ কালেকশন",
    color: "#10b981",
    icon: "fa-solid fa-hand-holding-dollar",
    settlementStatus: "দৈনিক সন্ধ্যা ৬টায় ভল্ট ডিপোজিট",
  },
  {
    method: "Nagad Wallet",
    methodBn: "নগদ পেমেন্ট (পোস্ট অফিস ওয়ালেট)",
    share: 12,
    amount: 41790,
    badge: "টি+১ সেটেলমেন্ট",
    color: "#F7931E",
    icon: "fa-solid fa-wallet",
    settlementStatus: "সাপ্তাহিক রিকনসিলিয়েশন",
  },
  {
    method: "Cards & Online Banking",
    methodBn: "ভিসা / মাস্টারকার্ড ও ডাচ-বাংলা রকেট",
    share: 6,
    amount: 20895,
    badge: "গেটওয়ে পে",
    color: "#3B82F6",
    icon: "fa-solid fa-credit-card",
    settlementStatus: "টি+২ সিটি ব্যাংক গেটওয়ে",
  },
];

export interface HarvestVsDemand {
  item: string;
  itemBn: string;
  sourceOrigin: string;
  harvestToday: number;
  unit: string;
  demandToday: number;
  fillRate: number; // %
  status: "surplus" | "balanced" | "critical";
}

export const harvestVsDemandStats: HarvestVsDemand[] = [
  {
    item: "Raw Grass-Fed Cow Milk",
    itemBn: "ঘরোয়া খাঁটি কাঁচা গরুর দুধ",
    sourceOrigin: "মানিকগঞ্জ ডেইরি খামার",
    harvestToday: 320,
    unit: "লিটার",
    demandToday: 310,
    fillRate: 103,
    status: "balanced",
  },
  {
    item: "Sundarban Wild Honey (Kholisha)",
    itemBn: "সুন্দরবনের প্রাকৃতিক খলিশা মধু",
    sourceOrigin: "সাতক্ষীরা সুন্দরবন বাফার জোন",
    harvestToday: 40,
    unit: "কেজি",
    demandToday: 38,
    fillRate: 105,
    status: "surplus",
  },
  {
    item: "Wood Mill Mustard Oil",
    itemBn: "কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল",
    sourceOrigin: "পাবনা ও নাটোর কাঠের ঘানি",
    harvestToday: 60,
    unit: "লিটার",
    demandToday: 58,
    fillRate: 103,
    status: "balanced",
  },
  {
    item: "Fresh Dawn Shak (Red & Spinach)",
    itemBn: "ভোরের তাজা লাল শাক ও পালং শাক",
    sourceOrigin: "সাভার অর্গানিক প্লট",
    harvestToday: 140,
    unit: "আঁটি",
    demandToday: 155,
    fillRate: 90,
    status: "critical",
  },
  {
    item: "Traditional Bilona Cow Ghee",
    itemBn: "ঐতিহ্যবাহী কাঠের মন্থন বিলোনা ঘি",
    sourceOrigin: "সিরাজগঞ্জ খামার বাটার কুটির",
    harvestToday: 25,
    unit: "কেজি",
    demandToday: 22,
    fillRate: 113,
    status: "surplus",
  },
];

export interface AdminCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  city: string;
  status: "active" | "vip" | "inactive";
}

export const initialCustomers: AdminCustomer[] = [
  {
    id: "CUST-101",
    name: "তানভীর আহমেদ",
    phone: "01711987654",
    email: "tanvir.ahmed@example.com",
    totalOrders: 14,
    totalSpent: 28650,
    lastOrderDate: "08 Oct 2026",
    city: "Dhaka (Dhanmondi)",
    status: "vip",
  },
  {
    id: "CUST-102",
    name: "ফারহানা করিম",
    phone: "01819234567",
    email: "farhana.k@example.com",
    totalOrders: 8,
    totalSpent: 16400,
    lastOrderDate: "08 Oct 2026",
    city: "Dhaka (Banani)",
    status: "active",
  },
  {
    id: "CUST-103",
    name: "মাহমুদ হাসান",
    phone: "01912837465",
    email: "mahmud.h@example.com",
    totalOrders: 5,
    totalSpent: 9200,
    lastOrderDate: "08 Oct 2026",
    city: "Chittagong",
    status: "active",
  },
  {
    id: "CUST-104",
    name: "নাসরিন সুলতানা",
    phone: "01611223344",
    email: "nasrin.s@example.com",
    totalOrders: 21,
    totalSpent: 42100,
    lastOrderDate: "06 Oct 2026",
    city: "Dhaka (Uttara)",
    status: "vip",
  },
  {
    id: "CUST-105",
    name: "কামরুল ইসলাম",
    phone: "01511998877",
    email: "kamrul.i@example.com",
    totalOrders: 2,
    totalSpent: 2850,
    lastOrderDate: "29 Sep 2026",
    city: "Sylhet",
    status: "inactive",
  },
];

export interface FarmNotice {
  id: string;
  title: string;
  titleBn: string;
  badge: string;
  date: string;
  active: boolean;
}

export const initialFarmNotices: FarmNotice[] = [
  {
    id: "not-1",
    title: "Fresh Morning Milking Dispatch Schedule: Everyday 6:00 AM",
    titleBn: "ভোরবেলার খাঁটি দুধ সরবরাহ সময়সূচী: প্রতিদিন সকাল ৬:০০ টা",
    badge: "Dairy Notice",
    date: "08 Oct 2026",
    active: true,
  },
  {
    id: "not-2",
    title: "New Batch of Cold Pressed Mustard Oil Arrived from Pabna Mill",
    titleBn: "পাবনার কাঠের ঘানি থেকে খাঁটি সরিষার তেলের নতুন চালান গৃহীত",
    badge: "Stock Update",
    date: "07 Oct 2026",
    active: true,
  },
  {
    id: "not-3",
    title: "Winter Special: Pre-orders Open for Jessore Nolen Date Palm Jaggery",
    titleBn: "শীতের বিশেষ আয়োজন: যশোরের খাঁটি নলেন গুড়ের অগ্রিম বুকিং শুরু",
    badge: "Seasonal Offer",
    date: "05 Oct 2026",
    active: true,
  },
];
