"use client";

import { BookOpen, Clock3, Download, FileText, Link2 } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { useMemo, useSyncExternalStore } from "react";
import { DownloadButton } from "@/components/cms/DownloadButton";
import { cmsResources, getCategoryLabel } from "@/lib/cms";
import {
  getRecentDownloadsSnapshot,
  parseRecentDownloads,
  subscribeToRecentDownloads,
} from "@/lib/downloads";
import type { CmsResource } from "@/types/cms";

export function ResourceInsightPanels() {
  const storedRecentDownloads = useSyncExternalStore(
    subscribeToRecentDownloads,
    getRecentDownloadsSnapshot,
    getServerRecentDownloadsSnapshot,
  );
  const recentItems = useMemo(
    () =>
      parseRecentDownloads(storedRecentDownloads)
        .map((download) => cmsResources.find((resource) => resource.id === download.resourceId))
        .filter((resource): resource is CmsResource => resource !== undefined),
    [storedRecentDownloads],
  );
  const recommendedItems = cmsResources.filter((resource) => resource.isFeatured).slice(0, 3);
  const relatedItems = cmsResources
    .filter((resource) => ["workflow", "project", "guide"].includes(resource.category))
    .slice(0, 3);

  return (
    <section className="mt-16 grid gap-4 lg:grid-cols-3" aria-label="자료 추천과 최근 다운로드">
      <InsightPanel
        icon={Clock3}
        title="최근 다운로드"
        description="이 브라우저에서 최근에 받은 자료가 여기에 표시됩니다."
        items={recentItems}
        emptyText="아직 다운로드한 자료가 없습니다."
      />
      <InsightPanel
        icon={Download}
        title="추천 자료"
        description="처음 방문한 독자가 먼저 확인하기 좋은 자료입니다."
        items={recommendedItems}
      />
      <InsightPanel
        icon={Link2}
        title="관련 자료"
        description="전자책 흐름과 프로젝트 사례를 연결하는 자료입니다."
        items={relatedItems}
      />
    </section>
  );
}

type InsightPanelProps = {
  readonly icon: ComponentType<{ className?: string }>;
  readonly title: string;
  readonly description: string;
  readonly items: readonly CmsResource[];
  readonly emptyText?: string;
};

function InsightPanel({ icon: Icon, title, description, items, emptyText }: InsightPanelProps) {
  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-action-muted)] text-[var(--color-action-primary)]">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-brand-primary)]">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">{description}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {items.length > 0 ? (
          items.map((item) => <InsightItem key={`${title}-${item.id}`} item={item} />)
        ) : (
          <div className="rounded-2xl bg-[var(--color-surface-muted)] p-4 text-sm leading-6 text-[var(--color-text-secondary)]">
            <BookOpen aria-hidden="true" className="mb-2 size-4 text-[var(--color-action-primary)]" />
            {emptyText ?? "표시할 자료가 없습니다."}
          </div>
        )}
      </div>
    </div>
  );
}

function InsightItem({ item }: { readonly item: CmsResource }) {
  const content = (
    <>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-action-primary)]">
        <FileText aria-hidden="true" className="size-3.5" />
        {getCategoryLabel(item.category)} · {item.fileType}
      </span>
      <h3 className="mt-2 text-sm font-semibold leading-snug text-[var(--color-brand-primary)]">
        {item.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--color-text-secondary)]">
        {item.description}
      </p>
    </>
  );

  return (
    <div className="rounded-2xl bg-[var(--color-surface-muted)] p-4 transition hover:bg-[var(--color-action-muted)]">
      {content}
      <div className="mt-3">
        <DownloadButton
          resourceId={item.id}
          resourceTitle={item.title}
          download={item}
          className="w-full"
        />
      </div>
      {!item.filePath || !item.fileName ? (
        <Link
          href="#resources"
          className="mt-2 inline-flex min-h-10 w-full items-center justify-center rounded-xl px-3 text-xs font-semibold text-[var(--color-action-primary)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        >
          자료 목록에서 확인
        </Link>
      ) : null}
    </div>
  );
}

function getServerRecentDownloadsSnapshot() {
  return "";
}
