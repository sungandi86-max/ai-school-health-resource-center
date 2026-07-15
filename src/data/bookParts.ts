import {
  getChapterResources,
  getPartProjectResource,
  type BookResource,
} from "@/data/bookResources";

export type { BookResource } from "@/data/bookResources";

export type BookChapter = {
  readonly number: number;
  readonly title: string;
  readonly day: string;
  readonly duration: string;
  readonly difficulty: string;
  readonly output: string;
  readonly practice: string;
  readonly resources: readonly BookResource[];
};

export type BookPart = {
  readonly number: number;
  readonly title: string;
  readonly description: string;
  readonly projectResource: BookResource;
  readonly chapters: readonly BookChapter[];
};

const chapter = (
  number: number,
  title: string,
  day: string,
  duration: string,
  difficulty: string,
  output: string,
  practice: string,
  promptLabel: string,
): BookChapter => ({
  number,
  title,
  day,
  duration,
  difficulty,
  output,
  practice,
  resources: getChapterResources(number).map((resource) =>
    resource.type === "prompt" ? { ...resource, title: promptLabel } : { ...resource, title: output },
  ),
});

const bookPartContent: readonly Omit<BookPart, "projectResource">[] = [
  {
    number: 1,
    title: "왜 보건실은 늘 바쁠까",
    description: "반복되는 장면을 발견하고, 중단 뒤에 되풀이한 행동을 기록합니다.",
    chapters: [
      chapter(1, "하루 종일 바빴는데, 아침 파일은 그대로였습니다", "DAY 1", "약 20분", "★☆☆☆☆", "하루 한 장면 해부표", "오늘 한 장면 멈춰 보기", "장면 기록 프롬프트"),
      chapter(2, "나를 자꾸 같은 자리로 돌려보내는 일을 적었습니다", "DAY 1", "약 30분", "★★☆☆☆", "반복 장면 기록지", "최근 일주일의 반복 장면 3개 적기", "반복 장면 찾기 프롬프트"),
    ],
  },
  {
    number: 2,
    title: "반복되는 일을 발견하다",
    description: "사람이 판단해야 할 일과 구조로 살펴볼 일을 나누고 첫 개선 과제를 고릅니다.",
    chapters: [
      chapter(3, "이 일은 끝까지 사람이 해야 합니다", "DAY 7", "약 30분", "★★☆☆☆", "사람·AI·정보 경계표", "사람·AI·정보의 경계선 긋기", "경계선 질문 프롬프트"),
      chapter(4, "AI보다 먼저, 업무를 더 작게 나눴습니다", "DAY 7", "약 25분", "★★☆☆☆", "첫 개선 과제 선정표", "첫 개선 과제 하나 고르기", "개선 과제 선정 프롬프트"),
    ],
  },
  {
    number: 3,
    title: "첫 번째 실패, 화면부터 만들었습니다",
    description: "화면 중심 접근의 실패를 기록하고, 다시 설계할 기준을 정리합니다.",
    chapters: [
      chapter(5, "예쁜 홈페이지를 만든 줄 알았습니다", "DAY 10", "약 25분", "★★☆☆☆", "첫 이상 징후 기록", "‘완성’이라고 생각했던 순간 다시 보기", "이상 징후 점검 프롬프트"),
      chapter(6, "하나를 고칠수록 다른 곳이 어긋났습니다", "DAY 10", "약 35분", "★★★☆☆", "사용자 흐름 실패 지도", "정상 화면이 아니라 실패한 사용자 흐름", "사용자 흐름 점검 프롬프트"),
      chapter(7, "문제는 화면이 아니라 순서였습니다", "DAY 10", "약 30분", "★★★☆☆", "재설계 기준 메모", "실패 뒤에서 건너뛴 순서 찾기", "재설계 기준 프롬프트"),
    ],
  },
  {
    number: 4,
    title: "화면을 닫고, 표부터 다시 만들다",
    description: "큰 업무를 작은 행동으로 나누고, 행동의 시작과 끝을 같은 기준으로 맞춥니다.",
    chapters: [
      chapter(8, "화면을 닫고, 업무를 한 줄씩 적었습니다", "DAY 14", "약 30분", "★★☆☆☆", "업무 분해 초안", "큰 업무를 작은 행동으로 나누기", "업무 분해 프롬프트"),
      chapter(9, "‘확인한다’는 말 앞에서 다시 멈췄습니다", "DAY 14", "약 30분", "★★★☆☆", "행동 기준표", "행동의 시작과 끝 정하기", "행동 기준 정리 프롬프트"),
      chapter(10, "같은 곳에 놓으니 흐름이 보였습니다", "DAY 14", "약 35분", "★★★☆☆", "업무 설계표", "행동과 기준을 한 줄로 연결하기", "업무 설계 프롬프트"),
    ],
  },
  {
    number: 5,
    title: "작은 성공, 안내의 자리를 하나로 모으다",
    description: "한 행의 업무 단위를 정하고, 필요한 열만 남겨 첫 업무 구조를 만듭니다.",
    chapters: [
      chapter(11, "표는 데이터가 아니라 업무였습니다", "DAY 21", "약 30분", "★★★☆☆", "업무 단위 정의표", "한 행의 업무 단위 정하기", "업무 단위 정의 프롬프트"),
      chapter(12, "열 하나에도 이유가 있어야 했습니다", "DAY 21", "약 40분", "★★★☆☆", "컬럼 설계표", "필요한 열만 남기기", "컬럼 설계 프롬프트"),
      chapter(13, "처음으로 구조가 움직였습니다", "DAY 21", "약 45분", "★★★☆☆", "첫 업무 구조", "첫 업무 구조 만들기", "첫 업무 구조 프롬프트"),
    ],
  },
  {
    number: 6,
    title: "하나의 프로젝트가 다음 일을 데려오다",
    description: "입력, 제출, 확인, 보완, 완료를 하나의 Workflow로 이어 봅니다.",
    chapters: [
      chapter(14, "입력이 아니라 흐름을 먼저 연결했습니다", "DAY 30", "약 35분", "★★★☆☆", "Workflow 초안", "입력 전후의 Workflow 그리기", "Workflow 초안 프롬프트"),
      chapter(15, "같은 정보를 두 번 적지 않게 되었습니다", "DAY 30", "약 35분", "★★★☆☆", "중복 제거표", "다시 적는 정보 찾기", "중복 제거 프롬프트"),
      chapter(16, "처음으로 업무가 끝까지 이어졌습니다", "DAY 30", "약 45분", "★★★☆☆", "첫 Workflow 완성본", "첫 Workflow 완주하기", "Workflow 완주 프롬프트"),
    ],
  },
  {
    number: 7,
    title: "반복은 맡기고, 판단은 남기다",
    description: "AI에게 맡길 반복과 사람이 남길 판단을 나누고 Workflow에 연결합니다.",
    chapters: [
      chapter(17, "처음으로 AI에게 한 줄을 맡겼습니다", "DAY 45", "약 25분", "★★☆☆☆", "첫 AI 요청문", "첫 AI 요청문 쓰기", "첫 AI 요청문 프롬프트"),
      chapter(18, "맡길 일보다 남길 일을 먼저 정했습니다", "DAY 45", "약 35분", "★★★☆☆", "AI 역할표", "사람과 AI의 역할 다시 나누기", "AI 역할표 프롬프트"),
      chapter(19, "반복은 줄고 판단은 남았습니다", "DAY 45", "약 45분", "★★★☆☆", "AI Workflow 1.0", "기존 Workflow에 AI 역할 한 칸 연결", "AI Workflow 프롬프트"),
    ],
  },
  {
    number: 8,
    title: "종이 없는 보건실은 화면이 아니라 운영입니다",
    description: "처음 학교에서 운영해보고, 함께 쓰는 기준과 오래 남길 원칙을 정리합니다.",
    chapters: [
      chapter(20, "처음으로 학교에서 움직였습니다", "DAY 60", "약 35분", "★★★☆☆", "운영 기록표", "첫 운영 기록 남기기", "운영 기록 프롬프트"),
      chapter(21, "혼자 쓰는 도구에서 함께 쓰는 시스템이 되었습니다", "DAY 75", "약 40분", "★★★☆☆", "운영 체크리스트", "함께 운영할 기준 만들기", "운영 기준 프롬프트"),
      chapter(22, "자동화보다 오래 남는 것을 만들었습니다", "DAY 90", "약 35분", "★★☆☆☆", "나만의 운영 선언문", "나만의 운영 선언문 쓰기", "운영 선언문 프롬프트"),
    ],
  },
];

export const bookParts: readonly BookPart[] = bookPartContent.map((part) => ({
  ...part,
  projectResource: getPartProjectResource(part.number),
}));

export const bookPartSummary = {
  partCount: bookParts.length,
  chapterCount: bookParts.reduce((total, part) => total + part.chapters.length, 0),
  resourceKinds: ["Chapter별 프롬프트", "실습자료", "PART 프로젝트 파일", "전체 프로젝트 파일"] as const,
};
