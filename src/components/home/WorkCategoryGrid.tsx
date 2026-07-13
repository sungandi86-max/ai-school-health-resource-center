import {
  Activity,
  BookOpenCheck,
  ClipboardList,
  FileText,
  HeartPulse,
  NotebookTabs,
} from "lucide-react";
import Link from "next/link";
import { countResourcesByCategory } from "@/lib/resources";
import type { WorkCategory } from "@/types/resource";

const workCategories: readonly {
  readonly title: WorkCategory;
  readonly description: string;
  readonly icon: typeof FileText;
}[] = [
  {
    title: "공문·안내문",
    description: "안내문 초안과 반복 공지 흐름을 빠르게 정리합니다.",
    icon: FileText,
  },
  {
    title: "건강검진·별도검사",
    description: "검진 일정과 준비 항목을 구조화합니다.",
    icon: ClipboardList,
  },
  {
    title: "교직원 건강관리",
    description: "교직원 대상 안내와 확인 업무를 지원합니다.",
    icon: HeartPulse,
  },
  {
    title: "보건교육",
    description: "수업 자료와 온라인 보건실 준비를 돕습니다.",
    icon: BookOpenCheck,
  },
  {
    title: "자료 정리·자동화",
    description: "반복 자료 정리와 업무 자동화 설계를 시작합니다.",
    icon: Activity,
  },
  {
    title: "전자책·강의 제작",
    description: "원고, 실습 자료, 제작 Workflow를 연결합니다.",
    icon: NotebookTabs,
  },
];

export function WorkCategoryGrid() {
  return (
    <section className="grid gap-4" aria-labelledby="work-category-title">
      <div>
        <h2 id="work-category-title" className="text-2xl font-semibold">
          업무별 바로가기
        </h2>
        <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
          자주 찾는 보건 업무에서 필요한 자료로 바로 이동합니다.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {workCategories.map((category) => {
          const Icon = category.icon;
          const count = countResourcesByCategory(category.title);

          return (
            <Link
              key={category.title}
              href={`/resources?category=${encodeURIComponent(category.title)}`}
              className="group grid min-h-36 gap-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] transition-colors hover:border-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md bg-[var(--color-action-muted)] text-[var(--color-action-primary)]">
                  <Icon aria-hidden="true" size={22} />
                </span>
                <span className="rounded-md bg-[var(--color-surface-muted)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
                  자료 {count}개
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
                  {category.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
