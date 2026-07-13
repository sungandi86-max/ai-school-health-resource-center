import type { UpdateItem } from "@/types/resource";

export const recentUpdates: readonly UpdateItem[] = [
  {
    id: "update-001",
    title: "ChatGPT Work 작업 지시서 추가",
    summary: "원고 검토와 자료 정리에 활용할 수 있는 작업 지시서 예시를 추가했습니다.",
    updateType: "added",
    publishedAt: "2026-07-10",
  },
  {
    id: "update-002",
    title: "Google Sheets 업무 관리 템플릿 업데이트",
    summary: "건강검진 일정 정리용 가상 템플릿의 항목 구성을 보완했습니다.",
    updateType: "changed",
    publishedAt: "2026-07-08",
  },
  {
    id: "update-003",
    title: "전자책 제작 Workflow 보완",
    summary: "전자책 장별 자료 연결과 실습 파일 정리 흐름을 더 명확히 했습니다.",
    updateType: "improved",
    publishedAt: "2026-07-05",
  },
];
