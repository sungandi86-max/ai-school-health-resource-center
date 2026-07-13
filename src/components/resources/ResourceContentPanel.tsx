import { CopyResourceButton } from "@/components/resources/CopyResourceButton";

type ResourceContentPanelProps = {
  readonly title: string;
  readonly content: string;
};

const variableSplitPattern = /(\{\{[^}\n]+\}\})/g;
const variableSegmentPattern = /^\{\{[^}\n]+\}\}$/;

const renderContent = (content: string) =>
  content.split(variableSplitPattern).map((segment, index) => {
    if (variableSegmentPattern.test(segment)) {
      return (
        <span
          key={`${segment}-${index}`}
          className="rounded-md bg-[var(--color-action-muted)] px-1.5 py-0.5 font-semibold text-[var(--color-action-primary)]"
        >
          {segment}
        </span>
      );
    }

    return <span key={`${segment}-${index}`}>{segment}</span>;
  });

export function ResourceContentPanel({ title, content }: ResourceContentPanelProps) {
  return (
    <section className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] shadow-[var(--shadow-subtle)]">
      <div className="flex flex-col gap-3 border-b border-[var(--color-border-subtle)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-xs font-semibold text-[var(--color-action-primary)]">자료 본문</p>
          <h2 className="mt-1 text-xl font-semibold">{title}</h2>
        </div>
        <CopyResourceButton text={content} className="w-full sm:w-auto" />
      </div>
      <div className="bg-[var(--color-surface-muted)] p-4 sm:p-6">
        <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-[var(--color-text-primary)] sm:text-base">
          {renderContent(content)}
        </pre>
      </div>
    </section>
  );
}
