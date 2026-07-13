import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "실전 프롬프트 자료실 | AI School Health Resource Center",
  description: "『보건교사를 위한 AI 업무 자동화』에서 사용하는 최신 프롬프트를 찾아 복사하세요.",
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
