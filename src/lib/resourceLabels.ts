import { DIFFICULTIES, RESOURCE_TYPES } from "@/types/resource";
import type { Difficulty, ResourceType, WorkCategory } from "@/types/resource";

export const WORK_CATEGORIES: readonly WorkCategory[] = [
  "공문·안내문",
  "건강검진·별도검사",
  "교직원 건강관리",
  "보건교육",
  "자료 정리·자동화",
  "전자책·강의 제작",
  "시스템 구축",
] as const;

export const RESOURCE_TYPE_OPTIONS: readonly ResourceType[] = [
  "prompt",
  "instruction",
  "template",
  "code",
  "checklist",
  "practice",
  "workflow",
  "project",
  "guide",
] as const;

export const TOOL_OPTIONS = [
  "ChatGPT",
  "ChatGPT Work",
  "Claude Code",
  "Codex",
  "Google Sheets",
  "Apps Script",
  "GitHub",
  "Vercel",
  "이미지 생성 AI",
] as const;

export const DIFFICULTY_OPTIONS: readonly Difficulty[] = [
  "beginner",
  "intermediate",
  "guided",
  "advanced",
] as const;

export const SORT_OPTIONS = {
  featured: "추천순",
  latest: "최신순",
  title: "제목순",
} as const;

export type SortOption = keyof typeof SORT_OPTIONS;

export const SORT_OPTION_VALUES: readonly SortOption[] = ["featured", "latest", "title"] as const;

export const resourceTypeLabel = (type: ResourceType): string => RESOURCE_TYPES[type];

export const difficultyLabel = (difficulty: Difficulty): string => DIFFICULTIES[difficulty];

export const sortLabel = (sort: SortOption): string => SORT_OPTIONS[sort];

export const isResourceType = (value: string): value is ResourceType => value in RESOURCE_TYPES;

export const isDifficulty = (value: string): value is Difficulty => value in DIFFICULTIES;

export const isWorkCategory = (value: string): value is WorkCategory =>
  WORK_CATEGORIES.some((category) => category === value);

export const isSortOption = (value: string): value is SortOption => value in SORT_OPTIONS;
