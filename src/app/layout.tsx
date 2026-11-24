import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "InvestLab | 投資シミュレーション",
  description: "日本株・米国株の投資シミュレーションプラットフォーム",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
