export const RESOURCE_TYPES = {
  prompt: "프롬프트",
  instruction: "작업 지시서",
  template: "템플릿",
  code: "코드",
  checklist: "체크리스트",
  practice: "실습 자료",
  guide: "가이드",
  workflow: "Workflow",
  project: "프로젝트 사례",
} as const;

export const DIFFICULTIES = {
  beginner: "바로 사용",
  intermediate: "일부 수정 필요",
  guided: "단계별 따라 하기",
  advanced: "개발 경험 필요",
} as const;

export type ResourceType = keyof typeof RESOURCE_TYPES;

export type Difficulty = keyof typeof DIFFICULTIES;

export type WorkCategory =
  | "공문·안내문"
  | "건강검진·별도검사"
  | "교직원 건강관리"
  | "보건교육"
  | "자료 정리·자동화"
  | "전자책·강의 제작"
  | "시스템 구축";

export type RelatedBook = {
  readonly bookId: string;
  readonly chapterId?: string;
  readonly chapterTitle?: string;
};

export type ResourceVariable = {
  readonly key: string;
  readonly label: string;
  readonly description?: string;
  readonly example?: string;
  readonly required: boolean;
};

export type ResourceRevision = {
  readonly version: string;
  readonly date: string;
  readonly description: string;
};

export type ResourceDetailContent = {
  readonly content?: string;
  readonly useCases?: readonly string[];
  readonly preparationItems?: readonly string[];
  readonly variables?: readonly ResourceVariable[];
  readonly usageSteps?: readonly string[];
  readonly exampleOutput?: string;
  readonly cautions?: readonly string[];
  readonly relatedResourceIds?: readonly string[];
  readonly revisions?: readonly ResourceRevision[];
  readonly estimatedMinutes?: number;
};

export type Resource = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly resourceType: ResourceType;
  readonly workCategories: readonly WorkCategory[];
  readonly tools: readonly string[];
  readonly tags: readonly string[];
  readonly difficulty: Difficulty;
  readonly version: string;
  readonly updatedAt: string;
  readonly isFeatured: boolean;
  readonly isPublished: boolean;
  readonly relatedBook?: RelatedBook;
} & ResourceDetailContent;

export type UpdateType = "added" | "changed" | "improved";

export type UpdateItem = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly updateType: UpdateType;
  readonly publishedAt: string;
};
