import { FileSearch } from "lucide-react";

type EmptyResourceStateProps = {
  readonly onClearAll: () => void;
};

export function EmptyResourceState({ onClearAll }: EmptyResourceStateProps) {
  return (
    <div className="grid min-h-72 place-items-center rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-8 text-center shadow-[var(--shadow-subtle)]">
      <div className="grid max-w-md justify-items-center gap-4">
        <span className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md bg-[var(--color-action-muted)] text-[var(--color-action-primary)]">
          <FileSearch aria-hidden="true" size={24} />
        </span>
        <div>
          <h2 className="text-xl font-semibold">조건에 맞는 자료가 없습니다</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            검색어를 줄이거나 선택한 필터를 초기화해보세요.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--color-action-primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          onClick={onClearAll}
        >
          검색 조건 초기화
        </button>
      </div>
    </div>
  );
}
