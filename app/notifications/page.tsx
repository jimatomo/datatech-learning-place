import { Metadata } from "next"
import Link from "next/link"
import { Bell, Settings } from "lucide-react"
import { NotificationHistoryClient } from "./ui/notification-history-client"

export const metadata: Metadata = {
  title: "通知 - DTLP",
  description: "Datatech Learning Placeの通知ページです。過去の通知を確認できます。",
  openGraph: {
    title: "通知 - DTLP",
    description: "Datatech Learning Placeの通知ページです。過去の通知を確認できます。",
    url: "https://datatech-learning-place.net/notifications",
    siteName: "Datatech Learning Place",
    images: [
      {
        url: "https://datatech-learning-place.net/og-image.jpg",
        width: 820,
        height: 820,
      },
    ],
  },
}

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">通知</h1>
          </div>
          
          {/* 通知設定セクション */}
          <div className="mb-6">
            <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 p-3 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1 sm:mb-2">通知設定</h3>
                  <p className="text-sm sm:text-base text-blue-700 dark:text-blue-300 leading-relaxed">プッシュ通知の設定を変更できます</p>
                </div>
                <Link 
                  href="/notifications/settings" 
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm sm:text-base font-medium min-w-fit"
                >
                  <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                  設定を管理
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 通知履歴コンポーネント */}
        <NotificationHistoryClient />
      </div>
    </div>
  )
}