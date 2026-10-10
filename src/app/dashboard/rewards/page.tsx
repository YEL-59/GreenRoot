"use client";

import { useState } from "react";
import Link from "next/link";
import { initialUserProfile } from "@/data/userProfile";
import { useLanguage } from "@/context/LanguageContext";

interface RewardVoucher {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  discountText: string;
  discountTextEn: string;
  costCoins: number;
  minSpend: number;
  category: string;
  categoryEn: string;
  expiry: string;
  expiryEn: string;
}

interface UserRewardActivity {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  date: string;
  dateEn: string;
  type: "earn" | "redeem" | "wallet";
  change: string;
  changeEn: string;
  isPositive: boolean;
}

export default function UserRewardsPage() {
  const { isBn } = useLanguage();
  const [user, setUser] = useState(initialUserProfile);
  const [walletBalance, setWalletBalance] = useState(initialUserProfile.walletBalance);
  const [rewardPoints, setRewardPoints] = useState(initialUserProfile.rewardPoints);

  // Daily Streak
  const [hasClaimedDaily, setHasClaimedDaily] = useState(false);
  const [streakDays, setStreakDays] = useState(3);

  // Active Modals & Notices
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(500);
  const [topUpMethod, setTopUpMethod] = useState<"bkash" | "nagad" | "card">("bkash");
  const [isProcessingTopUp, setIsProcessingTopUp] = useState(false);

  const [activeNotice, setActiveNotice] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // User redeemed vouchers list
  const [myVouchers, setMyVouchers] = useState<
    { code: string; label: string; labelEn: string; discount: number; expiry: string; expiryEn: string }[]
  >([
    {
      code: "GREEN10",
      label: "১০% খামার স্বাগতম ছাড়",
      labelEn: "10% Farm Welcome Off",
      discount: 10,
      expiry: "১৫ দিন বাকি",
      expiryEn: "15 days left",
    },
  ]);

  // Transaction History
  const [activities, setActivities] = useState<UserRewardActivity[]>([
    {
      id: "act-1",
      title: "অর্ডার #GR-2026-8841 ক্যাশব্যাক",
      titleEn: "Order #GR-2026-8841 Cashback",
      description: "খাঁটি কাঁচা দুধ ও সরিষার তেল অর্ডার ক্রয়ে অর্জিত",
      descriptionEn: "Earned on pure raw milk & mustard oil delivery",
      date: "আজ, সকাল ৮:৩০",
      dateEn: "Today, 08:30 AM",
      type: "earn",
      change: "+৫০ কয়েন",
      changeEn: "+50 Coins",
      isPositive: true,
    },
    {
      id: "act-2",
      title: "৳৫০ শপিং ভাউচার রিডিম",
      titleEn: "৳50 Shopping Voucher Redeemed",
      description: "কুপন কোড GRCOIN-50 সংগ্রহ করা হয়েছে",
      descriptionEn: "Coupon code GRCOIN-50 claimed",
      date: "গতকাল, সন্ধ্যা ৬:১৫",
      dateEn: "Yesterday, 06:15 PM",
      type: "redeem",
      change: "-১০০ কয়েন",
      changeEn: "-100 Coins",
      isPositive: false,
    },
    {
      id: "act-3",
      title: "বিকাশ ওয়ালেট রিচার্জ",
      titleEn: "bKash Wallet Top-Up",
      description: "ডিজিটাল ওয়ালেটে টাকা যোগ সফল",
      descriptionEn: "Successfully loaded funds into wallet",
      date: "০৫ অক্টো, ২০২৬",
      dateEn: "05 Oct, 2026",
      type: "wallet",
      change: "+৳৫০০",
      changeEn: "+৳500",
      isPositive: true,
    },
    {
      id: "act-4",
      title: "বন্ধুর রেফারেল বোনাস",
      titleEn: "Friend Referral Reward",
      description: "ফারহানা করিম আপনার কোডে প্রথম অর্ডার দিয়েছেন",
      descriptionEn: "Farhana Karim placed first order using your referral code",
      date: "০২ অক্টো, ২০২৬",
      dateEn: "02 Oct, 2026",
      type: "earn",
      change: "+১০০ কয়েন",
      changeEn: "+100 Coins",
      isPositive: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState<"redeem" | "tier" | "history">("redeem");

  // Available Vouchers to Redeem
  const catalogVouchers: RewardVoucher[] = [
    {
      id: "vouch-50",
      code: "GRCOIN-50",
      title: "৳৫০ ফ্ল্যাট ডিসকাউন্ট ভাউচার",
      titleEn: "৳50 Flat Discount Voucher",
      discountText: "৳৫০ ছাড়",
      discountTextEn: "৳50 Off",
      costCoins: 100,
      minSpend: 400,
      category: "সব খামার পণ্যে",
      categoryEn: "All Farm Produce",
      expiry: "৩০ দিন কার্যকর",
      expiryEn: "Valid 30 Days",
    },
    {
      id: "vouch-100",
      code: "GRCOIN-100",
      title: "৳১০০ মেগা সেভিং ভাউচার",
      titleEn: "৳100 Mega Saver Voucher",
      discountText: "৳১০০ ছাড়",
      discountTextEn: "৳100 Off",
      costCoins: 200,
      minSpend: 800,
      category: "দুধ, ঘি ও মধুতে প্রযোজ্য",
      categoryEn: "Milk, Ghee & Honey",
      expiry: "৩০ দিন কার্যকর",
      expiryEn: "Valid 30 Days",
    },
    {
      id: "vouch-250",
      code: "GRCOIN-250",
      title: "৳২৫০ ভিআইপি ফ্যামিলি ভাউচার",
      titleEn: "৳250 VIP Family Voucher",
      discountText: "৳২৫০ ছাড়",
      discountTextEn: "৳250 Off",
      costCoins: 450,
      minSpend: 1500,
      category: "যেকোনো অর্ডারে",
      categoryEn: "Any Order",
      expiry: "৪৫ দিন কার্যকর",
      expiryEn: "Valid 45 Days",
    },
    {
      id: "vouch-ship",
      code: "GR-FREESHIP",
      title: "ফ্রি হোম ডেলিভারি পাস",
      titleEn: "Free Home Delivery Pass",
      discountText: "৳৬০/১২০ ফ্রি ডেলিভারি",
      discountTextEn: "৳60/120 Free Shipping",
      costCoins: 80,
      minSpend: 300,
      category: "ঢাকা ও সারা বাংলাদেশে",
      categoryEn: "All Nationwide",
      expiry: "১৫ দিন কার্যকর",
      expiryEn: "Valid 15 Days",
    },
  ];

  // Journey 1: Redeem Coins for Voucher
  const handleRedeemVoucher = (voucher: RewardVoucher) => {
    if (rewardPoints < voucher.costCoins) {
      setActiveNotice(
        isBn
          ? `পর্যাপ্ত কয়েন নেই! এই ভাউচারের জন্য ${voucher.costCoins} কয়েন প্রয়োজন (আপনার আছে ${rewardPoints} কয়েন)`
          : `Insufficient coins! This voucher requires ${voucher.costCoins} coins (you have ${rewardPoints} coins)`
      );
      setTimeout(() => setActiveNotice(null), 3500);
      return;
    }

    const uniqueCode = `${voucher.code}-${Math.floor(100 + Math.random() * 900)}`;

    setRewardPoints((prev) => prev - voucher.costCoins);

    setMyVouchers((prev) => [
      {
        code: uniqueCode,
        label: voucher.title,
        labelEn: voucher.titleEn,
        discount: voucher.costCoins / 2,
        expiry: isBn ? "৩০ দিন বাকি" : "30 days left",
        expiryEn: "30 days left",
      },
      ...prev,
    ]);

    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: isBn ? `${voucher.title} রিডিম` : `Redeemed ${voucher.titleEn}`,
        titleEn: `Redeemed ${voucher.titleEn}`,
        description: isBn ? `কুপন কোড ${uniqueCode} সংগ্রহ করা হয়েছে` : `Claimed coupon code ${uniqueCode}`,
        descriptionEn: `Claimed coupon code ${uniqueCode}`,
        date: isBn ? "এইমাত্র" : "Just now",
        dateEn: "Just now",
        type: "redeem",
        change: `-${voucher.costCoins} কয়েন`,
        changeEn: `-${voucher.costCoins} Coins`,
        isPositive: false,
      },
      ...prev,
    ]);

    setActiveNotice(
      isBn
        ? `অভিনন্দন! ${voucher.title} সফলভাবে সংগৃহীত। কোড: ${uniqueCode}`
        : `Congratulations! ${voucher.titleEn} redeemed successfully. Code: ${uniqueCode}`
    );
    setTimeout(() => setActiveNotice(null), 4000);
  };

  // Journey 2: Top-Up Digital Wallet
  const handleConfirmTopUp = () => {
    if (topUpAmount <= 0) return;
    setIsProcessingTopUp(true);

    setTimeout(() => {
      setWalletBalance((prev) => prev + topUpAmount);
      setIsProcessingTopUp(false);
      setShowTopUpModal(false);

      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          title: isBn
            ? `${topUpMethod.toUpperCase()} ওয়ালেট রিচার্জ`
            : `${topUpMethod.toUpperCase()} Wallet Top-Up`,
          titleEn: `${topUpMethod.toUpperCase()} Wallet Top-Up`,
          description: isBn
            ? `ডিজিটাল ওয়ালেটে ৳${topUpAmount} সফলভাবে যুক্ত হয়েছে`
            : `Successfully added ৳${topUpAmount} to digital wallet`,
          descriptionEn: `Successfully added ৳${topUpAmount} to digital wallet`,
          date: isBn ? "এইমাত্র" : "Just now",
          dateEn: "Just now",
          type: "wallet",
          change: `+৳${topUpAmount}`,
          changeEn: `+৳${topUpAmount}`,
          isPositive: true,
        },
        ...prev,
      ]);

      setActiveNotice(
        isBn
          ? `সফল রিচার্জ! ৳${topUpAmount} আপনার ওয়ালেটে যুক্ত হয়েছে।`
          : `Top-up successful! ৳${topUpAmount} has been added to your wallet.`
      );
      setTimeout(() => setActiveNotice(null), 4000);
    }, 1200);
  };

  // Journey 3: Claim Daily Streak Check-in
  const handleClaimDailyStreak = () => {
    if (hasClaimedDaily) return;
    const bonusCoins = 15;
    setRewardPoints((prev) => prev + bonusCoins);
    setHasClaimedDaily(true);
    setStreakDays((prev) => prev + 1);

    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: isBn
          ? `দৈনিক চেক-ইন স্ট্রিক (দিন ${streakDays + 1})`
          : `Daily Check-in Streak (Day ${streakDays + 1})`,
        titleEn: `Daily Check-in Streak (Day ${streakDays + 1})`,
        description: isBn
          ? "ধারাবাহিক ভিজিটের জন্য ফ্রি GreenCoins রিওয়ার্ড"
          : "Free GreenCoins reward for daily streak visit",
        descriptionEn: "Free GreenCoins reward for daily streak visit",
        date: isBn ? "এইমাত্র" : "Just now",
        dateEn: "Just now",
        type: "earn",
        change: `+${bonusCoins} কয়েন`,
        changeEn: `+${bonusCoins} Coins`,
        isPositive: true,
      },
      ...prev,
    ]);

    setActiveNotice(
      isBn
        ? `অভিনন্দন! দৈনিক চেক-ইনে আপনি +${bonusCoins} GreenCoins অর্জন করেছেন!`
        : `Awesome! You earned +${bonusCoins} GreenCoins from today's daily streak check-in!`
    );
    setTimeout(() => setActiveNotice(null), 3500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {activeNotice && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <i className="fa-solid fa-circle-check text-emerald-200 text-base"></i>
            <span>{activeNotice}</span>
          </div>
          <button
            onClick={() => setActiveNotice(null)}
            className="text-white/80 hover:text-white ml-3"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#002719]">
              {isBn ? "গ্রীনরুট লয়্যালটি ক্লাব" : "GreenRoot Loyalty Club"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            {isBn ? "গ্রীনকয়েন ও ওয়ালেট রিওয়ার্ড হাব" : "GreenCoins & Digital Wallet Rewards"}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn
              ? "প্রতিটি অর্ডারে ক্যাশব্যাক অর্জন করুন, ভাউচারে রূপান্তর করুন এবং ডিজিটাল ওয়ালেটে সহজে পেমেন্ট করুন।"
              : "Earn cashbacks on harvest orders, redeem exclusive discount vouchers, and enjoy instant 1-click checkout."}
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#002719] hover:bg-[#003824] text-[#E8AF30] font-extrabold text-xs shadow-lg transition-all self-start sm:self-auto"
        >
          <i className="fa-solid fa-store"></i>
          <span>{isBn ? "শপে ভাউচার ব্যবহার করুন" : "Shop With Vouchers"}</span>
        </Link>
      </div>

      {/* Hero Dual Balances Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wallet Card */}
        <div className="bg-gradient-to-br from-[#002719] via-[#003824] to-[#002719] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#E8AF30] font-extrabold uppercase tracking-wider block">
                {isBn ? "ডিজিটাল খামার ওয়ালেট ব্যালেন্স" : "Digital Farm Wallet Balance"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-emerald-300">
                {isBn ? "তাৎক্ষণিক ব্যবহার্য" : "Ready to use"}
              </span>
            </div>

            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-3 font-mono">
              ৳{walletBalance.toLocaleString()}
            </div>
            <p className="text-xs text-stone-300 mt-2 leading-relaxed">
              {isBn
                ? "যেকোনো কেনাকাটায় ক্যাশ অন ডেলিভারির ঝামেলা ছাড়াই ১-ক্লিকে চেকআউটে পেমেন্ট করুন।"
                : "Pay instantly during checkout without the hassle of cash-on-delivery handling."}
            </p>
          </div>

          <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
            <button
              onClick={() => setShowTopUpModal(true)}
              className="px-5 py-3 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] text-xs font-extrabold transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <i className="fa-solid fa-plus text-xs"></i>
              <span>{isBn ? "টাকা রিচার্জ করুন (Top Up)" : "Top Up Balance"}</span>
            </button>
            <span className="text-[11px] text-stone-400">
              {isBn ? "bKash / Nagad সাপোর্টেড" : "bKash / Nagad / Visa"}
            </span>
          </div>

          <div className="absolute right-4 -bottom-6 text-white/5 text-9xl font-extrabold pointer-events-none font-mono">
            ৳
          </div>
        </div>

        {/* GreenCoins Card */}
        <div className="bg-gradient-to-br from-[#E8AF30] via-amber-400 to-[#d9a024] rounded-3xl p-6 sm:p-8 text-[#002719] shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#002719]/80 font-extrabold uppercase tracking-wider block">
                {isBn ? "রিওয়ার্ড গ্রীনকয়েন ব্যালেন্স" : "Reward GreenCoins Balance"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#002719]/10 text-[#002719]">
                {isBn ? `${user.memberTier} মেম্বার` : `${user.memberTier} Member`}
              </span>
            </div>

            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002719] mt-3 flex items-center gap-2.5 font-mono">
              <i className="fa-solid fa-coins text-3xl sm:text-4xl animate-bounce"></i>
              <span>{rewardPoints}</span>
              <span className="text-base sm:text-lg font-bold">{isBn ? "কয়েন" : "Coins"}</span>
            </div>
            <p className="text-xs text-[#002719]/85 mt-2 leading-relaxed">
              {isBn ? (
                <>বর্তমান মূল্যায়নে <strong>৳{(rewardPoints / 2).toFixed(0)} সমমূল্যের</strong> ডিসকাউন্ট ভাউচার রিডিম করা যাবে।</>
              ) : (
                <>Equivalent to <strong>৳{(rewardPoints / 2).toFixed(0)} off</strong> in redeemable discount vouchers.</>
              )}
            </p>
          </div>

          <div className="relative z-10 mt-6 pt-5 border-t border-[#002719]/15 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab("redeem")}
              className="px-5 py-3 rounded-xl bg-[#002719] hover:bg-[#003824] text-white text-xs font-extrabold transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <i className="fa-solid fa-ticket text-[#E8AF30]"></i>
              <span>{isBn ? "ভাউচারে রূপান্তর করুন" : "Redeem for Vouchers"}</span>
            </button>
            <span className="text-[11px] text-[#002719]/70 font-semibold">
              {isBn ? "১০০ কয়েন = ৳৫০ ছাড়" : "100 Coins = ৳50 Off"}
            </span>
          </div>

          <div className="absolute right-4 -bottom-6 text-[#002719]/10 text-9xl font-extrabold pointer-events-none">
            <i className="fa-solid fa-award"></i>
          </div>
        </div>
      </div>

      {/* Daily Farm Check-in Streak Banner (High engagement) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-extrabold shrink-0">
            <i className="fa-solid fa-fire text-[#E8AF30]"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                {isBn
                  ? `দৈনিক খামার চেক-ইন স্ট্রিক (${streakDays} দিনের ধারাবাহিকতা)`
                  : `Daily Farm Check-in Streak (${streakDays} Days)`}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900">
                {isBn ? "ফ্রি কয়েন" : "Free Coins"}
              </span>
            </div>
            <h4 className="text-base font-extrabold text-stone-900 mt-0.5">
              {isBn ? "প্রতিদিন ভিজিট করে বিনামূল্যে কয়েন সংগ্রহ করুন" : "Visit Daily & Claim Free Rewards"}
            </h4>
            <p className="text-xs text-stone-500">
              {isBn
                ? "টানা ৭ দিন চেক-ইন করলে পাবেন বিশেষ ৫০ GreenCoins এবং ফ্রি ডেলিভারি পাস।"
                : "Complete 7 consecutive daily check-ins for 50 bonus GreenCoins and a Free Delivery Pass."}
            </p>
          </div>
        </div>

        <button
          onClick={handleClaimDailyStreak}
          disabled={hasClaimedDaily}
          className={`px-6 py-3.5 rounded-2xl font-extrabold text-xs transition-all shadow-md active:scale-95 shrink-0 ${
            hasClaimedDaily
              ? "bg-emerald-100 text-emerald-800 cursor-not-allowed border border-emerald-300"
              : "bg-[#002719] hover:bg-[#003824] text-[#E8AF30]"
          }`}
        >
          {hasClaimedDaily ? (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-check"></i>
              {isBn ? "আজকের ১৫ কয়েন সংগৃহীত" : "Today's 15 Coins Claimed ✓"}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-hand-holding-dollar text-[#E8AF30]"></i>
              {isBn ? "আজকের ১৫ কয়েন গ্রহণ করুন" : "Claim Today's 15 Coins"}
            </span>
          )}
        </button>
      </div>

      {/* Tab Navigation Controls */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab("redeem")}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "redeem"
              ? "bg-[#002719] text-white"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          }`}
        >
          <i className="fa-solid fa-tags"></i>
          <span>
            {isBn ? `ভাউচার ক্যাটালগ (${catalogVouchers.length})` : `Voucher Catalog (${catalogVouchers.length})`}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("tier")}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "tier"
              ? "bg-[#002719] text-white"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          }`}
        >
          <i className="fa-solid fa-crown text-[#E8AF30]"></i>
          <span>{isBn ? "মেম্বারশিপ টিয়ার ও সুবিধা" : "Membership Tiers & Perks"}</span>
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "history"
              ? "bg-[#002719] text-white"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          }`}
        >
          <i className="fa-solid fa-clock-rotate-left"></i>
          <span>
            {isBn ? `পয়েন্ট ও ওয়ালেট হিস্ট্রি (${activities.length})` : `Points & Wallet History (${activities.length})`}
          </span>
        </button>
      </div>

      {/* Tab 1: Redeem Voucher Catalog & My Active Vouchers */}
      {activeTab === "redeem" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Active Generated Vouchers in Pocket */}
          {myVouchers.length > 0 && (
            <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                    {isBn ? "আপনার সক্রিয় কুপনসমূহ (My Vouchers)" : "My Active Vouchers"}
                  </span>
                  <h3 className="text-base font-extrabold text-stone-900">
                    {isBn ? "চেকআউটে ব্যবহারের জন্য প্রস্তুত ভাউচার" : "Vouchers Ready for Checkout"}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8AF30] text-[#002719]">
                  {isBn ? `${myVouchers.length} টি ভাউচার প্রস্তুত` : `${myVouchers.length} Vouchers Available`}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {myVouchers.map((v, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-xs font-extrabold text-stone-900">
                        {isBn ? v.label : (v.labelEn || v.label)}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-xs font-extrabold text-[#002719] bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                          {v.code}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {isBn ? v.expiry : (v.expiryEn || v.expiry)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => copyToClipboard(v.code, `vouch-${i}`)}
                      className="px-3 py-1.5 rounded-xl bg-[#002719] hover:bg-[#003824] text-white text-xs font-bold transition-all shadow-xs shrink-0"
                    >
                      {copiedCode === `vouch-${i}`
                        ? (isBn ? "কপি হয়েছে!" : "Copied!")
                        : (isBn ? "কপি কোড" : "Copy Code")}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Catalog Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-extrabold text-stone-900">
                  {isBn ? "কয়েন দিয়ে ভাউচার রিডিম করুন (Exchange GreenCoins)" : "Exchange GreenCoins for Vouchers"}
                </h3>
                <p className="text-xs text-stone-500">
                  {isBn
                    ? "পছন্দসই ডিসকাউন্ট বেছে নিন এবং তাৎক্ষণিক কুপন কোড সংগ্রহ করুন।"
                    : "Select your desired discount amount and generate instant coupon codes."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {catalogVouchers.map((v) => {
                const canAfford = rewardPoints >= v.costCoins;
                return (
                  <div
                    key={v.id}
                    className={`bg-white rounded-3xl p-5 border transition-all shadow-sm flex flex-col justify-between ${
                      canAfford
                        ? "border-stone-200 hover:border-[#E8AF30] hover:shadow-lg"
                        : "border-stone-200/60 opacity-80"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {isBn ? v.category : v.categoryEn}
                        </span>
                        <span className="font-mono text-xs font-extrabold text-[#E8AF30] flex items-center gap-1">
                          <i className="fa-solid fa-coins text-[10px]"></i>
                          {v.costCoins} {isBn ? "কয়েন" : "Coins"}
                        </span>
                      </div>

                      <h4 className="text-sm font-extrabold text-stone-900 leading-snug">
                        {isBn ? v.title : v.titleEn}
                      </h4>
                      <div className="text-xs font-bold text-emerald-700 mt-1">
                        {isBn ? v.discountText : v.discountTextEn}
                      </div>

                      <div className="mt-3 text-[11px] text-stone-500 space-y-0.5">
                        <div>
                          {isBn ? `সর্বনিম্ন অর্ডার: ৳${v.minSpend}` : `Min. Order: ৳${v.minSpend}`}
                        </div>
                        <div>
                          {isBn ? `মেয়াদ: ${v.expiry}` : `Validity: ${v.expiryEn}`}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-stone-100">
                      <button
                        onClick={() => handleRedeemVoucher(v)}
                        disabled={!canAfford}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                          canAfford
                            ? "bg-[#002719] hover:bg-[#003824] text-white active:scale-95"
                            : "bg-stone-100 text-stone-400 cursor-not-allowed"
                        }`}
                      >
                        <i className="fa-solid fa-gift"></i>
                        <span>
                          {canAfford
                            ? (isBn ? "রিডিম করুন" : "Redeem Now")
                            : (isBn ? "কয়েন প্রয়োজন" : "More Coins Needed")}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Membership Tier Progress & Perks */}
      {activeTab === "tier" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Progress Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                  {isBn ? "আপনার বর্তমান মেম্বারশিপ লেভেল" : "Your Current Membership Level"}
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2 mt-0.5">
                  <i className="fa-solid fa-crown text-[#E8AF30]"></i>
                  <span>{isBn ? `${user.memberTier} সদস্য` : `${user.memberTier} Member`}</span>
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-stone-500">
                  {isBn ? "পরবর্তী লেভেল:" : "Next Tier:"}
                </span>
                <div className="text-sm font-extrabold text-emerald-800">
                  {isBn ? "Green Elite (১,০০০ কয়েন)" : "Green Elite (1,000 Coins)"}
                </div>
              </div>
            </div>

            {/* Progress meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-stone-700">
                <span>{rewardPoints} GreenCoins</span>
                <span>
                  {isBn
                    ? `১,০০০ GreenCoins (আর মাত্র ${Math.max(0, 1000 - rewardPoints)} বাকি)`
                    : `1,000 GreenCoins (${Math.max(0, 1000 - rewardPoints)} to go)`}
                </span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-[#E8AF30] to-emerald-500 transition-all duration-700"
                  style={{ width: `${Math.min(100, (rewardPoints / 1000) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tier Comparison Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: "Green Silver",
                requirement: isBn ? "১০০ - ৫০০ কয়েন" : "100 - 500 Coins",
                cashback: isBn ? "১% কয়েন ক্যাশব্যাক" : "1% Coin Cashback",
                perk: isBn ? "স্ট্যান্ডার্ড ডেলিভারি" : "Standard Cold-Chain Delivery",
                current: false,
              },
              {
                tier: "Green Gold (Current)",
                requirement: isBn ? "৫০০ - ১,০০০ কয়েন" : "500 - 1,000 Coins",
                cashback: isBn ? "৩% কয়েন ক্যাশব্যাক" : "3% Coin Cashback",
                perk: isBn ? "ভোরের এক্সপ্রেস স্লট অগ্রাধিকার + ফ্রি বার্থডে গিফট" : "Priority Dawn Delivery Slot + Birthday Gift",
                current: true,
              },
              {
                tier: "Green Elite / Patron",
                requirement: isBn ? "১,০০০+ কয়েন" : "1,000+ Coins",
                cashback: isBn ? "৫% স্থায়ী ক্যাশব্যাক" : "5% Lifetime Cashback",
                perk: isBn ? "বিনামূল্যে খামার ট্যুর + প্রতি মাসে ২টি ফ্রি ডেলিভারি" : "Free Farm Tour Pass + 2 Free Deliveries/mo",
                current: false,
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border flex flex-col justify-between ${
                  t.current
                    ? "bg-[#002719] text-white border-[#E8AF30] ring-2 ring-[#E8AF30] shadow-xl"
                    : "bg-white text-stone-900 border-stone-200 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-base font-extrabold">{t.tier}</h4>
                    {t.current && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8AF30] text-[#002719]">
                        {isBn ? "সক্রিয় লেভেল" : "Active Level"}
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-xs font-mono mb-4 ${
                      t.current ? "text-stone-300" : "text-stone-500"
                    }`}
                  >
                    {t.requirement}
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-check text-emerald-400"></i>
                      <span>{t.cashback}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-check text-emerald-400"></i>
                      <span>{t.perk}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Points & Wallet Ledger */}
      {activeTab === "history" && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-stone-900">
              {isBn ? "লেনদেন ও অর্জনের ইতিহাস" : "Transaction & Earnings History"}
            </h3>
            <span className="text-xs text-stone-400">
              {isBn ? `সর্বমোট ${activities.length}টি রেকর্ড` : `Total ${activities.length} Records`}
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {activities.map((act) => (
              <div key={act.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                      act.type === "earn"
                        ? "bg-emerald-100 text-emerald-700"
                        : act.type === "wallet"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    <i
                      className={`fa-solid ${
                        act.type === "earn"
                          ? "fa-arrow-down-left"
                          : act.type === "wallet"
                          ? "fa-wallet"
                          : "fa-ticket"
                      }`}
                    ></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-900">
                      {isBn ? act.title : act.titleEn}
                    </h5>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {isBn ? act.description : act.descriptionEn}
                    </p>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {isBn ? act.date : act.dateEn}
                    </span>
                  </div>
                </div>

                <div
                  className={`font-mono font-extrabold text-sm ${
                    act.isPositive ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {isBn ? act.change : act.changeEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Referral Invite Program Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
            {isBn ? "রেফার করুন ও ১০০ কয়েন আয় করুন" : "Refer a Friend & Earn 100 Coins"}
          </span>
          <h3 className="text-lg font-extrabold text-stone-900 mt-2">
            {isBn
              ? "বন্ধুদের সাথে খাঁটি অর্গানিক খাদ্যের স্বাদ শেয়ার করুন!"
              : "Share pure organic goodness with your friends & family!"}
          </h3>
          <p className="text-xs text-stone-600 mt-1 max-w-xl leading-relaxed">
            {isBn
              ? "আপনার রেফারেল কোড ব্যবহার করে বন্ধু প্রথম খামার ডেলিভারি সম্পন্ন করলে উভয়েই পাবেন ১০০ GreenCoins এবং ফ্রি ডেলিভারি।"
              : "When your friend completes their first dawn harvest delivery using your code, both of you earn 100 GreenCoins and free shipping."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-100 border border-stone-200">
            <span className="font-mono text-xs font-extrabold text-[#002719] px-3">GREENROOT-TANVIR</span>
            <button
              onClick={() => copyToClipboard("GREENROOT-TANVIR", "ref-code")}
              className="px-4 py-2 rounded-xl bg-[#002719] text-white text-xs font-bold hover:bg-[#003824] transition-all shadow-xs"
            >
              {copiedCode === "ref-code"
                ? (isBn ? "কপি হয়েছে ✓" : "Copied ✓")
                : (isBn ? "কপি কোড" : "Copy Code")}
            </button>
          </div>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              isBn
                ? "গ্রীনরুট থেকে ১০০% খাঁটি কাঁচা গরুর দুধ ও সুন্দরবনের মধু অর্ডার করো! আমার রেফারেল কোড GREENROOT-TANVIR দিয়ে ১০০ কয়েন ছাড় পাও: https://greenroot.com.bd"
                : "Order 100% grass-fed raw milk & organic honey from GreenRoot! Use my referral code GREENROOT-TANVIR to get 100 GreenCoins bonus: https://greenroot.com.bd"
            )}`}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-base shadow-sm transition-all"
            title={isBn ? "হোয়াটসঅ্যাপে শেয়ার করুন" : "Share on WhatsApp"}
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>
        </div>
      </div>

      {/* Wallet Top-Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setShowTopUpModal(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 text-sm font-bold"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold mb-4">
              <i className="fa-solid fa-wallet"></i>
            </div>

            <h3 className="text-xl font-extrabold text-stone-900">
              {isBn ? "ওয়ালেট রিচার্জ করুন" : "Top Up Digital Wallet"}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {isBn
                ? "রিচার্জকৃত অর্থ সরাসরি আপনার গ্রীনরুট ওয়ালেটে যুক্ত হবে এবং যেকোনো অর্ডারে ব্যবহার্য।"
                : "Funds will be credited directly to your GreenRoot wallet for instant 1-click checkout."}
            </p>

            {/* Quick Amounts */}
            <div className="mt-5 space-y-3">
              <label className="block text-xs font-bold text-stone-700">
                {isBn ? "টাকার পরিমাণ নির্বাচন করুন" : "Select Recharge Amount"}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[200, 500, 1000, 2000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setTopUpAmount(amt)}
                    className={`py-2.5 rounded-xl font-bold font-mono text-xs transition-all border ${
                      topUpAmount === amt
                        ? "bg-[#002719] text-white border-[#002719]"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200"
                    }`}
                  >
                    ৳{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Gateway Options */}
            <div className="mt-5 space-y-3">
              <label className="block text-xs font-bold text-stone-700">
                {isBn ? "পেমেন্ট মেথড" : "Payment Method"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "bkash", label: isBn ? "বিকাশ" : "bKash", icon: "fa-mobile-screen-button text-pink-600" },
                  { id: "nagad", label: isBn ? "নগদ" : "Nagad", icon: "fa-wallet text-orange-500" },
                  { id: "card", label: isBn ? "কার্ড" : "Card", icon: "fa-credit-card text-blue-600" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setTopUpMethod(m.id as any)}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      topUpMethod === m.id
                        ? "border-[#002719] bg-emerald-50/50 text-[#002719] ring-1 ring-[#002719]"
                        : "border-stone-200 text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    <i className={`fa-solid ${m.icon} text-base`}></i>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowTopUpModal(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-50"
              >
                {isBn ? "বাতিল" : "Cancel"}
              </button>
              <button
                onClick={handleConfirmTopUp}
                disabled={isProcessingTopUp}
                className="px-6 py-2.5 rounded-xl bg-[#002719] hover:bg-[#003824] text-[#E8AF30] text-xs font-extrabold shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                {isProcessingTopUp
                  ? (isBn ? "প্রসেস হচ্ছে..." : "Processing...")
                  : (isBn ? `৳${topUpAmount} রিচার্জ নিশ্চিত করুন` : `Confirm ৳${topUpAmount} Top-Up`)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
