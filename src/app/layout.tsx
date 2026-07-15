import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "전자책 공식 자료실 | 보건교사를 위한 AI 업무 자동화",
  description:
    "『보건교사를 위한 AI 업무 자동화』 전자책의 PART별 프롬프트, 실습자료, 프로젝트 파일을 책의 순서대로 확인하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
