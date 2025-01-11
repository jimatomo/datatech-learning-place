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

export const metadata: Metadata = {
  title: "Datatech Learning Place",
  description: "Datatech Learning Place",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // cookieの状態からサイドバーの開閉の情報を読み込む
  const cookieStore = cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    // Dark Modeを実装すると発生してしまうワーニングがあるので、suppressHydrationWarningをつける
    // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#f59e0b" />
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
                </div>
                <div className="px-6 py-2 flex flex-col xl:flex-row gap-4">
                  <div className="w-full flex-1">
                    {children}
                  </div>
                  <div className="w-full xl:flex-1 max-w-64 py-2">
                    <h2 className="text-lg font-bold py-2">Sponsored by</h2>
                    <p className="text-sm text-muted-foreground">そのうちスポンサーを募集します</p>
                  </div>
                </div>
              </main>
              <Footer />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
