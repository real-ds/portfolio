import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { LoadingScreen } from "@/components/loading-screen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displayFont = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Divyanshu Singh — AI Engineer × Design Enthusiast",
  description:
    "Portfolio of Divyanshu Singh, an AI Engineer and Design Enthusiast building intelligent systems, computer vision solutions, and creative automation tools.",
  keywords: [
    "AI Engineer",
    "Portfolio",
    "Computer Vision",
    "Machine Learning",
    "Creative Engineering",
  ],
  openGraph: {
    title: "Divyanshu Singh — AI Engineer × Design Enthusiast",
    description:
      "Building intelligent systems at the intersection of AI engineering and interaction design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} min-h-screen antialiased`}
      >
        <ThemeProvider>
          <LoadingScreen />
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
