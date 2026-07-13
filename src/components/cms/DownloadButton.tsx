"use client";

import { CircleAlert, CheckCircle2, Download, LoaderCircle } from "lucide-react";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { isDownloadableStatus } from "@/lib/cms";
import { recordRecentDownload } from "@/lib/downloads";
import type { CmsResourceStatus, CmsResourceVersion } from "@/types/cms";

type DownloadState = "idle" | "preparing" | "complete" | "error";

type DownloadButtonProps = {
  readonly resourceId: string;
  readonly resourceTitle: string;
  readonly download: CmsResourceVersion;
  readonly label?: string;
  readonly className?: string;
};

export function DownloadButton({
  resourceId,
  resourceTitle,
  download,
  label = "다운로드",
  className = "",
}: DownloadButtonProps) {
  const [state, setState] = useState<DownloadState>("idle");
  const resetTimer = useRef<number | null>(null);
  const isAvailable = isDownloadableStatus(download.status) && Boolean(download.fileName && download.filePath);
  const buttonLabel = getButtonLabel(state, download.status, label);
  const ariaLabel = `${resourceTitle} ${download.version} 다운로드`;

  useEffect(
    () => () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isAvailable || state === "preparing") {
      event.preventDefault();
      return;
    }

    try {
      setState("preparing");
      recordRecentDownload(resourceId);
      scheduleCompletion(setState, resetTimer);
    } catch (error) {
      event.preventDefault();

      if (error instanceof DOMException) {
        setState("error");
        scheduleReset(setState, resetTimer, 3000);
        return;
      }

      throw error;
    }
  };

  if (!isAvailable) {
    return (
      <div className="grid gap-1">
        <button
          type="button"
          disabled
          aria-label={ariaLabel}
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-surface-muted)] px-4 text-sm font-semibold text-[var(--color-text-tertiary)] ${className}`}
        >
          {download.status === "coming-soon" ? "준비 중" : "다운로드 불가"}
        </button>
        <span className="text-center text-xs text-[var(--color-text-tertiary)]">
          {getStatusHint(download.status)}
        </span>
      </div>
    );
  }

  return (
    <div className="grid gap-1">
      <a
        href={download.filePath}
        download={download.fileName}
        aria-label={ariaLabel}
        aria-busy={state === "preparing"}
        onClick={handleClick}
        className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-status-success)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--color-status-success-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-status-success)] ${className}`}
      >
        <DownloadStateIcon state={state} />
        {state === "idle" ? (
          <>
            <span className="group-hover:hidden group-focus-visible:hidden">{label}</span>
            <span className="hidden group-hover:inline group-focus-visible:inline">
              {download.fileType} · {download.fileSize || "크기 미정"}
            </span>
          </>
        ) : (
          <span>{buttonLabel}</span>
        )}
      </a>
      <span role="status" aria-live="polite" className="min-h-4 text-center text-xs text-[var(--color-text-secondary)]">
        {state === "error" ? "파일을 다운로드할 수 없습니다. 잠시 후 다시 시도해주세요." : null}
        {state === "complete" ? "다운로드를 시작했습니다." : null}
      </span>
    </div>
  );
}

function getButtonLabel(state: DownloadState, status: CmsResourceStatus, label: string): string {
  if (state === "preparing") {
    return "다운로드 준비 중...";
  }

  if (state === "complete") {
    return "다운로드 완료";
  }

  if (state === "error") {
    return "다운로드 실패";
  }

  return status === "archived" ? "이전 버전 다운로드" : label;
}

function getStatusHint(status: CmsResourceStatus): string {
  return status === "coming-soon" ? "파일을 준비하고 있습니다." : "현재 다운로드할 수 없는 자료입니다.";
}

function scheduleReset(
  setState: (state: DownloadState) => void,
  resetTimer: { current: number | null },
  delay: number,
) {
  if (resetTimer.current !== null) {
    window.clearTimeout(resetTimer.current);
  }

  resetTimer.current = window.setTimeout(() => {
    setState("idle");
    resetTimer.current = null;
  }, delay);
}

function scheduleCompletion(
  setState: (state: DownloadState) => void,
  resetTimer: { current: number | null },
) {
  if (resetTimer.current !== null) {
    window.clearTimeout(resetTimer.current);
  }

  resetTimer.current = window.setTimeout(() => {
    setState("complete");
    resetTimer.current = window.setTimeout(() => {
      setState("idle");
      resetTimer.current = null;
    }, 1800);
  }, 120);
}

function DownloadStateIcon({ state }: { readonly state: DownloadState }) {
  switch (state) {
    case "idle":
      return <Download aria-hidden="true" className="size-4" />;
    case "preparing":
      return <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />;
    case "complete":
      return <CheckCircle2 aria-hidden="true" className="size-4" />;
    case "error":
      return <CircleAlert aria-hidden="true" className="size-4" />;
    default:
      return assertNever(state);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unexpected download state: ${String(value)}`);
}
