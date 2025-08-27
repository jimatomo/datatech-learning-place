import { NextResponse } from "next/server"
import { getSession } from '@auth0/nextjs-auth0'
import { saveNotificationSubscription } from '@/lib/notification-db'

interface SubscribeRequest {
  subscription: {
    endpoint: string
    keys: {
      p256dh: string
      auth: string
    }
  }
  settings: {
    enabled: boolean
    selectedTags: string[]
    notificationTime: string
  }
}

export async function POST(request: Request) {
  try {
    const body: SubscribeRequest = await request.json()
    const { subscription, settings } = body

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json(
        { error: "subscription は必須です" },
        { status: 400 }
      )
    }

    if (!settings) {
      return NextResponse.json(
        { error: "settings は必須です" },
        { status: 400 }
      )
    }

    // ユーザー情報を取得
    const session = await getSession()
    const userId = session?.user?.sub

    if (!userId) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      )
    }

    // DynamoDBに購読情報を保存
    const success = await saveNotificationSubscription(
      userId,
      subscription,
      {
        enabled: settings.enabled,
        selected_tags: settings.selectedTags,
        notification_time: settings.notificationTime
      }
    )

    if (!success) {
      return NextResponse.json(
        { error: "通知設定の保存に失敗しました" },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: "プッシュ通知の購読が完了しました"
    })
  } catch (error) {
    console.error("プッシュ通知の購読エラー:", error)

    return NextResponse.json(
      {
        success: false,
        error: "通知の購読に失敗しました",
      },
      { status: 500 }
    )
  }
}