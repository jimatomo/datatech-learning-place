import { NextResponse } from "next/server"
import { getSession } from '@auth0/nextjs-auth0'
import { updateNotificationSettings } from '@/lib/notification-db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { settings } = body

    console.log('設定更新API呼び出し:', { settings })

    if (!settings) {
      return NextResponse.json(
        { error: "settings は必須です" },
        { status: 400 }
      )
    }

    // ユーザー情報を取得
    const session = await getSession()
    const userId = session?.user?.sub

    console.log('設定更新ユーザー:', userId)

    if (!userId) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      )
    }

    // フィールド名をDynamoDB形式に変換
    const dbSettings = {
      enabled: settings.enabled,
      selected_tags: settings.selectedTags,
      notification_time: settings.notificationTime
    }
    
    // DynamoDBの設定を更新
    console.log('DynamoDB更新開始:', { userId, settings, dbSettings })
    const success = await updateNotificationSettings(userId, dbSettings)
    console.log('DynamoDB更新結果:', success)

    if (!success) {
      return NextResponse.json(
        { error: "通知設定の更新に失敗しました" },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: "通知設定の更新が完了しました"
    })
  } catch (error) {
    console.error("プッシュ通知設定の更新エラー:", error)

    return NextResponse.json(
      {
        success: false,
        error: "通知設定の更新に失敗しました",
      },
      { status: 500 }
    )
  }
}

