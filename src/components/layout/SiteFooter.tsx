export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)]">
      <div className="mx-auto grid w-full max-w-5xl gap-2 px-5 py-8 sm:px-8">
        <div>
          <p className="font-semibold text-[var(--color-brand-primary)]">
            AI School Health Resource Center
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            『보건교사를 위한 AI 업무 자동화』 실전 프롬프트 자료실
          </p>
          <p className="mt-2 text-xs text-[var(--color-text-tertiary)]">
            Copyright © 2026 쑤캥. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
