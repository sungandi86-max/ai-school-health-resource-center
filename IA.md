# AI 보건교사 자료실 정보구조

## 전체 정보구조

```text
/
├─ /#parts
│  └─ PART 1~8 / Chapter 01~22 자료실
├─ /resources
│  ├─ /resources/[slug]
│  └─ /resources?category=&tool=&level=&ebookChapter=
├─ /prompts
│  └─ /prompts/[slug]
├─ /templates
│  └─ /templates/[slug]
├─ /workflows
│  └─ /workflows/[slug]
├─ /projects
│  └─ /projects/[slug]
├─ /ebook
│  └─ /ebook/[chapter]
├─ /updates
│  └─ /updates/[slug]
└─ /guide
```

## 메뉴별 목적

- 홈: 『보건교사를 위한 AI 업무 자동화』의 PART 1~8 흐름을 그대로 따라가는 전자책 부록 자료실입니다.
- 자료 찾기: 모든 자료를 업무, 도구, 난이도, 형식 기준으로 검색합니다.
- Prompt Library: 복사해서 사용할 수 있는 보건 업무 프롬프트를 모읍니다.
- Templates: 문서, 스프레드시트, 체크리스트 템플릿을 제공합니다.
- Workflows: 프롬프트와 템플릿이 연결되는 업무 흐름을 설명합니다.
- Projects: 실제 업무 시나리오를 가상 데이터로 재구성하고 관련 Workflow와 Resource를 연결한 프로젝트 사례를 제공합니다.
- 전자책 연계 자료: 전자책 장과 온라인 자료를 연결합니다.
- Updates: 자료 추가, 수정, 버전 변경 내역을 기록합니다.
- 이용 안내: 자료 사용법, 개인정보 보호, 책임 범위를 안내합니다.

## 페이지 URL 구조

- `/`: 최소 홈 또는 주요 탐색 시작점
- `/resources`: 통합 자료 찾기
- `/resources/[slug]`: 자료 상세
- `/prompts`: 프롬프트 목록
- `/templates`: 템플릿 목록
- `/workflows`: Workflow 목록
- `/projects`: 프로젝트 사례 목록
- `/ebook`: 전자책 장별 자료
- `/updates`: 업데이트 로그
- `/guide`: 이용 안내

## 주요 사용자 흐름

```text
QR 또는 짧은 URL로 자료실 방문
→ 책에서 읽고 있는 PART 확인
→ 같은 PART의 Chapter 선택
→ Chapter별 프롬프트 / 실습자료 / 프로젝트 파일 확인
→ 실습자료 다운로드
→ 작성한 프로젝트 파일을 다음 PART에서 이어 사용
```

## QR 연동 원칙

- QR은 개별 파일이 아니라 자료실 첫 화면으로 연결합니다.
- 독자는 자료실에서 해당 PART를 선택한 뒤 Chapter별 자료를 내려받습니다.
- 출간본 설명문은 다음 문구를 기준으로 통일합니다.

```text
QR을 스캔하면 『보건교사를 위한 AI 업무 자동화』 자료실이 열립니다.
해당 PART의 실습 자료를 내려받아 작성하세요.
이 프로젝트 파일은 다음 PART에서도 계속 이어서 사용합니다.
```

## 모바일 내비게이션 구조

- 하단 또는 상단의 간결한 주요 메뉴를 우선합니다.
- 1차 진입은 홈, 자료 찾기, Templates, Workflows, Projects, Updates를 우선합니다.
- 보조 메뉴(Prompt Library, 전자책 연계 자료, 이용 안내)는 자료 찾기 안에서 연결하거나 메뉴 확장으로 노출합니다.
- 검색창은 자료 목록 화면의 첫 화면 안에 배치합니다.

## PC 내비게이션 구조

- 상단 고정 내비게이션을 기본으로 합니다.
- 홈, 자료 찾기, Prompt Library, Templates, Workflows, Projects, 전자책 연계 자료, Updates, 이용 안내를 1차 메뉴로 제공합니다.
- PC에서는 검색 진입 버튼과 주요 메뉴를 함께 노출합니다.
- 상세 페이지에서는 관련 자료, 관련 Workflow, 관련 프로젝트를 오른쪽 또는 하단 영역에 배치합니다.
