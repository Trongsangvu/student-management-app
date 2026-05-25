import Sidebar from "@/components/common/sidebar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Student Management App",
    template: "%s | Student Management App",
  },
  description: "A simple student management application",
  keywords: [
    "student management",
    "school app",
    "student dashboard",
    "education",
  ],
  applicationName: "Student Management App",
  metadataBase: new URL("https://domain.com"),

  openGraph: {
    title: "Student Management App",
    description: "A simple student management application",
    url: "https://domain.com",
    siteName: "Student Management App",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Student Management App",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Student Management App",
    description: "A simple student management application",
    images: ["/images/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        "font-sans"
      )}
    >
      <body className="min-h-screen flex flex-row bg-slate-50">
        <Sidebar />
        <div className="flex flex-col flex-1 min-h-screen overflow-auto">
          {children}
        </div>
      </body>
    </html>
  );
}