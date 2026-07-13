import type { Difficulty, Resource, ResourceType, WorkCategory } from "@/types/resource";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import type { ResourceFilterCriteria } from "@/lib/resourceFilters";

type MobileFilterPanelProps = {
  readonly resources: readonly Resource[];
  readonly criteria: ResourceFilterCriteria;
  readonly onToggleCategory: (category: WorkCategory) => void;
  readonly onToggleType: (type: ResourceType) => void;
  readonly onToggleTool: (tool: string) => void;
  readonly onToggleDifficulty: (difficulty: Difficulty) => void;
  readonly onClearAll: () => void;
  readonly onClose: () => void;
};

export function MobileFilterPanel({
  resources,
  criteria,
  onToggleCategory,
  onToggleType,
  onToggleTool,
  onToggleDifficulty,
  onClearAll,
  onClose,
}: MobileFilterPanelProps) {
  return (
    <section
      id="mobile-resource-filters"
      className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] lg:hidden"
      aria-label="모바일 필터"
    >
      <ResourceFilters
        resources={resources}
        criteria={criteria}
        onToggleCategory={onToggleCategory}
        onToggleType={onToggleType}
        onToggleTool={onToggleTool}
        onToggleDifficulty={onToggleDifficulty}
        onClearAll={onClearAll}
      />
      <div className="mt-6 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="min-h-12 rounded-md border border-[var(--color-border-default)] px-4 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          onClick={onClearAll}
        >
          전체 초기화
        </button>
        <button
          type="button"
          className="min-h-12 rounded-md bg-[var(--color-action-primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          onClick={onClose}
        >
          적용
        </button>
        <button
          type="button"
          aria-label="모바일 필터 닫기"
          className="col-span-2 min-h-12 rounded-md px-4 text-sm font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </section>
  );
}
