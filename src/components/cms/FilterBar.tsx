import type { CmsBook, CmsCategory, CmsResourceFilters, CmsSortOption } from "@/types/cms";

type FilterBarProps = {
  readonly books: readonly CmsBook[];
  readonly categories: readonly CmsCategory[];
  readonly types: readonly string[];
  readonly tags: readonly string[];
  readonly versions: readonly string[];
  readonly filters: CmsResourceFilters;
  readonly onChange: (filters: CmsResourceFilters) => void;
};

const sortLabels: Record<CmsSortOption, string> = {
  featured: "추천순",
  latest: "최신순",
  downloads: "다운로드순",
  name: "이름순",
};

export function FilterBar({
  books,
  categories,
  types,
  tags,
  versions,
  filters,
  onChange,
}: FilterBarProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
      <SelectFilter
        label="전자책"
        value={filters.bookId}
        options={[{ value: "all", label: "전체" }, ...books.map((book) => ({ value: book.id, label: book.title }))]}
        onChange={(bookId) => onChange({ ...filters, bookId })}
      />
      <SelectFilter
        label="카테고리"
        value={filters.category}
        options={[{ value: "all", label: "전체" }, ...categories.map(({ id, label }) => ({ value: id, label }))]}
        onChange={(category) => onChange({ ...filters, category })}
      />
      <SelectFilter
        label="파일 형식"
        value={filters.type}
        options={[{ value: "all", label: "전체" }, ...types.map((type) => ({ value: type, label: type }))]}
        onChange={(type) => onChange({ ...filters, type })}
      />
      <SelectFilter
        label="태그"
        value={filters.tag}
        options={[{ value: "all", label: "전체" }, ...tags.map((tag) => ({ value: tag, label: tag }))]}
        onChange={(tag) => onChange({ ...filters, tag })}
      />
      <SelectFilter
        label="정렬"
        value={filters.sort}
        options={Object.entries(sortLabels).map(([value, label]) => ({ value, label }))}
        onChange={(sort) => {
          if (isCmsSortOption(sort)) {
            onChange({ ...filters, sort });
          }
        }}
      />
      <SelectFilter
        label="버전"
        value={filters.version}
        options={[{ value: "all", label: "전체" }, ...versions.map((version) => ({ value: version, label: version }))]}
        onChange={(version) => onChange({ ...filters, version })}
      />
    </div>
  );
}

function isCmsSortOption(value: string): value is CmsSortOption {
  return value === "featured" || value === "latest" || value === "downloads" || value === "name";
}

type SelectFilterProps = {
  readonly label: string;
  readonly value: string;
  readonly options: readonly {
    readonly value: string;
    readonly label: string;
  }[];
  readonly onChange: (value: string) => void;
};

function SelectFilter({ label, value, options, onChange }: SelectFilterProps) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-text-tertiary)]">
      <span className="truncate">{label}</span>
      <select
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        className="min-h-12 min-w-0 rounded-2xl bg-[var(--color-surface-muted)] px-3 text-sm font-semibold text-[var(--color-brand-primary)] outline-none ring-1 ring-[var(--color-border-subtle)] transition focus:bg-white focus:ring-2 focus:ring-[var(--color-action-primary)]"
      >
        {options.map((option) => (
          <option key={`${label}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
