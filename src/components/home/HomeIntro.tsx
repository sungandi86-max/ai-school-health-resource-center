export function HomeIntro() {
  return (
    <section className="grid gap-4 pt-8 sm:pt-10" aria-labelledby="home-title">
      <p className="w-fit rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)] px-3 py-2 text-sm font-medium text-[var(--color-action-primary)]">
        보건교사 전용 AI 실무 자료 플랫폼
      </p>
      <div className="grid gap-3">
        <h1 id="home-title" className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
          보건교사의 AI 업무, 여기서 시작하세요.
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg sm:leading-8">
          프롬프트부터 템플릿, Workflow까지 현장에서 바로 활용할 수 있는 AI 실무 자료를
          제공합니다.
        </p>
      </div>
    </section>
  );
}
