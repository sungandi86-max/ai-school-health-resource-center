"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useId, useState } from "react";

type ResourceExampleOutputProps = {
  readonly output: string;
};

export function ResourceExampleOutput({ output }: ResourceExampleOutputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const Icon = isOpen ? ChevronUp : ChevronDown;

  return (
    <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 shadow-[var(--shadow-subtle)] sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">결과 예시</h2>
          <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
            실제 개인정보가 없는 가상 결과 예시입니다.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--color-border-default)] px-4 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-action-primary)] hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => {
            setIsOpen((current) => !current);
          }}
        >
          {isOpen ? "다시 접기" : "결과 예시 보기"}
          <Icon aria-hidden="true" size={16} />
        </button>
      </div>

      {isOpen ? (
        <div
          id={panelId}
          className="mt-4 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-4"
        >
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">가상 결과물</h3>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[var(--color-text-secondary)]">
            {output}
          </p>
        </div>
      ) : null}
    </section>
  );
}
