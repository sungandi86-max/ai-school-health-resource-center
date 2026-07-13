import {
  TEMPLATE_CATEGORIES,
  TEMPLATE_DIFFICULTIES,
  TEMPLATE_TYPES,
  type TemplateCategory,
  type TemplateDifficulty,
  type TemplateType,
} from "@/types/template";

export const TEMPLATE_CATEGORY_OPTIONS: readonly TemplateCategory[] = TEMPLATE_CATEGORIES;

export const TEMPLATE_TYPE_OPTIONS: readonly TemplateType[] = [
  "googleSheets",
  "googleDocs",
  "pdf",
  "markdown",
  "zip",
  "checklist",
] as const;

export const TEMPLATE_DIFFICULTY_OPTIONS: readonly TemplateDifficulty[] = [
  "ready",
  "editable",
  "automation",
] as const;

export const templateTypeLabel = (type: TemplateType): string => TEMPLATE_TYPES[type];

export const templateDifficultyLabel = (difficulty: TemplateDifficulty): string =>
  TEMPLATE_DIFFICULTIES[difficulty];

export type TemplateActionIconKind = "copy" | "download" | "view";

export type TemplateActionMeta = {
  readonly cardLabel: string;
  readonly detailLabel: string;
  readonly icon: TemplateActionIconKind;
};

const TEMPLATE_ACTION_META: Record<TemplateType, TemplateActionMeta> = {
  googleSheets: {
    cardLabel: "복사하기",
    detailLabel: "Google Sheets 복사",
    icon: "copy",
  },
  googleDocs: {
    cardLabel: "복사하기",
    detailLabel: "Google Docs 복사",
    icon: "copy",
  },
  pdf: {
    cardLabel: "다운로드",
    detailLabel: "다운로드",
    icon: "download",
  },
  markdown: {
    cardLabel: "다운로드",
    detailLabel: "다운로드",
    icon: "download",
  },
  zip: {
    cardLabel: "다운로드",
    detailLabel: "전체 다운로드",
    icon: "download",
  },
  checklist: {
    cardLabel: "보기",
    detailLabel: "보기",
    icon: "view",
  },
} as const;

export const templateActionMeta = (type: TemplateType): TemplateActionMeta =>
  TEMPLATE_ACTION_META[type];

export const templateActionLabel = (type: TemplateType): string =>
  templateActionMeta(type).cardLabel;

export const templatePrimaryActionLabel = (type: TemplateType): string =>
  templateActionMeta(type).detailLabel;

export const isTemplateCategory = (value: string): value is TemplateCategory =>
  TEMPLATE_CATEGORY_OPTIONS.some((category) => category === value);

export const isTemplateType = (value: string): value is TemplateType => value in TEMPLATE_TYPES;

export const isTemplateDifficulty = (value: string): value is TemplateDifficulty =>
  value in TEMPLATE_DIFFICULTIES;
