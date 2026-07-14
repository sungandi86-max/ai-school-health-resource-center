import promptsJson from "@/data/prompts.json";

export const PROMPT_CATEGORIES = [
  "전체",
  "온라인 보건실",
  "School Health Hub",
  "업무 자동화",
  "AI 활용",
  "전자책 제작",
  "부록",
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
    case "온라인 보건실":
    case "School Health Hub":
    case "업무 자동화":
    case "AI 활용":
    case "전자책 제작":
    case "부록":
      return category;
    default:
      throw new InvalidPromptCategoryError(category);
  }
};

export const promptLibraryItems: readonly PromptLibraryItem[] = promptsJson.map((item) => ({
  ...item,
  category: parsePromptCategory(item.category),
}));
