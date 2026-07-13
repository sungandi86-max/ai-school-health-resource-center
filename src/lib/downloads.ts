import type { RecentDownload } from "@/types/cms";

export const recentDownloadsChangedEvent = "recent-downloads-changed";
export const recentDownloadsStorageKey = "ai-school-health-resource-center:recent-downloads";

const maxRecentDownloads = 5;

export const getRecentDownloadsSnapshot = (): string => {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    return window.localStorage.getItem(recentDownloadsStorageKey) ?? "";
  } catch (error) {
    if (error instanceof DOMException) {
      return "";
    }

    throw error;
  }
};

export const parseRecentDownloads = (storedValue: string): readonly RecentDownload[] => {
  if (storedValue.length === 0) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isRecentDownload).slice(0, maxRecentDownloads);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return [];
    }

    throw error;
  }
};

export const recordRecentDownload = (resourceId: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  const nextDownloads = [
    { resourceId, downloadedAt: new Date().toISOString() },
    ...parseRecentDownloads(getRecentDownloadsSnapshot()).filter(
      (download) => download.resourceId !== resourceId,
    ),
  ].slice(0, maxRecentDownloads);

  try {
    window.localStorage.setItem(recentDownloadsStorageKey, JSON.stringify(nextDownloads));
    window.dispatchEvent(new Event(recentDownloadsChangedEvent));
  } catch (error) {
    if (error instanceof DOMException) {
      return;
    }

    throw error;
  }
};

export const subscribeToRecentDownloads = (onStoreChange: () => void): (() => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(recentDownloadsChangedEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(recentDownloadsChangedEvent, onStoreChange);
  };
};

function isRecentDownload(value: unknown): value is RecentDownload {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    typeof Reflect.get(value, "resourceId") === "string" &&
    typeof Reflect.get(value, "downloadedAt") === "string"
  );
}
