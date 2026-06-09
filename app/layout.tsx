import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laxita Singh | Immersive Frontend Portfolio",
  description:
    "A futuristic, immersive portfolio for Laxita Singh, a frontend and full-stack developer building polished digital products.",
  keywords: ["Laxita Singh", "portfolio", "frontend developer", "full-stack developer", "React", "Next.js", "WebGL"],
  icons: {
    icon: "/images/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
