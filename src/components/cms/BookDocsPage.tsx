import { BookOpen, QrCode, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/cms/BookCard";
import { ResourceCard } from "@/components/cms/ResourceCard";
import { DocsBreadcrumb } from "@/components/layout/DocsBreadcrumb";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  cmsBooks,
  formatCmsDate,
  getBookById,
  getBookChapters,
  getBookResourceSummary,
} from "@/lib/cms";

type BookDocsPageProps = {
  readonly bookId: string;
};

export function BookDocsPage({ bookId }: BookDocsPageProps) {
  const book = getBookById(bookId);

  if (!book) {
    notFound();
  }

  const summary = getBookResourceSummary(book.id);
  const chapters = getBookChapters(book.id);

  return (
    <>
      <SiteHeader />
      <main className="min-h-dvh bg-[var(--color-surface-subtle)] px-5 py-8 text-[var(--color-text-primary)] sm:px-8 lg:py-12">
        <div className="mx-auto grid w-full max-w-[1120px] gap-8">
          <DocsBreadcrumb items={[{ label: "Home", href: "/" }, { label: "전자책" }, { label: book.title }]} />
          <section className="grid gap-6 lg:grid-cols-[360px_1fr] lg:items-start">
            <BookCard book={book} summary={summary} />
            <div className="rounded-[20px] bg-white p-6 shadow-[var(--shadow-card)]">
              <p className="text-sm font-semibold text-[var(--color-action-primary)]">Official eBook</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-[var(--color-brand-primary)]">
                {book.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">
                {book.description}
              </p>
              <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                <InfoCard icon={BookOpen} label="상태" value={book.status} />
                <InfoCard icon={RefreshCcw} label="버전" value={book.version} />
                <InfoCard icon={QrCode} label="QR" value={book.qr} />
              </dl>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#resources"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                >
                  장별 자료 보기
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-surface-muted)] px-5 text-sm font-semibold text-[var(--color-brand-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                >
                  다운로드 전체 보기
                </Link>
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
            <div className="rounded-[20px] bg-white p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-xl font-semibold text-[var(--color-brand-primary)]">목차와 자료</h2>
              <div className="mt-5 grid gap-4">
                {chapters.map((chapter) => (
                  <section key={chapter.id} className="rounded-2xl bg-[var(--color-surface-muted)] p-4">
                    <p className="text-xs font-semibold text-[var(--color-action-primary)]">
                      Chapter {chapter.chapter}
                    </p>
                    <h3 className="mt-1 font-semibold text-[var(--color-brand-primary)]">{chapter.title}</h3>
                    <div className="mt-4 grid gap-3">
                      {chapter.resources.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
            <aside className="grid content-start gap-4">
              <PolicyCard
                title="업데이트 정책"
                description={`자료가 변경되면 JSON 데이터의 version과 updatedAt을 갱신합니다. 현재 최신 업데이트는 ${formatCmsDate(summary.updatedAt || book.updatedAt)}입니다.`}
              />
              <PolicyCard
                title="확장 방식"
                description="새 전자책은 books.json에, 해당 자료는 resources.json에 추가하면 같은 레이아웃으로 자동 표시됩니다."
              />
            </aside>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export const getBookStaticParams = () => cmsBooks.map((book) => ({ bookId: book.id }));

type InfoCardProps = {
  readonly icon: typeof BookOpen;
  readonly label: string;
  readonly value: string;
};

function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <div className="rounded-2xl bg-[var(--color-surface-muted)] p-4">
      <dt className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-tertiary)]">
        <Icon aria-hidden="true" className="size-4" />
        {label}
      </dt>
      <dd className="mt-2 text-sm font-semibold text-[var(--color-brand-primary)]">{value}</dd>
    </div>
  );
}

function PolicyCard({ title, description }: { readonly title: string; readonly description: string }) {
  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)]">
      <h2 className="text-lg font-semibold text-[var(--color-brand-primary)]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{description}</p>
    </div>
  );
}
