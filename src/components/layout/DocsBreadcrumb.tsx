import Link from "next/link";

type BreadcrumbItem = {
  readonly label: string;
  readonly href?: string;
};

type DocsBreadcrumbProps = {
  readonly items: readonly BreadcrumbItem[];
};

export function DocsBreadcrumb({ items }: DocsBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-secondary)]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className="font-medium hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-[var(--color-text-primary)]">{item.label}</span>
            )}
            {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
