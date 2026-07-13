import type { Template, TemplateCategory, TemplateDifficulty, TemplateType } from "@/types/template";
import {
  TEMPLATE_CATEGORY_OPTIONS,
  TEMPLATE_DIFFICULTY_OPTIONS,
  TEMPLATE_TYPE_OPTIONS,
  templateDifficultyLabel,
  templateTypeLabel,
} from "@/lib/templateLabels";
import {
  countTemplatesByCategory,
  countTemplatesByDifficulty,
  countTemplatesByType,
  type TemplateFilterCriteria,
} from "@/lib/templates";

type TemplateFiltersProps = {
  readonly templates: readonly Template[];
  readonly criteria: TemplateFilterCriteria;
  readonly onToggleCategory: (category: TemplateCategory) => void;
  readonly onToggleType: (type: TemplateType) => void;
  readonly onToggleDifficulty: (difficulty: TemplateDifficulty) => void;
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
          const inputId = `template-${name}-${option}`;
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

export function TemplateFilters({
  templates,
  criteria,
  onToggleCategory,
  onToggleType,
  onToggleDifficulty,
  onClearAll,
}: TemplateFiltersProps) {
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
        title="업무"
        name="category"
        options={TEMPLATE_CATEGORY_OPTIONS}
        selectedValues={criteria.categories}
        getLabel={(category) => category}
        getCount={(category) => countTemplatesByCategory(templates, category)}
        onToggle={onToggleCategory}
      />
      <FilterGroup
        title="자료 종류"
        name="type"
        options={TEMPLATE_TYPE_OPTIONS}
        selectedValues={criteria.types}
        getLabel={templateTypeLabel}
        getCount={(type) => countTemplatesByType(templates, type)}
        onToggle={onToggleType}
      />
      <FilterGroup
        title="난이도"
        name="difficulty"
        options={TEMPLATE_DIFFICULTY_OPTIONS}
        selectedValues={criteria.difficulties}
        getLabel={templateDifficultyLabel}
        getCount={(difficulty) => countTemplatesByDifficulty(templates, difficulty)}
        onToggle={onToggleDifficulty}
      />
    </div>
  );
}
