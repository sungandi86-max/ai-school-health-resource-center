import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)]">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-8 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="font-semibold text-[var(--color-text-primary)]">AI 보건교사 자료실</p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            보건교사를 위한 AI 실무 자료 플랫폼
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">운영자: 쑤캥</p>
        </div>
        <nav className="flex flex-wrap gap-2 sm:justify-end" aria-label="Footer 메뉴">
          {[
            { label: "개인정보 보호 원칙", href: "/guide" },
            { label: "이용 안내", href: "/guide" },
            { label: "업데이트", href: "/updates" },
          ].map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="flex min-h-12 items-center rounded-md px-3 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
