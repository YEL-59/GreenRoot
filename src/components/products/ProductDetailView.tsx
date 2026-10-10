"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { ModernProductCard } from "@/components/common";
import type { Product } from "@/types";

export type ProductMediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail: string;
  title: string;
  titleBn: string;
  duration?: string;
  badge?: string;
  badgeBn?: string;
  poster?: string;
};

type ProductDetailViewProps = {
  slug: string;
};

export const ProductDetailView = ({ slug }: ProductDetailViewProps) => {
  const router = useRouter();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return notFound();
  }

  const { addToCart, openCart } = useCart();
  const { isBn, t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeVideoChapter, setActiveVideoChapter] = useState(0);
  const [isDocVideoMuted, setIsDocVideoMuted] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<"benefits" | "nutrition" | "video" | "origin" | "storage" | "reviews">("benefits");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false);

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const docVideoRef = useRef<HTMLVideoElement>(null);

  // Pack sizes configuration
  const packOptions = [
    {
      label: isBn
        ? `১ ${product.unitBn} (স্ট্যান্ডার্ড)`
        : `1 ${product.unit} (Standard)`,
      unitText: isBn ? product.unitBn : product.unit,
      multiplier: 1,
      discountExtra: 0,
    },
    {
      label: isBn
        ? `২ ${product.unitBn} (ফ্যামিলি প্যাক)`
        : `2 ${product.unit} (Family Pack)`,
      unitText: isBn ? `২ ${product.unitBn}` : `2 ${product.unit}`,
      multiplier: 2,
      discountExtra: product.price > 500 ? 50 : 5,
    },
    {
      label: isBn
        ? `৫ ${product.unitBn} (সাপ্তাহিক স্টক)`
        : `5 ${product.unit} (Weekly Stock)`,
      unitText: isBn ? `৫ ${product.unitBn}` : `5 ${product.unit}`,
      multiplier: 5,
      discountExtra: product.price > 500 ? 150 : 30,
    },
  ];

  const currentPack = packOptions[selectedPackIndex];
  const unitPrice = product.price * currentPack.multiplier - currentPack.discountExtra;
  const originalUnitPrice = product.originalPrice
    ? product.originalPrice * currentPack.multiplier
    : Math.round(unitPrice * 1.15);

  const discountPercent = Math.round(
    ((originalUnitPrice - unitPrice) / originalUnitPrice) * 100
  );
  const totalSavings = originalUnitPrice - unitPrice;

  // Dynamic Gallery Media (High-res farm photography + 4K Authentic Process Videos)
  const galleryMedia: ProductMediaItem[] = useMemo(() => {
    const isMilk =
      product.category === "milk-dairy" ||
      product.slug.includes("milk") ||
      product.slug.includes("ghee");
    const isHoney =
      product.category === "honey-gur" || product.slug.includes("honey");

    if (isMilk) {
      return [
        {
          id: "m-main",
          type: "image",
          url: product.image,
          thumbnail: product.image,
          title: "Fresh Chilled Pack Presentation",
          titleBn: "তাজা সিলগালা প্যাক ও পরিবেশন",
        },
        {
          id: "m-vid-1",
          type: "video",
          url: "https://assets.mixkit.co/videos/preview/mixkit-cows-in-a-field-eating-grass-42686-large.mp4",
          thumbnail: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=400&q=80",
          poster: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80",
          title: "Manikganj Organic Grass-Fed Cattle Grazing",
          titleBn: "মানিকগঞ্জ খামারে দেশি গাভীর সকালের চারণভূমি ও দোহন",
          duration: "0:38",
          badge: "Farm Harvest",
          badgeBn: "ভোরের খামার ভিডিও",
        },
        {
          id: "m-vid-2",
          type: "video",
          url: "https://assets.mixkit.co/videos/preview/mixkit-pouring-fresh-milk-into-a-glass-43399-large.mp4",
          thumbnail: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80",
          poster: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
          title: "Chiller Bottling & Natural Cream Layer Pouring",
          titleBn: "৪°C চিলিং, কাচের বোতলজাতকরণ ও ঘন সরের প্রমাণ",
          duration: "0:26",
          badge: "Purity Check",
          badgeBn: "ল্যাব ও সিলগালা টেস্ট",
        },
        {
          id: "m-img-1",
          type: "image",
          url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
          thumbnail: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80",
          title: "Food-Grade Sealed Glass Bottle",
          titleBn: "ফুড-গ্রেড সিলগালা কাচের বোতল",
        },
        {
          id: "m-img-2",
          type: "image",
          url: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80",
          thumbnail: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=400&q=80",
          title: "Nutrient Rich Thick Texture",
          titleBn: "ঘন প্রাকৃতিক সর ও পুষ্টিতে ভরপুর",
        },
        {
          id: "m-img-3",
          type: "image",
          url: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80",
          thumbnail: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=400&q=80",
          title: "Grass-Fed Dairy Cattle Herd",
          titleBn: "মুক্ত সবুজ চারণভূমির সুস্থ গাভী",
        },
        {
          id: "m-img-4",
          type: "image",
          url: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
          thumbnail: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=400&q=80",
          title: "BSTI & ISO 22000 Certified Quality Audit",
          titleBn: "BSTI ও ISO ২২০০০ অনুমোদিত ল্যাব অডিট সনদ",
        },
      ];
    }

    if (isHoney) {
      return [
        {
          id: "m-main",
          type: "image",
          url: product.image,
          thumbnail: product.image,
          title: "Pure Raw Wild Honey Presentation",
          titleBn: "সুন্দরবনের প্রাকৃতিক কাঁচা মধু",
        },
        {
          id: "m-vid-1",
          type: "video",
          url: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-fresh-honeycomb-42691-large.mp4",
          thumbnail: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80",
          poster: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
          title: "Sundarbans Deep Forest Raw Honeycomb Extraction",
          titleBn: "সুন্দরবনের গভীর অরণ্যে মৌয়ালদের সরাসরি চাক কাটার দৃশ্য",
          duration: "0:42",
          badge: "Wild Harvest",
          badgeBn: "প্রাকৃতিক চাক কাটা ভিডিও",
        },
        {
          id: "m-vid-2",
          type: "video",
          url: "https://assets.mixkit.co/videos/preview/mixkit-pouring-fresh-milk-into-a-glass-43399-large.mp4",
          thumbnail: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=400&q=80",
          poster: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80",
          title: "Unheated Raw Filtering & Water Drop Test",
          titleBn: "অপ্রক্রিয়াজাত ফিল্টারিং ও পানির ড্রপ টেস্ট ভিডিও",
          duration: "0:28",
          badge: "Purity Check",
          badgeBn: "ল্যাব ও পিউরিটি টেস্ট",
        },
        {
          id: "m-img-1",
          type: "image",
          url: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80",
          thumbnail: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=400&q=80",
          title: "Pure Amber Wild Texture",
          titleBn: "গাঢ় লালচে সোনালী রঙের প্রাকৃতিক মধু",
        },
        {
          id: "m-img-2",
          type: "image",
          url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80",
          thumbnail: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=400&q=80",
          title: "Traditional Wooden Dipper Honey Pour",
          titleBn: "কাঠের চামচে প্রাকৃতিক সান্দ্রতা",
        },
        {
          id: "m-img-3",
          type: "image",
          url: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
          thumbnail: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=400&q=80",
          title: "Zero Sugar Adulteration Lab Certificate",
          titleBn: "১০০% চিনিমুক্ত বিশুদ্ধতার ল্যাব রিপোর্ট",
        },
      ];
    }

    return [
      {
        id: "m-main",
        type: "image",
        url: product.image,
        thumbnail: product.image,
        title: product.title,
        titleBn: product.titleBn,
      },
      {
        id: "m-vid-1",
        type: "video",
        url: "https://assets.mixkit.co/videos/preview/mixkit-wheat-field-under-the-sun-41902-large.mp4",
        thumbnail: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=400&q=80",
        poster: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80",
        title: "Organic Harvest & Solar Drying Field",
        titleBn: "সূর্যালোকে শুকানো সোনালী ফসলের খামার দৃশ্য",
        duration: "0:35",
        badge: "Farm Harvest",
        badgeBn: "ভোরের ফসল সংগ্রহ",
      },
      {
        id: "m-vid-2",
        type: "video",
        url: "https://assets.mixkit.co/videos/preview/mixkit-cows-in-a-field-eating-grass-42686-large.mp4",
        thumbnail: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=400&q=80",
        poster: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=80",
        title: "Slow Cold Pressing & Quality Inspection",
        titleBn: "ঐতিহ্যবাহী কাঠের ঘানি ভাঙানো ও মান নিয়ন্ত্রণ",
        duration: "0:30",
        badge: "Pure Process",
        badgeBn: "খাঁটি প্রসেসিং ভিডিও",
      },
      {
        id: "m-img-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
        thumbnail: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80",
        title: "Sealed Eco Packaging",
        titleBn: "ফুড গ্রেড নিরাপদ এয়ারটাইট জার",
      },
      {
        id: "m-img-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80",
        thumbnail: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=400&q=80",
        title: "Natural Organic Texture",
        titleBn: "খাঁটি প্রাকৃতিক সুবাস ও গুণাগুণ",
      },
      {
        id: "m-img-3",
        type: "image",
        url: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
        thumbnail: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=400&q=80",
        title: "Formalin-Free Lab Purity Certificate",
        titleBn: "১০০% ফরমালিনমুক্ত ল্যাব সার্টিফিকেট",
      },
    ];
  }, [product]);

  const currentMedia = galleryMedia[activeMediaIndex] || galleryMedia[0];

  const checkScrollBounds = () => {
    if (thumbnailContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = thumbnailContainerRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
    }
  };

  useEffect(() => {
    checkScrollBounds();
    const handleResize = () => checkScrollBounds();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [galleryMedia.length]);

  const selectMedia = (idx: number) => {
    setActiveMediaIndex(idx);
    thumbnailRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setTimeout(checkScrollBounds, 300);
  };

  const handleScrollLeft = () => {
    if (thumbnailContainerRef.current) {
      thumbnailContainerRef.current.scrollBy({ left: -160, behavior: "smooth" });
      setTimeout(checkScrollBounds, 250);
    }
  };

  const handleScrollRight = () => {
    if (thumbnailContainerRef.current) {
      thumbnailContainerRef.current.scrollBy({ left: 160, behavior: "smooth" });
      setTimeout(checkScrollBounds, 250);
    }
  };

  const handlePrevMedia = () => {
    const nextIdx = activeMediaIndex > 0 ? activeMediaIndex - 1 : galleryMedia.length - 1;
    selectMedia(nextIdx);
  };

  const handleNextMedia = () => {
    const nextIdx = activeMediaIndex < galleryMedia.length - 1 ? activeMediaIndex + 1 : 0;
    selectMedia(nextIdx);
  };

  // Dedicated Video Chapters for Farm Documentary Section
  const videoChapters = useMemo(() => [
    {
      id: "ch-1",
      title: "Dawn Milking & Herd Health Check",
      titleBn: "ভোরের দোহন ও গাভীর স্বাস্থ্য পর্যবেক্ষণ",
      desc: "Fresh milking directly from grass-fed cows at 5:30 AM with strict hygiene protocols.",
      descBn: "ভোর ৫:৩০ টায় মানিকগঞ্জ খামারে স্বাস্থ্যসম্মত পদ্ধতিতে সরাসরি গাভী থেকে দুধ দোহন।",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cows-in-a-field-eating-grass-42686-large.mp4",
      poster: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80",
      duration: "0:38",
      timestamp: "05:30 AM",
      inspector: isBn ? "ডা. মোস্তাফিজুর রহমান (ভেটেরিনারি সার্জন)" : "Dr. Mostafizur Rahman (DVM)",
      status: isBn ? "সম্পূর্ণ রাসায়নিক ও হরমোনমুক্ত" : "100% Hormone & Chemical Free",
    },
    {
      id: "ch-2",
      title: "4°C Cold-Chain Bottling & Hermetic Seal",
      titleBn: "৪°C কোল্ড-চেইন চিলিং ও কাচের বোতলে সিলগালা",
      desc: "Immediate chilling under 4°C to prevent bacterial growth and preserve natural cream layer.",
      descBn: "দোহনের ১৫ মিনিটের মধ্যে বিশেষ চিলারে ৪°C তাপমাত্রায় সংরক্ষণ ও স্যানিটাইজড কাচের বোতলে সিল।",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-pouring-fresh-milk-into-a-glass-43399-large.mp4",
      poster: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
      duration: "0:26",
      timestamp: "06:15 AM",
      inspector: isBn ? "ইঞ্জি. তারেক হাসান (কোল্ড-চেইন হেড)" : "Engr. Tareq Hasan (Cold-Chain QA)",
      status: isBn ? "খাদ্য-উপযোগী বায়ুরোধক সিল" : "Food-Grade Hermetic Seal",
    },
    {
      id: "ch-3",
      title: "BSTI & Formalin Free Lab Verification",
      titleBn: "BSTI ও মেলামাইন-ফরমালিন ল্যাব পরীক্ষা",
      desc: "Multi-spectrum photometric assay verifying 0.00% formalin and pure fat content.",
      descBn: "বিএসটিআই স্ট্যান্ডার্ড ল্যাব টেস্টে ফরমালিন, মেলামাইন ও কৃত্রিম থিকনার শূন্য প্রমাণিত।",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-fresh-honeycomb-42691-large.mp4",
      poster: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
      duration: "0:30",
      timestamp: "07:00 AM",
      inspector: isBn ? "ড. মাসুম বিল্লাহ (চিফ ফুড কেমিস্ট)" : "Dr. Masum Billah (Chief Food Chemist)",
      status: isBn ? "ল্যাব পিউরিটি স্কোর ৯৯.৮%" : "Lab Purity Score 99.8%",
    },
  ], [isBn]);

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 4);

  // Combo bundle cross-sell products
  const bundleProduct1 = products.find((p) => p.slug === "traditional-cow-ghee") || products[1];
  const bundleProduct2 = products.find((p) => p.slug === "sundarbans-raw-wild-honey") || products[4];
  const bundleOriginalTotal = unitPrice + bundleProduct1.price + bundleProduct2.price;
  const bundleDiscountedPrice = Math.round(bundleOriginalTotal * 0.92);

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        price: unitPrice,
        unitBn: currentPack.unitText,
      },
      quantity,
      false
    );
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        ...product,
        price: unitPrice,
        unitBn: currentPack.unitText,
      },
      quantity,
      false
    );
    router.push("/checkout");
  };

  const handleAddBundle = () => {
    addToCart(product, 1, false);
    addToCart(bundleProduct1, 1, false);
    addToCart(bundleProduct2, 1, false);
    openCart();
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="container px-4 max-w-7xl mx-auto">
        {/* Top Breadcrumb & Live Farm Broadcast Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-4 mb-4 border-b border-stone-200/80">
          <nav className="flex items-center gap-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#002719] font-medium transition-colors">
              {t.nav.home}
            </Link>
            <span className="text-stone-300">/</span>
            <Link href="/products" className="hover:text-[#002719] font-medium transition-colors">
              {t.nav.shop}
            </Link>
            <span className="text-stone-300">/</span>
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-[#002719] font-medium transition-colors"
            >
              {isBn ? product.categoryBn : product.category}
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-stone-900 font-bold truncate max-w-[200px] sm:max-w-none">
              {isBn ? product.titleBn : product.title}
            </span>
          </nav>

          <div className="flex items-center gap-3 self-start md:self-auto text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 font-bold border border-emerald-300/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              {isBn ? "ভোরের তাজা সংগ্রহ (Dawn Harvested)" : "Daily Dawn Harvest"}
            </span>
            <span className="text-stone-400 font-mono hidden sm:inline">
              Batch #GR-2026-FARM
            </span>
          </div>
        </div>

        {/* Hero Interactive Showcase Grid */}
        <div className="bg-white rounded-[32px] p-5 sm:p-8 lg:p-10 shadow-[0_10px_40px_-15px_rgba(0,39,25,0.08)] border border-stone-200/90 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Interactive Multi-Media Cinematic Gallery with Video Support & Sliding Track (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Main Media Viewport (Supports Images + Videos) */}
              <div className="relative rounded-[28px] overflow-hidden bg-stone-950 aspect-[4/3] sm:aspect-square ring-1 ring-black/[0.08] shadow-lg group select-none">
                {currentMedia.type === "video" ? (
                  <div className="relative w-full h-full bg-black flex items-center justify-center">
                    <video
                      ref={mainVideoRef}
                      key={currentMedia.url}
                      src={currentMedia.url}
                      poster={currentMedia.poster || currentMedia.thumbnail}
                      controls
                      autoPlay
                      playsInline
                      loop
                      muted={isVideoMuted}
                      className="w-full h-full object-cover"
                    />

                    {/* Video Live Badge */}
                    <div className="absolute top-3.5 left-14 flex items-center gap-2 z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-md flex items-center gap-1.5 border border-rose-400/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                        {isBn ? (currentMedia.badgeBn || "লাইভ ভিডিও") : (currentMedia.badge || "Live Video")}
                      </span>
                      {currentMedia.duration && (
                        <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-mono font-bold border border-white/20">
                          {currentMedia.duration}
                        </span>
                      )}
                    </div>

                    {/* Video Audio Quick Toggle */}
                    <button
                      type="button"
                      onClick={() => setIsVideoMuted(!isVideoMuted)}
                      className="absolute bottom-14 right-3.5 z-20 w-8 h-8 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-md text-white border border-white/25 flex items-center justify-center text-xs transition-all hover:scale-105 active:scale-95 shadow-md"
                      title={isVideoMuted ? (isBn ? "সাউন্ড চালু করুন" : "Unmute Audio") : (isBn ? "সাউন্ড বন্ধ করুন" : "Mute Audio")}
                      aria-label="Toggle Audio"
                    >
                      <i className={`fa-solid ${isVideoMuted ? "fa-volume-xmark text-amber-300" : "fa-volume-high text-emerald-400"}`}></i>
                    </button>
                  </div>
                ) : (
                  <img
                    src={currentMedia.url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                {/* Top Overlay Vignettes */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 via-black/15 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                {/* Left Arrow Controller on Main Area */}
                <button
                  type="button"
                  onClick={handlePrevMedia}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/45 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/25 transition-all hover:scale-110 active:scale-95 shadow-lg z-20"
                  title={isBn ? "পূর্ববর্তী ছবি/ভিডিও" : "Previous media"}
                  aria-label="Previous Media"
                >
                  <i className="fa-solid fa-chevron-left text-sm"></i>
                </button>

                {/* Right Arrow Controller on Main Area */}
                <button
                  type="button"
                  onClick={handleNextMedia}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/45 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/25 transition-all hover:scale-110 active:scale-95 shadow-lg z-20"
                  title={isBn ? "পরবর্তী ছবি/ভিডিও" : "Next media"}
                  aria-label="Next Media"
                >
                  <i className="fa-solid fa-chevron-right text-sm"></i>
                </button>

                {/* Top Left Floating Badges */}
                <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
                  {product.badge && (
                    <span className="px-3 py-1 rounded-full bg-[#002719]/90 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {product.badge}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-white text-[10px] font-extrabold shadow-md">
                      -{discountPercent}% {isBn ? `ছাড় (৳${totalSavings} সাশ্রয়)` : `Off (Save ৳${totalSavings})`}
                    </span>
                  )}
                </div>

                {/* Top Right Floating Actions */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
                  <button
                    type="button"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-300 ${
                      isWishlisted
                        ? "bg-rose-500 text-white scale-105 shadow-rose-500/40"
                        : "bg-white/85 hover:bg-white text-stone-700 hover:text-rose-500"
                    }`}
                    title={
                      isWishlisted
                        ? (isBn ? "পছন্দ থেকে সরান" : "Remove from Wishlist")
                        : (isBn ? "পছন্দের তালিকায় রাখুন" : "Add to Wishlist")
                    }
                    aria-label="Wishlist"
                  >
                    <i
                      className={`${
                        isWishlisted ? "fa-solid fa-heart" : "fa-regular fa-heart"
                      } text-sm`}
                    ></i>
                  </button>
                </div>

                {/* Media Counter Pill */}
                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold flex items-center gap-1.5 z-10 shadow-sm pointer-events-none">
                  {currentMedia.type === "video" ? (
                    <i className="fa-solid fa-video text-rose-400 text-[10px]"></i>
                  ) : (
                    <i className="fa-regular fa-image text-emerald-400 text-[10px]"></i>
                  )}
                  <span>{activeMediaIndex + 1} / {galleryMedia.length}</span>
                </div>

                {/* Bottom Badges: Provenance & Purity */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-3 py-1 rounded-xl bg-black/65 backdrop-blur-md border border-white/15 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm">
                    <i className="fa-solid fa-location-dot text-[#E8AF30] text-xs"></i>
                    <span>{isBn ? product.originBn : product.origin}</span>
                  </span>

                  <span className="px-3 py-1 rounded-xl bg-emerald-950/85 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <i className="fa-solid fa-shield-halved text-emerald-400 text-xs"></i>
                    <span>{isBn ? "ল্যাব টেস্ট স্কোর ৯৯.৮%" : "Lab Tested Score 99.8%"}</span>
                  </span>
                </div>
              </div>

              {/* Bottom Sliding Carousel with Left & Right Arrow Area Controllers */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  {/* Left Sliding Controller */}
                  <button
                    type="button"
                    onClick={handleScrollLeft}
                    disabled={!canScrollLeft}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white hover:bg-emerald-50 text-stone-700 hover:text-[#002719] border border-stone-200/90 shadow-sm flex items-center justify-center shrink-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none group"
                    title={isBn ? "বামে স্লাইড করুন" : "Slide left"}
                    aria-label="Slide Left"
                  >
                    <i className="fa-solid fa-chevron-left text-xs group-hover:-translate-x-0.5 transition-transform"></i>
                  </button>

                  {/* Horizontal Scrollable Track */}
                  <div
                    ref={thumbnailContainerRef}
                    onScroll={checkScrollBounds}
                    className="flex items-center gap-2.5 overflow-x-auto scrollbar-none scroll-smooth py-1 px-1 flex-1"
                  >
                    {galleryMedia.map((item, idx) => (
                      <button
                        key={item.id}
                        ref={(el) => {
                          thumbnailRefs.current[idx] = el;
                        }}
                        type="button"
                        onClick={() => selectMedia(idx)}
                        className={`relative rounded-2xl overflow-hidden aspect-square w-[72px] sm:w-[82px] shrink-0 border-2 transition-all group ${
                          activeMediaIndex === idx
                            ? "border-[#E8AF30] ring-2 ring-[#E8AF30]/40 scale-102 shadow-md"
                            : "border-stone-200/90 hover:border-stone-400 opacity-75 hover:opacity-100"
                        }`}
                        title={isBn ? item.titleBn : item.title}
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Video Thumbnail Overlay with Play Badge */}
                        {item.type === "video" && (
                          <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-between p-1.5">
                            <span className="self-start px-1 py-0.2 rounded bg-rose-600 text-white text-[8px] font-extrabold uppercase tracking-wider flex items-center gap-0.5 shadow-sm">
                              <span className="w-1 h-1 rounded-full bg-white animate-ping"></span>
                              VID
                            </span>
                            <div className="w-6 h-6 rounded-full bg-[#E8AF30] text-[#002719] flex items-center justify-center shadow-md">
                              <i className="fa-solid fa-play text-[9px] ml-0.5"></i>
                            </div>
                            {item.duration && (
                              <span className="self-end px-1 py-0.2 rounded bg-black/80 text-white text-[8px] font-mono font-bold">
                                {item.duration}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Active Selection Indicator */}
                        {activeMediaIndex === idx && (
                          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#E8AF30] ring-2 ring-white shadow-sm"></span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Right Sliding Controller */}
                  <button
                    type="button"
                    onClick={handleScrollRight}
                    disabled={!canScrollRight}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white hover:bg-emerald-50 text-stone-700 hover:text-[#002719] border border-stone-200/90 shadow-sm flex items-center justify-center shrink-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none group"
                    title={isBn ? "ডানে স্লাইড করুন" : "Slide right"}
                    aria-label="Slide Right"
                  >
                    <i className="fa-solid fa-chevron-right text-xs group-hover:translate-x-0.5 transition-transform"></i>
                  </button>
                </div>

                {/* Subtitle / User Guide Footer */}
                <div className="flex items-center justify-between px-1 text-[11px] text-stone-500 font-medium pt-1">
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <i className="fa-solid fa-arrows-left-right text-[#E8AF30] text-xs"></i>
                    <span>
                      {isBn
                        ? "অ্যারো দিয়ে স্লাইড করে সব ছবি ও ভিডিও দেখুন"
                        : "Use arrows or drag to explore all photos & videos"}
                    </span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 text-emerald-900 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60">
                      <i className="fa-regular fa-image text-[10px]"></i>
                      {galleryMedia.filter((m) => m.type === "image").length} {isBn ? "ছবি" : "Photos"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-rose-900 font-bold bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200/60">
                      <i className="fa-solid fa-video text-[10px]"></i>
                      {galleryMedia.filter((m) => m.type === "video").length} {isBn ? "ভিডিও" : "Videos"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quality Certification Trust Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-emerald-950 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-award text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-emerald-950">
                      {isBn ? "BSTI ও ISO স্ট্যান্ডার্ড সার্টিফাইড পিউরিটি" : "BSTI & ISO Certified Organic Purity"}
                    </h4>
                    <p className="text-[11px] text-emerald-800">
                      {isBn ? "কোনো রাসায়নিক, মেলামাইন বা হরমোন মেশানো নেই।" : "Zero chemical additives, preservatives or artificial thickeners."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-emerald-200/50 text-[11px] font-bold text-emerald-900">
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-snowflake text-emerald-600"></i> {isBn ? "৪°C কোল্ড-চেইন" : "4°C Cold-Chain"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-bottle-droplet text-emerald-600"></i> {isBn ? "খাদ্য-উপযোগী সিলগালা জার" : "Food-Grade Sealed Pack"}
                  </span>
                </div>
              </div>

              {/* 1. Interactive Farm Traceability Passport */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#002719] via-[#003824] to-[#002719] text-white shadow-md border border-emerald-700/40 space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#E8AF30]">
                      {isBn ? "ভোরের সতেজতা ও ট্রেসিবিলিটি পাসপোর্ট" : "Dawn Traceability Passport"}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-300/80 bg-white/10 px-2 py-0.5 rounded border border-white/10">
                    #GR-2026-FARM
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/[0.07] border border-white/10">
                    <span className="text-[10px] text-stone-400 block font-semibold">
                      {isBn ? "খামারের উৎস" : "Farm Origin"}
                    </span>
                    <span className="font-bold text-white text-[11px] line-clamp-1">
                      {isBn ? (product.originBn || "মানিকগঞ্জ ডেইরি বেল্ট") : (product.origin || "Manikganj Dairy Belt")}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.07] border border-white/10">
                    <span className="text-[10px] text-stone-400 block font-semibold">
                      {isBn ? "ল্যাব পিউরিটি স্কোর" : "Lab Purity Score"}
                    </span>
                    <span className="font-bold text-[#E8AF30] text-[11px] flex items-center gap-1">
                      <i className="fa-solid fa-circle-check text-emerald-400 text-[10px]"></i>
                      99.8% Pure
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.07] border border-white/10">
                    <span className="text-[10px] text-stone-400 block font-semibold">
                      {isBn ? "কোল্ড-চেইন ট্র্যাকিং" : "Cold-Chain Flow"}
                    </span>
                    <span className="font-bold text-cyan-300 text-[11px] flex items-center gap-1">
                      <i className="fa-solid fa-snowflake text-[10px]"></i>
                      {isBn ? "৪°C ইনসুলেটেড প্যাক" : "4°C Chilled Pack"}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.07] border border-white/10">
                    <span className="text-[10px] text-stone-400 block font-semibold">
                      {isBn ? "সংগ্রহের সময়" : "Milking / Harvest"}
                    </span>
                    <span className="font-bold text-amber-200 text-[11px] flex items-center gap-1">
                      <i className="fa-regular fa-clock text-[10px]"></i>
                      {isBn ? "ভোর ৫:৩০ টা" : "Dawn 05:30 AM"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowLabModal(true)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98 cursor-pointer"
                >
                  <i className="fa-solid fa-file-shield text-xs"></i>
                  <span>{isBn ? "ল্যাব টেস্ট সার্টিফিকেট ও বিশ্লেষণ দেখুন" : "View Official Lab Certificate & Analysis"}</span>
                </button>
              </div>

              {/* 2. Freshness & Storage Pro-Tips */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-amber-950 text-xs flex items-start gap-2.5">
                <i className="fa-solid fa-temperature-arrow-down text-amber-600 text-sm mt-0.5 shrink-0"></i>
                <div className="leading-relaxed text-[11px]">
                  <strong>{isBn ? "সংরক্ষণ নির্দেশিকা: " : "Storage Tip: "}</strong>
                  {isBn
                    ? "৪°C তাপমাত্রায় রেফ্রিজারেটরে রাখুন। কাঁচা দুধের ক্ষেত্রে ৩ দিন এবং ঘি/মধুর ক্ষেত্রে ১২ মাস পর্যন্ত অক্ষুণ্ণ সতেজতা ও পুষ্টি বজায় থাকবে।"
                    : "Store chilled at 4°C. Raw milk stays fresh for 3 days; ghee and honey maintain maximum nutrition up to 12 months."}
                </div>
              </div>
            </div>

            {/* Right Column: Product Intelligence & Buy Box (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Verified Reviews Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-900 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
                      <i className="fa-solid fa-seedling mr-1.5 text-emerald-700"></i>
                      {isBn ? product.categoryBn : product.category}
                    </span>

                    <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                      {isBn ? `স্টক: ${product.stock} টি উপলব্ধ` : `Stock: ${product.stock} in stock`}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("reviews")}
                    className="flex items-center gap-1.5 text-xs font-extrabold text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-full border border-amber-200 transition-colors"
                  >
                    <i className="fa-solid fa-star text-amber-500"></i>
                    <span className="text-stone-900">{product.rating}</span>
                    <span className="text-stone-500 font-medium underline">
                      ({product.reviewCount} {isBn ? "কাস্টমার রিভিউ" : "reviews"})
                    </span>
                  </button>
                </div>

                {/* Product Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-950 leading-tight mb-1">
                  {isBn ? product.titleBn : product.title}
                </h1>
                <p className="text-stone-500 text-sm font-medium mb-5">
                  {isBn ? product.title : product.titleBn} • 100% Raw Grass-Fed Organic Farm Produce
                </p>

                {/* Price Display Card */}
                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-stone-50 via-stone-50/80 to-emerald-50/40 border border-stone-200/80 mb-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-0.5">
                      {t.productDetail.specialOffer}
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#002719] font-mono tracking-tight">
                        ৳{unitPrice}
                      </span>
                      {originalUnitPrice > unitPrice && (
                        <span className="text-base sm:text-lg text-stone-400 line-through font-mono">
                          ৳{originalUnitPrice}
                        </span>
                      )}
                      <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300/60">
                        {isBn ? `৳${totalSavings} সাশ্রয় (-${discountPercent}%)` : `Save ৳${totalSavings} (-${discountPercent}%)`}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-0.5">
                      {t.productDetail.packaging}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-stone-800 bg-white px-3.5 py-1.5 rounded-xl border border-stone-200 shadow-xs inline-block">
                      {currentPack.unitText}
                    </span>
                  </div>
                </div>

                {/* Interactive Pack Size Selector */}
                <div className="mb-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">
                      {t.productDetail.selectPack}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold">
                      {t.productDetail.packSavings}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {packOptions.map((pack, i) => {
                      const isSelected = selectedPackIndex === i;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedPackIndex(i)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "bg-[#002719] text-white border-[#002719] shadow-md shadow-[#002719]/15"
                              : "bg-white hover:bg-stone-50 text-stone-800 border-stone-200/90"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold mb-1">
                            <span>{pack.label}</span>
                            {isSelected && (
                              <i className="fa-solid fa-circle-check text-[#E8AF30]"></i>
                            )}
                          </div>
                          <div className="text-xs font-mono font-bold">
                            ৳{product.price * pack.multiplier - pack.discountExtra}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Free Delivery Bar Progress */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 mb-5">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-truck-fast text-[#E8AF30]"></i>
                      {t.productDetail.freeDeliveryBanner}
                    </span>
                    <span className="text-emerald-800">
                      {unitPrice * quantity >= 1000
                        ? t.productDetail.freeDeliveryReached
                        : isBn
                        ? `আর মাত্র ৳${Math.max(0, 1000 - unitPrice * quantity)} বাকি`
                        : `Only ৳${Math.max(0, 1000 - unitPrice * quantity)} away`}
                    </span>
                  </div>
                  <div className="w-full bg-amber-200/60 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-700 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, ((unitPrice * quantity) / 1000) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Delivery Slot Countdown Widget */}
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 mb-6 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 shrink-0">
                      <i className="fa-regular fa-clock text-[#E8AF30]"></i>
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block">
                        {t.productDetail.deliverySlot}
                      </span>
                      <span className="text-stone-500 text-[11px]">
                        {t.productDetail.deliverySlotTiming}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold text-[11px] whitespace-nowrap">
                    {t.productDetail.slotOpen}
                  </span>
                </div>
              </div>

              {/* Purchase Controls Box (Interactive Stepper & High Converting Buttons) */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-stone-700">{t.productDetail.quantity}</span>
                    <div className="flex items-center bg-stone-100 rounded-2xl p-1 border border-stone-200">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 rounded-xl bg-white hover:bg-stone-200 text-stone-800 font-extrabold flex items-center justify-center transition-colors shadow-xs active:scale-90"
                        aria-label="Decrease quantity"
                      >
                        <i className="fa-solid fa-minus text-xs"></i>
                      </button>
                      <span className="w-12 text-center font-extrabold font-mono text-stone-900 text-base">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-10 h-10 rounded-xl bg-white hover:bg-stone-200 text-stone-800 font-extrabold flex items-center justify-center transition-colors shadow-xs active:scale-90"
                        aria-label="Increase quantity"
                      >
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-stone-500 block">{t.productDetail.totalPayable}</span>
                    <span className="text-2xl font-extrabold text-[#002719] font-mono">
                      ৳{unitPrice * quantity}
                    </span>
                  </div>
                </div>

                {/* Primary Actions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`py-4 px-6 rounded-2xl font-extrabold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95 ${
                      isAddedFeedback
                        ? "bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400"
                        : "bg-gradient-to-r from-[#002719] via-[#003824] to-[#002719] hover:from-[#E8AF30] hover:to-amber-400 text-white hover:text-[#002719] shadow-[#002719]/20"
                    }`}
                  >
                    <i
                      className={`${
                        isAddedFeedback ? "fa-solid fa-check" : "fa-solid fa-basket-shopping"
                      } text-base`}
                    ></i>
                    <span>{isAddedFeedback ? t.productDetail.addedToBag : t.productDetail.addToBag}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E8AF30] to-amber-400 hover:from-amber-400 hover:to-yellow-500 text-[#002719] font-extrabold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-md shadow-[#E8AF30]/25 active:scale-95"
                  >
                    <i className="fa-solid fa-bolt text-base"></i>
                    <span>{t.productDetail.oneClickBuy}</span>
                  </button>
                </div>

                {/* Direct Phone / WhatsApp Shortcut */}
                <div className="flex items-center justify-center gap-4 text-xs font-bold text-stone-600 pt-1">
                  <a
                    href="tel:01712345678"
                    className="flex items-center gap-1.5 hover:text-[#002719] transition-colors"
                  >
                    <i className="fa-solid fa-phone text-[#E8AF30]"></i>
                    <span>{t.productDetail.orderPhone}</span>
                  </a>
                  <span>•</span>
                  <a
                    href="https://wa.me/8801712345678"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
                  >
                    <i className="fa-brands fa-whatsapp text-emerald-600 text-sm"></i>
                    <span>{t.productDetail.orderWhatsApp}</span>
                  </a>
                </div>

                {/* 4 Customer Assurance Guarantees Grid (2x2) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-stone-200/80">
                  <div className="p-3 rounded-2xl bg-stone-50/80 border border-stone-200/80 shadow-xs hover:border-emerald-300 transition-colors flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      <i className="fa-solid fa-hand-sparkles"></i>
                    </div>
                    <div>
                      <h5 className="font-extrabold text-[11px] text-stone-900 leading-tight">
                        {isBn ? "দোরগোড়ায় টেস্টের সুবিধা" : "Doorstep Taste & Test"}
                      </h5>
                      <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">
                        {isBn ? "পছন্দ না হলে সাথে সাথে ফেরত দিন।" : "Inspect at doorstep, return if not satisfied."}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-stone-50/80 border border-stone-200/80 shadow-xs hover:border-emerald-300 transition-colors flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      <i className="fa-solid fa-leaf"></i>
                    </div>
                    <div>
                      <h5 className="font-extrabold text-[11px] text-stone-900 leading-tight">
                        {isBn ? "১০০% খাঁটি ও নির্ভেজাল" : "100% Raw & Natural"}
                      </h5>
                      <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">
                        {isBn ? "পানি, চিনি বা প্রিজারভেটিভ মুক্ত।" : "Zero water, sugar, or preservatives."}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-stone-50/80 border border-stone-200/80 shadow-xs hover:border-emerald-300 transition-colors flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      <i className="fa-solid fa-truck-fast"></i>
                    </div>
                    <div>
                      <h5 className="font-extrabold text-[11px] text-stone-900 leading-tight">
                        {isBn ? "ভোরের এক্সপ্রেস স্লট" : "Dawn Express Delivery"}
                      </h5>
                      <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">
                        {isBn ? "ভোর ৭:০০ - ৯:০০ চিলিং বক্সে ডেলিভারি।" : "Arrives in chilled box 7 AM - 9 AM."}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-stone-50/80 border border-stone-200/80 shadow-xs hover:border-emerald-300 transition-colors flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      <i className="fa-solid fa-hand-holding-dollar"></i>
                    </div>
                    <div>
                      <h5 className="font-extrabold text-[11px] text-stone-900 leading-tight">
                        {isBn ? "হাতে পেয়ে মূল্য পরিশোধ" : "Cash on Delivery / COD"}
                      </h5>
                      <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">
                        {isBn ? "পণ্য পেয়ে ক্যাশ বা বিকাশে পরিশোধ।" : "Pay via Cash or bKash upon delivery."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Farmer / Caretaker Spotlight Card */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3.5">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    alt="Farmer Rafiqul"
                    className="w-11 h-11 rounded-xl object-cover border-2 border-[#E8AF30] shadow-sm shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h5 className="font-extrabold text-xs text-stone-900">
                        {isBn ? "রফিকুল ইসলাম" : "Md. Rafiqul Islam"}
                      </h5>
                      <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                        {isBn ? "প্রধান খামারি" : "Lead Farmer"}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 italic mt-0.5 leading-snug">
                      {isBn
                        ? '"আমরা ভোরে আমাদের সন্তানদের যে খাঁটি খাদ্য দিই, ঠিক সেটাই যত্নসহকারে আপনার পরিবারের জন্য পাঠাই।"'
                        : '"The exact pure harvest we feed our own children at dawn is what we bottle and deliver to your family."'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Sell Bundle: Frequently Bought Together (Farm Breakfast Essentials) */}
        <div className="bg-gradient-to-br from-[#002719] to-[#003824] rounded-[32px] p-6 sm:p-8 text-white mb-12 shadow-xl border border-emerald-800/60 relative overflow-hidden">
          <div className="max-w-2xl relative z-10 mb-6">
            <span className="text-[#E8AF30] text-xs font-bold uppercase tracking-wider block mb-1">
              {t.productDetail.comboBadge}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
              {t.productDetail.comboTitle}
            </h3>
            <p className="text-emerald-200/80 text-xs sm:text-sm">
              {t.productDetail.comboDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            {/* Products Row */}
            <div className="lg:col-span-8 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Product 1 */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div>
                  <h4 className="font-bold text-xs line-clamp-1">{isBn ? product.titleBn : product.title}</h4>
                  <span className="text-xs font-extrabold text-[#E8AF30] font-mono">৳{unitPrice}</span>
                </div>
              </div>

              <span className="text-lg font-extrabold text-emerald-400">+</span>

              {/* Product 2 */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <img
                  src={bundleProduct1.image}
                  alt={bundleProduct1.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div>
                  <h4 className="font-bold text-xs line-clamp-1">{isBn ? bundleProduct1.titleBn : bundleProduct1.title}</h4>
                  <span className="text-xs font-extrabold text-[#E8AF30] font-mono">৳{bundleProduct1.price}</span>
                </div>
              </div>

              <span className="text-lg font-extrabold text-emerald-400">+</span>

              {/* Product 3 */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <img
                  src={bundleProduct2.image}
                  alt={bundleProduct2.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div>
                  <h4 className="font-bold text-xs line-clamp-1">{isBn ? bundleProduct2.titleBn : bundleProduct2.title}</h4>
                  <span className="text-xs font-extrabold text-[#E8AF30] font-mono">৳{bundleProduct2.price}</span>
                </div>
              </div>
            </div>

            {/* Bundle Checkout Action */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center">
              <span className="text-xs text-emerald-200 block mb-1">{t.productDetail.comboPrice}</span>
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-2xl font-extrabold text-[#E8AF30] font-mono">
                  ৳{bundleDiscountedPrice}
                </span>
                <span className="text-sm text-stone-400 line-through font-mono">
                  ৳{bundleOriginalTotal}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddBundle}
                className="w-full py-3 px-4 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-extrabold text-xs tracking-wide transition-all shadow-md active:scale-95"
              >
                {t.productDetail.addCombo}
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Farm-to-Table Video Documentary & QA Verification Showcase */}
        <div id="farm-video-section" className="bg-gradient-to-br from-[#002719] via-[#001D13] to-[#041F16] rounded-[32px] p-6 sm:p-10 text-white mb-16 border border-emerald-800/60 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow Backgrounds */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E8AF30]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-emerald-800/60 pb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-[#E8AF30] text-xs font-extrabold tracking-wider uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{isBn ? "লাইভ খামার ডকুমেন্টারি ও ল্যাব ভিডিও" : "Live Farm Documentary & Lab Video"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {isBn ? "খামার থেকে ঘরে: খাঁটি সংগ্রহের ভিডিও প্রমাণ" : "Farm to Table: Recorded Harvest & Purity Audit"}
              </h2>
              <p className="text-emerald-200/80 text-xs sm:text-sm mt-1 max-w-2xl">
                {isBn
                  ? "গ্রীনরুট-এর প্রতিটি পণ্য শতভাগ স্বচ্ছ ও জবাবদিহিতামূলক। দেখুন কীভাবে সকালের ভোরে স্বাস্থ্যসম্মতভাবে খাদ্য সংগ্রহ ও ৪°C কোল্ড-চেইনে ঢাকায় পাঠানো হয়।"
                  : "GreenRoot provides 100% transparent provenance. Watch how each batch is dawn harvested, lab tested, and chilled under strict cold-chain compliance."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md text-emerald-300 font-mono text-xs border border-white/10 flex items-center gap-2">
                <i className="fa-solid fa-satellite-dish text-[#E8AF30] text-xs animate-pulse"></i>
                <span>{isBn ? "জিপিএস ভেরিফাইড" : "GPS Verified"}</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-500/30">
                1080p Full HD
              </span>
            </div>
          </div>

          {/* Main Video & Chapters Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative z-10">
            {/* Left 7 Cols: Video Theater */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative rounded-[24px] overflow-hidden bg-black aspect-[16/9] border border-emerald-700/50 shadow-2xl group">
                <video
                  ref={docVideoRef}
                  key={videoChapters[activeVideoChapter].videoUrl}
                  src={videoChapters[activeVideoChapter].videoUrl}
                  poster={videoChapters[activeVideoChapter].poster}
                  controls
                  autoPlay
                  playsInline
                  loop
                  muted={isDocVideoMuted}
                  className="w-full h-full object-cover"
                />

                {/* Floating Chapter Title Tag */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-bold border border-white/20 flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-play text-[#E8AF30] text-xs"></i>
                    <span>
                      {isBn ? `অধ্যায় ০${activeVideoChapter + 1}` : `Chapter 0${activeVideoChapter + 1}`}
                    </span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-[10px] font-extrabold uppercase">
                    {videoChapters[activeVideoChapter].duration}
                  </span>
                </div>

                {/* Quick Audio Toggle */}
                <button
                  type="button"
                  onClick={() => setIsDocVideoMuted(!isDocVideoMuted)}
                  className="absolute bottom-14 right-3.5 z-20 w-8 h-8 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xs transition-all shadow-md"
                  title={isDocVideoMuted ? (isBn ? "সাউন্ড অন করুন" : "Unmute Audio") : (isBn ? "সাউন্ড মিউট করুন" : "Mute Audio")}
                  aria-label="Toggle Audio"
                >
                  <i className={`fa-solid ${isDocVideoMuted ? "fa-volume-xmark text-amber-300" : "fa-volume-high text-emerald-400"}`}></i>
                </button>
              </div>

              {/* Active Chapter Details Card */}
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-extrabold text-sm text-white">
                    {isBn ? videoChapters[activeVideoChapter].titleBn : videoChapters[activeVideoChapter].title}
                  </h4>
                  <p className="text-xs text-emerald-200/80 mt-0.5">
                    {isBn ? videoChapters[activeVideoChapter].descBn : videoChapters[activeVideoChapter].desc}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="inline-block px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    {videoChapters[activeVideoChapter].status}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Interactive Chapter Selectors & Verified QA Audit */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                {isBn ? "ভিডিও অধ্যায় নির্বাচন করুন" : "Select Video Chapter"}
              </span>

              {/* 3 Selectable Video Chapters */}
              <div className="space-y-2.5">
                {videoChapters.map((ch, idx) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setActiveVideoChapter(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center gap-3.5 border ${
                      activeVideoChapter === idx
                        ? "bg-emerald-900/70 border-[#E8AF30] shadow-lg ring-1 ring-[#E8AF30]/40 scale-[1.01]"
                        : "bg-white/5 hover:bg-white/10 border-white/10 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="relative w-16 h-14 rounded-xl overflow-hidden shrink-0 border border-white/15">
                      <img src={ch.poster} alt={ch.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <i className={`fa-solid fa-play text-xs ${activeVideoChapter === idx ? "text-[#E8AF30]" : "text-white"}`}></i>
                      </div>
                      <span className="absolute bottom-0.5 right-0.5 px-1 rounded bg-black/80 text-white text-[8px] font-mono">
                        {ch.duration}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-bold text-[#E8AF30] font-mono">
                          {isBn ? `ধাপ ০${idx + 1}` : `STEP 0${idx + 1}`} • {ch.timestamp}
                        </span>
                        {activeVideoChapter === idx && (
                          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                            {isBn ? "চলছে" : "Playing"}
                          </span>
                        )}
                      </div>
                      <h5 className="font-extrabold text-xs text-white truncate">
                        {isBn ? ch.titleBn : ch.title}
                      </h5>
                      <span className="text-[11px] text-emerald-200/70 truncate block">
                        {ch.inspector}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Lab QA Verification Signoff Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-600/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs">
                      <i className="fa-solid fa-file-shield"></i>
                    </div>
                    <div>
                      <h6 className="font-extrabold text-xs text-white">
                        {isBn ? "ল্যাব টেস্ট ও কোয়ালিটি সিল" : "QA Lab Signoff Certificate"}
                      </h6>
                      <span className="text-[10px] text-emerald-300">
                        {isBn ? "সার্টিফিকেট #GR-BARC-2026" : "Certificate #GR-BARC-2026"}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-400/30">
                    PASSED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-emerald-300/70 block text-[9px] uppercase font-bold">{isBn ? "ফরমালিন টেস্ট" : "Formalin Test"}</span>
                    <span className="font-extrabold text-emerald-300">0.00% PPM</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-emerald-300/70 block text-[9px] uppercase font-bold">{isBn ? "মেলামাইন টেস্ট" : "Melamine Test"}</span>
                    <span className="font-extrabold text-emerald-300">0.00% (Zero)</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-emerald-300/70 block text-[9px] uppercase font-bold">{isBn ? "কোল্ড-চেইন মান" : "Cold-Chain"}</span>
                    <span className="font-extrabold text-emerald-300">3.8°C Constant</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-emerald-300/70 block text-[9px] uppercase font-bold">{isBn ? "ল্যাব স্কোর" : "Purity Score"}</span>
                    <span className="font-extrabold text-[#E8AF30]">99.8% Certified</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] text-emerald-200/80">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-signature text-[#E8AF30]"></i>
                    <span>{isBn ? "চিফ অডিটর: ড. মাসুম বিল্লাহ" : "Lead Auditor: Dr. Masum Billah"}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab("nutrition")}
                    className="text-[#E8AF30] hover:underline font-bold text-[11px]"
                  >
                    {isBn ? "ল্যাব রিপোর্ট দেখুন →" : "View Lab Report →"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Benefits, Nutrition, Video, Origin, Storage, Reviews */}
        <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-sm border border-stone-200/90 mb-16">
          {/* Tab Navigation Header */}
          <div className="flex items-center gap-3 border-b border-stone-200 overflow-x-auto pb-4 mb-8 scrollbar-none">
            <button
              onClick={() => setActiveTab("benefits")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "benefits"
                  ? "bg-[#002719] text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 bg-stone-50"
              }`}
            >
              {t.productDetail.tabBenefits}
            </button>
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "nutrition"
                  ? "bg-[#002719] text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 bg-stone-50"
              }`}
            >
              {t.productDetail.tabNutrition}
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "video"
                  ? "bg-[#002719] text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 bg-stone-50"
              }`}
            >
              <i className="fa-solid fa-circle-play text-xs text-rose-500"></i>
              <span>{isBn ? "খামার ভিডিও ও প্রসেস" : "Farm Video & Process"}</span>
            </button>
            <button
              onClick={() => setActiveTab("origin")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "origin"
                  ? "bg-[#002719] text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 bg-stone-50"
              }`}
            >
              {t.productDetail.tabOrigin}
            </button>
            <button
              onClick={() => setActiveTab("storage")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "storage"
                  ? "bg-[#002719] text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 bg-stone-50"
              }`}
            >
              {t.productDetail.tabStorage}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "reviews"
                  ? "bg-[#002719] text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 bg-stone-50"
              }`}
            >
              {t.productDetail.tabReviews} ({product.reviewCount})
            </button>
          </div>

          {/* Tab 1: Benefits */}
          {activeTab === "benefits" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="max-w-3xl">
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 mb-2">
                  {t.productDetail.benefitsHeading.replace("{title}", isBn ? product.titleBn : product.title)}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {isBn ? (product.descriptionBn || product.description) : product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-stone-50 border border-stone-200/70"
                  >
                    <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 mb-0.5">
                        {b}
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        {t.productDetail.benefitDefaultNote}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Lab Nutrition & Quality Testing */}
          {activeTab === "nutrition" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Purity Score Card */}
                <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-700 text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-3 shadow-md">
                    {isBn ? "৯৯.৮%" : "99.8%"}
                  </div>
                  <h4 className="font-extrabold text-emerald-950 text-base mb-1">
                    {t.productDetail.certifiedPurityScore}
                  </h4>
                  <p className="text-xs text-emerald-800">
                    {t.productDetail.certifiedPurityDesc}
                  </p>
                </div>

                {/* Nutrition Facts Table */}
                <div className="md:col-span-2 p-6 rounded-3xl bg-stone-50 border border-stone-200">
                  <h4 className="font-extrabold text-stone-900 text-sm mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-list-check text-emerald-700"></i>
                    {t.productDetail.nutritionFactsTitle}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                      <span className="text-[11px] text-stone-500 block">{t.productDetail.calories}</span>
                      <span className="text-base font-extrabold text-stone-900 font-mono">{isBn ? "৬৭ kcal" : "67 kcal"}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                      <span className="text-[11px] text-stone-500 block">{t.productDetail.protein}</span>
                      <span className="text-base font-extrabold text-stone-900 font-mono">{isBn ? "৩.৪ গ্রাম" : "3.4 g"}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                      <span className="text-[11px] text-stone-500 block">{t.productDetail.naturalFat}</span>
                      <span className="text-base font-extrabold text-stone-900 font-mono">{isBn ? "৪.২%" : "4.2%"}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                      <span className="text-[11px] text-stone-500 block">{t.productDetail.calcium}</span>
                      <span className="text-base font-extrabold text-stone-900 font-mono">{isBn ? "১২৫ মি.গ্রা." : "125 mg"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab Certification Points */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200/90 space-y-2">
                <h5 className="font-bold text-xs text-stone-900">{t.productDetail.labTestingTitle}</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-emerald-600"></i>
                    <span>{t.productDetail.labTest1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-emerald-600"></i>
                    <span>{t.productDetail.labTest2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-emerald-600"></i>
                    <span>{t.productDetail.labTest3}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Farm Process Video Footage */}
          {activeTab === "video" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                    {isBn ? "খামার প্রসেসিং ও ল্যাব টেস্টের আসল ভিডিও" : "Farm Harvest & Lab Verification Video Footage"}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    {isBn
                      ? "প্রতিটি ভিডিও সরাসরি আমাদের গ্রীনরুট খামার এবং ল্যাব অডিট টিম কর্তৃক ধারণকৃত।"
                      : "Directly captured by GreenRoot quality audit teams during morning harvests and lab tests."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("farm-video-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                >
                  <i className="fa-solid fa-play text-xs text-emerald-700"></i>
                  <span>{isBn ? "ভিডিও থিয়েটারে দেখুন" : "Watch in Video Theater"}</span>
                </button>
              </div>

              {/* Grid of 3 playable video clips */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {videoChapters.map((ch, idx) => (
                  <div
                    key={ch.id}
                    className="rounded-2xl overflow-hidden bg-stone-50 border border-stone-200/90 shadow-sm flex flex-col group hover:border-emerald-600/50 transition-all"
                  >
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <video
                        src={ch.videoUrl}
                        poster={ch.poster}
                        controls
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
                        {isBn ? `অধ্যায় ০${idx + 1}` : `Chapter 0${idx + 1}`}
                      </div>
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-rose-600 text-white text-[9px] font-mono font-bold">
                        {ch.duration}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h4 className="font-extrabold text-xs text-stone-900 line-clamp-1">
                          {isBn ? ch.titleBn : ch.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 line-clamp-2 mt-1">
                          {isBn ? ch.descBn : ch.desc}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px]">
                        <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                          {ch.status}
                        </span>
                        <span className="text-stone-400 font-mono">
                          {ch.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Origin Story */}
          {activeTab === "origin" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold inline-block">
                  {t.productDetail.originBadge}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-950 leading-snug">
                  {t.productDetail.originHeading}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {t.productDetail.originDesc}
                </p>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700">
                  <div className="flex items-center gap-2 font-bold">
                    <i className="fa-solid fa-location-pin text-[#E8AF30]"></i>
                    <span>{t.productDetail.farmLocationLabel} {isBn ? product.originBn : product.origin}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-tractor text-emerald-700"></i>
                    <span>{t.productDetail.supervisorLabel} {t.productDetail.supervisorVal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-clock text-emerald-700"></i>
                    <span>{t.productDetail.milkingTimeLabel} {t.productDetail.milkingTimeVal}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-md border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80"
                  alt="Farm grass pasture"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Tab 4: Storage */}
          {activeTab === "storage" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-extrabold text-stone-900">
                {t.productDetail.storageHeading}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="w-8 h-8 rounded-xl bg-[#002719] text-[#E8AF30] font-extrabold flex items-center justify-center text-xs mb-3">
                    1
                  </span>
                  <h4 className="font-bold text-sm text-stone-900 mb-1">{t.productDetail.step1Title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {t.productDetail.step1Desc}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="w-8 h-8 rounded-xl bg-[#002719] text-[#E8AF30] font-extrabold flex items-center justify-center text-xs mb-3">
                    2
                  </span>
                  <h4 className="font-bold text-sm text-stone-900 mb-1">{t.productDetail.step2Title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {t.productDetail.step2Desc}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="w-8 h-8 rounded-xl bg-[#002719] text-[#E8AF30] font-extrabold flex items-center justify-center text-xs mb-3">
                    3
                  </span>
                  <h4 className="font-bold text-sm text-stone-900 mb-1">{t.productDetail.step3Title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {t.productDetail.step3Desc}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Reviews */}
          {activeTab === "reviews" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-stone-50 p-6 rounded-3xl border border-stone-200">
                <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-stone-200 pb-4 md:pb-0 md:pr-4">
                  <span className="text-5xl font-extrabold text-stone-900 font-mono">
                    {product.rating}
                  </span>
                  <div className="text-amber-500 text-sm my-1">★★★★★</div>
                  <span className="text-xs text-stone-500 font-medium">
                    {product.reviewCount} {t.productDetail.verifiedReviewsCount}
                  </span>
                </div>

                <div className="md:col-span-5 space-y-1.5 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-right">{t.productDetail.star5}</span>
                    <div className="flex-1 bg-stone-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full w-[92%]" />
                    </div>
                    <span className="w-8">92%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-right">{t.productDetail.star4}</span>
                    <div className="flex-1 bg-stone-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full w-[6%]" />
                    </div>
                    <span className="w-8">6%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-right">{t.productDetail.star3}</span>
                    <div className="flex-1 bg-stone-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full w-[2%]" />
                    </div>
                    <span className="w-8">2%</span>
                  </div>
                </div>

                <div className="md:col-span-3 text-center">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(true)}
                    className="w-full py-3 px-4 rounded-xl bg-[#002719] hover:bg-emerald-900 text-white font-bold text-xs tracking-wide transition-all shadow-md active:scale-95"
                  >
                    {t.productDetail.writeReview}
                  </button>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">
                        T
                      </div>
                      <div>
                        <h5 className="font-extrabold text-xs text-stone-900">{isBn ? "তানভীর আহমেদ" : "Tanveer Ahmed"}</h5>
                        <span className="text-[10px] text-stone-400">{isBn ? "ধানমন্ডি, ঢাকা • ২ দিন আগে" : "Dhanmondi, Dhaka • 2 days ago"}</span>
                      </div>
                    </div>
                    <span className="text-xs text-amber-500 font-bold">★★★★★</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {isBn
                      ? "বাচ্চাদের জন্য নিয়মিত নিচ্ছি। কোনো প্রকার ভেজাল নেই, সাধারণ বাজার থেকে পাওয়া দুধের সাথে কোনো তুলনাই চলে না। ওপরের ঘন সর দেখলেই বোঝা যায় আসল খাঁটি দুধ। অনেক ধন্যবাদ গ্রীনরুট টিমকে!"
                      : "Ordering regularly for my kids. Extremely pure and the thick natural cream layer proves it is authentic grass-fed raw milk. Great cold-chain packaging!"}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                        F
                      </div>
                      <div>
                        <h5 className="font-extrabold text-xs text-stone-900">{isBn ? "ফারহানা চৌধুরী" : "Farhana Chowdhury"}</h5>
                        <span className="text-[10px] text-stone-400">{isBn ? "উত্তরা সেক্টর ৭ • ৫ দিন আগে" : "Uttara Sector 7 • 5 days ago"}</span>
                      </div>
                    </div>
                    <span className="text-xs text-amber-500 font-bold">★★★★★</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {isBn
                      ? "সকালে অর্ডার দিয়েছিলাম, দুপুরের আগেই একদম চিলড অবস্থায় কাঁচের বোতলে ডেলিভারি পেয়েছি। প্যাকেজিং ও দুধের মিষ্টি প্রাকৃতিক গন্ধ অসাধারণ।"
                      : "Placed the order in the morning and received chilled glass bottles before noon. Incredible aroma and sweetness!"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-[#E8AF30] uppercase tracking-wider block mb-0.5">
                  {t.productDetail.relatedBadge}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                  {t.productDetail.relatedHeading}
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-[#002719] hover:text-[#E8AF30] transition-colors"
              >
                {t.productDetail.viewAllProducts}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ModernProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Conversion Bar for Mobile (Always Accessible) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-stone-200/90 p-3 z-40 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-11 h-11 rounded-xl object-cover shrink-0 border border-stone-200"
          />
          <div className="min-w-0">
            <h4 className="font-bold text-xs text-stone-900 truncate">{isBn ? product.titleBn : product.title}</h4>
            <span className="text-sm font-extrabold text-[#002719] font-mono">
              ৳{unitPrice * quantity}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleAddToCart}
            className="py-2.5 px-4 rounded-xl bg-[#002719] text-white font-bold text-xs flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <i className="fa-solid fa-basket-shopping text-xs"></i>
            <span>{t.productDetail.mobileAddBag}</span>
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="py-2.5 px-4 rounded-xl bg-[#E8AF30] text-[#002719] font-extrabold text-xs active:scale-95 shadow-sm"
          >
            {t.productDetail.mobileBuy}
          </button>
        </div>
      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>

            <h3 className="text-xl font-extrabold text-stone-900 mb-1">
              {t.productDetail.shareExperience}
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              {isBn ? product.titleBn : product.title} {t.productDetail.shareExperienceDesc}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(t.productDetail.reviewSuccessMsg);
                setShowReviewModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">{t.productDetail.rateLabel}</label>
                <div className="flex gap-2 text-2xl text-amber-400 cursor-pointer">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">{t.productDetail.yourName}</label>
                <input
                  type="text"
                  required
                  placeholder={isBn ? "যেমন: তানভীর আহমেদ" : "e.g., Tanveer Ahmed"}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#E8AF30]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">{t.productDetail.yourLocation}</label>
                <input
                  type="text"
                  required
                  placeholder={isBn ? "যেমন: উত্তরা, ঢাকা" : "e.g., Uttara, Dhaka"}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#E8AF30]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">{t.productDetail.feedbackLabel}</label>
                <textarea
                  rows={3}
                  required
                  placeholder={t.productDetail.feedbackPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#E8AF30]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#002719] hover:bg-emerald-800 text-white font-bold text-xs tracking-wide transition-all shadow-md"
              >
                {t.productDetail.submitReview}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Interactive BSTI & ISO Certified Lab Report Modal */}
      {showLabModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-stone-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-stone-200 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-xl font-extrabold shrink-0 border border-emerald-200">
                  <i className="fa-solid fa-microscope text-emerald-700"></i>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <i className="fa-solid fa-certificate text-emerald-600"></i>
                    {isBn ? "BSTI ও ISO ১৭০২৫ মানদণ্ড" : "BSTI & ISO 17025 Certified"}
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-stone-950 mt-1">
                    {isBn ? "অফিশিয়াল ল্যাব টেস্ট ও পিউরিটি সার্টিফিকেট" : "Official Laboratory Purity Certificate"}
                  </h3>
                  <p className="text-xs text-stone-500 font-mono">
                    Certificate #{product.id.toUpperCase()}-BSTI-2026 • Batch #{product.stock}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowLabModal(false)}
                className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Certificate Body */}
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">{isBn ? "পরীক্ষিত পণ্য" : "Tested Product"}</span>
                  <strong className="text-stone-900 text-sm font-extrabold">{isBn ? product.titleBn : product.title}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">{isBn ? "বিশুদ্ধতা ফলাফল" : "Overall Result"}</span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                    {isBn ? "১০০% উত্তীর্ণ (PASS)" : "100% PASSED"}
                  </span>
                </div>
              </div>

              {/* Chemical Test Parameters Table */}
              <div className="rounded-2xl border border-stone-200 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 text-stone-700 font-bold">
                    <tr>
                      <th className="py-2.5 px-3.5">{isBn ? "পরীক্ষার নাম (Parameter)" : "Test Parameter"}</th>
                      <th className="py-2.5 px-3 text-center">{isBn ? "প্রাপ্ত মান (Result)" : "Observed"}</th>
                      <th className="py-2.5 px-3.5 text-right">{isBn ? "স্ট্যাটাস" : "Status"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-[11px]">
                    <tr>
                      <td className="py-2.5 px-3.5 font-medium">{isBn ? "ফরমালিন টেস্ট (Formaldehyde Test)" : "Formalin Adulteration"}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-700">0.00% (Negative)</td>
                      <td className="py-2.5 px-3.5 text-right font-extrabold text-emerald-600">PASSED ✓</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-medium">{isBn ? "ল্যাকটোমিটার রিডিং / ঘনত্ব" : "Lactometer Reading (Density)"}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-stone-800">29.5 (Ideal 28-32)</td>
                      <td className="py-2.5 px-3.5 text-right font-extrabold text-emerald-600">PASSED ✓</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-medium">{isBn ? "প্রাকৃতিক ফ্যাট উপাদান (Fat Content)" : "Natural Fat Content"}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-stone-800">4.2% Grass-fed</td>
                      <td className="py-2.5 px-3.5 text-right font-extrabold text-emerald-600">PASSED ✓</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-medium">{isBn ? "মেলামাইন ও ইউরিয়া উপস্থিতি" : "Melamine & Urea Adulteration"}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-700">Not Detected (0%)</td>
                      <td className="py-2.5 px-3.5 text-right font-extrabold text-emerald-600">PASSED ✓</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-medium">{isBn ? "কৃত্রিম চিনি ও সুক্রোজ টেস্ট" : "Added Synthetic Sugar / Syrup"}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-700">0.00% (Zero Added)</td>
                      <td className="py-2.5 px-3.5 text-right font-extrabold text-emerald-600">PASSED ✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Lab Seal & Analyst Signature */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between text-[11px] text-amber-950">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </span>
                  <div>
                    <span className="font-extrabold block">{isBn ? "কেন্দ্রীয় খাদ্য ও রাসায়নিক পরীক্ষাগার" : "Central Agrochem Quality Assurance Lab"}</span>
                    <span className="text-[10px] text-stone-500">{isBn ? "চিফ কোয়ালিটি ইন্সপেক্টর দ্বারা সত্যায়িত" : "Certified by Chief Food Safety Inspector"}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] text-stone-400 block">{isBn ? "যাচাইকৃত ব্যাচ" : "Verified Batch"}</span>
                  <span className="font-bold text-emerald-800">#GR-2026-OCT</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-5 pt-4 border-t border-stone-200 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <i className="fa-solid fa-print"></i>
                <span>{isBn ? "প্রিন্ট সার্টিফিকেট" : "Print Certificate"}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowLabModal(false)}
                className="px-5 py-2 rounded-xl bg-[#002719] hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm"
              >
                {isBn ? "বন্ধ করুন" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
