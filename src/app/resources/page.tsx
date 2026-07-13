import { Suspense } from "react";
import type { Metadata } from "next";
import { DocsLoadingSkeleton } from "@/components/layout/DocsLoadingSkeleton";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ResourceExplorer } from "@/components/resources/ResourceExplorer";
import { publishedResources } from "@/lib/resources";

export const metadata: Metadata = {
  title: "다운로드 | AI School Health Resource Center",
  description: "프롬프트, 템플릿, Workflow, 프로젝트 자료를 검색하고 필터링해 다운로드 자료를 찾습니다.",
};

export default function ResourcesPage() {
  return (
    <>
      <SiteHeader />
      <Suspense
        fallback={
          <DocsLoadingSkeleton label="다운로드 자료를 준비하고 있습니다." />
        }
      >
        <ResourceExplorer resources={publishedResources} />
      </Suspense>
      <SiteFooter />
    </>
  );
}
