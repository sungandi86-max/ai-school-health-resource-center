import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WorkflowCenter } from "@/components/workflows/WorkflowCenter";
import { publishedWorkflows } from "@/lib/workflows";

export const metadata: Metadata = {
  title: "AI Workflow | AI 보건교사 자료실",
  description:
    "보건교사의 반복 업무를 AI와 함께 처리하는 실전 Workflow를 찾아볼 수 있습니다.",
};

export default function WorkflowsPage() {
  return (
    <>
      <SiteHeader />
      <Suspense
        fallback={
          <main className="min-h-dvh bg-[var(--color-surface-subtle)] px-5 py-10 text-[var(--color-text-primary)]">
            <div className="mx-auto w-full max-w-6xl rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-6">
              Workflow를 준비하고 있습니다.
            </div>
          </main>
        }
      >
        <WorkflowCenter workflows={publishedWorkflows} />
      </Suspense>
      <SiteFooter />
    </>
  );
}
