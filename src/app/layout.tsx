import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "InvestLab | 投資シミュレーション",
  description: "日本株・米国株の投資シミュレーションプラットフォーム",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
