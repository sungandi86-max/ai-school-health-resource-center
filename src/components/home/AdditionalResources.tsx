import { ClipboardCheck, Code2, FileSpreadsheet, FileText, Workflow } from "lucide-react";
import type { ComponentType } from "react";

const additionalResources = [
  {
    title: "Google Sheets 템플릿",
    description: "책의 PART 1~8 실습을 하나의 프로젝트 파일로 이어서 작성하는 통합 시트입니다.",
    href: "https://docs.google.com/spreadsheets/d/1mZh-QK7SuAKVLTAAt1AoiJVaTZEZkXPTeA5QlyF7wwg/copy",
    status: "사본 만들기",
    icon: FileSpreadsheet,
  },
  {
    title: "Apps Script 예제",
    description: "Google Sheets와 프런트엔드를 연결하는 Apps Script 예제 파일 모음입니다.",
    href: "/downloads/apps-script-examples-pack.zip",
    status: "다운로드",
    icon: Code2,
  },
  {
    title: "업무 점검 체크리스트",
    description: "AI로 자동화하기 전 업무 흐름, 개인정보, 반복 가능성을 점검하는 체크리스트입니다.",
    href: "/downloads/school-health-task-checklist.pdf",
    status: "다운로드",
    icon: ClipboardCheck,
  },
  {
    title: "실습 파일",
    description: "연수와 실습에서 함께 사용할 수 있는 예제 파일 패키지입니다.",
    href: "/downloads/lecture-practice-files.zip",
    status: "다운로드",
    icon: FileText,
  },
  {
    title: "Workflow 자료",
    description: "보건업무 자동화 흐름을 설계할 때 참고하는 Workflow 설계 문서입니다.",
    href: "/downloads/workflows/ai-workflow-design-doc-v1.0.md",
    status: "다운로드",
    icon: Workflow,
  },
] as const;

export function AdditionalResources() {
  return (
    <section id="additional-resources" className="mt-10" aria-labelledby="additional-resources-title">
      <div className="rounded-[20px] border border-[var(--color-border-subtle)] bg-white p-4 shadow-[var(--shadow-card)] sm:p-5">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[var(--color-action-primary)]">추가 자료</p>
          <h2 id="additional-resources-title" className="mt-1 text-xl font-semibold text-[var(--color-brand-primary)]">
            책과 함께 쓰는 실습 자료
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            프롬프트 외에도 Google Sheets 템플릿, Apps Script 예제, 체크리스트, 실습 파일, Workflow 자료를 함께 제공합니다.
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {additionalResources.map((resource) => (
            <AdditionalResourceCard key={resource.title} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}

type AdditionalResource = (typeof additionalResources)[number];

function AdditionalResourceCard({ resource }: { readonly resource: AdditionalResource }) {
  const Icon = resource.icon;
  const content = <AdditionalResourceCardContent icon={Icon} resource={resource} />;

  if ("href" in resource) {
    const isExternalLink = resource.href.startsWith("http");

    return (
      <a
        href={resource.href}
        download={isExternalLink ? undefined : true}
        rel={isExternalLink ? "noreferrer" : undefined}
        target={isExternalLink ? "_blank" : undefined}
        className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] p-4 transition hover:border-[var(--color-brand-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
      >
        {content}
      </a>
    );
  }

  return <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] p-4">{content}</div>;
}

function AdditionalResourceCardContent({
  icon: Icon,
  resource,
}: {
  readonly icon: ComponentType<{ className?: string }>;
  readonly resource: AdditionalResource;
}) {
  return (
    <div className="flex gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-action-muted)] text-[var(--color-brand-primary)]">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold leading-6 text-[var(--color-brand-primary)]">{resource.title}</span>
          <span className="rounded-full bg-[var(--color-action-muted)] px-2 py-0.5 text-xs font-semibold text-[var(--color-brand-primary)]">
            {resource.status}
          </span>
        </span>
        <span className="mt-1 block text-sm leading-6 text-[var(--color-text-secondary)]">{resource.description}</span>
      </span>
    </div>
  );
}
