import { X } from "lucide-react";
import type { Difficulty, ResourceType, WorkCategory } from "@/types/resource";
import { difficultyLabel, resourceTypeLabel } from "@/lib/resourceLabels";
import type { ResourceFilterCriteria } from "@/lib/resourceFilters";

type ActiveFilterChipsProps = {
  readonly criteria: ResourceFilterCriteria;
  readonly onRemoveQuery: () => void;
  readonly onRemoveCategory: (category: WorkCategory) => void;
  readonly onRemoveType: (type: ResourceType) => void;
  readonly onRemoveTool: (tool: string) => void;
  readonly onRemoveDifficulty: (difficulty: Difficulty) => void;
  readonly onClearAll: () => void;
};

type ChipProps = {
  readonly label: string;
  readonly removeLabel: string;
  readonly onRemove: () => void;
};

function Chip({ label, removeLabel, onRemove }: ChipProps) {
  return (
    <span className="inline-flex min-h-10 items-center gap-1 rounded-md bg-[var(--color-action-muted)] pl-3 pr-1 text-sm font-medium text-[var(--color-action-primary)]">
      {label}
      <button
        type="button"
        aria-label={removeLabel}
        className="inline-flex min-h-8 min-w-8 items-center justify-center rounded-md hover:bg-[var(--color-surface-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        onClick={onRemove}
      >
        <X aria-hidden="true" size={14} />
      </button>
    </span>
  );
}

export function ActiveFilterChips({
  criteria,
  onRemoveQuery,
  onRemoveCategory,
  onRemoveType,
  onRemoveTool,
  onRemoveDifficulty,
  onClearAll,
}: ActiveFilterChipsProps) {
  const hasQuery = criteria.query.trim().length > 0;
  const hasFilters =
    hasQuery ||
    criteria.categories.length > 0 ||
    criteria.types.length > 0 ||
    criteria.tools.length > 0 ||
    criteria.difficulties.length > 0;

  if (!hasFilters) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {hasQuery ? (
        <Chip label={`검색어: ${criteria.query}`} removeLabel="검색어 제거" onRemove={onRemoveQuery} />
      ) : null}
      {criteria.categories.map((category) => (
        <Chip
          key={category}
          label={category}
          removeLabel={`${category} 필터 제거`}
          onRemove={() => {
            onRemoveCategory(category);
          }}
        />
      ))}
      {criteria.types.map((type) => (
        <Chip
          key={type}
          label={resourceTypeLabel(type)}
          removeLabel={`${resourceTypeLabel(type)} 필터 제거`}
          onRemove={() => {
            onRemoveType(type);
          }}
        />
      ))}
      {criteria.tools.map((tool) => (
        <Chip
          key={tool}
          label={tool}
          removeLabel={`${tool} 필터 제거`}
          onRemove={() => {
            onRemoveTool(tool);
          }}
        />
      ))}
      {criteria.difficulties.map((difficulty) => (
        <Chip
          key={difficulty}
          label={difficultyLabel(difficulty)}
          removeLabel={`${difficultyLabel(difficulty)} 필터 제거`}
          onRemove={() => {
            onRemoveDifficulty(difficulty);
          }}
        />
      ))}
      <button
        type="button"
        className="min-h-10 rounded-md px-3 text-sm font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        onClick={onClearAll}
      >
        전체 초기화
      </button>
    </div>
  );
}
