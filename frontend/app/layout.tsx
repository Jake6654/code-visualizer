// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";

// (선택) 폰트 추가 예시: Tailwind preset 사용 가능
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Code Visualizer",
  description: "Visualize your Python code step by step in the browser",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // className={`${inter.className} bg-white text-black dark:bg-black dark:text-white`}
        className="bg-white text-black dark:bg-black dark:text-white antialiased"
      >
        {children}
      </body>
    </html>
  );
}
