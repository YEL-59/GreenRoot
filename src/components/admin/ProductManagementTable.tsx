"use client";

import React, { useState } from "react";
import type { Product } from "@/types";
import { products as initialProductList, productCategories } from "@/data/products";
import { AddProductModal } from "./AddProductModal";

export const ProductManagementTable = () => {
  const [productList, setProductList] = useState<Product[]>(initialProductList);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredProducts = productList.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.titleBn.includes(searchTerm) ||
      p.originBn.includes(searchTerm);
    return matchesCat && matchesSearch;
  });

  const handleUpdateStock = (id: string, delta: number) => {
    setProductList(
      productList.map((p) => {
        if (p.id === id) {
          const newStock = Math.max(0, p.stock + delta);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("আপনি কি নিশ্চিত এই পণ্যটি ইনভেন্টরি থেকে মুছে ফেলতে চান?")) {
      setProductList(productList.filter((p) => p.id !== id));
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    setProductList([newProduct, ...productList]);
  };

  return (
    <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl text-white">
      {/* Table Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
            ইনভেন্টরি ও পণ্য ক্যাটালগ
          </span>
          <h3 className="text-xl font-black text-white">
            ফার্ম পণ্য তালিকা ({filteredProducts.length} টি আইটেম)
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="পণ্য বা উৎস খুঁজুন..."
              className="pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#E8AF30] w-48 sm:w-60"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
          >
            {productCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nameBn}
              </option>
            ))}
          </select>

          {/* Upload Product Trigger Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] text-xs font-black shadow-lg transition-all"
          >
            <i className="fa-solid fa-plus text-xs"></i>
            <span>নতুন পণ্য যোগ করুন (Upload)</span>
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-stone-400 uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">পণ্য ও বিবরণ</th>
              <th className="py-3 px-4">ক্যাটাগরি</th>
              <th className="py-3 px-4">মূল্য (Price)</th>
              <th className="py-3 px-4">মজুদ (Stock)</th>
              <th className="py-3 px-4">স্ট্যাটাস</th>
              <th className="py-3 px-4 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredProducts.map((p) => {
              const isLowStock = p.stock > 0 && p.stock <= 20;
              const isOutOfStock = p.stock === 0;

              return (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.titleBn}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-white text-sm line-clamp-1">{p.titleBn}</h4>
                        <span className="text-[11px] text-stone-400">{p.title}</span>
                        <div className="text-[10px] text-[#E8AF30] mt-0.5 flex items-center gap-1">
                          <i className="fa-solid fa-location-dot text-[9px]"></i>
                          {p.originBn}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-stone-300 text-[11px] font-semibold whitespace-nowrap">
                      {p.categoryBn}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <div className="text-sm font-black text-white">৳{p.price}</div>
                    <div className="text-[10px] text-stone-400">প্রতি {p.unitBn}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateStock(p.id, -5)}
                        className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 flex items-center justify-center font-bold"
                        title="Reduce 5"
                      >
                        -
                      </button>
                      <span className="font-bold text-white min-w-[28px] text-center font-mono">
                        {p.stock}
                      </span>
                      <button
                        onClick={() => handleUpdateStock(p.id, 5)}
                        className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 flex items-center justify-center font-bold"
                        title="Add 5"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        isOutOfStock
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : isLowStock
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isOutOfStock ? "bg-red-400" : isLowStock ? "bg-amber-400" : "bg-emerald-400"
                        }`}
                      ></span>
                      {isOutOfStock ? "স্টক শেষ" : isLowStock ? "সীমিত মজুদ" : "পর্যাপ্ত স্টক"}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/products/${p.slug}`}
                        target="_blank"
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white flex items-center justify-center"
                        title="Live view"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                      </a>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center"
                        title="Delete product"
                      >
                        <i className="fa-solid fa-trash-can text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Upload Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};
