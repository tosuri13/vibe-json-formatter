import "@/styles/global.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Optimized Template",
  description: "Created by tosuri13",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
