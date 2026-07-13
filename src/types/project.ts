export const PROJECT_TYPES = {
  "work-system": "업무 시스템",
  "automation-tool": "자동화 도구",
  "resource-platform": "자료 플랫폼",
  "content-production": "콘텐츠 제작",
  education: "교육·강의",
  "integrated-hub": "통합 허브",
} as const;

export const PROJECT_STATUSES = {
  operating: "운영 중",
  mvp: "MVP 완료",
  developing: "개발 중",
  "case-study": "사례 공개",
  planned: "확장 예정",
} as const;

export const PROJECT_TYPE_OPTIONS = [
  "work-system",
  "automation-tool",
  "resource-platform",
  "content-production",
  "education",
  "integrated-hub",
] as const;

export const PROJECT_STATUS_OPTIONS = [
  "operating",
  "mvp",
  "developing",
  "case-study",
  "planned",
] as const;

export const PROJECT_CATEGORIES = [
  "건강검진·별도검사",
  "감염병 관리",
  "교직원 건강관리",
  "보건교육",
  "공문·자료 정리",
  "전자책·콘텐츠",
  "학교 업무 시스템",
] as const;

export const PROJECT_TOOLS = [
  "ChatGPT",
  "ChatGPT Work",
  "Claude Code",
  "Codex",
  "Google Sheets",
  "Apps Script",
  "Next.js",
  "GitHub",
  "Vercel",
  "Supabase",
] as const;

export type ProjectType = (typeof PROJECT_TYPE_OPTIONS)[number];
export type ProjectStatus = (typeof PROJECT_STATUS_OPTIONS)[number];
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectToolName = (typeof PROJECT_TOOLS)[number];

export type ProjectTool = {
  readonly name: ProjectToolName;
  readonly purpose: string;
};

export type ProjectFeatureIcon =
  | "layout-dashboard"
  | "clipboard-list"
  | "file-text"
  | "chart"
  | "book"
  | "workflow"
  | "shield"
  | "sparkles";

export type ProjectFeature = {
  readonly title: string;
  readonly description: string;
  readonly icon: ProjectFeatureIcon;
};

export type ProjectArchitectureStep = {
  readonly title: string;
  readonly description: string;
};

export type ProjectPreview = {
  readonly title: string;
  readonly description?: string;
  readonly imageUrl?: string;
  readonly alt?: string;
};

export type ProjectOutcome = {
  readonly type: "observed" | "expected" | "next";
  readonly title: string;
  readonly description: string;
};

export type ProjectExample = {
  readonly environment: readonly string[];
  readonly situation: string;
  readonly application: string;
  readonly result: string;
};

export type ProjectRevision = {
  readonly version: string;
  readonly date: string;
  readonly description: string;
};

export type Project = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly overview: string;
  readonly projectType: ProjectType;
  readonly status: ProjectStatus;
  readonly categories: readonly ProjectCategory[];
  readonly tags: readonly string[];
  readonly targetUsers: readonly string[];
  readonly tools: readonly ProjectTool[];
  readonly version: string;
  readonly publishedAt?: string;
  readonly updatedAt: string;
  readonly problems: readonly string[];
  readonly goals: readonly string[];
  readonly beforeItems: readonly string[];
  readonly afterItems: readonly string[];
  readonly features: readonly ProjectFeature[];
  readonly architectureSteps: readonly ProjectArchitectureStep[];
  readonly workflowIds: readonly string[];
  readonly resourceIds: readonly string[];
  readonly privacyPrinciples: readonly string[];
  readonly outcomes: readonly ProjectOutcome[];
  readonly recommendedFor: readonly string[];
  readonly previews?: readonly ProjectPreview[];
  readonly example?: ProjectExample;
  readonly relatedProjectIds?: readonly string[];
  readonly revisions?: readonly ProjectRevision[];
  readonly externalUrl?: string;
  readonly isPublished: boolean;
  readonly isFeatured: boolean;
};
