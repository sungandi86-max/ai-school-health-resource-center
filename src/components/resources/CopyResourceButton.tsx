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

const copyWithTextarea = (text: string): boolean => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.inset = "0";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  try {
    return document.execCommand("copy");
  } catch (error) {
    if (error instanceof Error) {
      return false;
    }

    throw error;
  } finally {
    textarea.remove();
  }
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
    if (navigator.clipboard) {
      const isCopied = await navigator.clipboard.writeText(text).then(
        () => true,
        () => copyWithTextarea(text),
      );

      setStatus(isCopied ? "success" : "error");
      resetSoon();
      return;
    }

    const isCopied = copyWithTextarea(text);
    setStatus(isCopied ? "success" : "error");
    resetSoon();
  };

  return (
    <button
      type="button"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--color-brand-primary)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] disabled:bg-[var(--color-surface-blue)] disabled:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] ${className}`}
      onClick={copyText}
    >
      <Icon aria-hidden="true" size={17} />
      <span aria-live="polite">{buttonLabel(status, idleLabel)}</span>
    </button>
  );
}
