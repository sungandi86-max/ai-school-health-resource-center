import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "전자책 공식 자료실 | 보건교사를 위한 AI 업무 자동화",
  description: "『보건교사를 위한 AI 업무 자동화』 전자책의 실전 프롬프트, 템플릿, 실습 자료, 업데이트 자료를 확인하세요.",
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
