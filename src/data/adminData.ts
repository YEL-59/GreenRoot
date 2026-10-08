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
    { category: "Milk & Dairy", categoryBn: "দুধ ও দুগ্ধজাত", amount: 118400, percentage: 34 },
    { category: "Raw Honey & Gur", categoryBn: "প্রাকৃতিক মধু ও গুড়", amount: 87000, percentage: 25 },
    { category: "Spices & Oils", categoryBn: "খাঁটি তেল ও মশলা", amount: 59200, percentage: 17 },
    { category: "Premium Dates", categoryBn: "প্রিমিয়াম খেজুর", amount: 45250, percentage: 13 },
    { category: "Deshi Fish & Protein", categoryBn: "দেশি মাছ ও ডিম", amount: 24400, percentage: 7 },
    { category: "Fresh Shak & Veggies", categoryBn: "তাজা শাকসবজি", amount: 14000, percentage: 4 },
  ],
};

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
