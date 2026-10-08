import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { siteConfig } from "@/config/site";
import { ProductDetailView } from "@/components/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: `Product Not Found | ${siteConfig.title}`,
      description: "The requested organic product could not be found.",
    };
  }

  const title = `${product.title} (${product.titleBn}) | ${siteConfig.title}`;
  const description = `${product.description} ১০০% খাঁটি ও অর্গানিক। মূল্য: ৳${product.price}/${product.unitBn}। গ্রীনরুট ফার্ম থেকে সরাসরি সংগ্রহ।`;

  return {
    title,
    description,
    keywords: [
      product.title,
      product.titleBn,
      product.category,
      product.categoryBn,
      "organic",
      "farm fresh",
      "GreenRoot",
      "Bangladesh",
    ],
    openGraph: {
      title,
      description,
      url: `/products/${product.slug}`,
      siteName: siteConfig.title,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      type: "website",
      locale: "bn_BD",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView slug={slug} />;
}
