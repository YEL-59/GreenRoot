/** Shared types for the GreenRoot Next.js application */

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Author {
  name: string;
  role: string;
  image: string;
}

export interface CounterStat {
  /** numeric part animated by the counter effect */
  value: string;
  /** suffix rendered after the counter, e.g. "+", "k+" */
  suffix?: string;
  label: string;
  icon?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
  icon: string;
  href: string;
}

export interface IconTitleItem {
  icon: string;
  title: string;
  description?: string;
}

export interface SkillItem {
  label: string;
  percent: number;
}

export interface PricingPlan {
  icon: string;
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  href: string;
}

export interface HowWorksStep {
  no: string;
  title: string;
  description: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  href: string;
  socials: SocialLink[];
}

export interface SocialLink {
  icon: string; // font-awesome class, e.g. "fa-brands fa-facebook-f"
  href: string;
  label: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  content: string;
  rating: number;
  author: Author;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  href: string;
  date?: string;
  author?: string;
  category?: string;
  content?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  category: string;
  categoryBn: string;
  price: number;
  originalPrice?: number;
  unit: string;
  unitBn: string;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  stock: number;
  origin: string;
  originBn: string;
  description: string;
  descriptionBn: string;
  benefits: string[];
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
  category: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
}

export interface RouteCheckpoint {
  id: string;
  name: string;
  nameBn: string;
  description: string;
  lat: number;
  lng: number;
  status: "passed" | "active" | "upcoming";
  time?: string;
}

export interface OrderTrackingInfo {
  courierName: string;
  trackingNumber: string;
  currentLocation: string;
  riderName?: string;
  riderPhone?: string;
  riderPhoto?: string;
  estimatedDelivery: string;
  deliveryDate: string;
  deliverySlot: string;
  routeProgress: number; // 0 to 100%
  checkpoints: RouteCheckpoint[];
  timeline: {
    status: OrderStatus;
    title: string;
    titleBn: string;
    description: string;
    time: string;
    completed: boolean;
    current: boolean;
  }[];
}

export interface Order {
  id: string;
  date: string;
  dateBn: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  statusBn: string;
  paymentMethod: "cod" | "bkash" | "nagad" | "card";
  paymentStatus: "paid" | "unpaid";
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    district: string;
    city: string;
    zone: "dhaka" | "outside_dhaka";
  };
  tracking?: OrderTrackingInfo;
}

export interface UserAddress {
  id: string;
  label: "Home" | "Office" | "Farm";
  recipientName: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  isDefault: boolean;
}

export interface FarmSubscription {
  id: string;
  title: string;
  titleBn: string;
  frequency: "Daily" | "Alternate Day" | "Weekly";
  items: string;
  nextDelivery: string;
  status: "active" | "paused";
  pricePerCycle: number;
  icon: string;
}

export interface UserProfile {
  id: string;
  name: string;
  nameBn: string;
  email: string;
  phone: string;
  avatar: string;
  rewardPoints: number;
  walletBalance: number;
  memberTier: "Green Silver" | "Green Gold" | "Green Elite";
  memberSince: string;
  totalOrders: number;
  addresses: UserAddress[];
  subscriptions: FarmSubscription[];
}

export interface AdminStats {
  totalRevenue: number;
  todayRevenue: number;
  totalOrders: number;
  todayOrders: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockCount: number;
  totalCustomers: number;
  recentSales: {
    date: string;
    revenue: number;
    orders: number;
  }[];
  categoryRevenue: {
    category: string;
    categoryBn: string;
    amount: number;
    percentage: number;
  }[];
}
