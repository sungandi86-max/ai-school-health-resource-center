import { publishedResources } from "@/lib/resources";
import type { Resource } from "@/types/resource";

export const PROMPT_CATEGORIES = [
  "전체",
  "ChatGPT",
  "Claude Code",
  "업무 자동화",
  "글쓰기",
  "프로젝트 개발",
] as const;

export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];

export type PromptLibraryItem = Resource & {
  readonly categories: readonly PromptCategory[];
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
  if (resource.tools.includes("Claude Code")) {
    categories.push("Claude Code");
  }
  if (resource.workCategories.includes("자료 정리·자동화") || hasText(resource, ["자동화"])) {
    categories.push("업무 자동화");
  }
  if (hasText(resource, ["안내문", "가정통신문", "원고", "글쓰기"])) {
    categories.push("글쓰기");
  }
  if (resource.tools.includes("Claude Code") || hasText(resource, ["프로젝트"])) {
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
    return {
      ...resource,
      categories: getCategories(resource),
    };
  });
