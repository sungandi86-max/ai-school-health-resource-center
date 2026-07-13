import type { Difficulty, Resource, ResourceType, WorkCategory } from "@/types/resource";
import {
  DIFFICULTY_OPTIONS,
  RESOURCE_TYPE_OPTIONS,
  TOOL_OPTIONS,
  WORK_CATEGORIES,
  difficultyLabel,
  resourceTypeLabel,
} from "@/lib/resourceLabels";
import {
  countByCategory,
  countByDifficulty,
  countByTool,
  countByType,
  type ResourceFilterCriteria,
} from "@/lib/resourceFilters";

type ResourceFiltersProps = {
  readonly resources: readonly Resource[];
  readonly criteria: ResourceFilterCriteria;
  readonly onToggleCategory: (category: WorkCategory) => void;
  readonly onToggleType: (type: ResourceType) => void;
  readonly onToggleTool: (tool: string) => void;
  readonly onToggleDifficulty: (difficulty: Difficulty) => void;
  readonly onClearAll: () => void;
};

type FilterGroupProps<Value extends string> = {
  readonly title: string;
  readonly name: string;
  readonly options: readonly Value[];
  readonly selectedValues: readonly Value[];
  readonly getLabel: (value: Value) => string;
  readonly getCount: (value: Value) => number;
  readonly onToggle: (value: Value) => void;
};

function FilterGroup<Value extends string>({
  title,
  name,
  options,
  selectedValues,
  getLabel,
  getCount,
  onToggle,
}: FilterGroupProps<Value>) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</legend>
      <div className="grid gap-1">
        {options.map((option) => {
          const inputId = `${name}-${option}`;
          const checked = selectedValues.includes(option);

          return (
            <label
              key={option}
              htmlFor={inputId}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-muted)]"
            >
              <input
                id={inputId}
                type="checkbox"
                checked={checked}
                onChange={() => {
                  onToggle(option);
                }}
                className="h-4 w-4 rounded border-[var(--color-border-default)] accent-[var(--color-action-primary)]"
              />
              <span className="flex flex-1 items-center justify-between gap-3">
                <span className="font-medium">{getLabel(option)}</span>
                <span className="text-xs text-[var(--color-text-tertiary)]">{getCount(option)}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ResourceFilters({
  resources,
  criteria,
  onToggleCategory,
  onToggleType,
  onToggleTool,
  onToggleDifficulty,
  onClearAll,
}: ResourceFiltersProps) {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">필터</h2>
        <button
          type="button"
          className="min-h-10 rounded-md px-3 text-sm font-semibold text-[var(--color-action-primary)] hover:bg-[var(--color-action-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          onClick={onClearAll}
        >
          전체 초기화
        </button>
      </div>

      <FilterGroup
        title="업무 유형"
        name="category"
        options={WORK_CATEGORIES}
        selectedValues={criteria.categories}
        getLabel={(category) => category}
        getCount={(category) => countByCategory(resources, category)}
        onToggle={onToggleCategory}
      />

      <FilterGroup
        title="자료 유형"
        name="type"
        options={RESOURCE_TYPE_OPTIONS}
        selectedValues={criteria.types}
        getLabel={resourceTypeLabel}
        getCount={(type) => countByType(resources, type)}
        onToggle={onToggleType}
      />

      <FilterGroup
        title="사용 도구"
        name="tool"
        options={TOOL_OPTIONS}
        selectedValues={criteria.tools}
        getLabel={(tool) => tool}
        getCount={(tool) => countByTool(resources, tool)}
        onToggle={onToggleTool}
      />

      <FilterGroup
        title="난이도"
        name="difficulty"
        options={DIFFICULTY_OPTIONS}
        selectedValues={criteria.difficulties}
        getLabel={difficultyLabel}
        getCount={(difficulty) => countByDifficulty(resources, difficulty)}
        onToggle={onToggleDifficulty}
      />
    </div>
  );
}
