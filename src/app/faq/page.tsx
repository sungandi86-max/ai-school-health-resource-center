import type { Metadata } from "next";
import { DocsBreadcrumb } from "@/components/layout/DocsBreadcrumb";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { cmsFaqs } from "@/lib/cms";

export const metadata: Metadata = {
  title: "FAQ | AI School Health Resource Center",
  description: "AI 보건교사 자료실의 자료 업데이트, 사용 범위, 수정 가능 여부를 안내합니다.",
};

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-dvh bg-[var(--color-surface-subtle)] px-5 py-8 text-[var(--color-text-primary)] sm:px-8 lg:py-12">
        <div className="mx-auto grid w-full max-w-[880px] gap-8">
          <DocsBreadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
          <header className="rounded-[20px] bg-white p-6 shadow-[var(--shadow-card)]">
            <p className="text-sm font-semibold text-[var(--color-action-primary)]">Support</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-[var(--color-brand-primary)]">
              FAQ
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">
              전자책 자료실의 업데이트 방식, 공개 범위, 자료 수정 기준을 확인하세요.
            </p>
          </header>
          <section className="grid gap-3" aria-label="자주 묻는 질문">
            {cmsFaqs.map((item) => (
              <details key={item.id} className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)]">
                <summary className="cursor-pointer list-none text-base font-semibold text-[var(--color-brand-primary)]">
                  {item.question}
                </summary>
                <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">{item.answer}</p>
              </details>
            ))}
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
