import { Suspense } from "react";
import type { Metadata } from "next";
import { DocsLoadingSkeleton } from "@/components/layout/DocsLoadingSkeleton";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { publishedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "프로젝트 사례 | AI 보건교사 자료실",
  description:
    "보건 업무의 문제를 AI와 디지털 Workflow로 개선한 프로젝트 구조와 적용 사례를 살펴볼 수 있습니다.",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <Suspense
        fallback={
          <DocsLoadingSkeleton label="프로젝트 사례를 준비하고 있습니다." />
        }
      >
        <ProjectExplorer projects={publishedProjects} />
      </Suspense>
      <SiteFooter />
    </>
  );
}
