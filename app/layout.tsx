import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://johnkamau.vercel.app"
  ),
  title: "John Kamau — Full-Stack Software Engineer & Systems Architect",
  description:
    "Personal portfolio of John Kamau. Full-Stack Software Engineer specializing in distributed system design, event-driven backends, and modern web architectures.",
  keywords: [
    "John Kamau",
    "Full-Stack Engineer",
    "Software Architect",
    "Next.js",
    "TypeScript",
    "Python",
    "Go",
    "FastAPI",
    "PostgreSQL",
    "Distributed Systems",
    "Kenya",
  ],
  authors: [{ name: "John Kamau", url: "https://github.com/Mantra2226" }],
  creator: "John Kamau",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "John Kamau — Full-Stack Software Engineer & Systems Architect",
    description:
      "Minimalist developer portfolio showcasing flagship systems architecture, high-performance web applications, and open-source projects.",
    siteName: "John Kamau Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Kamau — Full-Stack Software Engineer",
    description:
      "Specializing in resilient distributed architectures, event-driven backends, and responsive full-stack applications.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
