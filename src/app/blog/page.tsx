import React from "react";
import Link from "next/link";
import { articles } from "@/data/blog";

export default function BlogPage() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Header Banner */}
      <section className="relative pt-36 pb-16 bg-[#002f1f] text-white">
        <div className="container relative z-10 px-4 text-center max-w-2xl mx-auto">
          <span className="text-[#E8AF30] text-xs font-bold uppercase tracking-wider block mb-2">
            Organic Living & Insights
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            কৃষি ও স্বাস্থ্য ব্লগ
          </h1>
          <p className="text-emerald-100/80 text-sm leading-relaxed">
            খাঁটি অর্গানিক জীবনযাত্রা, প্রাকৃতিক খাদ্য উপাদান ও খামারভিত্তিক কৃষির সর্বশেষ তথ্য ও পরামর্শ।
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-[#002f1f] text-white text-[11px] font-bold shadow-sm">
                        {article.categoryBn}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
                      <span>{article.dateBn}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <Link href={`/blog/${article.slug}`}>
                      <h3 className="font-bold text-stone-900 text-lg leading-snug mb-2 group-hover:text-emerald-800 transition-colors">
                        {article.titleBn}
                      </h3>
                    </Link>

                    <p className="text-stone-500 text-xs leading-relaxed line-clamp-3 mb-4">
                      {article.excerptBn}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                  <span className="text-xs text-stone-600 font-medium">
                    লেখক: {article.author}
                  </span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-xs font-bold text-[#002f1f] hover:text-[#E8AF30] flex items-center gap-1 transition-colors"
                  >
                    <span>পড়ুন</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
