import { ArrowRight, Download, FileText, QrCode } from "lucide-react";
import Link from "next/link";
import { bookParts, bookPartSummary, type BookResource } from "@/data/bookParts";

const resourceLabels: Record<BookResource["kind"], string> = {
  prompt: "프롬프트",
  worksheet: "실습자료",
  project: "프로젝트 파일",
};

export function PartResourceHub() {
  return (
    <main className="min-h-dvh bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)]">
      <section className="border-b border-[var(--color-border-subtle)] bg-white">
        <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:py-16">
          <div>
            <p className="w-fit rounded-full bg-[var(--color-action-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)] ring-1 ring-[var(--color-border-subtle)]">
              『보건교사를 위한 AI 업무 자동화』 전자책 부록
            </p>
            <h1 className="mt-5 max-w-4xl text-[2.35rem] font-semibold leading-[1.12] tracking-[-0.025em] text-[var(--color-brand-primary)] sm:text-[3.35rem] lg:text-[4rem]">
              책을 읽는 순서 그대로 따라가는 프로젝트 자료실
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
              PART 1부터 PART 8까지, 각 Chapter에서 사용하는 프롬프트와 실습자료,
              프로젝트 파일을 같은 자리에서 확인합니다.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#parts"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
              >
                PART 1부터 보기
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="#qr-guide"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-action-muted)] px-5 text-sm font-semibold text-[var(--color-brand-primary)] transition hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
              >
                QR 이용 방식
                <QrCode aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>

          <aside className="rounded-[20px] bg-[var(--color-brand-primary)] p-5 text-white shadow-[var(--shadow-card)] sm:p-6">
            <h2 className="text-base font-semibold">자료실 사용 순서</h2>
            <ol className="mt-4 grid gap-3 text-sm leading-6 text-white/85">
              <li>1. 책에서 현재 PART와 Chapter를 확인합니다.</li>
              <li>2. 같은 PART 카드에서 필요한 자료를 찾습니다.</li>
              <li>3. 실습자료를 내려받아 작성합니다.</li>
              <li>4. 작성한 프로젝트 파일을 다음 PART에서도 이어 사용합니다.</li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1180px] gap-3 px-5 pt-6 sm:grid-cols-4 sm:px-8">
        <SummaryCard value={`${bookPartSummary.partCount}`} label="PART" />
        <SummaryCard value={`${bookPartSummary.chapterCount}`} label="Chapter" />
        <SummaryCard value="22" label="실습 흐름" />
        <SummaryCard value="3" label={bookPartSummary.resourceKinds.join(" · ")} />
      </section>

      <section className="mx-auto grid w-full max-w-[1180px] gap-5 px-5 py-10 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:py-14">
        <div>
          <p className="text-sm font-semibold text-[var(--color-action-primary)]">IA 재설계</p>
          <h2 className="mt-2 text-2xl font-semibold leading-snug tracking-[-0.015em] text-[var(--color-brand-primary)] sm:text-3xl">
            자료 종류가 아니라 책의 흐름으로 찾습니다
          </h2>
        </div>
        <p className="text-base leading-8 text-[var(--color-text-secondary)]">
          기존 자료실의 검색·다운로드 기능은 유지하되, 첫 화면의 기준을
          “프롬프트 모음”에서 “PART별 프로젝트 진행”으로 바꿨습니다. QR로 들어온
          독자는 자료실에서 해당 PART를 선택하고, Chapter별 자료를 내려받아 책의
          실습을 그대로 따라갑니다.
        </p>
      </section>

      <section id="parts" className="mx-auto grid w-full max-w-[1180px] gap-5 px-5 pb-12 sm:px-8 lg:pb-16">
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
                      <ResourceLink key={`${chapter.number}-${resource.kind}`} resource={resource} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section
        id="qr-guide"
        className="mx-auto grid w-full max-w-[1180px] gap-5 px-5 pb-16 sm:px-8 lg:grid-cols-[1fr_1fr]"
        aria-labelledby="qr-guide-title"
      >
        <div className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
          <p className="text-sm font-semibold text-[var(--color-action-primary)]">QR 연동 방식</p>
          <h2 id="qr-guide-title" className="mt-2 text-2xl font-semibold text-[var(--color-brand-primary)]">
            QR은 개별 파일이 아니라 자료실로 연결됩니다
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
            출간본의 QR은 이 자료실 첫 화면으로 이동합니다. 독자는 자료실에서 해당
            PART를 선택한 뒤, Chapter별 실습자료와 프로젝트 파일을 내려받습니다.
          </p>
        </div>
        <div className="rounded-[20px] bg-[var(--color-brand-primary)] p-5 text-white shadow-[var(--shadow-card)] sm:p-6">
          <p className="text-sm font-semibold text-white/70">출간본 권장 문구</p>
          <blockquote className="mt-3 border-l-4 border-white/40 pl-4 text-base leading-8 text-white/90">
            QR을 스캔하면 『보건교사를 위한 AI 업무 자동화』 자료실이 열립니다.
            해당 PART의 실습 자료를 내려받아 작성하세요. 이 프로젝트 파일은 다음
            PART에서도 계속 이어서 사용합니다.
          </blockquote>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-5 pb-16 sm:px-8">
        <div className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
          <p className="text-sm font-semibold text-[var(--color-action-primary)]">출간 버전 확정</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ReleaseItem title="정보구조" text="PART 1~8, Chapter 01~22 반영" />
            <ReleaseItem title="데이터 구조" text="PART, Chapter, Resource 단위 분리" />
            <ReleaseItem title="링크 정책" text="실제 자료 업로드 후 href만 교체" />
            <ReleaseItem title="독자 안내" text="자료실 → PART 선택 → 다운로드" />
          </div>
        </div>
      </section>
    </main>
  );
}

function SummaryCard({ value, label }: { readonly value: string; readonly label: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[var(--shadow-ring)]">
      <strong className="block text-3xl text-[var(--color-brand-primary)]">{value}</strong>
      <span className="mt-1 block text-sm leading-6 text-[var(--color-text-secondary)]">{label}</span>
    </div>
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
  const isReady = resource.status === "ready";

  return (
    <Link
      href={isReady ? resource.href : "#qr-guide"}
      aria-disabled={!isReady}
      className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-[var(--color-border-default)] px-3 text-sm transition hover:border-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
    >
      <span className="flex min-w-0 items-center gap-2 font-semibold text-[var(--color-brand-primary)]">
        {resource.kind === "prompt" ? (
          <FileText aria-hidden="true" className="size-4 shrink-0 text-[var(--color-action-primary)]" />
        ) : (
          <Download aria-hidden="true" className="size-4 shrink-0 text-[var(--color-action-primary)]" />
        )}
        <span className="truncate">{resource.label}</span>
      </span>
      <span className="shrink-0 rounded-full bg-[var(--color-action-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">
        {isReady ? "다운로드" : `${resourceLabels[resource.kind]} 예정`}
      </span>
    </Link>
  );
}

function ReleaseItem({ title, text }: { readonly title: string; readonly text: string }) {
  return (
    <div className="rounded-2xl bg-[var(--color-surface-muted)] p-4">
      <h3 className="text-sm font-semibold text-[var(--color-brand-primary)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{text}</p>
    </div>
  );
}
