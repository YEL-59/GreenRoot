import type { UserProfile } from "@/types";

export const initialUserProfile: UserProfile = {
  id: "USR-09412",
  name: "Tanvir Ahmed",
  nameBn: "তানভীর আহমেদ",
  email: "tanvir.ahmed@example.com",
  phone: "+880 1711-987654",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  rewardPoints: 480, // GreenCoins
  walletBalance: 650, // ৳
  memberTier: "Green Gold",
  memberSince: "January 2025",
  totalOrders: 14,
  addresses: [
    {
      id: "addr-1",
      label: "Home",
      recipientName: "তানভীর আহমেদ",
      phone: "01711987654",
      address: "বাড়ি ৪২, ফ্ল্যাট ৪এ, রোড ৭এ, ধানমন্ডি আ/এ",
      district: "Dhaka",
      city: "Dhaka",
      isDefault: true,
    },
    {
      id: "addr-2",
      label: "Office",
      recipientName: "তানভীর আহমেদ (গ্রীন কর্পোরেট)",
      phone: "01711987654",
      address: "লেভেল ৯, গ্রিন গ্র্যান্ডিউর টাওয়ার, রোড ১১, বনানী",
      district: "Dhaka",
      city: "Dhaka",
      isDefault: false,
    },
  ],
  subscriptions: [
    {
      id: "sub-1",
      title: "Daily Fresh Farm Milk (2L)",
      titleBn: "দৈনিক কাঁচা গরুর দুধ (২ লিটার)",
      frequency: "Daily",
      items: "২ লিটার খাঁটি মানিকগঞ্জ ডেইরি দুধ (ভোরবেলা ডেলিভারি)",
      nextDelivery: "Tomorrow at 07:00 AM",
      status: "active",
      pricePerCycle: 220,
      icon: "fa-solid fa-cow",
    },
    {
      id: "sub-2",
      title: "Weekly Organic Shak & Vegetable Basket",
      titleBn: "সাপ্তাহিক তাজা শাকসবজি বাস্কেট",
      frequency: "Weekly",
      items: "লাল শাক, পালং শাক, কচি লাউ ও দেশি সবজির ঝুড়ি (৫ কেজি)",
      nextDelivery: "Saturday, 11 Oct at 08:30 AM",
      status: "active",
      pricePerCycle: 450,
      icon: "fa-solid fa-basket-shopping",
    },
  ],
};

export interface UserNotification {
  id: string;
  title: string;
  titleBn: string;
  message: string;
  messageEn?: string;
  time: string;
  timeBn?: string;
  read: boolean;
  type: "order" | "offer" | "harvest";
}

export const initialNotifications: UserNotification[] = [
  {
    id: "notif-1",
    title: "Order Out for Delivery!",
    titleBn: "আপনার অর্ডার ডেলিভারির পথে!",
    message: "অর্ডার #GR-2026-8841 এর রাইডার সাইফুল ইসলাম আপনার ধানমন্ডি ঠিকানায় রওনা হয়েছেন।",
    messageEn: "Rider Saiful Islam is on the way to your Dhanmondi address for Order #GR-2026-8841.",
    time: "15 min ago",
    timeBn: "১৫ মিনিট আগে",
    read: false,
    type: "order",
  },
  {
    id: "notif-2",
    title: "Winter Harvest Alert!",
    titleBn: "নতুন নলেন গুড় ও খলিশা মধু এসে পৌঁছেছে!",
    message: "যশোরের খাঁটি নলেন গুড়ের নতুন চালান খামার থেকে ঢাকায় পৌঁছেছে। স্টক সীমিত!",
    messageEn: "Fresh batch of pure Nolen Gur from Jashore has arrived at Dhaka cold hub. Limited stock!",
    time: "2 hours ago",
    timeBn: "২ ঘণ্টা আগে",
    read: false,
    type: "harvest",
  },
  {
    id: "notif-3",
    title: "GreenCoins Earned!",
    titleBn: "৫০ গ্রীনকয়েন অর্জিত হয়েছে!",
    message: "আপনার বিগত অর্ডারের জন্য ওয়ালেটে ৫০ কয়েন ক্যাশব্যাক যুক্ত হয়েছে।",
    messageEn: "50 GreenCoins cashback has been credited to your wallet from your recent order.",
    time: "Yesterday",
    timeBn: "গতকাল",
    read: true,
    type: "offer",
  },
];

