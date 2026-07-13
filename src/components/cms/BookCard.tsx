import { BookOpen, CalendarDays, Download, RefreshCcw } from "lucide-react";
import Link from "next/link";
import type { CmsBook, CmsBookSummary } from "@/types/cms";
import { formatCmsDate } from "@/lib/cms";

type BookCardProps = {
  readonly book: CmsBook;
  readonly summary: CmsBookSummary;
};

export function BookCard({ book, summary }: BookCardProps) {
  return (
    <article className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)]">
      <div className="rounded-[20px] bg-[linear-gradient(145deg,#183B66,#4A90E2)] p-5 text-white">
        <p className="text-xs font-semibold opacity-80">{book.status}</p>
        <h2 className="mt-10 text-2xl font-semibold leading-tight">{book.title}</h2>
        <p className="mt-3 text-sm leading-6 opacity-85">{book.subtitle}</p>
      </div>
      <p className="mt-5 text-sm leading-6 text-[var(--color-text-secondary)]">{book.description}</p>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <SummaryItem icon={BookOpen} label="출간 버전" value={book.version} />
        <SummaryItem
          icon={RefreshCcw}
          label="최종 업데이트"
          value={formatCmsDate(summary.updatedAt || book.updatedAt)}
        />
        <SummaryItem icon={Download} label="자료 개수" value={`${summary.resourceCount}개`} />
        <SummaryItem
          icon={CalendarDays}
          label="다운로드 수"
          value={`${summary.downloadCount.toLocaleString("ko-KR")}회`}
        />
      </dl>
      <Link
        href={`/book/${book.id}`}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[var(--color-brand-primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
      >
        전자책 자료 보기
      </Link>
    </article>
  );
}

type SummaryItemProps = {
  readonly icon: typeof BookOpen;
  readonly label: string;
  readonly value: string;
};

function SummaryItem({ icon: Icon, label, value }: SummaryItemProps) {
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
