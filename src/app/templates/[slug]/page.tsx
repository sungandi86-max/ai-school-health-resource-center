import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TemplateDetailPage } from "@/components/templates/TemplateDetailPage";
import { getTemplateBySlug, publishedTemplates } from "@/lib/templates";

type TemplateDetailRouteProps = {
  readonly params: Promise<{
    readonly slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedTemplates.map((template) => ({
    slug: template.slug,
  }));
}

export async function generateMetadata({
  params,
}: TemplateDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return {
      title: "템플릿을 찾을 수 없습니다 | AI 보건교사 자료실",
    };
  }

  const title = `${template.title} | AI 보건교사 자료실`;
  const canonicalPath = `/templates/${template.slug}`;

  return {
    title,
    description: template.summary,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description: template.summary,
      type: "website",
      url: canonicalPath,
      siteName: "AI 보건교사 자료실",
    },
  };
}

export default async function TemplateDetailRoute({ params }: TemplateDetailRouteProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <TemplateDetailPage template={template} />
      <SiteFooter />
    </>
  );
}
