"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigationItems = [
  { label: "자료 찾기", href: "/resources" },
  { label: "프롬프트", href: "/prompts" },
  { label: "템플릿", href: "/templates" },
  { label: "워크플로우", href: "/workflows" },
  { label: "프로젝트", href: "/projects" },
  { label: "업데이트", href: "/updates" },
] as const;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getCurrentState = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)]/95 backdrop-blur">
      <div className="mx-auto flex min-h-[64px] w-full max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link
          href="/"
          className="flex min-h-12 shrink-0 items-center whitespace-nowrap text-[15px] font-semibold text-[var(--color-text-primary)] outline-none transition-colors hover:text-[var(--color-action-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          onClick={closeMenu}
        >
          AI 보건교사 자료실
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="주요 메뉴">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={getCurrentState(item.href)}
              className="flex min-h-11 items-center whitespace-nowrap rounded-md px-2.5 text-[14px] font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] xl:px-3"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/#home-search"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] lg:min-w-0 lg:gap-2 lg:px-3"
            aria-label="홈 검색으로 이동"
            onClick={closeMenu}
          >
            <Search aria-hidden="true" size={18} />
            <span className="hidden text-sm font-medium lg:inline">검색</span>
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] lg:hidden"
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            onClick={() => {
              setIsMenuOpen((current) => !current);
            }}
          >
            {isMenuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          className="border-t border-[var(--color-border-subtle)] px-5 py-3 sm:px-8 lg:hidden"
          aria-label="모바일 메뉴"
        >
          <div className="mx-auto grid max-w-6xl gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={getCurrentState(item.href)}
                className="flex min-h-12 items-center rounded-md px-3 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
