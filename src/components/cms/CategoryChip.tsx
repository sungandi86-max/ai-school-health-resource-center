type CategoryChipProps = {
  readonly label: string;
  readonly isSelected: boolean;
  readonly onClick: () => void;
};

export function CategoryChip({ label, isSelected, onClick }: CategoryChipProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onClick}
      className={`min-h-10 rounded-full px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] ${
        isSelected
          ? "bg-[var(--color-brand-primary)] text-white"
          : "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] ring-1 ring-[var(--color-border-subtle)] hover:text-[var(--color-brand-primary)]"
      }`}
    >
      {label}
    </button>
  );
}
