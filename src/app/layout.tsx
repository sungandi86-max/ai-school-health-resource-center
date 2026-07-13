import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 보건교사 자료실",
  description: "보건교사의 AI 업무를 위한 프롬프트, 템플릿, Workflow 자료 플랫폼입니다.",
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
