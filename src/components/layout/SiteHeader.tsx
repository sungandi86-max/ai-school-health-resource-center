import { Search } from "lucide-react";
import Link from "next/link";

const navigationItems = [{ label: "부록 자료", href: "/#prompts" }] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)]/95 backdrop-blur">
      <div className="mx-auto flex min-h-[64px] w-full max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="grid min-h-12 shrink-0 content-center whitespace-nowrap text-sm font-semibold leading-tight text-[var(--color-brand-primary)] outline-none transition-colors hover:text-[var(--color-action-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] sm:text-base"
        >
          <span>전자책 부록</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="주요 메뉴">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center whitespace-nowrap rounded-xl px-3 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#prompts"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            aria-label="부록 자료 검색으로 이동"
          >
            <Search aria-hidden="true" size={18} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
