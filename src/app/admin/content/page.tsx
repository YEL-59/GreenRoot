"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getStoredSiteContent,
  saveStoredSiteContent,
  resetStoredSiteContent,
  defaultSiteContent,
  type SiteContentState,
  type FaqItemCMS,
  type BlogArticleCMS,
  type FarmNoticeCMS,
  type PolicySectionCMS,
} from "@/data/siteContent";
import { useLanguage } from "@/context/LanguageContext";

type CmsTab = "home" | "about" | "contact" | "faqs" | "blog" | "notices" | "policies";

export default function AdminContentManagementPage() {
  const { isBn } = useLanguage();
  const [content, setContent] = useState<SiteContentState>(defaultSiteContent);
  const [activeTab, setActiveTab] = useState<CmsTab>("home");
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Modals state
  const [faqModal, setFaqModal] = useState<{ isOpen: boolean; item?: FaqItemCMS }>({ isOpen: false });
  const [blogModal, setBlogModal] = useState<{ isOpen: boolean; item?: BlogArticleCMS }>({ isOpen: false });
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeBadge, setNoticeBadge] = useState("দুগ্ধ খামার আপডেট");
  const [policyModal, setPolicyModal] = useState<{ isOpen: boolean; item?: PolicySectionCMS }>({ isOpen: false });
  const [valueModal, setValueModal] = useState<{ isOpen: boolean; item?: { id: string; icon: string; titleBn: string; descBn: string } }>({ isOpen: false });
  const [teamModal, setTeamModal] = useState<{ isOpen: boolean; item?: { id: string; name: string; roleBn: string; image: string; experience: string } }>({ isOpen: false });

  // Load from localStorage on client mount
  useEffect(() => {
    setContent(getStoredSiteContent());
  }, []);

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const persist = (
    nextState: SiteContentState,
    msg = isBn ? "সফলভাবে পরিবর্তন সেভ করা হয়েছে!" : "Changes saved successfully!"
  ) => {
    setContent(nextState);
    saveStoredSiteContent(nextState);
    triggerToast(msg);
  };

  const handleResetDefaults = () => {
    const confirmMsg = isBn
      ? "আপনি কি নিশ্চিত সব পেজ কনটেন্ট ডিফল্ট ফ্যাক্টরি সেটিংসে রিসেট করতে চান?"
      : "Are you sure you want to reset all site content to factory defaults?";
    if (confirm(confirmMsg)) {
      const reset = resetStoredSiteContent();
      setContent(reset);
      triggerToast(
        isBn
          ? "সব কনটেন্ট ডিফল্ট সেটিংসে রিসেট করা হয়েছে!"
          : "All site content reset to defaults!"
      );
    }
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `greenroot_content_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast("কনটেন্ট ব্যাকআপ JSON সফলভাবে ডাউনলোড হয়েছে!");
  };

  /* ------------------- HOME TAB HANDLERS ------------------- */
  const handleHomeFieldChange = (field: keyof typeof content.home, value: any) => {
    persist({
      ...content,
      home: {
        ...content.home,
        [field]: value,
      },
    });
  };

  /* ------------------- ABOUT TAB HANDLERS ------------------- */
  const handleSaveValue = (val: { id: string; icon: string; titleBn: string; descBn: string }) => {
    const exists = content.about.values.some((v) => v.id === val.id);
    const nextValues = exists
      ? content.about.values.map((v) => (v.id === val.id ? val : v))
      : [...content.about.values, { ...val, id: `v-${Date.now()}` }];
    persist({
      ...content,
      about: { ...content.about, values: nextValues },
    });
    setValueModal({ isOpen: false });
  };

  const handleDeleteValue = (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই ভ্যালুটি মুছে ফেলতে চান?")) return;
    persist({
      ...content,
      about: {
        ...content.about,
        values: content.about.values.filter((v) => v.id !== id),
      },
    });
  };

  const handleSaveTeam = (member: { id: string; name: string; roleBn: string; image: string; experience: string }) => {
    const exists = content.about.team.some((t) => t.id === member.id);
    const nextTeam = exists
      ? content.about.team.map((t) => (t.id === member.id ? member : t))
      : [...content.about.team, { ...member, id: `tm-${Date.now()}` }];
    persist({
      ...content,
      about: { ...content.about, team: nextTeam },
    });
    setTeamModal({ isOpen: false });
  };

  const handleDeleteTeam = (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই টিম মেম্বার মুছে ফেলতে চান?")) return;
    persist({
      ...content,
      about: {
        ...content.about,
        team: content.about.team.filter((t) => t.id !== id),
      },
    });
  };

  /* ------------------- CONTACT TAB HANDLERS ------------------- */
  const handleContactFieldChange = (field: keyof typeof content.contact, value: string) => {
    persist({
      ...content,
      contact: {
        ...content.contact,
        [field]: value,
      },
    });
  };

  /* ------------------- FAQ TAB HANDLERS ------------------- */
  const handleSaveFaq = (faqData: Partial<FaqItemCMS>) => {
    const isEdit = Boolean(faqData.id);
    const nextFaqs = isEdit
      ? content.faqs.map((f) => (f.id === faqData.id ? ({ ...f, ...faqData } as FaqItemCMS) : f))
      : [
          {
            id: `faq-${Date.now()}`,
            question: faqData.question || faqData.questionBn || "",
            questionBn: faqData.questionBn || "",
            answer: faqData.answer || faqData.answerBn || "",
            answerBn: faqData.answerBn || "",
            category: faqData.category || "general",
            active: true,
          },
          ...content.faqs,
        ];

    persist({ ...content, faqs: nextFaqs });
    setFaqModal({ isOpen: false });
  };

  const handleDeleteFaq = (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই FAQ মুছে ফেলতে চান?")) return;
    persist({
      ...content,
      faqs: content.faqs.filter((f) => f.id !== id),
    });
  };

  const handleToggleFaq = (id: string) => {
    persist({
      ...content,
      faqs: content.faqs.map((f) => (f.id === id ? { ...f, active: !f.active } : f)),
    });
  };

  /* ------------------- BLOG TAB HANDLERS ------------------- */
  const handleSaveBlog = (blogData: Partial<BlogArticleCMS>) => {
    const isEdit = Boolean(blogData.id);
    const nextArticles = isEdit
      ? content.articles.map((a) => (a.id === blogData.id ? ({ ...a, ...blogData } as BlogArticleCMS) : a))
      : [
          {
            id: `art-${Date.now()}`,
            slug:
              blogData.slug ||
              (blogData.title
                ? blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                : `post-${Date.now()}`),
            title: blogData.title || blogData.titleBn || "",
            titleBn: blogData.titleBn || "",
            excerpt: blogData.excerpt || blogData.excerptBn || "",
            excerptBn: blogData.excerptBn || "",
            image:
              blogData.image ||
              "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
            date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
            dateBn: "আজকের প্রকাশনা",
            author: blogData.author || "গ্রীনরুট কৃষি টিম",
            category: blogData.category || "Organic Farming",
            categoryBn: blogData.categoryBn || "জৈব কৃষি",
            readTime: blogData.readTime || "৪ মিনিট পাঠ",
            content: blogData.content && blogData.content.length > 0 ? blogData.content : ["খামার তথ্য ও বিশ্লেষণ।"],
            active: true,
          },
          ...content.articles,
        ];

    persist({ ...content, articles: nextArticles });
    setBlogModal({ isOpen: false });
  };

  const handleDeleteBlog = (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই ব্লগ আর্টিকেলটি মুছে ফেলতে চান?")) return;
    persist({
      ...content,
      articles: content.articles.filter((a) => a.id !== id),
    });
  };

  const handleToggleBlog = (id: string) => {
    persist({
      ...content,
      articles: content.articles.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    });
  };

  /* ------------------- NOTICES TAB HANDLERS ------------------- */
  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim()) return;

    const newN: FarmNoticeCMS = {
      id: `not-${Date.now()}`,
      title: noticeTitle,
      titleBn: noticeTitle,
      badge: noticeBadge,
      date: "আজকের লাইভ আপডেট",
      active: true,
      priority: "normal",
    };

    persist({
      ...content,
      notices: [newN, ...content.notices],
    });
    setNoticeTitle("");
  };

  const handleDeleteNotice = (id: string) => {
    persist({
      ...content,
      notices: content.notices.filter((n) => n.id !== id),
    });
  };

  const handleToggleNotice = (id: string) => {
    persist({
      ...content,
      notices: content.notices.map((n) => (n.id === id ? { ...n, active: !n.active } : n)),
    });
  };

  /* ------------------- POLICY TAB HANDLERS ------------------- */
  const handleSavePolicy = (pol: Partial<PolicySectionCMS>) => {
    const isEdit = Boolean(pol.id);
    const nextPolicies = isEdit
      ? content.policies.map((p) => (p.id === pol.id ? ({ ...p, ...pol } as PolicySectionCMS) : p))
      : [
          {
            id: `pol-${Date.now()}`,
            titleBn: pol.titleBn || "নতুন পলিসি",
            tag: pol.tag || "Policy",
            clauses: pol.clauses || ["শর্তাবলী এক"],
            lastUpdated: new Date().toISOString().slice(0, 10),
          },
          ...content.policies,
        ];
    persist({ ...content, policies: nextPolicies });
    setPolicyModal({ isOpen: false });
  };

  const handleDeletePolicy = (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই পলিসিটি মুছে ফেলতে চান?")) return;
    persist({
      ...content,
      policies: content.policies.filter((p) => p.id !== id),
    });
  };

  return (
    <div className="space-y-8 text-white w-full pb-16">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2.5 animate-bounce">
          <i className="fa-solid fa-circle-check text-sm"></i>
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Banner & Control Deck */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-[#002719] via-[#003824] to-[#041F16] border border-emerald-500/30 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#E8AF30]/20 text-[#E8AF30] border border-[#E8AF30]/40 text-[10px] font-extrabold uppercase tracking-wider">
              Super Admin CMS
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {isBn ? "লাইভ অটো-সিঙ্ক চালু" : "Live Auto-Sync Active"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {isBn
              ? "ওয়েবসাইট কনটেন্ট ও পেজ ম্যানেজমেন্ট CMS"
              : "Website Content & CMS Studio"}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 max-w-2xl">
            {isBn
              ? "হোমপেজ, আমাদের সম্পর্কে, পলিসি, এফএকিউ, নোটিশ ও ব্লগ আর্টিকেলের লেখা, ব্যানার, ফোন নম্বর ও ছবি সরাসরি সংশোধন, নতুন যোগ এবং ডিলিট করুন।"
              : "Manage homepage banners, about page, policies, FAQs, farm notices, blogs, contact info, and imagery in real-time."}
          </p>
        </div>

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs flex items-center gap-2 transition-all"
            title={isBn ? "লাইভ সাইট দেখুন" : "View Live Site"}
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-xs text-[#E8AF30]"></i>
            <span>{isBn ? "লাইভ সাইট" : "Live Store"}</span>
          </Link>
          <button
            type="button"
            onClick={handleExportBackup}
            className="px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
            title={isBn ? "সব কনটেন্ট JSON ফাইলে ডাউনলোড করুন" : "Export content as JSON"}
          >
            <i className="fa-solid fa-download text-xs text-emerald-400"></i>
            <span>{isBn ? "ব্যাকআপ এক্সপোর্ট" : "Export Backup"}</span>
          </button>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-2 transition-all"
            title={isBn ? "সব কিছু প্রাথমিক ফ্যাক্টরি অবস্থায় ফিরিয়ে নিন" : "Reset all content to defaults"}
          >
            <i className="fa-solid fa-rotate-left text-xs"></i>
            <span>{isBn ? "ফ্যাক্টরি রিসেট" : "Factory Reset"}</span>
          </button>
        </div>
      </div>

      {/* Metric Counters Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-[#0b2218] border border-white/10 text-center">
          <span className="text-[10px] text-stone-400 uppercase font-bold block">
            {isBn ? "সক্রিয় FAQ" : "Active FAQs"}
          </span>
          <span className="text-xl font-extrabold text-[#E8AF30] font-mono">
            {content.faqs.filter((f) => f.active).length} {isBn ? "টি" : "items"}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-[#0b2218] border border-white/10 text-center">
          <span className="text-[10px] text-stone-400 uppercase font-bold block">
            {isBn ? "ব্লগ আর্টিকেল" : "Articles"}
          </span>
          <span className="text-xl font-extrabold text-emerald-400 font-mono">
            {content.articles.length} {isBn ? "টি" : "posts"}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-[#0b2218] border border-white/10 text-center">
          <span className="text-[10px] text-stone-400 uppercase font-bold block">
            {isBn ? "লাইভ নোটিশ" : "Live Notices"}
          </span>
          <span className="text-xl font-extrabold text-amber-400 font-mono">
            {content.notices.filter((n) => n.active).length} {isBn ? "টি" : "live"}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-[#0b2218] border border-white/10 text-center">
          <span className="text-[10px] text-stone-400 uppercase font-bold block">
            {isBn ? "খামার মূল্যবোধ" : "Farm Values"}
          </span>
          <span className="text-xl font-extrabold text-white font-mono">
            {content.about.values.length} {isBn ? "টি" : "pillars"}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-[#0b2218] border border-white/10 text-center">
          <span className="text-[10px] text-stone-400 uppercase font-bold block">
            {isBn ? "টিম মেম্বার" : "Team Members"}
          </span>
          <span className="text-xl font-extrabold text-white font-mono">
            {content.about.team.length} {isBn ? "জন" : "staff"}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-[#0b2218] border border-white/10 text-center">
          <span className="text-[10px] text-stone-400 uppercase font-bold block">
            {isBn ? "পলিসি সেকশন" : "Policy Sections"}
          </span>
          <span className="text-xl font-extrabold text-emerald-300 font-mono">
            {content.policies.length} {isBn ? "টি" : "clauses"}
          </span>
        </div>
      </div>

      {/* Navigation Pills for CMS Pages */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
        {[
          { id: "home", label: isBn ? "হোমপেজ ও ব্যানার" : "Home & Hero", icon: "fa-solid fa-house" },
          { id: "about", label: isBn ? "আমাদের সম্পর্কে ও টিম" : "About & Team", icon: "fa-solid fa-leaf" },
          { id: "contact", label: isBn ? "যোগাযোগ ও কাস্টমার কেয়ার" : "Contact & Support", icon: "fa-solid fa-phone" },
          { id: "faqs", label: isBn ? "সাধারণ জিজ্ঞাসা (FAQs)" : "FAQs Q&A", icon: "fa-solid fa-circle-question" },
          { id: "blog", label: isBn ? "ব্লগ ও কৃষি গাইড" : "Blog & Agro Guides", icon: "fa-solid fa-newspaper" },
          { id: "notices", label: isBn ? "লাইভ খামার নোটিশ" : "Live Farm Notices", icon: "fa-solid fa-bullhorn" },
          { id: "policies", label: isBn ? "রিটার্ন ও কোল্ড-চেইন পলিসি" : "Return & Cold-Chain Policy", icon: "fa-solid fa-shield-halved" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as CmsTab)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-[#E8AF30] text-[#002719] shadow-lg font-extrabold scale-102"
                : "bg-white/5 hover:bg-white/10 text-stone-300"
            }`}
          >
            <i className={`${tab.icon} text-xs`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* -------------------- TAB 1: HOME PAGE CONTENT -------------------- */}
      {activeTab === "home" && (
        <div className="space-y-6">
          {/* Hero Banner Section */}
          <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <i className="fa-solid fa-star text-[#E8AF30]"></i>
                  হোমপেজ প্রধান হিরো ব্যানার (Hero Section)
                </h3>
                <p className="text-xs text-stone-400">ওয়েবসাইটের সর্বপ্রথম দর্শকদের চোখে পড়া প্রধান শিরোনাম ও ব্যানার টেক্সট</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Home Hero
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">বাংলা শিরোনাম (Main Bangla Headline)</label>
                <input
                  type="text"
                  value={content.home.heroTitleBn}
                  onChange={(e) => handleHomeFieldChange("heroTitleBn", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">ইংরেজি শিরোনাম (English Headline)</label>
                <input
                  type="text"
                  value={content.home.heroTitle}
                  onChange={(e) => handleHomeFieldChange("heroTitle", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">টপ ব্যাজ বা সাবটাইটেল (বাংলা)</label>
                <input
                  type="text"
                  value={content.home.heroSubtitleBn}
                  onChange={(e) => handleHomeFieldChange("heroSubtitleBn", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">প্রাইমারি বাটন টেক্সট (CTA)</label>
                <input
                  type="text"
                  value={content.home.heroPrimaryBtnText}
                  onChange={(e) => handleHomeFieldChange("heroPrimaryBtnText", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">প্রধান বিবরণী অনুচ্ছেদ (Hero Narrative Description)</label>
              <textarea
                rows={3}
                value={content.home.heroDescriptionBn}
                onChange={(e) => handleHomeFieldChange("heroDescriptionBn", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              ></textarea>
            </div>
          </div>

          {/* Flash Announcement Ticker */}
          <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <i className="fa-solid fa-bullhorn text-[#E8AF30]"></i>
                  টপ ফ্লাশ ঘোষণা বার (Top Announcement Ticker)
                </h3>
                <p className="text-xs text-stone-400">ওয়েবসাইটের একদম উপরে চলমান তাজা আপডেট বা স্টক এলার্ট</p>
              </div>
              <button
                type="button"
                onClick={() => handleHomeFieldChange("announcementTickerActive", !content.home.announcementTickerActive)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  content.home.announcementTickerActive
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-white/5 text-stone-500"
                }`}
              >
                {content.home.announcementTickerActive ? "সক্রিয় (Active) ✓" : "লুকানো (Hidden)"}
              </button>
            </div>

            <div>
              <input
                type="text"
                value={content.home.announcementTicker}
                onChange={(e) => handleHomeFieldChange("announcementTicker", e.target.value)}
                placeholder="ঘোষণা টেক্সট লিখুন..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>
          </div>

          {/* Bangladesh Market Trust Pillars */}
          <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <i className="fa-solid fa-shield-heart text-emerald-400"></i>
                ৪টি মূল বিশ্বস্ততার ভিত্তি (Market Trust Pillars)
              </h3>
              <p className="text-xs text-stone-400">ফরমালিনমুক্ত টেস্ট, ৪°C কোল্ড-চেইন ও ক্যাশ অন ডেলিভারি নিশ্চয়তা কার্ড</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.home.trustPillars.map((p, idx) => (
                <div key={p.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#E8AF30] font-mono font-bold">পিলার ০{idx + 1}</span>
                    <i className={`${p.icon} text-sm text-emerald-400`}></i>
                  </div>
                  <input
                    type="text"
                    value={p.titleBn}
                    onChange={(e) => {
                      const updated = content.home.trustPillars.map((it) =>
                        it.id === p.id ? { ...it, titleBn: e.target.value } : it
                      );
                      handleHomeFieldChange("trustPillars", updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs font-bold text-white focus:outline-none focus:border-[#E8AF30]"
                  />
                  <textarea
                    rows={2}
                    value={p.descBn}
                    onChange={(e) => {
                      const updated = content.home.trustPillars.map((it) =>
                        it.id === p.id ? { ...it, descBn: e.target.value } : it
                      );
                      handleHomeFieldChange("trustPillars", updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-[11px] text-stone-300 focus:outline-none focus:border-[#E8AF30]"
                  ></textarea>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* -------------------- TAB 2: ABOUT US PAGE CONTENT -------------------- */}
      {activeTab === "about" && (
        <div className="space-y-6">
          {/* About Narrative Story */}
          <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <i className="fa-solid fa-book-open-reader text-[#E8AF30]"></i>
              খামার প্রতিষ্ঠার ইতিহাস ও গল্প (Our Farm Story)
            </h3>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">গল্পের শিরোনাম (Story Title)</label>
              <input
                type="text"
                value={content.about.storyTitleBn}
                onChange={(e) =>
                  persist({
                    ...content,
                    about: { ...content.about, storyTitleBn: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-stone-300">বর্ণনামূলক অনুচ্ছেদসমূহ (Paragraphs)</label>
              {content.about.storyParagraphsBn.map((para, i) => (
                <textarea
                  key={i}
                  rows={3}
                  value={para}
                  onChange={(e) => {
                    const nextParas = [...content.about.storyParagraphsBn];
                    nextParas[i] = e.target.value;
                    persist({
                      ...content,
                      about: { ...content.about, storyParagraphsBn: nextParas },
                    });
                  }}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                ></textarea>
              ))}
            </div>
          </div>

          {/* Core Farm Values (Add / Edit / Delete) */}
          <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <i className="fa-solid fa-gem text-emerald-400"></i>
                  খামারের মূল মূল্যবোধ (Core Farm Values)
                </h3>
                <p className="text-xs text-stone-400">সততা, জৈব চাষাবাদ ও প্রাণীকল্যাণ নীতি</p>
              </div>
              <button
                type="button"
                onClick={() => setValueModal({ isOpen: true })}
                className="px-4 py-2 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] text-xs font-extrabold flex items-center gap-1.5 shadow-md"
              >
                <i className="fa-solid fa-plus text-xs"></i>
                <span>নতুন মূল্যবোধ যোগ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.about.values.map((v) => (
                <div key={v.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-sm">
                      <i className={v.icon}></i>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-white">{v.titleBn}</h4>
                      <p className="text-[11px] text-stone-400 mt-1">{v.descBn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setValueModal({ isOpen: true, item: v })}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
                      title="সংশোধন করুন"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteValue(v.id)}
                      className="w-7 h-7 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 flex items-center justify-center text-xs"
                      title="মুছে ফেলুন"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Farm Team Members (Add / Edit / Delete) */}
          <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <i className="fa-solid fa-user-doctor text-emerald-400"></i>
                  খামার বিশেষজ্ঞ ও গবেষক টিম (Farm Specialists)
                </h3>
                <p className="text-xs text-stone-400">ভেটেরিনারি সার্জন, কোয়ালিটি কন্ট্রোলার ও কৃষিবিদ</p>
              </div>
              <button
                type="button"
                onClick={() => setTeamModal({ isOpen: true })}
                className="px-4 py-2 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] text-xs font-extrabold flex items-center gap-1.5 shadow-md"
              >
                <i className="fa-solid fa-plus text-xs"></i>
                <span>নতুন বিশেষজ্ঞ যোগ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {content.about.team.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-xl object-cover border border-white/20 shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-xs text-white truncate">{t.name}</h4>
                      <p className="text-[11px] text-emerald-300 truncate">{t.roleBn}</p>
                      <span className="text-[10px] text-stone-400 block">{t.experience}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setTeamModal({ isOpen: true, item: t })}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold"
                    >
                      এডিট
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTeam(t.id)}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-300 text-[11px] font-bold"
                    >
                      ডিলিট
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* -------------------- TAB 3: CONTACT & SUPPORT -------------------- */}
      {activeTab === "contact" && (
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <i className="fa-solid fa-headset text-[#E8AF30]"></i>
              কাস্টমার সাপোর্ট, হেল্পলাইন ও অফিস ঠিকানা (Contact Info)
            </h3>
            <p className="text-xs text-stone-400">গ্রাহকদের যোগাযোগের জন্য ওয়েবসাইটে প্রদর্শিত ফোন, হোয়াটসঅ্যাপ ও খামারের ঠিকানা</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">অফিসিয়াল হটলাইন নম্বর</label>
              <input
                type="text"
                value={content.contact.hotline}
                onChange={(e) => handleContactFieldChange("hotline", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">হোয়াটসঅ্যাপ অর্ডার নম্বর</label>
              <input
                type="text"
                value={content.contact.whatsapp}
                onChange={(e) => handleContactFieldChange("whatsapp", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">সাপোর্ট ইমেইল ঠিকানা</label>
              <input
                type="email"
                value={content.contact.email}
                onChange={(e) => handleContactFieldChange("email", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">কোল্ড-চেইন জরুরি হেল্পলাইন</label>
              <input
                type="text"
                value={content.contact.emergencyChillerBn}
                onChange={(e) => handleContactFieldChange("emergencyChillerBn", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-300 mb-1.5">খামার হেডকোয়ার্টার ঠিকানা (Farm Origin Address)</label>
              <input
                type="text"
                value={content.contact.farmAddressBn}
                onChange={(e) => handleContactFieldChange("farmAddressBn", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-300 mb-1.5">ঢাকা কেন্দ্রীয় ডেলিভারি হাব ঠিকানা</label>
              <input
                type="text"
                value={content.contact.dhakaHubAddressBn}
                onChange={(e) => handleContactFieldChange("dhakaHubAddressBn", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-300 mb-1.5">অপারেটিং কাজের সময়সূচি</label>
              <input
                type="text"
                value={content.contact.operatingHoursBn}
                onChange={(e) => handleContactFieldChange("operatingHoursBn", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>
          </div>
        </div>
      )}

      {/* -------------------- TAB 4: FAQS CRUD -------------------- */}
      {activeTab === "faqs" && (
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <i className="fa-solid fa-circle-question text-[#E8AF30]"></i>
                সাধারণ প্রশ্নোত্তর পরিচালনা (FAQ Management)
              </h3>
              <p className="text-xs text-stone-400">গ্রাহকদের সাধারণ জিজ্ঞাসা ও উত্তর যোগ, এডিট এবং ডিলিট করুন</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="প্রশ্ন খুঁজুন..."
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30] w-40 sm:w-52"
                />
              </div>
              <button
                type="button"
                onClick={() => setFaqModal({ isOpen: true })}
                className="px-4 py-2 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] text-xs font-extrabold flex items-center gap-1.5 shadow-md shrink-0"
              >
                <i className="fa-solid fa-plus text-xs"></i>
                <span>নতুন FAQ যোগ করুন</span>
              </button>
            </div>
          </div>

          {/* FAQs List */}
          <div className="space-y-3">
            {content.faqs
              .filter(
                (f) =>
                  !searchTerm ||
                  f.questionBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  f.answerBn.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((faq, idx) => (
                <div
                  key={faq.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-emerald-900/60 text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8AF30]/20 text-[#E8AF30] uppercase">
                            {faq.category}
                          </span>
                          {!faq.active && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">
                              লুকানো
                            </span>
                          )}
                        </div>
                        <h4 className="font-extrabold text-sm text-white">{faq.questionBn}</h4>
                        <p className="text-xs text-stone-300 mt-1 leading-relaxed">{faq.answerBn}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleFaq(faq.id)}
                        className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center transition-all ${
                          faq.active
                            ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                            : "bg-white/5 text-stone-500"
                        }`}
                        title={faq.active ? "লুকিয়ে রাখুন" : "সক্রিয় করুন"}
                      >
                        <i className={faq.active ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFaqModal({ isOpen: true, item: faq })}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
                        title="সংশোধন করুন"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="w-7 h-7 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 flex items-center justify-center text-xs"
                        title="মুছে ফেলুন"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* -------------------- TAB 5: BLOG ARTICLES CRUD -------------------- */}
      {activeTab === "blog" && (
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <i className="fa-solid fa-newspaper text-[#E8AF30]"></i>
                কৃষি ও স্বাস্থ্য ব্লগ আর্টিকেল CMS ({content.articles.length} টি পোস্ট)
              </h3>
              <p className="text-xs text-stone-400">নতুন অর্গানিক গাইড লিখুন, ছবি বদলান এবং অপ্রয়োজনীয় পোস্ট ডিলিট করুন</p>
            </div>
            <button
              type="button"
              onClick={() => setBlogModal({ isOpen: true })}
              className="px-4 py-2 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] text-xs font-extrabold flex items-center gap-1.5 shadow-md shrink-0"
            >
              <i className="fa-solid fa-pen-nib text-xs"></i>
              <span>নতুন আর্টিকেল লিখুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {content.articles.map((art) => (
              <div
                key={art.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-3 hover:border-emerald-500/40 transition-all group"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden aspect-video mb-3 border border-white/10">
                    <img src={art.image} alt={art.titleBn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[#E8AF30] text-[10px] font-bold">
                      {art.categoryBn}
                    </span>
                    {!art.active && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-rose-600 text-white text-[9px] font-bold">
                        অপ্রকাশিত
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-xs text-white line-clamp-2 leading-snug">{art.titleBn}</h4>
                  <p className="text-[11px] text-stone-400 line-clamp-2 mt-1">{art.excerptBn}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400 text-[10px]">{art.dateBn}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleBlog(art.id)}
                      className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center transition-all ${
                        art.active ? "bg-emerald-500/20 text-emerald-300" : "bg-white/5 text-stone-500"
                      }`}
                      title={art.active ? "ড্রাফট করুন" : "প্রকাশ করুন"}
                    >
                      <i className={art.active ? "fa-solid fa-globe" : "fa-solid fa-lock"}></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBlogModal({ isOpen: true, item: art })}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
                      title="এডিট করুন"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteBlog(art.id)}
                      className="w-7 h-7 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 flex items-center justify-center text-xs"
                      title="ডিলিট করুন"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------- TAB 6: NOTICES BOARD -------------------- */}
      {activeTab === "notices" && (
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <i className="fa-solid fa-bullhorn text-[#E8AF30]"></i>
              লাইভ খামার নোটিশ বোর্ড (Farm Announcements)
            </h3>
            <p className="text-xs text-stone-400">গ্রাহকদের জন্য তাৎক্ষণিক দুধ সংগ্রহ, ফসল কর্তন বা মৌসুমি নোটিশ প্রকাশ করুন</p>
          </div>

          {/* Add Notice Form */}
          <form onSubmit={handleAddNotice} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              placeholder="নতুন খামার ঘোষণা বা তাজা স্টক আপডেট লিখুন..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#E8AF30]"
              required
            />
            <select
              value={noticeBadge}
              onChange={(e) => setNoticeBadge(e.target.value)}
              className="px-3 py-2 rounded-xl bg-stone-900 border border-white/15 text-xs text-white"
            >
              <option value="দুগ্ধ খামার আপডেট">দুগ্ধ খামার আপডেট</option>
              <option value="ফসল কর্তন নোটিশ">ফসল কর্তন নোটিশ</option>
              <option value="মৌসুমি অফার">মৌসুমি অফার</option>
              <option value="স্টক আপডেট">স্টক আপডেট</option>
            </select>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] text-xs font-extrabold shadow-md transition-all whitespace-nowrap"
            >
              প্রকাশ করুন +
            </button>
          </form>

          {/* Notice List */}
          <div className="space-y-3">
            {content.notices.map((n) => (
              <div
                key={n.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#E8AF30]/20 text-[#E8AF30] border border-[#E8AF30]/30 shrink-0">
                    {n.badge}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{n.titleBn}</h4>
                    <span className="text-[10px] text-stone-400">তারিখ: {n.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleNotice(n.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      n.active
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-white/5 text-stone-500"
                    }`}
                  >
                    {n.active ? "সক্রিয়" : "লুকানো"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteNotice(n.id)}
                    className="w-8 h-8 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 flex items-center justify-center text-xs"
                    title="মুছে ফেলুন"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------- TAB 7: POLICIES & TERMS -------------------- */}
      {activeTab === "policies" && (
        <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-[#E8AF30]"></i>
                রিটার্ন, ৪°C কোল্ড-চেইন ও প্রাইভেসী পলিসি পরিচালনা
              </h3>
              <p className="text-xs text-stone-400">গ্রাহকদের অধিকার, খাদ্য নিরাপত্তা এবং ক্যাশব্যাক নীতিমালা ধারা সংশোধন</p>
            </div>
            <button
              type="button"
              onClick={() => setPolicyModal({ isOpen: true })}
              className="px-4 py-2 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] text-xs font-extrabold flex items-center gap-1.5 shadow-md shrink-0"
            >
              <i className="fa-solid fa-plus text-xs"></i>
              <span>নতুন পলিসি ধারা যোগ করুন</span>
            </button>
          </div>

          <div className="space-y-4">
            {content.policies.map((p) => (
              <div key={p.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                      {p.tag}
                    </span>
                    <h4 className="font-extrabold text-sm text-white">{p.titleBn}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPolicyModal({ isOpen: true, item: p })}
                      className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                    >
                      এডিট
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePolicy(p.id)}
                      className="w-7 h-7 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 flex items-center justify-center text-xs"
                      title="ডিলিট"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-stone-300 list-disc list-inside">
                  {p.clauses.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------- MODAL: ADD / EDIT FAQ -------------------- */}
      {faqModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071911] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-extrabold text-white">
                {faqModal.item ? "এফএকিউ সংশোধন করুন" : "নতুন এফএকিউ যোগ করুন"}
              </h3>
              <button
                type="button"
                onClick={() => setFaqModal({ isOpen: false })}
                className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const questionBn = (form.elements.namedItem("questionBn") as HTMLInputElement).value;
                const answerBn = (form.elements.namedItem("answerBn") as HTMLTextAreaElement).value;
                const category = (form.elements.namedItem("category") as HTMLSelectElement).value as any;
                handleSaveFaq({
                  id: faqModal.item?.id,
                  questionBn,
                  answerBn,
                  category,
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">প্রশ্ন (বাংলা)</label>
                <input
                  name="questionBn"
                  defaultValue={faqModal.item?.questionBn || ""}
                  required
                  placeholder="যেমন: দুধে কোনো প্রিজারভেটিভ আছে কি?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">ক্যাটাগরি</label>
                <select
                  name="category"
                  defaultValue={faqModal.item?.category || "dairy"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                >
                  <option value="dairy">দুধ ও ডেইরি পণ্য</option>
                  <option value="delivery">ডেলিভারি ও কোল্ড চেইন</option>
                  <option value="payment">পেমেন্ট ও রিফান্ড</option>
                  <option value="purity">বিশুদ্ধতা ও ল্যাব টেস্ট</option>
                  <option value="general">সাধারণ তথ্য</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">উত্তর (বাংলা)</label>
                <textarea
                  name="answerBn"
                  rows={4}
                  defaultValue={faqModal.item?.answerBn || ""}
                  required
                  placeholder="বিস্তারিত উত্তর লিখুন..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setFaqModal({ isOpen: false })}
                  className="px-4 py-2 rounded-xl bg-white/10 text-stone-300 text-xs font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E8AF30] text-[#002719] text-xs font-extrabold shadow-md"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- MODAL: ADD / EDIT BLOG -------------------- */}
      {blogModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071911] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-extrabold text-white">
                {blogModal.item ? "ব্লগ আর্টিকেল এডিট করুন" : "নতুন ব্লগ আর্টিকেল লিখুন"}
              </h3>
              <button
                type="button"
                onClick={() => setBlogModal({ isOpen: false })}
                className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const titleBn = (form.elements.namedItem("titleBn") as HTMLInputElement).value;
                const excerptBn = (form.elements.namedItem("excerptBn") as HTMLTextAreaElement).value;
                const categoryBn = (form.elements.namedItem("categoryBn") as HTMLInputElement).value;
                const author = (form.elements.namedItem("author") as HTMLInputElement).value;
                const image = (form.elements.namedItem("image") as HTMLInputElement).value;
                const readTime = (form.elements.namedItem("readTime") as HTMLInputElement).value;
                const bodyText = (form.elements.namedItem("bodyText") as HTMLTextAreaElement).value;
                const paragraphs = bodyText.split("\n\n").filter((p) => p.trim());

                handleSaveBlog({
                  id: blogModal.item?.id,
                  titleBn,
                  excerptBn,
                  categoryBn,
                  author,
                  image,
                  readTime,
                  content: paragraphs.length > 0 ? paragraphs : [excerptBn],
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">আর্টিকেল শিরোনাম (বাংলা)</label>
                <input
                  name="titleBn"
                  defaultValue={blogModal.item?.titleBn || ""}
                  required
                  placeholder="যেমন: খাঁটি মধুর সঠিক চেনার উপায়"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">ক্যাটাগরি</label>
                  <input
                    name="categoryBn"
                    defaultValue={blogModal.item?.categoryBn || "স্বাস্থ্য ও পুষ্টি"}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">লেখক / গবেষক</label>
                  <input
                    name="author"
                    defaultValue={blogModal.item?.author || "গ্রীনরুট কৃষি টিম"}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">পড়ার সময়</label>
                  <input
                    name="readTime"
                    defaultValue={blogModal.item?.readTime || "৪ মিনিট পাঠ"}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">কভার ছবির URL</label>
                  <input
                    name="image"
                    defaultValue={blogModal.item?.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">সংক্ষিপ্ত সারাংশ (Excerpt)</label>
                <textarea
                  name="excerptBn"
                  rows={2}
                  defaultValue={blogModal.item?.excerptBn || ""}
                  required
                  placeholder="পাঠকদের আকৃষ্ট করার মতো সংক্ষিপ্ত বিবরণী..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">মূল আর্টিকেলের বডি (প্যারাগ্রাফ আলাদা করতে ডাবল এন্টার চাপুন)</label>
                <textarea
                  name="bodyText"
                  rows={5}
                  defaultValue={blogModal.item?.content?.join("\n\n") || ""}
                  required
                  placeholder="সম্পূর্ণ প্রবন্ধের বিস্তারিত তথ্য লিখুন..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setBlogModal({ isOpen: false })}
                  className="px-4 py-2 rounded-xl bg-white/10 text-stone-300 text-xs font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E8AF30] text-[#002719] text-xs font-extrabold shadow-md"
                >
                  প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- MODAL: ADD / EDIT VALUE -------------------- */}
      {valueModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071911] border border-emerald-500/30 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-extrabold text-white">খামারের মূল্যবোধ সেটিং</h3>
              <button
                type="button"
                onClick={() => setValueModal({ isOpen: false })}
                className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const titleBn = (form.elements.namedItem("titleBn") as HTMLInputElement).value;
                const descBn = (form.elements.namedItem("descBn") as HTMLTextAreaElement).value;
                const icon = (form.elements.namedItem("icon") as HTMLInputElement).value;
                handleSaveValue({
                  id: valueModal.item?.id || `v-${Date.now()}`,
                  titleBn,
                  descBn,
                  icon,
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">শিরোনাম</label>
                <input
                  name="titleBn"
                  defaultValue={valueModal.item?.titleBn || ""}
                  required
                  placeholder="যেমন: প্রাকৃতিক জৈব চাষাবাদ"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">ফন্ট অওসাম আইকন ক্লাস</label>
                <input
                  name="icon"
                  defaultValue={valueModal.item?.icon || "fa-solid fa-seedling"}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">বিবরণ</label>
                <textarea
                  name="descBn"
                  rows={3}
                  defaultValue={valueModal.item?.descBn || ""}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white"
                ></textarea>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setValueModal({ isOpen: false })}
                  className="px-4 py-2 rounded-xl bg-white/10 text-stone-300 text-xs font-bold"
                >
                  বাতিল
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#E8AF30] text-[#002719] text-xs font-extrabold">
                  সংরক্ষণ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- MODAL: ADD / EDIT TEAM -------------------- */}
      {teamModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071911] border border-emerald-500/30 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-extrabold text-white">টিম মেম্বার তথ্য</h3>
              <button
                type="button"
                onClick={() => setTeamModal({ isOpen: false })}
                className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                const roleBn = (form.elements.namedItem("roleBn") as HTMLInputElement).value;
                const image = (form.elements.namedItem("image") as HTMLInputElement).value;
                const experience = (form.elements.namedItem("experience") as HTMLInputElement).value;
                handleSaveTeam({
                  id: teamModal.item?.id || `tm-${Date.now()}`,
                  name,
                  roleBn,
                  image,
                  experience,
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">নাম</label>
                <input
                  name="name"
                  defaultValue={teamModal.item?.name || ""}
                  required
                  placeholder="যেমন: ড. মোস্তাফিজুর রহমান"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">পদবী</label>
                <input
                  name="roleBn"
                  defaultValue={teamModal.item?.roleBn || ""}
                  required
                  placeholder="যেমন: প্রধান ভেটেরিনারি সার্জন"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">অভিজ্ঞতা / বিবরণ</label>
                <input
                  name="experience"
                  defaultValue={teamModal.item?.experience || ""}
                  required
                  placeholder="যেমন: ১২+ বছর খামার অভিজ্ঞতা"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">ছবির URL</label>
                <input
                  name="image"
                  defaultValue={teamModal.item?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTeamModal({ isOpen: false })}
                  className="px-4 py-2 rounded-xl bg-white/10 text-stone-300 text-xs font-bold"
                >
                  বাতিল
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#E8AF30] text-[#002719] text-xs font-extrabold">
                  সংরক্ষণ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- MODAL: ADD / EDIT POLICY -------------------- */}
      {policyModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071911] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-extrabold text-white">পলিসি ও শর্তাবলী এডিটর</h3>
              <button
                type="button"
                onClick={() => setPolicyModal({ isOpen: false })}
                className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const titleBn = (form.elements.namedItem("titleBn") as HTMLInputElement).value;
                const tag = (form.elements.namedItem("tag") as HTMLInputElement).value;
                const clausesRaw = (form.elements.namedItem("clauses") as HTMLTextAreaElement).value;
                const clauses = clausesRaw.split("\n").filter((c) => c.trim());

                handleSavePolicy({
                  id: policyModal.item?.id,
                  titleBn,
                  tag,
                  clauses,
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">পলিসির শিরোনাম</label>
                <input
                  name="titleBn"
                  defaultValue={policyModal.item?.titleBn || ""}
                  required
                  placeholder="যেমন: ৪°C কোল্ড-চেইন তাজাতার নিশ্চয়তা"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">ট্যাগ / ক্যাটাগরি</label>
                <input
                  name="tag"
                  defaultValue={policyModal.item?.tag || "Freshness Policy"}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">পলিসি ধারা বা পয়েন্টসমূহ (প্রতি লাইনে একটি পয়েন্ট লিখুন)</label>
                <textarea
                  name="clauses"
                  rows={5}
                  defaultValue={policyModal.item?.clauses?.join("\n") || ""}
                  required
                  placeholder="ধারা ১&#10;ধারা ২&#10;ধারা ৩"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setPolicyModal({ isOpen: false })}
                  className="px-4 py-2 rounded-xl bg-white/10 text-stone-300 text-xs font-bold"
                >
                  বাতিল
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#E8AF30] text-[#002719] text-xs font-extrabold">
                  সংরক্ষণ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
