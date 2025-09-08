import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Bell } from "lucide-react"
import { NotificationHistoryClient } from "@/app/notifications/ui/notification-history-client"

export const metadata: Metadata = {
  title: "通知履歴 - DTLP",
  description: "Datatech Learning Placeの通知履歴ページです。過去の通知を確認できます。",
  openGraph: {
    title: "通知履歴 - DTLP",
    description: "Datatech Learning Placeの通知履歴ページです。過去の通知を確認できます。",
    url: "https://datatech-learning-place.net/notifications/history",
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

export default function NotificationHistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* ヘッダー */}
        <div className="mb-6">
          <Link 
            href="/notifications" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            通知ページに戻る
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">通知履歴</h1>
          </div>
          
          <p className="text-muted-foreground">
            過去に受信した通知を確認できます。このページを表示すると通知バッジがクリアされます。
          </p>
        </div>

        {/* 通知履歴コンポーネント */}
        <NotificationHistoryClient />
      </div>
    </div>
  )
}