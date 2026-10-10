"use client";
import type { FormEvent } from "react";

import { useState } from "react";
import type { Product } from "@/types";
import { productCategories } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";

export type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
};

export const AddProductModal = ({
  isOpen,
  onClose,
  onAddProduct,
}: AddProductModalProps) => {
  const { isBn } = useLanguage();
  const [title, setTitle] = useState("");
  const [titleBn, setTitleBn] = useState("");
  const [category, setCategory] = useState("milk-dairy");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [unit, setUnit] = useState("১ কেজি");
  const [stock, setStock] = useState("50");
  const [originBn, setOriginBn] = useState("গ্রীনরুট সাভার এগ্রো ফার্ম");
  const [image, setImage] = useState("");
  const [descriptionBn, setDescriptionBn] = useState("");
  const [benefit, setBenefit] = useState("১০০% প্রাকৃতিক ও রাসায়নিকমুক্ত");

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !titleBn || !price) return;

    const matchedCat = productCategories.find((c) => c.id === category);

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
      titleBn,
      category,
      categoryBn: matchedCat?.nameBn || "অন্যান্য",
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      unit,
      unitBn: unit,
      image:
        image ||
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      rating: 5.0,
      reviewCount: 1,
      badge: "নতুন সংযোজন",
      stock: Number(stock),
      origin: "GreenRoot Agro",
      originBn,
      description: title,
      descriptionBn: descriptionBn || `${titleBn} - সরাসরি খামার থেকে সংগৃহীত সেরা মানের পণ্য।`,
      benefits: [benefit, "তাজা ও স্বাস্থ্যসম্মত প্যাকেজিং"],
      isFeatured: true,
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0b2218] border border-white/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-white shadow-2xl p-6 md:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <span className="text-[10px] text-[#E8AF30] font-bold uppercase tracking-wider block">
              {isBn ? "ইনভেন্টরি ম্যানেজমেন্ট" : "Inventory Management"}
            </span>
            <h3 className="text-xl font-extrabold text-white">
              {isBn ? "নতুন অর্গানিক পণ্য আপলোড করুন (Upload Product)" : "Upload New Farm Product"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "পণ্যের ইংরেজি নাম *" : "Product English Name *"}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isBn ? "e.g. Organic Sundarban Honey" : "e.g. Organic Sundarban Honey"}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "পণ্যের বাংলা নাম *" : "Product Bengali Name *"}
              </label>
              <input
                type="text"
                value={titleBn}
                onChange={(e) => setTitleBn(e.target.value)}
                placeholder={isBn ? "যেমন: সুন্দরবনের খাঁটি খলিশা মধু" : "e.g. খাঁটি গাওয়া ঘি"}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "ক্যাটাগরি বিভাগ *" : "Category Department *"}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              >
                {productCategories
                  .filter((c) => c.id !== "all")
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {isBn ? `${cat.nameBn} (${cat.name})` : `${cat.name} (${cat.nameBn})`}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "পরিমাপ ইউনিট (Unit) *" : "Unit of Measure *"}
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder={isBn ? "১ কেজি / ১ লিটার / ১ আঁটি" : "1 kg / 1 Ltr / 1 Pack"}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "বিক্রয় মূল্য (Price ৳) *" : "Selling Price (৳) *"}
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={isBn ? "যেমন: 450" : "e.g. 450"}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "নিয়মিত মূল্য (Original ৳ - ছাড়ের জন্য)" : "Regular Price (৳ - for discount)"}
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder={isBn ? "যেমন: 500" : "e.g. 500"}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "মজুদ সংখ্যা (Initial Stock) *" : "Initial Stock Quantity *"}
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="50"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isBn ? "খামারের উৎপত্তি স্থান *" : "Farm Origin Location *"}
              </label>
              <input
                type="text"
                value={originBn}
                onChange={(e) => setOriginBn(e.target.value)}
                placeholder={isBn ? "যেমন: সাভার অর্গানিক ফার্ম" : "e.g. Savar Dairy Farm, Dhaka"}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              {isBn ? "ছবির URL (Product Image URL)" : "Product Image URL"}
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              {isBn ? "বিবরণ (Description)" : "Description"}
            </label>
            <textarea
              rows={3}
              value={descriptionBn}
              onChange={(e) => setDescriptionBn(e.target.value)}
              placeholder={isBn ? "পণ্যের গুণাগুণ ও বিস্তারিত বর্ণনা লিখুন..." : "Enter product quality details and description..."}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              {isBn ? "প্রধান স্বাস্থ্য উপকারিতা (Key Benefit)" : "Key Health Benefit"}
            </label>
            <input
              type="text"
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
              placeholder={isBn ? "যেমন: কোনো রাসায়নিক সার বা কীটনাশক ছাড়া ১০০% প্রাকৃতিক" : "e.g. 100% pure & organic, chemical free"}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 text-xs font-bold transition-all"
            >
              {isBn ? "বাতিল" : "Cancel"}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] text-xs font-extrabold shadow-lg transition-all"
            >
              {isBn ? "পণ্য আপলোড সম্পন্ন করুন ✓" : "Upload & Save Product ✓"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
