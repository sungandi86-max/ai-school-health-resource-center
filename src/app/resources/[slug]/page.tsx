import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ResourceDetailPage } from "@/components/resources/ResourceDetailPage";
import { getRelatedResources, getResourceBySlug, publishedResources } from "@/lib/resources";

type ResourceDetailRouteProps = {
  readonly params: Promise<{
    readonly slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedResources.map((resource) => ({
    slug: resource.slug,
  }));
}

export async function generateMetadata({
  params,
}: ResourceDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return {
      title: "자료를 찾을 수 없습니다 | AI 보건교사 자료실",
    };
  }

  const title = `${resource.title} | AI 보건교사 자료실`;
  const description = resource.summary;
  const canonicalPath = `/resources/${resource.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalPath,
      siteName: "AI 보건교사 자료실",
    },
  };
}

export default async function ResourceDetailRoute({ params }: ResourceDetailRouteProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const relatedResources = getRelatedResources(resource);

  return (
    <>
      <SiteHeader />
      <ResourceDetailPage resource={resource} relatedResources={relatedResources} />
      <SiteFooter />
    </>
  );
}
