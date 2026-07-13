"use client";

import {
  ArrowRight,
  BookOpenText,
  ClipboardList,
  FileText,
  HeartPulse,
  LayoutDashboard,
  MonitorCheck,
  ShieldPlus,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { WorkflowCategory, WorkflowModel } from "@/types/workflow";
import { WORKFLOW_DIFFICULTIES } from "@/types/workflow";

type WorkflowCardProps = {
  readonly workflow: WorkflowModel;
};

const categoryIcons: Record<WorkflowCategory, typeof ClipboardList> = {
  "공문 작성": FileText,
  건강검진: HeartPulse,
  감염병: ShieldPlus,
  보건교육: BookOpenText,
  교직원: ClipboardList,
  자동화: Sparkles,
  "콘텐츠 제작": MonitorCheck,
  "온라인 보건실": LayoutDashboard,
};

const formatDate = (date: string): string => date.replaceAll("-", ".");

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const Icon = categoryIcons[workflow.category];

  return (
    <article className="flex h-full flex-col rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-h-12 min-w-12 items-center justify-center rounded-lg bg-[var(--color-action-muted)] text-[var(--color-action-primary)]">
          <Icon aria-hidden="true" size={22} />
        </div>
        <span className="rounded-md bg-[var(--color-surface-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">
          {workflow.category}
        </span>
      </div>

      <div className="mt-4 grid gap-2">
        <h3 className="text-lg font-semibold leading-snug text-[var(--color-text-primary)]">
          {workflow.title}
        </h3>
        <p className="text-sm leading-6 text-[var(--color-text-secondary)]">{workflow.summary}</p>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 rounded-md bg-[var(--color-surface-muted)] p-3 text-xs text-[var(--color-text-secondary)]">
        <div>
          <dt className="font-semibold text-[var(--color-text-primary)]">난이도</dt>
          <dd className="mt-1">{WORKFLOW_DIFFICULTIES[workflow.difficulty]}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--color-text-primary)]">예상 시간</dt>
          <dd className="mt-1">{workflow.estimatedMinutes}분</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--color-text-primary)]">필요 자료</dt>
          <dd className="mt-1">자료 {workflow.resources.length}개</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--color-text-primary)]">업데이트</dt>
          <dd className="mt-1">{formatDate(workflow.updatedAt)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        {workflow.tools.slice(0, 4).map((tool) => (
          <span
            key={tool}
            className="rounded-md border border-[var(--color-border-subtle)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
          >
            {tool}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-5">
        <Link
          href={`/workflows/${workflow.slug}`}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[var(--color-action-primary)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        >
          Workflow 보기
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </article>
  );
}
