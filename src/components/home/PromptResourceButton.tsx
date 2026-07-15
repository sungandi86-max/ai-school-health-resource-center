"use client";

import { Download, FileText, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { CopyResourceButton } from "@/components/resources/CopyResourceButton";
import type { BookResource } from "@/data/bookResources";

type PromptResourceButtonProps = {
  readonly resource: BookResource;
};

export function PromptResourceButton({ resource }: PromptResourceButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const openPrompt = async () => {
    setIsOpen(true);

    if (content || isLoading) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(resource.downloadPath);

      if (!response.ok) {
        throw new Error(`프롬프트 파일을 불러오지 못했습니다. (${response.status})`);
      }

      setContent(await response.text());
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openPrompt}
        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-[var(--color-border-default)] px-3 text-left text-sm transition hover:border-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        aria-label={`${resource.title} 프롬프트 보기`}
      >
        <span className="flex min-w-0 items-center gap-2 font-semibold text-[var(--color-brand-primary)]">
          <FileText aria-hidden="true" className="size-4 shrink-0 text-[var(--color-action-primary)]" />
          <span className="truncate">{resource.title}</span>
        </span>
        <span className="shrink-0 rounded-full bg-[var(--color-action-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--color-brand-primary)]">
          프롬프트 보기
        </span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[rgba(24,59,102,0.28)] p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="grid max-h-[88dvh] w-full max-w-3xl grid-rows-[auto_1fr_auto] overflow-hidden rounded-[20px] bg-white shadow-[var(--shadow-card)]"
          >
            <header className="flex items-start justify-between gap-4 border-b border-[var(--color-border-subtle)] p-5">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--color-action-primary)]">
                  Chapter {String(resource.chapter).padStart(2, "0")} · Markdown
                </p>
                <h2 id={titleId} className="mt-1 text-xl font-semibold text-[var(--color-brand-primary)]">
                  {resource.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-action-muted)] text-[var(--color-brand-primary)] transition hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                aria-label="프롬프트 창 닫기"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </header>

            <div className="overflow-auto bg-[var(--color-surface-subtle)] p-5">
              {isLoading ? (
                <p className="text-sm text-[var(--color-text-secondary)]">프롬프트를 불러오는 중입니다.</p>
              ) : null}
              {errorMessage ? (
                <p className="rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-[var(--color-status-error)] shadow-[var(--shadow-ring)]">
                  {errorMessage}
                </p>
              ) : null}
              {content ? (
                <pre className="whitespace-pre-wrap break-words rounded-2xl bg-white p-4 font-mono text-sm leading-7 text-[var(--color-text-primary)] shadow-[var(--shadow-ring)]">
                  {content}
                </pre>
              ) : null}
            </div>

            <footer className="grid gap-2 border-t border-[var(--color-border-subtle)] p-4 sm:flex sm:justify-end">
              <a
                href={resource.downloadPath}
                download={resource.fileName}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--color-action-muted)] px-4 text-sm font-semibold text-[var(--color-brand-primary)] transition hover:text-[var(--color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
                aria-label={`${resource.title} Markdown 파일 다운로드`}
              >
                <Download aria-hidden="true" className="size-4" />
                .md 다운로드
              </a>
              {content ? (
                <CopyResourceButton
                  text={content}
                  idleLabel="프롬프트 복사"
                  className="w-full sm:w-auto"
                />
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--color-surface-blue)] px-4 text-sm font-semibold text-[var(--color-text-tertiary)]"
                >
                  프롬프트 복사
                </button>
              )}
            </footer>
          </section>
        </div>
      ) : null}
    </>
  );
}
