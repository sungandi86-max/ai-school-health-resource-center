import promptsJson from "@/data/prompts.json";

export const PROMPT_CATEGORIES = [
  "전체",
  "ChatGPT",
  "Claude Code",
  "업무 자동화",
  "글쓰기",
  "프로젝트 개발",
] as const;

export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];
export type PromptDataCategory = Exclude<PromptCategory, "전체">;

export type PromptLibraryItem = {
  readonly id: string;
  readonly chapter: string;
  readonly title: string;
  readonly description: string;
  readonly tool: string;
  readonly category: PromptDataCategory;
  readonly content: string;
};

class InvalidPromptCategoryError extends Error {
  constructor(category: string) {
    super(`Unknown prompt category: ${category}`);
    this.name = "InvalidPromptCategoryError";
  }
}

const parsePromptCategory = (category: string): PromptDataCategory => {
  switch (category) {
    case "ChatGPT":
    case "Claude Code":
    case "업무 자동화":
    case "글쓰기":
    case "프로젝트 개발":
      return category;
    default:
      throw new InvalidPromptCategoryError(category);
  }
};

export const promptLibraryItems: readonly PromptLibraryItem[] = promptsJson.map((item) => ({
  ...item,
  category: parsePromptCategory(item.category),
}));
