import type { Metadata } from "next";
import { UpdateTimeline } from "@/components/cms/UpdateTimeline";
import { DocsBreadcrumb } from "@/components/layout/DocsBreadcrumb";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { cmsUpdates } from "@/lib/cms";

export const metadata: Metadata = {
  title: "업데이트 | AI School Health Resource Center",
  description: "전자책 자료실의 Release Notes와 최신 자료 변경 내역을 확인합니다.",
};

export default function UpdatesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-dvh bg-[var(--color-surface-subtle)] px-5 py-8 text-[var(--color-text-primary)] sm:px-8 lg:py-12">
        <div className="mx-auto grid w-full max-w-[960px] gap-8">
          <DocsBreadcrumb items={[{ label: "Home", href: "/" }, { label: "업데이트" }]} />
          <header className="rounded-[20px] bg-white p-6 shadow-[var(--shadow-card)]">
            <p className="text-sm font-semibold text-[var(--color-action-primary)]">Release Notes</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-[var(--color-brand-primary)]">
              업데이트
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">
              신규 프롬프트, Workflow 개선, 템플릿 수정처럼 자료실의 변경 내역을 버전별로 기록합니다.
            </p>
          </header>
          <section className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)] sm:p-6" aria-label="Release Notes">
            <UpdateTimeline updates={cmsUpdates} />
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
