import { NextResponse } from "next/server"
import { getSession } from '@auth0/nextjs-auth0'
import { getNotificationSubscription } from '@/lib/notification-db'

export async function GET() {
  try {
    // ユーザー情報を取得
    const session = await getSession()
    const userId = session?.user?.sub

    if (!userId) {
      return NextResponse.json({
        success: true,
        hasSubscription: false,
        message: "認証されていません"
      })
    }

    // DynamoDBから購読情報を取得
    const subscriptionData = await getNotificationSubscription(userId)

    if (!subscriptionData) {
      return NextResponse.json({
        success: true,
        hasSubscription: false,
        message: "通知設定が見つかりません"
      })
    }

    return NextResponse.json({
      success: true,
      hasSubscription: true,
      settings: {
        enabled: subscriptionData.enabled,
        selectedTags: subscriptionData.selected_tags,
        notificationTime: subscriptionData.notification_time
      }
    })
  } catch (error) {
    console.error("通知設定の取得エラー:", error)

    return NextResponse.json(
      {
        success: false,
        hasSubscription: false,
        error: "通知設定の取得に失敗しました",
      },
      { status: 500 }
    )
  }
}