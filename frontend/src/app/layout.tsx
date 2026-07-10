import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RSC Todo Learning",
  description: "Learn data fetching with React Server Components",
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
