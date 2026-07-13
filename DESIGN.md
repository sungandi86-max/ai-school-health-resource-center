# AI 보건교사 자료실 Design System

## 1. Atmosphere & Identity

조용하고 신뢰감 있는 공식 전자책 자료실입니다. Apple의 여백, Notion의 문서성, Linear의 정돈된 밀도, OpenAI Docs와 Vercel Dashboard의 전문적인 Resource Center 감각을 참고하되 보건교사가 바로 사용할 수 있는 SaaS형 업무 자료 허브처럼 느껴지게 합니다. 시그니처는 화이트 표면, 아주 연한 블루 그레이 배경, 네이비 브랜드 텍스트, 파란 탐색 액션, 초록 성공·다운로드 액션입니다.

## 2. Color

### Palette

| Role | Token | Value | Usage |
|---|---|---:|---|
| Brand/primary | `--color-brand-primary` | `#183B66` | 서비스명, 주요 제목, 진한 CTA |
| Brand/secondary | `--color-brand-secondary` | `#4A90E2` | 검색, 링크, 탐색 액션 |
| Surface/primary | `--color-surface-primary` | `#FFFFFF` | 주요 화면 배경, 카드 |
| Surface/subtle | `--color-surface-subtle` | `#F8FAFC` | 페이지 배경 |
| Surface/muted | `--color-surface-muted` | `#F5F8FC` | 카드 내부 보조 영역 |
| Surface/blue | `--color-surface-blue` | `#EAF3FF` | 프로젝트 미리보기, 약한 블루 표면 |
| Text/primary | `--color-text-primary` | `#183B66` | 제목, 본문 핵심 텍스트 |
| Text/secondary | `--color-text-secondary` | `#526579` | 설명, 도움말 |
| Border/default | `--color-border-default` | `#D7E0EA` | 카드, 입력창, 필터 경계 |
| Border/subtle | `--color-border-subtle` | `#E7EDF4` | 부드러운 구분선 |
| Action/search | `--color-action-primary` | `#4A90E2` | 검색, 주요 탐색, 링크 |
| Action/hover | `--color-action-hover` | `#2F73C8` | 주요 액션 hover |
| Status/success | `--color-status-success` | `#168A4A` | 복사, 다운로드, 성공 상태 |
| Status/success-muted | `--color-status-success-muted` | `#EAF7EF` | 성공 배지 배경 |
| Status/warning | `--color-status-warning` | `#B7791F` | 주의 안내 |
| Status/error | `--color-status-error` | `#C2413B` | 오류, 삭제성 안내 |

### Rules

- 블루는 검색, 이동, 주요 탐색에만 사용합니다.
- 그린은 복사, 다운로드, 완료 상태에만 사용합니다.
- 대형 그라데이션과 강한 그림자는 사용하지 않습니다.
- 새 색상이 필요하면 먼저 이 표에 의미와 사용 범위를 추가합니다.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Usage |
|---|---:|---:|---:|---|
| H1 | 32px | 650 | 1.25 | 페이지 제목 |
| H2 | 24px | 650 | 1.35 | 섹션 제목 |
| H3 | 18px | 600 | 1.45 | 카드 제목 |
| Body/lg | 18px | 400 | 1.7 | 핵심 설명 |
| Body | 16px | 400 | 1.65 | 기본 본문 |
| Body/sm | 14px | 400 | 1.55 | 보조 설명 |
| Caption | 12px | 500 | 1.45 | 메타데이터, 라벨 |

### Font Stack

- Primary: `Geist`, `Apple SD Gothic Neo`, `Noto Sans KR`, `system-ui`, `sans-serif`
- Mono: `Geist Mono`, `SF Mono`, `ui-monospace`, `monospace`

### Rules

- 한국어 UI를 기본으로 합니다.
- 본문은 14px보다 작게 만들지 않습니다.
- 제목은 모바일에서 3줄 이상 길게 늘어지지 않도록 문장을 짧게 씁니다.

## 4. Spacing & Layout

### Base Unit

모든 간격은 4px 단위를 기준으로 합니다.

| Token | Value | Usage |
|---|---:|---|
| `--space-1` | 4px | 아이콘과 텍스트 사이 |
| `--space-2` | 8px | 작은 그룹 간격 |
| `--space-3` | 12px | 입력창 내부 여백 |
| `--space-4` | 16px | 모바일 카드 기본 여백 |
| `--space-5` | 20px | 목록 아이템 여백 |
| `--space-6` | 24px | PC 카드 기본 여백 |
| `--space-8` | 32px | 섹션 내부 그룹 간격 |
| `--space-10` | 40px | 큰 섹션 간격 |

### Layout

- 모바일 우선으로 설계합니다.
- 모바일 기본 좌우 여백은 20px입니다.
- PC 최대 콘텐츠 폭은 1120~1200px을 기본으로 합니다.
- 홈은 거대한 Hero가 아니라 공식 자료실의 컴팩트한 진입점과 Resource Hub로 구성합니다.

## 5. Components

### App Shell

- Structure: `header`, `main`, `nav`, optional `footer`
- Variants: mobile compact, desktop horizontal
- States: current page, hover, focus
- Accessibility: 현재 페이지는 `aria-current="page"`로 표시합니다.

### Search Field

- Structure: label, input, optional filter trigger
- Variants: default, focused, with active filters, empty
- Spacing: `--space-3` 내부 여백, `--space-4` 주변 여백
- States: default, focus, disabled, empty
- Accessibility: 검색 목적을 명확히 하는 label을 제공합니다.

### Button

- Variants: primary blue, success green, secondary outline, ghost
- States: default, hover, active, focus, disabled, loading
- Accessibility: 명령형 문구를 사용하고 아이콘만 있는 경우 tooltip 또는 aria-label을 제공합니다.

### Card

- Variants: resource, workflow, project, update
- Spacing: mobile `--space-4`, desktop `--space-6`
- States: default, hover, focus, selected
- Depth: 얇은 border 중심, shadow는 사용하지 않거나 매우 약하게 사용합니다.
- Official Resource Hub 카드는 `20px` radius와 Vercel식 shadow-as-border를 사용합니다.
- 일반 업무 앱 카드와 목록 카드는 기존처럼 8~12px radius를 사용할 수 있습니다.

### Chapter Resource Accordion

- 전자책 연계 자료는 파일 목록보다 Chapter 학습 흐름을 먼저 보여줍니다.
- 기본 상태는 Chapter 1만 펼치고, 검색 또는 필터 적용 시 관련 Chapter를 자동으로 펼칩니다.
- 각 Chapter 하단에는 책에서 사용하는 페이지를 `P.42` 형식의 작은 칩으로 표시합니다.
- 자료 카드에는 제목, 설명, 버전, 업데이트일, 파일 형식, 다운로드 액션을 일관되게 노출합니다.

### Official Documentation Hub

- 상단 Navigation은 `Home`, `전자책`, `다운로드`, `프로젝트`, `업데이트`, `FAQ`를 기본으로 합니다.
- Quick Access 카드는 전자책, 실전 프롬프트, 업무 템플릿, 예제 프로젝트 네 가지 주요 진입점을 제공합니다.
- 프로젝트 카드는 실제 이미지가 없을 때 의미 없는 placeholder 이미지를 쓰지 않고, 시스템 구조를 암시하는 경량 DOM 썸네일을 사용합니다.
- Release Notes와 FAQ는 문서 사이트처럼 버전, 날짜, 질문을 빠르게 스캔할 수 있는 카드와 Accordion 구조를 사용합니다.
- 다운로드 자료에는 최근 본 자료, 추천 자료, 관련 자료를 구분해 탐색 맥락을 제공합니다.
- Suspense fallback은 텍스트 박스가 아니라 실제 카드 구조를 암시하는 Loading Skeleton을 사용합니다.

### Filter

- Variants: chip, segmented group, checkbox group
- States: default, selected, hover, focus, disabled
- Accessibility: 필터 그룹 이름을 제공합니다.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|---|---:|---|---|
| Micro | 120ms | ease-out | 버튼, 필터 상태 |
| Standard | 180ms | ease-in-out | 카드 hover, 메뉴 열림 |

- 레이아웃 속성 대신 `transform`, `opacity`, `color`, `background-color`, `border-color` 중심으로 전환합니다.
- 애니메이션은 상태 변화를 설명할 때만 사용합니다.
- 카드 hover는 미세한 `transform`과 border/shadow 변화만 사용합니다.
- `prefers-reduced-motion`을 존중합니다.

## 7. Depth & Surface

전략은 borders-only에 가깝게 시작합니다.

| Type | Value | Usage |
|---|---|---|
| Default border | `1px solid var(--color-border-default)` | 카드, 입력창 |
| Subtle border | `1px solid var(--color-border-subtle)` | 보조 구분 |
| Optional shadow | `0 1px 2px rgba(24, 59, 102, 0.04)` | 필요한 경우의 아주 약한 표면 분리 |
| Official card shadow | `0 0 0 1px rgba(24, 59, 102, 0.08), 0 2px 2px rgba(24, 59, 102, 0.03), 0 12px 24px -18px rgba(24, 59, 102, 0.24)` | 공식 자료실 카드 |

## 사용하면 안 되는 디자인 요소

- 거대한 Hero 영역
- 과한 그라데이션
- 강한 그림자
- 캐릭터, 장식용 일러스트, AI 느낌의 추상 그래픽
- 개인정보가 담긴 예시 화면
- 장식 목적의 아이콘 남용
- 모바일에서 업무 흐름을 가리는 큰 배너
