export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)]">
      <div className="mx-auto grid w-full max-w-5xl gap-2 px-5 py-8 sm:px-8">
        <div>
          <p className="font-semibold text-[var(--color-brand-primary)]">
            전자책 공식 부록 자료실
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            이 자료실은 『보건교사를 위한 AI 업무 자동화』 전자책의 공식 부록입니다.
            <br />
            새로운 프롬프트와 자료는 이 페이지를 통해 계속 업데이트됩니다.
          </p>
          <p className="mt-2 text-xs text-[var(--color-text-tertiary)]">
            Copyright © 2026 쑤캥. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
