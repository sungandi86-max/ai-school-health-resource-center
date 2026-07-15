# AI Book Framework

실제 출간본을 분석해, 같은 제작 방식을 다시 적용할 수 있도록 문서화하는 출판 프레임워크입니다.

이 저장소의 기준 출간본은 『보건교사를 위한 AI 업무 자동화』입니다. 이 프로젝트의 목적은 새 책을 집필하거나 출간본의 내용을 고치는 것이 아니라, **이 책이 어떤 구조와 제작 방식으로 만들어졌는지 확인하고 기록하는 것**입니다.

> 현재 상태: AI Book Framework v1.0 작성 중  
> 기준 출간본: 『보건교사를 위한 AI 업무 자동화』 최종 조판본  
> 연계 자료실: [AI 보건교사 자료실](https://ai-school-health-resource-center.vercel.app/)

## 문서화 원칙

1. 최종 출간본에서 직접 확인되는 규칙만 기록합니다.
2. 제작 과정 자료는 최종 출간본의 구조를 설명하는 보조 근거로 사용합니다.
3. 확인되지 않은 의도나 규칙은 추측하지 않습니다.
4. 새로운 집필 규칙을 만들지 않습니다.
5. 출간본의 내용과 문체를 수정하지 않습니다.
6. 반복해서 확인되는 요소와 예외를 함께 기록합니다.
7. 분석 사실과 이후 책 제작을 위한 작업 지시를 구분합니다.

## 분석 대상

### 기준 자료

- 『보건교사를 위한 AI 업무 자동화』 최종 조판본
- 211쪽
- 8개 PART
- 22개 Chapter
- 에필로그 포함

### 보조 자료

- 「보건교사 프로젝트 북 설계」 PDF
- 이 GitHub 저장소의 자료실 구성
- 배포된 AI 보건교사 자료실
- 책과 자료실을 연결하는 QR 안내

보조 자료가 최종 출간본과 다를 때는 최종 출간본을 우선합니다.

## 출간본에서 확인되는 큰 구성

책은 문제 상황을 서술하는 데서 시작해, 업무를 분해하고 구조화한 뒤 Workflow와 AI 활용, 운영 단계로 이동합니다. 각 Chapter는 하나의 결과물을 만드는 프로젝트 단위로 구성되어 있으며, Chapter 사이의 결과물이 다음 작업으로 이어집니다.

각 Chapter에서 반복적으로 확인되는 요소는 다음과 같습니다.

- PART·Chapter 표지
- 프로젝트 진행 카드
- 현장 장면과 문제 인식
- 이번 Chapter의 작업
- 직접 작성하거나 확인하는 표·목록
- 실습 결과
- 자료실 QR 안내
- 수행 확인
- 오늘 바뀐 것
- 다음 Chapter Preview
- PART 마지막 정리

세부 구성과 예외는 이후 문서에서 각각 근거와 함께 정리합니다.

## 문서 구성

아래 문서는 순서대로 작성합니다. 앞 문서에서 확인한 기준을 뒤 문서가 이어받습니다.

| 순서 | 문서 | 기록 대상 | 상태 |
|---:|---|---|---|
| 1 | [README.md](README.md) | 프로젝트 목적, 근거, 범위, 문서 지도 | 작성 완료 |
| 2 | [BOOK_STYLE.md](BOOK_STYLE.md) | 책 전체의 편집·시각 스타일 | 작성 예정 |
| 3 | [WRITING_STYLE.md](WRITING_STYLE.md) | 문장, 어조, 서술 방식 | 작성 예정 |
| 4 | [BOOK_STRUCTURE.md](BOOK_STRUCTURE.md) | PART와 Chapter의 전체 구조 | 작성 예정 |
| 5 | [PART_TEMPLATE.md](PART_TEMPLATE.md) | PART 반복 구조 | 작성 예정 |
| 6 | [CHAPTER_TEMPLATE.md](CHAPTER_TEMPLATE.md) | Chapter 반복 구조 | 작성 예정 |
| 7 | [PROJECTBOOK_RULES.md](PROJECTBOOK_RULES.md) | 프로젝트북으로 작동하는 규칙 | 작성 예정 |
| 8 | [CASE_GUIDE.md](CASE_GUIDE.md) | 사례 제시 방식 | 작성 예정 |
| 9 | [WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md) | Workflow 설명 방식 | 작성 예정 |
| 10 | [RESOURCE_POLICY.md](RESOURCE_POLICY.md) | 실습·다운로드 자료 운영 방식 | 작성 예정 |
| 11 | [QR_POLICY.md](QR_POLICY.md) | QR 배치와 안내 방식 | 작성 예정 |
| 12 | [BOOK_ASSETS.md](BOOK_ASSETS.md) | 표, 카드, 이미지, QR 등 자산 목록 | 작성 예정 |
| 13 | [PDF_LAYOUT_GUIDE.md](PDF_LAYOUT_GUIDE.md) | 최종 PDF 조판 규칙 | 작성 예정 |
| 14 | [QA_CHECKLIST.md](QA_CHECKLIST.md) | 내용·구조·조판 검수 항목 | 작성 예정 |
| 15 | [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md) | 출간 직전 확인 항목 | 작성 예정 |
| 16 | [PROMPT_TEMPLATE.md](PROMPT_TEMPLATE.md) | 제작 단계별 프롬프트 형식 | 작성 예정 |
| 17 | [CHATGPT_GUIDE.md](CHATGPT_GUIDE.md) | ChatGPT를 사용한 제작 방식 | 작성 예정 |
| 18 | [CODEX_GUIDE.md](CODEX_GUIDE.md) | Codex를 사용한 제작 방식 | 작성 예정 |
| 19 | [WORK_GUIDE.md](WORK_GUIDE.md) | 전체 작업 운영 방식 | 작성 예정 |
| 20 | [REVIEW_PROMPTS.md](REVIEW_PROMPTS.md) | 검토 단계에서 사용하는 프롬프트 | 작성 예정 |

## 근거 기록 방법

각 문서는 다음 세 범주를 구분해 작성합니다.

- **확인된 규칙**: 출간본에서 반복되거나 명시적으로 확인되는 요소
- **확인된 예외**: 일부 PART 또는 Chapter에서만 다르게 나타나는 요소
- **확인 범위**: 해당 규칙을 확인한 페이지·구성 요소·보조 자료

근거가 부족한 항목은 규칙으로 확정하지 않고 미확인 상태로 남깁니다.

## 작업 순서

```text
최종 출간본 확인
→ 반복 요소와 예외 기록
→ 문서 초안 작성
→ 출간본과 다시 대조
→ 추측·신규 규칙 제거
→ 문서 간 용어와 참조 확인
→ 전체 QA
→ AI Book Framework v1.0 확정
```

## 완료 기준

AI Book Framework v1.0은 다음 조건을 모두 충족할 때 완료됩니다.

- 위 20개 문서가 모두 작성되어 있음
- 모든 규칙이 출간본 또는 명시된 보조 자료로 확인됨
- 문서 사이의 용어와 구조가 서로 일치함
- 출간본 분석과 새로운 제안이 섞여 있지 않음
- 책, QR, 연계 자료실의 관계가 실제 동작과 일치함
- QA 및 RELEASE 체크리스트 검토가 완료됨

## 연계 프로젝트

현재 저장소는 출간본의 QR과 연결되는 [AI 보건교사 자료실](https://ai-school-health-resource-center.vercel.app/)도 함께 운영합니다. 자료실은 책 밖에서 프롬프트, 실습 자료, 프로젝트 파일을 제공하는 연계 자산입니다. 구체적인 연결 규칙은 `RESOURCE_POLICY.md`와 `QR_POLICY.md`에서 출간본을 근거로 별도 문서화합니다.
