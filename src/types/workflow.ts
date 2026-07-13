export const WORKFLOW_CATEGORIES = [
  "공문 작성",
  "건강검진",
  "감염병",
  "보건교육",
  "교직원",
  "자동화",
  "콘텐츠 제작",
  "온라인 보건실",
] as const;

export const WORKFLOW_DIFFICULTIES = {
  ready: "바로 실행",
  guided: "단계별 따라 하기",
  automation: "자동화 포함",
} as const;

export type WorkflowCategory = (typeof WORKFLOW_CATEGORIES)[number];
export type WorkflowDifficulty = keyof typeof WORKFLOW_DIFFICULTIES;

export type WorkflowStep = {
  readonly title: string;
  readonly description: string;
  readonly minutes: number;
  readonly tools: readonly string[];
  readonly resourceIds: readonly string[];
};

export type WorkflowExample = {
  readonly schoolType: string;
  readonly scale: string;
  readonly context: string;
  readonly result: string;
};

export type WorkflowModel = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly difficulty: WorkflowDifficulty;
  readonly estimatedMinutes: number;
  readonly category: WorkflowCategory;
  readonly tools: readonly string[];
  readonly tags: readonly string[];
  readonly updatedAt: string;
  readonly problem: readonly string[];
  readonly steps: readonly WorkflowStep[];
  readonly resources: readonly string[];
  readonly outputs: readonly string[];
  readonly cautions: readonly string[];
  readonly relatedWorkflowIds: readonly string[];
  readonly example: WorkflowExample;
  readonly isPublished: boolean;
  readonly isFeatured: boolean;
};
