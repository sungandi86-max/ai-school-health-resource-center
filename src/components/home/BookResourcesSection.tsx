import { BookOpen, FileArchive, ListChecks } from "lucide-react";
import Link from "next/link";

const bookLinks = [
  { label: "장별 자료 보기", href: "/book/ai-work-automation", icon: BookOpen },
  { label: "전체 프롬프트 보기", href: "/prompts", icon: ListChecks },
  { label: "실습 파일 보기", href: "/templates", icon: FileArchive },
] as const;

export function BookResourcesSection() {
  return (
    <section
      className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 shadow-[var(--shadow-subtle)] sm:p-6"
      aria-labelledby="book-resources-title"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-[var(--color-action-primary)]">전자책 연계 자료</p>
          <h2 id="book-resources-title" className="mt-2 text-2xl font-semibold leading-snug">
            『보건교사를 위한 AI 업무 자동화』 실전 자료
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
            책에서 소개한 프롬프트와 템플릿, 실습 자료의 최신 버전을 제공합니다.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[520px]">
          {bookLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--color-border-default)] px-3 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
              >
                <Icon aria-hidden="true" size={16} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
