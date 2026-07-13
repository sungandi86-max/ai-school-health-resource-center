import { Search, X } from "lucide-react";

type SearchBoxProps = {
  readonly value: string;
  readonly placeholder: string;
  readonly label: string;
  readonly onChange: (value: string) => void;
};

export function SearchBox({ value, placeholder, label, onChange }: SearchBoxProps) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[var(--color-action-primary)]"
      />
      <input
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        placeholder={placeholder}
        className="min-h-14 w-full rounded-2xl bg-[var(--color-surface-muted)] py-3 pl-12 pr-12 text-base outline-none ring-1 ring-[var(--color-border-subtle)] transition focus:bg-white focus:ring-2 focus:ring-[var(--color-action-primary)]"
      />
      {value.length > 0 ? (
        <button
          type="button"
          aria-label="검색어 지우기"
          onClick={() => {
            onChange("");
          }}
          className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      ) : null}
    </label>
  );
}
