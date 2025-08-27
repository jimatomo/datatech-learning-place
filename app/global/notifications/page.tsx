import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { NotificationSettingsComponent } from "@/app/global/notifications/ui/notification-settings"

export const metadata: Metadata = {
  title: "通知設定 - DTLP Global",
  description: "Datatech Learning Placeの通知設定ページです。プッシュ通知の設定を管理できます。",
  openGraph: {
    title: "通知設定 - DTLP Global",
    description: "Datatech Learning Placeの通知設定ページです。プッシュ通知の設定を管理できます。",
    url: "https://datatech-learning-place.net/global/notifications",
    siteName: "Datatech Learning Place",
    images: [
      {
        url: "https://datatech-learning-place.net/logo/logo-with-title.png",
        width: 820,
        height: 820,
      },
    ],
  },
}

export default function NotificationSettingsPage() {
  return (
    <div>
      <div className="mb-4">
        <Link href="/quiz" className="inline-flex items-center text-sm text-muted-foreground hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" />
          クイズページに戻る
        </Link>
      </div>
      
      <h1 className="scroll-m-20 pb-4 text-xl font-bold tracking-tight">
        通知設定
      </h1>
      
      <NotificationSettingsComponent />
    </div>
  )
}
