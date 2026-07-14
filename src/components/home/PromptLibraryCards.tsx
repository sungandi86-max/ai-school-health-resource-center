import { BookOpen, ChevronDown } from "lucide-react";
import { CopyResourceButton } from "@/components/resources/CopyResourceButton";
import type { PromptLibraryItem } from "@/data/promptLibrary";

export type PromptChapterGroup = {
  readonly chapter: string;
  readonly title: string;
  readonly items: readonly PromptLibraryItem[];
};

type ChapterAccordionProps = {
  readonly buttonId: string;
  readonly group: PromptChapterGroup;
  readonly isExpanded: boolean;
  readonly onToggle: () => void;
  readonly panelId: string;
};

export function ChapterAccordion({ buttonId, group, isExpanded, onToggle, panelId }: ChapterAccordionProps) {
  return (
    <section className="rounded-[20px] border border-[var(--color-border-subtle)] bg-white shadow-[var(--shadow-card)]" aria-labelledby={buttonId}>
      <button
        id={buttonId}
        type="button"
        aria-controls={panelId}
        aria-expanded={isExpanded}
        onClick={onToggle}
        className="flex min-h-[52px] w-full items-center gap-3 rounded-[20px] px-4 py-3 text-left transition-colors hover:bg-[var(--color-action-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] sm:px-5"
      >
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border-default)] bg-[var(--color-action-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--color-brand-primary)]">
          <BookOpen aria-hidden="true" size={14} />
          {group.chapter}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold leading-5 text-[var(--color-brand-primary)] sm:text-base">{group.title}</span>
          <span className="mt-0.5 block text-xs font-medium text-[var(--color-text-secondary)]">프롬프트 {group.items.length}개</span>
        </span>
        <ChevronDown aria-hidden="true" className={`size-5 shrink-0 text-[var(--color-brand-primary)] transition-transform duration-150 ease-out ${isExpanded ? "rotate-180" : ""}`} />
      </button>

      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isExpanded}>
        {isExpanded && (
          <div className="overflow-hidden">
            <div className="grid gap-4 px-4 pb-4 pt-1 md:grid-cols-2 sm:px-5 sm:pb-5">
              {group.items.map((item) => (
                <PromptCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PromptCard({ item }: { readonly item: PromptLibraryItem }) {
  const preview = item.content.replace(/\s+/g, " ").trim().slice(0, 180);

  return (
    <article className="flex flex-col rounded-[20px] border border-[var(--color-border-subtle)] bg-white p-4 shadow-[var(--shadow-card)] transition hover:border-[var(--color-brand-secondary)] hover:shadow-[var(--shadow-card-hover)] sm:p-5">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-[var(--color-border-default)] bg-[var(--color-action-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--color-brand-primary)]">
          {item.chapter}
        </span>
        <span className="rounded-full border border-[var(--color-border-default)] bg-[var(--color-action-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--color-brand-primary)]">
          {item.tool}
        </span>
      </div>
      <h4 className="mt-3 text-lg font-semibold leading-snug text-[var(--color-brand-primary)]">{item.title}</h4>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{item.description}</p>

      <div className="mt-3 rounded-2xl bg-[var(--color-surface-muted)] p-3">
        <p className="text-xs font-semibold text-[var(--color-text-tertiary)]">프롬프트 미리보기</p>
        <p className="mt-1.5 line-clamp-4 overflow-hidden text-sm leading-5 text-[var(--color-text-secondary)]">{preview}...</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-[var(--color-action-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--color-brand-primary)]">#{item.category}</span>
      </div>

      <div className="pt-4">
        <CopyResourceButton text={item.content} idleLabel="프롬프트 복사" className="w-full" />
      </div>
    </article>
  );
}
