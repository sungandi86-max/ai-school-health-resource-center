export function HomeIntro() {
  return (
    <section className="grid gap-3 pt-6 sm:pt-8 lg:pt-10" aria-labelledby="home-title">
      <p className="w-fit rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)] px-2.5 py-1.5 text-xs font-semibold text-[var(--color-action-primary)]">
        보건교사 전용 AI 실무 자료 플랫폼
      </p>
      <div className="grid gap-2.5">
        <h1
          id="home-title"
          className="max-w-2xl text-[1.875rem] font-semibold leading-[1.2] sm:text-[2.25rem] lg:text-[2.375rem]"
        >
          보건교사의 AI 업무, 여기서 시작하세요.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">
          프롬프트부터 템플릿, Workflow까지 현장에서 바로 활용할 수 있는 AI 실무 자료를
          제공합니다.
        </p>
      </div>
    </section>
  );
}
