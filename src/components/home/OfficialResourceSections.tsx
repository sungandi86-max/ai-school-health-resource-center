import { ArrowRight, BookOpen, FileText, FolderOpen, HelpCircle, Rocket, ScrollText, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { ProjectCard } from "@/components/cms/ProjectCard";
import { UpdateTimeline } from "@/components/cms/UpdateTimeline";
import { cmsBooks, cmsFaqs, cmsProjects, cmsResources, cmsUpdates } from "@/lib/cms";

const quickAccessItems = [
  {
    title: "전자책",
    description: `${cmsBooks.length}권의 전자책 자료 허브`,
    href: "/book/ai-work-automation",
    icon: BookOpen,
  },
  {
    title: "실전 프롬프트",
    description: `${cmsResources.filter((resource) => resource.category === "prompt").length}개의 프롬프트`,
    href: "#resources",
    icon: FileText,
  },
  {
    title: "업무 템플릿",
    description: `${cmsResources.filter((resource) => resource.category === "template").length}개의 템플릿`,
    href: "/templates",
    icon: FolderOpen,
  },
  {
    title: "예제 프로젝트",
    description: `${cmsProjects.length}개의 프로젝트 사례`,
    href: "/projects",
    icon: Rocket,
  },
];

export function OfficialResourceSections() {
  return (
    <>
      <section className="mt-10" aria-labelledby="quick-access-title">
        <SectionHeader
          id="quick-access-title"
          eyebrow="Quick Access"
          title="필요한 자료로 바로 이동하세요"
          description="전자책, 프롬프트, 템플릿, 프로젝트 자료가 같은 CMS 데이터 흐름으로 연결됩니다."
        />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccessItems.map((item) => (
            <QuickAccessCard key={item.href} item={item} />
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="project-showcase-title">
        <SectionHeader
          id="project-showcase-title"
          eyebrow="Projects"
          title="예제 프로젝트"
          description="JSON 프로젝트 데이터가 카드로 자동 렌더링됩니다."
          action={{ label: "전체 프로젝트 보기", href: "/projects" }}
        />
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cmsProjects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]" aria-label="업데이트와 FAQ">
        <div className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
          <PanelTitle icon={ScrollText} eyebrow="Release Notes" title="최신 업데이트" />
          <div className="mt-5">
            <UpdateTimeline updates={cmsUpdates} limit={2} />
          </div>
          <PanelLink href="/updates" label="모든 Release Notes 보기" />
        </div>

        <div className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
          <PanelTitle icon={HelpCircle} eyebrow="FAQ" title="자주 묻는 질문" />
          <div className="mt-5 grid gap-3">
            {cmsFaqs.slice(0, 3).map((item) => (
              <details key={item.id} className="group rounded-2xl bg-[var(--color-surface-muted)] p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[var(--color-brand-primary)]">
                  {item.question}
                  <Sparkles aria-hidden="true" className="size-4 text-[var(--color-action-primary)]" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{item.answer}</p>
              </details>
            ))}
          </div>
          <PanelLink href="/faq" label="FAQ 전체 보기" />
        </div>
      </section>
    </>
  );
}

type QuickAccessItem = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly icon: ComponentType<{ className?: string }>;
};

function QuickAccessCard({ item }: { readonly item: QuickAccessItem }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
    >
      <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-action-muted)] text-[var(--color-action-primary)]">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-[var(--color-brand-primary)]">{item.title}</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{item.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-action-primary)]">
        바로가기
        <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

type SectionHeaderProps = {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly action?: {
    readonly label: string;
    readonly href: string;
  };
};

function SectionHeader({ id, eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
      <div>
        <p className="text-sm font-semibold text-[var(--color-action-primary)]">{eyebrow}</p>
        <h2 id={id} className="mt-1 text-2xl font-semibold tracking-[-0.01em] text-[var(--color-brand-primary)]">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">{description}</p>
      </div>
      {action ? <PanelLink href={action.href} label={action.label} /> : null}
    </div>
  );
}

function PanelTitle({
  icon: Icon,
  eyebrow,
  title,
}: {
  readonly icon: ComponentType<{ className?: string }>;
  readonly eyebrow: string;
  readonly title: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon aria-hidden="true" className="mt-1 size-5 text-[var(--color-action-primary)]" />
      <div>
        <p className="text-sm font-semibold text-[var(--color-action-primary)]">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-semibold text-[var(--color-brand-primary)]">{title}</h2>
      </div>
    </div>
  );
}

function PanelLink({ href, label }: { readonly href: string; readonly label: string }) {
  return (
    <Link
      href={href}
      className="mt-5 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[var(--color-action-primary)] hover:text-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
    >
      {label}
      <ArrowRight aria-hidden="true" className="size-4" />
    </Link>
  );
}
