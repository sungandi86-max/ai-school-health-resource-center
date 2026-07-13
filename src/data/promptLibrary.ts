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
  readonly title: string;
  readonly description: string;
  readonly tool: string;
  readonly category: PromptDataCategory;
  readonly content: string;
};

export const promptLibraryItems: readonly PromptLibraryItem[] = [];
