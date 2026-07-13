import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TemplateCenter } from "@/components/templates/TemplateCenter";
import { publishedTemplates } from "@/lib/templates";

export const metadata: Metadata = {
  title: "템플릿 자료실 | AI 보건교사 자료실",
  description:
    "보건교사가 업무에 바로 사용할 수 있는 Google Sheets, Docs, PDF, Markdown, ZIP 템플릿 자료를 찾을 수 있습니다.",
};

export default function TemplatesPage() {
  return (
    <>
      <SiteHeader />
      <Suspense
        fallback={
          <main className="min-h-dvh bg-[var(--color-surface-subtle)] px-5 py-10 text-[var(--color-text-primary)]">
            <div className="mx-auto w-full max-w-6xl rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-6">
              템플릿 자료실을 준비하고 있습니다.
            </div>
          </main>
        }
      >
        <TemplateCenter templates={publishedTemplates} />
      </Suspense>
      <SiteFooter />
    </>
  );
}
