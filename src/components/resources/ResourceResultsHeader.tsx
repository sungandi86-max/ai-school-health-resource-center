import {
  SORT_OPTION_VALUES,
  isSortOption,
  sortLabel,
  type SortOption,
} from "@/lib/resourceLabels";

type ResourceResultsHeaderProps = {
  readonly totalCount: number;
  readonly resultCount: number;
  readonly hasActiveConditions: boolean;
  readonly sort: SortOption;
  readonly onSortChange: (sort: SortOption) => void;
};

export function ResourceResultsHeader({
  totalCount,
  resultCount,
  hasActiveConditions,
  sort,
  onSortChange,
}: ResourceResultsHeaderProps) {
  const summary = hasActiveConditions
    ? `${totalCount}개 중 ${resultCount}개의 자료`
    : `총 ${totalCount}개의 자료`;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)] p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-semibold text-[var(--color-text-primary)]" aria-live="polite">
        {summary}
      </p>
      <label className="flex min-h-11 items-center gap-2 text-sm text-[var(--color-text-secondary)]">
        정렬
        <select
          value={sort}
          onChange={(event) => {
            const nextSort = event.target.value;

            if (isSortOption(nextSort)) {
              onSortChange(nextSort);
            }
          }}
          className="min-h-11 rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] px-3 text-sm font-semibold text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        >
          {SORT_OPTION_VALUES.map((option) => (
            <option key={option} value={option}>
              {sortLabel(option)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
