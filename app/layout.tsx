import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AppShell } from "@/components/layout/app-shell";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { getCurrentUser, getNavigation } from "@/lib/data";

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
  title: {
    default: "WSUTech Dashboard",
    template: "%s · WSUTech Dashboard",
  },
  description:
    "A modern student portal for courses, assignments, grades, and campus life.",
  icons: {
    icon: [{ url: "/WSUTech-logo.png", type: "image/png", sizes: "any" }],
    shortcut: "/WSUTech-logo.png",
    apple: [{ url: "/WSUTech-logo.png", type: "image/png" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = getNavigation();
  const user = getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/WSUTech-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/WSUTech-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/WSUTech-logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delay={200}>
            <SidebarProvider>
              <AppShell mainNav={navigation.main} user={user}>
                {children}
              </AppShell>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
