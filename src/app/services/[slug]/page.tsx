import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/about";
import { ServiceDetailView } from "@/components/services";
import {
  servicesList,
  defaultServiceDetail,
  type ServiceDetailData,
} from "@/data/services";
import { siteConfig } from "@/config/site";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = [
    ...servicesList.map((s) => ({ slug: s.slug })),
    { slug: "service-single" },
    { slug: "organic-vegetable-farming" },
    { slug: "farm-tours" },
    { slug: "agricultural-consulting" },
    { slug: "fresh-produce-delivery" },
  ];
  return slugs;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const matched = servicesList.find((s) => s.slug === slug);
  const title = matched ? matched.title : "Service Details";

  return {
    title: `${title} | ${siteConfig.title}`,
    description: `Learn more about ${title} and our sustainable organic agricultural practices at GreenRoot.`,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  // Find matching service item or fallback to default
  const matchedService =
    servicesList.find((s) => s.slug === slug) ||
    (slug === "service-single" ||
    slug === "organic-vegetable-farming" ||
    slug === "farm-tours" ||
    slug === "agricultural-consulting" ||
    slug === "fresh-produce-delivery"
      ? servicesList[0]
      : null);

  if (!matchedService) {
    notFound();
  }

  // Construct service detail data tailored for the slug
  const serviceDetail: ServiceDetailData = {
    ...defaultServiceDetail,
    slug: matchedService.slug,
    title: matchedService.title,
    heroImage: matchedService.image || defaultServiceDetail.heroImage,
    shortDesc: matchedService.description,
  };

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: serviceDetail.title, href: `/services/${serviceDetail.slug}`, active: true },
  ];

  return (
    <>
      {/* Page Header Banner */}
      <PageHeader title={serviceDetail.title} breadcrumb={breadcrumb} />

      {/* Main Service Details Content with Sidebar */}
      <ServiceDetailView service={serviceDetail} />
    </>
  );
}
