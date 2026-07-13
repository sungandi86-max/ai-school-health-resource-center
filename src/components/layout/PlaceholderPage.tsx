import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type PlaceholderPageProps = {
  readonly title: string;
  readonly description: string;
  readonly status?: string;
};

export function PlaceholderPage({
  title,
  description,
  status = "이 페이지는 다음 단계에서 자세히 구현할 예정입니다.",
}: PlaceholderPageProps) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-dvh bg-[var(--color-surface-subtle)] px-5 py-10 text-[var(--color-text-primary)]">
        <section className="mx-auto grid w-full max-w-3xl gap-5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-6 shadow-[var(--shadow-subtle)] sm:p-8">
          <div>
            <p className="text-sm font-semibold text-[var(--color-action-primary)]">준비 중</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight">{title}</h1>
            <p className="mt-3 text-base leading-7 text-[var(--color-text-secondary)]">
              {description}
            </p>
          </div>
          <p className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm leading-6 text-[var(--color-text-secondary)]">
            {status}
          </p>
          <Link
            href="/"
            className="inline-flex min-h-12 w-fit items-center gap-2 rounded-md border border-[var(--color-border-default)] px-4 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            홈으로 돌아가기
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
