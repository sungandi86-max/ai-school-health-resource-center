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
type Workflow = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly jobContext: string;
  readonly steps: readonly string[];
  readonly requiredResourceSlugs: readonly string[];
  readonly outputExamples: readonly string[];
  readonly ebookChapters: readonly string[];
  readonly updatedAt: string;
};
```

## Project 데이터 모델

```ts
type Project = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly scenario: string;
  readonly resourceSlugs: readonly string[];
  readonly workflowSlugs: readonly string[];
  readonly sampleDataPolicy: "fictional-only";
  readonly updatedAt: string;
};
```

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
