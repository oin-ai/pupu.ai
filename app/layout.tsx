import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "pupu.ai",
  description: "Welcome to pupu.ai, home of Story AI! Discover AI-powered storytelling and interactive audio experiences for children.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#888',
          padding: '2% 0',
          background: '#fafafa',
        }}>
          ICP备案号：沪ICP备2024102876号-3
        </footer>
      </body>
    </html>
  );
}
