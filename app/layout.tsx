import { cookies } from "next/headers"

import type { Metadata } from "next";
import "./globals.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/theme-mode-toggle"
import { BreadcrumbCollapsed } from "@/components/app-breadcrumb"

export const metadata: Metadata = {
  title: "Datatech Learning Place",
  description: "Datatech Learning Place",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // cookieの状態からサイドバーの開閉の情報を読み込む
  const cookieStore = await cookies()
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
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
              <main className="flex flex-col h-screen w-screen">
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
                <div className="flex-1 overflow-auto w-full">
                  <div className="w-full h-full px-6 py-2 flex flex-col xl:flex-row gap-4">
                    <div className="w-full flex-1">{children}</div>
                    {/* 広告などのコンテンツをここに配置 */}
                    {/* 有料化する際に表示されないようにする処理を追加 */}
                    <div className="w-full xl:flex-1 max-w-64">
                      <h2 className="text-lg font-bold">広告枠</h2>
                    </div>
                  </div>
                </div>
              </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
