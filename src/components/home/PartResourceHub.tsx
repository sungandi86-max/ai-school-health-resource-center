import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { PromptResourceButton } from "@/components/home/PromptResourceButton";
import { bookParts } from "@/data/bookParts";
import { fullProjectResource, type BookResource } from "@/data/bookResources";

export function PartResourceHub() {
  return (
    <main className="min-h-dvh bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)]">
      <section className="border-b border-[var(--color-border-subtle)] bg-white">
        <div className="mx-auto grid w-full max-w-[1180px] gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:py-10">
          <div>
            <p className="w-fit rounded-full bg-[var(--color-action-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)] ring-1 ring-[var(--color-border-subtle)]">
              『보건교사를 위한 AI 업무 자동화』 전자책 부록
            </p>
            <h1 className="mt-4 max-w-4xl text-[2.15rem] font-semibold leading-[1.12] tracking-[-0.025em] text-[var(--color-brand-primary)] sm:text-[3rem] lg:text-[3.45rem]">
              『보건교사를 위한 AI 업무 자동화』 자료실
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
              책에서 읽고 있는 PART를 선택해 Chapter별 프롬프트와 실습자료를
              확인하세요. 프로젝트 파일은 다음 PART에서도 계속 이어서 사용합니다.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#parts"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
              >
                PART 1부터 보기
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>

          <aside className="rounded-[20px] bg-[var(--color-brand-primary)] p-5 text-white shadow-[var(--shadow-card)] sm:p-6">
            <h2 className="text-base font-semibold">자료실 사용 순서</h2>
            <ol className="mt-4 grid gap-3 text-sm leading-6 text-white/85">
              <li>1. 책에서 읽고 있는 PART를 선택합니다.</li>
              <li>2. Chapter별 프롬프트와 실습자료를 확인합니다.</li>
              <li>3. PART 프로젝트 파일을 내려받아 다음 PART에서도 이어 씁니다.</li>
            </ol>
            <div className="mt-5">
              <DownloadResourceLink
                resource={fullProjectResource}
                label="전체 프로젝트 파일"
                variant="dark"
              />
            </div>
          </aside>
        </div>
      </section>

      <section id="parts" className="mx-auto grid w-full max-w-[1180px] gap-5 px-5 py-8 sm:px-8 lg:py-10">
        {bookParts.map((part) => (
          <article
            key={part.number}
            className="overflow-hidden rounded-[20px] bg-white shadow-[var(--shadow-card)]"
          >
            <header className="grid gap-4 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-blue)] p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <p className="text-xs font-semibold text-[var(--color-action-primary)]">
                  PART {part.number}
                </p>
                <h2 className="mt-2 text-2xl font-semibold leading-snug text-[var(--color-brand-primary)]">
                  {part.title}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--color-text-secondary)]">
                  {part.description}
                </p>
              </div>
              <span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)] shadow-[var(--shadow-ring)]">
                {part.chapters.length} Chapters
              </span>
            </header>
            <div className="border-b border-[var(--color-border-subtle)] bg-white p-5 sm:p-6">
              <DownloadResourceLink
                resource={part.projectResource}
                label={`PART ${part.number} 프로젝트 파일`}
              />
            </div>
            <div className="grid gap-px bg-[var(--color-border-subtle)] lg:grid-cols-3">
              {part.chapters.map((chapter) => (
                <section key={chapter.number} className="grid content-start gap-4 bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-[var(--color-action-primary)]">
                      Chapter {String(chapter.number).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-[var(--color-action-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--color-brand-primary)]">
                      {chapter.day}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-[var(--color-brand-primary)]">
                    {chapter.title}
                  </h3>
                  <dl className="grid gap-2 border-y border-[var(--color-border-subtle)] py-3 text-sm">
                    <MetaRow label="시간" value={chapter.duration} />
                    <MetaRow label="난이도" value={chapter.difficulty} />
                    <MetaRow label="오늘 만드는 것" value={chapter.output} />
                  </dl>
                  <p className="rounded-2xl bg-[var(--color-status-success-muted)] px-4 py-3 text-sm font-semibold leading-6 text-[var(--color-status-success)]">
                    실습 {String(chapter.number).padStart(2, "0")} · {chapter.practice}
                  </p>
                  <div className="grid gap-2">
                    {chapter.resources.map((resource) => (
                      <ResourceLink key={resource.id} resource={resource} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function MetaRow({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="grid grid-cols-[92px_1fr] gap-3">
      <dt className="text-[var(--color-text-tertiary)]">{label}</dt>
      <dd className="font-semibold text-[var(--color-brand-primary)]">{value}</dd>
    </div>
  );
}

function ResourceLink({ resource }: { readonly resource: BookResource }) {
  if (resource.type === "prompt") {
    return <PromptResourceButton resource={resource} />;
  }

  return <DownloadResourceLink resource={resource} label="실습자료 다운로드" />;
}

function DownloadResourceLink({
  resource,
  label,
  variant = "light",
}: {
  readonly resource: BookResource;
  readonly label: string;
  readonly variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  const chapterLabel = resource.chapter
    ? `Chapter ${String(resource.chapter).padStart(2, "0")}`
    : resource.type === "full-project"
      ? "PART 1~8"
      : `PART ${resource.part}`;
  const formatLabel = resource.mimeType.includes("markdown") ? "MD" : "XLSX";

  return (
    <a
      href={resource.downloadPath}
      download={resource.fileName}
      className={
        isDark
          ? "flex min-h-12 items-center justify-between gap-3 rounded-xl border border-white/25 bg-white/10 px-3 text-sm transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          : "flex min-h-11 items-center justify-between gap-3 rounded-xl border border-[var(--color-border-default)] px-3 text-sm transition hover:border-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
      }
      aria-label={`${resource.title} 다운로드 (${formatLabel} · ${chapterLabel})`}
    >
      <span
        className={`flex min-w-0 items-center gap-2 font-semibold ${
          isDark ? "text-white" : "text-[var(--color-brand-primary)]"
        }`}
      >
        <Download
          aria-hidden="true"
          className={`size-4 shrink-0 ${isDark ? "text-white/85" : "text-[var(--color-action-primary)]"}`}
        />
        <span className="min-w-0">
          <span className="block truncate">{label}</span>
          <span className={`block truncate text-xs font-medium ${isDark ? "text-white/70" : "text-[var(--color-text-secondary)]"}`}>
            {resource.title}
          </span>
        </span>
      </span>
      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
          isDark
            ? "bg-white text-[var(--color-brand-primary)]"
            : "bg-[var(--color-action-muted)] text-[var(--color-brand-primary)]"
        }`}
      >
        {formatLabel} · {chapterLabel}
      </span>
    </a>
  );
}
