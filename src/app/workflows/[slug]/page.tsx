import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WorkflowDetailPage } from "@/components/workflows/WorkflowDetailPage";
import {
  getRelatedWorkflows,
  getWorkflowBySlug,
  getWorkflowResources,
  publishedWorkflows,
} from "@/lib/workflows";

type WorkflowPageProps = {
  readonly params: Promise<{
    readonly slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedWorkflows.map((workflow) => ({
    slug: workflow.slug,
  }));
}

export async function generateMetadata({ params }: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);

  if (workflow === undefined) {
    return {
      title: "Workflow를 찾을 수 없습니다 | AI 보건교사 자료실",
    };
  }

  return {
    title: `${workflow.title} | AI 보건교사 자료실`,
    description: workflow.summary,
    alternates: {
      canonical: `/workflows/${workflow.slug}`,
    },
    openGraph: {
      title: `${workflow.title} | AI 보건교사 자료실`,
      description: workflow.summary,
      url: `/workflows/${workflow.slug}`,
    },
  };
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);

  if (workflow === undefined) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <WorkflowDetailPage
        workflow={workflow}
        resources={getWorkflowResources(workflow)}
        relatedWorkflows={getRelatedWorkflows(workflow)}
      />
      <SiteFooter />
    </>
  );
}
