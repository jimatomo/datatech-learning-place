import { NextResponse } from "next/server"
import { getNotificationScheduler } from "@/lib/dev-notification-scheduler"

// 開発環境用：テスト通知を送信するAPI
export async function POST() {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: "このAPIは開発環境でのみ利用可能です" },
        { status: 403 }
      )
    }

    const scheduler = getNotificationScheduler()
    const result = await scheduler.runTestNotification()

    return NextResponse.json({
      success: true,
      message: "テスト通知を送信しました",
      notificationResult: result
    })

  } catch (error) {
    console.error("テスト通知エラー:", error)
    return NextResponse.json(
      { error: "テスト通知の送信に失敗しました" },
      { status: 500 }
    )
  }
}
