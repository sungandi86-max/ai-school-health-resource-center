import { cmsResources } from "@/lib/cms";
import { publishedResources } from "@/lib/resources";
import type { Resource } from "@/types/resource";
import type { CmsResourceVersion } from "@/types/cms";

export const PROMPT_CATEGORIES = [
  "전체",
  "ChatGPT",
  "Codex",
  "Claude Code",
  "Gemini",
  "업무 자동화",
  "글쓰기",
  "프로젝트 개발",
] as const;

export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];

export type PromptDownload = CmsResourceVersion;

export type PromptLibraryItem = Resource & {
  readonly categories: readonly PromptCategory[];
  readonly download?: PromptDownload;
};

const cmsResourceIdByLegacyResourceId: Readonly<Record<string, string>> = {
  "res-002": "res-family-letter-prompt",
};

const getDownload = (resourceId: string): PromptDownload | undefined => {
  const cmsResourceId = cmsResourceIdByLegacyResourceId[resourceId];
  const cmsResource = cmsResourceId
    ? cmsResources.find((resource) => resource.id === cmsResourceId)
    : undefined;

  if (!cmsResource || !["MD", "TXT"].includes(cmsResource.fileType) || !cmsResource.filePath) {
    return undefined;
  }

  return cmsResource;
};

const hasText = (resource: Resource, values: readonly string[]): boolean => {
  const text = [resource.title, resource.summary, ...resource.tags].join(" ").toLocaleLowerCase("ko-KR");
  return values.some((value) => text.includes(value.toLocaleLowerCase("ko-KR")));
};

const getCategories = (resource: Resource): readonly PromptCategory[] => {
  const categories: PromptCategory[] = [];

  if (resource.tools.some((tool) => tool === "ChatGPT" || tool === "ChatGPT Work")) {
    categories.push("ChatGPT");
  }
  if (resource.tools.includes("Codex")) {
    categories.push("Codex");
  }
  if (resource.tools.includes("Claude Code")) {
    categories.push("Claude Code");
  }
  if (resource.workCategories.includes("자료 정리·자동화") || hasText(resource, ["자동화"])) {
    categories.push("업무 자동화");
  }
  if (hasText(resource, ["안내문", "가정통신문", "원고", "글쓰기"])) {
    categories.push("글쓰기");
  }
  if (resource.tools.some((tool) => tool === "Codex" || tool === "Claude Code") || hasText(resource, ["프로젝트"])) {
    categories.push("프로젝트 개발");
  }

  return categories;
};

export const promptLibraryItems: readonly PromptLibraryItem[] = publishedResources
  .filter(
    (resource) =>
      (resource.resourceType === "prompt" || resource.resourceType === "instruction") &&
      resource.content,
  )
  .map((resource) => {
    const download = getDownload(resource.id);

    return {
      ...resource,
      categories: getCategories(resource),
      ...(download ? { download } : {}),
    };
  });
