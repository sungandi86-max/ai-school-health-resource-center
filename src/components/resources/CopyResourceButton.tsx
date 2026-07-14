"use client";

import { AlertCircle, Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CopyStatus = "idle" | "success" | "error";

type CopyResourceButtonProps = {
  readonly text: string;
  readonly idleLabel?: string;
  readonly className?: string;
};

const buttonLabel = (status: CopyStatus, idleLabel: string): string => {
  if (status === "success") {
    return "복사되었습니다";
  }

  if (status === "error") {
    return "복사하지 못했습니다";
  }

  return idleLabel;
};

export function CopyResourceButton({ text, idleLabel = "전체 복사", className = "" }: CopyResourceButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const Icon = status === "success" ? Check : status === "error" ? AlertCircle : Copy;

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const resetSoon = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setStatus("idle");
    }, 2000);
  };

  const copyText = async () => {
    if (!navigator.clipboard) {
      setStatus("error");
      resetSoon();
      return;
    }

    const isCopied = await navigator.clipboard.writeText(text).then(
      () => true,
      () => false,
    );

    setStatus(isCopied ? "success" : "error");
    resetSoon();
  };

  return (
    <button
      type="button"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--color-status-success)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-status-success-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-status-success)] ${className}`}
      onClick={copyText}
    >
      <Icon aria-hidden="true" size={17} />
      <span aria-live="polite">{buttonLabel(status, idleLabel)}</span>
    </button>
  );
}
