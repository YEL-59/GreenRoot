import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/blog";
import { siteConfig } from "@/config/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: `Article Not Found | ${siteConfig.title}`,
      description: "The requested blog article could not be found.",
    };
  }

  const title = `${article.titleBn} (${article.title}) | ${siteConfig.title}`;
  const description = article.excerptBn || article.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/blog/${article.slug}`,
      siteName: siteConfig.title,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      locale: "bn_BD",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.image],
    },
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const otherArticles = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="bg-[#FAF9F5] min-h-screen pt-36 pb-20">
      <div className="container max-w-4xl px-4 mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-stone-500 mb-6">
          <Link href="/" className="hover:text-[#002f1f]">হোম</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#002f1f]">ব্লগ</Link>
          <span>/</span>
          <span className="text-stone-900 font-semibold truncate">{article.titleBn}</span>
        </nav>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-6 md:p-12 border border-stone-200/90 shadow-sm mb-12">
          <div className="mb-6">
            <span className="px-3.5 py-1.5 rounded-full bg-[#002f1f] text-white text-xs font-bold inline-block mb-3">
              {article.categoryBn}
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-stone-900 leading-tight mb-4">
              {article.titleBn}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 pb-6 border-b border-stone-100">
              <span className="text-stone-700 font-semibold">{article.author}</span>
              <span>•</span>
              <span>{article.dateBn}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mb-8 aspect-[16/9] bg-stone-100">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-5 text-stone-700 text-sm md:text-base leading-relaxed">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Farm Shop Callout inside Article */}
          <div className="mt-10 p-6 rounded-2xl bg-[#002f1f] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-base text-[#E8AF30] mb-1">
                খাঁটি খামার পণ্য আপনার ঘরে পৌঁছে দিতে প্রস্তুত
              </h4>
              <p className="text-xs text-emerald-200/80">
                দুধ, ঘি, মধু, তেল ও তাজা শাকসবজি কিনতে গ্রীনরুট ফার্ম শপে আসুন।
              </p>
            </div>
            <Link
              href="/products"
              className="btn-default py-2.5 px-6 text-xs whitespace-nowrap"
            >
              ফার্ম শপ দেখুন
            </Link>
          </div>
        </article>

        {/* Other articles */}
        {otherArticles.length > 0 && (
          <div>
            <h3 className="font-bold text-xl text-stone-900 mb-6">অন্যান্য পোস্ট পড়ুন</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="bg-white rounded-2xl p-4 border border-stone-200 flex items-center gap-4 hover:shadow-md transition-all group"
                >
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm group-hover:text-emerald-800 line-clamp-2 mb-1">
                      {a.titleBn}
                    </h4>
                    <span className="text-xs text-stone-400">{a.dateBn}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
