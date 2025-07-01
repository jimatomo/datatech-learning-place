import { cookies } from "next/headers"

import type { Metadata } from "next";
import "./globals.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/theme-mode-toggle"
import { BreadcrumbCollapsed } from "@/components/app-breadcrumb"
import Footer from "@/components/footer"
import NextTopLoader from 'nextjs-toploader';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AuthStatus } from "@/components/auth-status"
import { AuthDialog } from "@/components/auth-dialog"
import ConsentManager from "@/components/ConsentManager"

export const metadata: Metadata = {
  title: "Datatech Learning Place",
  description: "Datatech Learning Place",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Datatech Learning Place",
  },
  icons: {
    apple: "/icons/apple-touch-icon.png",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="Datatech Learning Place" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Datatech Learning Place" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <UserProvider>
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
                <div className="flex items-center px-4 py-2 w-full">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger className="w-10" />
                    <Separator orientation="vertical" className="h-4" />
                    <BreadcrumbCollapsed />
                  </div>
                  <div className="ml-auto">
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
        </ThemeProvider>
      </body>
      </UserProvider>
    </html>
  );
}
