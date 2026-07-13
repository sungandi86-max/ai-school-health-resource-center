import Link from "next/link";
import type { Resource } from "@/types/resource";
import type { WorkflowStep } from "@/types/workflow";

type WorkflowTimelineProps = {
  readonly steps: readonly WorkflowStep[];
  readonly resources: readonly Resource[];
};

const getStepResources = (
  step: WorkflowStep,
  resources: readonly Resource[],
): readonly Resource[] =>
  step.resourceIds
    .map((resourceId) => resources.find((resource) => resource.id === resourceId))
    .filter((resource): resource is Resource => resource !== undefined);

export function WorkflowTimeline({ steps, resources }: WorkflowTimelineProps) {
  return (
    <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">전체 Workflow</h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            준비부터 완료까지 {steps.length}단계로 확인합니다.
          </p>
        </div>
        <span className="w-fit rounded-md bg-[var(--color-action-muted)] px-3 py-2 text-xs font-semibold text-[var(--color-action-primary)]">
          {steps.length}단계
        </span>
      </div>

      <ol className="mt-6 grid gap-4">
        {steps.map((step, index) => {
          const stepResources = getStepResources(step, resources);

          return (
            <li key={`${step.title}-${index}`} className="relative grid gap-3 pl-10">
              <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-action-primary)] text-sm font-semibold text-white">
                {index + 1}
              </span>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[13px] top-8 h-[calc(100%+8px)] w-px bg-[var(--color-border-default)]"
                />
              ) : null}
              <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                      {step.description}
                    </p>
                  </div>
                  <span className="w-fit shrink-0 rounded-md bg-[var(--color-surface-primary)] px-2 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">
                    {step.minutes}분
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {step.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                {stepResources.length > 0 ? (
                  <div className="mt-4 grid gap-2">
                    <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                      연결 Resource
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {stepResources.map((resource) => (
                        <Link
                          key={resource.id}
                          href={`/resources/${resource.slug}`}
                          className="rounded-md bg-[var(--color-action-muted)] px-2 py-1 text-xs font-semibold text-[var(--color-action-primary)] hover:text-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                        >
                          {resource.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
