export const TEMPLATE_TYPES = {
  googleSheets: "Google Sheets",
  googleDocs: "Google Docs",
  pdf: "PDF",
  markdown: "Markdown",
  zip: "ZIP",
  checklist: "체크리스트",
} as const;

export const TEMPLATE_CATEGORIES = [
  "건강검진",
  "감염병",
  "보건교육",
  "교직원",
  "공문",
  "자동화",
  "전자책",
] as const;

export const TEMPLATE_DIFFICULTIES = {
  ready: "바로 사용",
  editable: "수정 후 사용",
  automation: "자동화",
} as const;

export type TemplateType = keyof typeof TEMPLATE_TYPES;
export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number];
export type TemplateDifficulty = keyof typeof TEMPLATE_DIFFICULTIES;

export type Template = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly templateType: TemplateType;
  readonly category: TemplateCategory;
  readonly tools: readonly string[];
  readonly tags: readonly string[];
  readonly difficulty: TemplateDifficulty;
  readonly version: string;
  readonly updatedAt: string;
  readonly fileSize: string;
  readonly downloadCount: number;
  readonly coverImage?: string;
  readonly description: string;
  readonly includedFiles: readonly string[];
  readonly usage: readonly string[];
  readonly cautions: readonly string[];
  readonly downloadUrl?: string;
  readonly copyUrl?: string;
  readonly isPublished: boolean;
  readonly isFeatured: boolean;
};
