import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProjectDetailPage } from "@/components/projects/ProjectDetailPage";
import {
  getProjectBySlug,
  getProjectResources,
  getProjectWorkflows,
  getRelatedProjects,
  publishedProjects,
} from "@/lib/projects";

type ProjectDetailRouteProps = {
  readonly params: Promise<{
    readonly slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "프로젝트를 찾을 수 없습니다 | AI 보건교사 자료실",
    };
  }

  const title = `${project.title} | AI 보건교사 자료실`;
  const canonicalPath = `/projects/${project.slug}`;

  return {
    title,
    description: project.summary,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description: project.summary,
      type: "website",
      url: canonicalPath,
      siteName: "AI 보건교사 자료실",
    },
  };
}

export default async function ProjectDetailRoute({ params }: ProjectDetailRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <ProjectDetailPage
        project={project}
        workflows={getProjectWorkflows(project)}
        resources={getProjectResources(project)}
        relatedProjects={getRelatedProjects(project)}
      />
      <SiteFooter />
    </>
  );
}
