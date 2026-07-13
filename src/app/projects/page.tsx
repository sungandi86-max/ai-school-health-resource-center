import { Suspense } from "react";
import type { Metadata } from "next";
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
          <main className="min-h-dvh bg-[var(--color-surface-subtle)] px-5 py-10 text-[var(--color-text-primary)]">
            <div className="mx-auto w-full max-w-6xl rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-6">
              프로젝트 사례를 준비하고 있습니다.
            </div>
          </main>
        }
      >
        <ProjectExplorer projects={publishedProjects} />
      </Suspense>
      <SiteFooter />
    </>
  );
}
