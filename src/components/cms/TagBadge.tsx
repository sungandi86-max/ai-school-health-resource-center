type TagBadgeProps = {
  readonly children: string;
  readonly tone?: "blue" | "green" | "gray";
};

const toneClassName: Record<NonNullable<TagBadgeProps["tone"]>, string> = {
  blue: "bg-[var(--color-action-muted)] text-[var(--color-action-primary)]",
  green: "bg-[var(--color-status-success-muted)] text-[var(--color-status-success)]",
  gray: "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]",
};

export function TagBadge({ children, tone = "gray" }: TagBadgeProps) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClassName[tone]}`}>
      {children}
    </span>
  );
}
