# AI 보건교사 자료실 정보구조

## 전체 정보구조

```text
/
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

- 홈: 서비스 방향, 주요 탐색 진입점, 최신 업데이트 요약을 제공합니다.
- 자료 찾기: 모든 자료를 업무, 도구, 난이도, 형식 기준으로 검색합니다.
- Prompt Library: 복사해서 사용할 수 있는 보건 업무 프롬프트를 모읍니다.
- Templates: 문서, 스프레드시트, 체크리스트 템플릿을 제공합니다.
- Workflows: 프롬프트와 템플릿이 연결되는 업무 흐름을 설명합니다.
- Projects: 실제 업무 시나리오를 가상 데이터로 재구성한 사례를 제공합니다.
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
QR 또는 검색으로 방문
→ 필요한 업무 선택
→ 관련 자료 탐색
→ 사용법 확인
→ 프롬프트 복사 또는 템플릿 다운로드
→ 관련 Workflow와 프로젝트 사례 확인
```

## 모바일 내비게이션 구조

- 하단 또는 상단의 간결한 주요 메뉴를 우선합니다.
- 1차 진입은 홈, 자료 찾기, Workflows, Updates, 이용 안내로 제한합니다.
- 보조 메뉴(Prompt Library, Templates, Projects, 전자책 연계 자료)는 자료 찾기 안에서 연결하거나 메뉴 확장으로 노출합니다.
- 검색창은 자료 목록 화면의 첫 화면 안에 배치합니다.

## PC 내비게이션 구조

- 상단 고정 내비게이션을 기본으로 합니다.
- 홈, 자료 찾기, Prompt Library, Templates, Workflows, Projects, 전자책 연계 자료, Updates, 이용 안내를 1차 메뉴로 제공합니다.
- PC에서는 검색 진입 버튼과 주요 메뉴를 함께 노출합니다.
- 상세 페이지에서는 관련 자료, 관련 Workflow, 관련 프로젝트를 오른쪽 또는 하단 영역에 배치합니다.
