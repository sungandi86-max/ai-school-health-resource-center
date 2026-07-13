import type { ResourceVariable } from "@/types/resource";

type ResourceVariableListProps = {
  readonly variables: readonly ResourceVariable[];
};

export function ResourceVariableList({ variables }: ResourceVariableListProps) {
  if (variables.length === 0) {
    return null;
  }

  return (
    <section className="grid gap-4" aria-labelledby="resource-variables-title">
      <div>
        <h2 id="resource-variables-title" className="text-xl font-semibold">
          바꿔서 입력할 부분
        </h2>
        <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
          다음 변수는 학교 상황에 맞게 직접 수정한 뒤 사용합니다.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {variables.map((variable) => (
          <article
            key={variable.key}
            className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[var(--color-action-muted)] px-2 py-1 text-sm font-semibold text-[var(--color-action-primary)]">
                {variable.key}
              </span>
              <span className="rounded-md bg-[var(--color-surface-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">
                {variable.required ? "필수" : "선택"}
              </span>
            </div>
            <h3 className="mt-3 text-base font-semibold">{variable.label}</h3>
            {variable.description ? (
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                {variable.description}
              </p>
            ) : null}
            {variable.example ? (
              <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                예시: <span className="font-medium text-[var(--color-text-primary)]">{variable.example}</span>
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
