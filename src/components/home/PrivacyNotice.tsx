import { ShieldCheck } from "lucide-react";

export function PrivacyNotice() {
  return (
    <section
      className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)]"
      aria-labelledby="privacy-notice-title"
    >
      <div className="flex gap-3">
        <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--color-status-success-muted)] text-[var(--color-status-success)]">
          <ShieldCheck aria-hidden="true" size={18} />
        </span>
        <div>
          <h2 id="privacy-notice-title" className="text-base font-semibold">
            개인정보 보호 안내
          </h2>
          <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
            제공되는 프롬프트와 예시 자료에는 실제 학생 및 교직원의 개인정보를 입력하지
            마세요. AI가 생성한 결과는 학교 규정과 최신 지침에 따라 반드시 검토한 후
            사용하세요.
          </p>
        </div>
      </div>
    </section>
  );
}
