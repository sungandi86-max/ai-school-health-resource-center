import {
  PROJECT_CATEGORIES,
  PROJECT_STATUS_OPTIONS,
  PROJECT_TOOLS,
  PROJECT_TYPE_OPTIONS,
  type ProjectCategory,
  type ProjectStatus,
  type ProjectToolName,
  type ProjectType,
} from "@/types/project";
import { projectStatusLabel, projectTypeLabel } from "@/lib/projectLabels";
import {
  countProjectsByCategory,
  countProjectsByStatus,
  countProjectsByTool,
  countProjectsByType,
  type ProjectFilterCriteria,
} from "@/lib/projects";
import type { Project } from "@/types/project";

type ProjectFiltersProps = {
  readonly idPrefix: string;
  readonly projects: readonly Project[];
  readonly criteria: ProjectFilterCriteria;
  readonly onToggleType: (type: ProjectType) => void;
  readonly onToggleCategory: (category: ProjectCategory) => void;
  readonly onToggleTool: (tool: ProjectToolName) => void;
  readonly onToggleStatus: (status: ProjectStatus) => void;
  readonly onClearAll: () => void;
};

type FilterGroupProps<Value extends string> = {
  readonly idPrefix: string;
  readonly title: string;
  readonly name: string;
  readonly options: readonly Value[];
  readonly selectedValues: readonly Value[];
  readonly getLabel: (value: Value) => string;
  readonly getCount: (value: Value) => number;
  readonly onToggle: (value: Value) => void;
};

function FilterGroup<Value extends string>({
  idPrefix,
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
          const inputId = `project-${idPrefix}-${name}-${option}`;
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

export function ProjectFilters({
  idPrefix,
  projects,
  criteria,
  onToggleType,
  onToggleCategory,
  onToggleTool,
  onToggleStatus,
  onClearAll,
}: ProjectFiltersProps) {
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
        idPrefix={idPrefix}
        title="프로젝트 유형"
        name="type"
        options={PROJECT_TYPE_OPTIONS}
        selectedValues={criteria.types}
        getLabel={projectTypeLabel}
        getCount={(type) => countProjectsByType(projects, type)}
        onToggle={onToggleType}
      />
      <FilterGroup
        idPrefix={idPrefix}
        title="업무 분야"
        name="category"
        options={PROJECT_CATEGORIES}
        selectedValues={criteria.categories}
        getLabel={(category) => category}
        getCount={(category) => countProjectsByCategory(projects, category)}
        onToggle={onToggleCategory}
      />
      <FilterGroup
        idPrefix={idPrefix}
        title="사용 도구"
        name="tool"
        options={PROJECT_TOOLS}
        selectedValues={criteria.tools}
        getLabel={(tool) => tool}
        getCount={(tool) => countProjectsByTool(projects, tool)}
        onToggle={onToggleTool}
      />
      <FilterGroup
        idPrefix={idPrefix}
        title="프로젝트 상태"
        name="status"
        options={PROJECT_STATUS_OPTIONS}
        selectedValues={criteria.statuses}
        getLabel={projectStatusLabel}
        getCount={(status) => countProjectsByStatus(projects, status)}
        onToggle={onToggleStatus}
      />
    </div>
  );
}
