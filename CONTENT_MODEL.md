# AI 보건교사 자료실 Content Model

## Resource 데이터 모델

```ts
type Resource = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly resourceType: "prompt" | "template" | "code" | "checklist" | "guide";
  readonly category: string;
  readonly tools: readonly string[];
  readonly level: "beginner" | "intermediate" | "advanced";
  readonly tags: readonly string[];
  readonly ebookChapters: readonly string[];
  readonly relatedWorkflowSlugs: readonly string[];
  readonly relatedProjectSlugs: readonly string[];
  readonly updatedAt: string;
  readonly version: string;
  readonly privacyNote: string;
};
```

## Workflow 데이터 모델

```ts
type WorkflowStep = {
  readonly title: string;
  readonly description: string;
  readonly minutes: number;
  readonly tools: readonly string[];
  readonly resourceIds: readonly string[];
};

type WorkflowExample = {
  readonly schoolType: string;
  readonly scale: string;
  readonly context: string;
  readonly result: string;
};

type WorkflowModel = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly difficulty: "ready" | "guided" | "automation";
  readonly estimatedMinutes: number;
  readonly category:
    | "공문 작성"
    | "건강검진"
    | "감염병"
    | "보건교육"
    | "교직원"
    | "자동화"
    | "콘텐츠 제작"
    | "온라인 보건실";
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
```

## Project 데이터 모델

```ts
type ProjectStatus =
  | "operating"
  | "mvp"
  | "developing"
  | "case-study"
  | "planned";

type ProjectType =
  | "work-system"
  | "automation-tool"
  | "resource-platform"
  | "content-production"
  | "education"
  | "integrated-hub";

type ProjectTool = {
  readonly name: string;
  readonly purpose: string;
};

type ProjectFeature = {
  readonly title: string;
  readonly description: string;
  readonly icon?: string;
};

type ProjectOutcome = {
  readonly type: "observed" | "expected" | "next";
  readonly title: string;
  readonly description: string;
};

type ProjectExample = {
  readonly environment: readonly string[];
  readonly situation: string;
  readonly application: string;
  readonly result: string;
};

type ProjectRevision = {
  readonly version: string;
  readonly date: string;
  readonly description: string;
};

type Project = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly overview: string;
  readonly projectType: ProjectType;
  readonly status: ProjectStatus;
  readonly categories: readonly string[];
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
  readonly architectureSteps: readonly {
    readonly title: string;
    readonly description: string;
  }[];
  readonly workflowIds: readonly string[];
  readonly resourceIds: readonly string[];
  readonly privacyPrinciples: readonly string[];
  readonly outcomes: readonly ProjectOutcome[];
  readonly recommendedFor: readonly string[];
  readonly example?: ProjectExample;
  readonly relatedProjectIds?: readonly string[];
  readonly revisions?: readonly ProjectRevision[];
  readonly externalUrl?: string;
  readonly isPublished: boolean;
  readonly isFeatured: boolean;
};
```

초기 버전에서는 `workflowIds`와 `resourceIds`로 로컬 공개 데이터만 연결합니다. 존재하지 않거나 비공개인 Workflow와 Resource는 화면에 표시하지 않습니다. 모든 적용 사례와 수치는 가상 또는 일반화된 정보만 사용합니다.

## Update Log 데이터 모델

```ts
type UpdateLog = {
  readonly slug: string;
  readonly title: string;
  readonly updateType: "added" | "changed" | "fixed" | "deprecated";
  readonly summary: string;
  readonly relatedSlugs: readonly string[];
  readonly publishedAt: string;
};
```

## Template 데이터 모델

```ts
type Template = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly templateType:
    | "googleSheets"
    | "googleDocs"
    | "pdf"
    | "markdown"
    | "zip"
    | "checklist";
  readonly category: "건강검진" | "감염병" | "보건교육" | "교직원" | "공문" | "자동화" | "전자책";
  readonly tools: readonly string[];
  readonly tags: readonly string[];
  readonly difficulty: "ready" | "editable" | "automation";
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
```

초기 버전에서는 로컬 샘플 데이터와 placeholder URL을 사용합니다. 다음 단계에서 Google Drive, Google Docs, Google Sheets 복사 URL과 실제 다운로드 파일을 연결할 수 있도록 `downloadUrl`과 `copyUrl`을 분리합니다.

## Markdown 또는 MDX frontmatter 예시

```yaml
---
slug: "fictional-health-letter-prompt"
title: "가상 보건 안내문 초안 프롬프트"
summary: "개인정보 없이 보건 안내문 초안을 만드는 프롬프트입니다."
resourceType: "prompt"
category: "보건 안내문"
tools:
  - "ChatGPT"
level: "beginner"
tags:
  - "안내문"
  - "초안"
ebookChapters:
  - "chapter-02"
relatedWorkflowSlugs:
  - "notice-draft-workflow"
relatedProjectSlugs:
  - "fictional-notice-project"
updatedAt: "2026-07-13"
version: "0.1.0"
privacyNote: "실제 학생, 보호자, 교직원의 개인정보를 입력하지 않습니다."
---
```

## 자료 간 연결 방식

- Resource는 관련 Workflow와 Project의 slug를 가집니다.
- Workflow는 필요한 Resource 목록을 순서대로 연결합니다.
- Project는 업무 사례 안에서 사용한 Resource와 Workflow를 연결합니다.
- Update Log는 변경된 Resource, Workflow, Project slug를 연결합니다.

## 전자책 장과 자료 연결 방식

- 모든 Resource와 Workflow는 `ebookChapters` 배열을 가집니다.
- 전자책 장 URL은 `/ebook/[chapter]` 형식을 사용합니다.
- 장별 페이지는 해당 장과 연결된 Resource, Workflow, Project를 모아 보여줍니다.
- 전자책에는 QR 또는 짧은 URL을 제공하고, 사이트에서는 최신 버전 자료를 유지합니다.

## 샘플 데이터 원칙

- 모든 예시는 가상 학교, 가상 업무 상황, 익명화된 범주형 데이터로 작성합니다.
- 실제 학생 이름, 학번, 반 번호, 연락처, 건강 정보, 상담 기록을 사용하지 않습니다.
- 보건 관련 민감 사례는 개인이 식별되지 않는 일반 상황으로 재작성합니다.
