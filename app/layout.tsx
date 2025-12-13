import { cookies } from "next/headers"

import type { Metadata } from "next";
import "./globals.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/theme-mode-toggle"
import { NotificationBell } from "@/components/notification-bell"
import { BreadcrumbCollapsed } from "@/components/app-breadcrumb"
import Footer from "@/components/footer"
import NextTopLoader from 'nextjs-toploader';

import { Auth0Provider } from '@auth0/nextjs-auth0';
import { AuthStatus } from "@/components/auth-status"
import { AuthDialog } from "@/components/auth-dialog"
import ConsentManager from "@/components/ConsentManager"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { NotificationHandler } from "@/components/actions/notification-handler"

export const metadata: Metadata = {
  title: "Datatech Learning Place",
  description: "データ技術を学ぶためのオンライン学習プラットフォーム",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Datatech Learning Place",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Datatech Learning Place",
    title: "Datatech Learning Place",
    description: "データ技術を学ぶためのオンライン学習プラットフォーム",
  },
  twitter: {
    card: "summary",
    title: "Datatech Learning Place",
    description: "データ技術を学ぶためのオンライン学習プラットフォーム",
  },
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    shrinkToFit: "no",
    viewportFit: "cover", // PWA対応：セーフエリア全体を使用
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Datatech Learning Place" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#1d4ed8" />
      </head>
      <Auth0Provider>
      <body>
        <ConsentManager />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#1d4ed8" />
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <div className="flex flex-col min-h-screen w-screen">
              <main className="flex-1">
                {/* スマホ対応の固定ヘッダー */}
                <div className="sticky top-0 z-40 flex items-center px-4 py-2 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <SidebarTrigger className="w-10" />
                    <Separator orientation="vertical" className="h-4" />
                    <div className="min-w-0 flex-1">
                      <BreadcrumbCollapsed />
                    </div>
                  </div>
                  <div className="ml-auto flex items-center sm:gap-2">
                    <NotificationBell />
                    <ModeToggle />
                  </div>
                  <AuthStatus />
                  <AuthDialog />
                </div>
                <div className="px-6 py-2 flex flex-col xl:flex-row gap-4">
                  <div className="w-full flex-1">
                    {children}
                  </div>
                  <div className="w-full xl:flex-1 xl:max-w-64 py-2">
                    <h2 className="text-lg font-bold py-2">Sponsored by</h2>
                    <p className="text-sm text-muted-foreground">スポンサーを募集中。紹介コンテンツもご用意しますので、ご興味あればお問い合わせください。</p>
                  </div>
                </div>
              </main>
              <Footer />
            </div>
          </SidebarProvider>
          <PWAInstallPrompt />
          <NotificationHandler />
        </ThemeProvider>
      </body>
      </Auth0Provider>
    </html>
  );
}
